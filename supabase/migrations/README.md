# Migrations

Apply in filename order. These are the only migrations for the project —
before the consolidation there were two copies of this directory, one per
app, both pointed at the same Supabase project.

## Known number collisions

Two pairs share an ordinal:

| Ordinal | Files |
|---|---|
| `008` | `008_add_game_code.sql`, `008_fix_simulation_realtime.sql` |
| `011` | `011_fix_game_visibility.sql`, `011_game_archive_table.sql` |

Filename sort happens to give the correct order in both cases
(`add_game_code` before `fix_simulation_realtime`, `fix_game_visibility`
before `game_archive_table`), so a fresh apply works today. It is still
fragile: `008_add_game_code.sql` adds the `code` column that `createGame()`
writes and marks it `NOT NULL`, so an out-of-order apply produces a schema
that silently disagrees with the application code.

**Do not renumber these files without first checking what the live project
has already applied.** Supabase keys applied migrations by filename — renaming
one that has already run makes the CLI treat it as new and try to re-apply it.
Renumber only alongside a matching update to `supabase_migrations.schema_migrations`,
or leave them and adopt timestamped names for everything from here on.

## RLS model for `app_admins`

Migrations `014`–`017` arrived at this and it should not be re-litigated:

- A user may read **only their own row** (`email = auth.email()`). This is what
  `requireAdmin()` and the middleware rely on.
- Listing, adding and removing admins goes through the **service-role client**
  (`createAdminClient()`), which bypasses RLS. `/api/admin/admins` does this.

Migration `015` briefly added an "admins can view all admins" policy that
queried `app_admins` from inside a policy on `app_admins`; `017` dropped it for
infinite recursion. If a policy ever needs an admin check again, use a
`SECURITY DEFINER` function rather than a direct subquery — see
`019_game_publish_toggle.sql` for that pattern.
