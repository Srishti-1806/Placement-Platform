"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const features = [
  {
    icon: Mic,
    title: "AI Speech & Gesture Analyzer",
    description:
      "Advanced AI-powered analysis using computer vision and natural language processing",
    details: [
      "Real-time speech pattern analysis",
      "Body language and posture detection",
      "Filler word identification",
      "Voice modulation assessment",
      "Comprehensive PDF reports",
    ],
    tech: ["OpenCV", "MediaPipe", "Whisper AI", "Groq"],
  },
  {
    icon: Youtube,
    title: "YouTube to PDF Converter",
    description:
      "Convert any YouTube video content into structured, readable PDF documents",
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
    description:
      "Intelligent document analysis and summarization using advanced AI",
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
    description:
      "Comprehensive resume analysis against Applicant Tracking Systems",
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
    description:
      "Comprehensive database of company-specific placement resources",
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
];

const stats = [
  { number: "50K+", label: "Students Helped", icon: Users },
  { number: "95%", label: "Success Rate", icon: Target },
  { number: "500+", label: "Partner Companies", icon: Building },
  { number: "24/7", label: "AI Support", icon: Brain },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 relative overflow-hidden text-white">
      {/* Ultra-vibrant animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-900/60 via-transparent to-green-900/60"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-orange-900/40 via-transparent to-purple-900/40"></div>

      {/* Dynamic floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.8, 1],
              rotate: [0, 360],
              opacity: [0.2, 0.8, 0.2],
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
            }}
            transition={{
              duration: 10 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
            className={`absolute w-32 h-32 rounded-full blur-xl ${
              [
                "bg-gradient-to-r from-cyan-400/30 to-blue-600/30",
                "bg-gradient-to-r from-pink-400/30 to-purple-600/30",
                "bg-gradient-to-r from-green-400/30 to-emerald-600/30",
                "bg-gradient-to-r from-yellow-400/30 to-orange-600/30",
                "bg-gradient-to-r from-red-400/30 to-pink-600/30",
                "bg-gradient-to-r from-violet-400/30 to-purple-600/30",
                "bg-gradient-to-r from-indigo-400/30 to-blue-600/30",
                "bg-gradient-to-r from-teal-400/30 to-cyan-600/30",
              ][i % 8]
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[linear-gradient(45deg,transparent_24%,rgba(68,68,68,.5)_25%,rgba(68,68,68,.5)_26%,transparent_27%,transparent_74%,rgba(68,68,68,.5)_75%,rgba(68,68,68,.5)_76%,transparent_77%,transparent),linear-gradient(-45deg,transparent_24%,rgba(68,68,68,.5)_25%,rgba(68,68,68,.5)_26%,transparent_27%,transparent_74%,rgba(68,68,68,.5)_75%,rgba(68,68,68,.5)_76%,transparent_77%,transparent)] bg-[length:50px_50px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Enhanced Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.div
            className="flex items-center justify-center mb-8"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="relative p-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full shadow-2xl"
              animate={{
                boxShadow: [
                  "0 0 40px rgba(59, 130, 246, 0.6)",
                  "0 0 80px rgba(147, 51, 234, 0.8)",
                  "0 0 40px rgba(6, 182, 212, 0.6)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Brain className="h-16 w-16 text-white" />
              <motion.div
                className="absolute -inset-3 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full opacity-30 blur-xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            About{" "}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
              animate={{
                backgroundPosition: ["0%", "100%", "0%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: "300% 300%" }}
            >
              PlacementPro
            </motion.span>
            <motion.div
              className="inline-block ml-3"
              animate={{
                rotate: [0, 20, -20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Zap className="h-12 w-12 text-yellow-400" />
            </motion.div>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-100 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            We're revolutionizing the placement preparation landscape with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-semibold">
              cutting-edge AI technology
            </span>
            , comprehensive resources, and a supportive community ecosystem
            designed to accelerate your career success.
          </motion.p>

          {/* Floating achievement badges */}
          <motion.div
            className="flex justify-center space-x-8 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            {[
              {
                icon: Users,
                label: "50K+ Users",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Target,
                label: "95% Success",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: Shield,
                label: "Secure Platform",
                color: "from-purple-500 to-pink-500",
              },
            ].map((badge, index) => (
              <motion.div
                key={index}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.4,
                }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-14 h-14 mx-auto mb-2 bg-gradient-to-r ${badge.color} rounded-full flex items-center justify-center shadow-lg`}
                >
                  <badge.icon className="h-7 w-7 text-white" />
                </motion.div>
                <div className="text-sm font-medium text-gray-300">
                  {badge.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-20"
        >
          <Card className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-600/50 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-pink-500/10"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"></div>
            <CardContent className="p-10 relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  {
                    icon: Brain,
                    title: "AI-Powered",
                    description:
                      "Leveraging advanced artificial intelligence to provide personalized insights and recommendations.",
                    gradient: "from-purple-500 to-indigo-500",
                    bgGradient: "from-purple-900/30 to-indigo-900/30",
                  },
                  {
                    icon: Zap,
                    title: "Lightning Fast",
                    description:
                      "Get instant analysis, feedback, and results to accelerate your preparation timeline.",
                    gradient: "from-cyan-500 to-blue-500",
                    bgGradient: "from-cyan-900/30 to-blue-900/30",
                  },
                  {
                    icon: Shield,
                    title: "Secure & Private",
                    description:
                      "Your data is protected with enterprise-grade security and privacy measures.",
                    gradient: "from-green-500 to-emerald-500",
                    bgGradient: "from-green-900/30 to-emerald-900/30",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                    whileHover={{
                      scale: 1.05,
                      y: -5,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                    className={`text-center p-6 rounded-xl bg-gradient-to-br ${item.bgGradient} border border-gray-600/30 backdrop-blur-sm relative overflow-hidden group`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.8 }}
                      className={`h-16 w-16 mx-auto mb-6 p-4 rounded-full bg-gradient-to-r ${item.gradient} shadow-lg relative`}
                    >
                      <item.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3
                      className={`text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${item.gradient}`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-gray-200 leading-relaxed relative">
                      {item.description}
                    </p>
                    {/* Decorative elements */}
                    <div className="absolute top-3 right-3 w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-60"></div>
                    <div className="absolute bottom-3 left-3 w-3 h-3 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full opacity-60"></div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                whileHover={{
                  scale: 1.1,
                  y: -10,
                  transition: { type: "spring", stiffness: 300 },
                }}
                className="text-center relative"
              >
                <motion.div
                  className="relative p-6 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-xl border border-gray-600/50 shadow-xl group"
                  whileHover={{
                    boxShadow: [
                      "0 10px 30px rgba(0,0,0,0.3)",
                      "0 20px 60px rgba(147, 51, 234, 0.4)",
                      "0 10px 30px rgba(0,0,0,0.3)",
                    ],
                  }}
                  transition={{ duration: 1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.8 }}
                    className={`h-12 w-12 mx-auto mb-4 p-3 rounded-full bg-gradient-to-r ${
                      [
                        "from-purple-500 to-pink-500",
                        "from-cyan-500 to-blue-500",
                        "from-green-500 to-emerald-500",
                        "from-orange-500 to-red-500",
                      ][index]
                    } shadow-lg relative`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.8 + index * 0.1,
                      duration: 0.8,
                      type: "spring",
                    }}
                    className={`text-3xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${
                      [
                        "from-purple-400 to-pink-400",
                        "from-cyan-400 to-blue-400",
                        "from-green-400 to-emerald-400",
                        "from-orange-400 to-red-400",
                      ][index]
                    }`}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-gray-300 font-medium relative">
                    {stat.label}
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-60"></div>
                  <div className="absolute bottom-2 left-2 w-2 h-2 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full opacity-60"></div>
                </motion.div>

                {/* Floating animation */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 2 + index * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 pointer-events-none"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Features Deep Dive */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mb-20"
        >
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6"
              animate={{
                backgroundPosition: ["0%", "100%", "0%"],
              }}
              transition={{ duration: 6, repeat: Infinity }}
              style={{ backgroundSize: "300% 300%" }}
            >
              Comprehensive Feature Suite
            </motion.h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Explore our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-semibold">
                advanced tools and technologies
              </span>{" "}
              designed to give you a competitive edge in your placement journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                <Card className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-600/50 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 h-full relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-cyan-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"></div>

                  <CardHeader className="relative">
                    <div className="flex items-start space-x-4">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.8 }}
                        className={`w-14 h-14 rounded-xl bg-gradient-to-r ${
                          [
                            "from-purple-600 to-pink-600",
                            "from-cyan-600 to-blue-600",
                            "from-green-600 to-emerald-600",
                            "from-orange-600 to-red-600",
                            "from-indigo-600 to-purple-600",
                            "from-yellow-600 to-orange-600",
                            "from-teal-600 to-cyan-600",
                            "from-rose-600 to-pink-600",
                            "from-violet-600 to-purple-600",
                          ][index % 9]
                        } flex items-center justify-center shadow-lg`}
                      >
                        <feature.icon className="h-7 w-7 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <CardTitle
                          className={`text-white text-lg font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${
                            [
                              "from-purple-400 to-pink-400",
                              "from-cyan-400 to-blue-400",
                              "from-green-400 to-emerald-400",
                              "from-orange-400 to-red-400",
                              "from-indigo-400 to-purple-400",
                              "from-yellow-400 to-orange-400",
                              "from-teal-400 to-cyan-400",
                              "from-rose-400 to-pink-400",
                              "from-violet-400 to-purple-400",
                            ][index % 9]
                          }`}
                        >
                          {feature.title}
                        </CardTitle>
                        <CardDescription className="text-gray-200 mt-1 leading-relaxed">
                          {feature.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="relative">
                    <div className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                      >
                        <h4 className="font-semibold text-white mb-3 flex items-center">
                          <Target className="h-4 w-4 mr-2 text-cyan-400" />
                          Key Features:
                        </h4>
                        <ul className="space-y-2">
                          {feature.details.map((detail, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: 1.4 + index * 0.1 + idx * 0.05,
                                duration: 0.4,
                              }}
                              className="flex items-start text-gray-200 text-sm"
                            >
                              <CheckCircle className="h-4 w-4 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{detail}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.6 + index * 0.1, duration: 0.6 }}
                      >
                        <h4 className="font-semibold text-white mb-3 flex items-center">
                          <Code className="h-4 w-4 mr-2 text-purple-400" />
                          Technologies:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {feature.tech.map((tech, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                delay: 1.8 + index * 0.1 + idx * 0.05,
                                duration: 0.3,
                              }}
                              whileHover={{ scale: 1.1 }}
                              className={`px-3 py-1 bg-gradient-to-r ${
                                [
                                  "from-purple-600/30 to-pink-600/30 text-purple-200",
                                  "from-cyan-600/30 to-blue-600/30 text-cyan-200",
                                  "from-green-600/30 to-emerald-600/30 text-green-200",
                                  "from-orange-600/30 to-red-600/30 text-orange-200",
                                ][idx % 4]
                              } rounded-full text-xs font-medium backdrop-blur-sm border border-gray-600/30`}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </CardContent>

                  {/* Decorative corner elements */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-60"></div>
                  <div className="absolute bottom-4 left-4 w-3 h-3 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full opacity-60"></div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-purple-900/60 via-pink-900/60 to-cyan-900/60 border border-purple-500/30 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10"></div>
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"></div>

            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.1, 0.3, 0.1],
                    x: [0, Math.random() * 50 - 25],
                    y: [0, Math.random() * 50 - 25],
                  }}
                  transition={{
                    duration: 6 + Math.random() * 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
                  className={`absolute w-20 h-20 rounded-full blur-xl ${
                    [
                      "bg-gradient-to-r from-cyan-400/20 to-blue-600/20",
                      "bg-gradient-to-r from-pink-400/20 to-purple-600/20",
                      "bg-gradient-to-r from-green-400/20 to-emerald-600/20",
                      "bg-gradient-to-r from-yellow-400/20 to-orange-600/20",
                    ][i % 4]
                  }`}
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${20 + (i % 3) * 25}%`,
                  }}
                />
              ))}
            </div>

            <CardContent className="p-16 relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mb-8"
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="inline-block mb-6"
                >
                  <Target className="h-16 w-16 text-cyan-400 mx-auto" />
                </motion.div>

                <motion.h2
                  className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6"
                  animate={{
                    backgroundPosition: ["0%", "100%", "0%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  style={{ backgroundSize: "300% 300%" }}
                >
                  Ready to Transform Your Career?
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                  Join thousands of students who have successfully leveraged our{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-semibold">
                    AI-powered platform
                  </span>{" "}
                  to secure their dream placements.
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-6 justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="text-lg px-10 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 text-white shadow-lg border-0 relative overflow-hidden group"
                    asChild
                  >
                    <Link href="/signup">
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                      <span className="relative z-10 flex items-center">
                        Get Started Now <ArrowRight className="ml-3 h-5 w-5" />
                      </span>
                    </Link>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-10 py-4 border-2 border-purple-400/50 text-purple-300 hover:bg-purple-400/20 hover:text-white backdrop-blur-sm bg-transparent relative overflow-hidden group"
                    asChild
                  >
                    <Link href="/features">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                      <span className="relative z-10">Explore Features</span>
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Success indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
                className="flex justify-center space-x-8 mt-10"
              >
                {[
                  { icon: CheckCircle, text: "Trusted by 50K+" },
                  { icon: Zap, text: "Instant Results" },
                  { icon: Shield, text: "100% Secure" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                    className="flex items-center space-x-2 text-gray-300"
                  >
                    <item.icon className="h-5 w-5 text-green-400" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
