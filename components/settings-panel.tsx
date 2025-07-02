"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Settings, Sparkles, Volume2, Palette, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useSettings } from "@/contexts/settings-context"

export function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const { galaxyEnabled, setGalaxyEnabled, soundEnabled, setSoundEnabled, theme, setTheme } = useSettings()

  return (
    <>
      {/* Settings Button */}
      <motion.div className="fixed top-24 right-4 z-50" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gray-900/80 border border-gray-700 text-white hover:bg-gray-800/90 backdrop-blur-md"
          size="icon"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </motion.div>

      {/* Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-80 bg-gray-900/95 border-l border-gray-700 backdrop-blur-md z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <Settings className="mr-2 h-5 w-5" />
                    Settings
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Visual Effects */}
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center text-sm">
                        <Sparkles className="mr-2 h-4 w-4 text-purple-400" />
                        Visual Effects
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="galaxy-toggle" className="text-gray-300">
                          Galaxy Background
                        </Label>
                        <Switch className="border-gray-700" id="galaxy-toggle" checked={galaxyEnabled} onCheckedChange={setGalaxyEnabled} />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Audio Settings */}
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center text-sm">
                        <Volume2 className="mr-2 h-4 w-4 text-cyan-400" />
                        Audio
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sound-toggle" className="text-gray-300">
                          Sound Effects
                        </Label>
                        <Switch className="border-gray-700"  id="sound-toggle" checked={soundEnabled} onCheckedChange={setSoundEnabled} />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Theme Settings */}
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center text-sm">
                        <Palette className="mr-2 h-4 w-4 text-yellow-400" />
                        Theme
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant={theme === "dark" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTheme("dark")}
                          className="text-xs"
                        >
                          Dark
                        </Button>
                        <Button
                          variant={theme === "light" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTheme("light")}
                          className="text-xs"
                        >
                          Light
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
