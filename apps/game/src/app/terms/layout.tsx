import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "Terms of Service for Debrief.",
};

export default function TermsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
