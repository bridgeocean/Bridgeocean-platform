"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"

export default function EmergencyAccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"checking" | "success" | "denied">("checking")

  useEffect(() => {
    // Secret key that only you know
    const SECRET_KEY = "bridgeocean2024emergency"
    const providedKey = searchParams.get("key")

    if (providedKey === SECRET_KEY) {
      // Set authentication data
      try {
        localStorage.setItem("isAuthenticated", "true")
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: "bridgeocean@cyberservices.com",
            role: "admin",
            name: "BridgeOcean Admin",
          }),
        )

        sessionStorage.setItem("isAuthenticated", "true")
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            email: "bridgeocean@cyberservices.com",
            role: "admin",
            name: "BridgeOcean Admin",
          }),
        )

        document.cookie = "isAuthenticated=true; path=/; max-age=86400; SameSite=Lax"

        setStatus("success")

        // Redirect after 2 seconds
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      } catch (err) {
        console.error("Storage error:", err)
        setStatus("denied")
      }
    } else {
      setStatus("denied")
    }
  }, [router, searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Emergency Access</CardTitle>
        </CardHeader>
        <CardContent>
          {status === "checking" && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2">Verifying access...</p>
            </div>
          )}

          {status === "success" && (
            <Alert className="border-green-500">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-700">
                Access granted! Redirecting to dashboard...
              </AlertDescription>
            </Alert>
          )}

          {status === "denied" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Access denied. Invalid or missing emergency key.</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
