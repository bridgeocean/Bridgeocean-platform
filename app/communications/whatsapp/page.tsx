"use client"

import { MainNav } from "@/components/main-nav"
import { WhatsAppIntegration } from "@/components/whatsapp-integration"
import { WhatsAppGrokAI } from "@/components/whatsapp-grok-ai"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone, Settings, MessageCircle, ExternalLink, Sparkles } from "lucide-react"

export default function WhatsAppPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">WhatsApp Communications</h2>
          <p className="text-muted-foreground">
            Generate professional responses for WhatsApp communications with driver candidates and clients
          </p>
        </div>

        <Tabs defaultValue="grok" className="space-y-4">
          <TabsList>
            <TabsTrigger value="send">Send Messages</TabsTrigger>
            <TabsTrigger value="grok">
              <Sparkles className="h-4 w-4 mr-2" />
              Grok AI Assistant
            </TabsTrigger>
            <TabsTrigger value="business">Business Setup</TabsTrigger>
            <TabsTrigger value="api">API Integration</TabsTrigger>
          </TabsList>

          <TabsContent value="send" className="space-y-4">
            <WhatsAppIntegration />
          </TabsContent>

          <TabsContent value="grok" className="space-y-4">
            <WhatsAppGrokAI />
          </TabsContent>

          <TabsContent value="business" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Business Contact Numbers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Primary Business WhatsApp</Label>
                      <div className="flex items-center gap-2">
                        <Input value="+234 906 918 3165" readOnly />
                        <Button size="sm" onClick={() => window.open("https://wa.me/2349069183165", "_blank")}>
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Secondary Business WhatsApp</Label>
                      <div className="flex items-center gap-2">
                        <Input value="+234 913 563 0154" readOnly />
                        <Button size="sm" onClick={() => window.open("https://wa.me/2349135630154", "_blank")}>
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Business Name</Label>
                    <Input value="BridgeOcean" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Business Description</Label>
                    <Input value="Satellite-Powered Emergency Logistics & Charter Services" readOnly />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() =>
                      window.open(
                        "https://wa.me/2349069183165?text=Test%20message%20from%20BridgeOcean%20platform",
                        "_blank",
                      )
                    }
                  >
                    Test Primary WhatsApp (+234 906 918 3165)
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() =>
                      window.open(
                        "https://wa.me/2349135630154?text=Test%20message%20from%20BridgeOcean%20platform",
                        "_blank",
                      )
                    }
                  >
                    Test Secondary WhatsApp (+234 913 563 0154)
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => window.open("https://business.whatsapp.com/", "_blank")}
                  >
                    WhatsApp Business Web
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Integration Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">WhatsApp Web</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Business API</span>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pending</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Webhook</span>
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Not Set</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Grok AI</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI Integration Setup</CardTitle>
                <CardDescription>Configure your AI assistant for automated WhatsApp responses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Grok AI (xAI) - Recommended</h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li>
                        Sign up at{" "}
                        <a
                          href="https://x.ai"
                          target="_blank"
                          className="text-blue-600 hover:underline"
                          rel="noreferrer"
                        >
                          x.ai
                        </a>
                      </li>
                      <li>Navigate to API section</li>
                      <li>Generate your API key</li>
                      <li>Add XAI_API_KEY to Vercel environment variables</li>
                      <li>Redeploy your application</li>
                    </ol>
                    <Button onClick={() => window.open("https://x.ai", "_blank")} className="w-full">
                      Get Started with Grok AI
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Fallback System</h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li>Intelligent rule-based responses</li>
                      <li>Context-aware message generation</li>
                      <li>Professional WhatsApp formatting</li>
                      <li>Emergency situation handling</li>
                      <li>Booking and pricing assistance</li>
                    </ol>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-800">
                        ✅ Fallback system is always active and provides professional responses even without AI API
                        keys.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Current Status: Hybrid AI System</h4>
                  <p className="text-sm text-gray-600">
                    Your platform uses Grok AI when available, with an intelligent fallback system that ensures
                    professional responses are always generated. This provides reliability and cost control.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
