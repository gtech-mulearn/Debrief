/**
 * Idea Actions Menu
 * 
 * Dropdown menu with edit, delete, and other actions for ideas.
 * Shows options based on user permissions.
 */

"use client";

import { useState } from "react";
import { MoreVertical, Pencil, Trash2, Share2, Copy, Globe, Lock } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EditIdeaDialog } from "./EditIdeaDialog";
import { DeleteIdeaDialog } from "./DeleteIdeaDialog";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface IdeaActionsMenuProps {
    ideaId: string;
    ideaTitle: string;
    ideaDescription: string;
    visibility: "public" | "private";
    canEdit: boolean;
    canDelete: boolean;
}

export function IdeaActionsMenu({
    ideaId,
    ideaTitle,
    ideaDescription,
    canEdit,
    canDelete,
    visibility,
}: IdeaActionsMenuProps) {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const router = useRouter();

    const handleToggleVisibility = async () => {
        const supabase = createClient();
        const newVisibility = visibility === "public" ? "private" : "public";

        const { error } = await supabase
            .from("ideas")
            .update({ visibility: newVisibility })
            .eq("id", ideaId);

        if (error) {
            toast.error("Failed to update visibility");
            return;
        }

        toast.success(`Idea is now ${newVisibility}`);
        router.refresh();
    };

    const handleCopyLink = () => {
        const url = `${window.location.origin}/share/${ideaId}`;
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
    };

    // Don't render if no actions available
    if (!canEdit && !canDelete) {
        return null;
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 text-muted-foreground hover:text-foreground transition-all"
                    >
                        <MoreVertical className="h-5 w-5" />
                        <span className="sr-only">Open idea menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    className="w-48 bg-[#09090b]/95 backdrop-blur-xl border-white/10"
                >
                    {/* Share option - always visible */}
                    <DropdownMenuItem
                        onClick={handleCopyLink}
                        className="cursor-pointer gap-2 text-muted-foreground hover:text-foreground"
                    >
                        <Copy className="h-4 w-4" />
                        Share
                    </DropdownMenuItem>

                    {/* Share option - always visible */}
                    <DropdownMenuItem
                        onClick={handleCopyLink}
                        className="cursor-pointer gap-2 text-muted-foreground hover:text-foreground"
                    >
                        <Copy className="h-4 w-4" />
                        Share Link
                    </DropdownMenuItem>

                    {(canEdit || canDelete) && <DropdownMenuSeparator className="bg-white/10" />}

                    {/* Visibility Toggle */}
                    {canEdit && (
                        <DropdownMenuItem
                            onClick={handleToggleVisibility}
                            className="cursor-pointer gap-2 text-muted-foreground hover:text-foreground"
                        >
                            {visibility === "public" ? (
                                <>
                                    <Lock className="h-4 w-4" />
                                    Make Private
                                </>
                            ) : (
                                <>
                                    <Globe className="h-4 w-4" />
                                    Make Public
                                </>
                            )}
                        </DropdownMenuItem>
                    )}

                    {/* Edit option */}
                    {canEdit && (
                        <DropdownMenuItem
                            onClick={() => setEditOpen(true)}
                            className="cursor-pointer gap-2 text-muted-foreground hover:text-foreground"
                        >
                            <Pencil className="h-4 w-4" />
                            Edit Idea
                        </DropdownMenuItem>
                    )}

                    {/* Delete option */}
                    {canDelete && (
                        <DropdownMenuItem
                            onClick={() => setDeleteOpen(true)}
                            className="cursor-pointer gap-2 text-rose-500 focus:text-rose-500 focus:bg-rose-500/10"
                        >
                            <Trash2 className="h-4 w-4" />
                            Delete Idea
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Dialogs */}
            <EditIdeaDialog
                ideaId={ideaId}
                currentTitle={ideaTitle}
                currentDescription={ideaDescription}
                open={editOpen}
                onOpenChange={setEditOpen}
            />

            <DeleteIdeaDialog
                ideaId={ideaId}
                ideaTitle={ideaTitle}
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
            />
        </>
    );
}
