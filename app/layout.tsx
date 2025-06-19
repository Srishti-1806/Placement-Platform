import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/header"
import { GalaxyBackground } from "@/components/galaxy-background"
import { FloatingOrbs } from "@/components/floating-orbs"
import SplashCursor from "@/components/splash-cursor"
import CommunityChat from "@/components/community-chat"
import { SettingsProvider, useSettings } from "@/contexts/settings-context"
import { AuthProvider } from "@/contexts/auth-context"
import { SettingsPanel } from "@/components/settings-panel"
import { FeaturesSidebar } from "@/components/features-sidebar"

export const metadata: Metadata = {
  title: "PlacementPro - Your Complete Placement Solution",
  description: "AI-powered placement preparation platform with speech analysis, resume builder, and community support",
  generator: "v0.dev",
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { galaxyEnabled } = useSettings()

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {galaxyEnabled && <GalaxyBackground />}
      <FloatingOrbs />
      <SplashCursor
        DENSITY_DISSIPATION={2}
        VELOCITY_DISSIPATION={1.5}
        SPLAT_FORCE={4000}
        COLOR_UPDATE_SPEED={20}
        BACK_COLOR={{ r: 0.1, g: 0.1, b: 0.2 }}
      />
      <Header />
      <FeaturesSidebar />
      {children}
      <CommunityChat />
      <SettingsPanel />
    </div>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <SettingsProvider>
            <LayoutContent>{children}</LayoutContent>
          </SettingsProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
