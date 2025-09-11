"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function MentorFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([])

  const specialties = [
    "Academic Stress",
    "Anxiety Management",
    "Depression Support",
    "Career Guidance",
    "Relationship Issues",
    "Social Anxiety",
    "Time Management",
    "Study Skills",
  ]

  const availability = ["Morning (6AM-12PM)", "Afternoon (12PM-6PM)", "Evening (6PM-10PM)", "Weekend Available"]

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    if (checked) {
      setSelectedSpecialties([...selectedSpecialties, specialty])
    } else {
      setSelectedSpecialties(selectedSpecialties.filter((s) => s !== specialty))
    }
  }

  const handleAvailabilityChange = (time: string, checked: boolean) => {
    if (checked) {
      setSelectedAvailability([...selectedAvailability, time])
    } else {
      setSelectedAvailability(selectedAvailability.filter((a) => a !== time))
    }
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search Mentors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Specialties Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Specialties</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {specialties.map((specialty) => (
            <div key={specialty} className="flex items-center space-x-2">
              <Checkbox
                id={specialty}
                checked={selectedSpecialties.includes(specialty)}
                onCheckedChange={(checked) => handleSpecialtyChange(specialty, checked as boolean)}
              />
              <Label htmlFor={specialty} className="text-sm font-normal">
                {specialty}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Availability Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Availability</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {availability.map((time) => (
            <div key={time} className="flex items-center space-x-2">
              <Checkbox
                id={time}
                checked={selectedAvailability.includes(time)}
                onCheckedChange={(checked) => handleAvailabilityChange(time, checked as boolean)}
              />
              <Label htmlFor={time} className="text-sm font-normal">
                {time}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
