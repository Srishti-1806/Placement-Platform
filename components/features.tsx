import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Mic,
  Youtube,
  FileText,
  Users,
  FileIcon as FileUser,
  Calculator,
  Code,
  Building,
  MapPin,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Mic,
    title: "AI Speech & Gesture Analyzer",
    description:
      "Upload videos or go live to get detailed analysis of your speech patterns, word fillers, modulation, and body language.",
    href: "/speech-analyzer",
    color: "text-blue-600",
  },
  {
    icon: Youtube,
    title: "YouTube to PDF Converter",
    description: "Convert any YouTube video into a comprehensive PDF document for easy reading and note-taking.",
    href: "/youtube-converter",
    color: "text-red-600",
  },
  {
    icon: FileText,
    title: "PDF Summary Maker",
    description: "Upload any PDF and get an intelligent summary of its contents powered by AI.",
    href: "/pdf-summary",
    color: "text-green-600",
  },
  {
    icon: Users,
    title: "Tech Community",
    description:
      "Connect with peers, share experiences, and get real-time help through our interactive community platform.",
    href: "/community",
    color: "text-purple-600",
  },
  {
    icon: FileUser,
    title: "Resume Builder",
    description:
      "Create professional resumes with our collection of ATS-friendly templates and AI-powered suggestions.",
    href: "/resume-builder",
    color: "text-indigo-600",
  },
  {
    icon: Calculator,
    title: "ATS Calculator",
    description: "Check how well your resume performs against Applicant Tracking Systems with detailed scoring.",
    href: "/ats-calculator",
    color: "text-orange-600",
  },
  {
    icon: Code,
    title: "DSA Sheets",
    description: "Comprehensive Data Structures and Algorithms practice sheets curated for placement preparation.",
    href: "/dsa-sheets",
    color: "text-cyan-600",
  },
  {
    icon: Building,
    title: "Company Materials",
    description: "Access company-specific placement materials, previous year questions, and interview experiences.",
    href: "/company-materials",
    color: "text-pink-600",
  },
  {
    icon: MapPin,
    title: "Regional Job Vacancies",
    description:
      "Find job opportunities in your region with detailed job profiles, requirements, and application links.",
    href: "/vacancies",
    color: "text-emerald-600",
  },
]

export function Features() {
  return (
    <section className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything You Need for Placement Success</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From AI-powered analysis to community support, we've got all the tools to help you land your dream job.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-shadow duration-300 bg-gray-900/80 border-gray-700"
            >
              <CardHeader>
                <div
                  className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                <CardDescription className="text-gray-600">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="group/btn p-0 h-auto font-medium" asChild>
                  <Link href={feature.href}>
                    Try it now
                    <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
