/**
 * Accept Invite API Route
 * 
 * POST /api/invites/[token]/accept - Accept a collaboration invitation
 */

import { NextRequest } from "next/server";
import { createServerClient, getUser } from "@/lib/supabase/server";
import {
  successResponse,
  NotFoundError,
  UnauthorizedError,
  ConflictError,
  ForbiddenError,
  withErrorHandling,
} from "@/lib/api/errors";
import type { IdeaCollaboratorWithDetails, IdeaWithAuthor, Profile } from "@/types/database";

interface RouteContext {
  params: Promise<{ token: string }>;
}

/**
 * POST /api/invites/[token]/accept
 * Accepts a pending invitation using the invite token
 */
export const POST = withErrorHandling(async (request: NextRequest, context: RouteContext) => {
  const { token } = await context.params;
  const user = await getUser();

  if (!user) {
    throw new UnauthorizedError("You must be logged in to accept invitations");
  }

  const supabase = await createServerClient();

  // 1. Fetch invitation by token
  const { data: invitation, error: inviteError } = await supabase
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
    .eq("invite_token", token)
    .single();

  if (inviteError || !invitation) {
    throw new NotFoundError("Invitation not found or invalid");
  }

  // 2. Validate invitation status
  if (invitation.status === "accepted") {
    throw new ConflictError("This invitation has already been accepted");
  }

  if (invitation.status === "declined") {
    throw new ConflictError("This invitation has been declined");
  }

  // 3. Check expiration
  const expiresAt = new Date(invitation.expires_at);
  if (expiresAt < new Date()) {
    throw new ConflictError("This invitation has expired");
  }

  // 4. Get user email from profile
  const { data: userProfile } = await supabase
    .from("profiles")
    .select("email")
    .eq("id", user.id)
    .single();

  if (!userProfile?.email) {
    throw new Error("User profile not found");
  }

  // 5. Verify email matches invitation (case-insensitive)
  if (userProfile.email.toLowerCase() !== invitation.email.toLowerCase()) {
    throw new ForbiddenError(
      "This invitation was sent to a different email address. Please sign in with the invited email."
    );
  }

  // 6. Verify idea still exists
  const { data: idea, error: ideaError } = await supabase
    .from("ideas")
    .select("*")
    .eq("id", invitation.idea_id)
    .single();

  if (ideaError || !idea) {
    throw new NotFoundError("The idea associated with this invitation no longer exists");
  }

  // 7. Prevent accepting if user is the idea owner
  if (idea.user_id === user.id) {
    throw new ConflictError("You cannot accept an invitation to your own idea");
  }

  // 8. Check for existing accepted collaboration (shouldn't happen, but handle gracefully)
  const { data: existingCollab } = await supabase
    .from("idea_collaborators")
    .select("id, status")
    .eq("idea_id", invitation.idea_id)
    .eq("user_id", user.id)
    .eq("status", "accepted")
    .single();

  if (existingCollab) {
    throw new ConflictError("You are already a collaborator on this idea");
  }

  // 9. Update invitation to accepted
  const { data: updatedCollaborator, error: updateError } = await supabase
    .from("idea_collaborators")
    .update({
      user_id: user.id,
      status: "accepted",
      accepted_at: new Date().toISOString(),
      invite_token: null, // Clear token after acceptance
    })
    .eq("id", invitation.id)
    .select()
    .single();

  if (updateError || !updatedCollaborator) {
    throw new Error(`Failed to accept invitation: ${updateError?.message || "Unknown error"}`);
  }

  // 10. Fetch idea author profile
  const { data: authorProfile } = await supabase
    .from("profiles")
    .select("id, full_name, avatar_url")
    .eq("id", idea.user_id)
    .single();

  const ideaWithAuthor: IdeaWithAuthor = {
    ...idea,
    author: authorProfile || { id: idea.user_id, full_name: null, avatar_url: null },
  };

  // 11. Fetch inviter and user profiles for enriched response
  const { data: inviterProfile } = await supabase
    .from("profiles")
    .select("id, full_name, avatar_url")
    .eq("id", invitation.invited_by)
    .single();

  const { data: currentUserProfile } = await supabase
    .from("profiles")
    .select("id, full_name, avatar_url")
    .eq("id", user.id)
    .single();

  const enrichedCollaborator: IdeaCollaboratorWithDetails = {
    ...updatedCollaborator,
    user: currentUserProfile || undefined,
    inviter: inviterProfile || undefined,
  };

  return successResponse({
    data: {
      collaborator: enrichedCollaborator,
      idea: ideaWithAuthor,
    },
  });
});
