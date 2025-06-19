"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { FileIcon as FileUser, Download, Eye, Palette, Plus, Trash2, Star, Zap, Award } from "lucide-react"
import { motion } from "framer-motion"
import { InteractiveCard } from "@/components/interactive-card"

const templates = [
  {
    id: 1,
    name: "Executive Pro",
    preview: "/placeholder.svg?height=300&width=200",
    color: "blue",
    premium: true,
    description: "Perfect for senior roles",
  },
  {
    id: 2,
    name: "Tech Modern",
    preview: "/placeholder.svg?height=300&width=200",
    color: "green",
    premium: false,
    description: "Ideal for tech professionals",
  },
  {
    id: 3,
    name: "Creative Edge",
    preview: "/placeholder.svg?height=300&width=200",
    color: "purple",
    premium: true,
    description: "Stand out in creative fields",
  },
  {
    id: 4,
    name: "Minimal Clean",
    preview: "/placeholder.svg?height=300&width=200",
    color: "gray",
    premium: false,
    description: "Clean and professional",
  },
]

export default function ResumeBuilderPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0])
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    portfolio: "",

    // Professional
    summary: "",
    experience: [{ company: "", position: "", duration: "", description: "" }],
    education: [{ institution: "", degree: "", year: "", gpa: "" }],
    skills: [],
    projects: [{ name: "", description: "", technologies: "", link: "" }],
    certifications: [{ name: "", issuer: "", date: "" }],

    // Additional
    languages: [],
    achievements: [],
    interests: "",
  })

  const [newSkill, setNewSkill] = useState("")
  const [atsScore, setAtsScore] = useState(0)

  const steps = [
    { id: 0, title: "Personal Info", icon: FileUser },
    { id: 1, title: "Experience", icon: Award },
    { id: 2, title: "Education", icon: Star },
    { id: 3, title: "Skills", icon: Zap },
    { id: 4, title: "Preview", icon: Eye },
  ]

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }))
  }

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, { company: "", position: "", duration: "", description: "" }],
    }))
  }

  const updateExperience = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, i) => (i === index ? { ...exp, [field]: value } : exp)),
    }))
  }

  const calculateATS = () => {
    let score = 0
    if (formData.fullName) score += 10
    if (formData.email) score += 10
    if (formData.phone) score += 10
    if (formData.summary) score += 15
    if (formData.experience[0].company) score += 20
    if (formData.skills.length > 0) score += 15
    if (formData.education[0].institution) score += 10
    if (formData.projects[0].name) score += 10

    setAtsScore(score)
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Professional Resume Builder</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create ATS-optimized resumes with AI-powered suggestions and professional templates.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-center space-x-4 mb-4">
              {steps.map((step, index) => (
                <motion.button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    currentStep === step.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <step.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{step.title}</span>
                </motion.button>
              ))}
            </div>
            <Progress value={(currentStep + 1) * 20} className="max-w-md mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Template Selection */}
            <div className="lg:col-span-1">
              <InteractiveCard
                title="Choose Template"
                description="Select a professional template"
                icon={<Palette className="h-5 w-5 text-purple-400" />}
                glowColor="purple"
              >
                <div className="grid grid-cols-1 gap-4">
                  {templates.map((template) => (
                    <motion.div
                      key={template.id}
                      className={`cursor-pointer rounded-lg border-2 p-3 transition-all ${
                        selectedTemplate.id === template.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedTemplate(template)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">{template.name}</p>
                        {template.premium && (
                          <Badge variant="secondary" className="text-xs">
                            <Star className="h-3 w-3 mr-1" />
                            Pro
                          </Badge>
                        )}
                      </div>
                      <img
                        src={template.preview || "/placeholder.svg"}
                        alt={template.name}
                        className="w-full h-24 object-cover rounded mb-2"
                      />
                      <p className="text-xs text-gray-600">{template.description}</p>
                    </motion.div>
                  ))}
                </div>
              </InteractiveCard>
            </div>

            {/* Form Content */}
            <div className="lg:col-span-2">
              <InteractiveCard
                title="Resume Information"
                description="Fill in your details step by step"
                icon={<FileUser className="h-5 w-5 text-cyan-400" />}
                glowColor="cyan"
              >
                <Tabs value={currentStep.toString()} className="w-full">
                  {/* Personal Info */}
                  <TabsContent value="0" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="Mumbai, India"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea
                        id="summary"
                        value={formData.summary}
                        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                        placeholder="Brief summary of your professional background..."
                        rows={4}
                      />
                    </div>
                  </TabsContent>

                  {/* Experience */}
                  <TabsContent value="1" className="space-y-4">
                    {formData.experience.map((exp, index) => (
                      <Card key={index} className="p-4 bg-gray-50">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label>Company</Label>
                            <Input
                              value={exp.company}
                              onChange={(e) => updateExperience(index, "company", e.target.value)}
                              placeholder="Company Name"
                            />
                          </div>
                          <div>
                            <Label>Position</Label>
                            <Input
                              value={exp.position}
                              onChange={(e) => updateExperience(index, "position", e.target.value)}
                              placeholder="Job Title"
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <Label>Duration</Label>
                          <Input
                            value={exp.duration}
                            onChange={(e) => updateExperience(index, "duration", e.target.value)}
                            placeholder="Jan 2020 - Present"
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(index, "description", e.target.value)}
                            placeholder="Describe your responsibilities and achievements..."
                            rows={3}
                          />
                        </div>
                      </Card>
                    ))}
                    <Button onClick={addExperience} variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Experience
                    </Button>
                  </TabsContent>

                  {/* Skills */}
                  <TabsContent value="3" className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill..."
                        onKeyPress={(e) => e.key === "Enter" && addSkill()}
                      />
                      <Button onClick={addSkill}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                          <span>{skill}</span>
                          <button onClick={() => removeSkill(index)} className="ml-1 hover:text-red-500">
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                  >
                    Previous
                  </Button>
                  <Button onClick={() => setCurrentStep(Math.min(4, currentStep + 1))} disabled={currentStep === 4}>
                    Next
                  </Button>
                </div>
              </InteractiveCard>
            </div>

            {/* Preview & ATS Score */}
            <div className="lg:col-span-1 space-y-6">
              {/* ATS Score */}
              <InteractiveCard
                title="ATS Score"
                description="Applicant Tracking System compatibility"
                icon={<Zap className="h-5 w-5 text-yellow-400" />}
                glowColor="yellow"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">{atsScore}%</div>
                  <Progress value={atsScore} className="mb-4" />
                  <Button onClick={calculateATS} size="sm" className="w-full">
                    Calculate Score
                  </Button>
                </div>
              </InteractiveCard>

              {/* Preview */}
              <InteractiveCard
                title="Live Preview"
                description="See how your resume looks"
                icon={<Eye className="h-5 w-5 text-green-400" />}
                glowColor="green"
              >
                <div className="bg-white border rounded-lg p-4 shadow-sm min-h-[400px]">
                  <div className="text-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">{formData.fullName || "Your Name"}</h2>
                    <p className="text-gray-600 text-sm">{formData.email || "your.email@example.com"}</p>
                    <p className="text-gray-600 text-sm">{formData.phone || "+91 98765 43210"}</p>
                  </div>

                  {formData.summary && (
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-900 mb-2 text-sm">Summary</h3>
                      <p className="text-xs text-gray-700">{formData.summary}</p>
                    </div>
                  )}

                  {formData.skills.length > 0 && (
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-900 mb-2 text-sm">Skills</h3>
                      <div className="flex flex-wrap gap-1">
                        {formData.skills.slice(0, 6).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-gray-500 text-center mt-8">Complete the form to see full preview</div>
                </div>

                <div className="flex space-x-2 mt-4">
                  <Button className="flex-1" size="sm">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                  <Button variant="outline" className="flex-1" size="sm">
                    <Eye className="h-3 w-3 mr-1" />
                    Full View
                  </Button>
                </div>
              </InteractiveCard>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
