import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Lightbulb, Target, Search, FlaskConical, DollarSign, Award } from "lucide-react"; // Assuming these icons are imported

export type LevelStatus = "locked" | "in_progress" | "completed";

interface JourneyStepperProps {
    currentLevel: number;
    selectedLevel: number;
    onSelectLevel: (level: number) => void;
    className?: string;
}

export function JourneyStepper({ currentLevel, selectedLevel, onSelectLevel, className }: JourneyStepperProps) {
    const steps = [
        { level: 0, title: "The Spark", description: "Idea", icon: Lightbulb },
        { level: 1, title: "Clarity", description: "Problem", icon: Target },
        { level: 2, title: "Reality", description: "Market", icon: Search },
        { level: 3, title: "Hypothesis", description: "Test", icon: FlaskConical },
        { level: 4, title: "Sustainability", description: "Model", icon: DollarSign },
        { level: 5, title: "Reflection", description: "PoW", icon: Award },
    ];

    return (
        <div className={cn("w-full pb-4", className)}>
            <div className="flex items-start justify-between gap-2 overflow-x-auto md:overflow-visible px-1">
                {steps.map((step, index) => {
                    const status =
                        index < currentLevel
                            ? "completed"
                            : index === currentLevel
                                ? "in_progress"
                                : "locked";

                    const isCompleted = index < currentLevel;
                    const isCurrent = index === currentLevel;
                    // Unlock Level 1 if currentLevel is 0 (Spark is always done)
                    const isLocked = index > currentLevel && !(index === 1 && currentLevel === 0);
                    const isSelected = step.level === selectedLevel;

                    return (
                        <div key={step.level} className="group relative flex flex-1 flex-col items-center px-2">
                            {/* Connector Line */}
                            {index !== 0 && (
                                <div
                                    className={cn(
                                        "absolute top-5 -left-[50%] right-[50%] h-[2px] w-full -translate-y-1/2",
                                        index <= currentLevel ? "bg-primary" : "bg-border"
                                    )}
                                />
                            )}

                            {/* Step Button */}
                            <button
                                onClick={() => !isLocked && onSelectLevel(step.level)}
                                disabled={isLocked}
                                className={cn(
                                    "group relative z-10 flex flex-col items-center gap-2 transition-all duration-200 outline-none",
                                    isLocked ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:opacity-80",
                                    isSelected ? "scale-110" : ""
                                )}
                            >
                                {/* Circle Indicator */}
                                <div
                                    className={cn(
                                        "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                                        isCompleted
                                            ? "border-primary bg-primary text-primary-foreground"
                                            : isCurrent
                                                ? "border-primary bg-background text-primary ring-4 ring-primary/20"
                                                : "border-muted bg-muted text-muted-foreground",
                                        isSelected && !isCompleted && !isCurrent ? "ring-2 ring-primary ring-offset-2" : ""
                                    )}
                                >
                                    {isCompleted ? (
                                        <Check className="h-5 w-5" />
                                    ) : (
                                        <step.icon className="h-5 w-5" />
                                    )}
                                </div>
                                {/* Text Labels */}
                                <span
                                    className={cn(
                                        "text-xs font-medium transition-colors duration-200 mt-2",
                                        isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground",
                                        isSelected ? "font-bold text-primary" : ""
                                    )}
                                >
                                    {step.title}
                                </span>
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
