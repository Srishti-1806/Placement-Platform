"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Upload, Video, Mic, Play, BarChart3, TrendingUp, Download, AlertCircle, Brain, Target } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion } from "framer-motion"

interface AnalysisResult {
  transcript: string
  speech_score: number
  body_language_score: number
  total_score: number
  feedback: string
  pdf_url: string
}

export default function SpeechAnalyzerPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsAnalyzing(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("http://localhost:8000/api/analyze-speech", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Analysis failed")
      }

      const result = await response.json()
      setAnalysisResults(result)
    } catch (err) {
      setError("Failed to analyze video. Please try again.")
      console.error("Analysis error:", err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleWebcamRecording = async () => {
    setIsRecording(true)
    setError(null)

    try {
      const response = await fetch("/api/record-webcam", {
        method: "GET",
      })

      if (!response.ok) {
        throw new Error("Recording failed")
      }

      const result = await response.json()
      setAnalysisResults(result)
    } catch (err) {
      setError("Failed to record and analyze. Please try again.")
      console.error("Recording error:", err)
    } finally {
      setIsRecording(false)
    }
  }

  const downloadReport = () => {
    if (analysisResults?.pdf_url) {
      window.open(analysisResults.pdf_url, "_blank")
    }
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
              <Brain className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI Speech &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Gesture Analyzer
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get detailed analysis of your speech patterns, word fillers, modulation, and body language to improve your
            interview performance with cutting-edge AI technology.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-md">
            <CardContent className="p-6 text-center">
              <Mic className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Speech Analysis</h3>
              <p className="text-gray-400 text-sm">Advanced voice pattern recognition</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-md">
            <CardContent className="p-6 text-center">
              <Video className="h-8 w-8 text-purple-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Gesture Detection</h3>
              <p className="text-gray-400 text-sm">Computer vision body language analysis</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-md">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-green-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">AI Feedback</h3>
              <p className="text-gray-400 text-sm">Personalized improvement suggestions</p>
            </CardContent>
          </Card>
        </motion.div>

        {error && (
          <Alert className="mb-6 bg-red-900/50 border-red-700">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-200">{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-800/50 border-gray-700">
            <TabsTrigger value="upload" className="flex items-center space-x-2 data-[state=active]:bg-blue-600">
              <Upload className="h-4 w-4" />
              <span>Upload Video</span>
            </TabsTrigger>
            <TabsTrigger value="live" className="flex items-center space-x-2 data-[state=active]:bg-purple-600">
              <Video className="h-4 w-4" />
              <span>Live Analysis</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Upload className="h-5 w-5 mr-2 text-blue-400" />
                    Upload Your Video
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Upload a video file to get comprehensive speech and gesture analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center hover:border-blue-400 transition-colors">
                    <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-300 mb-2">Drop your video here or click to browse</p>
                    <p className="text-gray-500 mb-6">Supports MP4, MOV, AVI files up to 100MB</p>
                    <div className="relative">
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        id="video-upload"
                        disabled={isAnalyzing}
                      />
                      <Button
                        disabled={isAnalyzing}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 pointer-events-none"
                      >
                        {isAnalyzing ? "Analyzing..." : "Choose File"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="live" className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Video className="h-5 w-5 mr-2 text-purple-400" />
                    Live Speech Analysis
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Start recording to get real-time feedback on your speech and gestures
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg aspect-video flex items-center justify-center mb-6 border border-gray-700">
                    <div className="text-center text-white">
                      <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Camera will appear here</p>
                      <p className="text-sm text-gray-400 mt-2">Recording duration: 10 seconds</p>
                    </div>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <Button
                      size="lg"
                      variant={isRecording ? "destructive" : "default"}
                      onClick={handleWebcamRecording}
                      disabled={isRecording}
                      className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      <Mic className="h-5 w-5" />
                      <span>{isRecording ? "Recording..." : "Start Recording"}</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Processing Indicator */}
        {isAnalyzing && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-8">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-md">
              <CardContent className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-white mb-2">Analyzing Your Video</h3>
                <p className="text-gray-400 mb-4">Our AI is processing speech patterns and body language...</p>
                <Progress value={75} className="w-full max-w-md mx-auto" />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Analysis Results */}
        {analysisResults && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-12 space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Analysis Results</h2>
              <Button
                onClick={downloadReport}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                <Download className="h-4 w-4" />
                <span>Download Report</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 border-blue-700 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <BarChart3 className="h-5 w-5 text-blue-400" />
                    <span>Speech Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Speech Score</span>
                        <span className="font-medium text-white">{analysisResults.speech_score}/100</span>
                      </div>
                      <Progress value={analysisResults.speech_score} className="h-3" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 border-purple-700 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <TrendingUp className="h-5 w-5 text-purple-400" />
                    <span>Body Language</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Posture Score</span>
                        <span className="font-medium text-white">{analysisResults.body_language_score}/100</span>
                      </div>
                      <Progress value={analysisResults.body_language_score} className="h-3" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-900/50 to-green-800/50 border-green-700 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <Play className="h-5 w-5 text-green-400" />
                    <span>Overall Score</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Total Score</span>
                        <span className="font-medium text-white">
                          {Math.round(analysisResults.total_score / 2)}/100
                        </span>
                      </div>
                      <Progress value={analysisResults.total_score / 2} className="h-3" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Transcript */}
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white">Transcript</CardTitle>
                <CardDescription className="text-gray-400">AI-generated transcript of your speech</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-600">
                  <p className="text-gray-300 leading-relaxed">{analysisResults.transcript}</p>
                </div>
              </CardContent>
            </Card>

            {/* AI Feedback */}
            <Card className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-700 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-indigo-400" />
                  AI Feedback & Recommendations
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Personalized insights to improve your presentation skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-indigo-950/50 p-6 rounded-lg border border-indigo-600">
                  <p className="text-gray-300 leading-relaxed">{analysisResults.feedback}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
