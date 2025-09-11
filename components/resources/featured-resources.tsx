import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Download, Clock } from "lucide-react"

export function FeaturedResources() {
  const featuredResources = [
    {
      id: "breathing-exercise",
      title: "Interactive Breathing Exercise",
      description: "Guided 4-7-8 breathing technique to reduce anxiety and promote relaxation",
      type: "Interactive Tool",
      duration: "5 minutes",
      category: "Wellness",
      action: "Try Now",
      icon: Play,
    },
    {
      id: "career-guide-jk",
      title: "Career Opportunities in J&K 2024",
      description: "Comprehensive guide to emerging job markets and opportunities in Jammu and Kashmir",
      type: "PDF Guide",
      duration: "15 min read",
      category: "Career",
      action: "Download",
      icon: Download,
    },
    {
      id: "meditation-series",
      title: "Mindfulness for Students",
      description: "10-part meditation series designed specifically for college students dealing with academic stress",
      type: "Audio Series",
      duration: "10-20 min each",
      category: "Meditation",
      action: "Listen",
      icon: Play,
    },
  ]

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">Featured Resources</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {featuredResources.map((resource) => {
          const Icon = resource.icon
          return (
            <Card key={resource.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge variant="secondary">{resource.category}</Badge>
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{resource.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{resource.type}</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{resource.duration}</span>
                  </div>
                </div>
                <Button className="w-full">
                  <Icon className="h-4 w-4 mr-2" />
                  {resource.action}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
