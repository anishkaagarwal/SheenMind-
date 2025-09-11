"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, AlertTriangle, Info, TrendingUp } from "lucide-react"

interface Assessment {
  id: string
  title: string
  questions: number
  maxScore: number
}

interface Question {
  id: number
  text: string
  options: { value: number; label: string }[]
}

interface AssessmentDialogProps {
  assessment: Assessment
  isOpen: boolean
  onClose: () => void
}

const assessmentQuestions: Record<string, Question[]> = {
  phq9: [
    {
      id: 1,
      text: "Little interest or pleasure in doing things",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
    {
      id: 2,
      text: "Feeling down, depressed, or hopeless",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
    {
      id: 3,
      text: "Trouble falling or staying asleep, or sleeping too much",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
    {
      id: 4,
      text: "Feeling tired or having little energy",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
    {
      id: 5,
      text: "Poor appetite or overeating",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
    {
      id: 6,
      text: "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
    {
      id: 7,
      text: "Trouble concentrating on things, such as reading the newspaper or watching television",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
    {
      id: 8,
      text: "Moving or speaking so slowly that other people could have noticed, or being so fidgety or restless that you have been moving around a lot more than usual",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
    {
      id: 9,
      text: "Thoughts that you would be better off dead, or thoughts of hurting yourself in some way",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
  ],
  gad7: [
    {
      id: 1,
      text: "Feeling nervous, anxious, or on edge",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
    {
      id: 2,
      text: "Not being able to stop or control worrying",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
    {
      id: 3,
      text: "Worrying too much about different things",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
    {
      id: 4,
      text: "Trouble relaxing",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
    {
      id: 5,
      text: "Being so restless that it's hard to sit still",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
    {
      id: 6,
      text: "Becoming easily annoyed or irritable",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
    {
      id: 7,
      text: "Feeling afraid as if something awful might happen",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
  ],
}

export function AssessmentDialog({ assessment, isOpen, onClose }: AssessmentDialogProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)

  const questions = assessmentQuestions[assessment.id] || []
  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, value) => sum + value, 0)
  }

  const getResultInterpretation = (score: number) => {
    switch (assessment.id) {
      case "phq9":
        if (score <= 4) return { level: "Minimal", color: "green", description: "Minimal depression symptoms" }
        if (score <= 9) return { level: "Mild", color: "yellow", description: "Mild depression symptoms" }
        if (score <= 14) return { level: "Moderate", color: "orange", description: "Moderate depression symptoms" }
        if (score <= 19)
          return { level: "Moderately Severe", color: "red", description: "Moderately severe depression symptoms" }
        return { level: "Severe", color: "red", description: "Severe depression symptoms" }
      case "gad7":
        if (score <= 4) return { level: "Minimal", color: "green", description: "Minimal anxiety symptoms" }
        if (score <= 9) return { level: "Mild", color: "yellow", description: "Mild anxiety symptoms" }
        if (score <= 14) return { level: "Moderate", color: "orange", description: "Moderate anxiety symptoms" }
        return { level: "Severe", color: "red", description: "Severe anxiety symptoms" }
      default:
        return { level: "Unknown", color: "gray", description: "Assessment completed" }
    }
  }

  const getRecommendations = (score: number) => {
    const result = getResultInterpretation(score)

    switch (result.level) {
      case "Minimal":
        return [
          "Continue maintaining good mental health habits",
          "Regular exercise and healthy sleep patterns",
          "Stay connected with friends and family",
          "Consider periodic check-ins with our resources",
        ]
      case "Mild":
        return [
          "Consider speaking with a peer mentor",
          "Explore our stress management resources",
          "Practice mindfulness and relaxation techniques",
          "Monitor your symptoms over the next few weeks",
        ]
      case "Moderate":
        return [
          "We recommend booking an appointment with a counselor",
          "Connect with our peer support network",
          "Use our guided meditation and breathing exercises",
          "Consider lifestyle changes to reduce stress",
        ]
      case "Moderately Severe":
      case "Severe":
        return [
          "Please consider booking an appointment with a mental health professional",
          "Reach out to our crisis support resources if needed",
          "Connect with trusted friends, family, or mentors",
          "Avoid making major life decisions while feeling this way",
        ]
      default:
        return ["Thank you for completing the assessment"]
    }
  }

  const resetAssessment = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
  }

  if (showResults) {
    const score = calculateScore()
    const result = getResultInterpretation(score)
    const recommendations = getRecommendations(score)

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Assessment Results</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Score Display */}
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="flex justify-center mb-4">
                  {result.color === "green" && <CheckCircle className="h-16 w-16 text-green-500" />}
                  {result.color === "yellow" && <Info className="h-16 w-16 text-yellow-500" />}
                  {result.color === "orange" && <AlertTriangle className="h-16 w-16 text-orange-500" />}
                  {result.color === "red" && <AlertTriangle className="h-16 w-16 text-red-500" />}
                </div>
                <h3 className="text-2xl font-semibold mb-2">{result.level}</h3>
                <p className="text-muted-foreground mb-4">{result.description}</p>
                <div className="text-3xl font-bold text-primary">
                  {score}/{assessment.maxScore}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Recommended Next Steps
                </h4>
                <ul className="space-y-2">
                  {recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Crisis Resources */}
            {(result.level === "Moderately Severe" || result.level === "Severe") && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-red-800 mb-2">Immediate Support Available</h4>
                  <p className="text-sm text-red-700 mb-3">
                    If you're having thoughts of self-harm or suicide, please reach out for help immediately:
                  </p>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>National Suicide Prevention Helpline:</strong> 9152987821
                    </div>
                    <div>
                      <strong>KIRAN Mental Health Helpline:</strong> 1800-599-0019
                    </div>
                    <div>
                      <strong>Emergency Services:</strong> 112
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={resetAssessment} variant="outline" className="flex-1 bg-transparent">
                Retake Assessment
              </Button>
              <Button onClick={onClose} className="flex-1">
                View Resources
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const currentQ = questions[currentQuestion]
  const currentAnswer = answers[currentQ?.id]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{assessment.title}</DialogTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </DialogHeader>

        {currentQ && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4 text-balance leading-relaxed">{currentQ.text}</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Over the last 2 weeks, how often have you been bothered by this problem?
              </p>
            </div>

            <RadioGroup
              value={currentAnswer?.toString()}
              onValueChange={(value) => handleAnswer(currentQ.id, Number.parseInt(value))}
            >
              <div className="space-y-3">
                {currentQ.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
                    <Label htmlFor={`option-${option.value}`} className="flex-1 cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                Previous
              </Button>
              <Button onClick={handleNext} disabled={currentAnswer === undefined}>
                {currentQuestion === questions.length - 1 ? "View Results" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
