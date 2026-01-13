-- Simulation Game Tables

-- 1. Games Table
create table sim_games (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  status text check (status in ('waiting', 'active', 'completed')) default 'waiting',
  current_round integer default 0,
  total_rounds integer default 6,
  budget_pool numeric default 12500000, -- 1.25 Cr
  created_by uuid references auth.users(id)
);

-- 2. Teams Table
create table sim_teams (
  id uuid default gen_random_uuid() primary key,
  game_id uuid references sim_games(id) on delete cascade not null,
  name text not null,
  members uuid[] default array[]::uuid[], -- Array of user IDs
  total_spent numeric default 0,
  total_downloads numeric default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Decisions Table (What teams submit each round)
create table sim_decisions (
  id uuid default gen_random_uuid() primary key,
  game_id uuid references sim_games(id) on delete cascade not null,
  team_id uuid references sim_teams(id) on delete cascade not null,
  round_number integer not null,
  decisions jsonb not null, -- Stores channel allocation e.g. {"social": 2700000, "influencer": 1800000}
  submitted_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (team_id, round_number)
);

-- 4. Results Table (Calculated outcomes per round)
create table sim_results (
  id uuid default gen_random_uuid() primary key,
  game_id uuid references sim_games(id) on delete cascade not null,
  team_id uuid references sim_teams(id) on delete cascade not null,
  round_number integer not null,
  downloads_earned numeric not null,
  efficiency_score numeric not null, -- Downloads per 1L spent
  round_spending numeric not null,
  event_log jsonb, -- "Viral hit!", "Ad fatigue"
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (team_id, round_number)
);

-- Enable RLS
alter table sim_games enable row level security;
alter table sim_teams enable row level security;
alter table sim_decisions enable row level security;
alter table sim_results enable row level security;

-- Policies

-- Games: Everyone can read. Authenticated can create.
create policy "Games are viewable by everyone" on sim_games for select using (true);
create policy "Authenticated users can create games" on sim_games for insert to authenticated with check (true);
create policy "Creators can update games" on sim_games for update using (auth.uid() = created_by);

-- Teams: Everyone can read. Authenticated can insert.
create policy "Teams are viewable by everyone" on sim_teams for select using (true);
create policy "Authenticated users can create teams" on sim_teams for insert to authenticated with check (true);
create policy "Members can update their team" on sim_teams for update using (auth.uid() = any(members));

-- Decisions: Team members can see their own decisions.
create policy "Team members can view their own decisions" on sim_decisions for select using (
  exists (
    select 1 from sim_teams
    where sim_teams.id = sim_decisions.team_id
    and auth.uid() = any(sim_teams.members)
  )
);
create policy "Team members can insert decisions" on sim_decisions for insert with check (
  exists (
    select 1 from sim_teams
    where sim_teams.id = sim_decisions.team_id
    and auth.uid() = any(sim_teams.members)
  )
);

-- Results: Everyone can see results (Leaderboard).
create policy "Results are viewable by everyone" on sim_results for select using (true);

-- Realtime
alter publication supabase_realtime add table sim_games;
alter publication supabase_realtime add table sim_teams;
alter publication supabase_realtime add table sim_results;
