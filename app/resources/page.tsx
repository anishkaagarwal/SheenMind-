import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ResourceCategories } from "@/components/resources/resource-categories"
import { FeaturedResources } from "@/components/resources/featured-resources"

export default function ResourcesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-balance mb-4">
              Resource <span className="text-primary">Hub</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
              Discover a comprehensive collection of mental health resources, career opportunities, and wellness tools
              specifically curated for students in Jammu and Kashmir.
            </p>
          </div>

          <FeaturedResources />
          <ResourceCategories />
        </div>
      </main>
      <Footer />
    </div>
  )
}
