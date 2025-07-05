"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Sparkles,
  TreePine,
  Leaf,
  Crown,
  Target,
  Gem,
  Zap,
  CheckCircle,
  Heart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { InteractiveCard } from "@/components/interactive-card";
import { GalaxyHover } from "@/components/galaxy-hover";
import { useSound } from "@/hooks/use-sound";

interface RegionalJob {
  id: number;
  title: string;
  company: string;
  location: string;
  state: string;
  city: string;
  experience: string;
  salary: string;
  skills: string[];
  posted_date: string;
  job_type: string;
  remote: string;
  description: string;
  applicants?: number;
  rating?: number;
  contact_email?: string;
  contact_phone?: string;
  company_website?: string;
  application_deadline?: string;
  benefits: string[];
  requirements: string[];
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
    benefits: [
      "Health Insurance",
      "Flexible Hours",
      "Work from Home",
      "Performance Bonus",
    ],
    requirements: [
      "Bachelor's in Computer Science",
      "2+ years React experience",
      "Strong problem-solving skills",
    ],
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
    benefits: [
      "Medical Coverage",
      "Learning Budget",
      "Team Outings",
      "Flexible Timing",
    ],
    requirements: [
      "Bachelor's in Statistics/Math",
      "Python proficiency",
      "SQL knowledge",
      "Analytical mindset",
    ],
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
    benefits: [
      "Creative Freedom",
      "Latest Tools",
      "Remote Work",
      "Design Conferences",
    ],
    requirements: [
      "Portfolio required",
      "Figma expertise",
      "User research experience",
      "Creative thinking",
    ],
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
    benefits: [
      "Performance Incentives",
      "Training Programs",
      "Travel Opportunities",
      "Team Events",
    ],
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
    description:
      "Experienced DevOps Engineer to manage our cloud infrastructure and deployment pipelines.",
    applicants: 38,
    rating: 4.3,
    contact_email: "devops@cloudtech.com",
    contact_phone: "+91-9876543214",
    company_website: "https://cloudtech.com",
    application_deadline: "2024-02-25",
    benefits: [
      "Cloud Certifications",
      "High Growth",
      "Stock Options",
      "Learning Budget",
    ],
    requirements: [
      "AWS certification preferred",
      "Container experience",
      "CI/CD knowledge",
      "Problem-solving skills",
    ],
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
    description:
      "Business Analyst to work with stakeholders and improve business processes through data analysis.",
    applicants: 41,
    rating: 4.1,
    contact_email: "ba@consultinggroup.com",
    contact_phone: "+91-9876543215",
    company_website: "https://consultinggroup.com",
    application_deadline: "2024-02-28",
    benefits: [
      "Client Exposure",
      "Skill Development",
      "Flexible Work",
      "Performance Bonus",
    ],
    requirements: [
      "Business/IT background",
      "Analytical skills",
      "Stakeholder management",
      "Documentation skills",
    ],
  },
];

const states = [
  "All States",
  "Maharashtra",
  "Delhi",
  "Karnataka",
  "Telangana",
  "Tamil Nadu",
  "Gujarat",
  "West Bengal",
];
const jobTypes = [
  "All Types",
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
];
const experienceLevels = [
  "All Experience",
  "0-1 years",
  "1-3 years",
  "2-5 years",
  "3-6 years",
  "5+ years",
];

export default function RegionalJobsPage() {
  const [jobs, setJobs] = useState<RegionalJob[]>(mockRegionalJobs);
  const [filteredJobs, setFilteredJobs] =
    useState<RegionalJob[]>(mockRegionalJobs);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedJobType, setSelectedJobType] = useState("All Types");
  const [selectedExperience, setSelectedExperience] =
    useState("All Experience");
  const [selectedJob, setSelectedJob] = useState<RegionalJob | null>(null);
  const [activeTab, setActiveTab] = useState("search");

  const { playSound } = useSound();

  useEffect(() => {
    filterJobs();
  }, [searchKeyword, selectedState, selectedJobType, selectedExperience]);

  const filterJobs = () => {
    let filtered = jobs;

    if (searchKeyword) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          job.company.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          job.skills.some((skill) =>
            skill.toLowerCase().includes(searchKeyword.toLowerCase()),
          ),
      );
    }

    if (selectedState !== "All States") {
      filtered = filtered.filter((job) => job.state === selectedState);
    }

    if (selectedJobType !== "All Types") {
      filtered = filtered.filter((job) => job.job_type === selectedJobType);
    }

    if (selectedExperience !== "All Experience") {
      filtered = filtered.filter((job) =>
        job.experience.includes(selectedExperience.split(" ")[0]),
      );
    }

    setFilteredJobs(filtered);
  };

  const handleJobClick = (job: RegionalJob) => {
    setSelectedJob(job);
    setActiveTab("details");
    playSound("hover");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Vibrant Dark Green Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-green-900 to-teal-900/80" />

      {/* Animated mesh gradient overlay */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/40 via-transparent to-green-600/40 animate-pulse" />
        <div
          className="absolute inset-0 bg-gradient-to-bl from-teal-600/30 via-transparent to-emerald-600/30 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Enhanced floating particles with green theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 4 === 0
                ? "w-3 h-3 bg-emerald-400/40"
                : i % 4 === 1
                  ? "w-2 h-2 bg-green-400/50"
                  : i % 4 === 2
                    ? "w-1.5 h-1.5 bg-teal-400/30"
                    : "w-1 h-1 bg-lime-400/60"
            }`}
            animate={{
              x: [0, Math.random() * 400, Math.random() * -400, 0],
              y: [0, Math.random() * -400, Math.random() * 400, 0],
              opacity: [0.3, 0.9, 0.3],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: Math.random() * 25 + 25,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Spectacular glowing orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/6 left-1/8 w-[500px] h-[500px] bg-emerald-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/6 right-1/8 w-96 h-96 bg-green-500/25 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.25, 0.5, 0.25],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-full blur-3xl"
          animate={{
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Magical floating leaves */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
              rotate: [0, 360, 720],
              y: [0, -50, 50, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
          >
            <Leaf className="h-6 w-6 text-emerald-300/60 fill-current" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 pt-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Enhanced Header */}
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center justify-center mb-8"
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <TreePine className="h-10 w-10 text-emerald-400 mr-4" />
                </motion.div>
                <span className="text-emerald-400 font-bold text-xl tracking-wide uppercase bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                  🌿 Career Forest - Job Portal 🌿
                </span>
                <motion.div
                  animate={{
                    rotate: [360, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Crown className="h-10 w-10 text-green-400 ml-4" />
                </motion.div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-7xl md:text-8xl font-extrabold mb-8 leading-tight"
              >
                <span className="text-white drop-shadow-2xl">Career</span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 animate-pulse">
                  Growth
                </span>{" "}
                <span className="text-white drop-shadow-2xl">Hub</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-2xl text-gray-200 mb-12 max-w-5xl mx-auto leading-relaxed font-light"
              >
                Discover your
                <span className="text-emerald-400 font-semibold">
                  {" "}
                  dream career{" "}
                </span>
                in our thriving job ecosystem. Connect with top employers and
                <span className="text-green-400 font-semibold">
                  {" "}
                  grow your professional journey{" "}
                </span>
                in the most vibrant career community.
              </motion.p>

              {/* Enhanced Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-3 gap-8 max-w-4xl mx-auto mb-16"
              >
                {[
                  {
                    number: "10K+",
                    label: "Active Jobs",
                    color: "from-emerald-400 to-emerald-600",
                    icon: Briefcase,
                  },
                  {
                    number: "50K+",
                    label: "Success Stories",
                    color: "from-green-400 to-green-600",
                    icon: Heart,
                  },
                  {
                    number: "1000+",
                    label: "Top Companies",
                    color: "from-teal-400 to-teal-600",
                    icon: Building,
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-8 rounded-3xl bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 hover:border-emerald-400/50 transition-all duration-300"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.25)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <stat.icon className="h-10 w-10 text-emerald-400 mx-auto mb-4" />
                    </motion.div>
                    <div
                      className={`text-4xl font-bold bg-gradient-to-r ${stat.color} text-transparent bg-clip-text mb-3`}
                    >
                      {stat.number}
                    </div>
                    <div className="text-gray-300 text-lg font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <TabsList className="flex justify-center gap-4 mb-12 bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 p-2 rounded-2xl">
                  <TabsTrigger
                    value="search"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl hover:bg-emerald-700/50"
                  >
                    <Search className="h-5 w-5 mr-3" />
                    🔍 Explore Opportunities
                  </TabsTrigger>
                  <TabsTrigger
                    value="details"
                    className="text-lg py-4 px-8 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-green-600 data-[state=active]:text-white transition-all duration-300"
                  >
                    <Target className="h-5 w-5 mr-3" />
                    📋 Career Details
                  </TabsTrigger>
                </TabsList>
              </motion.div>

              <TabsContent value="search" className="space-y-12">
                {/* Enhanced Search and Filters */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <Card className="bg-gray-900/90 border-gray-600/50 backdrop-blur-xl shadow-2xl shadow-emerald-500/20 relative overflow-hidden">
                    {/* Animated border effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-green-500/20 to-teal-500/20 rounded-lg blur-sm" />
                    <div className="absolute inset-[1px] bg-gray-900/90 rounded-lg" />

                    <CardHeader className="text-center pb-8 relative z-10">
                      <CardTitle className="text-3xl font-bold text-white flex items-center justify-center gap-4 mb-4">
                        <motion.div
                          animate={{
                            rotate: [0, 360],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Sparkles className="h-8 w-8 text-emerald-400" />
                        </motion.div>
                        <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
                          🌿 Find Your Dream Role
                        </span>
                        <motion.div
                          animate={{
                            rotate: [360, 0],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Gem className="h-8 w-8 text-green-400" />
                        </motion.div>
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-8 relative z-10">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="relative group">
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl blur-sm group-focus-within:blur-md transition-all duration-300" />
                          <div className="relative">
                            <Search className="absolute left-4 top-4 h-5 w-5 text-emerald-400" />
                            <Input
                              placeholder="🔍 Dream job, company, skills..."
                              value={searchKeyword}
                              onChange={(e) => setSearchKeyword(e.target.value)}
                              className="pl-12 h-12 bg-gray-800/80 border border-gray-600/50 rounded-xl text-white placeholder-gray-300 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/30 transition-all duration-300"
                            />
                          </div>
                        </div>
                        <Select
                          value={selectedState}
                          onValueChange={setSelectedState}
                        >
                          <SelectTrigger className="h-12 bg-gray-800/80 border border-gray-600/50 rounded-xl text-white focus:border-green-400 focus:ring-4 focus:ring-green-400/30">
                            <SelectValue placeholder="🗺️ Select State" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-700">
                            {states.map((state) => (
                              <SelectItem
                                key={state}
                                value={state}
                                className="text-white hover:bg-emerald-600"
                              >
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select
                          value={selectedJobType}
                          onValueChange={setSelectedJobType}
                        >
                          <SelectTrigger className="h-12 bg-gray-800/80 border border-gray-600/50 rounded-xl text-white focus:border-green-400 focus:ring-4 focus:ring-green-400/30">
                            <SelectValue placeholder="💼 Job Type" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-700">
                            {jobTypes.map((type) => (
                              <SelectItem
                                key={type}
                                value={type}
                                className="text-white hover:bg-emerald-600"
                              >
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select
                          value={selectedExperience}
                          onValueChange={setSelectedExperience}
                        >
                          <SelectTrigger className="h-12 bg-gray-800/80 border border-gray-600/50 rounded-xl text-white focus:border-green-400 focus:ring-4 focus:ring-green-400/30">
                            <SelectValue placeholder="⭐ Experience" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-700">
                            {experienceLevels.map((level) => (
                              <SelectItem
                                key={level}
                                value={level}
                                className="text-white hover:bg-emerald-600"
                              >
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Enhanced Results Summary */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="flex items-center justify-between p-6 bg-gray-900/70 backdrop-blur-md rounded-2xl border border-gray-700/50"
                >
                  <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                    <CheckCircle className="h-8 w-8 text-emerald-400" />
                    <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                      {filteredJobs.length} Amazing Opportunities
                    </span>
                    {selectedState !== "All States" && (
                      <Badge
                        variant="secondary"
                        className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30 text-lg px-4 py-2"
                      >
                        🌍 in {selectedState}
                      </Badge>
                    )}
                  </h2>
                  <div className="flex items-center space-x-3 text-lg text-gray-300">
                    <TrendingUp className="h-6 w-6 text-green-400" />
                    <span>✨ Updated every hour</span>
                  </div>
                </motion.div>

                {/* Enhanced Jobs Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <AnimatePresence>
                    {filteredJobs.map((job, index) => (
                      <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                      >
                        <GalaxyHover>
                          <Card
                            className={`cursor-pointer transition-all duration-500 bg-gray-900/80 border-gray-600/50 backdrop-blur-md hover:shadow-2xl hover:shadow-emerald-500/25 relative overflow-hidden ${
                              selectedJob?.id === job.id
                                ? "ring-2 ring-emerald-400 shadow-2xl shadow-emerald-500/40"
                                : ""
                            }`}
                            onClick={() => handleJobClick(job)}
                          >
                            {/* Job card glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />

                            <CardHeader className="pb-4 relative z-10">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <CardTitle className="text-xl mb-3 text-white font-bold hover:text-emerald-300 transition-colors duration-300">
                                    {job.title}
                                  </CardTitle>
                                  <div className="space-y-2">
                                    <div className="flex items-center text-gray-300">
                                      <Building className="h-5 w-5 mr-3 text-emerald-400" />
                                      <span className="font-medium">
                                        {job.company}
                                      </span>
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                      <MapPin className="h-5 w-5 mr-3 text-green-400" />
                                      <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                      <Briefcase className="h-5 w-5 mr-3 text-teal-400" />
                                      <span>{job.experience}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-emerald-400 mb-2 bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                                    {job.salary}
                                  </div>
                                  <div className="flex items-center text-sm text-gray-400">
                                    <Clock className="h-4 w-4 mr-2" />
                                    {job.posted_date}
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-0 relative z-10">
                              <div className="space-y-4">
                                <p className="text-gray-300 line-clamp-2 leading-relaxed">
                                  {job.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                  {job.skills.slice(0, 3).map((skill, idx) => (
                                    <Badge
                                      key={idx}
                                      variant="secondary"
                                      className="text-sm bg-emerald-500/20 text-emerald-300 border-emerald-400/30 hover:bg-emerald-500/30 transition-all duration-300"
                                    >
                                      ✨ {skill}
                                    </Badge>
                                  ))}
                                  {job.skills.length > 3 && (
                                    <Badge
                                      variant="outline"
                                      className="text-sm border-green-400/50 text-green-300 hover:bg-green-500/20 transition-all duration-300"
                                    >
                                      +{job.skills.length - 3} more skills
                                    </Badge>
                                  )}
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                                    {job.applicants && (
                                      <div className="flex items-center">
                                        <Users className="h-4 w-4 mr-2 text-emerald-400" />
                                        <span className="text-gray-300">
                                          {job.applicants} applied
                                        </span>
                                      </div>
                                    )}
                                    {job.rating && (
                                      <div className="flex items-center">
                                        <Star className="h-4 w-4 mr-2 text-yellow-400 fill-current" />
                                        <span className="text-gray-300">
                                          {job.rating}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  <Badge
                                    variant={
                                      job.remote === "Remote"
                                        ? "default"
                                        : "outline"
                                    }
                                    className={`text-sm ${
                                      job.remote === "Remote"
                                        ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white"
                                        : "border-emerald-400/50 text-emerald-300"
                                    }`}
                                  >
                                    🌍 {job.remote}
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
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20 bg-gray-900/60 backdrop-blur-md rounded-3xl border border-gray-700/50"
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Search className="h-20 w-20 text-emerald-300 mx-auto mb-6" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      🌱 No opportunities found in this area
                    </h3>
                    <p className="text-xl text-gray-300 mb-6">
                      Try exploring different locations or expanding your
                      criteria
                    </p>
                    <Button
                      onClick={() => {
                        setSearchKeyword("");
                        setSelectedState("All States");
                        setSelectedJobType("All Types");
                        setSelectedExperience("All Experience");
                      }}
                      className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-3 text-lg"
                    >
                      <Sparkles className="h-5 w-5 mr-2" />
                      Reset Filters
                    </Button>
                  </motion.div>
                )}
              </TabsContent>

              <TabsContent value="details" className="space-y-8">
                {selectedJob ? (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Enhanced Main Job Details */}
                    <div className="lg:col-span-2 space-y-8">
                      <Card className="bg-gray-900/90 border-gray-600/50 backdrop-blur-xl shadow-2xl shadow-emerald-500/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-green-600/5 to-teal-600/10" />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />

                        <CardHeader className="relative z-10 pb-8">
                          <CardTitle className="text-3xl font-bold text-white flex items-center gap-4 mb-4">
                            <motion.div
                              animate={{
                                rotate: [0, 360],
                                scale: [1, 1.1, 1],
                              }}
                              transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            >
                              <Briefcase className="h-8 w-8 text-emerald-400" />
                            </motion.div>
                            <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
                              🌟 Career Opportunity Details
                            </span>
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-8 relative z-10">
                          <div>
                            <h2 className="text-3xl font-bold text-white mb-3">
                              {selectedJob.title}
                            </h2>
                            <p className="text-xl text-emerald-300 font-semibold">
                              {selectedJob.company}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div className="flex items-center p-3 bg-gray-800/50 rounded-xl">
                                <MapPin className="h-5 w-5 text-emerald-400 mr-3" />
                                <span className="text-gray-200">
                                  {selectedJob.location}
                                </span>
                              </div>
                              <div className="flex items-center p-3 bg-gray-800/50 rounded-xl">
                                <Briefcase className="h-5 w-5 text-green-400 mr-3" />
                                <span className="text-gray-200">
                                  {selectedJob.experience}
                                </span>
                              </div>
                              <div className="flex items-center p-3 bg-gray-800/50 rounded-xl">
                                <Clock className="h-5 w-5 text-teal-400 mr-3" />
                                <span className="text-gray-200">
                                  {selectedJob.job_type}
                                </span>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="flex items-center p-3 bg-gray-800/50 rounded-xl">
                                <DollarSign className="h-5 w-5 text-emerald-400 mr-3" />
                                <span className="text-emerald-300 font-bold text-lg">
                                  {selectedJob.salary}
                                </span>
                              </div>
                              <div className="flex items-center p-3 bg-gray-800/50 rounded-xl">
                                <Globe className="h-5 w-5 text-green-400 mr-3" />
                                <span className="text-gray-200">
                                  {selectedJob.remote}
                                </span>
                              </div>
                              {selectedJob.application_deadline && (
                                <div className="flex items-center p-3 bg-gray-800/50 rounded-xl">
                                  <Calendar className="h-5 w-5 text-teal-400 mr-3" />
                                  <span className="text-gray-200">
                                    Apply by {selectedJob.application_deadline}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div>
                              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-emerald-400" />
                                🌟 Role Description
                              </h3>
                              <p className="text-gray-200 leading-relaxed text-lg bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                                {selectedJob.description}
                              </p>
                            </div>

                            <div>
                              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Zap className="h-5 w-5 text-green-400" />
                                🛠️ Required Skills
                              </h3>
                              <div className="flex flex-wrap gap-3">
                                {selectedJob.skills.map((skill, idx) => (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    whileHover={{ scale: 1.1 }}
                                  >
                                    <Badge
                                      variant="secondary"
                                      className="bg-gradient-to-r from-emerald-500/30 to-green-500/30 text-emerald-200 border-emerald-400/50 px-4 py-2 text-sm font-medium shadow-lg"
                                    >
                                      ⚡ {skill}
                                    </Badge>
                                  </motion.div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-teal-400" />
                                📋 Requirements
                              </h3>
                              <ul className="space-y-3">
                                {selectedJob.requirements.map((req, idx) => (
                                  <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-start p-3 bg-gray-800/40 rounded-xl border border-gray-700/30"
                                  >
                                    <span className="text-emerald-400 mr-3 text-lg">
                                      ✨
                                    </span>
                                    <span className="text-gray-200 leading-relaxed">
                                      {req}
                                    </span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Award className="h-5 w-5 text-yellow-400" />
                                🎁 Amazing Benefits
                              </h3>
                              <div className="grid grid-cols-2 gap-4">
                                {selectedJob.benefits.map((benefit, idx) => (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="flex items-center p-3 bg-gray-800/40 rounded-xl border border-emerald-400/20"
                                  >
                                    <Award className="h-5 w-5 text-emerald-400 mr-3" />
                                    <span className="text-gray-200 font-medium">
                                      {benefit}
                                    </span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Enhanced Contact Information Sidebar */}
                    <div className="space-y-8">
                      <Card className="bg-gray-900/90 border-gray-600/50 backdrop-blur-xl shadow-2xl shadow-green-500/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-emerald-600/10" />

                        <CardHeader className="relative z-10 text-center pb-8">
                          <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-3 mb-3">
                            <motion.div
                              animate={{
                                rotate: [0, 360],
                                scale: [1, 1.1, 1],
                              }}
                              transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            >
                              <Phone className="h-6 w-6 text-green-400" />
                            </motion.div>
                            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                              💬 Get Connected
                            </span>
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-6 relative z-10">
                          {selectedJob.contact_email && (
                            <motion.div
                              className="flex items-center p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-green-400/50 transition-all duration-300"
                              whileHover={{ scale: 1.02 }}
                            >
                              <Mail className="h-5 w-5 text-green-400 mr-4" />
                              <div>
                                <p className="text-sm text-gray-400 mb-1">
                                  📧 Email
                                </p>
                                <a
                                  href={`mailto:${selectedJob.contact_email}`}
                                  className="text-green-300 hover:text-green-400 transition-colors duration-300 font-medium"
                                >
                                  {selectedJob.contact_email}
                                </a>
                              </div>
                            </motion.div>
                          )}

                          {selectedJob.contact_phone && (
                            <motion.div
                              className="flex items-center p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-emerald-400/50 transition-all duration-300"
                              whileHover={{ scale: 1.02 }}
                            >
                              <Phone className="h-5 w-5 text-emerald-400 mr-4" />
                              <div>
                                <p className="text-sm text-gray-400 mb-1">
                                  📞 Phone
                                </p>
                                <a
                                  href={`tel:${selectedJob.contact_phone}`}
                                  className="text-emerald-300 hover:text-emerald-400 transition-colors duration-300 font-medium"
                                >
                                  {selectedJob.contact_phone}
                                </a>
                              </div>
                            </motion.div>
                          )}

                          {selectedJob.company_website && (
                            <motion.div
                              className="flex items-center p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-teal-400/50 transition-all duration-300"
                              whileHover={{ scale: 1.02 }}
                            >
                              <Globe className="h-5 w-5 text-teal-400 mr-4" />
                              <div>
                                <p className="text-sm text-gray-400 mb-1">
                                  🌐 Website
                                </p>
                                <a
                                  href={selectedJob.company_website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-teal-300 hover:text-teal-400 transition-colors duration-300 font-medium"
                                >
                                  Visit Company Site
                                </a>
                              </div>
                            </motion.div>
                          )}

                          <div className="pt-6 space-y-4">
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-4 text-lg font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300">
                                <ExternalLink className="h-5 w-5 mr-3" />
                                🚀 Apply Now
                              </Button>
                            </motion.div>
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button
                                variant="outline"
                                className="w-full border-green-400/50 text-green-300 hover:bg-green-500/20 py-4 text-lg transition-all duration-300"
                              >
                                <BookmarkPlus className="h-5 w-5 mr-3" />
                                💾 Save for Later
                              </Button>
                            </motion.div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gray-900/90 border-gray-600/50 backdrop-blur-xl shadow-2xl shadow-teal-500/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-600/10 to-green-600/10" />

                        <CardHeader className="relative z-10 text-center pb-6">
                          <CardTitle className="text-xl font-bold text-white flex items-center justify-center gap-3">
                            <motion.div
                              animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 360],
                              }}
                              transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            >
                              <TrendingUp className="h-6 w-6 text-teal-400" />
                            </motion.div>
                            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                              📊 Opportunity Insights
                            </span>
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-6 relative z-10">
                          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
                            <span className="text-gray-300 flex items-center gap-2">
                              <Users className="h-4 w-4 text-emerald-400" />
                              👥 Applicants
                            </span>
                            <span className="font-bold text-emerald-400 text-lg">
                              {selectedJob.applicants || 0}
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
                            <span className="text-gray-300 flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-400" />⭐
                              Company Rating
                            </span>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 mr-2 fill-current" />
                              <span className="font-bold text-yellow-400 text-lg">
                                {selectedJob.rating || "N/A"}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
                            <span className="text-gray-300 flex items-center gap-2">
                              <Clock className="h-4 w-4 text-green-400" />
                              📅 Posted
                            </span>
                            <span className="font-bold text-green-400 text-lg">
                              {selectedJob.posted_date}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20 bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50"
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Briefcase className="h-24 w-24 text-emerald-300 mx-auto mb-8" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      🌱 No opportunity selected
                    </h3>
                    <p className="text-xl text-gray-300 mb-8">
                      Go back to explore and select an amazing opportunity to
                      view details
                    </p>
                    <Button
                      onClick={() => setActiveTab("search")}
                      className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-4 text-lg"
                    >
                      <Search className="h-5 w-5 mr-3" />
                      🔍 Back to Exploration
                    </Button>
                  </motion.div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
