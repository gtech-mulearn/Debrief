/**
 * Admin Utilities
 * 
 * Centralized admin check functions for consistent access control.
 */

import { createServerClient } from "@/lib/supabase/server";

/**
 * Server-side admin validation
 * Throws an error if the current user is not an admin
 * Returns the user if they are an admin
 */
export async function requireAdmin() {
  const supabase = await createServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Unauthorized: Not authenticated");
  }

  // Check DB
  const { data } = await supabase
    .from('app_admins')
    .select('email')
    .eq('email', user.email)
    .single();

  if (!data) {
    throw new Error("Forbidden: Admin access required");
  }

  return user;
}

/**
 * Get admin status for the current user (non-throwing)
 * Useful for conditional rendering
 */
export async function getAdminStatus(): Promise<{ isAdmin: boolean; email: string | null }> {
  try {
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user?.email) return { isAdmin: false, email: null };

    const { data } = await supabase
      .from('app_admins')
      .select('email')
      .eq('email', user.email)
      .single();

    return {
      isAdmin: !!data,
      email: user.email
    };
  } catch {
    return { isAdmin: false, email: null };
  }
}

