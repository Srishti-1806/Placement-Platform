"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Play,
  Sparkles,
  Brain,
  Users,
  FileText,
  BarChart3,
  MessageSquare,
  Briefcase,
  BookOpen,
  Award,
  Target,
  Zap,
  TrendingUp,
  Star,
  ChevronRight,
  Rocket,
  Globe,
  Shield,
  Clock,
  CheckCircle,
  Video,
  Download,
  Mic,
  Eye,
  Coffee,
  Code,
  Lightbulb,
  Heart,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [email, setEmail] = useState("");

  const features = [
    {
      icon: Brain,
      title: "AI Speech Analysis",
      description:
        "Advanced speech and gesture analysis using cutting-edge AI technology to improve your interview performance",
      gradient: "from-magenta-500 to-purple-500",
      bgGradient: "from-magenta-900/20 to-purple-900/30",
      borderColor: "border-magenta-500/30",
      href: "/speech-analyzer",
      stats: "95% accuracy",
    },
    {
      icon: FileText,
      title: "PDF Summarizer",
      description:
        "Transform lengthy documents into intelligent summaries instantly with our powerful AI algorithms",
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-900/20 to-rose-900/30",
      borderColor: "border-pink-500/30",
      href: "/pdf-summary",
      stats: "50MB files",
    },
    {
      icon: Users,
      title: "Community Hub",
      description:
        "Connect with peers, share experiences, and grow together in our vibrant tech community",
      gradient: "from-fuchsia-500 to-magenta-500",
      bgGradient: "from-fuchsia-900/20 to-magenta-900/30",
      borderColor: "border-fuchsia-500/30",
      href: "/community",
      stats: "50K+ members",
    },
    {
      icon: Briefcase,
      title: "Job Portal",
      description:
        "Access exclusive opportunities from top companies worldwide with personalized job matching",
      gradient: "from-violet-500 to-purple-500",
      bgGradient: "from-violet-900/20 to-purple-900/30",
      borderColor: "border-violet-500/30",
      href: "/jobs",
      stats: "500+ companies",
    },
    {
      icon: BarChart3,
      title: "ATS Calculator",
      description:
        "Optimize your resume with advanced ATS scoring algorithms and get hired faster",
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-900/20 to-indigo-900/30",
      borderColor: "border-purple-500/30",
      href: "/ats-calculator",
      stats: "Real-time scoring",
    },
    {
      icon: BookOpen,
      title: "Resume Builder",
      description:
        "Create professional resumes with AI-powered optimization and ATS-friendly templates",
      gradient: "from-rose-500 to-pink-500",
      bgGradient: "from-rose-900/20 to-pink-900/30",
      borderColor: "border-rose-500/30",
      href: "/resume-builder",
      stats: "20+ templates",
    },
  ];

  const stats = [
    {
      number: "50K+",
      label: "Students Helped",
      icon: Users,
      color: "from-magenta-400 to-pink-400",
    },
    {
      number: "95%",
      label: "Success Rate",
      icon: Target,
      color: "from-pink-400 to-rose-400",
    },
    {
      number: "500+",
      label: "Companies",
      icon: Briefcase,
      color: "from-purple-400 to-violet-400",
    },
    {
      number: "24/7",
      label: "AI Support",
      icon: Clock,
      color: "from-fuchsia-400 to-magenta-400",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer @ Google",
      content:
        "PlacementPro's AI analysis helped me improve my interview skills and land my dream job at Google! The speech analysis feature was incredibly detailed.",
      avatar: "🎯",
      rating: 5,
      company: "Google",
    },
    {
      name: "Raj Patel",
      role: "Data Scientist @ Microsoft",
      content:
        "The community support and resume builder were game-changers for my career journey. I went from 0 interviews to 5 offers in 2 months!",
      avatar: "🚀",
      rating: 5,
      company: "Microsoft",
    },
    {
      name: "Emily Rodriguez",
      role: "Product Manager @ Meta",
      content:
        "Incredible platform! The AI feedback was spot-on and boosted my confidence tremendously. The job portal connected me directly with recruiters.",
      avatar: "⭐",
      rating: 5,
      company: "Meta",
    },
    {
      name: "David Kumar",
      role: "Full Stack Developer @ Netflix",
      content:
        "The ATS calculator helped me optimize my resume perfectly. I got past the initial screening for every job I applied to!",
      avatar: "💻",
      rating: 5,
      company: "Netflix",
    },
    {
      name: "Maria Garcia",
      role: "UX Designer @ Apple",
      content:
        "The community aspect is amazing. I found my mentor through PlacementPro and received invaluable guidance throughout my job search.",
      avatar: "🎨",
      rating: 5,
      company: "Apple",
    },
    {
      name: "Alex Thompson",
      role: "DevOps Engineer @ Amazon",
      content:
        "From resume building to interview prep, everything was seamless. The AI insights helped me understand exactly what employers were looking for.",
      avatar: "⚡",
      rating: 5,
      company: "Amazon",
    },
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Sign Up & Profile Setup",
      description:
        "Create your account and build your comprehensive profile with our guided onboarding process",
      icon: Users,
      color: "from-magenta-500 to-pink-500",
    },
    {
      step: 2,
      title: "AI Assessment & Analysis",
      description:
        "Take our comprehensive AI assessments to understand your strengths and areas for improvement",
      icon: Brain,
      color: "from-pink-500 to-fuchsia-500",
    },
    {
      step: 3,
      title: "Skill Development & Practice",
      description:
        "Use our tools to practice interviews, optimize your resume, and develop crucial job-hunting skills",
      icon: Target,
      color: "from-fuchsia-500 to-purple-500",
    },
    {
      step: 4,
      title: "Job Matching & Applications",
      description:
        "Get matched with relevant opportunities and apply with confidence using our optimized materials",
      icon: Briefcase,
      color: "from-purple-500 to-violet-500",
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for getting started with basic features",
      features: [
        "Basic AI Speech Analysis",
        "5 PDF Summaries/month",
        "Community Access",
        "Basic Resume Templates",
        "Email Support",
      ],
      gradient: "from-gray-500 to-gray-600",
      bgGradient: "from-gray-900/20 to-gray-800/30",
      borderColor: "border-gray-500/30",
      popular: false,
    },
    {
      name: "Pro",
      price: "$19",
      description: "Most popular plan for serious job seekers",
      features: [
        "Advanced AI Analysis",
        "Unlimited PDF Summaries",
        "Priority Community Access",
        "Premium Resume Templates",
        "ATS Score Optimization",
        "Video Interview Practice",
        "24/7 Chat Support",
        "Job Application Tracking",
      ],
      gradient: "from-magenta-500 to-pink-500",
      bgGradient: "from-magenta-900/20 to-pink-900/30",
      borderColor: "border-magenta-500/30",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$49",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Team Collaboration Tools",
        "Custom Branding",
        "Advanced Analytics",
        "Dedicated Account Manager",
        "Custom Integrations",
        "Priority Support",
        "Bulk User Management",
      ],
      gradient: "from-purple-500 to-violet-500",
      bgGradient: "from-purple-900/20 to-violet-900/30",
      borderColor: "border-purple-500/30",
      popular: false,
    },
  ];

  const companies = [
    { name: "Google", logo: "🌐" },
    { name: "Microsoft", logo: "🪟" },
    { name: "Apple", logo: "🍎" },
    { name: "Amazon", logo: "📦" },
    { name: "Meta", logo: "👥" },
    { name: "Netflix", logo: "🎬" },
    { name: "Tesla", logo: "⚡" },
    { name: "Spotify", logo: "🎵" },
  ];

  const faqs = [
    {
      question: "How does the AI speech analysis work?",
      answer:
        "Our AI uses advanced machine learning algorithms to analyze your speech patterns, body language, tone, and communication effectiveness. It provides detailed feedback on areas like clarity, confidence, and professional presence.",
    },
    {
      question: "Is my data secure and private?",
      answer:
        "Absolutely! We use enterprise-grade encryption and follow strict data privacy guidelines. Your personal information and analysis results are never shared with third parties without your explicit consent.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel your subscription at any time. You'll continue to have access to Pro features until the end of your billing period, after which you'll automatically switch to the free plan.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied with our service within the first 30 days, we'll provide a full refund.",
    },
    {
      question: "How accurate is the ATS scoring?",
      answer:
        "Our ATS scoring system is based on real ATS algorithms used by major companies and has a 95% accuracy rate. We continuously update our system to match the latest ATS technologies.",
    },
    {
      question: "Can I use PlacementPro for any type of job?",
      answer:
        "Yes! While we specialize in tech roles, our platform works for any industry. Our AI adapts to different job types and provides relevant feedback for your specific career path.",
    },
  ];

  // --- FIX: Generate random positions only on client ---
  const [orbs, setOrbs] = useState<{
    left: number;
    top: number;
    x: number;
    y: number;
    duration: number;
  }[]>([]);
  const [patterns, setPatterns] = useState<{
    left: number;
    top: number;
    duration: number;
  }[]>([]);

  useEffect(() => {
    setOrbs(
      Array.from({ length: 15 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        x: Math.random() * 400 - 200,
        y: Math.random() * 300 - 150,
        duration: 20 + Math.random() * 15,
      }))
    );
    setPatterns(
      Array.from({ length: 30 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 30 + Math.random() * 20,
      }))
    );
  }, []);
  // --- END FIX ---

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Ultra-Vibrant Magenta Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-magenta-900"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-magenta-800/50 via-transparent to-purple-800/60"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-pink-900/40 via-transparent to-fuchsia-900/50"></div>

      {/* Dynamic Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Magenta Orbs */}
        {orbs.map((orb, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.8, 1],
              rotate: [0, 360],
              opacity: [0.1, 0.7, 0.1],
              x: [0, orb.x],
              y: [0, orb.y],
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
            className={`absolute w-48 h-48 rounded-full blur-3xl ${
              [
                "bg-gradient-to-r from-magenta-400/20 to-pink-600/30",
                "bg-gradient-to-r from-pink-400/20 to-fuchsia-600/30",
                "bg-gradient-to-r from-fuchsia-400/20 to-purple-600/30",
                "bg-gradient-to-r from-purple-400/20 to-violet-600/30",
                "bg-gradient-to-r from-violet-400/20 to-magenta-600/30",
                "bg-gradient-to-r from-rose-400/20 to-pink-600/30",
              ][i % 6]
            }`}
            style={{
              left: `${orb.left}%`,
              top: `${orb.top}%`,
            }}
          />
        ))}

        {/* Geometric Patterns */}
        {patterns.map((pattern, i) => (
          <motion.div
            key={`pattern-${i}`}
            animate={{
              rotate: [0, 360],
              scale: [0.3, 2, 0.3],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: pattern.duration,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1.2,
            }}
            className="absolute w-8 h-8 bg-gradient-to-r from-magenta-400/15 to-pink-500/15 transform rotate-45"
            style={{
              left: `${pattern.left}%`,
              top: `${pattern.top}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 pt-20">
          <div className="max-w-8xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="flex items-center justify-center mb-8"
              >
                <div className="bg-gradient-to-r from-magenta-500/20 to-pink-500/20 backdrop-blur-xl border border-magenta-400/30 rounded-full px-8 py-4">
                  <div className="flex items-center space-x-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Sparkles className="h-6 w-6 text-magenta-400" />
                    </motion.div>
                    <span className="text-magenta-300 font-semibold text-base">
                      🚀 Trusted by 50K+ Students - Welcome to the Future
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
              >
                Your Complete{" "}
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 via-pink-400 to-fuchsia-400"
                  animate={{
                    backgroundPosition: ["0%", "100%", "0%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ backgroundSize: "300% 300%" }}
                >
                  Placement
                </motion.span>
                <br />
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-magenta-400"
                  animate={{
                    backgroundPosition: ["100%", "0%", "100%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  style={{ backgroundSize: "300% 300%" }}
                >
                  Universe
                </motion.span>
                <motion.div
                  className="inline-block ml-8"
                  animate={{
                    rotate: [0, 25, -25, 0],
                    scale: [1, 1.4, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Rocket className="h-24 w-24 text-yellow-400" />
                </motion.div>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-lg md:text-xl text-gray-100 max-w-6xl mx-auto leading-relaxed font-light mb-8"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
              >
                Navigate through the cosmos of career opportunities with our{" "}
                <span className="text-magenta-400 font-bold">
                  AI-powered tools
                </span>
                ,{" "}
                <span className="text-magenta-400 font-bold">
                  vibrant community support
                </span>
                , and comprehensive resources designed for the next generation
                of tech professionals.
              </motion.p>

              {/* Enhanced Stats Row */}
              <motion.div
                className="flex flex-wrap justify-center gap-8 mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                {[
                  { icon: Users, value: "50K+", label: "Success Stories" },
                  { icon: Target, value: "95%", label: "Interview Success" },
                  {
                    icon: Briefcase,
                    value: "500+",
                    label: "Partner Companies",
                  },
                  { icon: Award, value: "4.9/5", label: "User Rating" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="flex items-center space-x-3 bg-gray-800/30 backdrop-blur-xl rounded-2xl px-6 py-4 border border-gray-600/30"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-12 h-12 bg-gradient-to-r from-magenta-500 to-pink-500 rounded-full flex items-center justify-center"
                    >
                      <stat.icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <div>
                      <div className="text-lg font-bold text-white">
                        {stat.value}
                      </div>
                      <div className="text-gray-300 text-sm">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-8 justify-center mb-20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="h-12 px-8 text-base font-semibold bg-gradient-to-r from-magenta-600 via-pink-600 to-fuchsia-600 hover:from-magenta-700 hover:via-pink-700 hover:to-fuchsia-700 shadow-2xl relative overflow-hidden"
                    asChild
                  >
                    <Link href="/signup">
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                      <span className="relative z-10 flex items-center">
                        <Rocket className="mr-4 h-8 w-8" />
                        Start Your Journey - Free
                        <ArrowRight className="ml-4 h-8 w-8" />
                      </span>
                    </Link>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >

                </motion.div>
              </motion.div>

              {/* Quick Features Grid */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                {[
                  {
                    icon: Brain,
                    label: "AI Analysis",
                    color: "from-magenta-400 to-pink-400",
                    description: "Smart insights",
                  },
                  {
                    icon: FileText,
                    label: "Smart PDFs",
                    color: "from-pink-400 to-fuchsia-400",
                    description: "Instant summaries",
                  },
                  {
                    icon: Users,
                    label: "Community",
                    color: "from-fuchsia-400 to-purple-400",
                    description: "50K+ members",
                  },
                  {
                    icon: Briefcase,
                    label: "Job Portal",
                    color: "from-purple-400 to-violet-400",
                    description: "500+ companies",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.1, y: -15 }}
                    className="flex flex-col items-center p-10 bg-gray-800/30 rounded-3xl border border-gray-600/50 backdrop-blur-xl hover:bg-gray-700/40 transition-all duration-500 group"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                      className={`w-20 h-20 rounded-full bg-gradient-to-r ${feature.color} p-5 mb-6 shadow-xl group-hover:shadow-2xl`}
                    >
                      <feature.icon className="w-full h-full text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-200 group-hover:text-white transition-colors mb-2">
                      {feature.label}
                    </h3>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Company Logos Section */}
        <section className="py-20 px-4">
          <div className="max-w-8xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Trusted by students who joined{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 to-pink-400">
                  Top Companies
                </span>
              </h2>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {companies.map((company, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center p-8 bg-gray-800/30 backdrop-blur-xl rounded-2xl border border-gray-600/30 hover:border-magenta-500/50 transition-all duration-300"
                >
                  <div className="text-6xl mb-4">{company.logo}</div>
                  <span className="text-white font-semibold text-lg">
                    {company.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 px-4">
          <div className="max-w-8xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                How It{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 to-pink-400">
                  Works
                </span>
              </h2>
              <p className="text-lg text-gray-300 max-w-4xl mx-auto">
                Get started in minutes and transform your career journey with
                our simple 4-step process
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="relative"
                >
                  <Card className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border-2 border-gray-600/50 backdrop-blur-xl hover:shadow-2xl transition-all duration-500 h-full">
                    <CardContent className="p-8 text-center">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                        className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center shadow-xl relative`}
                      >
                        <step.icon className="h-10 w-10 text-white" />
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-900 font-bold text-sm">
                          {step.step}
                        </div>
                      </motion.div>
                      <h3 className="text-xl font-bold text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Arrow connector */}
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ChevronRight className="h-8 w-8 text-magenta-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Showcase - Enhanced 3x2 Grid */}
        <section className="py-24 px-4">
          <div className="max-w-8xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Everything You Need for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 to-pink-400">
                  Success
                </span>
              </h2>
              <p className="text-lg text-gray-300 max-w-5xl mx-auto">
                From AI-powered analysis to community support, we've got all the
                comprehensive tools and resources to help you land your dream
                job faster than ever.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    y: -15,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                >
                  <Link href={feature.href}>
                    <Card
                      className={`bg-gradient-to-br ${feature.bgGradient} border-2 ${feature.borderColor} backdrop-blur-xl hover:shadow-2xl transition-all duration-500 h-full relative overflow-hidden group cursor-pointer`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <CardContent className="p-10 relative h-full flex flex-col">
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.8 }}
                          className={`h-24 w-24 mb-8 p-6 rounded-2xl bg-gradient-to-r ${feature.gradient} shadow-xl group-hover:shadow-2xl`}
                        >
                          <feature.icon className="h-12 w-12 text-white" />
                        </motion.div>

                        <h3
                          className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${feature.gradient} mb-3 group-hover:scale-105 transition-transform`}
                        >
                          {feature.title}
                        </h3>

                        <p className="text-gray-200 text-base leading-relaxed mb-4 flex-grow">
                          {feature.description}
                        </p>

                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center text-magenta-300 font-semibold group-hover:text-magenta-200 transition-colors">
                            <span>Explore Feature</span>
                            <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                          </div>
                          <div className="text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
                            {feature.stats}
                          </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute top-4 right-4 w-4 h-4 bg-gradient-to-r from-magenta-400 to-pink-400 rounded-full opacity-60"></div>
                        <div className="absolute bottom-4 left-4 w-4 h-4 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full opacity-60"></div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Stats Section */}
        <section className="py-24 px-4">
          <div className="max-w-8xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Trusted by{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 to-pink-400">
                  Thousands
                </span>
              </h2>
              <p className="text-lg text-gray-300 max-w-4xl mx-auto">
                Join a community of successful professionals who transformed
                their careers with PlacementPro
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.15, y: -15 }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                    className={`w-24 h-24 mx-auto mb-8 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl`}
                  >
                    <stat.icon className="h-12 w-12 text-white" />
                  </motion.div>
                  <div
                    className={`text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-3`}
                  >
                    {stat.number}
                  </div>
                  <div className="text-gray-300 font-semibold text-base group-hover:text-white transition-colors">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-24 px-4">
          <div className="max-w-8xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Choose Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 to-pink-400">
                  Plan
                </span>
              </h2>
              <p className="text-lg text-gray-300 max-w-4xl mx-auto">
                Start free and upgrade as you grow. All plans include access to
                our core features.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="relative"
                >
                  {plan.popular && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-magenta-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  )}

                  <Card
                    className={`bg-gradient-to-br ${plan.bgGradient} border-2 ${plan.borderColor} backdrop-blur-xl shadow-2xl h-full relative overflow-hidden ${plan.popular ? "scale-110" : ""}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                    <CardContent className="p-10 relative">
                      <h3
                        className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${plan.gradient} mb-3`}
                      >
                        {plan.name}
                      </h3>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-white">
                          {plan.price}
                        </span>
                        {plan.price !== "Free" && (
                          <span className="text-gray-400 text-base">
                            /month
                          </span>
                        )}
                      </div>
                      <p className="text-gray-300 mb-6 text-base">
                        {plan.description}
                      </p>

                      <ul className="space-y-4 mb-10">
                        {plan.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-gray-200"
                          >
                            <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <Button
                        className={`w-full h-14 text-lg font-bold ${
                          plan.popular
                            ? "bg-gradient-to-r from-magenta-600 to-pink-600 hover:from-magenta-700 hover:to-pink-700"
                            : "bg-gray-700 hover:bg-gray-600"
                        }`}
                        asChild
                      >
                        <Link href="/signup">
                          {plan.price === "Free"
                            ? "Get Started"
                            : "Start Free Trial"}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Testimonials */}
        <section className="py-24 px-4">
          <div className="max-w-8xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Success{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 to-pink-400">
                  Stories
                </span>
              </h2>
              <p className="text-lg text-gray-300 max-w-5xl mx-auto">
                See how PlacementPro has transformed careers and helped students
                achieve their dreams at top tech companies worldwide.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <Card className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border-2 border-magenta-500/30 backdrop-blur-xl hover:shadow-2xl transition-all duration-500 h-full">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <div className="text-5xl mr-5">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white">
                            {testimonial.name}
                          </h4>
                          <p className="text-magenta-300 font-semibold">
                            {testimonial.role}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>

                      <div className="flex mb-6">
                        {Array.from({ length: testimonial.rating }).map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="h-5 w-5 text-yellow-400 fill-current"
                            />
                          ),
                        )}
                      </div>

                      <p className="text-gray-200 text-lg leading-relaxed italic">
                        "{testimonial.content}"
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Frequently Asked{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 to-pink-400">
                  Questions
                </span>
              </h2>
              <p className="text-lg text-gray-300 max-w-4xl mx-auto">
                Got questions? We've got answers. Here are the most common
                questions about PlacementPro.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border-2 border-gray-600/50 backdrop-blur-xl hover:border-magenta-500/50 transition-all duration-300 h-full">
                    <CardContent className="p-8">
                      <h3 className="text-xl font-bold text-white mb-4">
                        {faq.question}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-magenta-900/60 to-pink-900/60 backdrop-blur-xl rounded-3xl p-16 border-2 border-magenta-500/30 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-magenta-500/10 to-pink-500/10"></div>

              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Stay Updated with{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 to-pink-400">
                    Career Tips
                  </span>
                </h2>

                <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
                  Get the latest career insights, interview tips, and job market
                  trends delivered to your inbox weekly.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 rounded-xl bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:border-magenta-400 focus:outline-none"
                  />
                  <Button className="px-8 py-4 bg-gradient-to-r from-magenta-600 to-pink-600 hover:from-magenta-700 hover:to-pink-700 text-white font-bold rounded-xl">
                    Subscribe
                  </Button>
                </div>

                <p className="text-gray-400 text-sm mt-4">
                  No spam, unsubscribe at any time. Join 10K+ subscribers.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced CTA */}
        <section className="py-24 px-4">
          <div className="max-w-8xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-magenta-900/60 to-pink-900/60 backdrop-blur-xl rounded-3xl p-20 border-2 border-magenta-500/30 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-magenta-500/10 to-pink-500/10"></div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute top-10 right-10 w-20 h-20 border-2 border-magenta-400/30 rounded-full"
              />

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-10 left-10 w-16 h-16 border-2 border-pink-400/30 rounded-full"
              />

              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                  Ready to Transform{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 to-pink-400">
                    Your Career?
                  </span>
                </h2>

                <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-5xl mx-auto leading-relaxed">
                  Join thousands of students who have successfully landed their
                  dream jobs with PlacementPro's comprehensive AI-powered
                  platform. Your journey to success starts here.
                </p>

                <div className="flex flex-col sm:flex-row gap-8 justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      className="h-12 px-8 text-base font-semibold bg-gradient-to-r from-magenta-600 to-pink-600 hover:from-magenta-700 hover:to-pink-700 shadow-2xl"
                      asChild
                    >
                      <Link href="/signup">
                        <Rocket className="mr-4 h-8 w-8" />
                        Start Free Trial Today
                        <ArrowRight className="ml-4 h-8 w-8" />
                      </Link>
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-12 px-8 text-base font-semibold border-2 border-white text-white hover:bg-white hover:text-magenta-600 backdrop-blur-xl"
                      asChild
                    >
                      <Link href="/contact">
                        <Phone className="mr-4 h-8 w-8" />
                        Talk to Sales
                      </Link>
                    </Button>
                  </motion.div>
                </div>

                <div className="flex justify-center items-center mt-12 space-x-8 text-gray-300">
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-400 mr-2" />
                    <span>Free 30-day trial</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-6 w-6 text-blue-400 mr-2" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-6 w-6 text-red-400 mr-2" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Back to Top Button */}
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-magenta-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl z-50 hover:shadow-magenta-500/50 transition-all duration-150"
        >
          <ArrowUp className="h-8 w-8 text-white" />
        </motion.button>
      </div>
    </main>
  );
}
