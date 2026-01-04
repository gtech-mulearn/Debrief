/**
 * Remove Collaborator API Route
 * 
 * DELETE /api/ideas/[id]/collaborators/[collaboratorId] - Remove a collaborator from an idea
 */

import { NextRequest } from "next/server";
import { createServerClient, getUser } from "@/lib/supabase/server";
import {
  successResponse,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  withErrorHandling,
} from "@/lib/api/errors";

interface RouteContext {
  params: Promise<{ id: string; collaboratorId: string }>;
}

/**
 * DELETE /api/ideas/[id]/collaborators/[collaboratorId]
 * Removes a collaborator or cancels a pending invitation
 */
export const DELETE = withErrorHandling(async (request: NextRequest, context: RouteContext) => {
  const { id: ideaId, collaboratorId } = await context.params;
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

  // 2. Fetch the collaborator to be removed
  const { data: collaborator, error: collaboratorError } = await supabase
    .from("idea_collaborators")
    .select("id, idea_id, user_id, email, role, status")
    .eq("id", collaboratorId)
    .eq("idea_id", ideaId)
    .single();

  if (collaboratorError || !collaborator) {
    throw new NotFoundError("Collaborator not found");
  }

  // 3. Check permissions
  const isOwner = idea.user_id === user.id;
  const isSelfRemoval = collaborator.user_id === user.id;

  if (!isOwner && !isSelfRemoval) {
    // Check if user is an admin collaborator
    const { data: userCollaboration } = await supabase
      .from("idea_collaborators")
      .select("role")
      .eq("idea_id", ideaId)
      .eq("user_id", user.id)
      .eq("status", "accepted")
      .eq("role", "admin")
      .single();

    if (!userCollaboration) {
      throw new ForbiddenError("You don't have permission to remove collaborators");
    }

    // Admins cannot remove other admins (only owner can)
    if (collaborator.role === "admin") {
      throw new ForbiddenError("Only the idea owner can remove admin collaborators");
    }
  }

  // 4. Prevent removing the last admin (if applicable)
  if (collaborator.role === "admin" && collaborator.status === "accepted") {
    const { count: adminCount } = await supabase
      .from("idea_collaborators")
      .select("id", { count: "exact", head: true })
      .eq("idea_id", ideaId)
      .eq("status", "accepted")
      .eq("role", "admin");

    // Check if owner exists (owner acts as implicit admin)
    const hasOwner = !!idea.user_id;

    if (!hasOwner && (adminCount || 0) <= 1) {
      throw new ConflictError(
        "Cannot remove the last admin. Promote another collaborator to admin first."
      );
    }
  }

  // 5. Delete the collaborator
  const { error: deleteError } = await supabase
    .from("idea_collaborators")
    .delete()
    .eq("id", collaboratorId);

  if (deleteError) {
    throw new Error(`Failed to remove collaborator: ${deleteError.message}`);
  }

  return successResponse({ 
    data: { 
      success: true,
      message: isSelfRemoval ? "You have left the team" : "Collaborator removed successfully"
    } 
  });
});
