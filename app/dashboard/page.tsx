"use client"

import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { LogOut, User, Star, BookOpen, MessageSquare, FileText, BarChart3, Briefcase, Users } from "lucide-react"
import { motion } from "framer-motion"
import { InteractiveCard } from "@/components/interactive-card"
import CircularGallery from "@/components/circular-gallery"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Skeleton } from "@/components/ui/skeleton"

// Loading component for Suspense fallback
function DashboardLoading() {
  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Skeleton className="h-10 w-64 bg-gray-800 mb-2" />
            <Skeleton className="h-5 w-48 bg-gray-800" />
          </div>
          <Skeleton className="h-10 w-32 bg-gray-800" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-64 rounded-lg bg-gray-800" />
          ))}
        </div>

        <Skeleton className="h-96 rounded-lg bg-gray-800 mt-8" />
        <Skeleton className="h-64 rounded-lg bg-gray-800 mt-8" />
      </div>
    </div>
  )
}

// Dashboard content component that uses useSearchParams
function DashboardContent() {
  const searchParams = useSearchParams();
  const {logout} = useAuth();
  const router = useRouter()
  const handlesignOutGoogle = async()=> {
    const success = logout();
    if(success){
      const redirectTo = searchParams.get("redirect") || "/";
      router.push(redirectTo);
    }
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome to Your Dashboard</h1>
              <p className="text-gray-400">Your placement journey starts here</p>
            </div>
            <Button onClick={handlesignOutGoogle} variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InteractiveCard
              title="Profile Setup"
              description="Complete your profile to get started"
              icon={<User className="h-5 w-5" />}
              glowColor="purple"
              onClick={() => router.push("/profile")}
            >
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-purple-400">25%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full w-1/4"></div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Complete Profile</Button>
              </div>
            </InteractiveCard>

            <InteractiveCard
              title="Resume Builder"
              description="Create ATS-optimized resumes"
              icon={<FileText className="h-5 w-5" />}
              glowColor="cyan"
              onClick={() => router.push("/resume-builder")}
            >
              <div className="space-y-4">
                <div className="text-sm text-gray-400">
                  <p>• Professional Templates</p>
                  <p>• ATS Score Analysis</p>
                  <p>• AI-Powered Suggestions</p>
                </div>
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700">Build Resume</Button>
              </div>
            </InteractiveCard>

            <InteractiveCard
              title="Speech Analyzer"
              description="AI-powered speech analysis"
              icon={<BarChart3 className="h-5 w-5" />}
              glowColor="green"
              onClick={() => router.push("/speech-analyzer")}
            >
              <div className="space-y-4">
                <div className="text-sm text-gray-400">
                  <p>• Real-time Analysis</p>
                  <p>• Gesture Recognition</p>
                  <p>• Performance Metrics</p>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">Analyze Speech</Button>
              </div>
            </InteractiveCard>

            <InteractiveCard
              title="Job Portal"
              description="Find placement opportunities"
              icon={<Briefcase className="h-5 w-5" />}
              glowColor="yellow"
              onClick={() => router.push("/jobs")}
            >
              <div className="space-y-4">
                <div className="text-sm text-gray-400">
                  <p>• Latest Openings</p>
                  <p>• Company Insights</p>
                  <p>• Application Tracking</p>
                </div>
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700">Browse Jobs</Button>
              </div>
            </InteractiveCard>

            <InteractiveCard
              title="Community Chat"
              description="Connect with peers"
              icon={<MessageSquare className="h-5 w-5" />}
              glowColor="pink"
              onClick={() => router.push("/community")}
            >
              <div className="space-y-4">
                <div className="text-sm text-gray-400">
                  <p>• Live Discussions</p>
                  <p>• Study Groups</p>
                  <p>• Peer Support</p>
                </div>
                <Button className="w-full bg-pink-600 hover:bg-pink-700">Join Chat</Button>
              </div>
            </InteractiveCard>

            <InteractiveCard
              title="Learning Resources"
              description="Study materials and guides"
              icon={<BookOpen className="h-5 w-5" />}
              glowColor="purple"
              onClick={() => router.push("/resources")}
            >
              <div className="space-y-4">
                <div className="text-sm text-gray-400">
                  <p>• Interview Prep</p>
                  <p>• Coding Practice</p>
                  <p>• Company Research</p>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Start Learning</Button>
              </div>
            </InteractiveCard>
          </div>

          <InteractiveCard
            title="Placement Materials Gallery"
            description="Explore top companies, resources, and success stories"
            icon={<Star className="h-5 w-5" />}
            glowColor="cyan"
            className="mt-8"
          >
            <CircularGallery
              items={[
                {
                  image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
                  text: "Google",
                },
                {
                  image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
                  text: "Microsoft",
                },
                {
                  image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
                  text: "Apple",
                },
                {
                  image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=800&h=600&fit=crop",
                  text: "Amazon",
                },
                {
                  image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
                  text: "Meta",
                },
                {
                  image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop",
                  text: "Netflix",
                },
                {
                  image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
                  text: "Tesla",
                },
                {
                  image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
                  text: "Startup",
                },
              ]}
              bend={2}
              textColor="#ffffff"
              borderRadius={0.08}
              font="bold 24px Inter"
            />
          </InteractiveCard>

          <InteractiveCard
            title="Getting Started"
            description="Follow these steps to maximize your placement success"
            icon={<Users className="h-5 w-5" />}
            glowColor="green"
            className="mt-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { step: "1", title: "Complete Profile", desc: "Add your details and preferences", color: "purple" },
                { step: "2", title: "Upload Resume", desc: "Get ATS score and suggestions", color: "cyan" },
                { step: "3", title: "Practice Speech", desc: "Use AI-powered analysis", color: "green" },
                { step: "4", title: "Apply to Jobs", desc: "Find opportunities in your region", color: "yellow" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all cursor-pointer"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className={`w-8 h-8 bg-${item.color}-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold`}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-white font-medium mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </InteractiveCard>
        </motion.div>
      </div>
    </div>
  )
}

// Main Dashboard component with Suspense boundary
export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  )
}
