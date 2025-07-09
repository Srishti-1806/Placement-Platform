"use client";

import type React from "react";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface GalaxyHoverProps {
  children: React.ReactNode;
  className?: string;
}

export function GalaxyHover({ children, className }: GalaxyHoverProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    if (isHovered) {
      document.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Galaxy effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Central glow */}
          <motion.div
            className="absolute w-32 h-32 rounded-full"
            style={{
              left: mousePosition.x - 64,
              top: mousePosition.y - 64,
              background:
                "radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 70%)",
              filter: "blur(20px)",
            }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/60 rounded-full"
              style={{
                left: mousePosition.x + Math.cos((i * 30 * Math.PI) / 180) * 50,
                top: mousePosition.y + Math.sin((i * 30 * Math.PI) / 180) * 50,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                x: [0, Math.cos((i * 30 * Math.PI) / 180) * 20],
                y: [0, Math.sin((i * 30 * Math.PI) / 180) * 20],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.05,
              }}
            />
          ))}
        </motion.div>
      )}

      {children}
    </div>
  );
}
