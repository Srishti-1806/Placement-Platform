'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, Home, ArrowLeft, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="w-full max-w-md"
      >
        <Card className="bg-gray-900/90 border-gray-700 backdrop-blur-md shadow-2xl text-center">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            
            <CardTitle className="text-3xl font-bold text-white mb-2">
              404 - Page Not Found
            </CardTitle>
            <CardDescription className="text-gray-400">
              Oops! The page you're looking for doesn't exist.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-300"
            >
              <p className="mb-4">
                The page you requested could not be found.
              </p>
              <p className="text-sm text-gray-400">
                Don't worry! You can navigate back to safety using the options below.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col gap-3"
            >
              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Link>
              </Button>
              
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
              
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Page
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="border-t border-gray-700 pt-6 mt-6"
            >
              <h3 className="text-white font-semibold mb-3">Quick Navigation</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <Link 
                  href="/dashboard" 
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  → Dashboard
                </Link>
                <Link 
                  href="/login" 
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  → Login
                </Link>
                <Link 
                  href="/ats-calculator" 
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  → ATS Calculator
                </Link>
                <Link 
                  href="/resume-builder" 
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  → Resume Builder
                </Link>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}