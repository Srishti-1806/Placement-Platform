"use client";

import type React from "react";

import { useState } from "react";
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
  User,
  ArrowRight,
  Github,
  Eye,
  EyeOff,
  Loader2,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/auth-context";
import { useRouter, useSearchParams } from "next/navigation";
import { useSound } from "@/hooks/use-sound";
import { GalaxyHover } from "@/components/galaxy-hover";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { signup, isLoading } = useAuth();
  const { playSound } = useSound();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    playSound("click");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      playSound("error");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      playSound("error");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      playSound("error");
      return;
    }

    const success = await signup(name, email, password);
    if (success) {
      playSound("success");
      const redirectTo = searchParams.get("redirect") || "/dashboard";
      router.push(redirectTo);
    } else {
      setError("Failed to create account");
      playSound("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <GalaxyHover className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <Card className="bg-gray-900/90 border-gray-700 backdrop-blur-md shadow-2xl">
            <CardHeader className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="w-8 h-8 text-white" />
                </div>
              </motion.div>
              <CardTitle className="text-2xl font-bold text-white">
                Join PlacementPro
              </CardTitle>
              <CardDescription className="text-gray-400">
                Create your account and start your placement journey
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
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Label htmlFor="name" className="text-gray-300">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => playSound("hover")}
                      className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                      disabled={isLoading}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Label htmlFor="email" className="text-gray-300">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => playSound("hover")}
                      className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                      disabled={isLoading}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Label htmlFor="password" className="text-gray-300">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => playSound("hover")}
                      className="pl-10 pr-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1 h-8 w-8 text-gray-400 hover:text-white"
                      onClick={() => {
                        setShowPassword(!showPassword);
                        playSound("click");
                      }}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Label htmlFor="confirmPassword" className="text-gray-300">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onFocus={() => playSound("hover")}
                      className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                      disabled={isLoading}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    disabled={isLoading}
                    onMouseEnter={() => playSound("hover")}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-gray-900 px-2 text-gray-400">
                      Or continue with
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <Button
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                  onMouseEnter={() => playSound("hover")}
                  onClick={() => playSound("click")}
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="text-center text-sm text-gray-400"
              >
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                  onClick={() => playSound("click")}
                >
                  Sign in
                </Link>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </GalaxyHover>
    </div>
  );
}
