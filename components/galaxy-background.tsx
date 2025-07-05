"use client";

import { useEffect, useRef, useState } from "react";

export function GalaxyBackground() {
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

    const stars: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      twinkleSpeed: number;
      color: string;
    }> = [];

    const nebulaClouds: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      color: string;
      drift: number;
    }> = [];

    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random(),
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        color: ["#ffffff", "#a7f3d0", "#ccffcc", "#d1fae5"][
          Math.floor(Math.random() * 4)
        ],
      });
    }

    for (let i = 0; i < 4; i++) {
      nebulaClouds.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 300 + 100,
        opacity: Math.random() * 0.3 + 0.1,
        color: [
          "#065f46",
          "#059669",
          "#10b981",
          "#34d399",
          "#047857",
          "#22c55e",
        ][Math.floor(Math.random() * 6)],
        drift: Math.random() * 0.5 + 0.2,
      });
    }

    let time = 0;
    let lastTime = 0;

    const animate = (currentTime: number) => {
      if (currentTime - lastTime < 33) {
        requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime;
      time += 0.005;

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height),
      );
      gradient.addColorStop(0, "#0a2e0a");
      gradient.addColorStop(0.5, "#0f3e0f");
      gradient.addColorStop(1, "#064e3b");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      nebulaClouds.forEach((cloud) => {
        ctx.save();
        ctx.globalAlpha =
          cloud.opacity * (0.8 + 0.2 * Math.sin(time * cloud.drift));
        ctx.fillStyle = cloud.color;
        ctx.beginPath();
        ctx.arc(
          cloud.x + Math.sin(time * cloud.drift) * 10,
          cloud.y,
          cloud.size * 0.7,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.restore();
      });

      stars.forEach((star) => {
        ctx.save();
        ctx.globalAlpha =
          star.opacity * (0.5 + 0.5 * Math.sin(time * star.twinkleSpeed));
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Don't render anything until mounted on client
  if (!isMounted) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -2 }}
    />
  );
}
