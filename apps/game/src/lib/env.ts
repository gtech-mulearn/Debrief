/**
 * Environment Variables - Client Safe
 * 
 * ONLY variables prefixed with NEXT_PUBLIC_ are exposed here.
 * These are safe to use in client components.
 * 
 * Uses lazy getters to avoid throwing at module initialization.
 */

export const env = {
  get NEXT_PUBLIC_SUPABASE_URL(): string {
    const value = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!value) {
      throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL. Check your .env.local file.");
    }
    return value;
  },
  get NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY(): string {
    const value = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!value) {
      throw new Error("Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. Check your .env.local file.");
    }
    return value;
  },
  get NEXT_PUBLIC_APP_URL(): string {
    return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  },
} as const;

// Type for client-safe environment
export type PublicEnv = typeof env;
