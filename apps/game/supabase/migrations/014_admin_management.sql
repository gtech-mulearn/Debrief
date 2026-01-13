-- Create table for managing application admins
CREATE TABLE IF NOT EXISTS public.app_admins (
    email TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- Seed with hardcoded emails to ensure continuity
-- Note: 'sachin@mulearn.org', 'admin@debrief.com', 'awindsr@gmail.com'
INSERT INTO public.app_admins (email) VALUES
('sachin@mulearn.org'),
('awindsr@gmail.com')
ON CONFLICT (email) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE public.app_admins ENABLE ROW LEVEL SECURITY;

-- Policy: Only allow SELECT for authenticated users (to check logic if needed, but mostly API handles this)
-- But primarily, we rely on Server Actions / API Routes which bypass RLS.
-- For safety, we allow users to read the list if they are admins?
-- Circular dependency issue (Admin is in table).
-- For now, we deny all by default and use Service Role on backend.
-- Wait, if we deny all, then 'created_by' reference might fail if user can't see? No.

-- Let's create a minimal view policy just in case the client tries to read it.
-- But honestly, better to keep it locked down.
