import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import TeamRegistration from '@/components/game/TeamRegistration'
import Dashboard from '@/components/game/Dashboard'

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic'

export default async function GamePage({ params }: { params: Promise<{ gameId: string }> }) {
    const { gameId } = await params
    const supabase = await createServerClient()

    // 1. Fetch Game by CODE (Short ID) or UUID
    const normalizedCode = gameId.toUpperCase();
    console.log(`[GamePage] Lookup request for: ${gameId}`);

    let game = null;
    let gameError = null;

    // A. Try Short Code
    if (gameId.length <= 8) {
        const result = await supabase
            .from('sim_games')
            .select('*')
            .eq('code', normalizedCode)
            .single();
        game = result.data;
        gameError = result.error;
    }

    // B. Try UUID (if not found as code, or if gameId looks like UUID)
    if (!game && gameId.length > 8) {
        console.log(`[GamePage] Trying UUID lookup for: ${gameId}`);
        const result = await supabase
            .from('sim_games')
            .select('*')
            .eq('id', gameId)
            .single();
        game = result.data;
        gameError = result.error;
    }

    if (gameError) console.error("[GamePage] DB Error:", gameError);
    if (!game) console.warn("[GamePage] Game not found for:", gameId);

    if (gameError || !game) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center text-foreground relative">
                <div className="fixed inset-0 z-[-1] bg-page-gradient pointer-events-none" />
                <div className="text-center">
                    <h1 className="text-4xl font-heading font-bold mb-4">Game Not Found</h1>
                    <p className="text-muted-foreground">The game ID you entered does not exist.</p>
                </div>
            </div>
        )
    }

    // 2. Auth Check
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        redirect('/auth/login?next=/game/' + gameId)
    }

    // 3. Check if user is in a team
    console.log(`[GamePage] Checking team membership for user ${user.id} in game ${game.id}`)

    const { data: userTeam, error: teamError } = await supabase
        .from('sim_teams')
        .select('*')
        .eq('game_id', game.id)
        .contains('members', [user.id])
        .single()

    if (teamError) {
        console.log(`[GamePage] Team lookup result: No team found or error`, teamError.message)
    } else {
        console.log(`[GamePage] Team found: ${userTeam?.name} (ID: ${userTeam?.id})`)
    }

    // 4. Render
    if (userTeam) {
        console.log(`[GamePage] Rendering Dashboard for team member`)
        return <Dashboard game={game} team={userTeam} currentUser={user.id} />
    }

    // Check if user is the Admin/Creator (Facilitator Mode)
    if (game.created_by === user.id) {
        console.log(`[GamePage] Rendering Dashboard for facilitator`)
        return <Dashboard game={game} currentUser={user.id} />
    }

    // User needs to join/create a team
    console.log(`[GamePage] Rendering TeamRegistration - user not in any team`)
    return <TeamRegistration gameId={game.id} userId={user.id} />
}
