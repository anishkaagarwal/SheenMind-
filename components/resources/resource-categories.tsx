"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Briefcase,
  Brain,
  Heart,
  BookOpen,
  Headphones,
  Wind,
  MapPin,
  Clock,
  ExternalLink,
  Play,
} from "lucide-react"
import { BreathingExercise } from "./breathing-exercise"

interface Resource {
  id: string
  title: string
  description: string
  type: "article" | "video" | "audio" | "tool" | "guide" | "link"
  duration?: string
  category: string
  tags: string[]
  location?: string
  featured?: boolean
}

const resources: Resource[] = [
  // Career Resources
  {
    id: "jk-govt-jobs",
    title: "J&K Government Job Opportunities 2024",
    description: "Latest government job openings, eligibility criteria, and application processes in Jammu and Kashmir",
    type: "guide",
    duration: "10 min read",
    category: "career",
    tags: ["government", "jobs", "applications"],
    location: "Jammu & Kashmir",
  },
  {
    id: "startup-ecosystem-jk",
    title: "Growing Startup Ecosystem in Kashmir Valley",
    description: "Explore emerging startups and entrepreneurship opportunities in the region",
    type: "article",
    duration: "8 min read",
    category: "career",
    tags: ["startups", "entrepreneurship", "innovation"],
    location: "Kashmir Valley",
  },
  {
    id: "tourism-careers",
    title: "Career Opportunities in J&K Tourism Industry",
    description: "Guide to building a career in the thriving tourism sector of Jammu and Kashmir",
    type: "guide",
    duration: "12 min read",
    category: "career",
    tags: ["tourism", "hospitality", "travel"],
    location: "Jammu & Kashmir",
  },
  {
    id: "tech-jobs-srinagar",
    title: "IT and Tech Jobs in Srinagar",
    description: "Overview of the growing technology sector and available positions in Srinagar",
    type: "article",
    duration: "6 min read",
    category: "career",
    tags: ["technology", "IT", "software"],
    location: "Srinagar",
  },

  // Meditation Resources
  {
    id: "morning-meditation",
    title: "Morning Mindfulness for Students",
    description: "Start your day with clarity and focus through guided morning meditation",
    type: "audio",
    duration: "15 minutes",
    category: "meditation",
    tags: ["morning", "mindfulness", "focus"],
  },
  {
    id: "exam-stress-meditation",
    title: "Pre-Exam Anxiety Relief",
    description: "Calming meditation specifically designed for students before exams",
    type: "audio",
    duration: "10 minutes",
    category: "meditation",
    tags: ["anxiety", "exams", "stress-relief"],
  },
  {
    id: "sleep-meditation",
    title: "Better Sleep Meditation",
    description: "Guided meditation to help you fall asleep peacefully and improve sleep quality",
    type: "audio",
    duration: "20 minutes",
    category: "meditation",
    tags: ["sleep", "relaxation", "night"],
  },
  {
    id: "walking-meditation-dal-lake",
    title: "Walking Meditation by Dal Lake",
    description: "Experience the serenity of Kashmir through guided walking meditation",
    type: "video",
    duration: "25 minutes",
    category: "meditation",
    tags: ["walking", "nature", "kashmir"],
    location: "Dal Lake, Srinagar",
  },

  // Wellness Resources
  {
    id: "stress-management-guide",
    title: "Complete Stress Management Guide for Students",
    description: "Evidence-based techniques for managing academic and personal stress",
    type: "guide",
    duration: "20 min read",
    category: "wellness",
    tags: ["stress", "management", "techniques"],
  },
  {
    id: "healthy-eating-college",
    title: "Nutrition Guide for College Students",
    description: "Practical tips for maintaining healthy eating habits during college years",
    type: "article",
    duration: "8 min read",
    category: "wellness",
    tags: ["nutrition", "health", "lifestyle"],
  },
  {
    id: "exercise-mental-health",
    title: "Exercise and Mental Health Connection",
    description: "How physical activity can improve your mental wellbeing and academic performance",
    type: "article",
    duration: "7 min read",
    category: "wellness",
    tags: ["exercise", "mental-health", "fitness"],
  },

  // Educational Resources
  {
    id: "understanding-anxiety",
    title: "Understanding Anxiety Disorders",
    description: "Comprehensive guide to recognizing and understanding different types of anxiety",
    type: "article",
    duration: "15 min read",
    category: "education",
    tags: ["anxiety", "mental-health", "awareness"],
  },
  {
    id: "depression-myths",
    title: "Myths and Facts About Depression",
    description: "Debunking common misconceptions about depression and mental health",
    type: "article",
    duration: "10 min read",
    category: "education",
    tags: ["depression", "myths", "facts"],
  },
  {
    id: "building-resilience",
    title: "Building Emotional Resilience",
    description: "Practical strategies for developing emotional strength and coping skills",
    type: "guide",
    duration: "18 min read",
    category: "education",
    tags: ["resilience", "coping", "emotional-health"],
  },
]

export function ResourceCategories() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showBreathingExercise, setShowBreathingExercise] = useState(false)

  const categories = [
    { id: "all", label: "All Resources", icon: BookOpen },
    { id: "career", label: "Career Opportunities", icon: Briefcase },
    { id: "meditation", label: "Meditation & Audio", icon: Headphones },
    { id: "wellness", label: "Wellness Tools", icon: Heart },
    { id: "education", label: "Educational Content", icon: Brain },
  ]

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "video":
        return Play
      case "audio":
        return Headphones
      case "guide":
      case "article":
        return BookOpen
      case "tool":
        return Brain
      case "link":
        return ExternalLink
      default:
        return BookOpen
    }
  }

  const getResourceAction = (type: string) => {
    switch (type) {
      case "video":
        return "Watch"
      case "audio":
        return "Listen"
      case "guide":
        return "Download"
      case "article":
        return "Read"
      case "tool":
        return "Try"
      case "link":
        return "Visit"
      default:
        return "View"
    }
  }

  return (
    <>
      <section className="space-y-8">
        {/* Search and Filter */}
        <div className="space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-5">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-1">
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{category.label}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-6">
                {/* Special Tools Section */}
                {category.id === "wellness" && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Interactive Tools</h3>
                    <Card
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setShowBreathingExercise(true)}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <Wind className="h-8 w-8 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">Interactive Breathing Exercise</h4>
                            <p className="text-sm text-muted-foreground">
                              Guided breathing techniques to reduce stress and anxiety
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <Badge variant="secondary">Interactive</Badge>
                              <span className="text-xs text-muted-foreground flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                5-10 minutes
                              </span>
                            </div>
                          </div>
                          <Button>
                            <Play className="h-4 w-4 mr-2" />
                            Start
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Resources Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResources.map((resource) => {
                    const Icon = getResourceIcon(resource.type)
                    return (
                      <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <Badge variant="secondary" className="capitalize">
                              {resource.type}
                            </Badge>
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm text-muted-foreground line-clamp-3">{resource.description}</p>

                          <div className="flex flex-wrap gap-1">
                            {resource.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            {resource.location && (
                              <div className="flex items-center space-x-1 text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                <span className="truncate">{resource.location}</span>
                              </div>
                            )}
                            {resource.duration && (
                              <div className="flex items-center space-x-1 text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{resource.duration}</span>
                              </div>
                            )}
                          </div>

                          <Button className="w-full">
                            <Icon className="h-4 w-4 mr-2" />
                            {getResourceAction(resource.type)}
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                {filteredResources.length === 0 && (
                  <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No resources found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search terms or browse different categories.
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Breathing Exercise Modal */}
      <BreathingExercise isOpen={showBreathingExercise} onClose={() => setShowBreathingExercise(false)} />
    </>
  )
}
