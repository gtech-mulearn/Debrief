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
import { cn } from "@/lib/utils";

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
          <Button variant="shimmer-primary" size="lg" className="w-full sm:w-auto gap-2 font-bold">
            <GitBranch className="h-5 w-5" />
            Create Pivot
          </Button>
        )}
      </DialogTrigger>
      {/* Increased max-width generally to match standard comfortable reading width for forms */}
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-heading">
            <GitBranch className="h-5 w-5 text-primary" />
            Create New Pivot
          </DialogTitle>
          <DialogDescription>
            Archive the current version and evolve your idea. Your journey will be preserved.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            {/* Warning - Matching BackingDialog's 'Anonymous' toggle style card */}
            <div className="rounded-lg border border-white/5 bg-white/2 p-3 flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-4 w-4 text-primary shrink-0" />
              <div className="text-sm text-foreground/90 leading-relaxed">
                This action archives the current state as
                <Badge variant="outline" className="mx-1.5 border-primary/30 text-primary bg-primary/10">
                  v{historyData?.data ? historyData.data.length + 1 : 1}
                </Badge>
                and creates a new working version.
              </div>
            </div>

            {/* General Error */}
            {errors.general && (
              <Alert variant="destructive" className="border-rose-500/20 bg-rose-950/20 text-rose-200">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{errors.general}</AlertDescription>
              </Alert>
            )}

            {/* Current State Preview - Matching 'Selected Pledge' style conceptually (Bordered Card) */}
            <div className="space-y-3">
              <Label className="text-muted-foreground uppercase tracking-wider text-xs font-bold">Archiving Version</Label>
              <div className="rounded-xl border border-white/5 bg-white/2 p-4">
                <p className="font-heading font-semibold text-foreground text-lg">{currentTitle}</p>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {currentDescription}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* New Title */}
              <div className="space-y-2">
                <Label htmlFor="new-title">New Title <span className="text-muted-foreground text-xs font-normal ml-1">(Optional)</span></Label>
                <Input
                  id="new-title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Leave blank to keep current title"
                  maxLength={200}
                  className={cn(
                    "bg-white/5 border-white/10 focus-visible:ring-primary/50",
                    errors.newTitle && "border-rose-500/50 focus-visible:ring-rose-500/50"
                  )}
                />
                {errors.newTitle && (
                  <p className="text-sm text-rose-500">{errors.newTitle}</p>
                )}
              </div>

              {/* New Description */}
              <div className="space-y-2">
                <Label htmlFor="new-description">New Description <span className="text-muted-foreground text-xs font-normal ml-1">(Optional)</span></Label>
                <Textarea
                  id="new-description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Leave blank to keep current description"
                  rows={3}
                  maxLength={5000}
                  className={cn(
                    "resize-none bg-white/5 border-white/10 focus-visible:ring-primary/50",
                    errors.newDescription && "border-rose-500/50 focus-visible:ring-rose-500/50"
                  )}
                />
                {errors.newDescription && (
                  <p className="text-sm text-rose-500">{errors.newDescription}</p>
                )}
              </div>

              {/* Pivot Reason (Required) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="pivot-reason" className="text-foreground">
                    Why are you pivoting? <span className="text-rose-500">*</span>
                  </Label>
                  <span className={cn(
                    "text-xs",
                    pivotReason.length < 10 ? "text-rose-400" : "text-emerald-400"
                  )}>
                    {pivotReason.length}/1000
                  </span>
                </div>
                <Textarea
                  id="pivot-reason"
                  value={pivotReason}
                  onChange={(e) => setPivotReason(e.target.value)}
                  placeholder="E.g., Customer interviews revealed nobody cares about X..."
                  rows={3}
                  maxLength={1000}
                  className={cn(
                    "resize-none bg-white/5 border-white/10 focus-visible:ring-primary/50 min-h-[100px]",
                    errors.pivotReason && "border-rose-500/50 focus-visible:ring-rose-500/50"
                  )}
                />
                {errors.pivotReason && (
                  <p className="text-sm text-rose-500">{errors.pivotReason}</p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="flex-col gap-3 sm:gap-0">
            {/* Matching BackingDialog Button Style: Wide, Bold, Colored */}
            <Button
              type="submit"
              variant="shimmer-primary"
              disabled={isPending}
              className="w-full font-bold"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm & Create Pivot
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
