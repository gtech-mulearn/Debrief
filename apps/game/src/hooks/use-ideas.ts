/**
 * Ideas Hooks
 * 
 * TanStack Query hooks for ideas.
 * Components should use ONLY these hooks for data fetching.
 */

"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  fetchIdeas,
  fetchIdea,
  createIdea,
  updateIdea,
  deleteIdea,
} from "@/lib/api/client/ideas";
import type { UpdateIdeaRequest } from "@/lib/api/client/ideas";
import { toast } from "sonner";
import type { CreateIdeaRequest } from "@/types/api";

// Sort options type
export type SortOption = "votes_desc" | "votes_asc" | "created_desc" | "created_asc";

// Query keys for cache management
export const ideaKeys = {
  all: ["ideas"] as const,
  lists: () => [...ideaKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...ideaKeys.lists(), filters] as const,
  details: () => [...ideaKeys.all, "detail"] as const,
  detail: (id: string) => [...ideaKeys.details(), id] as const,
};

/**
 * Hook for fetching paginated ideas with infinite scroll
 */
export function useIdeas(params?: {
  sort?: SortOption;
  limit?: number;
}) {
  return useInfiniteQuery({
    queryKey: ideaKeys.list({ sort: params?.sort }),
    queryFn: ({ pageParam }) =>
      fetchIdeas({
        cursor: pageParam,
        limit: params?.limit ?? 20,
        sort: params?.sort,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
    initialPageParam: undefined as string | undefined,
    staleTime: 30 * 1000, // 30 seconds
  });
}

/**
 * Hook for fetching a single idea
 */
export function useIdea(id: string) {
  return useQuery({
    queryKey: ideaKeys.detail(id),
    queryFn: () => fetchIdea(id),
    staleTime: 30 * 1000,
    enabled: !!id && id !== "undefined",
  });
}

/**
 * Hook for creating a new idea
 */
export function useCreateIdea() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateIdeaRequest) => createIdea(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ideaKeys.lists() });
      toast.success("Idea created!");
    },
    onError: (err) => {
      if (err.message?.includes("Unauthorized") || err.message?.includes("401")) {
        toast.error("Please sign in to create ideas");
      } else {
        toast.error(err.message || "Failed to create idea");
      }
    },
  });
}

/**
 * Hook for updating an idea
 */
export function useUpdateIdea(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateIdeaRequest) => updateIdea(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ideaKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: ideaKeys.lists() });
      toast.success("Idea updated!");
    },
    onError: (err) => {
      if (err.message?.includes("Forbidden") || err.message?.includes("403")) {
        toast.error("You don't have permission to edit this idea");
      } else {
        toast.error(err.message || "Failed to update idea");
      }
    },
  });
}

/**
 * Hook for deleting an idea
 */
export function useDeleteIdea() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteIdea(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: ideaKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: ideaKeys.lists() });
      toast.success("Idea deleted");
    },
    onError: (err) => {
      if (err.message?.includes("Forbidden") || err.message?.includes("403")) {
        toast.error("You don't have permission to delete this idea");
      } else {
        toast.error(err.message || "Failed to delete idea");
      }
    },
  });
}

