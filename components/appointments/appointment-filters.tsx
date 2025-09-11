"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Search, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AppointmentFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState("")

  const specialties = [
    "Clinical Psychology",
    "Counseling Psychology",
    "Anxiety Disorders",
    "Depression Treatment",
    "Stress Management",
    "Academic Counseling",
    "Career Guidance",
    "Trauma Therapy",
  ]

  const timeSlots = ["Morning (9AM-12PM)", "Afternoon (12PM-4PM)", "Evening (4PM-7PM)", "Weekend Available"]

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    if (checked) {
      setSelectedSpecialties([...selectedSpecialties, specialty])
    } else {
      setSelectedSpecialties(selectedSpecialties.filter((s) => s !== specialty))
    }
  }

  const handleTimeSlotChange = (slot: string, checked: boolean) => {
    if (checked) {
      setSelectedTimeSlots([...selectedTimeSlots, slot])
    } else {
      setSelectedTimeSlots(selectedTimeSlots.filter((s) => s !== slot))
    }
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search Counselors</CardTitle>
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

      {/* Date Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Preferred Date</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="pl-10"
              min={new Date().toISOString().split("T")[0]}
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

      {/* Time Slots Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Available Times</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {timeSlots.map((slot) => (
            <div key={slot} className="flex items-center space-x-2">
              <Checkbox
                id={slot}
                checked={selectedTimeSlots.includes(slot)}
                onCheckedChange={(checked) => handleTimeSlotChange(slot, checked as boolean)}
              />
              <Label htmlFor={slot} className="text-sm font-normal">
                {slot}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Clear Filters */}
      <Button
        variant="outline"
        className="w-full bg-transparent"
        onClick={() => {
          setSearchTerm("")
          setSelectedSpecialties([])
          setSelectedTimeSlots([])
          setSelectedDate("")
        }}
      >
        Clear All Filters
      </Button>
    </div>
  )
}
