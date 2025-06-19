"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface SettingsContextType {
  galaxyEnabled: boolean
  setGalaxyEnabled: (enabled: boolean) => void
  soundEnabled: boolean
  setSoundEnabled: (enabled: boolean) => void
  theme: "dark" | "light"
  setTheme: (theme: "dark" | "light") => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [galaxyEnabled, setGalaxyEnabled] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("placement-settings")
    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      setGalaxyEnabled(settings.galaxyEnabled ?? true)
      setSoundEnabled(settings.soundEnabled ?? true)
      setTheme(settings.theme ?? "dark")
    }
  }, [])

  useEffect(() => {
    // Save settings to localStorage
    const settings = { galaxyEnabled, soundEnabled, theme }
    localStorage.setItem("placement-settings", JSON.stringify(settings))
  }, [galaxyEnabled, soundEnabled, theme])

  return (
    <SettingsContext.Provider
      value={{
        galaxyEnabled,
        setGalaxyEnabled,
        soundEnabled,
        setSoundEnabled,
        theme,
        setTheme,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}
