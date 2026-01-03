/**
 * Auth Button Component
 * 
 * Shows sign in or user menu based on auth state.
 * Uses useAuth hook - never calls API directly.
 */

"use client";

import { useAuth } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

export function AuthButton() {
    const { user, loading, isAuthenticated, signInWithGoogle, signOut } = useAuth();

    if (loading) {
        return <Skeleton className="h-10 w-10 rounded-full" />;
    }

    if (!isAuthenticated) {
        return (
            <Button
                variant="mint"
                size="pill-sm"
                onClick={() => signInWithGoogle()}
                className="auth-button-signin"
            >
                Sign in
            </Button>
        );
    }

    const initials = user?.user_metadata?.full_name
        ?.split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase() || "U";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="auth-button-avatar">
                    <Avatar className="h-9 w-9">
                        <AvatarImage
                            src={user?.user_metadata?.avatar_url}
                            alt={user?.user_metadata?.full_name || "User"}
                        />
                        <AvatarFallback className="bg-mint text-mint-foreground">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <div className="dropdown-user-info">
                    <p className="text-label-md">{user?.user_metadata?.full_name}</p>
                    <p className="text-caption">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <a href="/profile" className="dropdown-menu-item">
                        Profile
                    </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <a href="/ideas/new" className="dropdown-menu-item">
                        New Idea
                    </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => signOut()}
                    className="dropdown-menu-item text-destructive"
                >
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
