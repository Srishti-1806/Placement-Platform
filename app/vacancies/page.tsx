"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  Users,
  Star,
  ExternalLink,
  BookmarkPlus,
  Building,
  Calendar,
  DollarSign,
  TrendingUp,
  Globe,
  Phone,
  Mail,
  Award,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { InteractiveCard } from "@/components/interactive-card"
import { GalaxyHover } from "@/components/galaxy-hover"
import { useSound } from "@/hooks/use-sound"

interface RegionalJob {
  id: number
  title: string
  company: string
  location: string
  state: string
  city: string
  experience: string
  salary: string
  skills: string[]
  posted_date: string
  job_type: string
  remote: string
  description: string
  applicants?: number
  rating?: number
  contact_email?: string
  contact_phone?: string
  company_website?: string
  application_deadline?: string
  benefits: string[]
  requirements: string[]
}

const mockRegionalJobs: RegionalJob[] = [
  {
    id: 1,
    title: "Software Developer",
    company: "TechCorp Mumbai",
    location: "Mumbai, Maharashtra",
    state: "Maharashtra",
    city: "Mumbai",
    experience: "2-4 years",
    salary: "₹8-12 LPA",
    skills: ["React", "Node.js", "MongoDB", "JavaScript"],
    posted_date: "2 days ago",
    job_type: "Full-time",
    remote: "Hybrid",
    description:
      "We are looking for a skilled Software Developer to join our dynamic team in Mumbai. You will be responsible for developing web applications using modern technologies.",
    applicants: 45,
    rating: 4.2,
    contact_email: "hr@techcorp.com",
    contact_phone: "+91-9876543210",
    company_website: "https://techcorp.com",
    application_deadline: "2024-02-15",
    benefits: ["Health Insurance", "Flexible Hours", "Work from Home", "Performance Bonus"],
    requirements: ["Bachelor's in Computer Science", "2+ years React experience", "Strong problem-solving skills"],
  },
  {
    id: 2,
    title: "Data Analyst",
    company: "Analytics Pro Delhi",
    location: "New Delhi, Delhi",
    state: "Delhi",
    city: "New Delhi",
    experience: "1-3 years",
    salary: "₹6-9 LPA",
    skills: ["Python", "SQL", "Tableau", "Excel"],
    posted_date: "1 day ago",
    job_type: "Full-time",
    remote: "Office",
    description:
      "Join our data analytics team to help businesses make data-driven decisions. Experience with Python and SQL required.",
    applicants: 32,
    rating: 4.0,
    contact_email: "careers@analyticspro.com",
    contact_phone: "+91-9876543211",
    company_website: "https://analyticspro.com",
    application_deadline: "2024-02-20",
    benefits: ["Medical Coverage", "Learning Budget", "Team Outings", "Flexible Timing"],
    requirements: ["Bachelor's in Statistics/Math", "Python proficiency", "SQL knowledge", "Analytical mindset"],
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Design Studio Bangalore",
    location: "Bangalore, Karnataka",
    state: "Karnataka",
    city: "Bangalore",
    experience: "2-5 years",
    salary: "₹7-11 LPA",
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
    posted_date: "3 days ago",
    job_type: "Full-time",
    remote: "Remote",
    description:
      "Creative UI/UX Designer needed to design intuitive user interfaces and experiences for our digital products.",
    applicants: 28,
    rating: 4.5,
    contact_email: "design@designstudio.com",
    contact_phone: "+91-9876543212",
    company_website: "https://designstudio.com",
    application_deadline: "2024-02-18",
    benefits: ["Creative Freedom", "Latest Tools", "Remote Work", "Design Conferences"],
    requirements: ["Portfolio required", "Figma expertise", "User research experience", "Creative thinking"],
  },
  {
    id: 4,
    title: "Marketing Executive",
    company: "Brand Solutions Pune",
    location: "Pune, Maharashtra",
    state: "Maharashtra",
    city: "Pune",
    experience: "1-2 years",
    salary: "₹4-6 LPA",
    skills: ["Digital Marketing", "SEO", "Social Media", "Content Writing"],
    posted_date: "4 days ago",
    job_type: "Full-time",
    remote: "Hybrid",
    description:
      "Dynamic Marketing Executive to drive our digital marketing campaigns and brand awareness initiatives.",
    applicants: 52,
    rating: 3.8,
    contact_email: "marketing@brandsolutions.com",
    contact_phone: "+91-9876543213",
    company_website: "https://brandsolutions.com",
    application_deadline: "2024-02-22",
    benefits: ["Performance Incentives", "Training Programs", "Travel Opportunities", "Team Events"],
    requirements: [
      "Marketing degree preferred",
      "Digital marketing knowledge",
      "Creative mindset",
      "Communication skills",
    ],
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudTech Hyderabad",
    location: "Hyderabad, Telangana",
    state: "Telangana",
    city: "Hyderabad",
    experience: "3-6 years",
    salary: "₹10-15 LPA",
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins"],
    posted_date: "1 week ago",
    job_type: "Full-time",
    remote: "Office",
    description: "Experienced DevOps Engineer to manage our cloud infrastructure and deployment pipelines.",
    applicants: 38,
    rating: 4.3,
    contact_email: "devops@cloudtech.com",
    contact_phone: "+91-9876543214",
    company_website: "https://cloudtech.com",
    application_deadline: "2024-02-25",
    benefits: ["Cloud Certifications", "High Growth", "Stock Options", "Learning Budget"],
    requirements: ["AWS certification preferred", "Container experience", "CI/CD knowledge", "Problem-solving skills"],
  },
  {
    id: 6,
    title: "Business Analyst",
    company: "Consulting Group Chennai",
    location: "Chennai, Tamil Nadu",
    state: "Tamil Nadu",
    city: "Chennai",
    experience: "2-4 years",
    salary: "₹7-10 LPA",
    skills: ["Business Analysis", "SQL", "Power BI", "Process Improvement"],
    posted_date: "5 days ago",
    job_type: "Full-time",
    remote: "Hybrid",
    description: "Business Analyst to work with stakeholders and improve business processes through data analysis.",
    applicants: 41,
    rating: 4.1,
    contact_email: "ba@consultinggroup.com",
    contact_phone: "+91-9876543215",
    company_website: "https://consultinggroup.com",
    application_deadline: "2024-02-28",
    benefits: ["Client Exposure", "Skill Development", "Flexible Work", "Performance Bonus"],
    requirements: ["Business/IT background", "Analytical skills", "Stakeholder management", "Documentation skills"],
  },
]

const states = ["All States", "Maharashtra", "Delhi", "Karnataka", "Telangana", "Tamil Nadu", "Gujarat", "West Bengal"]
const jobTypes = ["All Types", "Full-time", "Part-time", "Contract", "Internship"]
const experienceLevels = ["All Experience", "0-1 years", "1-3 years", "2-5 years", "3-6 years", "5+ years"]

export default function RegionalJobsPage() {
  const [jobs, setJobs] = useState<RegionalJob[]>(mockRegionalJobs)
  const [filteredJobs, setFilteredJobs] = useState<RegionalJob[]>(mockRegionalJobs)
  const [loading, setLoading] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState("")
  const [selectedState, setSelectedState] = useState("All States")
  const [selectedJobType, setSelectedJobType] = useState("All Types")
  const [selectedExperience, setSelectedExperience] = useState("All Experience")
  const [selectedJob, setSelectedJob] = useState<RegionalJob | null>(null)
  const [activeTab, setActiveTab] = useState("search")

  const { playSound } = useSound()

  useEffect(() => {
    filterJobs()
  }, [searchKeyword, selectedState, selectedJobType, selectedExperience])

  const filterJobs = () => {
    let filtered = jobs

    if (searchKeyword) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          job.company.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          job.skills.some((skill) => skill.toLowerCase().includes(searchKeyword.toLowerCase())),
      )
    }

    if (selectedState !== "All States") {
      filtered = filtered.filter((job) => job.state === selectedState)
    }

    if (selectedJobType !== "All Types") {
      filtered = filtered.filter((job) => job.job_type === selectedJobType)
    }

    if (selectedExperience !== "All Experience") {
      filtered = filtered.filter((job) => job.experience.includes(selectedExperience.split(" ")[0]))
    }

    setFilteredJobs(filtered)
  }

  const handleJobClick = (job: RegionalJob) => {
    setSelectedJob(job)
    setActiveTab("details")
    playSound("hover")
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Regional Job Vacancies</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find job opportunities in your region with detailed company information and direct contact details
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="search">🔍 Search Jobs</TabsTrigger>
              <TabsTrigger value="details">📋 Job Details</TabsTrigger>
            </TabsList>

            <TabsContent value="search" className="space-y-8">
              {/* Search and Filters */}
              <InteractiveCard
                title="Find Regional Jobs"
                description="Search for opportunities in your preferred location"
                icon={<Search className="h-5 w-5 text-blue-400" />}
                glowColor="blue"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Job title, company, skills..."
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedJobType} onValueChange={setSelectedJobType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                    <SelectTrigger>
                      <SelectValue placeholder="Experience" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </InteractiveCard>

              {/* Results Summary */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredJobs.length} Jobs Found
                  {selectedState !== "All States" && ` in ${selectedState}`}
                </h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>Updated daily</span>
                </div>
              </div>

              {/* Jobs Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                                <CardTitle className="text-lg mb-2">{job.title}</CardTitle>
                                <div className="space-y-1">
                                  <div className="flex items-center text-sm text-gray-600">
                                    <Building className="h-4 w-4 mr-2" />
                                    {job.company}
                                  </div>
                                  <div className="flex items-center text-sm text-gray-600">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    {job.location}
                                  </div>
                                  <div className="flex items-center text-sm text-gray-600">
                                    <Briefcase className="h-4 w-4 mr-2" />
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
                            <div className="space-y-3">
                              <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>

                              <div className="flex flex-wrap gap-2">
                                {job.skills.slice(0, 3).map((skill, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                                {job.skills.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{job.skills.length - 3} more
                                  </Badge>
                                )}
                              </div>

                              <div className="flex items-center justify-between">
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
                                </div>
                                <Badge variant={job.remote === "Remote" ? "default" : "outline"} className="text-xs">
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

              {filteredJobs.length === 0 && (
                <div className="text-center py-12">
                  <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or filters</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="details" className="space-y-6">
              {selectedJob ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Job Details */}
                  <div className="lg:col-span-2 space-y-6">
                    <InteractiveCard
                      title="Job Information"
                      description="Complete job details and requirements"
                      icon={<Briefcase className="h-5 w-5 text-purple-400" />}
                      glowColor="purple"
                    >
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedJob.title}</h2>
                          <p className="text-lg text-gray-600">{selectedJob.company}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-sm">{selectedJob.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Briefcase className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-sm">{selectedJob.experience}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-sm">{selectedJob.job_type}</span>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-sm font-medium text-green-600">{selectedJob.salary}</span>
                            </div>
                            <div className="flex items-center">
                              <Globe className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-sm">{selectedJob.remote}</span>
                            </div>
                            {selectedJob.application_deadline && (
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-sm">Apply by {selectedJob.application_deadline}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Job Description</h3>
                          <p className="text-gray-600 leading-relaxed">{selectedJob.description}</p>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Required Skills</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedJob.skills.map((skill, idx) => (
                              <Badge key={idx} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Requirements</h3>
                          <ul className="space-y-2">
                            {selectedJob.requirements.map((req, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <span className="text-gray-600">{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Benefits</h3>
                          <div className="grid grid-cols-2 gap-2">
                            {selectedJob.benefits.map((benefit, idx) => (
                              <div key={idx} className="flex items-center">
                                <Award className="h-4 w-4 text-green-500 mr-2" />
                                <span className="text-sm text-gray-600">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </InteractiveCard>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-6">
                    <InteractiveCard
                      title="Contact Information"
                      description="Get in touch with the employer"
                      icon={<Phone className="h-5 w-5 text-green-400" />}
                      glowColor="green"
                    >
                      <div className="space-y-4">
                        {selectedJob.contact_email && (
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 text-gray-400 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500">Email</p>
                              <a href={`mailto:${selectedJob.contact_email}`} className="text-blue-600 hover:underline">
                                {selectedJob.contact_email}
                              </a>
                            </div>
                          </div>
                        )}

                        {selectedJob.contact_phone && (
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 text-gray-400 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500">Phone</p>
                              <a href={`tel:${selectedJob.contact_phone}`} className="text-blue-600 hover:underline">
                                {selectedJob.contact_phone}
                              </a>
                            </div>
                          </div>
                        )}

                        {selectedJob.company_website && (
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 text-gray-400 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500">Website</p>
                              <a
                                href={selectedJob.company_website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                Visit Company Site
                              </a>
                            </div>
                          </div>
                        )}

                        <div className="pt-4 space-y-2">
                          <Button className="w-full" size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Apply Now
                          </Button>
                          <Button variant="outline" className="w-full" size="sm">
                            <BookmarkPlus className="h-4 w-4 mr-2" />
                            Save Job
                          </Button>
                        </div>
                      </div>
                    </InteractiveCard>

                    <InteractiveCard
                      title="Job Statistics"
                      description="Application insights"
                      icon={<TrendingUp className="h-5 w-5 text-cyan-400" />}
                      glowColor="cyan"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Applicants</span>
                          <span className="font-medium">{selectedJob.applicants || 0}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Company Rating</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span className="font-medium">{selectedJob.rating || "N/A"}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Posted</span>
                          <span className="font-medium">{selectedJob.posted_date}</span>
                        </div>
                      </div>
                    </InteractiveCard>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No job selected</h3>
                  <p className="text-gray-600 mb-4">Go back to search and select a job to view details</p>
                  <Button onClick={() => setActiveTab("search")}>
                    <Search className="h-4 w-4 mr-2" />
                    Back to Search
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
