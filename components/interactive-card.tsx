"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface InteractiveCardProps {
  title: string
  description: string
  icon: React.ReactNode
  children: React.ReactNode
  className?: string
  glowColor?: string
  onClick?: () => void
}

export function InteractiveCard({
  title,
  description,
  icon,
  children,
  className,
  glowColor = "purple",
  onClick,
}: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const glowColors = {
    purple: "shadow-purple-500/20 border-purple-500/30",
    cyan: "shadow-cyan-500/20 border-cyan-500/30",
    yellow: "shadow-yellow-500/20 border-yellow-500/30",
    pink: "shadow-pink-500/20 border-pink-500/30",
    green: "shadow-green-500/20 border-green-500/30",
  }

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        y: -5,
      }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="cursor-pointer"
      onClick={onClick}
    >
      <Card
        className={cn(
          "bg-gray-900/80 border-gray-700 backdrop-blur-md transition-all duration-300 relative overflow-hidden",
          isHovered && `shadow-2xl ${glowColors[glowColor as keyof typeof glowColors]}`,
          className,
        )}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-0 bg-gradient-to-br from-purple-600/10 via-transparent to-cyan-600/10"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Floating particles effect */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                initial={{
                  x: Math.random() * 100 + "%",
                  y: "100%",
                  opacity: 0,
                }}
                animate={{
                  y: "-10%",
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 1,
                }}
              />
            ))}
          </div>
        )}

        <CardHeader className="relative z-10">
          <CardTitle className="text-white flex items-center group">
            <motion.div animate={{ rotate: isHovered ? 360 : 0 }} transition={{ duration: 0.5 }} className="mr-3">
              {icon}
            </motion.div>
            <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">
              {title}
            </span>
          </CardTitle>
          <CardDescription className="text-gray-400">{description}</CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">{children}</CardContent>
      </Card>
    </motion.div>
  )
}
