"use client"

import { useRef, useState, useEffect } from "react"
import "./components/FallingText.css"

interface FallingTextProps {
  text?: string
  highlightWords?: string[]
  highlightClass?: string
  trigger?: "auto" | "scroll"
  gravity?: number
  fontSize?: string
  className?: string
}

const FallingText = ({
  text = "Default Text",
  highlightWords = [],
  highlightClass = "highlighted",
  trigger = "auto",
  gravity = 1.0,
  fontSize = "2rem",
  className = "",
}: FallingTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (trigger === "auto") {
      setIsVisible(true)
    } else if (trigger === "scroll") {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        },
        { threshold: 0.1 },
      )

      if (containerRef.current) {
        observer.observe(containerRef.current)
      }

      return () => observer.disconnect()
    }
  }, [trigger])

  const renderText = () => {
    const words = text.split(" ")
    return words.map((word, index) => {
      const isHighlighted = highlightWords.includes(word)
      return (
        <span
          key={index}
          className={`word ${isHighlighted ? highlightClass : ""}`}
          style={{
            fontSize,
            animationDelay: `${index * 0.1}s`,
            display: "inline-block",
            marginRight: "0.5em",
          }}
        >
          {word}
        </span>
      )
    })
  }

  return (
    <div ref={containerRef} className={`falling-text-container ${className}`} style={{ minHeight: "100px" }}>
      <div className={`falling-text-target ${isVisible ? "animate" : ""}`}>{renderText()}</div>
    </div>
  )
}

export { FallingText }
export default FallingText
