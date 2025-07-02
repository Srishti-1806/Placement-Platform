"use client"

import type React from "react"
import { auth } from "@/lib/firebase";
import {GithubAuthProvider, GoogleAuthProvider, signInWithPopup,signOut } from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "student" | "admin"
  joinedAt: Date
}

interface AuthContextType {
  user: User | null
  signupGoogle: () => Promise<boolean>
  logout: () => Promise<boolean>
  signupGithub: () => Promise<boolean>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("placement-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const signupGoogle = async (): Promise<boolean> => {
    setIsLoading(true)
    const provider = new GoogleAuthProvider();
    // Simulate API call
    try{
      const result = await signInWithPopup(auth, provider);
    
      // Mock registration
      const mockUser: User = {
        id: result.user.uid,
        name:result.user.displayName ,
        email:result.user.email,
        avatar:result.user.photoURL,
        role: "student",
        joinedAt: new Date(),
      }

      setUser(mockUser)
      localStorage.setItem("placement-user", JSON.stringify(mockUser))
      setIsLoading(false)
      return true
    }catch(e){
      console.log("ERROR IN GOOGLE SINGIN",e.message)
      setIsLoading(false)
      return false
    }
    
  }

  const logout = async(): Promise<boolean> => {
    setUser(null)
    localStorage.removeItem("placement-user")
    try{
      await signOut(auth);
      return true
    }catch(e){
      return false
    }
  }

  const signupGithub = async (): Promise<boolean> => {
    setIsLoading(true)
    const provider = new GithubAuthProvider();
    // Simulate API call
    try{
      const result = await signInWithPopup(auth, provider);
    
      // Mock registration
      const mockUser: User = {
        id: result.user.uid,
        name:result.user.displayName ,
        email:result.user.email,
        avatar:result.user.photoURL,
        role: "student",
        joinedAt: new Date(),
      }

      setUser(mockUser)
      localStorage.setItem("placement-user", JSON.stringify(mockUser))
      setIsLoading(false)
      return true
    }catch(e){
      console.log("ERROR IN GITHUB SINGIN",e.message)
      setIsLoading(false)
      return false
    }
    
  }


  return <AuthContext.Provider value={{ user, signupGoogle, logout,signupGithub,isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
