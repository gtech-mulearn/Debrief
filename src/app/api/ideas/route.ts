/**
 * Ideas API Route - List & Create
 * 
 * GET /api/ideas - List ideas with cursor pagination
 * POST /api/ideas - Create a new idea (authenticated, rate-limited)
 */

import { NextRequest } from "next/server";
import { createServerClient, getUser, createAdminClient } from "@/lib/supabase/server";
import { createIdeaSchema, getIdeasQuerySchema } from "@/lib/validations/ideas";
import { rateLimiters } from "@/lib/rate-limit";
import {
  successResponse,
  UnauthorizedError,
  RateLimitError,
  withErrorHandling,
} from "@/lib/api/errors";

// Types for database responses
interface IdeaRow {
  id: string;
  user_id: string;
  title: string;
  description: string;
  upvotes_count: number;
  downvotes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
}

interface ProfileRow {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
}

interface VoteRow {
  idea_id: string;
  value: number;
}

/**
 * GET /api/ideas
 * Fetch paginated list of ideas with author info and user's vote
 */
export async function GET(request: NextRequest) {
  return withErrorHandling(async () => {
    const searchParams = request.nextUrl.searchParams;
    
    // Parse and validate query params
    const query = getIdeasQuerySchema.parse({
      cursor: searchParams.get("cursor") || undefined,
      limit: searchParams.get("limit") || undefined,
      sort: searchParams.get("sort") || undefined,
    });

    const supabase = await createServerClient();
    const user = await getUser();

    // Build query - fetch ideas without join first
    let dbQuery = supabase
      .from("ideas")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(query.limit + 1);

    // Apply cursor pagination
    if (query.cursor) {
      const [timestamp, id] = query.cursor.split("_");
      dbQuery = dbQuery.or(`created_at.lt.${timestamp},and(created_at.eq.${timestamp},id.lt.${id})`);
    }

    // Apply sorting
    if (query.sort === "popular") {
      dbQuery = dbQuery.order("upvotes_count", { ascending: false });
    } else if (query.sort === "controversial") {
      dbQuery = dbQuery.order("comments_count", { ascending: false });
    }

    const { data, error } = await dbQuery;

    if (error) {
      throw new Error(error.message);
    }

    const ideas = (data || []) as unknown as IdeaRow[];

    // Check if there are more results
    const hasMore = ideas.length > query.limit;
    const resultsToReturn = hasMore ? ideas.slice(0, -1) : ideas;

    // Get unique user IDs and fetch profiles
    const userIds = [...new Set(resultsToReturn.map((idea) => idea.user_id))];
    let profiles: Record<string, ProfileRow> = {};
    
    if (userIds.length > 0) {
      const { data: profilesData } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url")
        .in("id", userIds);
      
      if (profilesData) {
        profiles = Object.fromEntries(
          (profilesData as unknown as ProfileRow[]).map((p) => [p.id, p])
        );
      }
    }

    // Get user's votes if authenticated
    let userVotes: Record<string, number> = {};
    if (user && resultsToReturn.length > 0) {
      const ideaIds = resultsToReturn.map((idea) => idea.id);
      const { data: votesData } = await supabase
        .from("votes")
        .select("idea_id, value")
        .eq("user_id", user.id)
        .in("idea_id", ideaIds);

      const votes = (votesData || []) as unknown as VoteRow[];
      userVotes = Object.fromEntries(
        votes.map((v) => [v.idea_id, v.value])
      );
    }

    // Combine ideas with authors and votes
    const ideasWithDetails = resultsToReturn.map((idea) => ({
      ...idea,
      author: profiles[idea.user_id] || { id: idea.user_id, full_name: null, avatar_url: null },
      user_vote: userVotes[idea.id]
        ? { idea_id: idea.id, user_id: user?.id, value: userVotes[idea.id] }
        : null,
    }));

    // Generate next cursor
    const lastIdea = resultsToReturn[resultsToReturn.length - 1];
    const nextCursor = hasMore && lastIdea
      ? `${lastIdea.created_at}_${lastIdea.id}`
      : null;

    return successResponse({
      data: ideasWithDetails,
      nextCursor,
      hasMore,
    });
  });
}

/**
 * POST /api/ideas
 * Create a new idea (authenticated, rate-limited)
 */
export async function POST(request: NextRequest) {
  return withErrorHandling(async () => {
    const user = await getUser();

    if (!user) {
      throw new UnauthorizedError();
    }

    // Check rate limit
    const rateLimitResult = await rateLimiters.createIdea(user.id);
    if (!rateLimitResult.success) {
      throw new RateLimitError(
        rateLimitResult.retryAfter!,
        "Too many ideas created. Please try again later."
      );
    }

    // Parse and validate body
    const body = await request.json();
    const validatedData = createIdeaSchema.parse(body);

    // Use admin client for insert
    const adminClient = createAdminClient();

    const { data, error } = await adminClient
      .from("ideas")
      .insert({
        user_id: user.id,
        title: validatedData.title,
        description: validatedData.description,
      } as Record<string, unknown>)
      .select("*")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    const idea = data as unknown as IdeaRow;

    // Fetch author profile
    const supabase = await createServerClient();
    const { data: profileData } = await supabase
      .from("profiles")
      .select("id, full_name, avatar_url")
      .eq("id", user.id)
      .single();

    const author = (profileData as unknown as ProfileRow) || { 
      id: user.id, 
      full_name: user.user_metadata?.full_name || null, 
      avatar_url: user.user_metadata?.avatar_url || null 
    };

    return successResponse({
      data: {
        ...idea,
        author,
        user_vote: null,
      },
    }, 201);
  });
}
