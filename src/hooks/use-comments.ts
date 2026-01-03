/**
 * Comments Hooks
 * 
 * TanStack Query hooks for comments.
 * Components should use ONLY these hooks for comments.
 */

"use client";

import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  fetchComments,
  createComment,
  deleteComment,
} from "@/lib/api/client/comments";
import { useAuth } from "./use-auth";
import { ideaKeys } from "./use-ideas";
import { toast } from "sonner";
import type { CreateCommentRequest } from "@/types/api";

// Query keys for comments
export const commentKeys = {
  all: ["comments"] as const,
  lists: () => [...commentKeys.all, "list"] as const,
  list: (ideaId: string) => [...commentKeys.lists(), ideaId] as const,
};

/**
 * Hook for fetching paginated comments for an idea
 */
export function useComments(ideaId: string, params?: { limit?: number }) {
  return useInfiniteQuery({
    queryKey: commentKeys.list(ideaId),
    queryFn: ({ pageParam }) =>
      fetchComments(ideaId, {
        cursor: pageParam,
        limit: params?.limit ?? 20,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
    initialPageParam: undefined as string | undefined,
    staleTime: 30 * 1000,
    enabled: !!ideaId,
  });
}

/**
 * Hook for creating a new comment
 * Redirects to login if not authenticated
 */
export function useCreateComment(ideaId: string) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  return useMutation({
    mutationFn: async (data: CreateCommentRequest) => {
      if (!isAuthenticated) {
        router.push(`/login?redirectTo=/ideas/${ideaId}`);
        throw new Error("Please sign in to comment");
      }
      return createComment(ideaId, data);
    },
    onSuccess: () => {
      // Invalidate comments list
      queryClient.invalidateQueries({ queryKey: commentKeys.list(ideaId) });
      // Invalidate idea to update comments_count
      queryClient.invalidateQueries({ queryKey: ideaKeys.detail(ideaId) });
      queryClient.invalidateQueries({ queryKey: ideaKeys.lists() });
    },
    onError: (err) => {
      if (!err.message.includes("sign in")) {
        toast.error(err.message || "Failed to add comment");
      }
    },
  });
}

/**
 * Hook for deleting a comment
 */
export function useDeleteComment(ideaId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => deleteComment(ideaId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(ideaId) });
      queryClient.invalidateQueries({ queryKey: ideaKeys.detail(ideaId) });
      queryClient.invalidateQueries({ queryKey: ideaKeys.lists() });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete comment");
    },
  });
}
