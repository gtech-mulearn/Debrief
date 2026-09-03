/**
 * Votes Hooks
 * 
 * TanStack Query hooks for votes.
 * Components should use ONLY these hooks for voting.
 */

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { castVote, removeVote } from "@/lib/api/client/votes";
import { ideaKeys } from "./use-ideas";
import { toast } from "sonner";
import type { IdeaWithDetails } from "@/types/database";

/**
 * Hook for casting/updating a vote with optimistic updates
 */
export function useVote(ideaId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (value: 1 | -1) => castVote(ideaId, { value }),
    
    // Optimistic update
    onMutate: async (newValue) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ideaKeys.detail(ideaId) });
      await queryClient.cancelQueries({ queryKey: ideaKeys.lists() });

      // Snapshot previous value
      const previousIdea = queryClient.getQueryData<{ data: IdeaWithDetails }>(
        ideaKeys.detail(ideaId)
      );

      // Optimistically update the detail cache
      if (previousIdea) {
        const oldVote = previousIdea.data.user_vote?.value;
        let upvotesDelta = 0;
        let downvotesDelta = 0;

        if (oldVote === 1 && newValue === -1) {
          upvotesDelta = -1;
          downvotesDelta = 1;
        } else if (oldVote === -1 && newValue === 1) {
          upvotesDelta = 1;
          downvotesDelta = -1;
        } else if (!oldVote && newValue === 1) {
          upvotesDelta = 1;
        } else if (!oldVote && newValue === -1) {
          downvotesDelta = 1;
        }

        queryClient.setQueryData(ideaKeys.detail(ideaId), {
          data: {
            ...previousIdea.data,
            upvotes_count: previousIdea.data.upvotes_count + upvotesDelta,
            downvotes_count: previousIdea.data.downvotes_count + downvotesDelta,
            user_vote: { value: newValue } as IdeaWithDetails["user_vote"],
          },
        });
      }

      return { previousIdea };
    },

    // Rollback on error
    onError: (err, _newValue, context) => {
      if (context?.previousIdea) {
        queryClient.setQueryData(ideaKeys.detail(ideaId), context.previousIdea);
      }
      // Check for unauthorized - likely session expired
      if (err.message?.includes("Unauthorized") || err.message?.includes("401")) {
        toast.error("Please sign in to vote");
      } else {
        toast.error(err.message || "Failed to vote");
      }
    },

    // Refetch after mutation
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ideaKeys.detail(ideaId) });
      queryClient.invalidateQueries({ queryKey: ideaKeys.lists() });
    },
  });
}

/**
 * Hook for removing a vote with optimistic updates
 */
export function useRemoveVote(ideaId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => removeVote(ideaId),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ideaKeys.detail(ideaId) });

      const previousIdea = queryClient.getQueryData<{ data: IdeaWithDetails }>(
        ideaKeys.detail(ideaId)
      );

      if (previousIdea && previousIdea.data.user_vote) {
        const oldVote = previousIdea.data.user_vote.value;

        queryClient.setQueryData(ideaKeys.detail(ideaId), {
          data: {
            ...previousIdea.data,
            upvotes_count:
              previousIdea.data.upvotes_count - (oldVote === 1 ? 1 : 0),
            downvotes_count:
              previousIdea.data.downvotes_count - (oldVote === -1 ? 1 : 0),
            user_vote: null,
          },
        });
      }

      return { previousIdea };
    },

    onError: (err, _, context) => {
      if (context?.previousIdea) {
        queryClient.setQueryData(ideaKeys.detail(ideaId), context.previousIdea);
      }
      toast.error(err.message || "Failed to remove vote");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ideaKeys.detail(ideaId) });
      queryClient.invalidateQueries({ queryKey: ideaKeys.lists() });
    },
  });
}
