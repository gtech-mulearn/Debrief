'use client'

import { useState, useRef } from 'react'
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
    const isSubmittingRef = useRef(false) // Prevent duplicate submissions

    const handleCreateTeam = async () => {
        console.log('[TeamReg] Button clicked!')

        if (!teamName.trim()) {
            console.log('[TeamReg] Empty team name, returning')
            return
        }

        // Prevent multiple simultaneous submissions
        if (isSubmittingRef.current) {
            console.log('[TeamReg] Already submitting, ignoring click')
            return
        }

        console.log('[TeamReg] Starting submission for team:', teamName)
        isSubmittingRef.current = true
        setIsLoading(true)

        try {
            console.log('[TeamReg] Calling createTeam server action...')
            const result = await createTeam(gameId, teamName)
            console.log('[TeamReg] createTeam returned:', result)

            toast.success('Team created! Reloading...')

            console.log('[TeamReg] About to call window.location.reload()')
            // Force hard reload to show Dashboard
            window.location.reload()
        } catch (error) {
            console.error('[TeamReg] Error creating team:', error)
            // Reset so user can try again
            isSubmittingRef.current = false
            setIsLoading(false)
            toast.error('Failed to join', { description: error instanceof Error ? error.message : 'Unknown error' })
        }
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
            <div className="fixed inset-0 z-[-1] bg-page-gradient pointer-events-none" />
            <Card variant="glass" className="w-full max-w-md">
                <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <Users className="w-8 h-8 text-blue-500" />
                        <span className="text-muted-foreground font-mono text-xs">GAME ID: {gameId.slice(0, 8)}...</span>
                    </div>
                    <CardTitle className="text-foreground text-2xl">Create Your Team</CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Enter a name for your agency. This will be visible on the leaderboard.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Team Name</label>
                        <Input
                            placeholder="e.g. Growth Hackers"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            className="bg-white/5 border-white/5 text-foreground focus:ring-white/20"
                        />
                    </div>
                    <Button
                        onClick={handleCreateTeam}
                        disabled={isLoading || !teamName.trim()}
                        variant="default"
                        className="w-full"
                    >
                        {isLoading ? 'Joining...' : 'Enter Simulation'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
