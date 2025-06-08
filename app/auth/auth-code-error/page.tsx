import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="w-40 h-20 relative mb-4">
            <Image src="/images/logo.png" alt="BridgeOcean Logo" fill style={{ objectFit: "contain" }} />
          </div>
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <CardTitle className="text-2xl font-bold text-center">Authentication Error</CardTitle>
          <CardDescription className="text-center">
            There was an error processing your authentication. This could be due to an expired or invalid link.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Please try signing in again or request a new authentication link.
          </p>
          <div className="space-y-2">
            <Link href="/auth/signin">
              <Button className="w-full">Try Signing In Again</Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="outline" className="w-full">
                Create New Account
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
