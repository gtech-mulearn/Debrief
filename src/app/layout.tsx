import type { Metadata } from "next";
import { Bricolage_Grotesque, Poppins } from "next/font/google";
import { QueryProvider } from "@/providers";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Debrief",
    default: "Debrief - Validate Your Ideas",
  },
  description: "A forge for your ideas. Validate, refine, and prove your concepts before you build.",
  keywords: ["ideas", "validation", "feedback", "saas", "startup", "polls"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${bricolage.variable} ${poppins.variable} antialiased min-h-screen flex flex-col relative`}
      >
        <div className="fixed inset-0 z-[-1] bg-page-gradient pointer-events-none" />
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
