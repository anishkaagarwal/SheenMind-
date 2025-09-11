"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CreditCard, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Counselor {
  id: string
  name: string
  avatar: string
  title: string
  specialties: string[]
  sessionFee: number
  availableSlots: string[]
}

interface BookingDialogProps {
  counselor: Counselor
  isOpen: boolean
  onClose: () => void
}

export function BookingDialog({ counselor, isOpen, onClose }: BookingDialogProps) {
  const [step, setStep] = useState<"details" | "payment" | "confirmation">("details")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    timeSlot: "",
    sessionType: "",
    concerns: "",
    previousTherapy: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step === "details") {
      setStep("payment")
    } else if (step === "payment") {
      setStep("confirmation")
    }
  }

  const handleBooking = () => {
    // Here you would integrate with actual booking system
    console.log("Booking confirmed:", { counselor: counselor.id, ...formData })
    onClose()
  }

  const isFormValid = formData.name && formData.email && formData.phone && formData.date && formData.timeSlot

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {step === "details" && "Book Appointment"}
            {step === "payment" && "Payment Details"}
            {step === "confirmation" && "Booking Confirmed"}
          </DialogTitle>
        </DialogHeader>

        {step === "details" && (
          <div className="space-y-6">
            {/* Counselor Info */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={counselor.avatar || "/placeholder.svg"} alt={counselor.name} />
                    <AvatarFallback>
                      {counselor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{counselor.name}</h3>
                    <p className="text-primary">{counselor.title}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {counselor.specialties.slice(0, 2).map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Form */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Preferred Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timeSlot">Time Slot *</Label>
                <Select value={formData.timeSlot} onValueChange={(value) => handleInputChange("timeSlot", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {counselor.availableSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sessionType">Session Type</Label>
                <Select value={formData.sessionType} onValueChange={(value) => handleInputChange("sessionType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select session type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in-person">In-Person</SelectItem>
                    <SelectItem value="video">Video Call</SelectItem>
                    <SelectItem value="phone">Phone Call</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="concerns">What would you like to discuss? (Optional)</Label>
              <Textarea
                id="concerns"
                value={formData.concerns}
                onChange={(e) => handleInputChange("concerns", e.target.value)}
                placeholder="Briefly describe what you'd like to work on..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="previousTherapy">Have you had therapy before? (Optional)</Label>
              <Select
                value={formData.previousTherapy}
                onValueChange={(value) => handleInputChange("previousTherapy", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes, I have</SelectItem>
                  <SelectItem value="no">No, this is my first time</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleNext} disabled={!isFormValid}>
                Continue to Payment
              </Button>
            </div>
          </div>
        )}

        {step === "payment" && (
          <div className="space-y-6">
            {/* Booking Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Counselor:</span>
                  <span className="font-medium">{counselor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date & Time:</span>
                  <span className="font-medium">
                    {formData.date} at {formData.timeSlot}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Session Type:</span>
                  <span className="font-medium capitalize">{formData.sessionType || "In-Person"}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t pt-3">
                  <span>Total Amount:</span>
                  <span className="text-primary">₹{counselor.sessionFee}</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Options */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
                    <div className="text-left">
                      <div className="font-medium">UPI Payment</div>
                      <div className="text-sm text-muted-foreground">Pay using Google Pay, PhonePe, Paytm</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
                    <div className="text-left">
                      <div className="font-medium">Credit/Debit Card</div>
                      <div className="text-sm text-muted-foreground">Visa, Mastercard, RuPay accepted</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
                    <div className="text-left">
                      <div className="font-medium">Net Banking</div>
                      <div className="text-sm text-muted-foreground">All major banks supported</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep("details")}>
                Back
              </Button>
              <Button onClick={handleNext}>Proceed to Pay ₹{counselor.sessionFee}</Button>
            </div>
          </div>
        )}

        {step === "confirmation" && (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-green-600 mb-2">Appointment Confirmed!</h3>
              <p className="text-muted-foreground">
                Your appointment with {counselor.name} has been successfully booked.
              </p>
            </div>

            <Card>
              <CardContent className="pt-6 space-y-3">
                <div className="flex justify-between">
                  <span>Appointment ID:</span>
                  <span className="font-mono">#APT{Date.now().toString().slice(-6)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date & Time:</span>
                  <span className="font-medium">
                    {formData.date} at {formData.timeSlot}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Session Type:</span>
                  <span className="font-medium capitalize">{formData.sessionType || "In-Person"}</span>
                </div>
              </CardContent>
            </Card>

            <div className="bg-muted p-4 rounded-lg text-sm">
              <p className="font-medium mb-2">What's Next?</p>
              <ul className="text-left space-y-1 text-muted-foreground">
                <li>• You'll receive a confirmation email with appointment details</li>
                <li>• A reminder will be sent 24 hours before your session</li>
                <li>• You can reschedule or cancel up to 4 hours before the appointment</li>
                <li>• For video sessions, you'll receive a meeting link via email</li>
              </ul>
            </div>

            <Button onClick={handleBooking} className="w-full">
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
