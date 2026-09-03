# Debrief

**Validate ideas before you build.**

Debrief is a platform designed to help founders and creators validate their startup ideas through instant, honest feedback from real users. Stop guessing and start validating.

![Debrief Preview](/public/debrief-logo.svg)

## 🚀 Features

Debrief is one app with two halves that share an account and a database:

- **The platform** — post an idea, take it through a structured five-stage
  validation journey (**The Forge**), and collect feedback, votes and backing
  from the community. Pivots are recorded as versions, so the journey stays
  public and honest.
- **Growth Lab** (`/game`) — a live, facilitated growth-strategy simulation.
  Teams allocate a budget across seven marketing channels over six timed
  rounds and compete on efficiency.

## 👤 User Roles

Five roles, from least to most privileged. Each inherits everything the role
above it can do.

| Role | How you get it | Where it's enforced |
|---|---|---|
| **Visitor** | Not signed in | RLS: only `visibility = 'public'` ideas |
| **Member** | Sign in with Google | `middleware.ts` → `protectedRoutes` |
| **Collaborator** | Invited to an idea, invite accepted | `idea_collaborators.role` + RLS |
| **Facilitator** | Created a Growth Lab game | `sim_games.created_by` |
| **Admin** | Row in `app_admins` | `requireAdmin()` + `public.is_app_admin()` |

---

### 🌐 Visitor — not signed in

Everything public, nothing that writes.

- Browse the public idea feed (`/`).
- Open any **public** idea (`/ideas/[id]`) and read its Forge journey, feedback
  summary, backers and pivot history.
- Open a share link (`/share/[id]`).
- Read `/privacy` and `/terms`.

Private ideas are invisible — the database filters them out, not the UI.
Visiting a members-only page redirects to `/login?redirectTo=…` and returns you
there after sign-in.

### 👥 Member — signed in

Sign-in is **Google OAuth only**; there is no password flow.

**Post and manage your own ideas**
- Create an idea at `/ideas/new`.
- Work through **The Forge**, a six-stage journey:

  | Stage | Focus |
  |---|---|
  | 0 · The Spark | The idea itself |
  | 1 · Clarity | The problem |
  | 2 · Reality | The market |
  | 3 · Hypothesis | The test |
  | 4 · Sustainability | The business model |
  | 5 · Reflection | Proof of work |

- **Publish or hide** your idea from the actions menu.
  ⚠️ **New ideas are created private.** They do not appear in the public feed
  until you switch visibility to public.
- Record a **pivot** — the previous version is kept, so the trail stays visible.
- **Invite collaborators** by email and remove them later.
- Delete your idea.

**Take part in other people's ideas**
- Vote, and remove your vote.
- Comment.
- Leave **structured feedback** against a specific Forge stage.
- **Back** an idea to signal you would use or fund it.

**Earn badges**

| Badge | Earned by |
|---|---|
| First Step | Completing Level 1: Problem Clarity |
| The Builder | Completing the entire Forge journey |
| Constructive Critic | Giving feedback on 3 different ideas |

**Play Growth Lab** — see *Player* below.

### 🤝 Collaborator — invited to someone else's idea

Invitations are accepted at `/invites/[token]/accept`. Permissions apply only
once the invite is accepted, and only to that one idea.

| | Viewer | Editor | Admin |
|---|:--:|:--:|:--:|
| Read a private idea | ✅ | ✅ | ✅ |
| Edit the idea and its Forge stages | — | ✅ | ✅ |
| Manage the collaborator list | — | — | ✅ |
| Delete the idea | — | — | ✅ |

The idea's original owner always keeps full control regardless of the
collaborator list.

### 🎮 Player — in a Growth Lab game

- Join a published game with its **6-character code** at `/game`.
- Create a team, or join an existing one. A game **auto-starts at 5 teams**.
- Each round, split your budget across seven channels — Social Ads, Influencer
  Marketing, Content Marketing, Paid Search, Email Retargeting, Referral and PR.
  Each behaves differently over time: some fatigue, some compound.
- Watch the live leaderboard, ranked on **efficiency** (downloads per ₹1L spent),
  not raw spend.

**The rules:** 6 rounds · 2.5 minutes each · ₹1.5 Cr shared pool · ₹30L cap per
team across the whole game.

Unpublished games are unreachable, including by direct code.

### 🧭 Facilitator — created the game

Whoever created a game gets a facilitator view of it, instead of a team view.

- Start the game when enough teams have registered.
- Advance rounds — scoring runs, results are written, and the next round opens.
  Teams that miss a round are scored as zero spend.
- See the full leaderboard and every team's results throughout.

A completed game is snapshotted to an archive automatically.

### 🛡️ Admin — listed in `app_admins`

Admin is granted by a row in the `app_admins` table, managed from the dashboard.

**Analytics** (`/admin/analytics`)
- **Users & Growth** — signups and activity.
- **Idea Pipeline** — ideas and their progress through the Forge.
- **Simulation Game** — participation across all games.
- **Settings** — add and remove admins.
- Export any of the three as CSV.

**Growth Lab console** (`/game/admin`)
- Create a game and get its join code.
- **Publish toggle** — switch each game between *Visible to players* and
  *Hidden*. New games start hidden, so a session is opened deliberately.
- Browse archived games with date filtering, and open any past leaderboard.

Admins can read and update every game regardless of who created it.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)
- **Forms**: React Hook Form + Zod

## 🏁 Getting Started

We welcome contributions! Follow these steps to set up the project locally.

### Prerequisites

- Node.js 18+
- npm (the repo ships a package-lock.json)
- A Supabase project (for local dev, you'll need the credentials)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/mulearn/debrief.git
    cd debrief
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    ```bash
    cp .env.example .env.local
    ```
    Fill in the three required values. `.env.example` documents each one and the
    optional email and Redis blocks:

    | Variable | Purpose |
    |---|---|
    | `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
    | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Anon key, used by the browser |
    | `SUPABASE_SECRET_KEY` | Service-role key. Bypasses RLS — **server only** |

    *Note: Ask the maintainers for test environment credentials if you don't have your own.*

4.  **Apply the database migrations**
    Run everything in `supabase/migrations/` in filename order against your
    Supabase project. Read `supabase/migrations/README.md` first — two pairs of
    files share an ordinal, and it explains why they must not be renumbered
    casually.

    To make yourself an admin, add your email to the `app_admins` table.

5.  **Run the development server**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Contributing

We love contributions! whether it's fixing bugs, improving documentation, or building new features.

1.  **Fork the Project**
2.  **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3.  **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4.  **Push to the Branch** (`git push origin feature/AmazingFeature`)
5.  **Open a Pull Request**

Please make sure to update tests as appropriate and follow the existing coding style.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Built by the [µLearn](https://mulearn.org) community.
