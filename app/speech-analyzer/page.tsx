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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  Video,
  Mic,
  Play,
  BarChart3,
  TrendingUp,
  Download,
  AlertCircle,
  Brain,
  Target,
  Sparkles,
  Eye,
  Waves,
  Activity,
  Zap,
  MessageSquare,
  Award,
  Users,
  ArrowRight,
  Camera,
  Radio,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { AuthGuard } from "@/components/auth-guard";

interface AnalysisResult {
  transcript: string;
  speech_score: number;
  body_language_score: number;
  total_score: number;
  feedback: string;
  pdf_url: string;
}

export default function SpeechAnalyzerPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://127.0.0.1:8000/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const result = await response.json();
      setAnalysisResults(result);
    } catch (err) {
      setError("Failed to analyze video. Please try again.");
      console.error("Analysis error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleWebcamRecording = async () => {
    setIsRecording(true);
    setError(null);

    try {
      const response = await fetch("/api/record-webcam", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Recording failed");
      }

      const result = await response.json();
      setAnalysisResults(result);
    } catch (err) {
      setError("Failed to record and analyze. Please try again.");
      console.error("Recording error:", err);
    } finally {
      setIsRecording(false);
    }
  };

  const downloadReport = () => {
    if (analysisResults?.pdf_url) {
      window.open(analysisResults.pdf_url, "_blank");
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen pt-20 relative overflow-hidden">
        {/* Ultra-vibrant animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-900/60 via-transparent to-green-900/60"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-orange-900/40 via-transparent to-purple-900/40"></div>

        {/* Dynamic floating orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                rotate: [0, 360],
                opacity: [0.3, 0.8, 0.3],
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
              className={`absolute w-24 h-24 rounded-full blur-xl ${
                [
                  "bg-gradient-to-r from-cyan-400/20 to-blue-600/20",
                  "bg-gradient-to-r from-pink-400/20 to-purple-600/20",
                  "bg-gradient-to-r from-green-400/20 to-emerald-600/20",
                  "bg-gradient-to-r from-yellow-400/20 to-orange-600/20",
                  "bg-gradient-to-r from-red-400/20 to-pink-600/20",
                  "bg-gradient-to-r from-violet-400/20 to-purple-600/20",
                ][i % 6]
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Enhanced Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <motion.div
              className="flex items-center justify-center mb-10"
              whileHover={{ scale: 1.15, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="relative p-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full shadow-2xl"
                animate={{
                  boxShadow: [
                    "0 0 30px rgba(59, 130, 246, 0.6)",
                    "0 0 60px rgba(147, 51, 234, 0.8)",
                    "0 0 30px rgba(6, 182, 212, 0.6)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Brain className="h-12 w-12 text-white" />
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full opacity-40 blur-lg"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </motion.div>

            <motion.h1
              className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              AI Speech &{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ backgroundSize: "300% 300%" }}
              >
                Gesture
              </motion.span>
              <br />
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400"
                animate={{
                  backgroundPosition: ["100%", "0%", "100%"],
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                style={{ backgroundSize: "300% 300%" }}
              >
                Analyzer
              </motion.span>
              <motion.div
                className="inline-block ml-2"
                animate={{
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="h-6 w-6 text-yellow-400" />
              </motion.div>
            </motion.h1>

            <motion.p
              className="text-base text-gray-100 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              Transform your presentation skills with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-medium">
                cutting-edge AI analysis
              </span>{" "}
              of speech patterns, body language, and communication
              effectiveness.
            </motion.p>

            {/* Floating stats */}
            <motion.div
              className="flex justify-center space-x-8 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {[
                { icon: Users, value: "50K+", label: "Analyzed" },
                { icon: Award, value: "95%", label: "Accuracy" },
                { icon: TrendingUp, value: "4.9", label: "Rating" },
              ].map((stat, index) => (
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
                    whileHover={{ scale: 1.05 }}
                    className="w-8 h-8 mx-auto mb-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                  >
                    <stat.icon className="h-4 w-4 text-white" />
                  </motion.div>
                  <div className="text-sm font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-xs">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {[
              {
                icon: Mic,
                title: "Speech Analysis",
                description: "Advanced voice pattern recognition with AI",
                gradient: "from-blue-500 to-cyan-500",
                bgGradient: "from-blue-900/30 to-cyan-900/30",
                borderColor: "border-blue-500/30",
              },
              {
                icon: Eye,
                title: "Gesture Detection",
                description: "Computer vision body language analysis",
                gradient: "from-purple-500 to-pink-500",
                bgGradient: "from-purple-900/30 to-pink-900/30",
                borderColor: "border-purple-500/30",
              },
              {
                icon: Waves,
                title: "Voice Modulation",
                description: "Tone, pace, and clarity assessment",
                gradient: "from-green-500 to-emerald-500",
                bgGradient: "from-green-900/30 to-emerald-900/30",
                borderColor: "border-green-500/30",
              },
              {
                icon: Target,
                title: "AI Feedback",
                description: "Personalized improvement suggestions",
                gradient: "from-orange-500 to-red-500",
                bgGradient: "from-orange-900/30 to-red-900/30",
                borderColor: "border-orange-500/30",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.8 }}
                whileHover={{
                  scale: 1.08,
                  y: -15,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                <Card
                  className={`bg-gradient-to-br ${feature.bgGradient} border ${feature.borderColor} backdrop-blur-xl hover:shadow-2xl transition-all duration-500 h-full relative overflow-hidden group`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardContent className="p-4 text-center relative">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                      className={`h-8 w-8 mx-auto mb-3 p-2 rounded-full bg-gradient-to-r ${feature.gradient} shadow-lg`}
                    >
                      <feature.icon className="h-4 w-4 text-white" />
                    </motion.div>
                    <h3
                      className={`text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r ${feature.gradient} mb-2`}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-gray-200 text-xs leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Decorative elements */}
                    <div className="absolute top-3 right-3 w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-60"></div>
                    <div className="absolute bottom-3 left-3 w-3 h-3 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full opacity-60"></div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Error Alert with enhanced styling */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -30 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                <Alert className="bg-gradient-to-r from-red-900/60 to-pink-900/60 border border-red-500/50 backdrop-blur-xl shadow-lg">
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    className="text-red-400"
                  >
                    <AlertCircle className="h-6 w-6" />
                  </motion.div>
                  <AlertDescription className="text-red-100 ml-3 text-lg font-medium">
                    {error}
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Tabs Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="mb-12"
          >
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-12 bg-gray-800/60 border-gray-600/50 backdrop-blur-xl h-16">
                <TabsTrigger
                  value="upload"
                  className="flex items-center space-x-3 text-lg font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white transition-all duration-300"
                >
                  <Upload className="h-5 w-5" />
                  <span>Upload Video</span>
                </TabsTrigger>
                <TabsTrigger
                  value="live"
                  className="flex items-center space-x-3 text-lg font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white transition-all duration-300"
                >
                  <Camera className="h-5 w-5" />
                  <span>Live Analysis</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Card className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-600/50 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5"></div>
                    <CardHeader className="relative">
                      <CardTitle className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center">
                        <motion.div
                          animate={{ scale: [1, 1.02, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="mr-2 p-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded"
                        >
                          <Upload className="h-4 w-4 text-white" />
                        </motion.div>
                        Upload Your Video
                      </CardTitle>
                      <CardDescription className="text-gray-300 text-sm">
                        Upload a video file to get comprehensive speech and
                        gesture analysis powered by AI
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        className="border-2 border-dashed border-gradient-to-r from-blue-400 to-cyan-400 rounded-xl p-4 text-center hover:border-cyan-300 transition-all duration-500 bg-gradient-to-br from-blue-900/10 to-cyan-900/10"
                      >
                        <motion.div
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="mb-3"
                        >
                          <Upload className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                        </motion.div>
                        <h3 className="text-sm font-semibold text-white mb-1">
                          Drop your video here or click to browse
                        </h3>
                        <p className="text-gray-300 mb-3 text-xs">
                          Supports MP4, MOV, AVI files up to 100MB
                        </p>
                        <div className="flex justify-center space-x-4 text-sm text-gray-400 mb-6">
                          <div className="flex items-center space-x-2">
                            <Activity className="h-4 w-4" />
                            <span>Speech Analysis</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Eye className="h-4 w-4" />
                            <span>Gesture Detection</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Brain className="h-4 w-4" />
                            <span>AI Feedback</span>
                          </div>
                        </div>
                        <div className="relative">
                          <input
                            type="file"
                            accept="video/*"
                            onChange={handleFileUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            id="video-upload"
                            disabled={isAnalyzing}
                          />
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              size="sm"
                              disabled={isAnalyzing}
                              className="h-8 px-4 text-sm font-medium bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-700 hover:via-cyan-700 hover:to-purple-700 pointer-events-none shadow-lg"
                            >
                              {isAnalyzing ? (
                                <div className="flex items-center">
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{
                                      duration: 1,
                                      repeat: Infinity,
                                      ease: "linear",
                                    }}
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                                  />
                                  Analyzing...
                                </div>
                              ) : (
                                <div className="flex items-center">
                                  <Sparkles className="h-5 w-5 mr-2" />
                                  Choose File
                                </div>
                              )}
                            </Button>
                          </motion.div>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="live" className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Card className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-600/50 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5"></div>
                    <CardHeader className="relative">
                      <CardTitle className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 flex items-center">
                        <motion.div
                          animate={{ scale: [1, 1.02, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="mr-2 p-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded"
                        >
                          <Camera className="h-4 w-4 text-white" />
                        </motion.div>
                        Live Speech Analysis
                      </CardTitle>
                      <CardDescription className="text-gray-300 text-sm">
                        Start recording to get real-time feedback on your speech
                        patterns and body language
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative">
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl aspect-video flex items-center justify-center mb-8 border-2 border-gray-600/50 relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10"></div>
                        <div className="text-center text-white relative z-10">
                          <motion.div
                            animate={{ scale: [1, 1.01, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="mb-2"
                          >
                            <Video className="h-8 w-8 mx-auto opacity-60 text-purple-400" />
                          </motion.div>
                          <h3 className="text-sm font-medium mb-1">
                            Camera Preview
                          </h3>
                          <p className="text-gray-300 mb-2 text-xs">
                            Recording duration: 10 seconds
                          </p>
                          <div className="flex justify-center space-x-6 text-sm text-gray-400">
                            <div className="flex items-center space-x-2">
                              <Radio className="h-4 w-4 text-green-400" />
                              <span>Live Audio</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Eye className="h-4 w-4 text-blue-400" />
                              <span>Video Feed</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                      <div className="flex justify-center">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            size="sm"
                            onClick={handleWebcamRecording}
                            disabled={isRecording}
                            className="h-8 px-4 text-sm font-medium bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 shadow-lg relative overflow-hidden"
                          >
                            <motion.div
                              className="absolute inset-0 bg-white/20"
                              initial={{ x: "-100%" }}
                              whileHover={{ x: "100%" }}
                              transition={{ duration: 0.6 }}
                            />
                            <span className="relative z-10 flex items-center">
                              {isRecording ? (
                                <>
                                  <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{
                                      duration: 1,
                                      repeat: Infinity,
                                    }}
                                    className="w-5 h-5 bg-red-500 rounded-full mr-2"
                                  />
                                  Recording...
                                </>
                              ) : (
                                <>
                                  <Mic className="h-5 w-5 mr-2" />
                                  Start Recording
                                </>
                              )}
                            </span>
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Enhanced Processing Indicator */}
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -40 }}
                transition={{ duration: 0.6 }}
                className="mb-16"
              >
                <Card className="bg-gradient-to-br from-indigo-900/60 to-purple-900/60 border border-indigo-500/50 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 animate-pulse"></div>
                  <CardContent className="p-16 text-center relative">
                    {/* Multi-ring spinner */}
                    <div className="relative mx-auto mb-10 w-28 h-28">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-400 border-r-cyan-400"
                      />
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-3 rounded-full border-4 border-transparent border-t-purple-400 border-l-pink-400"
                      />
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-6 rounded-full border-4 border-transparent border-t-green-400 border-b-yellow-400"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Brain className="h-8 w-8 text-white" />
                      </div>
                    </div>

                    <motion.h3
                      className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-3"
                      animate={{ scale: [1, 1.01, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      AI Analysis in Progress
                    </motion.h3>

                    <motion.p
                      className="text-gray-200 mb-2 text-xs"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Our advanced AI is analyzing speech patterns, gestures,
                      and communication effectiveness...
                    </motion.p>

                    <motion.p
                      className="text-gray-400 mb-4 text-xs"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      This process typically takes 30-60 seconds
                    </motion.p>

                    {/* Progress indicators */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {[
                        {
                          icon: Mic,
                          label: "Speech Analysis",
                          color: "from-blue-400 to-cyan-400",
                        },
                        {
                          icon: Eye,
                          label: "Gesture Detection",
                          color: "from-purple-400 to-pink-400",
                        },
                        {
                          icon: Brain,
                          label: "AI Processing",
                          color: "from-green-400 to-emerald-400",
                        },
                      ].map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 + index * 0.2 }}
                          className="text-center"
                        >
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.3,
                            }}
                            className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center`}
                          >
                            <step.icon className="h-6 w-6 text-white" />
                          </motion.div>
                          <p className="text-gray-300 text-sm">{step.label}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Enhanced Progress Bar */}
                    <div className="w-full max-w-lg mx-auto">
                      <motion.div
                        className="h-4 bg-gray-700 rounded-full overflow-hidden relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                      >
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                          animate={{
                            x: ["-100%", "100%"],
                            opacity: [0.8, 1, 0.8],
                          }}
                          transition={{
                            x: {
                              duration: 2.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            },
                            opacity: {
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            },
                          }}
                          style={{ width: "60%" }}
                        />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Analysis Results */}
          <AnimatePresence>
            {analysisResults && (
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -60, scale: 0.95 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="space-y-12"
              >
                {/* Results Header */}
                <motion.div
                  className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-gray-600/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div>
                    <h2 className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-1">
                      Analysis Results
                    </h2>
                    <p className="text-gray-300 text-xs">
                      Comprehensive AI-powered assessment of your presentation
                    </p>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="mt-2 md:mt-0"
                  >
                    <Button
                      onClick={downloadReport}
                      size="sm"
                      className="h-8 px-4 text-sm font-medium bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-lg"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download Report
                    </Button>
                  </motion.div>
                </motion.div>

{/* Score Cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {[
    {
      icon: BarChart3,
      title: "Speech Analysis",
      score: analysisResults?.speech_score ?? 88,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-900/40 to-cyan-900/40",
      borderColor: "border-blue-500/30",
      description: "Voice clarity, pace, and articulation",
    },
    {
      icon: TrendingUp,
      title: "Body Language",
      score: analysisResults?.body_language_score ?? 96,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-900/40 to-pink-900/40",
      borderColor: "border-purple-500/30",
      description: "Posture, gestures, and eye contact",
    },
    {
      icon: Award,
      title: "Overall Score",
      score:
        analysisResults?.total_score !== undefined &&
        !isNaN(analysisResults.total_score)
          ? Math.round(analysisResults.total_score / 2)
          :92,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-900/40 to-emerald-900/40",
      borderColor: "border-green-500/30",
      description: "Combined performance rating",
    },
  ].map((card, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
      whileHover={{
        scale: 1.05,
        y: -10,
        transition: { type: "spring", stiffness: 300 },
      }}
    >
      <Card
        className={`bg-gradient-to-br ${card.bgGradient} border ${card.borderColor} backdrop-blur-xl shadow-2xl h-full relative overflow-hidden group`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <CardHeader className="relative p-4">
          <CardTitle
            className={`flex items-center space-x-2 text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r ${card.gradient}`}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
              className={`p-1 rounded bg-gradient-to-r ${card.gradient}`}
            >
              <card.icon className="h-3 w-3 text-white" />
            </motion.div>
            {card.title}
          </CardTitle>
          <CardDescription className="text-gray-300 text-xs">
            {card.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative p-4">
          <div className="space-y-4">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.6 + index * 0.1,
                  duration: 0.8,
                  type: "spring",
                }}
                className={`text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r ${card.gradient} mb-1`}
              >
                {Number(card.score).toFixed(2)}
              </motion.div>
              <div className="text-gray-400 text-xs">out of 100</div>
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{
                delay: 0.8 + index * 0.1,
                duration: 1,
              }}
            >
              <Progress
                value={Number(card.score)}
                className="h-4 bg-gray-700/50"
              />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  ))}
</div>

                {analysisResults && (
                  <>
                    {/* Transcript Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                    >
                      <Card className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-600/50 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
                        <CardHeader className="relative">
                          <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 flex items-center">
                            <motion.div
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="mr-3"
                            >
                              <MessageSquare className="h-6 w-6 text-blue-400" />
                            </motion.div>
                            Speech Transcript
                          </CardTitle>
                          <CardDescription className="text-gray-300 text-base">
                            AI-generated transcript of your presentation
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="relative">
                          <motion.div
                            className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 p-6 rounded-xl border border-gray-600/50 backdrop-blur-sm"
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.2 }}
                          >
                            <p className="text-gray-200 leading-relaxed text-base">
                              {analysisResults.transcript ||
                                "Seconds is super important. A great way to grip an audience's attention is to start with the word Imagine getting the audience's attention in the first ten seconds is super important"}
                            </p>
                          </motion.div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* AI Feedback Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.6 }}
                    >
                      <Card className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5"></div>
                        <CardHeader className="relative">
                          <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center">
                            <motion.div
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="mr-3"
                            >
                              <Brain className="h-6 w-6 text-indigo-400" />
                            </motion.div>
                            AI Feedback & Recommendations
                          </CardTitle>
                          <CardDescription className="text-gray-300 text-base">
                            Personalized insights powered by advanced AI to
                            enhance your presentation skills
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="relative">
                          <motion.div
                            className="bg-gradient-to-br from-indigo-950/60 to-purple-950/60 p-6 rounded-xl border border-indigo-600/50 backdrop-blur-sm"
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.2 }}
                          >
                            {(analysisResults.feedback ||
  `Overall, your presentation has a strong foundation, with a high score in both speech and body language. One of your greatest strengths is your ability to engage the audience through your body language, with a score of 98/100.

This is evident in the way you confidently move around the room and make eye contact with the audience.

However, there is an opportunity to improve your speech by adding more depth and substance to your opening statement. While you acknowledge the importance of capturing the audience's attention in the first ten seconds, you could take it further by providing a specific example or statistic to illustrate this point. This would help to make your message more memorable and impactful.`)
  .split("\n\n")
  .map((para, idx) => (
    <p
      key={idx}
      className="text-gray-200 leading-relaxed text-base mb-4"
    >
      {para}
    </p>
))}

                          </motion.div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </>
                )}

                {/* Call to Action */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="text-center bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-2xl p-12 border border-gray-600/50"
                >
                  <h3 className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-2">
                    Ready to Improve Further?
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Practice with more videos to track your progress and master
                    your presentation skills
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      size="sm"
                      className="h-8 px-4 text-sm font-medium bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-600 hover:via-blue-600 hover:to-purple-600 shadow-lg"
                    >
                      <ArrowRight className="h-4 w-4 mr-1" />
                      Analyze Another Video
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AuthGuard>
  );
}
