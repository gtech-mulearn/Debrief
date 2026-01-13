/**
 * Sort Dropdown Component
 * 
 * Dropdown for sorting ideas by votes or created time.
 */

"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export type SortOption =
    | "votes_desc"
    | "votes_asc"
    | "created_desc"
    | "created_asc";

interface SortDropdownProps {
    value: SortOption;
    onChange: (value: SortOption) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string; icon: string }[] = [
    { value: "votes_desc", label: "Most Votes", icon: "▼" },
    { value: "votes_asc", label: "Least Votes", icon: "▲" },
    { value: "created_desc", label: "Newest First", icon: "🕐" },
    { value: "created_asc", label: "Oldest First", icon: "🕐" },
];

export function SortDropdown({ value, onChange }: SortDropdownProps) {
    const currentOption = SORT_OPTIONS.find((opt) => opt.value === value);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="pill-sm" className="gap-2">
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M3 6h18M6 12h12M9 18h6" />
                    </svg>
                    Sort: {currentOption?.label || "Most Votes"}
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Sort by Votes
                </DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() => onChange("votes_desc")}
                    className={value === "votes_desc" ? "bg-accent" : ""}
                >
                    <span className="mr-2">▼</span> Most Votes
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => onChange("votes_asc")}
                    className={value === "votes_asc" ? "bg-accent" : ""}
                >
                    <span className="mr-2">▲</span> Least Votes
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Sort by Time
                </DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() => onChange("created_desc")}
                    className={value === "created_desc" ? "bg-accent" : ""}
                >
                    <span className="mr-2">🕐</span> Newest First
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => onChange("created_asc")}
                    className={value === "created_asc" ? "bg-accent" : ""}
                >
                    <span className="mr-2">🕐</span> Oldest First
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
