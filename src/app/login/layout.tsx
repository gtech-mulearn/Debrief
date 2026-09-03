import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
    description: "Sign in to Debrief to validate your ideas.",
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
