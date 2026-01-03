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
import { useRouter } from "next/navigation";
import {
  fetchIdeas,
  fetchIdea,
  createIdea,
  deleteIdea,
} from "@/lib/api/client/ideas";
import { useAuth } from "./use-auth";
import { toast } from "sonner";
import type { CreateIdeaRequest } from "@/types/api";

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
  sort?: "latest" | "popular" | "controversial";
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
    enabled: !!id,
  });
}

/**
 * Hook for creating a new idea
 * Redirects to login if not authenticated
 */
export function useCreateIdea() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  return useMutation({
    mutationFn: async (data: CreateIdeaRequest) => {
      if (!isAuthenticated) {
        router.push("/login?redirectTo=/ideas/new");
        throw new Error("Please sign in to create an idea");
      }
      return createIdea(data);
    },
    onSuccess: () => {
      // Invalidate ideas list to refetch
      queryClient.invalidateQueries({ queryKey: ideaKeys.lists() });
    },
    onError: (err) => {
      if (!err.message.includes("sign in")) {
        toast.error(err.message || "Failed to create idea");
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
      // Remove from cache and invalidate lists
      queryClient.removeQueries({ queryKey: ideaKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: ideaKeys.lists() });
      toast.success("Idea deleted");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete idea");
    },
  });
}
