'use server'

import { createServerClient } from "@/lib/supabase/server"

/**
 * Check if the current user is an admin by querying the app_admins table.
 * This is a Server Action safe to call from Client Components.
 */
export async function checkIsAdmin(): Promise<{ isAdmin: boolean; error?: string }> {
    try {
        const supabase = await createServerClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user?.email) return { isAdmin: false };

        // Query app_admins table
        const { data, error } = await supabase
            .from('app_admins')
            .select('email')
            .eq('email', user.email)
            .single();

        if (error || !data) {
            console.error("Admin check failed:", error);
            return { isAdmin: false, error: error?.message || "No data found" };
        }
        return { isAdmin: true };
    } catch (error: any) {
        console.error("Error checking admin status:", error);
        return { isAdmin: false, error: error?.message };
    }
}
