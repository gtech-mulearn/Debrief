/**
 * Collaborators API Route
 * 
 * GET /api/ideas/[id]/collaborators - Get all collaborators for an idea
 */

import { NextRequest } from "next/server";
import { createServerClient, getUser } from "@/lib/supabase/server";
import {
  successResponse,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  withErrorHandling,
} from "@/lib/api/errors";
import type { IdeaCollaboratorWithDetails } from "@/types/database";

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/ideas/[id]/collaborators
 * Returns all collaborators (pending and accepted) for an idea
 */
export const GET = withErrorHandling(async (request: NextRequest, context: RouteContext) => {
  const { id: ideaId } = await context.params;
  const user = await getUser();

  if (!user) {
    throw new UnauthorizedError();
  }

  const supabase = await createServerClient();

  // 1. Verify idea exists
  const { data: idea, error: ideaError } = await supabase
    .from("ideas")
    .select("id, user_id")
    .eq("id", ideaId)
    .single();

  if (ideaError || !idea) {
    throw new NotFoundError("Idea not found");
  }

  // 2. Verify user has permission to view collaborators
  const isOwner = idea.user_id === user.id;
  
  if (!isOwner) {
    // Check if user is a collaborator
    const { data: userCollaboration } = await supabase
      .from("idea_collaborators")
      .select("id")
      .eq("idea_id", ideaId)
      .eq("user_id", user.id)
      .eq("status", "accepted")
      .single();

    if (!userCollaboration) {
      throw new ForbiddenError("You don't have permission to view collaborators for this idea");
    }
  }

  // 3. Fetch all collaborators with user and inviter details
  const { data: collaborators, error: collaboratorsError } = await supabase
    .from("idea_collaborators")
    .select(`
      id,
      idea_id,
      user_id,
      email,
      role,
      status,
      invited_by,
      invited_at,
      accepted_at,
      declined_at,
      invite_token,
      expires_at
    `)
    .eq("idea_id", ideaId)
    .order("invited_at", { ascending: false });

  if (collaboratorsError) {
    throw new Error(`Failed to fetch collaborators: ${collaboratorsError.message}`);
  }

  if (!collaborators) {
    return successResponse({ data: [] });
  }

  // 4. Enrich with user profiles
  const enrichedCollaborators: IdeaCollaboratorWithDetails[] = await Promise.all(
    collaborators.map(async (collab) => {
      const enriched: IdeaCollaboratorWithDetails = { ...collab };

      // Fetch user profile if accepted
      if (collab.user_id) {
        const { data: userProfile } = await supabase
          .from("profiles")
          .select("id, full_name, avatar_url")
          .eq("id", collab.user_id)
          .single();

        if (userProfile) {
          enriched.user = userProfile;
        }
      }

      // Fetch inviter profile
      const { data: inviterProfile } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url")
        .eq("id", collab.invited_by)
        .single();

      if (inviterProfile) {
        enriched.inviter = inviterProfile;
      }

      return enriched;
    })
  );

  return successResponse({ data: enrichedCollaborators });
});
