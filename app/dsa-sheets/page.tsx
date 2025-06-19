"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Code, BookOpen, Star } from "lucide-react"
import { motion } from "framer-motion"
import { InteractiveCard } from "@/components/interactive-card"
import { GalaxyHover } from "@/components/galaxy-hover"

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
  },
]

export default function DSASheetsPage() {
  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">DSA Practice Sheets</h1>
            <p className="text-xl text-gray-600">Master Data Structures and Algorithms with curated problem sets</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dsaSheets.map((sheet, index) => (
              <motion.div
                key={sheet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GalaxyHover>
                  <InteractiveCard
                    title={sheet.title}
                    description={sheet.description}
                    icon={<Code className="h-5 w-5 text-blue-400" />}
                    glowColor="blue"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm font-medium">
                          {sheet.completed}/{sheet.problems}
                        </span>
                      </div>
                      <Progress value={(sheet.completed / sheet.problems) * 100} />

                      <div className="flex flex-wrap gap-2">
                        {sheet.topics.map((topic, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          {sheet.rating}
                        </div>
                        <Badge variant="outline">{sheet.difficulty}</Badge>
                      </div>

                      <Button className="w-full">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Start Practice
                      </Button>
                    </div>
                  </InteractiveCard>
                </GalaxyHover>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
