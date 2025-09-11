"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Calendar, Download, BookOpen, TrendingUp, Heart, Brain } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { JournalingSection } from "@/components/dashboard/journaling-section"
import { MoodTracker } from "@/components/dashboard/mood-tracker"
import { AppointmentsList } from "@/components/dashboard/appointments-list"

// Sample data for analytics
const stressData = [
  { date: "Mon", level: 3 },
  { date: "Tue", level: 5 },
  { date: "Wed", level: 2 },
  { date: "Thu", level: 4 },
  { date: "Fri", level: 6 },
  { date: "Sat", level: 2 },
  { date: "Sun", level: 3 },
]

const moodData = [
  { date: "Week 1", happy: 4, neutral: 2, sad: 1 },
  { date: "Week 2", happy: 5, neutral: 1, sad: 1 },
  { date: "Week 3", happy: 3, neutral: 3, sad: 1 },
  { date: "Week 4", happy: 6, neutral: 1, sad: 0 },
]

export default function DashboardPage() {
  const [selectedMood, setSelectedMood] = useState<string>("")

  const handleDownloadReport = () => {
    // Simulate report download
    const reportData = {
      studentName: "Student",
      period: "Last 30 Days",
      averageStress: 3.7,
      moodTrend: "Improving",
      journalEntries: 12,
      appointments: 3,
      assessmentScores: {
        phq9: 8,
        gad7: 6,
        stress: 4,
      },
    }

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "mental-health-report.json"
    a.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Wellness Dashboard</h1>
            <p className="text-gray-600 mt-1">Track your mental health journey and access support</p>
          </div>
          <div className="flex space-x-3">
            <Button
              onClick={handleDownloadReport}
              variant="outline"
              className="flex items-center space-x-2 bg-transparent"
            >
              <Download className="h-4 w-4" />
              <span>Download Report</span>
            </Button>
            <Badge variant="secondary" className="px-3 py-1">
              Last updated: Today
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Current Mood</p>
                  <p className="text-2xl font-bold text-gray-900">Good</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Stress Level</p>
                  <p className="text-2xl font-bold text-gray-900">3/10</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Journal Entries</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Next Appointment</p>
                  <p className="text-2xl font-bold text-gray-900">2 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="journal">Dear Diary</TabsTrigger>
            <TabsTrigger value="mood">Mood Tracker</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Stress Level Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5" />
                    <span>Weekly Stress Levels</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={stressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="level" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Recent Journal Entries */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Recent Journal Entries</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Today</p>
                    <p className="text-gray-900">Feeling more confident about my studies...</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Yesterday</p>
                    <p className="text-gray-900">Had a great conversation with my mentor...</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">2 days ago</p>
                    <p className="text-gray-900">Practiced breathing exercises before exam...</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Assessment History */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Assessment Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">PHQ-9 (Depression)</span>
                      <span className="text-sm text-gray-600">8/27</span>
                    </div>
                    <Progress value={30} className="h-2" />
                    <p className="text-xs text-gray-500">Mild symptoms - Consider counseling</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">GAD-7 (Anxiety)</span>
                      <span className="text-sm text-gray-600">6/21</span>
                    </div>
                    <Progress value={28} className="h-2" />
                    <p className="text-xs text-gray-500">Mild anxiety - Breathing exercises recommended</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Stress Level</span>
                      <span className="text-sm text-gray-600">4/10</span>
                    </div>
                    <Progress value={40} className="h-2" />
                    <p className="text-xs text-gray-500">Manageable stress - Keep up good habits</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="journal">
            <JournalingSection />
          </TabsContent>

          <TabsContent value="mood">
            <MoodTracker />
          </TabsContent>

          <TabsContent value="appointments">
            <AppointmentsList />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mood Trends (Monthly)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={moodData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="happy" fill="#10b981" name="Happy" />
                      <Bar dataKey="neutral" fill="#f59e0b" name="Neutral" />
                      <Bar dataKey="sad" fill="#ef4444" name="Sad" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Wellness Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800">Positive Trend</h4>
                    <p className="text-sm text-green-700 mt-1">Your mood has improved 23% this month</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800">Recommendation</h4>
                    <p className="text-sm text-blue-700 mt-1">Continue your journaling practice - it's helping!</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="font-medium text-orange-800">Goal</h4>
                    <p className="text-sm text-orange-700 mt-1">Try to maintain stress levels below 5/10</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
