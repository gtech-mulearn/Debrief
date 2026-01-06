'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { createGame } from '@/app/actions/game-actions'
import { toast } from 'sonner'
import { ShieldAlert, Rocket } from 'lucide-react'

export default function AdminGamePage() {
    const router = useRouter()
    const [isCreating, setIsCreating] = useState(false)

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

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans">
            <Card className="w-full max-w-md glass-panel border-white/10 bg-black/40">
                <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                        <ShieldAlert className="w-6 h-6 text-red-500" />
                    </div>
                    <CardTitle className="text-2xl font-heading text-white">Admin Console</CardTitle>
                    <CardDescription className="text-slate-400">
                        Create and manage Growth Strategy Lab simulations.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button
                        onClick={handleCreateGame}
                        disabled={isCreating}
                        className="w-full h-12 text-lg bg-white text-black hover:bg-white/90"
                    >
                        {isCreating ? 'Creating...' : (
                            <div className="flex items-center gap-2">
                                <Rocket className="w-4 h-4" /> Start New Simulation
                            </div>
                        )}
                    </Button>
                    <p className="text-xs text-center text-slate-500">
                        Only authorized admin emails can perform this action.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
