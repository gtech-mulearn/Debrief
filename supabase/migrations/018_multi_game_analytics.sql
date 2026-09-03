-- 1. Add game_type to sim_games
ALTER TABLE public.sim_games 
ADD COLUMN game_type text NOT NULL DEFAULT 'startup';

-- 2. Create View for Analytics Grouped by Game Type
CREATE OR REPLACE VIEW analytics_games_by_type AS
SELECT
  game_type,
  COUNT(*) as total_games,
  COUNT(*) FILTER (WHERE status = 'waiting') as status_waiting,
  COUNT(*) FILTER (WHERE status = 'active') as status_active,
  COUNT(*) FILTER (WHERE status = 'completed') as status_completed,
  COALESCE(SUM(total_downloads), 0) as total_downloads_all_time
FROM (
  SELECT g.id, g.game_type, g.status, SUM(t.total_downloads) as total_downloads
  FROM public.sim_games g
  LEFT JOIN public.sim_teams t ON g.id = t.game_id
  GROUP BY g.id, g.game_type, g.status
) game_stats
GROUP BY game_type;

-- Grant access
GRANT SELECT ON analytics_games_by_type TO authenticated;
