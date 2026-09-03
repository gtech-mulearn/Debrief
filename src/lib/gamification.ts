import { createServerClient } from "@/lib/supabase/server";

export async function awardKarma(userId: string, amount: number) {
    const supabase = await createServerClient();

    // Increment karma
    // Since we don't have a simple increment function exposed easily without RPC or raw SQL in client usually,
    // we fetch and update. For concurrency, RPC is better, but let's stick to simple read-modify-write for MVP or check if we can use an RPC if defined.
    // Actually, `profiles` update is simple.

    // Better approach: Create a database function `increment_karma`? 
    // For now, let's just fetch and update.

    // Using any cast to bypass 'never' type issue if Database type isn't fully propagated yet
    const { data: profile } = await supabase
        .from("profiles" as any)
        .select("karma")
        .eq("id", userId)
        .single();

    if (profile) {
        const newKarma = ((profile as any).karma || 0) + amount;
        await supabase
            .from("profiles" as any)
            .update({ karma: newKarma })
            .eq("id", userId);
    }
}

export async function checkAndAwardBadge(userId: string, badgeSlug: string) {
    const supabase = await createServerClient();

    // 1. Get badge ID
    const { data: badge } = await supabase
        .from("badges" as any)
        .select("id")
        .eq("slug", badgeSlug)
        .single();

    if (!badge) return;

    // 2. Check if already awarded
    const { data: existing } = await supabase
        .from("user_badges" as any)
        .select("id")
        .eq("user_id", userId)
        .eq("badge_id", (badge as any).id)
        .single();

    if (existing) return;

    // 3. Award badge
    await supabase
        .from("user_badges" as any)
        .insert({
            user_id: userId,
            badge_id: (badge as any).id
        });
}
