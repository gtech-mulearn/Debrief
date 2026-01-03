/**
 * Filter Tabs Component
 * 
 * Tabs for filtering ideas by sort order.
 */

"use client";

interface FilterTabsProps {
    value: "latest" | "popular" | "controversial";
    onChange: (value: "latest" | "popular" | "controversial") => void;
}

export function FilterTabs({ value, onChange }: FilterTabsProps) {
    const tabs = [
        { key: "latest" as const, label: "Hot", icon: "🔥" },
        { key: "popular" as const, label: "Best", icon: "⭐" },
        { key: "controversial" as const, label: "Controversial", icon: "💬" },
    ];

    return (
        <div className="filter-tabs">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => onChange(tab.key)}
                    className={`filter-tab ${value === tab.key ? "filter-tab-active" : ""}`}
                >
                    <span>{tab.icon}</span>
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
