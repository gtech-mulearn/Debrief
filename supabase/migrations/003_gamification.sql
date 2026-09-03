-- =============================================
-- GAMIFICATION SCHEMA
-- Karma, Badges, and User Stats
-- =============================================

-- 1. Add karma to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS karma INTEGER NOT NULL DEFAULT 0;

-- 2. Create badges table
CREATE TABLE IF NOT EXISTS public.badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE, -- e.g., 'first_step', 'builder'
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_name TEXT NOT NULL, -- Logical name for frontend icon mapping
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Create user_badges table (Many-to-Many)
CREATE TABLE IF NOT EXISTS public.user_badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    badge_id UUID NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
    awarded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, badge_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_badges_user ON public.user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_karma ON public.profiles(karma DESC);

-- RLS Policies

-- Badges (Public Read, Admin Write - simplified to public read for now)
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Badges are viewable by everyone"
    ON public.badges FOR SELECT
    USING (true);

-- User Badges (Public Read)
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User badges are viewable by everyone"
    ON public.user_badges FOR SELECT
    USING (true);

-- Seed Initial Badges
INSERT INTO public.badges (slug, name, description, icon_name) VALUES
    ('first_step', 'First Step', 'Completed Level 1: Problem Clarity', 'footprints'),
    ('builder', 'The Builder', 'Completed the entire Forge journey', 'hammer'),
    ('critic', 'Constructive Critic', 'Provided feedback on 3 different ideas', 'message-square')
ON CONFLICT (slug) DO NOTHING;
