/**
 * Ideas List Component
 * 
 * Displays a list of idea cards with infinite scroll.
 * Uses hooks only - no direct API calls.
 */

"use client";

import { useIdeas } from "@/hooks";
import { IdeaCard } from "./idea-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { SortOption } from "./sort-dropdown";

interface IdeasListProps {
    sort?: SortOption;
}

export function IdeasList({ sort = "votes_desc" }: IdeasListProps) {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useIdeas({ sort });

    if (isLoading) {
        return <IdeasListSkeleton />;
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-border bg-card/50 p-12 text-center">
                <p className="font-display text-xl font-semibold text-foreground">Error loading ideas</p>
                <p className="mt-2 text-sm text-muted-foreground">
                    {error?.message || "Something went wrong. Please try again."}
                </p>
            </div>
        );
    }

    const ideas = data?.pages.flatMap((page) => page.data) ?? [];

    if (ideas.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-border bg-card/50 p-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <svg
                        className="h-8 w-8 text-muted-foreground"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                </div>
                <p className="font-display text-xl font-semibold text-foreground">No ideas yet</p>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground mb-6">
                    Be the first to share an idea!
                </p>
                <Button variant="mint" size="pill" asChild>
                    <a href="/ideas/new">Create Idea</a>
                </Button>
            </div>
        );
    }

    // Alternate between mint and coral variants for visual interest
    const getVariant = (index: number): "mint" | "coral" | "default" => {
        if (index % 3 === 0) return "mint";
        if (index % 3 === 1) return "coral";
        return "default";
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea, index) => (
                <IdeaCard
                    key={idea.id}
                    idea={idea}
                    variant={getVariant(index)}
                />
            ))}

            {hasNextPage && (
                <div className="flex justify-center pt-4">
                    <Button
                        variant="secondary"
                        size="pill"
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                    >
                        {isFetchingNextPage ? (
                            <>
                                <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                                Loading...
                            </>
                        ) : (
                            "Load more"
                        )}
                    </Button>
                </div>
            )}
        </div>
    );
}

function IdeasListSkeleton() {
    return (
        <div className="flex flex-col gap-6">
            {[1, 2, 3].map((i) => (
                <div key={i} className="relative flex overflow-hidden rounded-[2rem] border border-border bg-card p-0">
                    <div className="flex-1 px-8 py-7">
                        <div className="mb-4 flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="flex flex-col gap-1">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                        </div>
                        <Skeleton className="mb-6 h-8 w-3/4" />
                        <Skeleton className="h-9 w-32 rounded-full" />
                    </div>

                    <div className="flex w-16 flex-col items-center justify-center gap-3 border-l border-border bg-muted/30">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-6 w-4" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                </div>
            ))}
        </div>
    );
}
