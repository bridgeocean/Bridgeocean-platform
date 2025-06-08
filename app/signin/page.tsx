"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignIn = async (e) => {
    e.preventDefault()
    if (email === "bridgeocean@cyberservices.com" && password === "admin123") {
      localStorage.setItem("isAuthenticated", "true")
      router.push("/dashboard")
    } else {
      alert("Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 bg-blue-100 rounded">
            <p><strong>Admin Login:</strong></p>
            <p>bridgeocean@cyberservices.com</p>
            <p>admin123</p>
            <Button 
              size="sm" 
              onClick={() => {
                setEmail("bridgeocean@cyberservices.com")
                setPassword("admin123")
              }}
            >
              Fill Credentials
            </Button>
          </div>
          
          <form onSubmit={handleSignIn}>
            <div className="space-y-4">
              <Input 
                type="email" 
                placeholder="Email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <Input 
                type="password" 
                placeholder="Password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
