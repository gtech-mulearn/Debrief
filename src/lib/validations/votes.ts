/**
 * Zod Validation Schemas - Votes
 */

import { z } from "zod";

export const castVoteSchema = z.object({
  value: z.union([z.literal(1), z.literal(-1)]).refine((val) => val === 1 || val === -1, {
    message: "Vote value must be 1 (upvote) or -1 (downvote)",
  }),
});

export type CastVoteInput = z.infer<typeof castVoteSchema>;
