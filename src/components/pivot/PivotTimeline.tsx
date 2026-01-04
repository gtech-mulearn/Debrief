"use client";

import { formatDistanceToNow } from "@/lib/utils";
import { useVersionHistory } from "@/hooks/use-pivots";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { GitBranch, Circle, CheckCircle2, History } from "lucide-react";
import type { IdeaVersionWithMetadata } from "@/types/database";
import { useState } from "react";
import { IdeaHistoryView } from "./IdeaHistoryView";
import { cn } from "@/lib/utils";

interface PivotTimelineProps {
  ideaId: string;
}

export function PivotTimeline({ ideaId }: PivotTimelineProps) {
  const { data, isLoading, isError } = useVersionHistory(ideaId);
  const [selectedVersion, setSelectedVersion] = useState<IdeaVersionWithMetadata | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-2xl bg-white/5" />
        ))}
      </div>
    );
  }

  if (isError || !data?.data || data.data.length === 0) {
    return (
      <Card variant="glass" className="flex flex-col items-center justify-center border-dashed p-12 text-center bg-white/2">
        <div className="mb-4 rounded-full bg-white/5 p-4">
          <GitBranch className="h-8 w-8 text-muted-foreground/50" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">No version history yet</p>
        <p className="text-xs text-muted-foreground/60">Versions are created when you pivot your idea.</p>
      </Card>
    );
  }

  const versions = data.data;

  return (
    <>
      <div className="relative space-y-6 pl-4">
        {/* Timeline connector line */}
        <div className="absolute left-[34px] top-6 bottom-6 w-px bg-gradient-to-b from-primary/50 via-white/10 to-transparent" />

        {versions.map((version, index) => {
          const isLast = index === versions.length - 1;
          const isCurrent = version.is_current;

          return (
            <div
              key={version.id}
              className="group relative flex gap-6"
              onClick={() => setSelectedVersion(version)}
            >
              {/* Timeline Node */}
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#09090b] shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:border-primary/50">
                {isCurrent ? (
                  <div className="h-3 w-3 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)] animate-pulse" />
                ) : (
                  <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                )}
              </div>

              {/* Card Content */}
              <Card
                variant={isCurrent ? undefined : "glass"}
                className={cn(
                  "relative flex-1 cursor-pointer overflow-hidden p-5 transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5",
                  isCurrent && "border-primary/20 bg-primary/2 shadow-lg"
                )}
              >
                {isCurrent && (
                  <div className="absolute right-0 top-0 h-16 w-16 -translate-y-8 translate-x-8 rounded-full bg-primary/10 blur-2xl" />
                )}

                <div className="mb-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={isCurrent ? "default" : "outline"} className={cn(
                      "rounded-md px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold",
                      !isCurrent && "border-white/10 text-muted-foreground bg-transparent"
                    )}>
                      {isCurrent ? "Current Version" : `v${version.version_number}`}
                    </Badge>
                    <span className="text-xs text-muted-foreground/60 flex items-center gap-1">
                      <History className="h-3 w-3" />
                      {formatDistanceToNow(version.created_at)} ago
                    </span>
                  </div>
                </div>

                <h4 className="mb-2 font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {version.title}
                </h4>

                <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {version.description}
                </p>

                {version.pivot_reason && !isCurrent && (
                  <div className="mt-4 rounded-xl border border-white/5 bg-white/2 p-3">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
                      Reason for Pivot
                    </p>
                    <p className="text-sm italic text-muted-foreground">"{version.pivot_reason}"</p>
                  </div>
                )}

                <div className="mt-4 flex items-center gap-2">
                  <Badge variant="secondary" className="bg-white/5 hover:bg-white/10 text-muted-foreground border-white/5">
                    Level {version.current_level_at_pivot}
                  </Badge>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* History View Modal */}
      {selectedVersion && (
        <IdeaHistoryView
          version={selectedVersion}
          onClose={() => setSelectedVersion(null)}
        />
      )}
    </>
  );
}
