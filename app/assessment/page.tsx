import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AssessmentOverview } from "@/components/assessment/assessment-overview"

export default function AssessmentPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-balance mb-4">
              Mental Health <span className="text-primary">Assessment</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
              Take validated psychological assessments to better understand your mental wellness. These scientifically
              backed tools help identify areas where you might benefit from support.
            </p>
          </div>

          <AssessmentOverview />
        </div>
      </main>
      <Footer />
    </div>
  )
}
