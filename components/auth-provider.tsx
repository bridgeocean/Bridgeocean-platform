"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase"
import type { User } from "@supabase/supabase-js"

type AuthUser = {
  id: string
  email: string
  name: string
  role: string
} | null

type AuthContextType = {
  user: AuthUser
  isAuthenticated: boolean
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  signUp: (
    email: string,
    password: string,
    name: string,
    company?: string,
    position?: string,
  ) => Promise<{ success: boolean; message: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  signIn: async () => ({ success: false, message: "" }),
  signUp: async () => ({ success: false, message: "" }),
  signOut: async () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session?.user) {
        await loadUserProfile(session.user)
      }
      setIsLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await loadUserProfile(session.user)
      } else {
        setUser(null)
        setIsAuthenticated(false)
      }
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadUserProfile = async (authUser: User) => {
    try {
      const { data: profile, error } = await supabase.from("users").select("*").eq("email", authUser.email).single()

      if (error) {
        console.error("Error loading user profile:", error)
        return
      }

      if (profile && profile.status === "approved") {
        setUser({
          id: profile.id,
          email: profile.email,
          name: profile.name,
          role: profile.role,
        })
        setIsAuthenticated(true)
      } else {
        setUser(null)
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error("Error loading user profile:", error)
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  // Protect dashboard routes
  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathname?.startsWith("/dashboard")) {
      router.push("/signin")
    }
    if (!isLoading && !isAuthenticated && pathname?.startsWith("/admin")) {
      router.push("/signin")
    }
  }, [isAuthenticated, isLoading, pathname, router])

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { success: false, message: error.message }
      }

      if (data.user) {
        await loadUserProfile(data.user)
        return { success: true, message: "Sign in successful" }
      }

      return { success: false, message: "Sign in failed" }
    } catch (error) {
      return { success: false, message: "An error occurred during sign in" }
    }
  }

  const signUp = async (email: string, password: string, name: string, company?: string, position?: string) => {
    try {
      // First create the auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        return { success: false, message: error.message }
      }

      if (data.user) {
        // Then create the user profile
        const { error: profileError } = await supabase.from("users").insert({
          email,
          name,
          company,
          position,
          role: "user",
          status: "pending",
        })

        if (profileError) {
          return { success: false, message: "Failed to create user profile" }
        }

        return { success: true, message: "Registration successful. Please wait for admin approval." }
      }

      return { success: false, message: "Registration failed" }
    } catch (error) {
      return { success: false, message: "An error occurred during registration" }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setIsAuthenticated(false)
    router.push("/signin")
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
