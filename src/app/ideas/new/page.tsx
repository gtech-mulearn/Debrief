/**
 * New Idea Page
 * 
 * Form for creating a new idea.
 */

"use client";

import { useState } from "react";
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
                    toast.success("Idea created successfully!");
                    router.push(`/ideas/${response.data.id}`);
                },
                onError: (error) => {
                    toast.error(error.message || "Failed to create idea");
                },
            }
        );
    };

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

    if (!isAuthenticated) {
        router.push("/login?redirectTo=/ideas/new");
        return null;
    }

    return (
        <>
            <Header />
            <main className="main-container">
                <div className="page-header">
                    <h1 className="page-title">New poll</h1>
                    <p className="page-description">Share your idea with the community</p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-xl">
                    <div className="form-group">
                        <label htmlFor="title" className="form-label">
                            Enter your question!
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="What's your idea?"
                            className={`form-input ${errors.title ? "border-destructive" : ""}`}
                            disabled={isPending}
                        />
                        {errors.title && <p className="form-error">{errors.title}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe your idea in detail..."
                            className={`form-input form-textarea ${errors.description ? "border-destructive" : ""}`}
                            disabled={isPending}
                        />
                        {errors.description && <p className="form-error">{errors.description}</p>}
                        <p className="text-caption mt-1">
                            {description.length}/5000 characters
                        </p>
                    </div>

                    <div className="flex gap-3">
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
                            variant="mint"
                            size="pill"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <>
                                    <span className="loading-spinner" />
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
