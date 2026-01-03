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
import { toast } from "sonner";

interface IdeaCardProps {
    idea: IdeaWithDetails;
    variant?: "mint" | "coral" | "default";
}

export function IdeaCard({ idea, variant = "default" }: IdeaCardProps) {
    const router = useRouter();
    const { isAuthenticated, loading: authLoading } = useAuth();
    const { mutate: vote, isPending: isVoting } = useVote(idea.id);
    const { mutate: removeVote, isPending: isRemoving } = useRemoveVote(idea.id);

    // Don't render if idea doesn't have a valid ID
    if (!idea?.id) {
        return null;
    }

    const userVote = idea.user_vote?.value;
    const upvotes = idea.upvotes_count ?? 0;
    const downvotes = idea.downvotes_count ?? 0;
    const netVotes = upvotes - downvotes;

    const handleUpvote = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (authLoading) return;

        if (!isAuthenticated) {
            toast.info("Please sign in to vote");
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

        if (authLoading) return;

        if (!isAuthenticated) {
            toast.info("Please sign in to vote");
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

    const getVariantClasses = () => {
        switch (variant) {
            case "mint":
                return "bg-gradient-to-br from-mint to-mint/80 border-transparent text-primary-foreground";
            case "coral":
                return "bg-gradient-to-br from-coral to-coral/80 border-transparent text-primary-foreground";
            case "default":
            default:
                return "bg-card border-border text-card-foreground";
        }
    };

    const getTextClasses = () => {
        if (variant !== "default") return "text-primary-foreground";
        return "text-muted-foreground";
    };

    return (
        <div className={`group relative flex flex-col overflow-hidden rounded-[2.5rem] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${getVariantClasses()}`}>

            {/* Card Content */}
            <Link href={`/ideas/${idea.id}`} className="flex-1 px-8 pt-8 pb-20">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-white/10 shadow-sm">
                            <AvatarImage src={authorAvatar} />
                            <AvatarFallback className={variant !== "default" ? "bg-black/10 text-primary-foreground" : ""}>{initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className={`text-sm font-bold tracking-tight ${variant !== "default" ? "text-primary-foreground" : "text-foreground"}`}>
                                {authorName}
                            </span>
                            {timeAgo && (
                                <span className={`text-xs font-medium opacity-80 ${getTextClasses()}`}>
                                    {timeAgo}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Title */}
                <h3 className={`font-display text-3xl font-bold leading-tight tracking-tight ${variant !== "default" ? "text-primary-foreground" : "text-foreground"} mb-8 pr-4`}>
                    {idea.title || "Untitled"}
                </h3>

                {/* Action Section */}
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        className={`h-12 rounded-full px-6 text-sm font-semibold backdrop-blur-sm transition-all hover:scale-105 ${variant !== "default" ? "bg-black/20 text-primary-foreground hover:bg-black/30" : "bg-muted text-foreground hover:bg-muted/80"}`}
                    >
                        Write Comment
                    </Button>

                    {commentsCount > 0 && (
                        <span className={`flex h-12 min-w-12 items-center justify-center rounded-full px-3 text-sm font-bold backdrop-blur-sm ${variant !== "default" ? "bg-black/10 text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                            {commentsCount} <span className="ml-1 text-[10px] opacity-60">msg</span>
                        </span>
                    )}
                </div>
            </Link>

            {/* Vote Notch (Bottom Right) */}
            <div className="absolute bottom-4 right-4 z-20">
                <div className={`flex flex-col items-center gap-1 rounded-[1.5rem] py-3 px-2 shadow-sm ring-[12px] ring-background ${variant === 'default' ? 'bg-muted text-foreground ring-card' : 'bg-[#1a1a1a] text-white'}`}>
                    <button
                        onClick={handleUpvote}
                        disabled={isVoting || isRemoving || authLoading}
                        className={`group/btn flex h-10 w-10 items-center justify-center rounded-full transition-all hover:bg-white/10 active:scale-95 ${userVote === 1 ? "bg-green-500/20 text-green-400" : ""}`}
                        aria-label="Upvote"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform group-hover/btn:-translate-y-0.5 ${userVote === 1 ? "fill-current" : ""}`}>
                            <path d="M18 15l-6-6-6 6" />
                        </svg>
                    </button>

                    <span className="font-display text-base font-bold min-h-6 flex items-center">
                        {netVotes}
                    </span>

                    <button
                        onClick={handleDownvote}
                        disabled={isVoting || isRemoving || authLoading}
                        className={`group/btn flex h-10 w-10 items-center justify-center rounded-full transition-all hover:bg-white/10 active:scale-95 ${userVote === -1 ? "bg-red-500/20 text-red-400" : ""}`}
                        aria-label="Downvote"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform group-hover/btn:translate-y-0.5 ${userVote === -1 ? "fill-current" : ""}`}>
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
