/**
 * Zod Validation Schemas - Ideas
 */

import { z } from "zod";

export const createIdeaSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be at most 200 characters")
    .trim(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(5000, "Description must be at most 5000 characters")
    .trim(),
});

export const updateIdeaSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be at most 200 characters")
    .trim()
    .optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(5000, "Description must be at most 5000 characters")
    .trim()
    .optional(),
});

export const getIdeasQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().min(1).max(50).default(20),
  sort: z.enum(["votes_desc", "votes_asc", "created_desc", "created_asc"]).default("votes_desc"),
});

export type CreateIdeaInput = z.infer<typeof createIdeaSchema>;
export type UpdateIdeaInput = z.infer<typeof updateIdeaSchema>;
export type GetIdeasQuery = z.infer<typeof getIdeasQuerySchema>;
