import { Heart, Mail, Phone, MapPin, MessageCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">MindCare J&K</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Supporting the mental health and wellbeing of college students across Jammu and Kashmir.
            </p>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-red-600">Crisis Support:</p>
              <p className="text-xs text-muted-foreground">National Helpline: 9152987821</p>
              <p className="text-xs text-muted-foreground">KIRAN Helpline: 1800-599-0019</p>
              <p className="text-xs text-muted-foreground">Emergency: 112</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/peer-support" className="text-muted-foreground hover:text-primary">
                  Peer Support
                </Link>
              </li>
              <li>
                <Link href="/appointments" className="text-muted-foreground hover:text-primary">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link href="/assessment" className="text-muted-foreground hover:text-primary">
                  Take Assessment
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-muted-foreground hover:text-primary">
                  Resource Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/resources/career" className="text-muted-foreground hover:text-primary">
                  Career Opportunities
                </Link>
              </li>
              <li>
                <Link href="/resources/meditation" className="text-muted-foreground hover:text-primary">
                  Meditation & Wellness
                </Link>
              </li>
              <li>
                <Link href="/resources/breathing" className="text-muted-foreground hover:text-primary">
                  Breathing Exercises
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm mb-4">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">+91-1234567890</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">support@mindcarejk.org</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Jammu & Kashmir, India</span>
              </div>
            </div>
            <Button size="sm" className="w-full">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat with AI Support
            </Button>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 MindCare J&K. All rights reserved. | A Government of J&K Initiative</p>
        </div>
      </div>
    </footer>
  )
}
