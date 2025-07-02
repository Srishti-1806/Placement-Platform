"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  FileText,
  Download,
  AlertCircle,
  BookOpen,
  BarChart3,
  Zap,
  Target,
  TrendingUp,
  Award,
  Sparkles,
  Eye,
  CheckCircle,
  Star,
  Heart,
  Gem,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { AuthGuard } from "@/components/auth-guard";

export default function ATSCalculatorPage() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/ats-calculator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resume: resumeText, job: jobDescription }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error calculating ATS score", error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-yellow-400";
    return "text-pink-400";
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return "from-emerald-500 to-green-500";
    if (score >= 60) return "from-yellow-500 to-orange-500";
    return "from-pink-500 to-fuchsia-500";
  };

  return (
    <AuthGuard>
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Background with Dark Pink Theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/70 via-gray-900 to-fuchsia-900/70" />

        {/* Animated mesh gradient overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-600/30 via-transparent to-purple-600/30 animate-pulse" />
          <div
            className="absolute inset-0 bg-gradient-to-bl from-fuchsia-600/20 via-transparent to-rose-600/20 animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        {/* Floating particles with pink theme */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${
                i % 3 === 0
                  ? "w-2 h-2 bg-pink-400/40"
                  : i % 3 === 1
                    ? "w-1 h-1 bg-fuchsia-400/50"
                    : "w-1.5 h-1.5 bg-rose-400/30"
              }`}
              animate={{
                x: [0, Math.random() * 300, Math.random() * -300, 0],
                y: [0, Math.random() * -300, Math.random() * 300, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: Math.random() * 20 + 20,
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

        {/* Stunning glowing orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/6 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-fuchsia-500/25 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.25, 0.4, 0.25],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl"
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Sparkling stars effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            >
              <Star className="h-4 w-4 text-pink-300 fill-current" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 pt-20 pb-20">
          <div className="max-w-6xl mx-auto px-6 space-y-12">
            {/* Enhanced Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center justify-center mb-6"
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Gem className="h-8 w-8 text-pink-400 mr-3" />
                </motion.div>
                <span className="text-pink-400 font-medium text-lg tracking-wide uppercase bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
                  ✨ Premium ATS Optimization Suite ✨
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-6xl md:text-8xl font-extrabold mb-8 leading-tight"
              >
                <span className="text-white drop-shadow-2xl">Resume</span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 animate-pulse">
                  Magic
                </span>{" "}
                <span className="text-white drop-shadow-2xl">Analyzer</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
              >
                Transform your career with our
                <span className="text-pink-400 font-semibold">
                  {" "}
                  AI-powered{" "}
                </span>
                resume analyzer. Discover hidden opportunities, optimize
                keywords, and
                <span className="text-fuchsia-400 font-semibold">
                  {" "}
                  unleash your potential{" "}
                </span>
                in the job market.
              </motion.p>

              {/* Enhanced Stats with animations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mb-16"
              >
                {[
                  {
                    number: "99.2%",
                    label: "Accuracy Rate",
                    color: "from-pink-400 to-pink-600",
                    icon: Target,
                  },
                  {
                    number: "100K+",
                    label: "Dreams Fulfilled",
                    color: "from-fuchsia-400 to-fuchsia-600",
                    icon: Heart,
                  },
                  {
                    number: "4.9★",
                    label: "User Love",
                    color: "from-purple-400 to-purple-600",
                    icon: Star,
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-6 rounded-2xl bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 hover:border-pink-400/50 transition-all duration-300"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.25)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <stat.icon className="h-8 w-8 text-pink-400 mx-auto mb-3" />
                    <div
                      className={`text-4xl font-bold bg-gradient-to-r ${stat.color} text-transparent bg-clip-text mb-2`}
                    >
                      {stat.number}
                    </div>
                    <div className="text-gray-300 text-sm font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Enhanced Main Input Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-gray-900/90 border-gray-600/50 backdrop-blur-xl shadow-2xl shadow-pink-500/20 relative overflow-hidden">
                {/* Animated border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-fuchsia-500/20 to-purple-500/20 rounded-lg blur-sm" />
                <div className="absolute inset-[1px] bg-gray-900/90 rounded-lg" />

                <CardHeader className="text-center pb-8 relative z-10">
                  <CardTitle className="text-4xl font-bold text-white flex items-center justify-center gap-4 mb-4">
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Sparkles className="h-10 w-10 text-pink-400" />
                    </motion.div>
                    <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                      ATS Magic Calculator
                    </span>
                    <motion.div
                      animate={{
                        rotate: [360, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Heart className="h-10 w-10 text-fuchsia-400 fill-current" />
                    </motion.div>
                  </CardTitle>
                  <CardDescription className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                    Experience the magic of professional resume optimization.
                    Upload your content and watch as our
                    <span className="text-pink-400 font-semibold">
                      {" "}
                      intelligent algorithms{" "}
                    </span>
                    reveal insights that can transform your career journey.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-10 relative z-10">
                  <div className="grid md:grid-cols-2 gap-10">
                    {/* Enhanced Resume Input */}
                    <motion.div
                      className="space-y-6"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-2 bg-pink-500/20 rounded-lg">
                          <FileText className="h-6 w-6 text-pink-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          Your Resume
                        </h3>
                        <Badge
                          variant="secondary"
                          className="bg-gradient-to-r from-pink-500/30 to-fuchsia-500/30 text-pink-200 border-pink-400/30 px-3 py-1"
                        >
                          ✨ Required
                        </Badge>
                      </div>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-fuchsia-500/20 rounded-xl blur-sm group-focus-within:blur-md transition-all duration-300" />
                        <textarea
                          className="relative w-full p-6 bg-gray-800/80 border border-gray-600/50 rounded-xl text-white placeholder-gray-300 focus:border-pink-400 focus:ring-4 focus:ring-pink-400/30 transition-all duration-300 min-h-[250px] backdrop-blur-sm resize-none font-mono text-sm leading-relaxed"
                          placeholder="✨ Paste your resume magic here... Include your superpowers (skills), legendary quests (experience), academic achievements, and all the amazing things that make you unique!"
                          value={resumeText}
                          onChange={(e) => setResumeText(e.target.value)}
                        />
                        <div className="absolute bottom-4 right-4 px-3 py-1 bg-gray-700/80 rounded-full text-xs text-gray-400 backdrop-blur-sm">
                          {resumeText.length} characters of brilliance
                        </div>
                      </div>
                    </motion.div>

                    {/* Enhanced Job Description Input */}
                    <motion.div
                      className="space-y-6"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-2 bg-fuchsia-500/20 rounded-lg">
                          <Target className="h-6 w-6 text-fuchsia-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          Dream Job Description
                        </h3>
                        <Badge
                          variant="secondary"
                          className="bg-gradient-to-r from-fuchsia-500/30 to-purple-500/30 text-fuchsia-200 border-fuchsia-400/30 px-3 py-1"
                        >
                          🎯 Required
                        </Badge>
                      </div>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 to-purple-500/20 rounded-xl blur-sm group-focus-within:blur-md transition-all duration-300" />
                        <textarea
                          className="relative w-full p-6 bg-gray-800/80 border border-gray-600/50 rounded-xl text-white placeholder-gray-300 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-400/30 transition-all duration-300 min-h-[250px] backdrop-blur-sm resize-none font-mono text-sm leading-relaxed"
                          placeholder="🎯 Describe your dream role here... Include the magical requirements, mystical qualifications, and enchanting responsibilities you'll master!"
                          value={jobDescription}
                          onChange={(e) => setJobDescription(e.target.value)}
                        />
                        <div className="absolute bottom-4 right-4 px-3 py-1 bg-gray-700/80 rounded-full text-xs text-gray-400 backdrop-blur-sm">
                          {jobDescription.length} characters of destiny
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Enhanced Action Button */}
                  <div className="text-center pt-8">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={handleCalculate}
                        disabled={
                          loading ||
                          !resumeText.trim() ||
                          !jobDescription.trim()
                        }
                        size="lg"
                        className="relative overflow-hidden bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-600 hover:from-pink-700 hover:via-fuchsia-700 hover:to-purple-700 text-white border-0 shadow-2xl shadow-pink-500/40 hover:shadow-pink-500/60 transition-all duration-500 px-16 py-6 text-xl font-bold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {/* Button glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 via-fuchsia-400/20 to-purple-400/20 blur-xl" />

                        <div className="relative flex items-center gap-4">
                          {loading ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                              >
                                <Sparkles className="h-6 w-6" />
                              </motion.div>
                              <span>✨ Analyzing Your Magic...</span>
                            </>
                          ) : (
                            <>
                              <BarChart3 className="h-6 w-6" />
                              <span>🪄 Unleash the Magic</span>
                              <Heart className="h-6 w-6 fill-current animate-pulse" />
                            </>
                          )}
                        </div>
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Enhanced Results Section */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-10"
              >
                {/* Enhanced Score Overview */}
                <Card className="bg-gray-900/90 border-gray-600/50 backdrop-blur-xl shadow-2xl shadow-pink-500/20 overflow-hidden relative">
                  {/* Animated background effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 via-fuchsia-600/5 to-purple-600/10" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/5 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <CardHeader className="relative z-10 text-center pb-10">
                    <CardTitle className="text-4xl font-bold text-white flex items-center justify-center gap-4 mb-4">
                      <motion.div
                        animate={{
                          rotate: [0, 360],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Award className="h-10 w-10 text-pink-400" />
                      </motion.div>
                      <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                        ✨ Magic Analysis Results ✨
                      </span>
                    </CardTitle>
                    <CardDescription className="text-xl text-gray-200 max-w-2xl mx-auto">
                      Behold! Your resume has been analyzed by our mystical
                      algorithms.
                      <span className="text-pink-400 font-semibold">
                        {" "}
                        Discover your hidden potential!{" "}
                      </span>
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative z-10 space-y-12">
                    {/* Enhanced Main Score Display */}
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          duration: 1.2,
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                        }}
                        className="relative inline-block"
                      >
                        <div className="w-64 h-64 mx-auto relative">
                          {/* Outer glow ring */}
                          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full blur-2xl animate-pulse" />

                          <svg
                            className="w-full h-full transform -rotate-90 relative z-10"
                            viewBox="0 0 100 100"
                          >
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              stroke="currentColor"
                              strokeWidth="6"
                              fill="none"
                              className="text-gray-700"
                            />
                            <motion.circle
                              cx="50"
                              cy="50"
                              r="40"
                              stroke="currentColor"
                              strokeWidth="6"
                              fill="none"
                              strokeLinecap="round"
                              className={`${getScoreColor(result.overall_score)} drop-shadow-lg`}
                              initial={{ pathLength: 0 }}
                              animate={{
                                pathLength: result.overall_score / 100,
                              }}
                              transition={{
                                duration: 3,
                                ease: "easeOut",
                                delay: 0.5,
                              }}
                              style={{
                                strokeDasharray: "251.2",
                                strokeDashoffset: "251.2",
                                filter: "drop-shadow(0 0 8px currentColor)",
                              }}
                            />
                          </svg>

                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                              className="text-center"
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 1, duration: 0.5 }}
                            >
                              <div
                                className={`text-5xl font-extrabold ${getScoreColor(result.overall_score)} mb-2 drop-shadow-lg`}
                              >
                                {result.overall_score}%
                              </div>
                              <div className="text-lg text-gray-300 font-medium">
                                Magic Score
                              </div>
                              <div className="text-sm text-pink-400">
                                ✨ Pure Brilliance ✨
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Enhanced Detailed Metrics */}
                    <div className="grid md:grid-cols-3 gap-8">
                      {[
                        {
                          icon: BarChart3,
                          title: "Keyword Magic",
                          value: `${result.keyword_match}%`,
                          subtitle: `${result.matched_keywords?.length || 0} spells matched`,
                          color: "pink",
                          bgGradient: "from-pink-500/20 to-rose-500/20",
                        },
                        {
                          icon: TrendingUp,
                          title: "Enchantment Potential",
                          value: `${result.missing_keywords?.length || 0}`,
                          subtitle: "Missing magical words",
                          color: "fuchsia",
                          bgGradient: "from-fuchsia-500/20 to-purple-500/20",
                        },
                        {
                          icon: Eye,
                          title: "Mystical Readability",
                          value: "A+",
                          subtitle: "ATS Oracle Approved",
                          color: "purple",
                          bgGradient: "from-purple-500/20 to-indigo-500/20",
                        },
                      ].map((metric, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 + index * 0.2 }}
                          whileHover={{
                            scale: 1.05,
                            boxShadow:
                              "0 25px 50px -12px rgba(236, 72, 153, 0.25)",
                          }}
                        >
                          <Card className="bg-gray-800/70 border-gray-600/50 backdrop-blur-sm relative overflow-hidden">
                            <div
                              className={`absolute inset-0 bg-gradient-to-br ${metric.bgGradient} opacity-50`}
                            />
                            <CardContent className="p-8 text-center relative z-10">
                              <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{
                                  duration: 20,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                              >
                                <metric.icon
                                  className={`h-10 w-10 text-${metric.color}-400 mx-auto mb-4`}
                                />
                              </motion.div>
                              <h3 className="text-lg font-bold text-white mb-3">
                                {metric.title}
                              </h3>
                              <div
                                className={`text-3xl font-extrabold text-${metric.color}-400 mb-3`}
                              >
                                {metric.value}
                              </div>
                              {metric.title === "Keyword Magic" && (
                                <Progress
                                  value={result.keyword_match}
                                  className="h-3 bg-gray-700 mb-3"
                                />
                              )}
                              <div className="text-sm text-gray-300">
                                {metric.subtitle}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    {/* Enhanced Matched Keywords */}
                    {result.matched_keywords &&
                      result.matched_keywords.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.5 }}
                          className="space-y-6"
                        >
                          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                            <CheckCircle className="h-7 w-7 text-emerald-400" />
                            <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                              ✨ Magical Keywords Found ✨
                            </span>
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            {result.matched_keywords.map(
                              (keyword: string, index: number) => (
                                <motion.div
                                  key={index}
                                  initial={{
                                    opacity: 0,
                                    scale: 0.8,
                                    rotate: -10,
                                  }}
                                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                  transition={{
                                    delay: 1.8 + index * 0.1,
                                    type: "spring",
                                    stiffness: 100,
                                  }}
                                  whileHover={{ scale: 1.1, rotate: 5 }}
                                >
                                  <Badge
                                    variant="secondary"
                                    className="bg-gradient-to-r from-emerald-500/30 to-green-500/30 text-emerald-200 border-emerald-400/50 px-4 py-2 text-sm font-medium shadow-lg"
                                  >
                                    ✨ {keyword}
                                  </Badge>
                                </motion.div>
                              ),
                            )}
                          </div>
                        </motion.div>
                      )}

                    {/* Enhanced Missing Keywords */}
                    {result.missing_keywords &&
                      result.missing_keywords.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 2 }}
                          className="space-y-6"
                        >
                          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                            <AlertCircle className="h-7 w-7 text-pink-400" />
                            <span className="bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
                              🔮 Hidden Potential Keywords
                            </span>
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            {result.missing_keywords.map(
                              (keyword: string, index: number) => (
                                <motion.div
                                  key={index}
                                  initial={{
                                    opacity: 0,
                                    scale: 0.8,
                                    rotate: 10,
                                  }}
                                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                  transition={{
                                    delay: 2.3 + index * 0.1,
                                    type: "spring",
                                    stiffness: 100,
                                  }}
                                  whileHover={{ scale: 1.1, rotate: -5 }}
                                >
                                  <Badge
                                    variant="secondary"
                                    className="bg-gradient-to-r from-pink-500/30 to-fuchsia-500/30 text-pink-200 border-pink-400/50 px-4 py-2 text-sm font-medium shadow-lg"
                                  >
                                    🌟 {keyword}
                                  </Badge>
                                </motion.div>
                              ),
                            )}
                          </div>
                        </motion.div>
                      )}

                    {/* Enhanced Recommendations */}
                    {result.recommendations &&
                      result.recommendations.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 2.5 }}
                        >
                          <Alert className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-pink-400/30 backdrop-blur-sm relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-fuchsia-500/5 to-purple-500/5" />
                            <BookOpen className="h-6 w-6 text-pink-400" />
                            <AlertDescription className="text-gray-200 relative z-10">
                              <h4 className="font-bold text-white mb-4 text-lg flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-pink-400" />
                                🪄 Magical Optimization Spells:
                              </h4>
                              <ul className="space-y-3">
                                {result.recommendations.map(
                                  (rec: string, index: number) => (
                                    <motion.li
                                      key={index}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 2.8 + index * 0.15 }}
                                      className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg border border-pink-400/20"
                                    >
                                      <span className="text-pink-400 text-lg">
                                        ✨
                                      </span>
                                      <span className="text-gray-200 leading-relaxed">
                                        {rec}
                                      </span>
                                    </motion.li>
                                  ),
                                )}
                              </ul>
                            </AlertDescription>
                          </Alert>
                        </motion.div>
                      )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
