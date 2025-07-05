"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
export function FloatingOrbs() {
  const [orbs, setOrbs] = useState<
    {
      id: number;
      size: number;
      initialX: number;
      initialY: number;
      color: string;
    }[]
  >([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Reduced orb count for better performance
      const generatedOrbs = Array.from({ length: 3 }, (_, i) => ({
        id: i,
        size: Math.random() * 80 + 40, // Smaller sizes
        initialX: Math.random() * window.innerWidth,
        initialY: Math.random() * window.innerHeight,
        color: ["#10b981", "#059669", "#34d399"][i],
      }));
      setOrbs(generatedOrbs);
    }
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full opacity-30 blur-xl"
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color}40 0%, transparent 70%)`,
          }}
          animate={{
            x: [
              orb.initialX,
              orb.initialX + 100, // Reduced movement
              orb.initialX - 100,
              orb.initialX,
            ],
            y: [
              orb.initialY,
              orb.initialY - 50, // Reduced movement
              orb.initialY + 50,
              orb.initialY,
            ],
          }}
          transition={{
            duration: 15 + Math.random() * 5, // Faster, more consistent
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
