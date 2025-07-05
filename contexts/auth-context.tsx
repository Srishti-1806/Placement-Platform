"use client";

import type React from "react";
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
  logout: () => void;
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
        id: "1",
        name: email.split("@")[0],
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

  const signupGithub = async (): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockUser: User = {
      id: Date.now().toString(),
      name: "GithubUser",
      email: "githubuser@example.com",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=githubuser`,
      role: "student",
      joinedAt: new Date(),
    };
    setUser(mockUser);
    localStorage.setItem("placement-user", JSON.stringify(mockUser));
    setIsLoading(false);
    return true;
  };

  const signupGoogle = async (): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockUser: User = {
      id: Date.now().toString(),
      name: "GoogleUser",
      email: "googleuser@example.com",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=googleuser`,
      role: "student",
      joinedAt: new Date(),
    };
    setUser(mockUser);
    localStorage.setItem("placement-user", JSON.stringify(mockUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("placement-user");
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
