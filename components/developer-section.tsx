"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Code, Coffee, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GalaxyHover } from "./galaxy-hover"

const developers = [
  {
    name: "Alex Johnson",
    role: "Full Stack Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    bio: "Passionate about creating seamless user experiences and scalable backend systems.",
    skills: ["React", "Node.js", "Python", "AI/ML"],
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "alex@placementpro.com",
    },
  },
  {
    name: "Sarah Chen",
    role: "AI/ML Engineer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    bio: "Specializing in natural language processing and computer vision for educational technology.",
    skills: ["TensorFlow", "PyTorch", "OpenCV", "NLP"],
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "sarah@placementpro.com",
    },
  },
  {
    name: "Mike Rodriguez",
    role: "UI/UX Designer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    bio: "Creating intuitive and beautiful interfaces that make complex tasks simple and enjoyable.",
    skills: ["Figma", "Adobe XD", "Framer", "3D Design"],
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "mike@placementpro.com",
    },
  },
]

const techStack = [
  { name: "React", color: "text-blue-400", icon: "⚛️" },
  { name: "Next.js", color: "text-white", icon: "▲" },
  { name: "TypeScript", color: "text-blue-500", icon: "📘" },
  { name: "Python", color: "text-yellow-400", icon: "🐍" },
  { name: "FastAPI", color: "text-green-400", icon: "⚡" },
  { name: "OpenAI", color: "text-purple-400", icon: "🤖" },
  { name: "Socket.IO", color: "text-cyan-400", icon: "🔌" },
  { name: "Framer Motion", color: "text-pink-400", icon: "🎭" },
]

export function DeveloperSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">About PlacementPro</h2>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto mb-8">
            We're a team of passionate developers, designers, and educators dedicated to revolutionizing the placement
            preparation experience. Our mission is to democratize access to high-quality career preparation tools and
            create a supportive community for aspiring professionals.
          </p>

          <div className="flex items-center justify-center gap-2 text-gray-400">
            <span>Made with</span>
            <Heart className="w-5 h-5 text-red-500 animate-pulse" />
            <span>and lots of</span>
            <Coffee className="w-5 h-5 text-amber-500" />
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">Built With Modern Technology</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-lg px-4 py-2 flex items-center gap-2"
              >
                <span className="text-lg">{tech.icon}</span>
                <span className={`font-medium ${tech.color}`}>{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Developers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">Meet the Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {developers.map((dev, index) => (
              <GalaxyHover key={index}>
                <Card className="bg-gray-900/80 backdrop-blur-md border-gray-700 h-full">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-purple-500/30"
                    >
                      <img
                        src={dev.avatar || "/placeholder.svg"}
                        alt={dev.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    <h4 className="text-xl font-bold text-white mb-1">{dev.name}</h4>
                    <p className="text-purple-400 mb-3">{dev.role}</p>
                    <p className="text-gray-400 text-sm mb-4">{dev.bio}</p>

                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {dev.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="bg-gray-800/50 text-cyan-400 px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-center gap-3">
                      <Button size="sm" variant="ghost" className="p-2">
                        <Github className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="p-2">
                        <Linkedin className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="p-2">
                        <Mail className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </GalaxyHover>
            ))}
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <GalaxyHover>
            <Card className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 backdrop-blur-md border-purple-500/30">
              <CardContent className="p-8">
                <Code className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                  To empower every student with the tools, knowledge, and confidence needed to succeed in their
                  placement journey. We believe that with the right preparation and support, anyone can achieve their
                  career goals.
                </p>
              </CardContent>
            </Card>
          </GalaxyHover>
        </motion.div>
      </div>
    </section>
  )
}
