"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Save, Calendar, Smile, Frown, Meh } from "lucide-react"

interface JournalEntry {
  id: string
  date: string
  content: string
  mood: "happy" | "neutral" | "sad"
  tags: string[]
}

export function JournalingSection() {
  const [currentEntry, setCurrentEntry] = useState("")
  const [selectedMood, setSelectedMood] = useState<"happy" | "neutral" | "sad" | "">("")
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: "1",
      date: "2024-01-15",
      content:
        "Today was a good day. I felt more confident during my presentation and my classmates were supportive. The breathing exercises I learned really helped calm my nerves.",
      mood: "happy",
      tags: ["confidence", "presentation", "breathing"],
    },
    {
      id: "2",
      date: "2024-01-14",
      content:
        "Had some anxiety about upcoming exams, but talking to my peer mentor helped. We discussed study strategies and I feel more prepared now.",
      mood: "neutral",
      tags: ["anxiety", "exams", "mentor"],
    },
    {
      id: "3",
      date: "2024-01-13",
      content:
        "Feeling overwhelmed with coursework. The weather in Kashmir has been affecting my mood too. Need to remember to use the resources available to me.",
      mood: "sad",
      tags: ["overwhelmed", "weather", "coursework"],
    },
  ])

  const handleSaveEntry = () => {
    if (!currentEntry.trim() || !selectedMood) return

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      content: currentEntry,
      mood: selectedMood,
      tags: [], // Could be auto-generated or user-added
    }

    setEntries([newEntry, ...entries])
    setCurrentEntry("")
    setSelectedMood("")
  }

  const getMoodIcon = (mood: "happy" | "neutral" | "sad") => {
    switch (mood) {
      case "happy":
        return <Smile className="h-4 w-4 text-green-500" />
      case "neutral":
        return <Meh className="h-4 w-4 text-yellow-500" />
      case "sad":
        return <Frown className="h-4 w-4 text-red-500" />
    }
  }

  const getMoodColor = (mood: "happy" | "neutral" | "sad") => {
    switch (mood) {
      case "happy":
        return "bg-green-50 border-green-200"
      case "neutral":
        return "bg-yellow-50 border-yellow-200"
      case "sad":
        return "bg-red-50 border-red-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* New Entry Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5" />
            <span>Dear Diary - New Entry</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">How are you feeling today?</label>
            <div className="flex space-x-3">
              <Button
                variant={selectedMood === "happy" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMood("happy")}
                className="flex items-center space-x-2"
              >
                <Smile className="h-4 w-4" />
                <span>Happy</span>
              </Button>
              <Button
                variant={selectedMood === "neutral" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMood("neutral")}
                className="flex items-center space-x-2"
              >
                <Meh className="h-4 w-4" />
                <span>Neutral</span>
              </Button>
              <Button
                variant={selectedMood === "sad" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMood("sad")}
                className="flex items-center space-x-2"
              >
                <Frown className="h-4 w-4" />
                <span>Sad</span>
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">What's on your mind?</label>
            <Textarea
              placeholder="Write about your day, feelings, thoughts, or anything you'd like to remember..."
              value={currentEntry}
              onChange={(e) => setCurrentEntry(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Your entries are private and secure. Writing helps process emotions and track progress.
            </p>
            <Button
              onClick={handleSaveEntry}
              disabled={!currentEntry.trim() || !selectedMood}
              className="flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save Entry</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Previous Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Previous Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {entries.map((entry) => (
              <div key={entry.id} className={`p-4 rounded-lg border ${getMoodColor(entry.mood)}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getMoodIcon(entry.mood)}
                    <span className="text-sm font-medium text-gray-600">
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>
                <p className="text-gray-800 mb-3 leading-relaxed">{entry.content}</p>
                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {entry.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
