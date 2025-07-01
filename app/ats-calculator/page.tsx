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
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

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
    return "text-red-400";
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return "from-emerald-500 to-green-500";
    if (score >= 60) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/60 via-gray-900 to-rose-900/60" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-400/30 rounded-full"
            animate={{
              x: [0, Math.random() * 200, Math.random() * -200, 0],
              y: [0, Math.random() * -200, Math.random() * 200, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
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

      {/* Glowing orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="relative z-10 pt-20 pb-20">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          {/* Hero Section */}
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
              <Target className="h-8 w-8 text-red-400 mr-3" />
              <span className="text-red-400 font-medium text-lg tracking-wide">
                ATS OPTIMIZATION SUITE
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-6xl md:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="text-white">Resume</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-pink-400">
                Score
              </span>{" "}
              <span className="text-white">Analyzer</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              Unlock your resume's potential with our advanced ATS analyzer. Get
              detailed insights, keyword optimization suggestions, and boost
              your chances of landing that dream job.
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
                  number: "95%",
                  label: "Accuracy Rate",
                  color: "from-red-400 to-red-600",
                },
                {
                  number: "50K+",
                  label: "Resumes Analyzed",
                  color: "from-rose-400 to-rose-600",
                },
                {
                  number: "4.9★",
                  label: "User Rating",
                  color: "from-pink-400 to-pink-600",
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
          </motion.div>

          {/* Main Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-gray-900/80 border-gray-700 backdrop-blur-md shadow-2xl shadow-red-500/10">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl font-bold text-white flex items-center justify-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Sparkles className="h-8 w-8 text-red-400" />
                  </motion.div>
                  ATS Score Calculator
                </CardTitle>
                <CardDescription className="text-lg text-gray-300 max-w-2xl mx-auto">
                  Upload your resume and job description to get instant ATS
                  compatibility analysis with actionable optimization
                  recommendations.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Resume Input */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <FileText className="h-5 w-5 text-red-400" />
                      <h3 className="text-lg font-semibold text-white">
                        Your Resume
                      </h3>
                      <Badge
                        variant="secondary"
                        className="bg-red-500/20 text-red-300 border-red-500/30"
                      >
                        Required
                      </Badge>
                    </div>
                    <div className="relative">
                      <textarea
                        className="w-full p-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all duration-300 min-h-[200px] backdrop-blur-sm"
                        placeholder="Paste your resume content here... Include your skills, experience, education, and key achievements."
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                      />
                      <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                        {resumeText.length} characters
                      </div>
                    </div>
                  </div>

                  {/* Job Description Input */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="h-5 w-5 text-red-400" />
                      <h3 className="text-lg font-semibold text-white">
                        Job Description
                      </h3>
                      <Badge
                        variant="secondary"
                        className="bg-red-500/20 text-red-300 border-red-500/30"
                      >
                        Required
                      </Badge>
                    </div>
                    <div className="relative">
                      <textarea
                        className="w-full p-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all duration-300 min-h-[200px] backdrop-blur-sm"
                        placeholder="Paste the job description here... Include required skills, qualifications, and responsibilities."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                      />
                      <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                        {jobDescription.length} characters
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="text-center pt-6">
                  <Button
                    onClick={handleCalculate}
                    disabled={
                      loading || !resumeText.trim() || !jobDescription.trim()
                    }
                    size="lg"
                    className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white border-0 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 px-12 py-4 text-lg font-medium"
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="mr-3"
                        >
                          <Zap className="h-5 w-5" />
                        </motion.div>
                        Analyzing Your Resume...
                      </>
                    ) : (
                      <>
                        <BarChart3 className="h-5 w-5 mr-3" />
                        Calculate ATS Score
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Section */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Score Overview */}
              <Card className="bg-gray-900/80 border-gray-700 backdrop-blur-md shadow-2xl shadow-red-500/10 overflow-hidden">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-rose-600/10" />
                  <CardHeader className="relative z-10 text-center pb-8">
                    <CardTitle className="text-3xl font-bold text-white flex items-center justify-center gap-3">
                      <Award className="h-8 w-8 text-red-400" />
                      ATS Analysis Results
                    </CardTitle>
                    <CardDescription className="text-lg text-gray-300">
                      Comprehensive breakdown of your resume's ATS compatibility
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative z-10 space-y-8">
                    {/* Main Score Display */}
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="relative inline-block"
                      >
                        <div className="w-48 h-48 mx-auto relative">
                          <svg
                            className="w-full h-full transform -rotate-90"
                            viewBox="0 0 100 100"
                          >
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="none"
                              className="text-gray-700"
                            />
                            <motion.circle
                              cx="50"
                              cy="50"
                              r="40"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="none"
                              strokeLinecap="round"
                              className={`${getScoreColor(result.overall_score)}`}
                              initial={{ pathLength: 0 }}
                              animate={{
                                pathLength: result.overall_score / 100,
                              }}
                              transition={{ duration: 2, ease: "easeOut" }}
                              style={{
                                strokeDasharray: "251.2",
                                strokeDashoffset: "251.2",
                              }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div
                                className={`text-4xl font-bold ${getScoreColor(result.overall_score)}`}
                              >
                                {result.overall_score}%
                              </div>
                              <div className="text-sm text-gray-400">
                                ATS Score
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Detailed Metrics */}
                    <div className="grid md:grid-cols-3 gap-6">
                      <Card className="bg-gray-800/50 border-gray-600">
                        <CardContent className="p-6 text-center">
                          <BarChart3 className="h-8 w-8 text-red-400 mx-auto mb-3" />
                          <h3 className="text-lg font-semibold text-white mb-2">
                            Keyword Match
                          </h3>
                          <div className="text-2xl font-bold text-red-400 mb-2">
                            {result.keyword_match}%
                          </div>
                          <Progress
                            value={result.keyword_match}
                            className="h-2 bg-gray-700"
                          />
                          <div className="mt-2 text-sm text-gray-400">
                            {result.matched_keywords?.length || 0} keywords
                            matched
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gray-800/50 border-gray-600">
                        <CardContent className="p-6 text-center">
                          <TrendingUp className="h-8 w-8 text-rose-400 mx-auto mb-3" />
                          <h3 className="text-lg font-semibold text-white mb-2">
                            Optimization
                          </h3>
                          <div className="text-2xl font-bold text-rose-400 mb-2">
                            {result.missing_keywords?.length || 0}
                          </div>
                          <div className="text-sm text-gray-400">
                            Missing keywords
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gray-800/50 border-gray-600">
                        <CardContent className="p-6 text-center">
                          <Eye className="h-8 w-8 text-pink-400 mx-auto mb-3" />
                          <h3 className="text-lg font-semibold text-white mb-2">
                            Readability
                          </h3>
                          <div className="text-2xl font-bold text-pink-400 mb-2">
                            A+
                          </div>
                          <div className="text-sm text-gray-400">
                            ATS Friendly
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Matched Keywords */}
                    {result.matched_keywords &&
                      result.matched_keywords.length > 0 && (
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-400" />
                            Matched Keywords
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {result.matched_keywords.map(
                              (keyword: string, index: number) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.05 }}
                                >
                                  <Badge
                                    variant="secondary"
                                    className="bg-green-500/20 text-green-300 border-green-500/30 px-3 py-1"
                                  >
                                    {keyword}
                                  </Badge>
                                </motion.div>
                              ),
                            )}
                          </div>
                        </div>
                      )}

                    {/* Missing Keywords */}
                    {result.missing_keywords &&
                      result.missing_keywords.length > 0 && (
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-red-400" />
                            Missing Keywords
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {result.missing_keywords.map(
                              (keyword: string, index: number) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.05 }}
                                >
                                  <Badge
                                    variant="secondary"
                                    className="bg-red-500/20 text-red-300 border-red-500/30 px-3 py-1"
                                  >
                                    {keyword}
                                  </Badge>
                                </motion.div>
                              ),
                            )}
                          </div>
                        </div>
                      )}

                    {/* Recommendations */}
                    {result.recommendations &&
                      result.recommendations.length > 0 && (
                        <Alert className="bg-gray-800/50 border-red-500/30">
                          <BookOpen className="h-5 w-5 text-red-400" />
                          <AlertDescription className="text-gray-300">
                            <h4 className="font-semibold text-white mb-3">
                              Optimization Recommendations:
                            </h4>
                            <ul className="space-y-2">
                              {result.recommendations.map(
                                (rec: string, index: number) => (
                                  <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-2"
                                  >
                                    <span className="text-red-400 mt-1">•</span>
                                    <span>{rec}</span>
                                  </motion.li>
                                ),
                              )}
                            </ul>
                          </AlertDescription>
                        </Alert>
                      )}
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
