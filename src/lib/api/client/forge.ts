import type { IdeaLevel, IdeaFeedback } from "@/types/database";

const API_BASE = "/api/ideas";

/**
 * Fetch levels for an idea
 */
export async function fetchIdeaLevels(ideaId: string): Promise<{ data: IdeaLevel[] }> {
    const response = await fetch(`${API_BASE}/${ideaId}/levels`);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch levels");
    }

    return response.json();
}

/**
 * Update a specific level for an idea
 */
export async function updateIdeaLevel(
    ideaId: string,
    levelNumber: number,
    data: any
): Promise<{ data: IdeaLevel }> {
    const response = await fetch(`${API_BASE}/${ideaId}/levels/${levelNumber}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update level");
    }

    return response.json();
}
