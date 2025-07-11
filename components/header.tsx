"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useSound } from "@/hooks/use-sound";
import { motion, AnimatePresence } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function HeaderInternal() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { playSound } = useSound();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, []);


  const handleMenuToggle = () => {
    const nextState = !isMenuOpen;
    setIsMenuOpen(nextState);
    playSound(nextState ? ("open" as any) : ("close" as any));

  };


  const handleLogout = () => {
    playSound("click");
    logout();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2" onClick={() => playSound("click")}>
          <span className="font-bold text-xl text-foreground">PlacementPro</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/dashboard" legacyBehavior passHref>
                <NavigationMenuLink
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  onClick={() => playSound("hover")}
                >
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/community" legacyBehavior passHref>
                <NavigationMenuLink
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  onClick={() => playSound("hover")}
                >
                  Community
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/interview" legacyBehavior passHref>
                <NavigationMenuLink
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  onClick={() => playSound("hover")}
                >
                  Interview Prep
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* User Menu or Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full" onClick={() => playSound("click")}>
                  <Avatar>
                    <AvatarImage src={user.avatar || undefined} alt={user.name || "User"} />
                    <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer" onClick={() => playSound("click")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login" passHref>
                <Button variant="ghost" onClick={() => playSound("click")}>Log In</Button>
              </Link>
              <Link href="/signup" passHref>
                <Button onClick={() => playSound("click")}>Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
            playSound("click");
          }}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border/40"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link href="/dashboard" className="px-4 py-2 hover:bg-accent rounded-md" onClick={() => playSound("click")}>
                Dashboard
              </Link>
              <Link href="/community" className="px-4 py-2 hover:bg-accent rounded-md" onClick={() => playSound("click")}>
                Community
              </Link>
              <Link href="/interview" className="px-4 py-2 hover:bg-accent rounded-md" onClick={() => playSound("click")}>
                Interview Prep
              </Link>
              {user ? (
                <>
                  <Link href="/profile" className="px-4 py-2 hover:bg-accent rounded-md" onClick={() => playSound("click")}>
                    Profile
                  </Link>
                  <Button onClick={handleLogout} variant="destructive" className="mt-2">
                    Log Out
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-2 border-t border-border/40">
                  <Link href="/login" passHref>
                    <Button variant="outline" className="w-full" onClick={() => playSound("click")}>
                      Log In
                    </Button>
                  </Link>
                  <Link href="/signup" passHref>
                    <Button className="w-full" onClick={() => playSound("click")}>
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Header loading component
function HeaderLoading() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700/50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="w-32 h-8 bg-gray-700 animate-pulse rounded"></div>
          </div>
          <div className="hidden md:flex space-x-8">
            <div className="w-16 h-6 bg-gray-700 animate-pulse rounded"></div>
            <div className="w-16 h-6 bg-gray-700 animate-pulse rounded"></div>
            <div className="w-16 h-6 bg-gray-700 animate-pulse rounded"></div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-8 bg-gray-700 animate-pulse rounded"></div>
            <div className="w-20 h-8 bg-gray-700 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    </header>
  );
}

// Main Header export with Suspense wrapper
export function Header() {
  return (
    <Suspense fallback={<HeaderLoading />}>
      <HeaderInternal />
    </Suspense>
  );
}
