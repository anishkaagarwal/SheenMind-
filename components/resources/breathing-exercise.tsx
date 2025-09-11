"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, RotateCcw, Volume2 } from "lucide-react"

interface BreathingExerciseProps {
  isOpen: boolean
  onClose: () => void
}

type Phase = "inhale" | "hold" | "exhale" | "pause"

const exercises = [
  {
    id: "478",
    name: "4-7-8 Breathing",
    description: "Inhale for 4, hold for 7, exhale for 8. Great for anxiety and sleep.",
    pattern: { inhale: 4, hold: 7, exhale: 8, pause: 0 },
    cycles: 4,
  },
  {
    id: "box",
    name: "Box Breathing",
    description: "Equal counts for all phases. Perfect for focus and stress relief.",
    pattern: { inhale: 4, hold: 4, exhale: 4, pause: 4 },
    cycles: 6,
  },
  {
    id: "calm",
    name: "Calming Breath",
    description: "Longer exhale for relaxation. Ideal for winding down.",
    pattern: { inhale: 4, hold: 2, exhale: 6, pause: 2 },
    cycles: 8,
  },
]

export function BreathingExercise({ isOpen, onClose }: BreathingExerciseProps) {
  const [selectedExercise, setSelectedExercise] = useState(exercises[0])
  const [isActive, setIsActive] = useState(false)
  const [currentPhase, setCurrentPhase] = useState<Phase>("inhale")
  const [currentCount, setCurrentCount] = useState(0)
  const [currentCycle, setCurrentCycle] = useState(1)
  const [progress, setProgress] = useState(0)

  const { pattern, cycles } = selectedExercise
  const totalDuration = pattern.inhale + pattern.hold + pattern.exhale + pattern.pause
  const phaseProgress = (currentCount / getPhaseLength(currentPhase)) * 100

  function getPhaseLength(phase: Phase): number {
    return pattern[phase]
  }

  function getPhaseInstruction(phase: Phase): string {
    switch (phase) {
      case "inhale":
        return "Breathe In"
      case "hold":
        return "Hold"
      case "exhale":
        return "Breathe Out"
      case "pause":
        return "Pause"
    }
  }

  function getNextPhase(phase: Phase): Phase {
    switch (phase) {
      case "inhale":
        return pattern.hold > 0 ? "hold" : "exhale"
      case "hold":
        return "exhale"
      case "exhale":
        return pattern.pause > 0 ? "pause" : "inhale"
      case "pause":
        return "inhale"
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive) {
      interval = setInterval(() => {
        setCurrentCount((prev) => {
          const phaseLength = getPhaseLength(currentPhase)

          if (prev >= phaseLength - 1) {
            const nextPhase = getNextPhase(currentPhase)

            if (currentPhase === "exhale" || (currentPhase === "pause" && pattern.pause > 0)) {
              if (currentCycle >= cycles) {
                setIsActive(false)
                return 0
              }
              setCurrentCycle((c) => c + 1)
            }

            setCurrentPhase(nextPhase)
            return 0
          }

          return prev + 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isActive, currentPhase, currentCycle, cycles, pattern])

  useEffect(() => {
    const totalProgress =
      (((currentCycle - 1) * totalDuration + getCurrentPhaseOffset() + currentCount) / (cycles * totalDuration)) * 100
    setProgress(Math.min(totalProgress, 100))
  }, [currentCycle, currentPhase, currentCount, cycles, totalDuration])

  function getCurrentPhaseOffset(): number {
    switch (currentPhase) {
      case "inhale":
        return 0
      case "hold":
        return pattern.inhale
      case "exhale":
        return pattern.inhale + pattern.hold
      case "pause":
        return pattern.inhale + pattern.hold + pattern.exhale
    }
  }

  const handleStart = () => {
    setIsActive(true)
  }

  const handlePause = () => {
    setIsActive(false)
  }

  const handleReset = () => {
    setIsActive(false)
    setCurrentPhase("inhale")
    setCurrentCount(0)
    setCurrentCycle(1)
    setProgress(0)
  }

  const handleExerciseChange = (exercise: (typeof exercises)[0]) => {
    setSelectedExercise(exercise)
    handleReset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Breathing Exercise</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Exercise Selection */}
          <div className="grid gap-3">
            {exercises.map((exercise) => (
              <Card
                key={exercise.id}
                className={`cursor-pointer transition-colors ${
                  selectedExercise.id === exercise.id ? "ring-2 ring-primary" : "hover:bg-muted/50"
                }`}
                onClick={() => handleExerciseChange(exercise)}
              >
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{exercise.name}</h3>
                      <p className="text-sm text-muted-foreground">{exercise.description}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">{exercise.cycles} cycles</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Breathing Circle */}
          <div className="text-center space-y-6">
            <div className="relative mx-auto w-48 h-48 flex items-center justify-center">
              {/* Outer circle */}
              <div
                className={`absolute inset-0 rounded-full border-4 transition-all duration-1000 ${
                  currentPhase === "inhale"
                    ? "border-blue-500 scale-110"
                    : currentPhase === "hold"
                      ? "border-yellow-500 scale-110"
                      : currentPhase === "exhale"
                        ? "border-green-500 scale-90"
                        : "border-gray-400 scale-100"
                }`}
              />

              {/* Inner circle */}
              <div
                className={`absolute inset-4 rounded-full transition-all duration-1000 ${
                  currentPhase === "inhale"
                    ? "bg-blue-500/20 scale-110"
                    : currentPhase === "hold"
                      ? "bg-yellow-500/20 scale-110"
                      : currentPhase === "exhale"
                        ? "bg-green-500/20 scale-75"
                        : "bg-gray-400/20 scale-100"
                }`}
              />

              {/* Center content */}
              <div className="relative z-10 text-center">
                <div className="text-2xl font-bold text-primary mb-2">{getPhaseInstruction(currentPhase)}</div>
                <div className="text-4xl font-mono">{getPhaseLength(currentPhase) - currentCount}</div>
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>
                  Cycle {currentCycle} of {cycles}
                </span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Controls */}
            <div className="flex justify-center space-x-4">
              <Button onClick={isActive ? handlePause : handleStart} size="lg" className="px-8">
                {isActive ? (
                  <>
                    <Pause className="h-5 w-5 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5 mr-2" />
                    {progress > 0 ? "Resume" : "Start"}
                  </>
                )}
              </Button>

              <Button onClick={handleReset} variant="outline" size="lg">
                <RotateCcw className="h-5 w-5 mr-2" />
                Reset
              </Button>
            </div>

            {/* Instructions */}
            <Card className="bg-muted/50">
              <CardContent className="pt-4">
                <div className="flex items-start space-x-2">
                  <Volume2 className="h-5 w-5 text-primary mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">Instructions:</p>
                    <p className="text-muted-foreground">
                      Find a comfortable position, close your eyes if you'd like, and follow the breathing pattern. The
                      circle will guide your breath - expand as you inhale, contract as you exhale.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
