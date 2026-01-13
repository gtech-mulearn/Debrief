/**
 * Invite Collaborator Dialog
 * 
 * Modal dialog for inviting team members to collaborate on an idea
 */

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, UserPlus, Shield, Eye, Edit, Check } from "lucide-react";
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
import { inviteCollaboratorSchema } from "@/lib/validations/collaborators";
import { useInviteCollaborator } from "@/hooks/use-collaborators";
import type { InviteCollaboratorRequest } from "@/types/api";
import { cn } from "@/lib/utils";

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

  const { mutate: invite, isPending } = useInviteCollaborator(ideaId);

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
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <UserPlus className="h-5 w-5 text-primary" />
            Invite Team Member
          </DialogTitle>
          <DialogDescription>
            Send an invitation to collaborate on this idea. They&apos;ll receive an email with a
            link to join.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
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
              className="bg-white/5 border-white/10"
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
            <div className="grid gap-3">
              {(Object.keys(ROLE_DESCRIPTIONS) as Array<keyof typeof ROLE_DESCRIPTIONS>).map(
                (role) => {
                  const { icon: Icon, label, description } = ROLE_DESCRIPTIONS[role];
                  const isSelected = selectedRole === role;
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      disabled={isPending}
                      className={cn(
                        "relative flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-all",
                        isSelected
                          ? "border-primary bg-primary/10 shadow-[0_0_15px_-5px_rgba(var(--primary),0.2)]"
                          : "border-white/10 bg-[#09090b] hover:border-white/20 hover:bg-white/5",
                        isPending && "cursor-not-allowed opacity-50"
                      )}
                      aria-pressed={isSelected}
                    >
                      <div className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors",
                        isSelected ? "border-primary/20 bg-primary/20 text-primary" : "border-white/10 bg-white/5 text-muted-foreground"
                      )}>
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className={cn("font-semibold", isSelected ? "text-primary" : "text-foreground")}>
                          {label}
                        </div>
                        <div className="text-xs text-muted-foreground leading-relaxed">
                          {description}
                        </div>
                      </div>

                      {isSelected && (
                        <div className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="font-semibold">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send Invitation
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
