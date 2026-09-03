/**
 * API Client - Votes
 * 
 * Client-side functions to call votes API routes.
 * Components should use hooks, not these functions directly.
 */

import type { CastVoteRequest, CastVoteResponse, RemoveVoteResponse } from "@/types/api";

/**
 * Cast or update a vote on an idea
 */
export async function castVote(
  ideaId: string,
  data: CastVoteRequest
): Promise<CastVoteResponse> {
  const response = await fetch(`/api/ideas/${ideaId}/vote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to vote");
  }

  return response.json();
}

/**
 * Remove a vote from an idea
 */
export async function removeVote(ideaId: string): Promise<RemoveVoteResponse> {
  const response = await fetch(`/api/ideas/${ideaId}/vote`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to remove vote");
  }

  return response.json();
}
