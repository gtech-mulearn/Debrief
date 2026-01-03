/**
 * Idea Detail Page
 * 
 * Shows full idea with comments.
 */

"use client";

import { use } from "react";
import { Header } from "@/components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useIdea, useVote, useRemoveVote, useComments, useCreateComment, useAuth } from "@/hooks";
import { formatDistanceToNow, getInitials } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

interface IdeaPageProps {
    params: Promise<{ id: string }>;
}

export default function IdeaPage({ params }: IdeaPageProps) {
    const { id } = use(params);
    const { data, isLoading, isError, error } = useIdea(id);
    const { user, isAuthenticated } = useAuth();

    if (isLoading) {
        return (
            <>
                <Header />
                <main className="main-container">
                    <IdeaDetailSkeleton />
                </main>
            </>
        );
    }

    if (isError || !data) {
        return (
            <>
                <Header />
                <main className="main-container">
                    <div className="empty-state">
                        <p className="empty-state-title">Idea not found</p>
                        <p className="empty-state-description">
                            {error?.message || "This idea may have been deleted."}
                        </p>
                        <Button variant="mint" size="pill" asChild>
                            <a href="/">Go home</a>
                        </Button>
                    </div>
                </main>
            </>
        );
    }

    const idea = data.data;

    return (
        <>
            <Header />
            <main className="main-container">
                <IdeaDetail idea={idea} isAuthenticated={isAuthenticated} userId={user?.id} />
                <CommentsSection ideaId={id} isAuthenticated={isAuthenticated} />
            </main>
        </>
    );
}

function IdeaDetail({
    idea,
    isAuthenticated,
    userId
}: {
    idea: any;
    isAuthenticated: boolean;
    userId?: string;
}) {
    const { mutate: vote, isPending: isVoting } = useVote(idea.id);
    const { mutate: removeVote, isPending: isRemoving } = useRemoveVote(idea.id);

    const userVote = idea.user_vote?.value;
    const netVotes = idea.upvotes_count - idea.downvotes_count;

    const handleVote = (value: 1 | -1) => {
        if (!isAuthenticated) {
            toast.error("Please sign in to vote");
            return;
        }
        if (userVote === value) {
            removeVote();
        } else {
            vote(value);
        }
    };

    return (
        <article className="idea-detail">
            <div className="idea-detail-header">
                <Avatar className="idea-detail-avatar">
                    <AvatarImage src={idea.author?.avatar_url} />
                    <AvatarFallback>{getInitials(idea.author?.full_name)}</AvatarFallback>
                </Avatar>
                <div className="idea-detail-author-info">
                    <span className="text-username">{idea.author?.full_name || "Anonymous"}</span>
                    <span className="text-caption">{formatDistanceToNow(idea.created_at)}</span>
                </div>
            </div>

            <h1 className="idea-detail-title">{idea.title}</h1>
            <p className="idea-detail-description">{idea.description}</p>

            <div className="idea-detail-actions">
                <div className="vote-buttons-horizontal">
                    <button
                        onClick={() => handleVote(1)}
                        disabled={isVoting || isRemoving}
                        className={`vote-btn-horizontal ${userVote === 1 ? "vote-btn-active-up" : ""}`}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M18 15l-6-6-6 6" />
                        </svg>
                        <span>{idea.upvotes_count}</span>
                    </button>

                    <span className="vote-net-count">{netVotes > 0 ? `+${netVotes}` : netVotes}</span>

                    <button
                        onClick={() => handleVote(-1)}
                        disabled={isVoting || isRemoving}
                        className={`vote-btn-horizontal ${userVote === -1 ? "vote-btn-active-down" : ""}`}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                        <span>{idea.downvotes_count}</span>
                    </button>
                </div>

                <span className="idea-detail-stat">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    {idea.comments_count} comments
                </span>
            </div>
        </article>
    );
}

function CommentsSection({ ideaId, isAuthenticated }: { ideaId: string; isAuthenticated: boolean }) {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useComments(ideaId);
    const { mutate: createComment, isPending: isCreating } = useCreateComment(ideaId);
    const [content, setContent] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        createComment(
            { content: content.trim() },
            {
                onSuccess: () => {
                    setContent("");
                    toast.success("Comment added!");
                },
                onError: (error) => {
                    toast.error(error.message || "Failed to add comment");
                },
            }
        );
    };

    const comments = data?.pages.flatMap((page) => page.data) ?? [];

    return (
        <section className="comment-section">
            <h2 className="text-heading-md mb-4">Comments</h2>

            {isAuthenticated && (
                <form onSubmit={handleSubmit} className="comment-form">
                    <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write a comment..."
                        className="form-input flex-1"
                        disabled={isCreating}
                    />
                    <Button type="submit" variant="mint" size="default" disabled={isCreating || !content.trim()}>
                        {isCreating ? "..." : "Post"}
                    </Button>
                </form>
            )}

            {isLoading ? (
                <div className="comment-list">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="comment-item">
                            <div className="comment-header">
                                <Skeleton className="w-8 h-8 rounded-full" />
                                <Skeleton className="w-24 h-3" />
                            </div>
                            <Skeleton className="w-full h-4" />
                        </div>
                    ))}
                </div>
            ) : comments.length === 0 ? (
                <p className="text-caption text-center py-8">No comments yet. Be the first to comment!</p>
            ) : (
                <div className="comment-list">
                    {comments.map((comment) => (
                        <div key={comment.id} className="comment-item">
                            <div className="comment-header">
                                <Avatar className="w-7 h-7">
                                    <AvatarImage src={comment.author?.avatar_url || undefined} />
                                    <AvatarFallback>{getInitials(comment.author?.full_name)}</AvatarFallback>
                                </Avatar>
                                <span className="text-username">{comment.author?.full_name || "Anonymous"}</span>
                                <span className="text-caption">{formatDistanceToNow(comment.created_at)}</span>
                            </div>
                            <p className="comment-content">{comment.content}</p>
                        </div>
                    ))}

                    {hasNextPage && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage}
                            className="w-full"
                        >
                            {isFetchingNextPage ? "Loading..." : "Load more comments"}
                        </Button>
                    )}
                </div>
            )}
        </section>
    );
}

function IdeaDetailSkeleton() {
    return (
        <div className="idea-detail">
            <div className="idea-detail-header">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex flex-col gap-1">
                    <Skeleton className="w-32 h-4" />
                    <Skeleton className="w-20 h-3" />
                </div>
            </div>
            <Skeleton className="w-3/4 h-8 mb-4" />
            <Skeleton className="w-full h-4 mb-2" />
            <Skeleton className="w-full h-4 mb-2" />
            <Skeleton className="w-2/3 h-4" />
        </div>
    );
}
