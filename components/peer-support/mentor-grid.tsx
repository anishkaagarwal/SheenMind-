"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Star, Clock, GraduationCap } from "lucide-react"
import { MentorChatDialog } from "./mentor-chat-dialog"

interface Mentor {
  id: string
  name: string
  avatar: string
  year: string
  college: string
  specialties: string[]
  rating: number
  totalSessions: number
  availability: string[]
  bio: string
  isOnline: boolean
}

const mentors: Mentor[] = [
  {
    id: "1",
    name: "Priya Sharma",
    avatar: "/indian-college-student-female.jpg",
    year: "4th Year",
    college: "University of Jammu",
    specialties: ["Academic Stress", "Time Management", "Study Skills"],
    rating: 4.8,
    totalSessions: 45,
    availability: ["Morning (6AM-12PM)", "Evening (6PM-10PM)"],
    bio: "I've helped many students overcome academic challenges and develop effective study strategies. I understand the pressure of college life and I'm here to support you.",
    isOnline: true,
  },
  {
    id: "2",
    name: "Arjun Singh",
    avatar: "/indian-college-student-male.jpg",
    year: "3rd Year",
    college: "NIT Srinagar",
    specialties: ["Anxiety Management", "Social Anxiety", "Career Guidance"],
    rating: 4.9,
    totalSessions: 62,
    availability: ["Afternoon (12PM-6PM)", "Weekend Available"],
    bio: "Having dealt with anxiety myself, I can relate to what you're going through. Let's work together to build confidence and manage stress effectively.",
    isOnline: false,
  },
  {
    id: "3",
    name: "Sneha Devi",
    avatar: "/indian-college-student-female-smiling.jpg",
    year: "4th Year",
    college: "SMVD University",
    specialties: ["Depression Support", "Relationship Issues", "Academic Stress"],
    rating: 4.7,
    totalSessions: 38,
    availability: ["Evening (6PM-10PM)", "Weekend Available"],
    bio: "I believe in creating a safe space where you can share your thoughts freely. Together, we can work through challenges and find positive solutions.",
    isOnline: true,
  },
  {
    id: "4",
    name: "Rohit Kumar",
    avatar: "/indian-college-student-male-confident.jpg",
    year: "5th Year",
    college: "IIIM Jammu",
    specialties: ["Career Guidance", "Time Management", "Study Skills"],
    rating: 4.6,
    totalSessions: 29,
    availability: ["Morning (6AM-12PM)", "Afternoon (12PM-6PM)"],
    bio: "As a senior student, I've navigated the complexities of college life and career planning. I'm here to share insights and help you make informed decisions.",
    isOnline: true,
  },
  {
    id: "5",
    name: "Kavya Thakur",
    avatar: "/indian-college-student-female-friendly.jpg",
    year: "3rd Year",
    college: "Central University of Kashmir",
    specialties: ["Social Anxiety", "Relationship Issues", "Anxiety Management"],
    rating: 4.8,
    totalSessions: 51,
    availability: ["Afternoon (12PM-6PM)", "Evening (6PM-10PM)"],
    bio: "I understand how overwhelming social situations can be. Let's work together to build your confidence and develop healthy relationships.",
    isOnline: false,
  },
  {
    id: "6",
    name: "Vikash Pandita",
    avatar: "/indian-college-student-male-helpful.jpg",
    year: "4th Year",
    college: "University of Kashmir",
    specialties: ["Academic Stress", "Depression Support", "Career Guidance"],
    rating: 4.9,
    totalSessions: 73,
    availability: ["Morning (6AM-12PM)", "Weekend Available"],
    bio: "Having overcome my own academic struggles, I'm passionate about helping others succeed. Every challenge is an opportunity for growth.",
    isOnline: true,
  },
]

export function MentorGrid() {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const handleStartChat = (mentor: Mentor) => {
    setSelectedMentor(mentor)
    setIsChatOpen(true)
  }

  return (
    <>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
          <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
                    <AvatarFallback>
                      {mentor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {mentor.isOnline && (
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-background rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg truncate">{mentor.name}</h3>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <GraduationCap className="h-4 w-4" />
                    <span>{mentor.year}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{mentor.college}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Rating and Sessions */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{mentor.rating}</span>
                  <span className="text-muted-foreground">({mentor.totalSessions} sessions)</span>
                </div>
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{mentor.isOnline ? "Online" : "Offline"}</span>
                </div>
              </div>

              {/* Specialties */}
              <div>
                <p className="text-sm font-medium mb-2">Specialties:</p>
                <div className="flex flex-wrap gap-1">
                  {mentor.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm text-muted-foreground line-clamp-3">{mentor.bio}</p>

              {/* Action Button */}
              <Button className="w-full" onClick={() => handleStartChat(mentor)} disabled={!mentor.isOnline}>
                <MessageCircle className="h-4 w-4 mr-2" />
                {mentor.isOnline ? "Start Chat" : "Currently Offline"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chat Dialog */}
      {selectedMentor && (
        <MentorChatDialog
          mentor={selectedMentor}
          isOpen={isChatOpen}
          onClose={() => {
            setIsChatOpen(false)
            setSelectedMentor(null)
          }}
        />
      )}
    </>
  )
}
