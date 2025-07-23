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
  Sparkles,
  Brain,
  Target,
  Activity,
  ChevronRight,
  Layers,
  TrendingUp,
  Clock,
  File,
  CheckCircle,
  Gauge,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";

interface SummaryResult {
  summary: string;
  original_word_count: number;
  summary_word_count: number;
  compression_ratio: number;
  pdf_url: string;
}

export default function PDFSummaryPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [summaryResult, setSummaryResult] = useState<SummaryResult | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setSummaryResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("http://127.0.0.1:8000/api/summarize", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Summarization failed");
      }

      const result = await response.json();
      console.log("this is result", result);
      const responseData: SummaryResult = {
        summary: result.summary,
        original_word_count: result.word_count_original,
        summary_word_count: result.word_count_summary,
        compression_ratio: result.compressed_ratio,
        pdf_url: result.pdf_path,
      };
      console.log("this is responseDATA", responseData);
      setSummaryResult(responseData);
    } catch (err) {
      setError("Failed to summarize PDF. Please try again.");
      console.error("Summarization error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadReport = () => {
    if (summaryResult?.pdf_url) {
      window.open(summaryResult.pdf_url, "_blank");
    }
  };

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      {/* Vibrant Dark Green Background with Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-950 via-emerald-900 to-teal-900"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-green-800/40 via-transparent to-emerald-700/60"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-teal-900/50 via-transparent to-green-900/70"></div>

      {/* Dynamic Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Floating Orbs */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.4, 1],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.4, 0.1],
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 150 - 75],
            }}
            transition={{
              duration: 12 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
            className={`absolute w-32 h-32 rounded-full blur-2xl ${
              [
                "bg-gradient-to-r from-green-400/20 to-emerald-600/30",
                "bg-gradient-to-r from-emerald-400/20 to-teal-600/30",
                "bg-gradient-to-r from-teal-400/20 to-green-600/30",
                "bg-gradient-to-r from-lime-400/20 to-green-600/30",
                "bg-gradient-to-r from-emerald-500/20 to-cyan-600/30",
                "bg-gradient-to-r from-green-500/20 to-emerald-700/30",
                "bg-gradient-to-r from-teal-500/20 to-green-700/30",
                "bg-gradient-to-r from-emerald-600/20 to-teal-700/30",
              ][i % 8]
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Geometric Patterns */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`pattern-${i}`}
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.8,
            }}
            className="absolute w-4 h-4 bg-gradient-to-r from-emerald-400/20 to-green-500/20 transform rotate-45"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Enhanced Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <motion.div
            className="flex items-center justify-center mb-12"
            whileHover={{ scale: 1.15, rotate: 12 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="relative p-8 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-full shadow-2xl"
              animate={{
                boxShadow: [
                  "0 0 40px rgba(34, 197, 94, 0.6)",
                  "0 0 80px rgba(16, 185, 129, 0.8)",
                  "0 0 40px rgba(20, 184, 166, 0.6)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <BookOpen className="h-16 w-16 text-white" />
              <motion.div
                className="absolute -inset-3 bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 rounded-full opacity-40 blur-xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -inset-6 bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 rounded-full opacity-20 blur-2xl"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-7xl md:text-9xl font-black text-white mb-10 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            AI PDF{" "}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400"
              animate={{
                backgroundPosition: ["0%", "100%", "0%"],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ backgroundSize: "300% 300%" }}
            >
              Summarizer
            </motion.span>
            <motion.div
              className="inline-block ml-6"
              animate={{
                rotate: [0, 20, -20, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="h-16 w-16 text-yellow-400" />
            </motion.div>
          </motion.h1>

          <motion.p
            className="text-2xl md:text-3xl text-gray-100 max-w-6xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Transform lengthy documents into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400 font-bold">
              intelligent summaries
            </span>{" "}
            using cutting-edge AI technology. Save hours and extract key
            insights instantly.
          </motion.p>

          {/* Feature Icons Row */}
          <motion.div
            className="flex justify-center space-x-16 mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            {[
              { icon: Brain, label: "AI Powered" },
              { icon: Zap, label: "Lightning Fast" },
              { icon: Target, label: "Precision" },
              { icon: CheckCircle, label: "Accurate" },
            ].map((item, index) => (
              <motion.div
                key={index}
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <item.icon className="h-10 w-10 text-white" />
                </motion.div>
                <div className="text-gray-200 font-medium">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Features Grid - 2x2 Layout */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24"
        >
          {[
            {
              icon: Zap,
              title: "Lightning Fast Processing",
              description:
                "Get comprehensive summaries in seconds with our advanced AI algorithms",
              gradient: "from-yellow-500 to-orange-500",
              bgGradient: "from-yellow-900/20 to-orange-900/30",
              borderColor: "border-yellow-500/30",
              detail: "Process documents up to 50MB instantly",
            },
            {
              icon: Brain,
              title: "Smart Key Extraction",
              description:
                "AI-powered analysis identifies and extracts the most important information",
              gradient: "from-emerald-500 to-green-500",
              bgGradient: "from-emerald-900/20 to-green-900/30",
              borderColor: "border-emerald-500/30",
              detail: "Advanced NLP understanding",
            },
            {
              icon: BarChart3,
              title: "Detailed Analytics",
              description:
                "Get comprehensive statistics about your document compression and analysis",
              gradient: "from-teal-500 to-cyan-500",
              bgGradient: "from-teal-900/20 to-cyan-900/30",
              borderColor: "border-teal-500/30",
              detail: "Word count, compression ratios & more",
            },
            {
              icon: Download,
              title: "Export & Share",
              description:
                "Download beautifully formatted PDF reports or share summaries instantly",
              gradient: "from-green-500 to-emerald-500",
              bgGradient: "from-green-900/20 to-emerald-900/30",
              borderColor: "border-green-500/30",
              detail: "Multiple export formats available",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.4 + index * 0.15, duration: 0.8 }}
              whileHover={{
                scale: 1.05,
                y: -15,
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <Card
                className={`bg-gradient-to-br ${feature.bgGradient} border-2 ${feature.borderColor} backdrop-blur-xl hover:shadow-2xl transition-all duration-500 h-full relative overflow-hidden group`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-10 relative">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.3 }}
                    transition={{ duration: 0.8 }}
                    className={`h-20 w-20 mb-8 p-5 rounded-2xl bg-gradient-to-r ${feature.gradient} shadow-xl`}
                  >
                    <feature.icon className="h-10 w-10 text-white" />
                  </motion.div>
                  <h3
                    className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${feature.gradient} mb-4`}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-gray-200 text-lg leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-gray-300 text-sm">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                    {feature.detail}
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-4 h-4 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full opacity-60"></div>
                  <div className="absolute bottom-4 left-4 w-4 h-4 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full opacity-60"></div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Error Alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -30 }}
              transition={{ duration: 0.4 }}
              className="mb-10"
            >
              <Alert className="bg-gradient-to-r from-red-900/60 to-pink-900/60 border-2 border-red-500/50 backdrop-blur-xl shadow-lg">
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

        {/* Enhanced Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border-2 border-emerald-500/30 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-green-500/10"></div>
            <CardHeader className="relative">
              <CardTitle className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400 flex items-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mr-5 p-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl"
                >
                  <FileText className="h-10 w-10 text-white" />
                </motion.div>
                Upload Your PDF Document
              </CardTitle>
              <CardDescription className="text-gray-300 text-xl">
                Upload any PDF document to get an intelligent summary with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400 font-semibold">
                  key insights extracted
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="border-4 border-dashed border-emerald-400/50 rounded-3xl p-20 text-center hover:border-emerald-300/70 transition-all duration-500 bg-gradient-to-br from-emerald-900/10 to-green-900/20 relative overflow-hidden"
              >
                {/* Animated background patterns */}
                <div className="absolute inset-0 opacity-10">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 8 + i * 2,
                        repeat: Infinity,
                        delay: i * 1,
                      }}
                      className="absolute w-16 h-16 border-2 border-emerald-400 rounded-lg"
                      style={{
                        left: `${Math.random() * 80}%`,
                        top: `${Math.random() * 80}%`,
                      }}
                    />
                  ))}
                </div>

                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="mb-10 relative z-10"
                >
                  <Upload className="h-32 w-32 text-emerald-400 mx-auto mb-8" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-6 relative z-10">
                  Drop your PDF here or click to browse
                </h3>
                <p className="text-gray-300 mb-10 text-xl relative z-10">
                  Supports PDF files up to 50MB
                </p>

                {/* Feature highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 relative z-10">
                  {[
                    { icon: File, text: "Any PDF Format" },
                    { icon: Gauge, text: "Up to 50MB" },
                    { icon: Clock, text: "Instant Processing" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.8 + index * 0.1 }}
                      className="flex items-center justify-center space-x-3 text-gray-300"
                    >
                      <item.icon className="h-5 w-5 text-emerald-400" />
                      <span className="text-sm font-medium">{item.text}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="relative z-10">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="pdf-upload"
                    disabled={isProcessing}
                  />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      disabled={isProcessing}
                      className="h-20 px-16 text-2xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-700 hover:via-green-700 hover:to-teal-700 pointer-events-none shadow-xl relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                      <span className="relative z-10">
                        {isProcessing ? (
                          <div className="flex items-center">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="w-8 h-8 border-3 border-white border-t-transparent rounded-full mr-4"
                            />
                            Processing...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Sparkles className="h-8 w-8 mr-4" />
                            Choose PDF File
                          </div>
                        )}
                      </span>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Processing Indicator */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -40 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <Card className="bg-gradient-to-br from-emerald-900/60 to-green-900/60 border-2 border-emerald-500/50 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/20 animate-pulse"></div>
                <CardContent className="p-16 text-center relative">
                  {/* Multi-layered spinner */}
                  <div className="relative mx-auto mb-12 w-32 h-32">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 rounded-full border-6 border-transparent border-t-emerald-400 border-r-green-400"
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-4 rounded-full border-6 border-transparent border-t-teal-400 border-l-emerald-400"
                    />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-8 rounded-full border-6 border-transparent border-t-green-400 border-b-cyan-400"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FileText className="h-12 w-12 text-emerald-400" />
                    </div>
                  </div>

                  <motion.h3
                    className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400 mb-8"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    AI Processing Your Document
                  </motion.h3>

                  <motion.p
                    className="text-gray-200 mb-6 text-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Our advanced AI is analyzing and extracting key insights...
                  </motion.p>

                  <motion.p
                    className="text-gray-400 mb-12 text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    This usually takes 10-30 seconds depending on document
                    length
                  </motion.p>

                  {/* Processing steps */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
                    {[
                      {
                        icon: FileText,
                        label: "Reading PDF",
                        color: "from-emerald-400 to-green-400",
                      },
                      {
                        icon: Brain,
                        label: "AI Analysis",
                        color: "from-green-400 to-teal-400",
                      },
                      {
                        icon: Layers,
                        label: "Extracting Key Points",
                        color: "from-teal-400 to-cyan-400",
                      },
                      {
                        icon: CheckCircle,
                        label: "Generating Summary",
                        color: "from-cyan-400 to-emerald-400",
                      },
                    ].map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.2 }}
                        className="text-center"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.4,
                          }}
                          className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center shadow-lg`}
                        >
                          <step.icon className="h-8 w-8 text-white" />
                        </motion.div>
                        <p className="text-gray-300 text-sm font-medium">
                          {step.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Enhanced Progress Bar */}
                  <div className="w-full max-w-2xl mx-auto">
                    <motion.div
                      className="h-6 bg-gray-700 rounded-full overflow-hidden relative"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-full"
                        animate={{
                          x: ["-100%", "100%"],
                          opacity: [0.8, 1, 0.8],
                        }}
                        transition={{
                          x: {
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                          opacity: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                        }}
                        style={{ width: "70%" }}
                      />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Results Section */}
        <AnimatePresence>
          {summaryResult && (
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -60, scale: 0.95 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-12"
            >
              {/* Stats Cards - Enhanced 3-column grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {[
                  {
                    icon: File,
                    title: "Original Words",
                    value: summaryResult.original_word_count.toLocaleString(),
                    gradient: "from-blue-500 to-cyan-500",
                    bgGradient: "from-blue-900/30 to-cyan-900/40",
                    borderColor: "border-blue-500/30",
                  },
                  {
                    icon: FileText,
                    title: "Summary Words",
                    value: summaryResult.summary_word_count.toLocaleString(),
                    gradient: "from-emerald-500 to-green-500",
                    bgGradient: "from-emerald-900/30 to-green-900/40",
                    borderColor: "border-emerald-500/30",
                  },
                  {
                    icon: TrendingUp,
                    title: "Compression Ratio",
                    value: `${summaryResult.compression_ratio.toFixed(1)}%`,
                    gradient: "from-teal-500 to-cyan-500",
                    bgGradient: "from-teal-900/30 to-cyan-900/40",
                    borderColor: "border-teal-500/30",
                  },
                ].map((stat, index) => (
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
                      className={`bg-gradient-to-br ${stat.bgGradient} border-2 ${stat.borderColor} backdrop-blur-xl shadow-xl h-full relative overflow-hidden group`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <CardContent className="p-8 text-center relative">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.8 }}
                          className={`w-16 h-16 mx-auto mb-6 p-4 rounded-full bg-gradient-to-r ${stat.gradient} shadow-lg`}
                        >
                          <stat.icon className="h-8 w-8 text-white" />
                        </motion.div>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: 0.6 + index * 0.1,
                            duration: 0.8,
                            type: "spring",
                          }}
                          className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient} mb-3`}
                        >
                          {stat.value}
                        </motion.div>
                        <div className="text-gray-300 text-lg font-medium">
                          {stat.title}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {/* Summary Content - Enhanced Layout */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <Card className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border-2 border-emerald-500/30 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-green-500/10"></div>
                  <CardHeader className="relative flex flex-row items-center justify-between p-10">
                    <div>
                      <CardTitle className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400 flex items-center mb-4">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="mr-5"
                        >
                          <Brain className="h-10 w-10 text-emerald-400" />
                        </motion.div>
                        AI Generated Summary
                      </CardTitle>
                      <CardDescription className="text-gray-300 text-xl">
                        Key insights and main points extracted from your
                        document using advanced AI analysis
                      </CardDescription>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={downloadReport}
                        size="lg"
                        className="h-16 px-10 text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 shadow-lg"
                      >
                        <Download className="h-6 w-6 mr-3" />
                        Download Report
                      </Button>
                    </motion.div>
                  </CardHeader>
                  <CardContent className="relative p-10">
                    <motion.div
                      className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 p-10 rounded-2xl border-2 border-gray-600/50 backdrop-blur-sm"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="prose prose-invert max-w-none">
                        {summaryResult.summary
                          .split("\n\n")
                          .map((paragraph, index) => (
                            <motion.p
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 1 + index * 0.1 }}
                              className="text-gray-200 mb-6 leading-relaxed text-lg font-medium"
                            >
                              {paragraph}
                            </motion.p>
                          ))}
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="text-center bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-3xl p-16 border-2 border-emerald-500/20"
              >
                <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400 mb-6">
                  Need to Summarize Another Document?
                </h3>
                <p className="text-gray-300 text-2xl mb-10">
                  Upload more PDFs to continue extracting insights and saving
                  time
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    onClick={() => window.location.reload()}
                    className="h-20 px-16 text-2xl font-bold bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 shadow-xl"
                  >
                    <ChevronRight className="h-8 w-8 mr-4" />
                    Summarize Another PDF
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
