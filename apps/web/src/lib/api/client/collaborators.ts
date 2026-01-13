/**
 * Team Collaboration API Client
 * Client-side functions for collaboration features
 */

import { apiClient } from "./base";
import type {
  InviteCollaboratorRequest,
  InviteCollaboratorResponse,
  GetCollaboratorsResponse,
  AcceptInviteRequest,
  AcceptInviteResponse,
  RemoveCollaboratorResponse,
} from "@/types/api";

// ===================================
// INVITE COLLABORATOR
// ===================================

export async function inviteCollaborator(
  ideaId: string,
  data: InviteCollaboratorRequest
): Promise<InviteCollaboratorResponse> {
  const response = await apiClient.post<InviteCollaboratorResponse>(
    `/api/ideas/${ideaId}/invite`,
    data
  );
  
  if (response.error) {
    throw new Error(response.error.message);
  }
  
  return response.data!;
}

// ===================================
// GET COLLABORATORS
// ===================================

export async function fetchCollaborators(ideaId: string): Promise<GetCollaboratorsResponse> {
  const response = await apiClient.get<GetCollaboratorsResponse>(
    `/api/ideas/${ideaId}/collaborators`
  );
  
  if (response.error) {
    throw new Error(response.error.message);
  }
  
  return response.data!;
}

// ===================================
// ACCEPT INVITE
// ===================================

export async function acceptInvite(token: string): Promise<AcceptInviteResponse> {
  const response = await apiClient.post<AcceptInviteResponse>(
    `/api/invites/${token}/accept`
  );
  
  if (response.error) {
    throw new Error(response.error.message);
  }
  
  return response.data!;
}

// ===================================
// REMOVE COLLABORATOR
// ===================================

export async function removeCollaborator(
  ideaId: string,
  collaboratorId: string
): Promise<RemoveCollaboratorResponse> {
  const response = await apiClient.delete<RemoveCollaboratorResponse>(
    `/api/ideas/${ideaId}/collaborators/${collaboratorId}`
  );
  
  if (response.error) {
    throw new Error(response.error.message);
  }
  
  return response.data!;
}
