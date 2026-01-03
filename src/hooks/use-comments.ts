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
import {
  fetchComments,
  createComment,
  deleteComment,
} from "@/lib/api/client/comments";
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
    enabled: !!ideaId && ideaId !== "undefined",
  });
}

/**
 * Hook for creating a new comment
 */
export function useCreateComment(ideaId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCommentRequest) => createComment(ideaId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(ideaId) });
      queryClient.invalidateQueries({ queryKey: ideaKeys.detail(ideaId) });
      queryClient.invalidateQueries({ queryKey: ideaKeys.lists() });
    },
    onError: (err) => {
      if (err.message?.includes("Unauthorized") || err.message?.includes("401")) {
        toast.error("Please sign in to comment");
      } else {
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
      toast.success("Comment deleted");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete comment");
    },
  });
}
