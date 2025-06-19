import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Ace Your Placement?</h2>
        <p className="text-xl text-blue-100 mb-8">
          Join thousands of students who have successfully landed their dream jobs with PlacementPro.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
            <Link href="/signup">
              Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 text-white border-white hover:bg-white hover:text-blue-600"
            asChild
          >
            <Link href="/contact">Contact Sales</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
