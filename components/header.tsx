"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { useSound } from "@/hooks/use-sound"
import { useRouter, useSearchParams } from "next/navigation"
export function Header() {
  const searchParams = useSearchParams();
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { playSound } = useSound()
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
    playSound(isMenuOpen ? "close" : "open")
  }

  const handleLogout = () => {
    logout()
    const redirectTo = searchParams.get("redirect") || "/";
    router.push(redirectTo);
    playSound("success")
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => playSound("hover")}
            >
              <span className="text-white font-bold text-xl">P</span>
            </motion.div>
            <span className="text-2xl font-bold text-white">PlacementPro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition-colors"
              onMouseEnter={() => playSound("hover")}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-white transition-colors"
              onMouseEnter={() => playSound("hover")}
            >
              About
            </Link>
            {user && (
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-white transition-colors"
                onMouseEnter={() => playSound("hover")}
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-white">{user.name}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  onMouseEnter={() => playSound("hover")}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  asChild
                  onMouseEnter={() => playSound("hover")}
                  className="text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  onMouseEnter={() => playSound("hover")}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={handleMenuToggle} onMouseEnter={() => playSound("hover")}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-800 py-4"
            >
              <div className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                  onMouseEnter={() => playSound("hover")}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                  onMouseEnter={() => playSound("hover")}
                >
                  About
                </Link>
                {user && (
                  <Link
                    href="/dashboard"
                    className="text-gray-300 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                    onMouseEnter={() => playSound("hover")}
                  >
                    Dashboard
                  </Link>
                )}

                <div className="pt-4 border-t border-gray-800">
                  {user ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-5 h-5 text-gray-400" />
                        <span className="text-white">{user.name}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLogout}
                        onMouseEnter={() => playSound("hover")}
                        className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        asChild
                        onMouseEnter={() => playSound("hover")}
                        className="w-full text-gray-300 hover:text-white hover:bg-gray-800"
                      >
                        <Link href="/login">Login</Link>
                      </Button>
                      <Button
                        asChild
                        onMouseEnter={() => playSound("hover")}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      >
                        <Link href="/signup">Sign Up</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
