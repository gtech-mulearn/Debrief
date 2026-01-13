import Link from "next/link";
import { cn } from "@/lib/utils";

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-black/20 backdrop-blur-md">
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 px-4 py-4 md:flex-row md:gap-0 md:px-8">
                <div className="flex flex-col items-center gap-2 md:items-start">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="font-display text-lg font-bold tracking-tight text-white/90">debrief</span>
                    </Link>

                </div>

                <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
                    <nav className="flex gap-4 text-sm font-medium text-muted-foreground">
                        <Link href="/terms" className="hover:text-white transition-colors">
                            Terms
                        </Link>
                        <Link href="/privacy" className="hover:text-white transition-colors">
                            Privacy
                        </Link>
                    </nav>

                    <div className="text-sm text-muted-foreground/60">
                        &copy; {new Date().getFullYear()} <a href="https://mulearn.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">µLearn</a>. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
