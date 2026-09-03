-- Fix Infinite Recursion in RLS Policy
-- The previous policy 'Admins can view all admins' caused recursion because checking if someone is an admin involved reading the table itself.

DROP POLICY IF EXISTS "Admins can view all admins" ON public.app_admins;
DROP POLICY IF EXISTS "Admins can manage admins" ON public.app_admins;

-- SIMPLIFIED SECURITY MODEL:
-- 1. Users can ONLY read their own record (to verify they are admins).
-- 2. Management (List/Add/Delete) logic MUST use a Service Role client (which bypasses RLS).
--    (We already updated the API route /api/admin/admins to use createAdminClient, so this is safe).

-- Ensure the self-read policy exists (recreating to be sure)
DROP POLICY IF EXISTS "Allow users to read own admin status" ON public.app_admins;

CREATE POLICY "Allow users to read own admin status" ON public.app_admins
FOR SELECT
USING (
  email = auth.email()
);

-- Note: We intentionally do NOT add a policy for admins to read others.
-- This forces the use of the secure Service Role client for management tasks, preventing any accidental data leaks via client-side queries.
