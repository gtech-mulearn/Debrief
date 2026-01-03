/**
 * Header Component
 * 
 * Main navigation header with logo and auth button.
 */

import Link from "next/link";
import { AuthButton } from "./auth-button";

export function Header() {
    return (
        <header className="header">
            <div className="header-container">
                <Link href="/" className="header-logo">
                    <span className="header-logo-text">mupoll</span>
                </Link>

                <nav className="header-nav">
                    <Link href="/" className="header-nav-link">
                        Home
                    </Link>
                    <Link href="/ideas/new" className="header-nav-link">
                        New Idea
                    </Link>
                </nav>

                <AuthButton />
            </div>
        </header>
    );
}
