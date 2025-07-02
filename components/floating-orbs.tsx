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
      const generatedOrbs = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        size: Math.random() * 100 + 50,
        initialX: Math.random() * window.innerWidth,
        initialY: Math.random() * window.innerHeight,
        color: [
          "#10b981",
          "#059669",
          "#34d399",
          "#047857",
          "#22c55e",
          "#16a34a",
        ][i],
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
              orb.initialX + 200,
              orb.initialX - 200,
              orb.initialX,
            ],
            y: [
              orb.initialY,
              orb.initialY - 100,
              orb.initialY + 100,
              orb.initialY,
            ],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
