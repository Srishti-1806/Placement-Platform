"use client";

import type React from "react";

import { useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Mail,
  Lock,
  ArrowRight,
  Github,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/auth-context";
import { useRouter, useSearchParams } from "next/navigation";
import { useSound } from "@/hooks/use-sound";
import { GalaxyHover } from "@/components/galaxy-hover";

// Separate component that uses useSearchParams
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();
  const { playSound } = useSound();
  const router = useRouter();
  const searchParams = useSearchParams(); // This needs to be wrapped in Suspense

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    playSound("click");

    if (!email || !password) {
      setError("Please fill in all fields");
      playSound("error");
      return;
    }

    const success = await login(email, password);
    if (success) {
      playSound("success");
      const redirectTo = searchParams.get("redirect") || "/dashboard";
      router.push(redirectTo);
    } else {
      setError("Invalid email or password");
      playSound("error");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4">
      {/* Ultra-Vibrant Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-magenta-900"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-magenta-800/50 via-transparent to-purple-800/60"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-pink-900/40 via-transparent to-fuchsia-900/50"></div>

      {/* Dynamic Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.5, 1],
              rotate: [0, 360],
              opacity: [0.1, 0.6, 0.1],
              x: [0, Math.random() * 300 - 150],
              y: [0, Math.random() * 200 - 100],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.2,
            }}
            className={`absolute w-32 h-32 rounded-full blur-2xl ${
              [
                "bg-gradient-to-r from-magenta-400/30 to-pink-600/40",
                "bg-gradient-to-r from-pink-400/30 to-fuchsia-600/40",
                "bg-gradient-to-r from-fuchsia-400/30 to-purple-600/40",
                "bg-gradient-to-r from-purple-400/30 to-violet-600/40",
              ][i % 4]
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <GalaxyHover className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-gray-900/80 via-purple-900/60 to-magenta-900/70 border border-magenta-400/30 backdrop-blur-xl shadow-2xl shadow-magenta-500/20 relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-magenta-500/10 via-pink-500/5 to-purple-500/10 rounded-lg"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-magenta-600 via-pink-600 to-purple-600 rounded-lg blur opacity-20"></div>

            <CardHeader className="text-center relative z-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", bounce: 0.6 }}
                whileHover={{ scale: 1.1, rotate: 360 }}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-magenta-500 via-pink-500 to-fuchsia-500 rounded-full flex items-center justify-center mx-auto mb-6 relative shadow-lg shadow-magenta-500/50">
                  <Lock className="w-10 h-10 text-white" />
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-magenta-400 via-pink-400 to-fuchsia-400 rounded-full opacity-40 blur-lg"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>
              </motion.div>
              <CardTitle className="text-3xl font-black text-white mb-2">
                <span className="bg-gradient-to-r from-magenta-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Welcome Back
                </span>
              </CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                <span className="text-magenta-400 font-semibold">
                  Secure login
                </span>{" "}
                to access your placement dashboard
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Alert className="border-red-500/50 bg-red-500/10">
                    <AlertDescription className="text-red-400">
                      {error}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="group"
                >
                  <Label
                    htmlFor="email"
                    className="text-magenta-300 font-semibold text-sm"
                  >
                    Email Address
                  </Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-4 top-4 h-5 w-5 text-magenta-400 group-focus-within:text-pink-400 transition-colors z-10" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => playSound("hover")}
                      className="pl-12 pr-4 py-4 bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-2 border-magenta-400/30 text-white placeholder-gray-400 focus:border-magenta-400 focus:ring-4 focus:ring-magenta-400/20 rounded-xl backdrop-blur-sm transition-all duration-300 hover:border-pink-400/50 hover:shadow-lg hover:shadow-magenta-500/10 group-focus-within:bg-gradient-to-r group-focus-within:from-magenta-900/20 group-focus-within:to-pink-900/20"
                      disabled={isLoading}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-magenta-500/5 to-pink-500/5 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="group"
                >
                  <Label
                    htmlFor="password"
                    className="text-magenta-300 font-semibold text-sm"
                  >
                    Password
                  </Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-4 top-4 h-5 w-5 text-magenta-400 group-focus-within:text-pink-400 transition-colors z-10" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => playSound("hover")}
                      className="pl-12 pr-14 py-4 bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-2 border-magenta-400/30 text-white placeholder-gray-400 focus:border-magenta-400 focus:ring-4 focus:ring-magenta-400/20 rounded-xl backdrop-blur-sm transition-all duration-300 hover:border-pink-400/50 hover:shadow-lg hover:shadow-magenta-500/10 group-focus-within:bg-gradient-to-r group-focus-within:from-magenta-900/20 group-focus-within:to-pink-900/20"
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-10 w-10 text-magenta-400 hover:text-pink-300 hover:bg-magenta-400/10 rounded-lg transition-all duration-200"
                      onClick={() => {
                        setShowPassword(!showPassword);
                        playSound("click");
                      }}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </Button>
                    <div className="absolute inset-0 bg-gradient-to-r from-magenta-500/5 to-pink-500/5 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, type: "spring" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full h-14 bg-gradient-to-r from-magenta-600 via-pink-600 to-fuchsia-600 hover:from-magenta-700 hover:via-pink-700 hover:to-fuchsia-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-magenta-500/30 hover:shadow-xl hover:shadow-magenta-500/40 transition-all duration-300 relative overflow-hidden group"
                    disabled={isLoading}
                    onMouseEnter={() => playSound("hover")}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                        Logging In...
                      </>
                    ) : (
                      <>
                        Secure Login{" "}
                        <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="py-4"
              >
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span
                      className="w-full border-t border-gradient-to-r from-transparent via-magenta-400/30 to-transparent"
                      style={{
                        borderImage:
                          "linear-gradient(to right, transparent, rgb(236 72 153 / 0.3), transparent) 1",
                      }}
                    />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-gradient-to-r from-gray-900/80 via-purple-900/60 to-magenta-900/70 px-4 text-magenta-300 font-medium">
                      Or continue with
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, type: "spring" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className="w-full h-12 border-2 border-magenta-400/50 text-magenta-300 hover:bg-magenta-400/10 hover:border-magenta-400 hover:text-magenta-200 rounded-xl backdrop-blur-sm transition-all duration-300 font-medium"
                  onMouseEnter={() => playSound("hover")}
                  onClick={() => playSound("click")}
                >
                  <Github className="mr-3 h-5 w-5" />
                  Continue with GitHub
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-center text-base text-gray-300 pt-4"
              >
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-magenta-400 hover:text-pink-300 font-semibold transition-colors hover:underline decoration-2 underline-offset-2"
                  onClick={() => playSound("click")}
                >
                  Sign up here
                </Link>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </GalaxyHover>
    </div>
  );
}

// Loading component for Suspense fallback
function LoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <GalaxyHover className="w-full max-w-md">
        <Card className="bg-gray-900/90 border-gray-700 backdrop-blur-md shadow-2xl">
          <CardContent className="flex items-center justify-center p-12">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-purple-400 mx-auto mb-4" />
              <p className="text-gray-400">Loading secure login...</p>
            </div>
          </CardContent>
        </Card>
      </GalaxyHover>
    </div>
  );
}

// Main component with Suspense wrapper
export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginForm />
    </Suspense>
  );
}
