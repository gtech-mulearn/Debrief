/**
 * Validation Schemas for Team Collaboration
 * Using Zod for runtime validation
 */

import { z } from "zod";

// ===================================
// CONSTANTS
// ===================================

export const COLLABORATOR_ROLES = ["viewer", "editor", "admin"] as const;
export const COLLABORATOR_STATUSES = ["pending", "accepted", "declined"] as const;

// ===================================
// INVITE COLLABORATOR
// ===================================

export const inviteCollaboratorSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters")
    .toLowerCase()
    .trim(),
  role: z.enum(COLLABORATOR_ROLES, {
    message: "Role must be viewer, editor, or admin",
  }),
});

export type InviteCollaboratorInput = z.infer<typeof inviteCollaboratorSchema>;

// ===================================
// ACCEPT INVITE
// ===================================

export const acceptInviteSchema = z.object({
  token: z
    .string()
    .min(1, "Invite token is required")
    .max(100, "Invalid invite token"),
});

export type AcceptInviteInput = z.infer<typeof acceptInviteSchema>;

// ===================================
// UPDATE COLLABORATOR ROLE
// ===================================

export const updateCollaboratorRoleSchema = z.object({
  role: z.enum(COLLABORATOR_ROLES, {
    message: "Role must be viewer, editor, or admin",
  }),
});

export type UpdateCollaboratorRoleInput = z.infer<typeof updateCollaboratorRoleSchema>;

// ===================================
// RESEND INVITE
// ===================================

export const resendInviteSchema = z.object({
  collaboratorId: z.string().uuid("Invalid collaborator ID"),
});

export type ResendInviteInput = z.infer<typeof resendInviteSchema>;
