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

interface IdeasListProps {
    sort?: "latest" | "popular" | "controversial";
}

export function IdeasList({ sort = "latest" }: IdeasListProps) {
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
            <div className="empty-state">
                <p className="empty-state-title">Error loading ideas</p>
                <p className="empty-state-description">
                    {error?.message || "Something went wrong. Please try again."}
                </p>
            </div>
        );
    }

    const ideas = data?.pages.flatMap((page) => page.data) ?? [];

    if (ideas.length === 0) {
        return (
            <div className="empty-state">
                <svg
                    className="empty-state-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                <p className="empty-state-title">No ideas yet</p>
                <p className="empty-state-description">
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
        <div className="ideas-list">
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
                                <span className="loading-spinner" />
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
        <div className="ideas-list">
            {[1, 2, 3].map((i) => (
                <div key={i} className="idea-card-unique">
                    <div className="idea-card-vote-notch">
                        <Skeleton className="w-8 h-8 rounded" />
                        <Skeleton className="w-6 h-4" />
                        <Skeleton className="w-8 h-8 rounded" />
                    </div>
                    <div className="idea-card-content">
                        <div className="idea-card-header">
                            <Skeleton className="w-8 h-8 rounded-full" />
                            <div className="flex flex-col gap-1">
                                <Skeleton className="w-24 h-3" />
                                <Skeleton className="w-16 h-2" />
                            </div>
                        </div>
                        <Skeleton className="w-full h-5 mb-2" />
                        <Skeleton className="w-3/4 h-5 mb-4" />
                        <Skeleton className="w-28 h-8 rounded-full" />
                    </div>
                </div>
            ))}
        </div>
    );
}
