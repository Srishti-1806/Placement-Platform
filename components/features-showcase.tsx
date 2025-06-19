"use client"

import { motion } from "framer-motion"
import { Brain, Users, FileText, BarChart3, MessageSquare, Briefcase, BookOpen, Award, Sparkles } from "lucide-react"
import { GalaxyHover } from "./galaxy-hover"
import { useSound } from "@/hooks/use-sound"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced speech and gesture analysis using cutting-edge AI technology",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with peers, share experiences, and grow together",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description: "Create ATS-optimized resumes with professional templates",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Track your progress with detailed analytics and insights",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: MessageSquare,
    title: "Real-time Chat",
    description: "Instant messaging with study groups and mentors",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Briefcase,
    title: "Job Portal",
    description: "Access exclusive job opportunities from top companies",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: BookOpen,
    title: "Learning Resources",
    description: "Comprehensive study materials and interview preparation",
    color: "from-teal-500 to-cyan-500",
  },
  {
    icon: Award,
    title: "Certification",
    description: "Earn certificates to showcase your skills and achievements",
    color: "from-amber-500 to-yellow-500",
  },
]

export function FeaturesShowcase() {
  const { playSound } = useSound()

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Everything You Need for Placement Success</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From AI-powered analysis to community support, we've got all the tools to help you land your dream job.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <GalaxyHover className="h-full">
                <motion.div
                  className="bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-xl p-6 h-full cursor-pointer group"
                  whileHover={{ scale: 1.05, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => playSound("hover")}
                  onClick={() => playSound("click")}
                >
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-full h-full text-white" />
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>

                  {/* Floating sparkles on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${10 + (i % 2) * 70}%`,
                        }}
                        animate={{
                          y: [-5, -15, -5],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.2,
                        }}
                      >
                        <Sparkles className="w-3 h-3 text-purple-400" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </GalaxyHover>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
