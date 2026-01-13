/**
 * Delete Idea Dialog
 * 
 * Confirmation dialog for deleting an idea.
 * Includes warning message and redirects after success.
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2, AlertTriangle } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteIdea } from "@/hooks/use-ideas";

interface DeleteIdeaDialogProps {
    ideaId: string;
    ideaTitle: string;
    trigger?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function DeleteIdeaDialog({
    ideaId,
    ideaTitle,
    trigger,
    open: controlledOpen,
    onOpenChange: controlledOnOpenChange,
}: DeleteIdeaDialogProps) {
    const router = useRouter();
    const [internalOpen, setInternalOpen] = useState(false);

    const { mutate: deleteIdea, isPending } = useDeleteIdea();

    // Support both controlled and uncontrolled usage
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
    const setIsOpen = controlledOnOpenChange || setInternalOpen;

    const handleDelete = () => {
        deleteIdea(ideaId, {
            onSuccess: () => {
                setIsOpen(false);
                router.push("/");
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl font-heading text-rose-500">
                        <Trash2 className="h-5 w-5" />
                        Delete Idea
                    </DialogTitle>
                    <DialogDescription className="text-foreground/80">
                        Are you sure you want to delete this idea?
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    {/* Warning Card */}
                    <div className="rounded-xl border border-rose-500/20 bg-rose-950/20 p-4">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-foreground">
                                    This action cannot be undone
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Deleting <span className="font-semibold text-foreground">"{ideaTitle}"</span> will permanently remove:
                                </p>
                                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                                    <li className="flex items-center gap-2">
                                        <span className="h-1 w-1 rounded-full bg-rose-500" />
                                        All version history and pivots
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="h-1 w-1 rounded-full bg-rose-500" />
                                        All collaborators and invites
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="h-1 w-1 rounded-full bg-rose-500" />
                                        All comments and votes
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex-col gap-3 sm:flex-row sm:gap-2">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setIsOpen(false)}
                        disabled={isPending}
                        className="w-full sm:w-auto"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isPending}
                        className="w-full sm:w-auto font-bold bg-rose-600 hover:bg-rose-700"
                    >
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Delete Forever
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
