'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createTeam } from '@/app/actions/game-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users } from 'lucide-react'
import { toast } from 'sonner'

interface TeamRegistrationProps {
    gameId: string
    userId: string
}

export default function TeamRegistration({ gameId }: TeamRegistrationProps) {
    const router = useRouter()
    const [teamName, setTeamName] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleCreateTeam = async () => {
        if (!teamName.trim()) return
        try {
            setIsLoading(true)
            await createTeam(gameId, teamName)
            toast.success('Team joined successfully!')
            router.refresh() // Reloads to show dashboard
        } catch (error) {
            toast.error('Failed to create team', { description: error instanceof Error ? error.message : 'Unknown error' })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-slate-900 border-slate-800">
                <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <Users className="w-8 h-8 text-blue-500" />
                        <span className="text-slate-400 font-mono text-xs">GAME ID: {gameId.slice(0, 8)}...</span>
                    </div>
                    <CardTitle className="text-white text-2xl">Create Your Team</CardTitle>
                    <CardDescription className="text-slate-400">
                        Enter a name for your agency. This will be visible on the leaderboard.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Team Name</label>
                        <Input
                            placeholder="e.g. Growth Hackers"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            className="bg-slate-950 border-slate-700 text-white"
                        />
                    </div>
                    <Button
                        onClick={handleCreateTeam}
                        disabled={isLoading || !teamName.trim()}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white"
                    >
                        {isLoading ? 'Joining...' : 'Enter Simulation'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
