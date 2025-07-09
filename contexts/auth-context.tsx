"use client";

<<<<<<< HEAD
import type React from "react"
import { auth } from "@/lib/firebase";
import {GithubAuthProvider, GoogleAuthProvider, signInWithPopup,signOut } from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react"
=======
import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
>>>>>>> 86f21e63f98536dd215fb6be9d8e8f23d1016a9b

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "student" | "admin";
  joinedAt: Date;
}

interface AuthContextType {
<<<<<<< HEAD
  user: User | null
  signupGoogle: () => Promise<boolean>
  logout: () => Promise<boolean>
  signupGithub: () => Promise<boolean>
  isLoading: boolean
=======
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  signupGithub: () => Promise<boolean>;
  signupGoogle: () => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
>>>>>>> 86f21e63f98536dd215fb6be9d8e8f23d1016a9b
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

<<<<<<< HEAD
  const signupGoogle = async (): Promise<boolean> => {
    setIsLoading(true)
    const provider = new GoogleAuthProvider();
    // Simulate API call
    try{
      const result = await signInWithPopup(auth, provider);
    
      // Mock registration
=======
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email && password.length >= 6) {
>>>>>>> 86f21e63f98536dd215fb6be9d8e8f23d1016a9b
      const mockUser: User = {
        id: result.user.uid,
        name:result.user.displayName ,
        email:result.user.email,
        avatar:result.user.photoURL,
        role: "student",
        joinedAt: new Date(),
<<<<<<< HEAD
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
=======
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
>>>>>>> 86f21e63f98536dd215fb6be9d8e8f23d1016a9b
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
