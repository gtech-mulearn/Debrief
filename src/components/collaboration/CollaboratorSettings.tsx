/**
 * Collaborator Settings Component
 * 
 * Displays and manages team members for an idea
 */

"use client";

import { useState } from "react";
import { Users, UserPlus, MoreVertical, Trash2, Mail, Clock, CheckCircle2, XCircle, Copy, Link } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCollaborators, useRemoveCollaborator } from "@/hooks/use-collaborators";
import { InviteDialog } from "./InviteDialog";
import type { IdeaCollaboratorWithDetails } from "@/types/database";

interface CollaboratorSettingsProps {
  ideaId: string;
  isOwner: boolean;
  currentUserId: string;
}

export function CollaboratorSettings({ ideaId, isOwner, currentUserId }: CollaboratorSettingsProps) {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const { data: collaboratorsResponse, isLoading, isError } = useCollaborators(ideaId);
  const { mutate: removeCollaborator } = useRemoveCollaborator(ideaId);

  const collaborators = collaboratorsResponse?.data || [];

  const handleRemove = (collaborator: IdeaCollaboratorWithDetails) => {
    const isSelf = collaborator.user_id === currentUserId;
    const confirmMessage = isSelf
      ? "Are you sure you want to leave this team?"
      : `Remove ${collaborator.email} from this team?`;

    if (!confirm(confirmMessage)) return;

    removeCollaborator(collaborator.id, {
      onSuccess: (response) => {
        toast.success(response.data.message || "Collaborator removed");
      },
      onError: (err: any) => {
        const message = err?.error?.message || err?.message || "Failed to remove collaborator";
        toast.error(message);
      },
    });
  };

  const handleCopyInviteLink = (token: string) => {
    const inviteUrl = `${window.location.origin}/invites/${token}/accept`;
    navigator.clipboard.writeText(inviteUrl);
    toast.success("Invite link copied to clipboard!");
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300";
      case "editor":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300";
      case "viewer":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "declined":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Members
              </CardTitle>
              <CardDescription>
                Manage who can collaborate on this idea
              </CardDescription>
            </div>
            {isOwner && (
              <Button onClick={() => setInviteDialogOpen(true)} size="sm">
                <UserPlus className="mr-2 h-4 w-4" />
                Invite
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent>
          {isLoading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {isError && (
            <div className="text-center py-8 text-red-600">
              Failed to load team members
            </div>
          )}

          {!isLoading && !isError && collaborators.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No team members yet</p>
              {isOwner && (
                <p className="text-sm mt-1">
                  Invite collaborators to work on this idea together
                </p>
              )}
            </div>
          )}

          {!isLoading && !isError && collaborators.length > 0 && (
            <div className="space-y-3">
              {collaborators.map((collaborator) => {
                const isSelf = collaborator.user_id === currentUserId;
                const canRemove = isOwner || isSelf;

                return (
                  <div
                    key={collaborator.id}
                    className="flex items-center gap-4 p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    {/* Avatar */}
                    <Avatar className="h-10 w-10">
                      {collaborator.user?.avatar_url && (
                        <AvatarImage
                          src={collaborator.user.avatar_url}
                          alt={collaborator.user.full_name || collaborator.email}
                        />
                      )}
                      <AvatarFallback>
                        {collaborator.status === "pending" ? (
                          <Mail className="h-5 w-5" />
                        ) : (
                          collaborator.email[0].toUpperCase()
                        )}
                      </AvatarFallback>
                    </Avatar>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium truncate">
                          {collaborator.user?.full_name || collaborator.email}
                          {isSelf && <span className="text-gray-500 ml-1">(You)</span>}
                        </p>
                        {getStatusIcon(collaborator.status)}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                        {collaborator.email}
                      </p>
                      {collaborator.status === "pending" && (
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-xs text-yellow-600">
                            Invitation pending • Expires{" "}
                            {new Date(collaborator.expires_at).toLocaleDateString()}
                          </p>
                          {isOwner && collaborator.invite_token && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-xs"
                              onClick={() => handleCopyInviteLink(collaborator.invite_token!)}
                            >
                              <Copy className="h-3 w-3 mr-1" />
                              Copy Link
                            </Button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Role Badge */}
                    <Badge variant="secondary" className={getRoleColor(collaborator.role)}>
                      {collaborator.role}
                    </Badge>

                    {/* Actions */}
                    {canRemove && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleRemove(collaborator)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            {isSelf ? "Leave Team" : "Remove"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {isOwner && (
        <InviteDialog
          ideaId={ideaId}
          open={inviteDialogOpen}
          onOpenChange={setInviteDialogOpen}
        />
      )}
    </>
  );
}
