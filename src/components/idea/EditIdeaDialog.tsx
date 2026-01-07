/**
 * Edit Idea Dialog
 * 
 * Modal dialog for editing idea title and description.
 * Fully responsive with glass morphism design.
 */

"use client";

import { useState, useEffect } from "react";
import { Loader2, Pencil } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateIdea } from "@/hooks/use-ideas";
import { cn } from "@/lib/utils";

interface EditIdeaDialogProps {
    ideaId: string;
    currentTitle: string;
    currentDescription: string;
    trigger?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function EditIdeaDialog({
    ideaId,
    currentTitle,
    currentDescription,
    trigger,
    open: controlledOpen,
    onOpenChange: controlledOnOpenChange,
}: EditIdeaDialogProps) {
    const [internalOpen, setInternalOpen] = useState(false);
    const [title, setTitle] = useState(currentTitle);
    const [description, setDescription] = useState(currentDescription);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const { mutate: updateIdea, isPending } = useUpdateIdea(ideaId);

    // Support both controlled and uncontrolled usage
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
    const setIsOpen = controlledOnOpenChange || setInternalOpen;

    // Reset form when dialog opens
    useEffect(() => {
        if (isOpen) {
            setTitle(currentTitle);
            setDescription(currentDescription);
            setErrors({});
        }
    }, [isOpen, currentTitle, currentDescription]);

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!title.trim()) {
            newErrors.title = "Title is required";
        } else if (title.trim().length < 3) {
            newErrors.title = "Title must be at least 3 characters";
        }

        if (!description.trim()) {
            newErrors.description = "Description is required";
        } else if (description.trim().length < 10) {
            newErrors.description = "Description must be at least 10 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        if (!validateForm()) return;

        // Only update changed fields
        const updates: { title?: string; description?: string } = {};
        if (title.trim() !== currentTitle) updates.title = title.trim();
        if (description.trim() !== currentDescription) updates.description = description.trim();

        if (Object.keys(updates).length === 0) {
            setIsOpen(false);
            return;
        }

        updateIdea(updates, {
            onSuccess: () => {
                setIsOpen(false);
            },
            onError: (error: Error) => {
                try {
                    const parsed = JSON.parse(error.message);
                    if (parsed.errors) {
                        const serverErrors: Record<string, string> = {};
                        Object.entries(parsed.errors).forEach(([key, msgs]) => {
                            serverErrors[key] = (msgs as string[]).join(", ");
                        });
                        setErrors(serverErrors);
                    }
                } catch {
                    setErrors({ general: error.message || "Failed to update idea" });
                }
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) setErrors({});
        }}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl font-heading">
                        <Pencil className="h-5 w-5 text-primary" />
                        Edit Idea
                    </DialogTitle>
                    <DialogDescription>
                        Update your idea's title and description.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-5 py-4">
                        {/* General Error */}
                        {errors.general && (
                            <div className="rounded-lg border border-rose-500/20 bg-rose-950/20 px-4 py-3 text-sm text-rose-200">
                                {errors.general}
                            </div>
                        )}

                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="edit-title" className="text-foreground">
                                Title <span className="text-rose-500">*</span>
                            </Label>
                            <Input
                                id="edit-title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="A compelling title for your idea"
                                maxLength={200}
                                className={cn(
                                    "bg-white/5 border-white/10 focus-visible:ring-primary/50",
                                    errors.title && "border-rose-500/50 focus-visible:ring-rose-500/50"
                                )}
                            />
                            {errors.title && (
                                <p className="text-sm text-rose-500">{errors.title}</p>
                            )}
                            <p className="text-xs text-muted-foreground text-right">
                                {title.length}/200
                            </p>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="edit-description" className="text-foreground">
                                Description <span className="text-rose-500">*</span>
                            </Label>
                            <Textarea
                                id="edit-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe your idea in detail..."
                                rows={6}
                                maxLength={5000}
                                className={cn(
                                    "resize-none bg-white/5 border-white/10 focus-visible:ring-primary/50 min-h-[150px]",
                                    errors.description && "border-rose-500/50 focus-visible:ring-rose-500/50"
                                )}
                            />
                            {errors.description && (
                                <p className="text-sm text-rose-500">{errors.description}</p>
                            )}
                            <p className="text-xs text-muted-foreground text-right">
                                {description.length}/5000
                            </p>
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
                            type="submit"
                            variant="shimmer-primary"
                            disabled={isPending}
                            className="w-full sm:w-auto font-bold"
                        >
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
