'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createGame } from '@/app/actions/game-actions'
import { toast } from 'sonner'
import { ShieldAlert, Rocket, Calendar, Search, Trophy, ExternalLink, Hash } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { SimGame, SimTeam } from '@/types/simulation'
import Leaderboard from '@/components/game/Leaderboard'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'

interface GameWithTeams extends SimGame {
    sim_teams: SimTeam[]
}

export default function AdminGamePage() {
    const router = useRouter()
    const [isCreating, setIsCreating] = useState(false)
    const [games, setGames] = useState<GameWithTeams[]>([])
    const [filterDate, setFilterDate] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchGames = async () => {
            const supabase = createClient()
            const { data, error } = await supabase
                .from('sim_games')
                .select('*, sim_teams(*)')
                .order('created_at', { ascending: false })

            if (error) {
                console.error("Error fetching games:", error)
                toast.error("Failed to load game history")
            } else {
                setGames(data as GameWithTeams[])
            }
            setLoading(false)
        }
        fetchGames()
    }, [])

    const handleCreateGame = async () => {
        try {
            setIsCreating(true)
            const newGame = await createGame()
            toast.success("Game Created!", { description: `Game Code: ${newGame.code}` })
            router.push(`/game/${newGame.code}`)
        } catch (error) {
            toast.error("Failed to create game", {
                description: error instanceof Error ? error.message : "Unknown error"
            })
        } finally {
            setIsCreating(false)
        }
    }

    const filteredGames = games.filter(game => {
        if (!filterDate) return true
        const gameDate = new Date(game.created_at).toISOString().split('T')[0]
        return gameDate === filterDate
    })

    const getWinner = (teams: SimTeam[]) => {
        if (!teams || teams.length === 0) return null
        // Sort by efficiency
        return [...teams].sort((a, b) => {
            const effA = a.total_spent > 0 ? (a.total_downloads / (a.total_spent / 100000)) : 0
            const effB = b.total_spent > 0 ? (b.total_downloads / (b.total_spent / 100000)) : 0
            return effB - effA
        })[0]
    }

    return (
        <div className="min-h-screen p-4 font-sans max-w-[1600px] mx-auto text-foreground relative">
            <div className="fixed inset-0 z-[-1] bg-page-gradient pointer-events-none" />

            <div className="max-w-4xl mx-auto space-y-8">
                {/* 1. Create Game Section */}
                <Card variant="glass" className="w-full">
                    <CardHeader className="text-center">
                        <div className="mx-auto w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                            <ShieldAlert className="w-6 h-6 text-red-500" />
                        </div>
                        <CardTitle className="text-2xl font-heading text-foreground">Admin Console</CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Create and manage Growth Strategy Lab simulations.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 max-w-md mx-auto">
                        <Button
                            onClick={handleCreateGame}
                            disabled={isCreating}
                            variant="default"
                            className="w-full h-12 text-lg"
                        >
                            {isCreating ? 'Creating...' : (
                                <div className="flex items-center gap-2">
                                    <Rocket className="w-4 h-4" /> Start New Simulation
                                </div>
                            )}
                        </Button>
                        <p className="text-xs text-center text-muted-foreground">
                            Only authorized admin emails can perform this action.
                        </p>
                    </CardContent>
                </Card>

                {/* 2. Game History Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-muted-foreground" />
                            Game Archives
                        </h2>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Filter Date:</span>
                            <Input
                                type="date"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                                className="w-auto h-8 bg-black/20 border-white/10"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-10 text-muted-foreground animate-pulse">Loading games...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredGames.length === 0 ? (
                                <div className="col-span-full text-center py-10 text-muted-foreground border border-dashed border-white/10 rounded-lg">
                                    No games found.
                                </div>
                            ) : (
                                filteredGames.map(game => {
                                    const winner = getWinner(game.sim_teams)
                                    return (
                                        <Card key={game.id} variant="glass" className="hover:bg-white/5 transition-colors">
                                            <CardContent className="p-4 space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <Badge variant="outline" className="font-mono text-xs">
                                                                {game.code}
                                                            </Badge>
                                                            <span className="text-xs text-muted-foreground">
                                                                {new Date(game.created_at).toLocaleString()}
                                                            </span>
                                                        </div>
                                                        <div className="uppercase tracking-wider text-[10px] font-bold text-muted-foreground">
                                                            {game.status} • {game.sim_teams.length} Teams
                                                        </div>
                                                    </div>
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button size="sm" variant="ghost" className="h-8 gap-1">
                                                                View <ExternalLink className="w-3 h-3" />
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                                                            <Leaderboard teams={game.sim_teams} gameId={game.id} isFacilitator={true} />
                                                        </DialogContent>
                                                    </Dialog>
                                                </div>

                                                {/* Winner Summary */}
                                                {winner ? (
                                                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-md p-3 flex items-center gap-3">
                                                        <div className="bg-yellow-500/20 p-2 rounded-full">
                                                            <Trophy className="w-4 h-4 text-center text-yellow-500" />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-bold text-foreground">
                                                                {winner.name}
                                                            </div>
                                                            <div className="text-xs text-muted-foreground">
                                                                {Math.floor(winner.total_downloads / (Math.max(1, winner.total_spent) / 100000))} Efficiency
                                                            </div>
                                                        </div>
                                                        <div className="ml-auto text-right">
                                                            <div className="text-xs font-mono text-foreground">₹{(winner.total_spent / 100000).toFixed(1)}L</div>
                                                            <div className="text-[10px] text-muted-foreground">Spent</div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="bg-white/5 rounded-md p-3 text-xs text-muted-foreground text-center">
                                                        No data yet
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    )
                                })
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
