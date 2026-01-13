import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profile",
    description: "View your badges, impact, and account settings.",
};

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
