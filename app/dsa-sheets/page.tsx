"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Code,
  BookOpen,
  Star,
  Zap,
  Trophy,
  Target,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { InteractiveCard } from "@/components/interactive-card";
import { GalaxyHover } from "@/components/galaxy-hover";
import { AuthGuard } from "@/components/auth-guard";

const dsaSheets = [
  {
    id: 1,
    title: "Striver's SDE Sheet",
    description: "180 most important coding interview questions",
    problems: 180,
    completed: 45,
    difficulty: "Mixed",
    category: "Interview Prep",
    rating: 4.9,
    topics: ["Arrays", "Strings", "Trees", "Graphs", "DP"],
    icon: <Target className="h-5 w-5" />,
    glowColor: "purple" as const,
  },
  {
    id: 2,
    title: "Love Babbar 450",
    description: "450 DSA questions for complete preparation",
    problems: 450,
    completed: 120,
    difficulty: "Mixed",
    category: "Complete Prep",
    rating: 4.8,
    topics: ["Arrays", "Matrix", "Strings", "Trees", "Graphs"],
    icon: <Trophy className="h-5 w-5" />,
    glowColor: "cyan" as const,
  },
  {
    id: 3,
    title: "Blind 75",
    description: "75 essential coding interview questions",
    problems: 75,
    completed: 25,
    difficulty: "Medium-Hard",
    category: "Core Problems",
    rating: 4.9,
    topics: ["Arrays", "Trees", "Graphs", "DP", "Strings"],
    icon: <Zap className="h-5 w-5" />,
    glowColor: "yellow" as const,
  },
];

export default function DSASheetsPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen pt-20 px-4 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-green-900 to-teal-900/40" />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-emerald-400/40 rounded-full"
              animate={{
                x: [0, Math.random() * 100, Math.random() * -100, 0],
                y: [0, Math.random() * -100, Math.random() * 100, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Hero Section */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center justify-center mb-6"
              >
                <Sparkles className="h-8 w-8 text-emerald-400 mr-3" />
                <span className="text-emerald-400 font-medium text-lg">
                  Algorithm Galaxy
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              >
                <span className="text-white">DSA Practice</span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400">
                  Sheets
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
              >
                Master Data Structures and Algorithms with curated question
                sets. Navigate through coding challenges and unlock your
                programming potential.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12"
              >
                {[
                  {
                    number: "700+",
                    label: "Problems",
                    color: "from-emerald-400 to-emerald-600",
                  },
                  {
                    number: "190",
                    label: "Completed",
                    color: "from-green-400 to-green-600",
                  },
                  {
                    number: "27%",
                    label: "Progress",
                    color: "from-teal-400 to-teal-600",
                  },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div
                      className={`text-3xl font-bold bg-gradient-to-r ${stat.color} text-transparent bg-clip-text`}
                    >
                      {stat.number}
                    </div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* DSA Sheets Grid */}
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {dsaSheets.map((sheet, index) => (
                <motion.div
                  key={sheet.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.15, duration: 0.6 }}
                >
                  <GalaxyHover>
                    <InteractiveCard
                      title={sheet.title}
                      description={sheet.description}
                      icon={sheet.icon}
                      glowColor={sheet.glowColor}
                    >
                      <div className="space-y-4">
                        {/* Progress Section */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-400">
                            Progress
                          </span>
                          <span className="text-sm font-bold text-white bg-gradient-to-r from-emerald-400 to-green-400 text-transparent bg-clip-text">
                            {sheet.completed}/{sheet.problems}
                          </span>
                        </div>

                        <div className="relative">
                          <Progress
                            value={(sheet.completed / sheet.problems) * 100}
                            className="h-2 bg-gray-800"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full opacity-30 blur-sm" />
                        </div>

                        {/* Topics */}
                        <div className="flex flex-wrap gap-2">
                          {sheet.topics.map((topic, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="rounded-full px-3 py-1 text-xs bg-gray-800/60 text-gray-300 border border-gray-700 hover:border-emerald-500/50 transition-all duration-200"
                            >
                              {topic}
                            </Badge>
                          ))}
                        </div>

                        {/* Rating and Difficulty */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-yellow-400 font-medium">
                            <Star className="h-4 w-4 mr-1 fill-current" />
                            <span className="text-white">{sheet.rating}</span>
                          </div>
                          <Badge
                            variant="outline"
                            className="text-xs px-3 py-1 border-cyan-500/50 text-cyan-300 bg-cyan-500/10"
                          >
                            {sheet.difficulty}
                          </Badge>
                        </div>

                        {/* CTA Button */}
                        <Button className="w-full mt-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white border-0 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Start Practice
                        </Button>
                      </div>
                    </InteractiveCard>
                  </GalaxyHover>
                </motion.div>
              ))}
            </div>

            {/* Additional CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-16 text-center"
            >
              <div className="bg-gradient-to-r from-emerald-600/20 to-green-600/20 backdrop-blur-md border border-gray-700 rounded-2xl p-8 max-w-2xl mx-auto">
                <Code className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Ready to Level Up?
                </h3>
                <p className="text-gray-300 mb-6">
                  Join thousands of developers mastering algorithms and landing
                  their dream jobs.
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 shadow-lg shadow-green-500/25"
                >
                  View All Sheets
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AuthGuard>
  );
}
