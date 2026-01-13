'use server'

import { createServerClient } from "@/lib/supabase/server"

/**
 * Check if the current user is an admin by querying the app_admins table.
 * This is a Server Action safe to call from Client Components.
 */
export async function checkIsAdmin(): Promise<boolean> {
    try {
        const supabase = await createServerClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user?.email) return false;

        // Query app_admins table
        const { data, error } = await supabase
            .from('app_admins')
            .select('email')
            .eq('email', user.email)
            .single();

        if (error || !data) return false;
        return true;
    } catch (error) {
        console.error("Error checking admin status:", error);
        return false;
    }
}
