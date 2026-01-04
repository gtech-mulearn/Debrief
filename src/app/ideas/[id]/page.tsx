import { Metadata } from "next";
import { createServerClient } from "@/lib/supabase/server";
import IdeaDetailClient from "./IdeaDetailClient";

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const supabase = await createServerClient();
    const { data: idea } = await supabase
        .from("ideas")
        .select("title")
        .eq("id", id)
        .single();

    if (!idea) {
        return {
            title: "Idea Not Found",
        };
    }

    return {
        title: idea.title,
        description: `Check out and vote on "${idea.title}" on Debrief.`,
        openGraph: {
            title: idea.title,
            description: `Check out and vote on "${idea.title}" on Debrief.`,
        },
    };
}

export default async function IdeaPage({ params }: Props) {
    const { id } = await params;
    return <IdeaDetailClient id={id} />;
}
