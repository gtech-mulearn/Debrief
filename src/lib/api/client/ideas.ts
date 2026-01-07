/**
 * API Client - Ideas
 * 
 * Client-side functions to call ideas API routes.
 * Components should use hooks, not these functions directly.
 */

import type {
  CreateIdeaRequest,
  CreateIdeaResponse,
  GetIdeasResponse,
  GetIdeaResponse,
} from "@/types/api";

const API_BASE = "/api/ideas";

// Sort options type
type SortOption = "votes_desc" | "votes_asc" | "created_desc" | "created_asc";

/**
 * Fetch paginated ideas list
 */
export async function fetchIdeas(params?: {
  cursor?: string;
  limit?: number;
  sort?: SortOption;
}): Promise<GetIdeasResponse> {
  const searchParams = new URLSearchParams();
  
  if (params?.cursor) searchParams.set("cursor", params.cursor);
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.sort) searchParams.set("sort", params.sort);

  const url = `${API_BASE}?${searchParams.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch ideas");
  }

  return response.json();
}

/**
 * Fetch a single idea by ID
 */
export async function fetchIdea(id: string): Promise<GetIdeaResponse> {
  const response = await fetch(`${API_BASE}/${id}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch idea");
  }

  return response.json();
}

/**
 * Create a new idea
 */
export async function createIdea(
  data: CreateIdeaRequest
): Promise<CreateIdeaResponse> {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create idea");
  }

  return response.json();
}

/**
 * Update an idea
 */
export interface UpdateIdeaRequest {
  title?: string;
  description?: string;
}

export async function updateIdea(id: string, data: UpdateIdeaRequest): Promise<GetIdeaResponse> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update idea");
  }

  return response.json();
}

/**
 * Delete an idea
 */
export async function deleteIdea(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete idea");
  }
}

