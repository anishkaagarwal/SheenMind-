"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Star, MapPin, GraduationCap, Clock } from "lucide-react"
import { BookingDialog } from "./booking-dialog"

interface Counselor {
  id: string
  name: string
  avatar: string
  title: string
  qualifications: string[]
  specialties: string[]
  experience: number
  rating: number
  totalSessions: number
  location: string
  languages: string[]
  bio: string
  availableSlots: string[]
  sessionFee: number
}

const counselors: Counselor[] = [
  {
    id: "1",
    name: "Dr. Meera Gupta",
    avatar: "/counselor-female-professional.jpg",
    title: "Clinical Psychologist",
    qualifications: ["Ph.D. Psychology", "M.Phil Clinical Psychology"],
    specialties: ["Anxiety Disorders", "Depression Treatment", "Stress Management"],
    experience: 8,
    rating: 4.9,
    totalSessions: 1250,
    location: "Jammu",
    languages: ["Hindi", "English", "Dogri"],
    bio: "Dr. Gupta specializes in cognitive behavioral therapy and has extensive experience working with college students. She creates a safe, non-judgmental environment for healing.",
    availableSlots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"],
    sessionFee: 800,
  },
  {
    id: "2",
    name: "Dr. Rajesh Sharma",
    avatar: "/counselor-male-experienced.jpg",
    title: "Counseling Psychologist",
    qualifications: ["M.A. Psychology", "Diploma in Counseling"],
    specialties: ["Academic Counseling", "Career Guidance", "Relationship Issues"],
    experience: 12,
    rating: 4.8,
    totalSessions: 2100,
    location: "Srinagar",
    languages: ["Hindi", "English", "Kashmiri", "Urdu"],
    bio: "With over a decade of experience, Dr. Sharma helps students navigate academic pressures and make informed career decisions while maintaining mental wellness.",
    availableSlots: ["10:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"],
    sessionFee: 1000,
  },
  {
    id: "3",
    name: "Dr. Priya Devi",
    avatar: "/counselor-female-compassionate.jpg",
    title: "Clinical Psychologist",
    qualifications: ["Ph.D. Clinical Psychology", "Post-Doc Trauma Therapy"],
    specialties: ["Trauma Therapy", "PTSD Treatment", "Anxiety Disorders"],
    experience: 6,
    rating: 4.9,
    totalSessions: 890,
    location: "Jammu",
    languages: ["Hindi", "English", "Punjabi"],
    bio: "Dr. Devi specializes in trauma-informed care and uses evidence-based approaches to help students overcome difficult experiences and build resilience.",
    availableSlots: ["9:30 AM", "12:00 PM", "2:30 PM", "4:30 PM"],
    sessionFee: 900,
  },
  {
    id: "4",
    name: "Dr. Amit Singh",
    avatar: "/counselor-male-friendly.jpg",
    title: "Counseling Psychologist",
    qualifications: ["M.Phil Psychology", "Certificate in CBT"],
    specialties: ["Depression Treatment", "Stress Management", "Academic Counseling"],
    experience: 5,
    rating: 4.7,
    totalSessions: 650,
    location: "Udhampur",
    languages: ["Hindi", "English", "Dogri"],
    bio: "Dr. Singh focuses on helping students develop coping strategies and build emotional resilience through personalized therapeutic approaches.",
    availableSlots: ["11:00 AM", "1:30 PM", "3:30 PM", "5:30 PM"],
    sessionFee: 700,
  },
  {
    id: "5",
    name: "Dr. Sunita Kumari",
    avatar: "/counselor-female-warm.jpg",
    title: "Clinical Psychologist",
    qualifications: ["Ph.D. Psychology", "Specialization in Adolescent Psychology"],
    specialties: ["Anxiety Disorders", "Social Anxiety", "Self-Esteem Issues"],
    experience: 10,
    rating: 4.8,
    totalSessions: 1500,
    location: "Srinagar",
    languages: ["Hindi", "English", "Kashmiri"],
    bio: "Dr. Kumari has a special interest in working with young adults and uses a holistic approach to mental health that considers cultural and social factors.",
    availableSlots: ["9:00 AM", "12:30 PM", "3:00 PM", "5:00 PM"],
    sessionFee: 850,
  },
  {
    id: "6",
    name: "Dr. Vikram Pandita",
    avatar: "/counselor-male-professional.jpg",
    title: "Psychiatrist & Counselor",
    qualifications: ["MBBS", "MD Psychiatry", "Diploma in Psychological Medicine"],
    specialties: ["Clinical Psychology", "Medication Management", "Severe Mental Health"],
    experience: 15,
    rating: 4.9,
    totalSessions: 3200,
    location: "Jammu",
    languages: ["Hindi", "English", "Kashmiri", "Dogri"],
    bio: "Dr. Pandita combines medical and psychological approaches to provide comprehensive mental health care, especially for complex cases requiring integrated treatment.",
    availableSlots: ["10:30 AM", "2:00 PM", "4:00 PM", "6:00 PM"],
    sessionFee: 1200,
  },
]

export function CounselorGrid() {
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const handleBookAppointment = (counselor: Counselor) => {
    setSelectedCounselor(counselor)
    setIsBookingOpen(true)
  }

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        {counselors.map((counselor) => (
          <Card key={counselor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={counselor.avatar || "/placeholder.svg"} alt={counselor.name} />
                  <AvatarFallback>
                    {counselor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-xl">{counselor.name}</h3>
                  <p className="text-primary font-medium">{counselor.title}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
                    <div className="flex items-center space-x-1">
                      <GraduationCap className="h-4 w-4" />
                      <span>{counselor.experience} years exp.</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{counselor.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Rating and Sessions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{counselor.rating}</span>
                  <span className="text-muted-foreground text-sm">({counselor.totalSessions} sessions)</span>
                </div>
                <div className="text-lg font-semibold text-primary">₹{counselor.sessionFee}/session</div>
              </div>

              {/* Qualifications */}
              <div>
                <p className="text-sm font-medium mb-1">Qualifications:</p>
                <div className="flex flex-wrap gap-1">
                  {counselor.qualifications.map((qual) => (
                    <Badge key={qual} variant="outline" className="text-xs">
                      {qual}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Specialties */}
              <div>
                <p className="text-sm font-medium mb-1">Specialties:</p>
                <div className="flex flex-wrap gap-1">
                  {counselor.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <p className="text-sm font-medium mb-1">Languages:</p>
                <p className="text-sm text-muted-foreground">{counselor.languages.join(", ")}</p>
              </div>

              {/* Bio */}
              <p className="text-sm text-muted-foreground line-clamp-3">{counselor.bio}</p>

              {/* Available Slots Preview */}
              <div>
                <p className="text-sm font-medium mb-2 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Today's Available Slots:
                </p>
                <div className="flex flex-wrap gap-1">
                  {counselor.availableSlots.slice(0, 3).map((slot) => (
                    <Badge key={slot} variant="outline" className="text-xs">
                      {slot}
                    </Badge>
                  ))}
                  {counselor.availableSlots.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{counselor.availableSlots.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <Button className="w-full" onClick={() => handleBookAppointment(counselor)}>
                <Calendar className="h-4 w-4 mr-2" />
                Book Appointment
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Booking Dialog */}
      {selectedCounselor && (
        <BookingDialog
          counselor={selectedCounselor}
          isOpen={isBookingOpen}
          onClose={() => {
            setIsBookingOpen(false)
            setSelectedCounselor(null)
          }}
        />
      )}
    </>
  )
}
