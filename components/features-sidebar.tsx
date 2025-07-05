"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Brain,
  FileText,
  Youtube,
  Calculator,
  Code,
  Building,
  MapPin,
  X,
} from "lucide-react";
import Link from "next/link";
import { useSound } from "@/hooks/use-sound";
import { GalaxyHover } from "./galaxy-hover";

const features = [
  {
    icon: Brain,
    title: "AI Speech & Gesture Analyzer",
    description:
      "Upload videos or go live to get detailed analysis of your speech patterns, word fillers, modulation, and body language.",
    href: "/speech-analyzer",
    color: "from-purple-500 to-pink-500",
    category: "AI Tools",
  },
  {
    icon: Youtube,
    title: "YouTube to PDF Converter",
    description:
      "Convert any YouTube video into a comprehensive PDF document for easy reading and note-taking.",
    href: "/youtube-converter",
    color: "from-red-500 to-orange-500",
    category: "AI Tools",
  },
  {
    icon: FileText,
    title: "PDF Summary Maker",
    description:
      "Upload any PDF and get an intelligent summary of its contents powered by AI.",
    href: "/pdf-summary",
    color: "from-green-500 to-emerald-500",
    category: "AI Tools",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description:
      "Create professional resumes with our collection of ATS-friendly templates and AI-powered suggestions.",
    href: "/resume-builder",
    color: "from-indigo-500 to-purple-500",
    category: "Career Tools",
  },
  {
    icon: Calculator,
    title: "ATS Calculator",
    description:
      "Check how well your resume performs against Applicant Tracking Systems with detailed scoring.",
    href: "/ats-calculator",
    color: "from-orange-500 to-red-500",
    category: "Career Tools",
  },
  {
    icon: Code,
    title: "DSA Sheets",
    description:
      "Comprehensive Data Structures and Algorithms practice sheets curated for placement preparation.",
    href: "/dsa-sheets",
    color: "from-cyan-500 to-blue-500",
    category: "Learning",
  },
  {
    icon: Building,
    title: "Company Materials",
    description:
      "Access company-specific placement materials, previous year questions, and interview experiences.",
    href: "/company-materials",
    color: "from-pink-500 to-rose-500",
    category: "Learning",
  },
  {
    icon: MapPin,
    title: "Regional Job Vacancies",
    description:
      "Find job opportunities in your region with detailed job profiles, requirements, and application links.",
    href: "/vacancies",
    color: "from-emerald-500 to-teal-500",
    category: "Jobs",
  },
];

const categories = ["All", "AI Tools", "Career Tools", "Learning", "Jobs"];

export function FeaturesSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { playSound } = useSound();

  const filteredFeatures =
    selectedCategory === "All"
      ? features
      : features.filter((feature) => feature.category === selectedCategory);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    playSound("click");
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleSidebar}
        onMouseEnter={() => playSound("hover")}
      >
        {isOpen ? (
          <ChevronLeft className="w-6 h-6" />
        ) : (
          <ChevronRight className="w-6 h-6" />
        )}
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-96 bg-gray-900/95 backdrop-blur-md border-r border-gray-700 z-50 overflow-hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-white">Features</h2>
                  <button
                    onClick={toggleSidebar}
                    className="text-gray-400 hover:text-white transition-colors"
                    onMouseEnter={() => playSound("hover")}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        playSound("click");
                      }}
                      onMouseEnter={() => playSound("hover")}
                      className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                          : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Features List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {filteredFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <GalaxyHover>
                      <Link
                        href={feature.href}
                        onClick={() => setIsOpen(false)}
                      >
                        <motion.div
                          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 cursor-pointer group hover:border-purple-500/50 transition-all duration-150"
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onHoverStart={() => playSound("hover")}
                          onClick={() => playSound("click")}
                        >
                          <div className="flex items-start space-x-4">
                            <div
                              className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} p-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                            >
                              <feature.icon className="w-full h-full text-white" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">
                                {feature.title}
                              </h3>

                              <span className="inline-block px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-full mb-2">
                                {feature.category}
                              </span>

                              <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                                {feature.description}
                              </p>
                            </div>
                          </div>

                          {/* Hover Arrow */}
                          <div className="flex justify-end mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ChevronRight className="w-5 h-5 text-purple-400" />
                          </div>
                        </motion.div>
                      </Link>
                    </GalaxyHover>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-700">
                <div className="text-center text-sm text-gray-400">
                  <p>🚀 {filteredFeatures.length} features available</p>
                  <p className="mt-1">More coming soon!</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
