/**
 * New Idea Page
 * 
 * Form for creating a new idea.
 */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useCreateIdea, useAuth } from "@/hooks";
import { toast } from "sonner";

export default function NewIdeaPage() {
    const router = useRouter();
    const { isAuthenticated, loading: authLoading } = useAuth();
    const { mutate: createIdea, isPending } = useCreateIdea();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

    // Redirect to login if not authenticated (after loading completes)
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push("/login?redirectTo=/ideas/new");
        }
    }, [authLoading, isAuthenticated, router]);

    const validate = (): boolean => {
        const newErrors: { title?: string; description?: string } = {};

        if (!title.trim()) {
            newErrors.title = "Title is required";
        } else if (title.length < 3) {
            newErrors.title = "Title must be at least 3 characters";
        } else if (title.length > 200) {
            newErrors.title = "Title must be at most 200 characters";
        }

        if (!description.trim()) {
            newErrors.description = "Description is required";
        } else if (description.length < 10) {
            newErrors.description = "Description must be at least 10 characters";
        } else if (description.length > 5000) {
            newErrors.description = "Description must be at most 5000 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        createIdea(
            { title: title.trim(), description: description.trim() },
            {
                onSuccess: (response) => {
                    // Access ID from response.data
                    const ideaId = response?.data?.id;
                    if (ideaId) {
                        router.push(`/ideas/${ideaId}`);
                    } else {
                        router.push("/");
                    }
                },
            }
        );
    };

    // Show loading while checking auth
    if (authLoading) {
        return (
            <>
                <Header />
                <main className="main-container">
                    <div className="flex items-center justify-center py-12">
                        <div className="loading-spinner" />
                    </div>
                </main>
            </>
        );
    }

    // Don't render form if not authenticated (will redirect)
    if (!isAuthenticated) {
        return (
            <>
                <Header />
                <main className="main-container">
                    <div className="flex items-center justify-center py-12">
                        <div className="loading-spinner" />
                        <span className="ml-2 text-muted-foreground">Redirecting to login...</span>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="mx-auto max-w-7xl px-6 pt-32 pb-8">
                <div className="mb-8">
                    <h1 className="font-display text-2xl font-bold text-foreground mb-2">New Idea</h1>
                    <p className="font-sans text-base text-muted-foreground">Share your idea with the community</p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Enter your question!
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="What's your idea?"
                            className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.title ? "border-destructive focus-visible:ring-destructive" : "border-input"}`}
                            disabled={isPending}
                        />
                        {errors.title && <p className="text-sm font-medium text-destructive">{errors.title}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe your idea in detail..."
                            className={`flex min-h-[120px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.description ? "border-destructive focus-visible:ring-destructive" : "border-input"}`}
                            disabled={isPending}
                        />
                        {errors.description && <p className="text-sm font-medium text-destructive">{errors.description}</p>}
                        <p className="text-xs text-muted-foreground mt-1">
                            {description.length}/5000 characters
                        </p>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="secondary"
                            size="pill"
                            onClick={() => router.back()}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="shimmer-primary"
                            size="pill"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <>
                                    <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 5v14M5 12h14" />
                                    </svg>
                                    POST
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </main>
        </>
    );
}
