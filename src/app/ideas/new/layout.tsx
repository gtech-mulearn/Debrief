import { Metadata } from "next";

export const metadata: Metadata = {
    title: "New Idea",
    description: "Share your idea with the community to get instant feedback.",
};

export default function NewIdeaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
