/**
 * Single Idea API Route
 * 
 * GET /api/ideas/[id] - Get a single idea with details
 * PATCH /api/ideas/[id] - Update an idea (owner or editor/admin collaborator)
 * DELETE /api/ideas/[id] - Delete an idea (owner or admin collaborator)
 */

import { NextRequest } from "next/server";
import { createServerClient, getUser, createAdminClient } from "@/lib/supabase/server";
import {
  successResponse,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ValidationError,
  withErrorHandling,
} from "@/lib/api/errors";
import { enrichOneWithProfile } from "@/lib/db-utils";

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
 * Helper to check if a user can edit an idea (owner or editor/admin collaborator)
 */
async function canUserEditIdea(
  supabase: any,
  ideaId: string,
  userId: string,
  ownerId: string
): Promise<boolean> {
  if (userId === ownerId) return true;

  const { data: collab } = await supabase
    .from("idea_collaborators")
    .select("role, status")
    .eq("idea_id", ideaId)
    .eq("user_id", userId)
    .eq("status", "accepted")
    .single();

  return collab && (collab.role === "editor" || collab.role === "admin");
}

/**
 * Helper to check if a user can delete an idea (owner or admin collaborator)
 */
async function canUserDeleteIdea(
  supabase: any,
  ideaId: string,
  userId: string,
  ownerId: string
): Promise<boolean> {
  if (userId === ownerId) return true;

  const { data: collab } = await supabase
    .from("idea_collaborators")
    .select("role, status")
    .eq("idea_id", ideaId)
    .eq("user_id", userId)
    .eq("status", "accepted")
    .single();

  return collab && collab.role === "admin";
}

/**
 * GET /api/ideas/[id]
 * Fetch a single idea with author info and user's vote
 */
export const GET = withErrorHandling(async (request: NextRequest, context: RouteContext) => {
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
  const enrichedIdea = await enrichOneWithProfile(idea, supabase);

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
      ...enrichedIdea,
      user_vote: userVote,
    },
  });
});

/**
 * PATCH /api/ideas/[id]
 * Update an idea (owner or editor/admin collaborator)
 */
export const PATCH = withErrorHandling(async (request: NextRequest, context: RouteContext) => {
  const { id } = await context.params;
  const user = await getUser();

  if (!user) {
    throw new UnauthorizedError();
  }

  const body = await request.json();
  const { title, description } = body;

  // Validate at least one field is provided
  if (!title && !description) {
    throw new ValidationError({ general: ["Provide at least a title or description to update"] });
  }

  // Validate fields
  if (title && (typeof title !== "string" || title.trim().length < 3)) {
    throw new ValidationError({ title: ["Title must be at least 3 characters"] });
  }
  if (description && (typeof description !== "string" || description.trim().length < 10)) {
    throw new ValidationError({ description: ["Description must be at least 10 characters"] });
  }

  const supabase = await createServerClient();

  // Check if idea exists
  const { data } = await supabase
    .from("ideas")
    .select("id, user_id, title, description")
    .eq("id", id)
    .single();

  if (!data) {
    throw new NotFoundError("Idea not found");
  }

  const idea = data as { id: string; user_id: string; title: string; description: string };

  // Check permission
  const canEdit = await canUserEditIdea(supabase, id, user.id, idea.user_id);
  if (!canEdit) {
    throw new ForbiddenError("You don't have permission to edit this idea");
  }

  // Build update object
  const updates: { title?: string; description?: string; updated_at: string } = {
    updated_at: new Date().toISOString(),
  };
  if (title) updates.title = title.trim();
  if (description) updates.description = description.trim();

  // Update using admin client to bypass RLS
  const adminClient = createAdminClient();
  const { data: updated, error } = await adminClient
    .from("ideas")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return successResponse({ data: updated, message: "Idea updated successfully" });
});

/**
 * DELETE /api/ideas/[id]
 * Delete an idea (owner or admin collaborator)
 */
export const DELETE = withErrorHandling(async (request: NextRequest, context: RouteContext) => {
  const { id } = await context.params;
  const user = await getUser();

  if (!user) {
    throw new UnauthorizedError();
  }

  const supabase = await createServerClient();

  // Check if idea exists and get owner
  const { data } = await supabase
    .from("ideas")
    .select("id, user_id")
    .eq("id", id)
    .single();

  const idea = data as { id: string; user_id: string } | null;

  if (!idea) {
    throw new NotFoundError("Idea not found");
  }

  // Check permission
  const canDelete = await canUserDeleteIdea(supabase, id, user.id, idea.user_id);
  if (!canDelete) {
    throw new ForbiddenError("You don't have permission to delete this idea");
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
