import { Hero } from "@/components/hero"
import { FeaturesShowcase } from "@/components/features-showcase"
import { DeveloperSection } from "@/components/developer-section"
import { Stats } from "@/components/stats"
import { Testimonials } from "@/components/testimonials"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturesShowcase />
      <Stats />
      <Testimonials />
      <DeveloperSection />
      <CTA />
      <Footer />
    </main>
  )
}
