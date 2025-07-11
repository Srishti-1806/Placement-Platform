"use client";

import type React from "react";
import { Suspense } from "react"; // Add Suspense import
import "./globals.css";
import { Header } from "@/components/header";
import { GalaxyBackground } from "@/components/galaxy-background";
import { FloatingOrbs } from "@/components/floating-orbs";
import SplashCursor from "@/components/splash-cursor";
import CommunityChat from "@/components/community-chat";
import { SettingsProvider, useSettings } from "@/contexts/settings-context";
import { AuthProvider } from "@/contexts/auth-context";
import { SettingsPanel } from "@/components/settings-panel";
import { FeaturesSidebar } from "@/components/features-sidebar";

// Add this to prevent static prerendering
export const dynamic = 'force-dynamic';

// Loading components for Suspense
function HeaderLoading() {
  return <div className="h-16 bg-gray-800/50 animate-pulse rounded-lg" />;
}

function SidebarLoading() {
  return <div className="w-64 h-screen bg-gray-800/30 animate-pulse" />;
}

function ChatLoading() {
  return <div className="fixed bottom-4 right-4 w-12 h-12 bg-gray-800 rounded-full animate-pulse" />;
}

function SettingsLoading() {
  return <div className="fixed top-4 right-4 w-8 h-8 bg-gray-800 rounded animate-pulse" />;
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isMounted, galaxyEnabled } = useSettings();

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {isMounted && galaxyEnabled && <GalaxyBackground />}
      {isMounted && <FloatingOrbs />}
      {isMounted && (
        <SplashCursor
          DENSITY_DISSIPATION={2}
          VELOCITY_DISSIPATION={1.5}
          SPLAT_FORCE={4000}
          COLOR_UPDATE_SPEED={20}
          BACK_COLOR={{ r: 0.1, g: 0.1, b: 0.2 }}
        />
      )}
      
      {/* Wrap Header in Suspense */}
      <Suspense fallback={<HeaderLoading />}>
        <Header />
      </Suspense>
      
      {/* Wrap FeaturesSidebar in Suspense */}
      <Suspense fallback={<SidebarLoading />}>
        <FeaturesSidebar />
      </Suspense>
      
      {/* Main content */}
      {children}
      
      {/* Wrap CommunityChat in Suspense */}
      <Suspense fallback={<ChatLoading />}>
        <CommunityChat />
      </Suspense>
      
      {/* Wrap SettingsPanel in Suspense */}
      <Suspense fallback={<SettingsLoading />}>
        <SettingsPanel />
      </Suspense>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
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
  );
}
