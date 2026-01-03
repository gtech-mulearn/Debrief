/**
 * Single Idea API Route
 * 
 * GET /api/ideas/[id] - Get a single idea with details
 * DELETE /api/ideas/[id] - Delete an idea (owner only)
 */

import { NextRequest } from "next/server";
import { createServerClient, getUser, createAdminClient } from "@/lib/supabase/server";
import {
  successResponse,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  withErrorHandling,
} from "@/lib/api/errors";

interface RouteContext {
  params: Promise<{ id: string }>;
}

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
  user_id: string;
  value: number;
  created_at: string;
  updated_at: string;
}

/**
 * GET /api/ideas/[id]
 * Fetch a single idea with author info and user's vote
 */
export async function GET(request: NextRequest, context: RouteContext) {
  return withErrorHandling(async () => {
    const { id } = await context.params;
    const supabase = await createServerClient();
    const user = await getUser();

    // Fetch idea
    const { data, error } = await supabase
      .from("ideas")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      throw new NotFoundError("Idea not found");
    }

    const idea = data as unknown as IdeaRow;

    // Fetch author profile
    const { data: profileData } = await supabase
      .from("profiles")
      .select("id, full_name, avatar_url")
      .eq("id", idea.user_id)
      .single();

    const author = (profileData as unknown as ProfileRow) || { 
      id: idea.user_id, 
      full_name: null, 
      avatar_url: null 
    };

    // Get user's vote if authenticated
    let userVote: VoteRow | null = null;
    if (user) {
      const { data: voteData } = await supabase
        .from("votes")
        .select("*")
        .eq("idea_id", id)
        .eq("user_id", user.id)
        .single();

      userVote = voteData as unknown as VoteRow | null;
    }

    return successResponse({
      data: {
        ...idea,
        author,
        user_vote: userVote,
      },
    });
  });
}

/**
 * DELETE /api/ideas/[id]
 * Delete an idea (owner only)
 */
export async function DELETE(request: NextRequest, context: RouteContext) {
  return withErrorHandling(async () => {
    const { id } = await context.params;
    const user = await getUser();

    if (!user) {
      throw new UnauthorizedError();
    }

    const supabase = await createServerClient();

    // Check if idea exists and user owns it
    const { data } = await supabase
      .from("ideas")
      .select("id, user_id")
      .eq("id", id)
      .single();

    const idea = data as { id: string; user_id: string } | null;

    if (!idea) {
      throw new NotFoundError("Idea not found");
    }

    if (idea.user_id !== user.id) {
      throw new ForbiddenError("You can only delete your own ideas");
    }

    // Delete using admin client
    const adminClient = createAdminClient();
    const { error } = await adminClient
      .from("ideas")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return successResponse({ message: "Idea deleted" });
  });
}
