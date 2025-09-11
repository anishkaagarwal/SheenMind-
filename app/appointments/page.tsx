import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CounselorGrid } from "@/components/appointments/counselor-grid"
import { AppointmentFilters } from "@/components/appointments/appointment-filters"

export default function AppointmentsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-balance mb-4">
              Book an <span className="text-primary">Appointment</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
              Connect with qualified mental health professionals who understand the unique challenges faced by students
              in Jammu and Kashmir. Schedule a confidential session at your convenience.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <AppointmentFilters />
            </div>
            <div className="lg:col-span-3">
              <CounselorGrid />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
