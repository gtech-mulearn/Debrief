/**
 * Team Collaboration Hooks
 * React Query hooks for collaboration features
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  inviteCollaborator,
  fetchCollaborators,
  acceptInvite,
  removeCollaborator,
} from "@/lib/api/client/collaborators";
import type { InviteCollaboratorRequest } from "@/types/api";

// ===================================
// QUERY KEYS
// ===================================

export const collaboratorKeys = {
  all: ["collaborators"] as const,
  lists: () => [...collaboratorKeys.all, "list"] as const,
  list: (ideaId: string) => [...collaboratorKeys.lists(), ideaId] as const,
  detail: (id: string) => [...collaboratorKeys.all, "detail", id] as const,
};

// ===================================
// HOOKS
// ===================================

/**
 * Fetch collaborators for an idea
 */
export function useCollaborators(ideaId: string) {
  return useQuery({
    queryKey: collaboratorKeys.list(ideaId),
    queryFn: () => fetchCollaborators(ideaId),
    staleTime: 30000, // 30 seconds
  });
}

/**
 * Invite a collaborator to an idea
 */
export function useInviteCollaborator(ideaId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: InviteCollaboratorRequest) => inviteCollaborator(ideaId, data),
    onSuccess: () => {
      // Invalidate collaborators list to refetch with new invitation
      queryClient.invalidateQueries({ queryKey: collaboratorKeys.list(ideaId) });
    },
  });
}

/**
 * Accept a collaboration invitation
 */
export function useAcceptInvite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (token: string) => acceptInvite(token),
    onSuccess: (response) => {
      // Invalidate collaborators list for this idea
      queryClient.invalidateQueries({
        queryKey: collaboratorKeys.list(response.data.idea.id),
      });

      // Invalidate ideas list as user now has access to this idea
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
    },
  });
}

/**
 * Remove a collaborator from an idea
 */
export function useRemoveCollaborator(ideaId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (collaboratorId: string) => removeCollaborator(ideaId, collaboratorId),
    onSuccess: () => {
      // Invalidate collaborators list to refetch without removed collaborator
      queryClient.invalidateQueries({ queryKey: collaboratorKeys.list(ideaId) });
    },
  });
}

/**
 * Hook to get the current user's collaboration role for an idea
 * Returns: { role, canEdit, canManage, isCollaborator, isLoading }
 */
export function useCollaboratorRole(ideaId: string, userId: string | undefined, isOwner: boolean) {
  const { data: collaboratorsResponse, isLoading } = useCollaborators(ideaId);
  
  // Find the current user's collaboration entry
  const userCollaboration = collaboratorsResponse?.data?.find(
    (collab) => collab.user_id === userId && collab.status === "accepted"
  );
  
  const role = userCollaboration?.role || null;
  const isCollaborator = !!userCollaboration;
  
  // Editors and admins can edit (owner always can)
  const canEdit = isOwner || role === "editor" || role === "admin";
  
  // Only owners and admin collaborators can manage team
  const canManage = isOwner || role === "admin";
  
  return {
    role,
    isCollaborator,
    canEdit,
    canManage,
    isLoading,
  };
}
