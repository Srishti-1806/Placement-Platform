"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  Users,
  Star,
  Filter,
  ExternalLink,
  BookmarkPlus,
  Calculator,
  Zap,
  TrendingUp,
  Building,
  Target,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { InteractiveCard } from "@/components/interactive-card"
import { GalaxyHover } from "@/components/galaxy-hover"
import { useSound } from "@/hooks/use-sound"

interface Job {
  id: number
  title: string
  company: string
  location: string
  experience: string
  salary: string
  skills: string[]
  posted_date: string
  job_type: string
  remote: string
  description: string
  applicants?: number
  rating?: number
}

interface ATSResult {
  overall_score: number
  keyword_match: number
  matched_keywords: string[]
  missing_keywords: string[]
  recommendations: string[]
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState("")
  const [searchLocation, setSearchLocation] = useState("")
  const [experienceFilter, setExperienceFilter] = useState("")
  const [jobTypeFilter, setJobTypeFilter] = useState("")
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [showATSCalculator, setShowATSCalculator] = useState(false)
  const [resumeText, setResumeText] = useState("")
  const [atsResult, setATSResult] = useState<ATSResult | null>(null)
  const [atsLoading, setATSLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const { playSound } = useSound()

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async (page = 1) => {
    setLoading(true)
    playSound("click")

    try {
      const params = new URLSearchParams({
        keyword: searchKeyword,
        location: searchLocation,
        experience: experienceFilter,
        jobType: jobTypeFilter,
        page: page.toString(),
        limit: "20",
      })

      const response = await fetch(`/api/jobs?${params}`)
      const data = await response.json()

      if (data.success) {
        setJobs(data.jobs)
        setFilteredJobs(data.jobs)
        setTotalPages(data.totalPages)
        setCurrentPage(page)
      }
    } catch (error) {
      console.error("Error fetching jobs:", error)
    } finally {
      setLoading(false)
    }
  }

  const calculateATS = async () => {
    if (!selectedJob || !resumeText.trim()) {
      playSound("error")
      alert("Please select a job and enter your resume text")
      return
    }

    setATSLoading(true)
    playSound("click")

    try {
      const response = await fetch("/api/ats-calculator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText: resumeText.trim(),
          jobDescription: `${selectedJob.title} ${selectedJob.description} ${selectedJob.skills.join(" ")} ${selectedJob.company}`,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setATSResult(data)
        playSound("success")
      } else {
        console.error("ATS calculation failed:", data.error)
        playSound("error")
        alert("Failed to calculate ATS score. Please try again.")
      }
    } catch (error) {
      console.error("Error calculating ATS score:", error)
      playSound("error")
      alert("Network error. Please check your connection and try again.")
    } finally {
      setATSLoading(false)
    }
  }

  const handleSearch = () => {
    fetchJobs(1)
  }

  const handleJobClick = (job: Job) => {
    setSelectedJob(job)
    setShowATSCalculator(false)
    setATSResult(null)
    playSound("hover")
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Job Portal</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find your dream job with AI-powered matching and ATS score analysis
            </p>
          </div>

          {/* Search Section */}
          <InteractiveCard
            title="Search Jobs"
            description="Find opportunities that match your skills"
            icon={<Search className="h-5 w-5 text-blue-400" />}
            glowColor="blue"
            className="mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Job title, skills..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Location"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Experience</SelectItem>
                  <SelectItem value="0-1">0-1 years</SelectItem>
                  <SelectItem value="1-3">1-3 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="5+">5+ years</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleSearch} disabled={loading} className="w-full">
                {loading ? "Searching..." : "Search Jobs"}
              </Button>
            </div>
          </InteractiveCard>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Jobs List */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{filteredJobs.length} Jobs Found</h2>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <AnimatePresence>
                  {filteredJobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <GalaxyHover>
                        <Card
                          className={`cursor-pointer transition-all hover:shadow-lg ${
                            selectedJob?.id === job.id ? "ring-2 ring-blue-500" : ""
                          }`}
                          onClick={() => handleJobClick(job)}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-lg mb-1">{job.title}</CardTitle>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                  <div className="flex items-center">
                                    <Building className="h-4 w-4 mr-1" />
                                    {job.company}
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {job.location}
                                  </div>
                                  <div className="flex items-center">
                                    <Briefcase className="h-4 w-4 mr-1" />
                                    {job.experience}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-semibold text-green-600 mb-1">{job.salary}</div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {job.posted_date}
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="flex items-center justify-between">
                              <div className="flex flex-wrap gap-2">
                                {job.skills.slice(0, 4).map((skill, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                                {job.skills.length > 4 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{job.skills.length - 4} more
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center space-x-3 text-sm text-gray-500">
                                {job.applicants && (
                                  <div className="flex items-center">
                                    <Users className="h-3 w-3 mr-1" />
                                    {job.applicants}
                                  </div>
                                )}
                                {job.rating && (
                                  <div className="flex items-center">
                                    <Star className="h-3 w-3 mr-1 text-yellow-400" />
                                    {job.rating}
                                  </div>
                                )}
                                <Badge variant={job.remote === "remote" ? "default" : "outline"} className="text-xs">
                                  {job.remote}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </GalaxyHover>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => fetchJobs(currentPage - 1)}
                    disabled={currentPage === 1 || loading}
                  >
                    Previous
                  </Button>
                  <span className="flex items-center px-4 py-2 text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => fetchJobs(currentPage + 1)}
                    disabled={currentPage === totalPages || loading}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>

            {/* Job Details & ATS Calculator */}
            <div className="lg:col-span-1">
              {selectedJob ? (
                <div className="space-y-6">
                  {/* Job Details */}
                  <InteractiveCard
                    title="Job Details"
                    description="Complete job information"
                    icon={<Briefcase className="h-5 w-5 text-purple-400" />}
                    glowColor="purple"
                  >
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg">{selectedJob.title}</h3>
                        <p className="text-gray-600">{selectedJob.company}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Location:</span>
                          <p className="font-medium">{selectedJob.location}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Experience:</span>
                          <p className="font-medium">{selectedJob.experience}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Salary:</span>
                          <p className="font-medium text-green-600">{selectedJob.salary}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Type:</span>
                          <p className="font-medium">{selectedJob.job_type}</p>
                        </div>
                      </div>

                      <div>
                        <span className="text-gray-500 text-sm">Required Skills:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedJob.skills.map((skill, idx) => (
                            <Badge key={idx} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-gray-500 text-sm">Description:</span>
                        <p className="text-sm mt-1">{selectedJob.description}</p>
                      </div>

                      <div className="flex space-x-2">
                        <Button className="flex-1" size="sm">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Apply Now
                        </Button>
                        <Button variant="outline" size="sm">
                          <BookmarkPlus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </InteractiveCard>

                  {/* ATS Calculator */}
                  <InteractiveCard
                    title="ATS Score Calculator"
                    description="Check how well your resume matches"
                    icon={<Calculator className="h-5 w-5 text-cyan-400" />}
                    glowColor="cyan"
                  >
                    <Tabs value={showATSCalculator ? "calculator" : "info"} className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="info" onClick={() => setShowATSCalculator(false)}>
                          Info
                        </TabsTrigger>
                        <TabsTrigger value="calculator" onClick={() => setShowATSCalculator(true)}>
                          Calculate
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="info" className="space-y-4">
                        <div className="text-center">
                          <Target className="h-12 w-12 text-cyan-400 mx-auto mb-3" />
                          <h3 className="font-semibold mb-2">ATS Compatibility</h3>
                          <p className="text-sm text-gray-600 mb-4">
                            Check how well your resume matches this job description using AI analysis.
                          </p>
                          <Button onClick={() => setShowATSCalculator(true)} className="w-full">
                            <Zap className="h-4 w-4 mr-2" />
                            Start Analysis
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="calculator" className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Paste Your Resume Text:
                          </label>
                          <Textarea
                            placeholder="Copy and paste your resume content here..."
                            value={resumeText}
                            onChange={(e) => setResumeText(e.target.value)}
                            rows={6}
                            className="text-sm"
                          />
                        </div>

                        <Button onClick={calculateATS} disabled={!resumeText.trim() || atsLoading} className="w-full">
                          {atsLoading ? "Analyzing..." : "Calculate ATS Score"}
                        </Button>

                        {atsResult && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                          >
                            <div className="text-center">
                              <div className="text-3xl font-bold text-cyan-400 mb-2">{atsResult.overall_score}%</div>
                              <Progress value={atsResult.overall_score} className="mb-4" />
                              <p className="text-sm text-gray-600">Keyword Match: {atsResult.keyword_match}%</p>
                            </div>

                            {atsResult.matched_keywords.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium text-green-600 mb-2">✅ Matched Keywords:</h4>
                                <div className="flex flex-wrap gap-1">
                                  {atsResult.matched_keywords.map((keyword, idx) => (
                                    <Badge key={idx} variant="secondary" className="text-xs">
                                      {keyword}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {atsResult.missing_keywords.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium text-red-600 mb-2">❌ Missing Keywords:</h4>
                                <div className="flex flex-wrap gap-1">
                                  {atsResult.missing_keywords.map((keyword, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {keyword}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-2">💡 Recommendations:</h4>
                              <ul className="text-xs text-gray-600 space-y-1">
                                {atsResult.recommendations.map((rec, idx) => (
                                  <li key={idx}>• {rec}</li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </InteractiveCard>
                </div>
              ) : (
                <InteractiveCard
                  title="Select a Job"
                  description="Click on any job to see details and calculate ATS score"
                  icon={<TrendingUp className="h-5 w-5 text-gray-400" />}
                  glowColor="gray"
                >
                  <div className="text-center py-8">
                    <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Choose a job from the list to view details and analyze your resume compatibility.
                    </p>
                  </div>
                </InteractiveCard>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
