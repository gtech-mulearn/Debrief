import { ChannelConfig } from "@/types/simulation";

export const ADMIN_EMAILS = ["sachin@mulearn.org", "admin@debrief.com"]; // Replace with actual admin emails
export const TOTAL_BUDGET_POOL = 12500000; // 1.25 Cr
export const MAX_ROUNDS = 6;
export const ROUND_DURATION_MS = 150000; // 2.5 minutes

export const CHANNELS: ChannelConfig[] = [
    {
        id: "social_ads",
        name: "Social Ads",
        cost_per_1k: 5000,
        max_spend_per_round: 3000000, // 30L
        description: "Reliable reach, high initial impact but fatigues quickly.",
        efficiency_trend: "decreasing",
    },
    {
        id: "influencers",
        name: "Influencer Marketing",
        cost_per_1k: 12000,
        max_spend_per_round: 2500000,
        description: "Expensive, but gives a bonus to efficiency in the NEXT round.",
        efficiency_trend: "stable",
        special_effect: "momentum_bonus",
    },
    {
        id: "search_ads",
        name: "Paid Search",
        cost_per_1k: 8000,
        max_spend_per_round: 2000000,
        description: "Steady performance, but costs rise as competition increases.",
        efficiency_trend: "decreasing",
    },
    {
        id: "content_marketing",
        name: "Content Marketing",
        cost_per_1k: 15000, // High upfront
        max_spend_per_round: 2000000,
        description: "High upfront cost, but efficiency drastically improves in later rounds.",
        efficiency_trend: "increasing",
    },
    {
        id: "referral",
        name: "Referral Program",
        cost_per_1k: 2000, // Very cheap
        max_spend_per_round: 1000000, // Capped low to prevent exploit
        description: "Cheapest option, but effectiveness drops if everyone uses it.",
        efficiency_trend: "volatile",
        special_effect: "saturation_risk",
    },
    {
        id: "email",
        name: "Email Retargeting",
        cost_per_1k: 3000,
        max_spend_per_round: 1500000,
        description: "Requires setup (first round low return), strong later.",
        efficiency_trend: "increasing",
    },
    {
        id: "pr",
        name: "PR Partnerships",
        cost_per_1k: 20000,
        max_spend_per_round: 4000000,
        description: "Huge potential reach, but high variance/risk.",
        efficiency_trend: "volatile",
    }
];
