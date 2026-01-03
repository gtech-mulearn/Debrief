/**
 * Idea Card Component
 * 
 * Unique curved shape design with vote buttons in the notch.
 * Uses hooks only - no direct API calls.
 */

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useVote, useRemoveVote, useAuth } from "@/hooks";
import type { IdeaWithDetails } from "@/types/database";
import { formatDistanceToNow, getInitials } from "@/lib/utils";

interface IdeaCardProps {
    idea: IdeaWithDetails;
    variant?: "mint" | "coral" | "default";
}

export function IdeaCard({ idea, variant = "default" }: IdeaCardProps) {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const { mutate: vote, isPending: isVoting } = useVote(idea.id);
    const { mutate: removeVote, isPending: isRemoving } = useRemoveVote(idea.id);

    const userVote = idea.user_vote?.value;
    const upvotes = idea.upvotes_count ?? 0;
    const downvotes = idea.downvotes_count ?? 0;
    const netVotes = upvotes - downvotes;

    const handleUpvote = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isAuthenticated) {
            router.push(`/login?redirectTo=/`);
            return;
        }

        if (userVote === 1) {
            removeVote();
        } else {
            vote(1);
        }
    };

    const handleDownvote = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isAuthenticated) {
            router.push(`/login?redirectTo=/`);
            return;
        }

        if (userVote === -1) {
            removeVote();
        } else {
            vote(-1);
        }
    };

    const authorName = idea.author?.full_name || "Anonymous";
    const authorAvatar = idea.author?.avatar_url || undefined;
    const initials = getInitials(authorName);
    const timeAgo = idea.created_at ? formatDistanceToNow(idea.created_at) : "";
    const commentsCount = idea.comments_count ?? 0;

    const cardClass = variant === "mint"
        ? "idea-card-unique idea-card-unique-mint"
        : variant === "coral"
            ? "idea-card-unique idea-card-unique-coral"
            : "idea-card-unique";

    return (
        <div className={cardClass}>
            {/* Vote buttons in the curved notch area */}
            <div className="idea-card-vote-notch">
                <button
                    onClick={handleUpvote}
                    disabled={isVoting || isRemoving}
                    className={`idea-card-vote-btn idea-card-vote-up ${userVote === 1 ? "active" : ""}`}
                    aria-label="Upvote"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 15l-6-6-6 6" />
                    </svg>
                </button>

                <span className="idea-card-vote-count">{netVotes}</span>

                <button
                    onClick={handleDownvote}
                    disabled={isVoting || isRemoving}
                    className={`idea-card-vote-btn idea-card-vote-down ${userVote === -1 ? "active" : ""}`}
                    aria-label="Downvote"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </button>
            </div>

            {/* Card main content */}
            <Link href={`/ideas/${idea.id}`} className="idea-card-content">
                <div className="idea-card-header">
                    <Avatar className="idea-card-avatar">
                        <AvatarImage src={authorAvatar} />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="idea-card-author-info">
                        <span className="idea-card-author-name">{authorName}</span>
                        {timeAgo && <span className="idea-card-time">{timeAgo}</span>}
                    </div>
                </div>

                <h3 className="idea-card-title">{idea.title || "Untitled"}</h3>

                <div className="idea-card-actions">
                    <Button variant="secondary" size="pill-sm" className="idea-card-comment-btn">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        Write Comment
                    </Button>
                    {commentsCount > 0 && (
                        <span className="idea-card-comment-count">{commentsCount}</span>
                    )}
                </div>
            </Link>
        </div>
    );
}
