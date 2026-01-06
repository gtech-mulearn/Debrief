-- Migration: Add code column to sim_games for short join codes
ALTER TABLE sim_games ADD COLUMN code text;

-- Generate random code for existing games (fallback)
UPDATE sim_games SET code = SUBSTRING(md5(id::text) FROM 1 FOR 6) WHERE code IS NULL;

-- Make it unique and required for future
ALTER TABLE sim_games ALTER COLUMN code SET NOT NULL;
ALTER TABLE sim_games ADD CONSTRAINT sim_games_code_key UNIQUE (code);
