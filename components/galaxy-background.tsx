"use client"

import { useEffect, useRef } from "react"

export function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const stars: Array<{
      x: number
      y: number
      size: number
      opacity: number
      twinkleSpeed: number
      color: string
    }> = []

    const nebulaClouds: Array<{
      x: number
      y: number
      size: number
      opacity: number
      color: string
      drift: number
    }> = []

    // Create stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random(),
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        color: ["#ffffff", "#b3d9ff", "#ffffcc", "#ffcccc"][Math.floor(Math.random() * 4)],
      })
    }

    // Create nebula clouds
    for (let i = 0; i < 8; i++) {
      nebulaClouds.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 300 + 100,
        opacity: Math.random() * 0.3 + 0.1,
        color: ["#4c1d95", "#7c3aed", "#a855f7", "#c084fc", "#1e40af", "#3b82f6"][Math.floor(Math.random() * 6)],
        drift: Math.random() * 0.5 + 0.2,
      })
    }

    let time = 0

    const animate = () => {
      time += 0.01

      // Create gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height),
      )
      gradient.addColorStop(0, "#0f0f23")
      gradient.addColorStop(0.5, "#1a1a2e")
      gradient.addColorStop(1, "#16213e")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw nebula clouds
      nebulaClouds.forEach((cloud) => {
        ctx.save()
        ctx.globalAlpha = cloud.opacity * (0.8 + 0.2 * Math.sin(time * cloud.drift))
        ctx.fillStyle = cloud.color
        ctx.filter = "blur(40px)"
        ctx.beginPath()
        ctx.arc(cloud.x + Math.sin(time * cloud.drift) * 20, cloud.y, cloud.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // Draw stars
      stars.forEach((star) => {
        ctx.save()
        ctx.globalAlpha = star.opacity * (0.5 + 0.5 * Math.sin(time * star.twinkleSpeed))
        ctx.fillStyle = star.color
        ctx.shadowColor = star.color
        ctx.shadowBlur = star.size * 2
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: -2 }} />
}
