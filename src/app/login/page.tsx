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
            await signInWithGoogle(redirectTo);
        } catch (error) {
            console.error("Sign in error:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-[#F8F9FA]">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="relative min-h-screen w-full bg-[#f8f9fa] flex flex-col md:flex-row font-sans overflow-hidden">
            {/* Grid Background - Visible on the left/visual side */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0" style={{ backgroundSize: "40px 40px" }} />

            {/* Left Side: Visuals */}
            <div className="relative flex-1 flex flex-col items-center justify-center p-6 pt-20 pb-24 md:p-12 md:pb-12 z-10 w-full max-w-5xl mx-auto md:max-w-none">

                {/* Center Status Card */}
                <div className="relative z-20 mb-8 md:mb-12 rounded-[2rem] bg-white px-8 py-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center animate-fade-in-up">
                    <h2 className="font-display text-lg font-medium text-gray-500 mb-1">You have</h2>
                    <p className="font-display text-2xl font-bold text-gray-900">12 Active Poll</p>
                </div>

                {/* Floating Avatars Container - Constrained width on desktop to keep them somewhat grouped */}
                <div className="absolute inset-x-0 top-0 h-full w-full max-w-3xl mx-auto pointer-events-none">
                    {/* Top Left */}
                    <div className="absolute top-[15%] left-[10%] md:top-[20%] md:left-[15%] animate-pulse-soft" style={{ animationDelay: "0s" }}>
                        <div className="relative">
                            <img src="https://i.pravatar.cc/150?u=1" alt="User" className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white shadow-lg" />
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm z-30">
                                Yes! of course!
                            </div>
                        </div>
                    </div>

                    {/* Top Right */}
                    <div className="absolute top-[12%] right-[15%] md:top-[15%] md:right-[20%] animate-pulse-soft" style={{ animationDelay: "1.5s" }}>
                        <div className="relative">
                            <img src="https://i.pravatar.cc/150?u=5" alt="User" className="w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-white shadow-lg" />
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm z-30">
                                My Fav!
                            </div>
                        </div>
                    </div>

                    {/* Middle Left */}
                    <div className="absolute top-[35%] left-[5%] md:top-[45%] md:left-[10%] animate-pulse-soft" style={{ animationDelay: "0.5s" }}>
                        <div className="relative">
                            <img src="https://i.pravatar.cc/150?u=3" alt="User" className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-white shadow-lg" />
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm z-30">
                                Sure!
                            </div>
                        </div>
                    </div>

                    {/* Middle Right */}
                    <div className="absolute top-[30%] right-[8%] md:top-[40%] md:right-[15%] animate-pulse-soft" style={{ animationDelay: "2s" }}>
                        <div className="relative">
                            <img src="https://i.pravatar.cc/150?u=4" alt="User" className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white shadow-lg" />
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm z-30">
                                No Thanks!
                            </div>
                        </div>
                    </div>

                    {/* Lower Right */}
                    <div className="absolute top-[50%] right-[20%] md:top-[65%] md:right-[25%] animate-pulse-soft" style={{ animationDelay: "1s" }}>
                        <div className="relative">
                            <img src="https://i.pravatar.cc/150?u=8" alt="User" className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white shadow-lg" />
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm z-30">
                                No!
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Question Bubble */}
                <div className="mt-auto md:mb-12 relative z-10 animate-scale-in w-full flex justify-center max-w-md md:max-w-lg">
                    <div className="relative flex items-center w-full">
                        <img src="https://i.pravatar.cc/150?u=9" alt="Main User" className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-white shadow-xl z-20 grayscale shrink-0" />
                        <div className="relative -ml-6 bg-white pl-10 pr-8 py-4 md:py-6 rounded-r-[2.5rem] rounded-tl-[2.5rem] shadow-xl w-full">
                            <p className="font-display font-bold text-gray-900 text-sm md:text-lg leading-tight">
                                Would you use this SaaS analytics tool?
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Login / CTA */}
            <div className="relative z-30 -mt-6 md:mt-0 w-full md:w-[450px] lg:w-[550px] shrink-0 flex flex-col justify-center items-center rounded-t-[3rem] md:rounded-t-none md:rounded-l-[3.5rem] bg-[#111111] px-8 py-12 md:p-16 shadow-[0_-10px_40px_rgba(0,0,0,0.2)] md:shadow-2xl md:min-h-screen">
                <div className="w-full max-w-sm flex flex-col items-center md:items-start text-center md:text-left">
                    <h1 className="mb-6 font-display text-4xl md:text-5xl font-bold leading-tight text-white tracking-tight">
                        All-in-one<br />
                        Real time Polling
                    </h1>
                    <p className="mb-10 text-gray-400 text-lg leading-relaxed">
                        Validate your startup ideas instantly. Get real feedback from real users before you build.
                    </p>

                    <div className="mb-10 flex gap-2 md:self-start">
                        <span className="h-2 w-2 rounded-full bg-gray-600" />
                        <span className="h-2 w-8 rounded-full bg-white" />
                        <span className="h-2 w-2 rounded-full bg-gray-600" />
                    </div>

                    <Button
                        className="w-full h-14 rounded-full text-lg font-semibold bg-[#4945FF] hover:bg-[#3d39e6] text-white shadow-lg shadow-blue-900/20 border-0"
                        onClick={handleSignIn}
                    >
                        Get Started
                    </Button>
                </div>
            </div>
        </div>
    );
}
