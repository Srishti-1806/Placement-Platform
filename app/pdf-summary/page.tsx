"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, Download, AlertCircle, BookOpen, BarChart3, Zap } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion } from "framer-motion"

interface SummaryResult {
  summary: string
  original_word_count: number
  summary_word_count: number
  compression_ratio: number
  pdf_url: string
}

export default function PDFSummaryPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [summaryResult, setSummaryResult] = useState<SummaryResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file")
      return
    }

    setIsProcessing(true)
    setError(null)
    setSummaryResult(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/summarize-pdf", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Summarization failed")
      }

      const result = await response.json()
      setSummaryResult(result)
    } catch (err) {
      setError("Failed to summarize PDF. Please try again.")
      console.error("Summarization error:", err)
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadReport = () => {
    if (summaryResult?.pdf_url) {
      window.open(summaryResult.pdf_url, "_blank")
    }
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI PDF{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Summarizer
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform lengthy documents into concise, intelligent summaries using advanced AI technology. Save time and
            extract key insights instantly.
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
              <p className="text-gray-400 text-sm">Get summaries in seconds, not hours</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-md">
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-8 w-8 text-green-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Smart Analysis</h3>
              <p className="text-gray-400 text-sm">AI-powered key point extraction</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-md">
            <CardContent className="p-6 text-center">
              <Download className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Export Ready</h3>
              <p className="text-gray-400 text-sm">Download formatted PDF reports</p>
            </CardContent>
          </Card>
        </motion.div>

        {error && (
          <Alert className="mb-6 bg-red-900/50 border-red-700">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-200">{error}</AlertDescription>
          </Alert>
        )}

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-md mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <FileText className="h-5 w-5 mr-2 text-purple-400" />
                Upload Your PDF
              </CardTitle>
              <CardDescription className="text-gray-400">
                Upload a PDF document to get an intelligent summary with key insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center hover:border-purple-400 transition-colors">
                <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-300 mb-2">Drop your PDF here or click to browse</p>
                <p className="text-gray-500 mb-6">Supports PDF files up to 50MB</p>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="pdf-upload"
                    disabled={isProcessing}
                  />
                  <Button
                    disabled={isProcessing}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 pointer-events-none"
                  >
                    {isProcessing ? "Processing..." : "Choose PDF File"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Processing Indicator */}
        {isProcessing && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-8">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-md">
              <CardContent className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-white mb-2">Processing Your PDF</h3>
                <p className="text-gray-400 mb-4">Our AI is analyzing and summarizing your document...</p>
                <Progress value={66} className="w-full max-w-md mx-auto" />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Results Section */}
        {summaryResult && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-md">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-1">
                    {summaryResult.original_word_count.toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-sm">Original Words</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-md">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    {summaryResult.summary_word_count.toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-sm">Summary Words</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-md">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">
                    {summaryResult.compression_ratio.toFixed(1)}%
                  </div>
                  <div className="text-gray-400 text-sm">Compression Ratio</div>
                </CardContent>
              </Card>
            </div>

            {/* Summary Content */}
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">AI Generated Summary</CardTitle>
                  <CardDescription className="text-gray-400">
                    Key insights and main points extracted from your document
                  </CardDescription>
                </div>
                <Button
                  onClick={downloadReport}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-600">
                  <div className="prose prose-invert max-w-none">
                    {summaryResult.summary.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="text-gray-300 mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
