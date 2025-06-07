"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Send, Loader2, Copy, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { generateText } from "ai"
import { grok } from "@ai-sdk/grok"

export function WhatsAppGrokAI() {
  const [customerMessage, setCustomerMessage] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  // Example messages for quick testing
  const exampleMessages = [
    "I need to book a car for tomorrow from Lagos to Ibadan",
    "What are your prices for charter services?",
    "There's been an accident on Third Mainland Bridge, we need emergency assistance",
    "How can I register my vehicle with your service?",
    "Tell me more about your Nexus emergency logistics platform",
  ]

  // Generate AI response using Grok
  const generateAIResponse = async (message: string) => {
    setIsGenerating(true)

    try {
      const { text } = await generateText({
        model: grok("grok-1"),
        prompt: `You are a professional assistant for BridgeOcean, a Nigerian company offering:
        1. Nexus Emergency Logistics - Satellite-powered emergency coordination for medical and traffic emergencies
        2. Premium Charter Services - Professional vehicles for hire
        3. Partnership Opportunities - Register vehicles with our platform
        
        Company Details:
        - WhatsApp: +234 906 918 3165 or +234 913 563 0154
        - Email: bridgeocean@cyberservices.com
        - Website: bridgeocean.xyz
        
        Vehicle Pricing:
        - Toyota Camry (2006): ₦100,000 per 10 hours
        - GMC Terrain (2011): ₦200,000 per 10 hours
        - Additional charges apply for trips outside Lagos
        
        Generate a professional WhatsApp response to this customer message:
        "${message}"
        
        Format guidelines:
        - Use WhatsApp formatting (use * for bold, _ for italic)
        - Include emoji where appropriate
        - Start with a greeting and company name
        - Include relevant pricing details when discussing charter services
        - For emergencies, emphasize urgency and request location details
        - Include appropriate contact information
        - End with a professional closing
        - Keep responses concise, helpful and professional
        - Format the response to be easily readable on mobile
        - Use bullet points or numbered lists where appropriate
        - Maximum 250 words`,
        maxTokens: 500,
      })

      setAiResponse(text)
    } catch (error) {
      console.error("Error generating AI response:", error)
      toast({
        title: "Error generating response",
        description: "There was an error connecting to the AI service. Please try again.",
        variant: "destructive",
      })
      setAiResponse("Sorry, I couldn't generate a response at this time. Please try again later.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleGenerateResponse = () => {
    if (!customerMessage.trim()) {
      toast({
        title: "Message required",
        description: "Please enter a customer message to generate a response",
        variant: "destructive",
      })
      return
    }

    generateAIResponse(customerMessage)
  }

  const copyToClipboard = () => {
    if (!aiResponse) return

    navigator.clipboard.writeText(aiResponse)
    toast({
      title: "Copied to clipboard",
      description: "AI response has been copied to your clipboard",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Grok AI WhatsApp Assistant
          </CardTitle>
          <CardDescription>
            Generate intelligent, context-aware responses for WhatsApp communications using Grok AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Customer Message</label>
            <Textarea
              placeholder="Enter customer message or inquiry here..."
              value={customerMessage}
              onChange={(e) => setCustomerMessage(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Example Messages</label>
            <div className="flex flex-wrap gap-2">
              {exampleMessages.map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setCustomerMessage(example)}
                  className="text-xs"
                >
                  {example.length > 30 ? example.substring(0, 30) + "..." : example}
                </Button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleGenerateResponse}
            className="w-full"
            disabled={isGenerating || !customerMessage.trim()}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Response...
              </>
            ) : (
              <>
                <Bot className="mr-2 h-4 w-4" />
                Generate AI Response
              </>
            )}
          </Button>

          {aiResponse && (
            <div className="space-y-2 mt-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">AI Generated Response</label>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => generateAIResponse(customerMessage)}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="bg-muted p-3 rounded-md whitespace-pre-wrap text-sm">{aiResponse}</div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    // Open WhatsApp with the generated response (primary number)
                    const encodedResponse = encodeURIComponent(aiResponse)
                    window.open(`https://wa.me/2349069183165?text=${encodedResponse}`, "_blank")
                  }}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send via Primary
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    // Open WhatsApp with the generated response (secondary number)
                    const encodedResponse = encodeURIComponent(aiResponse)
                    window.open(`https://wa.me/2349135630154?text=${encodedResponse}`, "_blank")
                  }}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send via Secondary
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
