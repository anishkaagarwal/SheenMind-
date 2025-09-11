"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Video, Phone, MapPin } from "lucide-react"

interface Appointment {
  id: string
  type: "counselor" | "mentor"
  name: string
  date: string
  time: string
  status: "upcoming" | "completed" | "cancelled"
  mode: "video" | "phone" | "in-person"
  specialty?: string
}

export function AppointmentsList() {
  const appointments: Appointment[] = [
    {
      id: "1",
      type: "counselor",
      name: "Dr. Priya Sharma",
      date: "2024-01-17",
      time: "2:00 PM",
      status: "upcoming",
      mode: "video",
      specialty: "Anxiety & Stress Management",
    },
    {
      id: "2",
      type: "mentor",
      name: "Rahul Kumar (4th Year)",
      date: "2024-01-19",
      time: "4:30 PM",
      status: "upcoming",
      mode: "phone",
      specialty: "Academic Support",
    },
    {
      id: "3",
      type: "counselor",
      name: "Dr. Anjali Verma",
      date: "2024-01-10",
      time: "11:00 AM",
      status: "completed",
      mode: "video",
      specialty: "Depression Support",
    },
    {
      id: "4",
      type: "mentor",
      name: "Sneha Devi (3rd Year)",
      date: "2024-01-08",
      time: "3:00 PM",
      status: "completed",
      mode: "in-person",
      specialty: "Peer Support",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case "video":
        return <Video className="h-4 w-4" />
      case "phone":
        return <Phone className="h-4 w-4" />
      case "in-person":
        return <MapPin className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const upcomingAppointments = appointments.filter((apt) => apt.status === "upcoming")
  const pastAppointments = appointments.filter((apt) => apt.status === "completed")

  return (
    <div className="space-y-6">
      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Upcoming Appointments</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-600" />
                        <span className="font-medium">{appointment.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {appointment.type === "counselor" ? "Counselor" : "Peer Mentor"}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(appointment.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {getModeIcon(appointment.mode)}
                          <span className="capitalize">{appointment.mode}</span>
                        </div>
                      </div>
                      {appointment.specialty && (
                        <p className="text-sm text-gray-600">
                          <strong>Focus:</strong> {appointment.specialty}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                      <Button size="sm" variant="outline">
                        Join Session
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No upcoming appointments</p>
              <Button className="mt-4" onClick={() => (window.location.href = "/appointments")}>
                Book New Appointment
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Past Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Past Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pastAppointments.map((appointment) => (
              <div key={appointment.id} className="p-3 border rounded-lg bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-600" />
                      <span className="font-medium text-sm">{appointment.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {appointment.type === "counselor" ? "Counselor" : "Peer Mentor"}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-600">
                      <span>{new Date(appointment.date).toLocaleDateString()}</span>
                      <span>{appointment.time}</span>
                      <span className="capitalize">{appointment.mode}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(appointment.status)}>Completed</Badge>
                    <Button size="sm" variant="ghost">
                      View Notes
                    </Button>
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
