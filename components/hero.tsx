"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles } from "lucide-react"
import Link from "next/link"
import { ScrollVelocity } from "./scroll-velocity"
import { motion } from "framer-motion"

export function Hero() {
  const scrollTexts = ["AI POWERED PLACEMENT SOLUTIONS", "CAREER SUCCESS GUARANTEED", "DREAM JOB AWAITS YOU"]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background text */}
      <div className="absolute inset-0 opacity-10">
        <ScrollVelocity
          texts={scrollTexts}
          velocity={50}
          className="text-purple-400"
          parallaxStyle={{ marginBottom: "2rem" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-8 w-8 text-purple-400 mr-3" />
            <span className="text-purple-400 font-medium">Welcome to the Future of Placement</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Your Complete{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              Placement Galaxy
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Navigate through the cosmos of career opportunities with AI-powered tools, community support, and
            comprehensive resources designed for the next generation of professionals.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button
              size="lg"
              className="text-lg px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25"
              asChild
            >
              <Link href="/signup">
                Launch Your Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
              asChild
            >
              <Link href="/demo">
                <Play className="mr-2 h-5 w-5" /> Explore Demo
              </Link>
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { icon: "🎯", label: "AI Speech Analysis" },
              { icon: "📄", label: "Smart PDF Tools" },
              { icon: "👥", label: "Tech Community" },
              { icon: "💼", label: "Job Portal" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                className="flex flex-col items-center p-6 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300"
              >
                <span className="text-3xl mb-3">{feature.icon}</span>
                <span className="text-sm font-medium text-gray-300">{feature.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
