import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Calendar, Smartphone, Wifi, MessageCircle, LayoutDashboard } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            <span className="text-primary">SheenMind</span> - Your Mental Health{" "}
            <span className="text-primary">Companion</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto mb-4">
            Government of J&K's official mental health platform for college students. Access TeleManas support, peer
            mentoring, professional counseling, and wellness tools - even with low bandwidth connectivity.
          </p>
          <div className="flex items-center justify-center space-x-4 mb-8 text-sm text-blue-700">
            <div className="flex items-center space-x-1">
              <Smartphone className="h-4 w-4" />
              <span>SMS Support Available</span>
            </div>
            <div className="flex items-center space-x-1">
              <Wifi className="h-4 w-4" />
              <span>Works Offline</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>24/7 AI Support</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/dashboard">Access Dashboard</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/assessment">Take Assessment</Link>
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <LayoutDashboard className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Personal Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                Track mood, journal entries, appointments, and download wellness reports
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Peer Support</h3>
              <p className="text-sm text-muted-foreground">
                Connect with trained student mentors who understand J&K student challenges
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">TeleManas Integration</h3>
              <p className="text-sm text-muted-foreground">
                Direct access to government mental health services and crisis support
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Smartphone className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Low Bandwidth Ready</h3>
              <p className="text-sm text-muted-foreground">
                SMS reminders, offline features, and support for remote J&K areas
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-blue-600 text-white rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold mb-4">24/7 Crisis Support Available</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong>TeleManas (Govt)</strong>
              <br />📞 14416 (Toll Free)
            </div>
            <div>
              <strong>Suicide Prevention</strong>
              <br />📞 9152987821
            </div>
            <div>
              <strong>KIRAN Helpline</strong>
              <br />📞 1800-599-0019
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
