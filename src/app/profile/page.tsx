"use client";

import { useAuth } from "@/hooks/use-auth";
import { Header } from "@/components/layout";
import { UserStats } from "@/components/gamification/UserStats";
import { BadgeList } from "@/components/gamification/BadgeList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && !user) {
            redirect("/");
        }
    }, [user, loading]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="mx-auto max-w-4xl px-6 pt-32 pb-12">
                    <div className="animate-pulse space-y-8">
                        <div className="h-32 w-full bg-muted rounded-xl" />
                        <div className="h-64 w-full bg-muted rounded-xl" />
                    </div>
                </main>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="mx-auto max-w-4xl px-6 pt-32 pb-12 space-y-8">
                {/* Profile Header */}
                <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24 border-2 border-border">
                        <AvatarImage src={user.user_metadata.avatar_url} />
                        <AvatarFallback className="text-2xl">{getInitials(user.user_metadata.full_name)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h1 className="font-display text-3xl font-bold">{user.user_metadata.full_name}</h1>
                        <p className="text-muted-foreground">{user.email}</p>
                    </div>
                </div>

                {/* Stats */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Your Impact</h2>
                    <UserStats userId={user.id} />
                </div>

                {/* Badges */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Earned Badges</h2>
                    <BadgeList userId={user.id} />
                </div>
            </main>
        </div>
    );
}
