"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PartyPopper } from "lucide-react";

interface LevelUpModalProps {
    isOpen: boolean;
    onClose: () => void;
    level: number;
}

const LEVEL_TITLES = [
    "The Spark",
    "Problem Clarity",
    "Market Reality",
    "The Hypothesis",
    "Sustainability",
    "Reflection"
];

export function LevelUpModal({ isOpen, onClose, level }: LevelUpModalProps) {
    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md text-center">
                <DialogHeader className="flex flex-col items-center gap-4">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100 p-4">
                        <PartyPopper className="h-10 w-10 text-yellow-600" />
                    </div>
                    <DialogTitle className="text-2xl font-bold text-foreground">
                        Level Up!
                    </DialogTitle>
                    <DialogDescription className="text-lg text-muted-foreground">
                        Congratulations! You've unlocked <br />
                        <span className="font-bold text-primary text-xl mt-2 block">
                            Level {level}: {LEVEL_TITLES[level]}
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4 flex justify-center">
                    <Button onClick={onClose} variant="mint" size="lg" className="w-full">
                        Let's Go!
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
