import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MentorGrid } from "@/components/peer-support/mentor-grid"
import { MentorFilters } from "@/components/peer-support/mentor-filters"

export default function PeerSupportPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-balance mb-4">
              Connect with <span className="text-primary">Peer Mentors</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
              Our trained student mentors are here to support you through your academic and personal challenges. Find
              someone who understands your journey and can offer guidance from experience.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <MentorFilters />
            </div>
            <div className="lg:col-span-3">
              <MentorGrid />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
