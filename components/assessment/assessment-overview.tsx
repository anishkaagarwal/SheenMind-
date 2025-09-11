"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, Shield, TrendingUp, Brain, Heart, Zap } from "lucide-react"
import { AssessmentDialog } from "./assessment-dialog"

interface Assessment {
  id: string
  title: string
  description: string
  duration: string
  questions: number
  category: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  lastTaken?: string
  lastScore?: number
  maxScore: number
}

const assessments: Assessment[] = [
  {
    id: "phq9",
    title: "PHQ-9 Depression Screening",
    description:
      "The Patient Health Questionnaire-9 is a validated tool for screening and monitoring depression severity.",
    duration: "5-7 minutes",
    questions: 9,
    category: "Depression",
    icon: Brain,
    color: "blue",
    maxScore: 27,
    lastTaken: "2024-01-15",
    lastScore: 8,
  },
  {
    id: "gad7",
    title: "GAD-7 Anxiety Assessment",
    description: "The Generalized Anxiety Disorder 7-item scale helps identify symptoms of anxiety and their severity.",
    duration: "3-5 minutes",
    questions: 7,
    category: "Anxiety",
    icon: Heart,
    color: "red",
    maxScore: 21,
    lastTaken: "2024-01-10",
    lastScore: 12,
  },
  {
    id: "stress",
    title: "Perceived Stress Scale",
    description: "Measures the degree to which situations in your life are perceived as stressful and unpredictable.",
    duration: "4-6 minutes",
    questions: 10,
    category: "Stress",
    icon: Zap,
    color: "orange",
    maxScore: 40,
  },
  {
    id: "wellbeing",
    title: "WHO-5 Well-Being Index",
    description:
      "A short questionnaire measuring current mental well-being and quality of life over the past two weeks.",
    duration: "2-3 minutes",
    questions: 5,
    category: "Well-being",
    icon: TrendingUp,
    color: "green",
    maxScore: 25,
    lastTaken: "2024-01-20",
    lastScore: 18,
  },
]

export function AssessmentOverview() {
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleStartAssessment = (assessment: Assessment) => {
    setSelectedAssessment(assessment)
    setIsDialogOpen(true)
  }

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100
    if (percentage <= 25) return "text-green-600"
    if (percentage <= 50) return "text-yellow-600"
    if (percentage <= 75) return "text-orange-600"
    return "text-red-600"
  }

  const getScoreLabel = (assessmentId: string, score: number) => {
    switch (assessmentId) {
      case "phq9":
        if (score <= 4) return "Minimal"
        if (score <= 9) return "Mild"
        if (score <= 14) return "Moderate"
        if (score <= 19) return "Moderately Severe"
        return "Severe"
      case "gad7":
        if (score <= 4) return "Minimal"
        if (score <= 9) return "Mild"
        if (score <= 14) return "Moderate"
        return "Severe"
      case "stress":
        if (score <= 13) return "Low"
        if (score <= 26) return "Moderate"
        return "High"
      case "wellbeing":
        if (score >= 20) return "Good"
        if (score >= 13) return "Moderate"
        return "Poor"
      default:
        return "Unknown"
    }
  }

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Information Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Completely Confidential</h3>
              <p className="text-sm text-muted-foreground">
                Your responses are private and secure. Only you can see your results.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Scientifically Validated</h3>
              <p className="text-sm text-muted-foreground">
                These assessments are used by healthcare professionals worldwide.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Track Your Progress</h3>
              <p className="text-sm text-muted-foreground">
                Monitor your mental health journey over time with regular assessments.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Assessment Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {assessments.map((assessment) => {
            const Icon = assessment.icon
            return (
              <Card key={assessment.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-${assessment.color}-100`}>
                        <Icon className={`h-6 w-6 text-${assessment.color}-600`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{assessment.title}</CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {assessment.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{assessment.description}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{assessment.duration}</span>
                    </div>
                    <span className="text-muted-foreground">{assessment.questions} questions</span>
                  </div>

                  {assessment.lastTaken && assessment.lastScore !== undefined && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Last taken: {assessment.lastTaken}</span>
                        <span className={`font-medium ${getScoreColor(assessment.lastScore, assessment.maxScore)}`}>
                          {getScoreLabel(assessment.id, assessment.lastScore)} ({assessment.lastScore}/
                          {assessment.maxScore})
                        </span>
                      </div>
                      <Progress value={(assessment.lastScore / assessment.maxScore) * 100} className="h-2" />
                    </div>
                  )}

                  <Button
                    className="w-full"
                    onClick={() => handleStartAssessment(assessment)}
                    variant={assessment.lastTaken ? "outline" : "default"}
                  >
                    {assessment.lastTaken ? "Retake Assessment" : "Start Assessment"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Disclaimer */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">Important Notice</h3>
            <p className="text-sm text-muted-foreground">
              These assessments are screening tools and not diagnostic instruments. They cannot replace professional
              clinical judgment. If you're experiencing severe symptoms or having thoughts of self-harm, please seek
              immediate professional help or contact emergency services.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Assessment Dialog */}
      {selectedAssessment && (
        <AssessmentDialog
          assessment={selectedAssessment}
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false)
            setSelectedAssessment(null)
          }}
        />
      )}
    </>
  )
}
