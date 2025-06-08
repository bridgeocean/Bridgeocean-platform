import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { message, companyInfo } = await request.json()

    // Check if Grok API key is available
    if (!process.env.XAI_API_KEY) {
      console.log("Grok API key not found, using fallback response")
      return NextResponse.json({
        text: generateFallbackResponse(message, companyInfo),
        source: "fallback",
      })
    }

    try {
      // Use actual Grok API
      const response = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.XAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "grok-beta",
          messages: [
            {
              role: "system",
              content: `You are a professional WhatsApp assistant for ${companyInfo.name}, a Nigerian company offering:
${companyInfo.services.map((s, i) => `${i + 1}. ${s}`).join("\n")}

Company Details:
- WhatsApp: ${companyInfo.contact.whatsapp.join(" or ")}
- Email: ${companyInfo.contact.email}
- Website: ${companyInfo.contact.website}

Vehicle Pricing:
${Object.entries(companyInfo.pricing)
  .map(([vehicle, price]) => `- ${vehicle}: ${price}`)
  .join("\n")}

IMPORTANT GUIDELINES:
1. Use WhatsApp formatting (* for bold, _ for italic)
2. Include relevant emoji (🚗 for vehicles, 💰 for pricing, 🚨 for emergencies)
3. Start with a greeting and company name
4. For emergencies, emphasize urgency and request location details
5. Include relevant pricing when discussing charter services
6. End with a professional closing
7. Keep responses concise and mobile-friendly
8. Use bullet points or numbered lists
9. Maximum 250 words
10. Always include contact information when relevant

Generate a professional WhatsApp response to this customer message.`,
            },
            {
              role: "user",
              content: message,
            },
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        throw new Error(`Grok API error: ${response.status}`)
      }

      const data = await response.json()
      return NextResponse.json({
        text: data.choices[0].message.content,
        source: "grok",
      })
    } catch (apiError) {
      console.error("Grok API error:", apiError)
      // Fallback to rule-based response
      return NextResponse.json({
        text: generateFallbackResponse(message, companyInfo),
        source: "fallback",
      })
    }
  } catch (error) {
    console.error("Error generating response:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}

// Fallback response generator
function generateFallbackResponse(message: string, companyInfo: any) {
  const lowerMessage = message.toLowerCase()
  const { name, services, contact, pricing } = companyInfo

  if (lowerMessage.includes("emergency") || lowerMessage.includes("urgent") || lowerMessage.includes("accident")) {
    return `🚨 *${name} Emergency Response*\n\nThank you for contacting our emergency services. This requires immediate attention.\n\n1️⃣ Please share your exact location\n2️⃣ Describe the emergency situation\n3️⃣ Number of people involved\n\nOur emergency coordination team is on standby. Call our emergency hotline at ${contact.whatsapp[0]}.\n\n*Nexus Emergency Logistics* - Satellite-Powered Coordination`
  }

  if (
    lowerMessage.includes("book") ||
    lowerMessage.includes("charter") ||
    lowerMessage.includes("hire") ||
    lowerMessage.includes("car")
  ) {
    let response = `🚗 *${name} Charter Services*\n\nThank you for your interest in our premium charter services.\n\n*Our Vehicles:*\n`

    Object.entries(pricing).forEach(([vehicle, price]) => {
      response += `• ${vehicle}: ${price}\n`
    })

    response += `\n*To proceed with booking:*\n1️⃣ Pickup location and destination\n2️⃣ Date and time\n3️⃣ Duration of service\n4️⃣ Number of passengers\n\nBook directly: ${contact.website}/charter/book`

    return response
  }

  if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("rate")) {
    let response = `💰 *${name} Pricing Information*\n\n*Our current rates:*\n\n`

    Object.entries(pricing).forEach(([vehicle, price]) => {
      response += `• ${vehicle}: ${price}\n`
    })

    response += `\n*Additional Information:*\n• Additional charges apply for trips outside Lagos\n• All prices include professional driver, fuel, and vehicle maintenance\n\nFor custom quotes or special requirements, please provide more details about your trip.\n\nThank you for choosing ${name}!`

    return response
  }

  return `👋 *Welcome to ${name}*\n\nThank you for reaching out! We offer:\n\n${services.map((service) => `• ${service}`).join("\n")}\n\nHow may we assist you today?\n\n*Contact:*\n• WhatsApp: ${contact.whatsapp[0]}\n• Email: ${contact.email}\n• Website: ${contact.website}`
}
