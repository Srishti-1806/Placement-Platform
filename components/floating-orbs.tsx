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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      // Use consistent seed-like values to reduce randomness
      const generatedOrbs = Array.from({ length: 3 }, (_, i) => ({
        id: i,
        size: 60 + i * 20, // Consistent sizes
        initialX: (window.innerWidth / 4) * (i + 1), // Evenly spaced
        initialY: window.innerHeight / 3 + i * 100, // Consistent positioning
        color: ["#10b981", "#059669", "#34d399"][i],
      }));
      setOrbs(generatedOrbs);
    }
  }, []);

  // Don't render anything until mounted on client
  if (!isMounted) {
    return null;
  }

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
              orb.initialX + 100,
              orb.initialX - 100,
              orb.initialX,
            ],
            y: [
              orb.initialY,
              orb.initialY - 50,
              orb.initialY + 50,
              orb.initialY,
            ],
          }}
          transition={{
            duration: 20, // Consistent duration
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
