import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer at Google",
    content: "The speech analyzer helped me identify and fix my presentation issues. Got placed in my dream company!",
    rating: 5,
  },
  {
    name: "Rahul Kumar",
    role: "Data Scientist at Microsoft",
    content: "The DSA sheets and company-specific materials were incredibly helpful. Highly recommend!",
    rating: 5,
  },
  {
    name: "Anita Patel",
    role: "Product Manager at Amazon",
    content: "The community support and resume builder made all the difference in my placement journey.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Success Stories</h2>
          <p className="text-xl text-gray-300">See how PlacementPro helped students land their dream jobs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg bg-gray-900/80 border-gray-700">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
