"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Youtube, Download, AlertCircle, Clock, Globe, FileText, Zap, Server } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion } from "framer-motion"

interface TranscriptResult {
  video_info: {
    title: string
    duration: number
  }
  transcript: {
    full_text: string
    segments: Array<{
      start: number
      end: number
      text: string
    }>
    language: string
  }
  pdf_url: string
}

export default function YouTubeConverterPage() {
  const [url, setUrl] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [transcriptResult, setTranscriptResult] = useState<TranscriptResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const formatTimestamp = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return

    setIsProcessing(true)
    setError(null)
    setTranscriptResult(null)

    try {
      console.log("Starting YouTube transcription for:", url)

      const response = await fetch("/api/youtube-transcript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url.trim() }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Transcription failed")
      }

      console.log("Transcription successful:", result)
      setTranscriptResult(result)
    } catch (err: any) {
      console.error("YouTube transcription error:", err)
      setError(err.message || "Failed to process YouTube video. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadTranscript = () => {
    if (transcriptResult?.pdf_url) {
      window.open(transcriptResult.pdf_url, "_blank")
    }
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-900 via-red-900 to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-red-600 to-pink-600 rounded-full">
              <Youtube className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            YouTube to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">Transcript</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Convert any YouTube video into a comprehensive transcript with timestamps. Perfect for studying,
            note-taking, and content analysis.
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
              <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-400 text-sm">AI-powered transcription in minutes</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-md">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Timestamped</h3>
              <p className="text-gray-400 text-sm">Precise timestamps for easy navigation</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-md">
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 text-green-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">PDF Export</h3>
              <p className="text-gray-400 text-sm">Download formatted transcripts</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Backend Status Alert */}
        <Alert className="mb-6 bg-blue-900/50 border-blue-700">
          <Server className="h-4 w-4" />
          <AlertDescription className="text-blue-200">
            <strong>Note:</strong> Make sure the Python backend server is running on port 8000 for YouTube transcription
            to work.
            <br />
            Run: <code className="bg-blue-800 px-2 py-1 rounded text-xs">python main.py</code>
          </AlertDescription>
        </Alert>

        {error && (
          <Alert className="mb-6 bg-red-900/50 border-red-700">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-200">{error}</AlertDescription>
          </Alert>
        )}

        {/* URL Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-md mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Youtube className="h-5 w-5 mr-2 text-red-400" />
                Enter YouTube URL
              </CardTitle>
              <CardDescription className="text-gray-400">
                Paste any YouTube video URL to generate a transcript with timestamps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="youtube-url" className="text-gray-300">
                    YouTube URL
                  </Label>
                  <Input
                    id="youtube-url"
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-400"
                    disabled={isProcessing}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isProcessing || !url.trim()}
                  className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                >
                  {isProcessing ? "Processing..." : "Generate Transcript"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Processing Indicator */}
        {isProcessing && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-8">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-md">
              <CardContent className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-400 mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-white mb-2">Processing YouTube Video</h3>
                <p className="text-gray-400 mb-4">Downloading audio and generating transcript...</p>
                <p className="text-sm text-gray-500 mb-4">This may take a few minutes depending on video length</p>
                <Progress value={60} className="w-full max-w-md mx-auto" />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Results Section */}
        {transcriptResult && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Video Info */}
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">Video Information</CardTitle>
                  <CardDescription className="text-gray-400">Details about the processed video</CardDescription>
                </div>
                <Button
                  onClick={downloadTranscript}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-sm text-gray-400">Title</p>
                      <p className="text-white font-medium">{transcriptResult.video_info.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="text-sm text-gray-400">Duration</p>
                      <p className="text-white font-medium">{formatDuration(transcriptResult.video_info.duration)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="text-sm text-gray-400">Language</p>
                      <p className="text-white font-medium">{transcriptResult.transcript.language}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Full Transcript */}
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white">Full Transcript</CardTitle>
                <CardDescription className="text-gray-400">Complete transcript of the video content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-600 max-h-96 overflow-y-auto">
                  <p className="text-gray-300 leading-relaxed">{transcriptResult.transcript.full_text}</p>
                </div>
              </CardContent>
            </Card>

            {/* Timestamped Segments */}
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white">Timestamped Segments</CardTitle>
                <CardDescription className="text-gray-400">
                  Transcript broken down by timestamps for easy navigation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-600 max-h-96 overflow-y-auto space-y-4">
                  {transcriptResult.transcript.segments.map((segment, index) => (
                    <div key={index} className="border-l-2 border-red-400 pl-4">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-red-400 font-mono text-sm">
                          {formatTimestamp(segment.start)} - {formatTimestamp(segment.end)}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{segment.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
