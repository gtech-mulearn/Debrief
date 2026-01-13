"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Trophy, Award, Hammer, MessageSquare, Footprints } from "lucide-react";
import { cn } from "@/lib/utils";

// Map icon names to Lucide components
const ICON_MAP: Record<string, any> = {
    "trophy": Trophy,
    "award": Award,
    "hammer": Hammer,
    "message-square": MessageSquare,
    "footprints": Footprints,
};

interface BadgeListProps {
    userId: string;
}

export function BadgeList({ userId }: BadgeListProps) {
    const supabase = createClient();

    const { data: badges, isLoading } = useQuery({
        queryKey: ["user_badges", userId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("user_badges")
                .select("*, badge:badges(*)")
                .eq("user_id", userId)
                .order("awarded_at", { ascending: false });

            if (error) throw error;
            return data;
        },
        enabled: !!userId,
    });

    if (isLoading) {
        return <div className="animate-pulse h-24 bg-muted rounded-xl" />;
    }

    if (!badges || badges.length === 0) {
        return (
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        Badges
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">No badges earned yet.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Award className="h-4 w-4 text-yellow-500" />
                    Badges ({badges.length})
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    <TooltipProvider>
                        {badges.map((ub: any) => {
                            const badge = ub.badge;
                            const Icon = ICON_MAP[badge.icon_name] || Award;

                            return (
                                <Tooltip key={ub.id}>
                                    <TooltipTrigger asChild>
                                        <div className="flex items-center justify-center p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors cursor-help">
                                            <Icon className="h-5 w-5 text-primary" />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="font-bold">{badge.name}</p>
                                        <p className="text-xs text-muted-foreground">{badge.description}</p>
                                    </TooltipContent>
                                </Tooltip>
                            );
                        })}
                    </TooltipProvider>
                </div>
            </CardContent>
        </Card>
    );
}
