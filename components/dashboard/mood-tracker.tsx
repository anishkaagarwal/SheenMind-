"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Heart, TrendingUp, Calendar } from "lucide-react"

interface MoodEntry {
  date: string
  mood: number
  stress: number
  energy: number
  notes?: string
}

export function MoodTracker() {
  const [currentMood, setCurrentMood] = useState([5])
  const [currentStress, setCurrentStress] = useState([5])
  const [currentEnergy, setCurrentEnergy] = useState([5])
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([
    { date: "2024-01-15", mood: 7, stress: 3, energy: 8 },
    { date: "2024-01-14", mood: 6, stress: 4, energy: 6 },
    { date: "2024-01-13", mood: 4, stress: 7, energy: 4 },
    { date: "2024-01-12", mood: 8, stress: 2, energy: 9 },
    { date: "2024-01-11", mood: 5, stress: 5, energy: 5 },
  ])

  const handleSaveMood = () => {
    const newEntry: MoodEntry = {
      date: new Date().toISOString().split("T")[0],
      mood: currentMood[0],
      stress: currentStress[0],
      energy: currentEnergy[0],
    }

    setMoodEntries([newEntry, ...moodEntries.filter((entry) => entry.date !== newEntry.date)])
  }

  const getMoodLabel = (value: number) => {
    if (value <= 2) return "Very Low"
    if (value <= 4) return "Low"
    if (value <= 6) return "Moderate"
    if (value <= 8) return "Good"
    return "Excellent"
  }

  const getMoodColor = (value: number) => {
    if (value <= 3) return "text-red-500"
    if (value <= 5) return "text-yellow-500"
    if (value <= 7) return "text-blue-500"
    return "text-green-500"
  }

  const getAverageMood = () => {
    const recent = moodEntries.slice(0, 7)
    const avg = recent.reduce((sum, entry) => sum + entry.mood, 0) / recent.length
    return avg.toFixed(1)
  }

  return (
    <div className="space-y-6">
      {/* Current Mood Tracker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5" />
            <span>Track Your Mood Today</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">Overall Mood</label>
                <Badge variant="outline" className={getMoodColor(currentMood[0])}>
                  {currentMood[0]}/10 - {getMoodLabel(currentMood[0])}
                </Badge>
              </div>
              <Slider value={currentMood} onValueChange={setCurrentMood} max={10} min={1} step={1} className="w-full" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">Stress Level</label>
                <Badge variant="outline" className={getMoodColor(11 - currentStress[0])}>
                  {currentStress[0]}/10
                </Badge>
              </div>
              <Slider
                value={currentStress}
                onValueChange={setCurrentStress}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">Energy Level</label>
                <Badge variant="outline" className={getMoodColor(currentEnergy[0])}>
                  {currentEnergy[0]}/10 - {getMoodLabel(currentEnergy[0])}
                </Badge>
              </div>
              <Slider
                value={currentEnergy}
                onValueChange={setCurrentEnergy}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          <Button onClick={handleSaveMood} className="w-full">
            Save Today's Mood
          </Button>
        </CardContent>
      </Card>

      {/* Mood History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Mood History</span>
            </div>
            <Badge variant="secondary">7-day average: {getAverageMood()}/10</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {moodEntries.slice(0, 10).map((entry) => (
              <div key={entry.date} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium">
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-600">Mood:</span>
                    <Badge variant="outline" className={getMoodColor(entry.mood)}>
                      {entry.mood}/10
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-600">Stress:</span>
                    <Badge variant="outline" className={getMoodColor(11 - entry.stress)}>
                      {entry.stress}/10
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-600">Energy:</span>
                    <Badge variant="outline" className={getMoodColor(entry.energy)}>
                      {entry.energy}/10
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
