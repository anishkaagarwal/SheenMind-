import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Shield, Target, Award, MapPin } from "lucide-react"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Project Director",
      department: "Department of Student Welfare, J&K",
      expertise: "Mental Health Policy & Implementation",
    },
    {
      name: "Dr. Priya Sharma",
      role: "Clinical Advisor",
      department: "Government Medical College, Jammu",
      expertise: "Clinical Psychology & Student Counseling",
    },
    {
      name: "Prof. Amit Singh",
      role: "Technical Lead",
      department: "NIT Srinagar",
      expertise: "Digital Health Solutions & AI",
    },
    {
      name: "Ms. Kavya Devi",
      role: "Community Outreach Coordinator",
      department: "University of Kashmir",
      expertise: "Peer Support & Student Engagement",
    },
  ]

  const achievements = [
    { number: "15+", label: "Partner Colleges", icon: MapPin },
    { number: "500+", label: "Students Supported", icon: Users },
    { number: "50+", label: "Trained Mentors", icon: Heart },
    { number: "24/7", label: "Support Available", icon: Shield },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-balance mb-4">
              About <span className="text-primary">MindCare J&K</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
              A pioneering digital mental health initiative by the Government of Jammu and Kashmir, designed to support
              the psychological wellbeing of college students across the region.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-6 w-6 text-primary" />
                  <span>Our Mission</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To provide accessible, culturally sensitive, and stigma-free mental health support to college students
                  in Jammu and Kashmir through innovative digital solutions, peer support networks, and professional
                  counseling services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-6 w-6 text-primary" />
                  <span>Our Vision</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To create a mentally healthy generation of students who can thrive academically and personally,
                  contributing to the development of Jammu and Kashmir while maintaining their psychological wellbeing.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Key Features */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Why MindCare J&K?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Culturally Sensitive</h3>
                  <p className="text-sm text-muted-foreground">
                    Designed specifically for the cultural context of Jammu and Kashmir, with support in local languages
                    and understanding of regional challenges.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Peer-to-Peer Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect with trained student mentors who understand your journey and can provide relatable guidance
                    and support.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Professional Care</h3>
                  <p className="text-sm text-muted-foreground">
                    Access to qualified mental health professionals who specialize in student counseling and therapy.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Achievements */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon
                return (
                  <Card key={index} className="text-center">
                    <CardContent className="pt-6">
                      <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="text-3xl font-bold text-primary mb-1">{achievement.number}</div>
                      <p className="text-sm text-muted-foreground">{achievement.label}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* Team */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">{member.name}</h3>
                      <Badge variant="secondary">{member.role}</Badge>
                      <p className="text-sm text-muted-foreground">{member.department}</p>
                      <p className="text-sm">{member.expertise}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Government Initiative */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-semibold">A Government of J&K Initiative</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  MindCare J&K is developed under the Digital Psychological Intervention System project, supported by
                  the Department of Student Welfare, Government of Jammu and Kashmir, in collaboration with leading
                  educational institutions and mental health professionals.
                </p>
                <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
                  <span>• Department of Student Welfare</span>
                  <span>• Department of Psychology</span>
                  <span>• Internal Quality Assurance Cell (IQAC)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
