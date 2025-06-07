"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, AlertCircle, Eye, EyeOff } from "lucide-react"
import Image from "next/image"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // GUARANTEED WORKING CREDENTIALS
  const ADMIN_EMAIL = "bridgeocean@cyberservices.com"
  const ADMIN_PASSWORD = "admin123"

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // SUPER SIMPLE CHECK - NO EXTERNAL DEPENDENCIES
      if (email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
        // Clear everything first
        localStorage.clear()
        sessionStorage.clear()

        // Set new auth data
        localStorage.setItem("isAuthenticated", "true")
        localStorage.setItem("userEmail", ADMIN_EMAIL)
        localStorage.setItem("userRole", "admin")

        // Set cookie
        document.cookie = "isAuthenticated=true; path=/; max-age=86400"

        // Force redirect
        window.location.href = "/dashboard"
      } else {
        setError("❌ Wrong credentials! Use the blue box below.")
      }
    } catch (err) {
      setError("❌ Login error. Try the emergency reset.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickLogin = () => {
    setEmail(ADMIN_EMAIL)
    setPassword(ADMIN_PASSWORD)
    setError("")
  }

  const handleEmergencyReset = () => {
    localStorage.clear()
    sessionStorage.clear()
    document.cookie.split(";").forEach((c) => {
      const eqPos = c.indexOf("=")
      const name = eqPos > -1 ? c.substr(0, eqPos) : c
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/"
    })
    window.location.reload()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-2 sm:p-4">
      <Card className="w-full max-w-sm sm:max-w-md mx-2">
        <CardHeader className="space-y-1 flex flex-col items-center px-4 sm:px-6">
          <div className="w-32 h-16 sm:w-40 sm:h-20 relative mb-2 sm:mb-4">
            <Image
              src="/images/logo.png"
              alt="BridgeOcean Logo"
              fill
              style={{ objectFit: "contain" }}
              className="max-w-full h-auto"
            />
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold text-center">Admin Sign In</CardTitle>
          <CardDescription className="text-center text-sm">Access your BridgeOcean dashboard</CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          {/* GUARANTEED WORKING CREDENTIALS */}
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-sm text-blue-800 dark:text-blue-200 mb-2">✅ WORKING CREDENTIALS:</h3>
            <div className="text-xs space-y-1 text-blue-700 dark:text-blue-300 break-all">
              <div>
                <strong>Email:</strong>
                <br className="sm:hidden" />
                <span className="text-xs">{ADMIN_EMAIL}</span>
              </div>
              <div>
                <strong>Password:</strong> <span className="font-mono">{ADMIN_PASSWORD}</span>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2 w-full text-xs sm:text-sm"
              onClick={handleQuickLogin}
            >
              🚀 Fill Credentials
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-sm"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-sm pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full text-sm" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Lock className="mr-2 h-4 w-4" /> Sign In
                </span>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 px-4 sm:px-6">
          <Button onClick={handleEmergencyReset} variant="destructive" size="sm" className="w-full text-xs">
            🆘 Emergency Reset (if stuck)
          </Button>
          <div className="text-xs text-center text-muted-foreground">
            <p className="break-words">
              Need help? Contact{" "}
              <a href="mailto:bridgeocean@cyberservices.com" className="text-primary hover:underline break-all">
                bridgeocean@cyberservices.com
              </a>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
