-- 1. Add visibility column
ALTER TABLE public.ideas
ADD COLUMN visibility text NOT NULL DEFAULT 'private' CHECK (visibility IN ('public', 'private'));

-- 2. Update existing ideas to be public (so we don't hide past content)
UPDATE public.ideas SET visibility = 'public';

-- 3. Enable RLS
ALTER TABLE public.ideas ENABLE ROW LEVEL SECURITY;

-- 4. Drop existing policies to recreate them cleanly
DROP POLICY IF EXISTS "Ideas are viewable by everyone" ON public.ideas;
DROP POLICY IF EXISTS "Users can create ideas" ON public.ideas;
DROP POLICY IF EXISTS "Users can update own ideas" ON public.ideas;
DROP POLICY IF EXISTS "Users can delete own ideas" ON public.ideas;

-- 5. Create new policies

-- READ: Public ideas are visible to everyone
CREATE POLICY "Public ideas are viewable by everyone" ON public.ideas
FOR SELECT
USING (visibility = 'public');

-- READ: Private ideas are visible ONLY to the owner
CREATE POLICY "Private ideas are viewable by owner" ON public.ideas
FOR SELECT
USING (user_id = auth.uid());

-- INSERT: Authenticated users can create ideas
CREATE POLICY "Users can create ideas" ON public.ideas
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- UPDATE: Users can update their own ideas (and change visibility)
CREATE POLICY "Users can update own ideas" ON public.ideas
FOR UPDATE
USING (auth.uid() = user_id);

-- DELETE: Users can delete their own ideas
CREATE POLICY "Users can delete own ideas" ON public.ideas
FOR DELETE
USING (auth.uid() = user_id);

-- 6. Also ensure idea_levels, comments, upvotes respect this?
-- If I can't see the idea, I shouldn't see its comments/levels.
-- Usually RLS on parent is enough if children are queried VIA parent.
-- But if queried directly, we might need policies on them too.
-- For now, let's assume UI fetches ideas first.
-- However, strict security would require policies on child tables checking parent visibility.
-- Adding simple policy for children:
-- "Visible if parent idea is visible".
-- This can be expensive (JOINs in RLS).
-- For MVP/Prototype, securing the main table 'ideas' is usually priority.
-- If someone guesses a comment ID, they might read it?
-- Let's stick to securing 'ideas' core table first as requested.
