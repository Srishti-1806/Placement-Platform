"use client"
import { motion } from "framer-motion"

export function FloatingOrbs() {
  const orbs = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    initialX: Math.random() * window.innerWidth,
    initialY: Math.random() * window.innerHeight,
    color: ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899"][i],
  }))

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full opacity-20 blur-xl"
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color}40 0%, transparent 70%)`,
          }}
          animate={{
            x: [orb.initialX, orb.initialX + 200, orb.initialX - 200, orb.initialX],
            y: [orb.initialY, orb.initialY - 100, orb.initialY + 100, orb.initialY],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}
