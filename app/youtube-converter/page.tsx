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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Youtube,
  Download,
  AlertCircle,
  Clock,
  Globe,
  FileText,
  Zap,
  Server,
  Sparkles,
  Play,
  Mic,
  Headphones,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";

interface TranscriptResult {
  video_info: {
    title: string;
    duration: number;
  };
  transcript: {
    full_text: string;
    segments: Array<{
      start: number;
      end: number;
      text: string;
    }>;
    language: string;
  };
  pdf_url: string;
}

export default function YouTubeConverterPage() {
  const [url, setUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcriptResult, setTranscriptResult] =
    useState<TranscriptResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const formatTimestamp = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsProcessing(true);
    setError(null);
    setTranscriptResult(null);

    try {
      console.log("Starting YouTube transcription for:", url);

      // Use Next.js API route (which uses env variable for backend)
      const response = await fetch("http://127.0.0.1:8000/api/youtube-transcript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Transcription failed");
      }

      console.log("Transcription successful:", result);
      setTranscriptResult(result);
    } catch (err: any) {
      console.error("YouTube transcription error:", err);
      setError(
        err.message || "Failed to process YouTube video. Please try again.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadTranscript = () => {
    console.log("hello");
    console.log("this is pdf url", transcriptResult);
    if (transcriptResult?.pdf_url) {
      window.open(transcriptResult.pdf_url, "_blank");
    }
  };

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/50 via-transparent to-green-900/50"></div>

      {/* Floating Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -180, -360],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-green-400/20 to-emerald-600/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            className="flex items-center justify-center mb-8"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="relative p-4 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 rounded-full shadow-2xl"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(236, 72, 153, 0.5)",
                  "0 0 40px rgba(236, 72, 153, 0.8)",
                  "0 0 20px rgba(236, 72, 153, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Youtube className="h-10 w-10 text-white" />
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-full opacity-30 blur"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            YouTube to{" "}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400"
              animate={{
                backgroundPosition: ["0%", "100%", "0%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Transcript
            </motion.span>
            <motion.div
              className="inline-block ml-2"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="h-8 w-8 text-yellow-400 inline" />
            </motion.div>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Transform any YouTube video into a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 font-semibold">
              comprehensive transcript
            </span>{" "}
            with precise timestamps. Perfect for studying, note-taking,
            research, and content analysis.
          </motion.p>

          {/* Floating Action Icons */}
          <div className="flex justify-center space-x-8 mt-8">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              className="text-blue-400"
            >
              <Play className="h-6 w-6" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              className="text-green-400"
            >
              <Mic className="h-6 w-6" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              className="text-purple-400"
            >
              <Headphones className="h-6 w-6" />
            </motion.div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {[
            {
              icon: Zap,
              title: "Lightning Fast",
              description: "AI-powered transcription in minutes",
              color: "from-yellow-400 to-orange-500",
              bgColor: "from-yellow-900/20 to-orange-900/20",
              shadowColor: "shadow-yellow-500/20",
            },
            {
              icon: Clock,
              title: "Timestamped",
              description: "Precise timestamps for easy navigation",
              color: "from-blue-400 to-cyan-500",
              bgColor: "from-blue-900/20 to-cyan-900/20",
              shadowColor: "shadow-blue-500/20",
            },
            {
              icon: FileText,
              title: "PDF Export",
              description: "Download formatted transcripts",
              color: "from-green-400 to-emerald-500",
              bgColor: "from-green-900/20 to-emerald-900/20",
              shadowColor: "shadow-green-500/20",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <Card
                className={`bg-gradient-to-br ${feature.bgColor} border-gray-600 backdrop-blur-xl hover:border-gray-500 transition-all duration-300 ${feature.shadowColor} hover:shadow-2xl`}
              >
                <CardContent className="p-8 text-center relative overflow-hidden">
                  <motion.div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className={`h-12 w-12 mx-auto mb-4 p-3 rounded-full bg-gradient-to-r ${feature.color} shadow-lg`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <h3
                    className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${feature.color} mb-3`}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Decorative corner elements */}
                  <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-60"></div>
                  <div className="absolute bottom-2 left-2 w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-60"></div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Alert className="mb-8 bg-gradient-to-r from-red-900/60 to-pink-900/60 border border-red-500/50 backdrop-blur-xl shadow-lg hover:shadow-red-500/20 transition-all duration-300">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-red-400"
                >
                  <AlertCircle className="h-5 w-5" />
                </motion.div>
                <AlertDescription className="text-red-100 ml-2 font-medium">
                  {error}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* URL Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <Card className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-600/50 backdrop-blur-2xl mb-12 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5"></div>
            <CardHeader className="relative">
              <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 flex items-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mr-3 p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg"
                >
                  <Youtube className="h-6 w-6 text-white" />
                </motion.div>
                Enter YouTube URL
              </CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Paste any YouTube video URL to generate a transcript with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-semibold">
                  precise timestamps
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="youtube-url"
                    className="text-gray-200 font-medium text-lg"
                  >
                    YouTube URL
                  </Label>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Input
                      id="youtube-url"
                      type="url"
                      placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="bg-gray-700/80 border-gray-500 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 h-14 text-lg backdrop-blur-sm transition-all duration-300"
                      disabled={isProcessing}
                    />
                  </motion.div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={isProcessing || !url.trim()}
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative z-10">
                      {isProcessing ? (
                        <div className="flex items-center justify-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                          Processing...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Sparkles className="w-5 h-5 mr-2" />
                          Generate Transcript
                        </div>
                      )}
                    </span>
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Processing Indicator */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -30 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <Card className="bg-gradient-to-br from-purple-900/60 to-pink-900/60 border border-purple-500/50 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>
                <CardContent className="p-12 text-center relative">
                  {/* Animated loading spinner with multiple rings */}
                  <div className="relative mx-auto mb-8 w-20 h-20">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-400 border-r-pink-400"
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-2 rounded-full border-4 border-transparent border-t-cyan-400 border-l-blue-400"
                    />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-4 rounded-full border-4 border-transparent border-t-yellow-400 border-b-red-400"
                    />
                  </div>

                  <motion.h3
                    className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Processing YouTube Video
                  </motion.h3>

                  <motion.p
                    className="text-gray-200 mb-2 text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Downloading audio and generating transcript...
                  </motion.p>

                  <motion.p
                    className="text-gray-400 mb-8 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    This may take a few minutes depending on video length
                  </motion.p>

                  {/* Enhanced Progress Bar */}
                  <div className="w-full max-w-md mx-auto">
                    <motion.div
                      className="h-3 bg-gray-700 rounded-full overflow-hidden relative"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full"
                        animate={{
                          x: ["-100%", "100%"],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          x: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                          opacity: {
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                        }}
                        style={{ width: "50%" }}
                      />
                    </motion.div>
                  </div>

                  {/* Floating particles animation */}
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                        animate={{
                          x: [0, Math.random() * 400 - 200],
                          y: [0, Math.random() * 200 - 100],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 3 + Math.random() * 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                        style={{
                          left: "50%",
                          top: "50%",
                        }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Section */}
        <AnimatePresence>
          {transcriptResult && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Video Info */}
              <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border border-emerald-500/30 backdrop-blur-2xl shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5"></div>
                <CardHeader className="relative flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 flex items-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="mr-3"
                      >
                        <Sparkles className="h-6 w-6 text-emerald-400" />
                      </motion.div>
                      Video Information
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-lg">
                      Details about the processed video
                    </CardDescription>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={downloadTranscript}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 h-12 px-6"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Download PDF
                    </Button>
                  </motion.div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        icon: FileText,
                        label: "Title",
                        value: transcriptResult.video_info.title?? "No Title",
                        color: "from-blue-400 to-cyan-400",
                      },
                      {
                        icon: Clock,
                        label: "Duration",
                        value: formatDuration(
                          transcriptResult.video_info.duration,
                        ),
                        color: "from-green-400 to-emerald-400",
                      },
                      {
                        icon: Globe,
                        label: "Language",
                        value: transcriptResult.transcript.language,
                        color: "from-purple-400 to-pink-400",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-lg border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300"
                      >
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className={`p-3 rounded-full bg-gradient-to-r ${item.color}`}
                        >
                          <item.icon className="h-5 w-5 text-white" />
                        </motion.div>
                        <div>
                          <p className="text-sm text-gray-400 font-medium">
                            {item.label}
                          </p>
                          <p className="text-white font-semibold text-lg">
                            {item.value}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Full Transcript */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-500/30 backdrop-blur-2xl shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
                  <CardHeader className="relative">
                    <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 flex items-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="mr-3"
                      >
                        <FileText className="h-6 w-6 text-blue-400" />
                      </motion.div>
                      Full Transcript
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-lg">
                      Complete transcript of the video content
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <motion.div
                      className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 p-8 rounded-xl border border-gray-600/50 max-h-96 overflow-y-auto backdrop-blur-sm"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-gray-200 leading-relaxed text-lg font-medium">
                        {transcriptResult.transcript.full_text}
                      </p>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Timestamped Segments */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 backdrop-blur-2xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5"></div>
                  <CardHeader className="relative">
                    <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 flex items-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="mr-3"
                      >
                        <Clock className="h-6 w-6 text-purple-400" />
                      </motion.div>
                      Timestamped Segments
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-lg">
                      Transcript broken down by timestamps for easy navigation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <motion.div
                      className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 p-8 rounded-xl border border-gray-600/50 max-h-96 overflow-y-auto space-y-6 backdrop-blur-sm"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      {transcriptResult.transcript.segments.map(
                        (segment, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.4 }}
                            className="border-l-4 border-purple-400 pl-6 py-3 bg-gray-800/30 rounded-r-lg hover:bg-gray-700/40 transition-all duration-300"
                            whileHover={{ x: 5 }}
                          >
                            <div className="flex items-center space-x-3 mb-2">
                              <motion.span
                                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-mono text-sm font-bold px-3 py-1 bg-gray-700 rounded-full"
                                whileHover={{ scale: 1.05 }}
                              >
                                {formatTimestamp(segment.start)} -{" "}
                                {formatTimestamp(segment.end)}
                              </motion.span>
                            </div>
                            <p className="text-gray-200 text-base leading-relaxed font-medium">
                              {segment.text}
                            </p>
                          </motion.div>
                        ),
                      )}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
