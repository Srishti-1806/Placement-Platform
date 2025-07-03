"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Lock,
  User,
  ArrowRight,
  Shield,
  Star,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        setShowContent(true);
      } else {
        setShowContent(false);
      }
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-magenta-900">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-magenta-400 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-white text-lg">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return fallback || <DefaultAuthGuard pathname={pathname} />;
  }

  return (
    <AnimatePresence mode="wait">
      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DefaultAuthGuard({ pathname }: { pathname: string }) {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Ultra-Vibrant Magenta Background matching home page */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-magenta-900"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-magenta-800/50 via-transparent to-purple-800/60"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-pink-900/40 via-transparent to-fuchsia-900/50"></div>

      {/* Dynamic Floating Elements matching home page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.8, 1],
              rotate: [0, 360],
              opacity: [0.1, 0.7, 0.1],
              x: [0, Math.random() * 400 - 200],
              y: [0, Math.random() * 300 - 150],
            }}
            transition={{
              duration: 20 + Math.random() * 15,
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
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Geometric Patterns */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`pattern-${i}`}
            animate={{
              rotate: [0, 360],
              scale: [0.3, 2, 0.3],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 30 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1.2,
            }}
            className="absolute w-8 h-8 bg-gradient-to-r from-magenta-400/15 to-pink-500/15 transform rotate-45"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Lock Icon - No background box */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
            className="flex items-center justify-center mb-12"
          >
            <motion.div
              className="relative p-8 bg-gradient-to-r from-magenta-500 via-pink-500 to-fuchsia-500 rounded-full shadow-2xl"
              animate={{
                boxShadow: [
                  "0 0 40px rgba(236, 72, 153, 0.8)",
                  "0 0 80px rgba(236, 72, 153, 1)",
                  "0 0 40px rgba(236, 72, 153, 0.8)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Lock className="h-20 w-20 text-white" />
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-magenta-400 via-pink-400 to-fuchsia-400 rounded-full opacity-40 blur-2xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -inset-8 bg-gradient-to-r from-pink-300 via-fuchsia-300 to-magenta-300 rounded-full opacity-20 blur-3xl"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </motion.div>

          {/* Heading - Smaller font and secure login */}
          <motion.h1
            className="text-4xl md:text-6xl font-black text-white mb-10 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <motion.span
              className="text-magenta-400"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Secure
            </motion.span>{" "}
            <motion.span
              className="text-pink-400"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              Login
            </motion.span>
            <motion.div
              className="inline-block ml-6"
              animate={{
                rotate: [0, 25, -25, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Lock className="h-12 w-12 text-yellow-400" />
            </motion.div>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-xl md:text-2xl text-gray-100 max-w-6xl mx-auto mb-16 leading-relaxed font-light"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            Unlock{" "}
            <span className="text-magenta-400 font-bold">AI-powered tools</span>{" "}
            and join thousands of successful students transforming their careers
            with PlacementPro!
          </motion.p>

          {/* Features Preview - Floating design without cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            {[
              {
                icon: Shield,
                title: "Secure Access",
                description: "Enterprise-grade security protecting your data",
                color: "from-blue-400 to-cyan-400",
                bgColor: "from-blue-500/20 to-cyan-500/20",
              },
              {
                icon: Sparkles,
                title: "AI-Powered Tools",
                description:
                  "Advanced algorithms for speech analysis & optimization",
                color: "from-magenta-400 to-pink-400",
                bgColor: "from-magenta-500/20 to-pink-500/20",
              },
              {
                icon: Star,
                title: "Premium Support",
                description: "Priority access to features and expert support",
                color: "from-yellow-400 to-orange-400",
                bgColor: "from-yellow-500/20 to-orange-500/20",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.1 + index * 0.15, duration: 0.8 }}
                whileHover={{ scale: 1.1, y: -15 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.8 }}
                  className={`w-24 h-24 mx-auto mb-6 p-6 rounded-full bg-gradient-to-r ${feature.color} shadow-xl group-hover:shadow-2xl relative`}
                >
                  <feature.icon className="h-12 w-12 text-white" />
                  <motion.div
                    className={`absolute -inset-2 bg-gradient-to-r ${feature.bgColor} rounded-full opacity-50 blur-xl`}
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>
                <h3
                  className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${feature.color} mb-4 group-hover:scale-105 transition-transform`}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-200 text-lg leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Benefits List - Floating design */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-10">
              What you <span className="text-magenta-400">unlock</span>:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                "Advanced AI Speech & Gesture Analysis",
                "ATS-Optimized Resume Builder",
                "Smart PDF Summarization",
                "Exclusive Job Opportunities",
                "24/7 Community Support",
                "Interview Preparation Tools",
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center text-gray-100 text-lg font-medium bg-gradient-to-r from-transparent via-magenta-500/10 to-transparent p-4 rounded-xl border-l-4 border-magenta-400/50 hover:border-magenta-400 transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <CheckCircle className="h-6 w-6 text-green-400 mr-4 flex-shrink-0" />
                  </motion.div>
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons - Larger and more prominent */}
          <motion.div
            className="flex flex-col sm:flex-row gap-8 justify-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.8 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="h-20 px-16 text-2xl font-bold bg-gradient-to-r from-magenta-600 via-pink-600 to-fuchsia-600 hover:from-magenta-700 hover:via-pink-700 hover:to-fuchsia-700 shadow-2xl relative overflow-hidden"
                asChild
              >
                <Link href={`/login?redirect=${encodeURIComponent(pathname)}`}>
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10 flex items-center">
                    <User className="mr-4 h-8 w-8" />
                    Sign In to Continue
                    <ArrowRight className="ml-4 h-8 w-8" />
                  </span>
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="h-20 px-16 text-2xl font-bold border-2 border-magenta-400 text-magenta-300 hover:bg-magenta-400 hover:text-white backdrop-blur-xl"
                asChild
              >
                <Link href={`/signup?redirect=${encodeURIComponent(pathname)}`}>
                  <Sparkles className="mr-4 h-8 w-8" />
                  Create Free Account
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust Indicators - Floating design */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.8 }}
          >
            {[
              {
                icon: CheckCircle,
                text: "Free to start",
                color: "text-green-400",
              },
              {
                icon: Shield,
                text: "Secure & Private",
                color: "text-blue-400",
              },
              { icon: Star, text: "50K+ Students", color: "text-yellow-400" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex items-center text-lg font-medium bg-gradient-to-r from-transparent via-gray-800/20 to-transparent px-6 py-3 rounded-full border border-gray-600/30 hover:border-magenta-400/50 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <item.icon className={`h-6 w-6 ${item.color} mr-3`} />
                </motion.div>
                <span>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
