/**
 * API Client - Comments
 * 
 * Client-side functions to call comments API routes.
 * Components should use hooks, not these functions directly.
 */

import type {
  CreateCommentRequest,
  CreateCommentResponse,
  GetCommentsResponse,
} from "@/types/api";

/**
 * Fetch paginated comments for an idea
 */
export async function fetchComments(
  ideaId: string,
  params?: { cursor?: string; limit?: number }
): Promise<GetCommentsResponse> {
  const searchParams = new URLSearchParams();
  
  if (params?.cursor) searchParams.set("cursor", params.cursor);
  if (params?.limit) searchParams.set("limit", String(params.limit));

  const url = `/api/ideas/${ideaId}/comments?${searchParams.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch comments");
  }

  return response.json();
}

/**
 * Create a new comment on an idea
 */
export async function createComment(
  ideaId: string,
  data: CreateCommentRequest
): Promise<CreateCommentResponse> {
  const response = await fetch(`/api/ideas/${ideaId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create comment");
  }

  return response.json();
}

/**
 * Delete a comment
 */
export async function deleteComment(
  ideaId: string,
  commentId: string
): Promise<void> {
  const response = await fetch(`/api/ideas/${ideaId}/comments/${commentId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete comment");
  }
}
