-- Fix RLS to allow facilitators to update team stats
create policy "Facilitator can update teams in their game" on sim_teams
for update
using (
  exists (
    select 1 from sim_games
    where sim_games.id = sim_teams.game_id
    and sim_games.created_by = auth.uid()
  )
);
