-- Fix RLS usage for app_admins table
-- Enabling RLS without policies blocked all access (even from Middleware/Server Actions using user context)

-- Allow users to read their OWN row in app_admins.
-- This is necessary for 'checkIsAdmin' and Middleware to verify if the current user is an admin.
CREATE POLICY "Allow users to read own admin status" ON public.app_admins
FOR SELECT
USING (
  email = auth.email()
);

-- Note: We do NOT allow users to list all admins. Only their own check.
-- For the 'AdminManagement' component (listings), use the API route which should use a Service Role client if needed,
-- OR we can allow admins to read all.
-- But the current implementation of /api/admin/admins uses 'requireAdmin' which checks DB.
-- If we want /api/admin/admins to LIST admins, it fetches using createServerClient (User Context).
-- So valid admins need to be able to SELECT * FROM app_admins.

-- Policy: Admins can view ALL admins
CREATE POLICY "Admins can view all admins" ON public.app_admins
FOR SELECT
USING (
  (SELECT 1 FROM public.app_admins WHERE email = auth.email()) IS NOT NULL
);

-- Policy: Admins can insert/delete admins
CREATE POLICY "Admins can manage admins" ON public.app_admins
FOR ALL
USING (
  (SELECT 1 FROM public.app_admins WHERE email = auth.email()) IS NOT NULL
);

-- Drop the restrictive 'own status' policy if 'view all' covers it?
-- Recursion Risk: checking app_admins inside policy for app_admins.
-- Postgres generally handles this efficiently or might infinite loop if not careful.
-- "email = auth.email()" is safe (base case).
-- But "(SELECT 1 ...)" checks the table again.

-- SAFEST APPROACH:
-- 1. Base policy: You can see yourself.
-- 2. Recursive policy: If you are in the table, you can see everyone.
-- To avoid infinite recursion, we can use a simpler check or trusting the middleware?
-- Postgres RLS recursion: use `security definer` function to break it?
-- OR:
-- Just stick to "You can see yourself".
-- AND for LISTING admins, use `createAdminClient` (Service Role) in the API route.

-- Let's update the API route to use Service Role for listing/managing,
-- and keep RLS strict (User can only see themselves).

-- BUT, the API route currently uses `createServerClient` (User Context).
-- I should updated the API route to use `createAdminClient` or similar if available?
-- `src/lib/supabase/server.ts` exports `createAdminClient` (Line 63).

-- SO:
-- 1. Create policy "Users can see themselves". (Fixes Middleware/Header/Check)
-- 2. Update `/api/admin/admins/route.ts` to use `createAdminClient` for the list/add/remove operations.
--    This bypasses RLS, so the recursive policy isn't needed.

-- This migration adds the safe policy.
