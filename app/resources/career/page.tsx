import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, ExternalLink, Briefcase, TrendingUp, Users, Building } from "lucide-react"

export default function CareerResourcesPage() {
  const careerOpportunities = [
    {
      title: "Government Sector Jobs",
      description: "Explore opportunities in J&K administration, police, education, and healthcare sectors",
      sectors: ["Administration", "Police", "Education", "Healthcare"],
      location: "Jammu & Kashmir",
      growth: "High",
      icon: Building,
    },
    {
      title: "Tourism & Hospitality",
      description: "Growing opportunities in hotels, travel agencies, adventure tourism, and cultural tourism",
      sectors: ["Hotels", "Travel", "Adventure Tourism", "Cultural Heritage"],
      location: "Srinagar, Gulmarg, Pahalgam",
      growth: "Very High",
      icon: TrendingUp,
    },
    {
      title: "Technology & IT",
      description: "Emerging tech hub with opportunities in software development, digital marketing, and e-commerce",
      sectors: ["Software Development", "Digital Marketing", "E-commerce", "Startups"],
      location: "Srinagar, Jammu",
      growth: "High",
      icon: Briefcase,
    },
    {
      title: "Agriculture & Horticulture",
      description: "Opportunities in organic farming, food processing, and agricultural technology",
      sectors: ["Organic Farming", "Food Processing", "AgriTech", "Export"],
      location: "Kashmir Valley, Jammu",
      growth: "Moderate",
      icon: Users,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-balance mb-4">
              Career Opportunities in <span className="text-primary">Jammu & Kashmir</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
              Discover growing career opportunities and emerging sectors in Jammu and Kashmir. Build your future in your
              home state with these promising career paths.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {careerOpportunities.map((opportunity, index) => {
              const Icon = opportunity.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Icon className="h-8 w-8 text-primary" />
                      <Badge variant={opportunity.growth === "Very High" ? "default" : "secondary"}>
                        {opportunity.growth} Growth
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{opportunity.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{opportunity.description}</p>

                    <div>
                      <p className="text-sm font-medium mb-2">Key Sectors:</p>
                      <div className="flex flex-wrap gap-1">
                        {opportunity.sectors.map((sector) => (
                          <Badge key={sector} variant="outline" className="text-xs">
                            {sector}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{opportunity.location}</span>
                    </div>

                    <Button className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Explore Opportunities
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Additional Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Career Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 bg-transparent">
                  <div className="text-left">
                    <div className="font-medium">J&K Jobs Portal</div>
                    <div className="text-sm text-muted-foreground">Official government job listings</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 bg-transparent">
                  <div className="text-left">
                    <div className="font-medium">Skill Development Programs</div>
                    <div className="text-sm text-muted-foreground">Training and certification courses</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 bg-transparent">
                  <div className="text-left">
                    <div className="font-medium">Entrepreneurship Support</div>
                    <div className="text-sm text-muted-foreground">Startup incubators and funding</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
