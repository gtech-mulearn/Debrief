/**
 * Login Page
 * 
 * Welcome screen with Google OAuth login.
 * Based on reference design.
 */

"use client";

import { useAuth } from "@/hooks";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
    const { isAuthenticated, loading, signInWithGoogle } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") || "/";

    useEffect(() => {
        if (isAuthenticated && !loading) {
            router.push(redirectTo);
        }
    }, [isAuthenticated, loading, router, redirectTo]);

    const handleSignIn = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error("Sign in error:", error);
        }
    };

    if (loading) {
        return (
            <div className="welcome-container">
                <div className="welcome-hero">
                    <div className="loading-spinner" />
                </div>
            </div>
        );
    }

    return (
        <div className="welcome-container">
            {/* Hero section with avatars */}
            <div className="welcome-hero">
                <div className="welcome-avatars">
                    {/* Floating avatar bubbles */}
                    <div className="welcome-avatar-bubble" style={{ top: "10%", left: "10%" }}>
                        <span className="welcome-avatar-text">Yes! of course!</span>
                    </div>
                    <div className="welcome-avatar-bubble" style={{ top: "5%", left: "50%" }}>
                        <span className="welcome-avatar-text">My Fav!</span>
                    </div>
                    <div className="welcome-avatar-bubble" style={{ top: "15%", right: "10%" }}>
                        <span className="welcome-avatar-text">No Thanks!</span>
                    </div>
                    <div className="welcome-avatar-bubble" style={{ bottom: "30%", left: "5%" }}>
                        <span className="welcome-avatar-text">Sure!</span>
                    </div>
                    <div className="welcome-avatar-bubble" style={{ bottom: "20%", right: "15%" }}>
                        <span className="welcome-avatar-text">No!</span>
                    </div>
                </div>

                <div className="welcome-text">
                    <h2>You have</h2>
                    <p><strong className="text-heading-lg">12 Active Poll</strong></p>
                </div>

                {/* Speech bubble */}
                <div className="welcome-speech-bubble">
                    <p>Do you like Pizza?</p>
                </div>
            </div>

            {/* Bottom section */}
            <div className="welcome-bottom">
                <h1 className="welcome-title">
                    All-in-one<br />
                    Real time Polling
                </h1>
                <p className="welcome-description">
                    Using online polls is an easy way to ask your audience for instant feedback on anything.
                </p>

                <div className="welcome-dots">
                    <span className="welcome-dot" />
                    <span className="welcome-dot welcome-dot-active" />
                    <span className="welcome-dot" />
                </div>

                <Button
                    variant="mint"
                    size="pill-lg"
                    className="welcome-btn"
                    onClick={handleSignIn}
                >
                    Get Started
                </Button>
            </div>
        </div>
    );
}
