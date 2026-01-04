"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreatePivot, useVersionHistory } from "@/hooks/use-pivots";
import { Loader2, GitBranch, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

interface PivotDialogProps {
  ideaId: string;
  currentTitle: string;
  currentDescription: string;
  trigger?: React.ReactNode;
}

export function PivotDialog({
  ideaId,
  currentTitle,
  currentDescription,
  trigger,
}: PivotDialogProps) {
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [pivotReason, setPivotReason] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data: historyData } = useVersionHistory(ideaId);
  const { mutate: createPivot, isPending } = useCreatePivot(ideaId);

  const nextVersionNumber = (historyData?.data?.length || 0) + 1;

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // At least one of title or description must be provided
    if (!newTitle.trim() && !newDescription.trim()) {
      newErrors.general = "Please provide at least a new title or description";
    }

    // Pivot reason is required and must be at least 10 characters
    if (!pivotReason.trim()) {
      newErrors.pivotReason = "Pivot reason is required";
    } else if (pivotReason.trim().length < 10) {
      newErrors.pivotReason = "Pivot reason must be at least 10 characters";
    }

    // Optional field validations
    if (newTitle.trim() && newTitle.trim().length < 3) {
      newErrors.newTitle = "Title must be at least 3 characters";
    }
    if (newDescription.trim() && newDescription.trim().length < 10) {
      newErrors.newDescription = "Description must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    createPivot(
      {
        new_title: newTitle.trim() || undefined,
        new_description: newDescription.trim() || undefined,
        pivot_reason: pivotReason.trim(),
      },
      {
        onSuccess: () => {
          setOpen(false);
          setNewTitle("");
          setNewDescription("");
          setPivotReason("");
          setErrors({});
        },
        onError: (error: Error) => {
          // Try to parse validation errors from the server
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
            toast.error(error.message || "Failed to create pivot");
          }
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) {
        setErrors({});
      }
    }}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <GitBranch className="mr-2 h-4 w-4" />
            Create Pivot
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Create New Pivot
          </DialogTitle>
          <DialogDescription>
            Archive the current version and evolve your idea. Your journey will be preserved.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Warning */}
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                This will save the current state as{" "}
                <Badge variant="outline" className="mx-1">
                  Version {nextVersionNumber - 1}
                </Badge>
                and create a new working version.
              </AlertDescription>
            </Alert>

            {/* General Error */}
            {errors.general && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{errors.general}</AlertDescription>
              </Alert>
            )}

            {/* Current State Preview */}
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Current Version (to be archived):
              </p>
              <p className="font-semibold text-foreground">{currentTitle}</p>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {currentDescription}
              </p>
            </div>

            {/* New Title */}
            <div className="space-y-2">
              <Label htmlFor="new-title">
                New Title <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="new-title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Leave blank to keep current title"
                maxLength={200}
                className={errors.newTitle ? "border-red-500" : ""}
              />
              {errors.newTitle && (
                <p className="text-sm text-red-500">{errors.newTitle}</p>
              )}
            </div>

            {/* New Description */}
            <div className="space-y-2">
              <Label htmlFor="new-description">
                New Description <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Textarea
                id="new-description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Leave blank to keep current description"
                rows={4}
                maxLength={5000}
                className={`resize-none ${errors.newDescription ? "border-red-500" : ""}`}
              />
              {errors.newDescription && (
                <p className="text-sm text-red-500">{errors.newDescription}</p>
              )}
            </div>

            {/* Pivot Reason (Required) */}
            <div className="space-y-2">
              <Label htmlFor="pivot-reason" className="text-foreground">
                Why are you pivoting? <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="pivot-reason"
                value={pivotReason}
                onChange={(e) => setPivotReason(e.target.value)}
                placeholder="E.g., Customer interviews revealed nobody cares about X..."
                rows={3}
                maxLength={1000}
                className={`resize-none ${errors.pivotReason ? "border-red-500" : ""}`}
              />
              {errors.pivotReason ? (
                <p className="text-sm text-red-500">{errors.pivotReason}</p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  {pivotReason.length}/1000 characters (min 10)
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" variant="default" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Pivot
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
