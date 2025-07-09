"use client";

import type React from "react";
import { auth } from "@/lib/firebase";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "student" | "admin";
  joinedAt: Date;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  signupGithub: () => Promise<boolean>;
  signupGoogle: () => Promise<boolean>;
  logout: () => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("placement-user");
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error("Failed to parse saved user:", error);
          localStorage.removeItem("placement-user");
        }
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email && password.length >= 6) {
      const mockUser: User = {
        id: Date.now().toString(),
        name: email.split("@")[0], // Use email prefix as name
        email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        role: "student",
        joinedAt: new Date(),
      };
      setUser(mockUser);
      localStorage.setItem("placement-user", JSON.stringify(mockUser));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (name && email && password.length >= 6) {
      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        role: "student",
        joinedAt: new Date(),
      };
      setUser(mockUser);
      localStorage.setItem("placement-user", JSON.stringify(mockUser));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const signupGoogle = async (): Promise<boolean> => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);

      const mockUser: User = {
        id: result.user.uid,
        name: result.user.displayName || "Google User",
        email: result.user.email || "",
        avatar: result.user.photoURL || undefined,
        role: "student",
        joinedAt: new Date(),
      };

      setUser(mockUser);
      localStorage.setItem("placement-user", JSON.stringify(mockUser));
      setIsLoading(false);
      return true;
    } catch (e: any) {
      console.log("ERROR IN GOOGLE SIGNIN", e.message);
      setIsLoading(false);
      return false;
    }
  };

  const signupGithub = async (): Promise<boolean> => {
    setIsLoading(true);
    const provider = new GithubAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);

      const mockUser: User = {
        id: result.user.uid,
        name: result.user.displayName || "GitHub User",
        email: result.user.email || "",
        avatar: result.user.photoURL || undefined,
        role: "student",
        joinedAt: new Date(),
      };

      setUser(mockUser);
      localStorage.setItem("placement-user", JSON.stringify(mockUser));
      setIsLoading(false);
      return true;
    } catch (e: any) {
      console.log("ERROR IN GITHUB SIGNIN", e.message);
      setIsLoading(false);
      return false;
    }
  };

  const logout = async (): Promise<boolean> => {
    setUser(null);
    localStorage.removeItem("placement-user");

    try {
      await signOut(auth);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        signupGithub,
        signupGoogle,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
