"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  FileIcon as FileUser,
  Download,
  Eye,
  Palette,
  Plus,
  Trash2,
  Star,
  Zap,
  Award,
  Sparkles,
  Trophy,
  Target,
  Bot,
} from "lucide-react";
import { motion } from "framer-motion";
import { InteractiveCard } from "@/components/interactive-card";
import { AuthGuard } from "@/components/auth-guard";

const templates = [
  {
    id: 1,
    name: "Executive Pro",
    preview: "/placeholder.svg?height=300&width=200",
    color: "purple",
    premium: true,
    description: "Perfect for senior roles",
    glowColor: "purple" as const,
  },
  {
    id: 2,
    name: "Tech Modern",
    preview: "/placeholder.svg?height=300&width=200",
    color: "cyan",
    premium: false,
    description: "Ideal for tech professionals",
    glowColor: "cyan" as const,
  },
  {
    id: 3,
    name: "Creative Edge",
    preview: "/placeholder.svg?height=300&width=200",
    color: "pink",
    premium: true,
    description: "Stand out in creative fields",
    glowColor: "pink" as const,
  },
  {
    id: 4,
    name: "Minimal Clean",
    preview: "/placeholder.svg?height=300&width=200",
    color: "yellow",
    premium: false,
    description: "Clean and professional",
    glowColor: "yellow" as const,
  },
];

export default function ResumeBuilderPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    portfolio: "",
    summary: "",
    experience: [{ company: "", position: "", duration: "", description: "" }],
    education: [{ institution: "", degree: "", year: "", gpa: "" }],
    skills: [],
    projects: [{ name: "", description: "", technologies: "", link: "" }],
    certifications: [{ name: "", issuer: "", date: "" }],
    languages: [],
    achievements: [],
    interests: "",
  });

  const [newSkill, setNewSkill] = useState("");
  const [atsScore, setAtsScore] = useState(0);

  const steps = [
    {
      id: 0,
      title: "Personal Info",
      icon: FileUser,
      color: "from-purple-400 to-purple-600",
    },
    {
      id: 1,
      title: "Experience",
      icon: Award,
      color: "from-cyan-400 to-cyan-600",
    },
    {
      id: 2,
      title: "Education",
      icon: Star,
      color: "from-yellow-400 to-yellow-600",
    },
    { id: 3, title: "Skills", icon: Zap, color: "from-pink-400 to-pink-600" },
    {
      id: 4,
      title: "Preview",
      icon: Eye,
      color: "from-green-400 to-green-600",
    },
  ];

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { company: "", position: "", duration: "", description: "" },
      ],
    }));
  };

  const updateExperience = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp,
      ),
    }));
  };

  const calculateATS = () => {
    let score = 0;
    if (formData.fullName) score += 10;
    if (formData.email) score += 10;
    if (formData.phone) score += 10;
    if (formData.summary) score += 15;
    if (formData.experience[0].company) score += 20;
    if (formData.skills.length > 0) score += 15;
    if (formData.education[0].institution) score += 10;
    if (formData.projects[0].name) score += 10;

    setAtsScore(score);
  };

  return (
    <AuthGuard>
      <div className="min-h-screen pt-20 px-4 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-rose-900/15 via-gray-900 to-cyan-900/20" />
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-900/10 via-transparent to-purple-800/15" />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                i % 3 === 0
                  ? "bg-pink-400/30"
                  : i % 3 === 1
                    ? "bg-rose-400/25"
                    : "bg-cyan-400/30"
              }`}
              animate={{
                x: [0, Math.random() * 100, Math.random() * -100, 0],
                y: [0, Math.random() * -100, Math.random() * 100, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: Math.random() * 12 + 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Hero Section */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center justify-center mb-6"
              >
                <Sparkles className="h-8 w-8 text-cyan-400 mr-3" />
                <span className="text-cyan-400 font-medium text-lg">
                  Career Galaxy
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              >
                <span className="text-white">Professional</span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                  Resume Builder
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
              >
                Create ATS-optimized resumes with AI-powered suggestions and
                professional templates. Stand out from the competition with
                beautiful, modern designs.
              </motion.p>

              {/* Feature highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12"
              >
                {[
                  {
                    icon: <Bot className="h-6 w-6" />,
                    label: "AI-Powered",
                    color: "from-purple-400 to-purple-600",
                  },
                  {
                    icon: <Target className="h-6 w-6" />,
                    label: "ATS-Optimized",
                    color: "from-cyan-400 to-cyan-600",
                  },
                  {
                    icon: <Trophy className="h-6 w-6" />,
                    label: "Pro Templates",
                    color: "from-yellow-400 to-yellow-600",
                  },
                  {
                    icon: <Zap className="h-6 w-6" />,
                    label: "Quick Builder",
                    color: "from-pink-400 to-pink-600",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="flex flex-col items-center p-4 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 group"
                  >
                    <div
                      className={`bg-gradient-to-r ${feature.color} p-3 rounded-lg mb-3 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-300">
                      {feature.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-12"
            >
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                {steps.map((step, index) => (
                  <motion.button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 backdrop-blur-md border ${
                      currentStep === step.id
                        ? "bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border-purple-500/50 text-white shadow-lg shadow-purple-500/25"
                        : "bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-800/70 hover:border-gray-600"
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    <div
                      className={`p-2 rounded-lg ${currentStep === step.id ? `bg-gradient-to-r ${step.color}` : "bg-gray-700"}`}
                    >
                      <step.icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">{step.title}</span>
                    {currentStep === step.id && (
                      <motion.div
                        className="w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="max-w-md mx-auto">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Progress</span>
                  <span>{Math.round((currentStep + 1) * 20)}%</span>
                </div>
                <div className="relative">
                  <Progress
                    value={(currentStep + 1) * 20}
                    className="h-3 bg-gray-800"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full opacity-30 blur-sm"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Templates */}
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <InteractiveCard
                  title="Choose Template"
                  description="Select a professional template"
                  icon={<Palette className="h-5 w-5" />}
                  glowColor="purple"
                >
                  <div className="grid grid-cols-1 gap-4">
                    {templates.map((template, index) => (
                      <motion.div
                        key={template.id}
                        className={`cursor-pointer rounded-xl border-2 p-4 transition-all duration-300 backdrop-blur-sm ${
                          selectedTemplate.id === template.id
                            ? `border-${template.color}-500/50 bg-gradient-to-br from-${template.color}-600/20 to-${template.color}-800/20 shadow-lg shadow-${template.color}-500/25`
                            : "border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800/70"
                        }`}
                        onClick={() => setSelectedTemplate(template)}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3 + index * 0.1 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <p className="font-medium text-white">
                            {template.name}
                          </p>
                          {template.premium && (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-gradient-to-r from-yellow-400 to-yellow-600 text-black border-0"
                            >
                              <Star className="h-3 w-3 mr-1 fill-current" />
                              Pro
                            </Badge>
                          )}
                        </div>

                        <div className="relative mb-3 overflow-hidden rounded-lg">
                          <img
                            src={template.preview || "/placeholder.svg"}
                            alt={template.name}
                            className="w-full h-24 object-cover"
                          />
                          {selectedTemplate.id === template.id && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-cyan-600/20"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </div>

                        <p className="text-xs text-gray-300">
                          {template.description}
                        </p>

                        {selectedTemplate.id === template.id && (
                          <motion.div
                            className="mt-3 flex items-center text-purple-400 text-xs font-medium"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse" />
                            Selected
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </InteractiveCard>
              </motion.div>

              {/* Form Content */}
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <InteractiveCard
                  title="Resume Information"
                  description="Fill in your details step by step"
                  icon={<FileUser className="h-5 w-5" />}
                  glowColor="cyan"
                >
                  <Tabs value={currentStep.toString()} className="w-full">
                    {/* Personal Info */}
                    <TabsContent value="0" className="space-y-6">
                      <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="space-y-2">
                          <Label
                            htmlFor="fullName"
                            className="text-gray-300 font-medium"
                          >
                            Full Name *
                          </Label>
                          <Input
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                fullName: e.target.value,
                              })
                            }
                            placeholder="John Doe"
                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500/50 focus:ring-purple-500/20 backdrop-blur-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="email"
                            className="text-gray-300 font-medium"
                          >
                            Email *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            placeholder="john@example.com"
                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-500/50 focus:ring-cyan-500/20 backdrop-blur-sm"
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <div className="space-y-2">
                          <Label
                            htmlFor="phone"
                            className="text-gray-300 font-medium"
                          >
                            Phone
                          </Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            placeholder="+91 98765 43210"
                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500/50 focus:ring-yellow-500/20 backdrop-blur-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="location"
                            className="text-gray-300 font-medium"
                          >
                            Location
                          </Label>
                          <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                location: e.target.value,
                              })
                            }
                            placeholder="Mumbai, India"
                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-pink-500/50 focus:ring-pink-500/20 backdrop-blur-sm"
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <Label
                          htmlFor="summary"
                          className="text-gray-300 font-medium"
                        >
                          Professional Summary
                        </Label>
                        <Textarea
                          id="summary"
                          value={formData.summary}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              summary: e.target.value,
                            })
                          }
                          placeholder="Brief summary of your professional background and key achievements..."
                          rows={4}
                          className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500/50 focus:ring-purple-500/20 backdrop-blur-sm resize-none"
                        />
                      </motion.div>
                    </TabsContent>

                    {/* Experience Tab */}
                    <TabsContent value="1" className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-white">
                            Work Experience
                          </h3>
                          <Button
                            onClick={addExperience}
                            variant="outline"
                            size="sm"
                            className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Experience
                          </Button>
                        </div>
                        {formData.experience.map((exp, index) => (
                          <Card
                            key={index}
                            className="bg-gray-800/30 border-gray-700 p-4"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Input
                                placeholder="Company Name"
                                value={exp.company}
                                onChange={(e) =>
                                  updateExperience(
                                    index,
                                    "company",
                                    e.target.value,
                                  )
                                }
                                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                              />
                              <Input
                                placeholder="Position"
                                value={exp.position}
                                onChange={(e) =>
                                  updateExperience(
                                    index,
                                    "position",
                                    e.target.value,
                                  )
                                }
                                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                              />
                            </div>
                          </Card>
                        ))}
                      </motion.div>
                    </TabsContent>

                    {/* Skills Tab */}
                    <TabsContent value="3" className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4"
                      >
                        <h3 className="text-lg font-medium text-white">
                          Technical Skills
                        </h3>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a skill"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && addSkill()}
                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                          />
                          <Button
                            onClick={addSkill}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {formData.skills.map((skill, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-gray-800/60 text-gray-300 border border-gray-700 hover:border-purple-500/50 px-3 py-1"
                            >
                              {skill}
                              <button
                                onClick={() => removeSkill(index)}
                                className="ml-2 text-gray-400 hover:text-red-400"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </motion.div>
                    </TabsContent>
                  </Tabs>

                  <motion.div
                    className="flex justify-between mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentStep(Math.max(0, currentStep - 1))
                      }
                      disabled={currentStep === 0}
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 disabled:opacity-50"
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={() =>
                        setCurrentStep(Math.min(4, currentStep + 1))
                      }
                      disabled={currentStep === 4}
                      className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white border-0"
                    >
                      Next
                    </Button>
                  </motion.div>
                </InteractiveCard>
              </motion.div>

              {/* ATS Score Card */}
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
              >
                <InteractiveCard
                  title="ATS Score"
                  description="AI-powered optimization"
                  icon={<Bot className="h-5 w-5" />}
                  glowColor="green"
                >
                  <div className="space-y-6">
                    <div className="text-center">
                      <motion.div
                        className="relative w-24 h-24 mx-auto mb-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6, delay: 1.8 }}
                      >
                        <svg
                          className="w-24 h-24 transform -rotate-90"
                          viewBox="0 0 100 100"
                        >
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="rgb(55, 65, 81)"
                            strokeWidth="8"
                            fill="none"
                          />
                          <motion.circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="url(#gradient)"
                            strokeWidth="8"
                            fill="none"
                            strokeLinecap="round"
                            initial={{ strokeDasharray: "0 251.2" }}
                            animate={{
                              strokeDasharray: `${atsScore * 2.512} 251.2`,
                            }}
                            transition={{ duration: 1, delay: 2 }}
                          />
                          <defs>
                            <linearGradient
                              id="gradient"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop offset="0%" stopColor="#10b981" />
                              <stop offset="100%" stopColor="#06d6a0" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">
                            {atsScore}%
                          </span>
                        </div>
                      </motion.div>

                      <h3 className="text-lg font-semibold text-white mb-2">
                        Resume Score
                      </h3>
                      <p className="text-sm text-gray-400 mb-4">
                        {atsScore >= 80
                          ? "Excellent! Your resume is highly optimized."
                          : atsScore >= 60
                            ? "Good! Consider adding more keywords."
                            : "Needs improvement. Add more details."}
                      </p>
                    </div>

                    <Button
                      onClick={calculateATS}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0"
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Analyze Resume
                    </Button>

                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-gray-300">
                        Improvement Tips:
                      </h4>
                      <div className="space-y-2 text-xs text-gray-400">
                        <div className="flex items-center">
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${formData.fullName ? "bg-green-400" : "bg-gray-600"}`}
                          />
                          Personal Information
                        </div>
                        <div className="flex items-center">
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${formData.summary ? "bg-green-400" : "bg-gray-600"}`}
                          />
                          Professional Summary
                        </div>
                        <div className="flex items-center">
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${formData.skills.length > 0 ? "bg-green-400" : "bg-gray-600"}`}
                          />
                          Technical Skills
                        </div>
                        <div className="flex items-center">
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${formData.experience[0].company ? "bg-green-400" : "bg-gray-600"}`}
                          />
                          Work Experience
                        </div>
                      </div>
                    </div>
                  </div>
                </InteractiveCard>

                {/* Preview Card */}
                <div className="mt-6">
                  <InteractiveCard
                    title="Live Preview"
                    description="See your resume in real-time"
                    icon={<Eye className="h-5 w-5" />}
                    glowColor="yellow"
                  >
                    <div className="space-y-4">
                      <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <FileUser className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">
                            Resume preview will appear here
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </InteractiveCard>
                </div>
              </motion.div>
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.6 }}
              className="mt-16 text-center"
            >
              <div className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 backdrop-blur-md border border-gray-700 rounded-2xl p-8 max-w-2xl mx-auto">
                <Trophy className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Ready to Land Your Dream Job?
                </h3>
                <p className="text-gray-300 mb-6">
                  Build professional resumes that pass ATS systems and impress
                  recruiters.
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 shadow-lg shadow-purple-500/25"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Start Building Now
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AuthGuard>
  );
}
