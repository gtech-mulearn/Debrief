-- Per-game publish toggle
--
-- Before this migration every simulation game was world-readable the moment it
-- was created: 011_fix_game_visibility granted `using (true)` on sim_games and
-- sim_teams so that join-by-code would work. Draft, in-progress and finished
-- games were all equally visible to anyone.
--
-- This adds an explicit admin-controlled publish flag and narrows the read
-- policies to respect it.

-- 1. The flag ------------------------------------------------------------
-- New games default to unpublished: an admin opens them deliberately.
ALTER TABLE sim_games
  ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT false;

-- Existing games were publicly visible before this migration ran. Backfill
-- them to published so this change does not retroactively hide live games.
UPDATE sim_games SET is_published = true;

CREATE INDEX IF NOT EXISTS idx_sim_games_is_published
  ON sim_games (is_published);

-- 2. Admin check usable from inside a policy -----------------------------
-- app_admins allows a user to read only their own row (see 015/017). A policy
-- that queries app_admins directly is what caused the infinite recursion 017
-- had to unpick. SECURITY DEFINER runs the lookup with RLS bypassed, which
-- breaks the cycle. Reusable anywhere an admin check is needed in a policy.
CREATE OR REPLACE FUNCTION public.is_app_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.app_admins WHERE email = auth.email()
  );
$$;

REVOKE ALL ON FUNCTION public.is_app_admin() FROM public;
GRANT EXECUTE ON FUNCTION public.is_app_admin() TO authenticated, anon;

-- 3. Games: published, or yours, or you are an admin ---------------------
DROP POLICY IF EXISTS "Anyone can view games" ON sim_games;
DROP POLICY IF EXISTS "Games are viewable by everyone" ON sim_games;

CREATE POLICY "Published games are viewable" ON sim_games
FOR SELECT
USING (
  is_published
  OR created_by = auth.uid()
  OR public.is_app_admin()
);

-- Only admins may flip the flag. The existing "Creators can update games"
-- policy stays for round progression; this one covers the publish state.
DROP POLICY IF EXISTS "Admins can update any game" ON sim_games;
CREATE POLICY "Admins can update any game" ON sim_games
FOR UPDATE
USING (public.is_app_admin())
WITH CHECK (public.is_app_admin());

-- 4. Teams follow their parent game --------------------------------------
-- The EXISTS below is itself filtered by the sim_games policy above, so it
-- finds the row exactly when the caller is allowed to see that game. Without
-- this, team names leak out of an unpublished game.
DROP POLICY IF EXISTS "Anyone can view teams" ON sim_teams;
DROP POLICY IF EXISTS "Teams are viewable by everyone" ON sim_teams;

CREATE POLICY "Teams visible when their game is" ON sim_teams
FOR SELECT
USING (
  EXISTS (SELECT 1 FROM sim_games g WHERE g.id = sim_teams.game_id)
);
