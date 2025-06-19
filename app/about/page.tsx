"use client"

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
  Brain,
  Target,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const features = [
  {
    icon: Mic,
    title: "AI Speech & Gesture Analyzer",
    description: "Advanced AI-powered analysis using computer vision and natural language processing",
    details: [
      "Real-time speech pattern analysis",
      "Body language and posture detection",
      "Filler word identification",
      "Voice modulation assessment",
      "Comprehensive PDF reports",
    ],
    tech: ["OpenCV", "MediaPipe", "Whisper AI", "OpenAI GPT"],
  },
  {
    icon: Youtube,
    title: "YouTube to PDF Converter",
    description: "Convert any YouTube video content into structured, readable PDF documents",
    details: [
      "Automatic transcript extraction",
      "Content summarization",
      "Formatted PDF generation",
      "Timestamp preservation",
      "Multi-language support",
    ],
    tech: ["YouTube API", "FFmpeg", "PDF Generation"],
  },
  {
    icon: FileText,
    title: "PDF Summary Maker",
    description: "Intelligent document analysis and summarization using advanced AI",
    details: [
      "Key point extraction",
      "Chapter-wise summaries",
      "Important concept highlighting",
      "Custom summary lengths",
      "Multiple output formats",
    ],
    tech: ["NLP Models", "Text Processing", "AI Summarization"],
  },
  {
    icon: Users,
    title: "Tech Community Platform",
    description: "Interactive community for peer learning and collaboration",
    details: [
      "Real-time chat and discussions",
      "Peer-to-peer help system",
      "Experience sharing",
      "Mentorship programs",
      "Study groups and events",
    ],
    tech: ["WebSocket", "Real-time Database", "Community Features"],
  },
  {
    icon: FileUser,
    title: "Professional Resume Builder",
    description: "ATS-optimized resume creation with AI-powered suggestions",
    details: [
      "Multiple professional templates",
      "ATS compatibility checking",
      "AI-powered content suggestions",
      "Real-time preview",
      "Export in multiple formats",
    ],
    tech: ["Template Engine", "ATS Optimization", "AI Content Generation"],
  },
  {
    icon: Calculator,
    title: "ATS Score Calculator",
    description: "Comprehensive resume analysis against Applicant Tracking Systems",
    details: [
      "Keyword optimization analysis",
      "Format compatibility check",
      "Industry-specific scoring",
      "Improvement recommendations",
      "Competitive benchmarking",
    ],
    tech: ["ATS Algorithms", "Keyword Analysis", "Scoring Engine"],
  },
  {
    icon: Code,
    title: "DSA Practice Sheets",
    description: "Curated Data Structures and Algorithms practice materials",
    details: [
      "Company-specific question sets",
      "Difficulty-based categorization",
      "Solution explanations",
      "Progress tracking",
      "Performance analytics",
    ],
    tech: ["Algorithm Database", "Progress Tracking", "Analytics"],
  },
  {
    icon: Building,
    title: "Company Materials Hub",
    description: "Comprehensive database of company-specific placement resources",
    details: [
      "Previous year questions",
      "Interview experiences",
      "Company culture insights",
      "Salary information",
      "Application deadlines",
    ],
    tech: ["Data Aggregation", "Content Management", "Search Engine"],
  },
  {
    icon: MapPin,
    title: "Regional Job Portal",
    description: "Location-based job opportunities with detailed insights",
    details: [
      "Region-specific job listings",
      "Company profiles",
      "Application tracking",
      "Salary comparisons",
      "Career path guidance",
    ],
    tech: ["Job APIs", "Location Services", "Data Analytics"],
  },
]

const stats = [
  { number: "50K+", label: "Students Helped", icon: Users },
  { number: "95%", label: "Success Rate", icon: Target },
  { number: "500+", label: "Partner Companies", icon: Building },
  { number: "24/7", label: "AI Support", icon: Brain },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              PlacementPro
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We're revolutionizing the placement preparation landscape with cutting-edge AI technology, comprehensive
            resources, and a supportive community ecosystem designed to accelerate your career success.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-md">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Brain className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">AI-Powered</h3>
                  <p className="text-gray-400">
                    Leveraging advanced artificial intelligence to provide personalized insights and recommendations.
                  </p>
                </div>
                <div className="text-center">
                  <Zap className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Lightning Fast</h3>
                  <p className="text-gray-400">
                    Get instant analysis, feedback, and results to accelerate your preparation timeline.
                  </p>
                </div>
                <div className="text-center">
                  <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Secure & Private</h3>
                  <p className="text-gray-400">
                    Your data is protected with enterprise-grade security and privacy measures.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Features Deep Dive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Comprehensive Feature Suite</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Explore our advanced tools and technologies designed to give you a competitive edge in your placement
              journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-gray-800/50 border-gray-700 backdrop-blur-md hover:bg-gray-800/70 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                      <CardDescription className="text-gray-400 mt-1">{feature.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {feature.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center text-gray-300 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {feature.tech.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/20">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Career?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of students who have successfully leveraged our platform to secure their dream
                placements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="text-lg px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  asChild
                >
                  <Link href="/signup">
                    Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-4 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                  asChild
                >
                  <Link href="/features">Explore Features</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
