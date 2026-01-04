"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchIdeaLevels, updateIdeaLevel } from "@/lib/api/client/forge";
import { toast } from "sonner";
import { ideaKeys } from "./use-ideas";

export const forgeKeys = {
    levels: (ideaId: string) => [...ideaKeys.detail(ideaId), "levels"] as const,
};

/**
 * Hook to fetch idea levels
 */
export function useIdeaLevels(ideaId: string) {
    return useQuery({
        queryKey: forgeKeys.levels(ideaId),
        queryFn: () => fetchIdeaLevels(ideaId),
        enabled: !!ideaId,
    });
}

/**
 * Hook to update an idea level
 */
export function useUpdateIdeaLevel(ideaId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ levelNumber, data }: { levelNumber: number; data: any }) =>
            updateIdeaLevel(ideaId, levelNumber, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: forgeKeys.levels(ideaId) });
            queryClient.invalidateQueries({ queryKey: ideaKeys.detail(ideaId) }); // Refresh idea for current_level update if needed
            toast.success("Level progress saved!");
        },
        onError: (err) => {
            toast.error(err.message || "Failed to save level");
        },
    });
}
