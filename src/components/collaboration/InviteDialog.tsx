/**
 * Invite Collaborator Dialog
 * 
 * Modal dialog for inviting team members to collaborate on an idea
 */

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, UserPlus, Shield, Eye, Edit } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/dropdown-menu";
import { inviteCollaboratorSchema } from "@/lib/validations/collaborators";
import { useInviteCollaborator } from "@/hooks/use-collaborators";
import type { InviteCollaboratorRequest } from "@/types/api";

interface InviteDialogProps {
  ideaId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ROLE_DESCRIPTIONS = {
  viewer: {
    icon: Eye,
    label: "Viewer",
    description: "Can view the idea and all progress, but cannot make changes",
  },
  editor: {
    icon: Edit,
    label: "Editor",
    description: "Can view and edit the idea, levels, and provide feedback",
  },
  admin: {
    icon: Shield,
    label: "Admin",
    description: "Full access including managing team members",
  },
} as const;

export function InviteDialog({ ideaId, open, onOpenChange }: InviteDialogProps) {
  const [selectedRole, setSelectedRole] = useState<"viewer" | "editor" | "admin">("editor");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InviteCollaboratorRequest>({
    resolver: zodResolver(inviteCollaboratorSchema),
    defaultValues: {
      role: "editor",
    },
  });

  const { mutate: invite, isPending, isError, error } = useInviteCollaborator(ideaId);

  const onSubmit = (data: InviteCollaboratorRequest) => {
    invite(
      { ...data, role: selectedRole },
      {
        onSuccess: () => {
          toast.success("Invitation sent!", {
            description: `${data.email} will receive an invitation email.`,
          });
          reset();
          onOpenChange(false);
        },
        onError: (err: any) => {
          const message = err?.error?.message || err?.message || "Failed to send invitation";
          toast.error("Invitation failed", {
            description: message,
          });
        },
      }
    );
  };

  const handleClose = () => {
    if (!isPending) {
      reset();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Invite Team Member
          </DialogTitle>
          <DialogDescription>
            Send an invitation to collaborate on this idea. They&apos;ll receive an email with a
            link to join.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="colleague@example.com"
              {...register("email")}
              disabled={isPending}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-red-600" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div className="space-y-3">
            <Label>Permission Level</Label>
            <div className="space-y-2">
              {(Object.keys(ROLE_DESCRIPTIONS) as Array<keyof typeof ROLE_DESCRIPTIONS>).map(
                (role) => {
                  const { icon: Icon, label, description } = ROLE_DESCRIPTIONS[role];
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      disabled={isPending}
                      className={`
                        w-full flex items-start gap-3 p-3 rounded-lg border-2 transition-all
                        ${
                          selectedRole === role
                            ? "border-blue-600 bg-blue-50 dark:bg-blue-950"
                            : "border-gray-200 hover:border-gray-300 dark:border-gray-700"
                        }
                        ${isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                      `}
                      aria-pressed={selectedRole === role}
                    >
                      <Icon
                        className={`h-5 w-5 mt-0.5 ${
                          selectedRole === role ? "text-blue-600" : "text-gray-500"
                        }`}
                      />
                      <div className="flex-1 text-left">
                        <div className="font-medium">{label}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {description}
                        </div>
                      </div>
                      {selectedRole === role && (
                        <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center">
                          <svg
                            className="h-3 w-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send Invitation
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
