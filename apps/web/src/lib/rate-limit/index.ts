/**
 * Rate Limiting - Redis Implementation
 * 
 * ⚠️  SERVER ONLY - Uses secret Redis connection
 * 
 * Implements sliding window rate limiting using Redis.
 * Falls back to in-memory if Redis is not available.
 */

import "server-only";

import { Redis } from "ioredis";
import { serverEnv } from "@/lib/env.server";

// Types
export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  keyPrefix: string; // Namespace for different rate limiters
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: Date;
  retryAfter?: number; // Seconds until retry (only if rate limited)
}

// In-memory store for development/fallback
const memoryStore = new Map<string, { count: number; resetAt: number }>();

// Redis client singleton
let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;
  
  if (serverEnv.REDIS_URL) {
    try {
      redis = new Redis(serverEnv.REDIS_URL, {
        maxRetriesPerRequest: 3,
      });
      return redis;
    } catch (error) {
      console.error("Failed to connect to Redis:", error);
      return null;
    }
  }
  
  return null;
}

/**
 * Check rate limit using Redis sliding window
 */
async function checkRateLimitRedis(
  key: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const redis = getRedis();
  if (!redis) {
    return checkRateLimitMemory(key, config);
  }

  const now = Date.now();
  const windowStart = now - config.windowMs;
  const fullKey = `ratelimit:${config.keyPrefix}:${key}`;

  try {
    // Use Redis transaction for atomic operations
    const multi = redis.multi();
    
    // Remove old entries outside the window
    multi.zremrangebyscore(fullKey, 0, windowStart);
    
    // Count current entries
    multi.zcard(fullKey);
    
    // Add current request
    multi.zadd(fullKey, now, `${now}-${Math.random()}`);
    
    // Set expiry on the key
    multi.pexpire(fullKey, config.windowMs);

    const results = await multi.exec();
    
    if (!results) {
      return checkRateLimitMemory(key, config);
    }

    const currentCount = (results[1][1] as number) || 0;
    const remaining = Math.max(0, config.maxRequests - currentCount - 1);
    const resetAt = new Date(now + config.windowMs);

    if (currentCount >= config.maxRequests) {
      // Get oldest entry to calculate retry-after
      const oldest = await redis.zrange(fullKey, 0, 0, "WITHSCORES");
      const oldestTime = oldest.length >= 2 ? parseInt(oldest[1]) : now;
      const retryAfter = Math.ceil((oldestTime + config.windowMs - now) / 1000);

      return {
        success: false,
        remaining: 0,
        resetAt,
        retryAfter: Math.max(1, retryAfter),
      };
    }

    return {
      success: true,
      remaining,
      resetAt,
    };
  } catch (error) {
    console.error("Redis rate limit error:", error);
    return checkRateLimitMemory(key, config);
  }
}

/**
 * Check rate limit using in-memory store (fallback)
 */
function checkRateLimitMemory(
  key: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  const fullKey = `${config.keyPrefix}:${key}`;
  const existing = memoryStore.get(fullKey);

  // Clean up expired entries periodically
  if (Math.random() < 0.01) {
    for (const [k, v] of memoryStore.entries()) {
      if (v.resetAt < now) {
        memoryStore.delete(k);
      }
    }
  }

  if (!existing || existing.resetAt < now) {
    // Start new window
    memoryStore.set(fullKey, {
      count: 1,
      resetAt: now + config.windowMs,
    });
    return {
      success: true,
      remaining: config.maxRequests - 1,
      resetAt: new Date(now + config.windowMs),
    };
  }

  if (existing.count >= config.maxRequests) {
    const retryAfter = Math.ceil((existing.resetAt - now) / 1000);
    return {
      success: false,
      remaining: 0,
      resetAt: new Date(existing.resetAt),
      retryAfter: Math.max(1, retryAfter),
    };
  }

  existing.count++;
  return {
    success: true,
    remaining: config.maxRequests - existing.count,
    resetAt: new Date(existing.resetAt),
  };
}

/**
 * Main rate limit function
 */
export async function rateLimit(
  key: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  return checkRateLimitRedis(key, config);
}

// Pre-configured rate limiters for common use cases
export const rateLimiters = {
  /**
   * Idea creation: 10 per hour
   */
  createIdea: (userId: string) =>
    rateLimit(userId, {
      keyPrefix: "create-idea",
      windowMs: 60 * 60 * 1000, // 1 hour
      maxRequests: 10,
    }),

  /**
   * Voting: 60 per minute (prevents abuse)
   */
  vote: (userId: string) =>
    rateLimit(userId, {
      keyPrefix: "vote",
      windowMs: 60 * 1000, // 1 minute
      maxRequests: 60,
    }),

  /**
   * Comments: 30 per hour
   */
  createComment: (userId: string) =>
    rateLimit(userId, {
      keyPrefix: "create-comment",
      windowMs: 60 * 60 * 1000, // 1 hour
      maxRequests: 30,
    }),

  /**
   * API requests: 100 per minute (general)
   */
  api: (identifier: string) =>
    rateLimit(identifier, {
      keyPrefix: "api",
      windowMs: 60 * 1000, // 1 minute
      maxRequests: 100,
    }),
};
