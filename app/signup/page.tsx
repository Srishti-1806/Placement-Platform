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

// Separate component that uses useSearchParams
function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { signup, signupGithub, signupGoogle, isLoading } = useAuth();
  const { playSound } = useSound();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    playSound("click");
    
    // Form validation
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

    // Create account with email and password
    const success = await signup(name, email, password);
    if (success) {
      playSound("success");
      const redirectTo = searchParams.get("redirect") || "/dashboard";
      router.push(redirectTo);
    } else {
      setError("Failed to create account. Email might already be in use.");
      playSound("error");
    }
  };

  const handleSigninGithub = async () => {
    const success = await signupGithub();
    if (success) {
      playSound("success");
      const redirectTo = searchParams.get("redirect") || "/dashboard";
      router.push(redirectTo);
    } else {
      setError("Failed to create account");
      playSound("error");
    }
  };

  const handleSigninGoogle = async () => {
    const success = await signupGoogle();
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
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
              <CardDescription className="text-center">
                Join PlacementPro to boost your job search
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4 bg-red-500/10 border-red-500/20 text-red-400">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="pl-10"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create Account
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    onClick={handleSigninGithub}
                    disabled={isLoading}
                    className="bg-background/50 border-gray-700 hover:bg-gray-800"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleSigninGoogle}
                    disabled={isLoading}
                    className="bg-background/50 border-gray-700 hover:bg-gray-800"
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                      <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                    Google
                  </Button>
                </div>
              </div>

              <div className="mt-6 text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary hover:text-primary/90"
                  onClick={() => playSound("click")}
                >
                  Log in
                  <ArrowRight className="ml-1 inline-block h-3 w-3" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </GalaxyHover>
    </div>
  );
}

// Loading component for Suspense fallback
function SignupLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <GalaxyHover className="w-full max-w-md">
        <Card className="bg-gray-900/90 border-gray-700 backdrop-blur-md shadow-2xl">
          <CardContent className="flex items-center justify-center p-12">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-purple-400 mx-auto mb-4" />
              <p className="text-gray-400">Loading signup page...</p>
            </div>
          </CardContent>
        </Card>
      </GalaxyHover>
    </div>
  );
}

// Main component with Suspense wrapper
export default function SignupPage() {
  return (
    <Suspense fallback={<SignupLoading />}>
      <SignupForm />
    </Suspense>
  );
}