"use client";

import { useEffect, useRef, useState } from "react";

interface SplashCursorProps {
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  SPLAT_FORCE?: number;
  COLOR_UPDATE_SPEED?: number;
  BACK_COLOR?: { r: number; g: number; b: number };
}

export default function SplashCursor({
  DENSITY_DISSIPATION = 2,
  VELOCITY_DISSIPATION = 1.5,
  SPLAT_FORCE = 4000,
  COLOR_UPDATE_SPEED = 20,
  BACK_COLOR = { r: 0.1, g: 0.1, b: 0.2 },
}: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      color: string;
      size: number;
    }

    const particles: Particle[] = [];
    let mouseX = 0;
    let mouseY = 0;
    let isMouseDown = false;

    const colors = [
      "#8b5cf6", // purple
      "#06b6d4", // cyan
      "#10b981", // emerald
      "#f59e0b", // amber
      "#ef4444", // red
      "#ec4899", // pink
    ];

    function createParticle(x: number, y: number, force = 1) {
      // Limit particle count for performance
      if (particles.length > 50) return;

      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 2 + 0.5) * force; // Reduced speed

      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: Math.random() * 30 + 15, // Shorter life
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 3 + 1, // Smaller particles
      });
    }

    function updateParticles() {
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.98; // friction
        particle.vy *= 0.98;
        particle.life -= 1 / particle.maxLife;

        if (particle.life <= 0) {
          particles.splice(i, 1);
        }
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.save();
        ctx.globalAlpha = particle.life * 0.8;
        ctx.fillStyle = particle.color;
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = particle.size * 2;

        ctx.beginPath();
        ctx.arc(
          particle.x,
          particle.y,
          particle.size * particle.life,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.restore();
      });
    }

    function animate() {
      updateParticles();
      drawParticles();

      // Create trailing particles when mouse moves - reduced frequency
      if (Math.random() < 0.1) {
        createParticle(
          mouseX + (Math.random() - 0.5) * 10,
          mouseY + (Math.random() - 0.5) * 10,
          0.3,
        );
      }

      requestAnimationFrame(animate);
    }

    function handleMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Create particles on mouse move - reduced frequency
      if (Math.random() < 0.2) {
        createParticle(mouseX, mouseY, 0.5);
      }
    }

    function handleMouseDown(e: MouseEvent) {
      isMouseDown = true;
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Create burst of particles on click - reduced count
      for (let i = 0; i < 8; i++) {
        createParticle(mouseX, mouseY, 1.5);
      }
    }

    function handleMouseUp() {
      isMouseDown = false;
    }

    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    // Event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("resize", handleResize);

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", handleResize);
    };
  }, [
    DENSITY_DISSIPATION,
    VELOCITY_DISSIPATION,
    SPLAT_FORCE,
    COLOR_UPDATE_SPEED,
    BACK_COLOR,
  ]);

  // Don't render anything until mounted on client
  if (!isMounted) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 10 }}
    />
  );
}
