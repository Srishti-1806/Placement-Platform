"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, Download, AlertCircle, BookOpen, BarChart3, Zap } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion } from "framer-motion"

import { useEffect } from "react"

export default function ATSCalculatorPage() {
  const [resumeText, setResumeText] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleCalculate = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/ats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resume: resumeText, job: jobDescription }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Error calculating ATS score", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <Card className="p-4">
        <CardHeader>
          <CardTitle>📄 ATS Resume Score Checker</CardTitle>
          <CardDescription>Paste your resume and job description to calculate your ATS score.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea
            className="w-full p-2 border rounded-md"
            rows={6}
            placeholder="Paste your resume text here"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />
          <textarea
            className="w-full p-2 border rounded-md"
            rows={6}
            placeholder="Paste the job description here"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <Button onClick={handleCalculate} disabled={loading}>
            {loading ? "Analyzing..." : "Calculate ATS Score"} <Zap className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>📊 ATS Report</CardTitle>
              <CardDescription>Your resume has been evaluated based on similarity and keyword matching.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Overall ATS Score</span>
                  <span>{result.overall_score}%</span>
                </div>
                <Progress value={result.overall_score} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2"><BarChart3 /> Keyword Match</h3>
                  <p>{result.keyword_match}% match</p>
                  <p className="text-sm text-muted-foreground">Matched: {result.matched_keywords.join(", ")}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2"><AlertCircle /> Missing Keywords</h3>
                  <p className="text-sm text-muted-foreground">{result.missing_keywords.join(", ")}</p>
                </div>
              </div>

              <Alert>
                <BookOpen className="h-4 w-4 mr-2" />
                <AlertDescription>
                  {result.recommendations.map((rec: string, index: number) => (
                    <div key={index}>{rec}</div>
                  ))}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
