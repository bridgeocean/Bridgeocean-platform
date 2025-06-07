"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

type User = {
  email: string
  role: string
  name: string
} | null

type AuthContextType = {
  user: User
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => ({ success: false, message: "" }),
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Initialize admin user if not exists
  useEffect(() => {
    const initializeAdmin = () => {
      const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
      const adminExists = users.some((u: any) => u.email === "admin@bridgeocean.com")

      if (!adminExists) {
        const adminUser = {
          id: "admin-001",
          name: "BridgeOcean Admin",
          email: "admin@bridgeocean.com",
          password: "BridgeOcean2024!", // You should change this
          company: "BridgeOcean",
          position: "Administrator",
          reason: "System Administrator",
          status: "approved",
          role: "admin",
          registeredAt: new Date().toISOString(),
        }
        users.push(adminUser)
        localStorage.setItem("registeredUsers", JSON.stringify(users))
      }
    }

    initializeAdmin()
  }, [])

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const authStatus = localStorage.getItem("isAuthenticated") === "true"
        const userData = localStorage.getItem("user")

        setIsAuthenticated(authStatus)
        setUser(userData ? JSON.parse(userData) : null)
      } catch (error) {
        console.error("Auth check error:", error)
        setIsAuthenticated(false)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Protect dashboard routes on client-side
  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathname?.startsWith("/dashboard")) {
      router.push("/signin")
    }
    if (!isLoading && !isAuthenticated && pathname?.startsWith("/admin")) {
      router.push("/signin")
    }
  }, [isAuthenticated, isLoading, pathname, router])

  const login = async (email: string, password: string) => {
    try {
      const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
      const user = users.find((u: any) => u.email === email && u.password === password)

      if (!user) {
        return { success: false, message: "Invalid email or password" }
      }

      if (user.status !== "approved") {
        return { success: false, message: "Your account is pending approval. Please contact the administrator." }
      }

      const userData = { email: user.email, role: user.role, name: user.name }
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("user", JSON.stringify(userData))

      // Set cookies for server-side auth check
      document.cookie = "isAuthenticated=true; path=/; max-age=86400"

      setUser(userData)
      setIsAuthenticated(true)
      return { success: true, message: "Login successful" }
    } catch (error) {
      return { success: false, message: "An error occurred during login" }
    }
  }

  const logout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")

    // Clear auth cookie
    document.cookie = "isAuthenticated=; path=/; max-age=0"

    setUser(null)
    setIsAuthenticated(false)
    router.push("/signin")
  }

  return <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}
