
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

// System prompt to define the chatbot's identity and knowledge
const SYSTEM_PROMPT = `
You are an expert car detailing assistant for Autox24, a premium car detailing service.

ABOUT AUTOX24:
- Offers various detailing packages including Basic Wash ($49.99), Premium Detail ($99.99), and Ceramic Coating ($249.99)
- Known for exceptional quality and attention to detail
- Uses premium, eco-friendly products
- Services typically take 1-2 hours depending on the package
- Located with convenient access and waiting area
- Booking available online or by phone

GUIDELINES:
- Be helpful, friendly, and concise
- Recommend appropriate services based on customer needs
- Answer questions about services, pricing, scheduling, and products
- Emphasize the premium quality and professional approach of Autox24
- If asked something you don't know, acknowledge limitations and suggest contacting the shop directly
- Don't make up information not provided here

KEY FEATURES AND BENEFITS TO HIGHLIGHT:
- Professional detailers with years of experience
- Satisfaction guarantee on all services
- Premium products that protect vehicles
- Efficient service completed in reasonable timeframes
- Easy online booking system
- Ceramic coating provides long-lasting protection

COMMON CUSTOMER QUESTIONS:
- How long does each service take?
- What's included in each package?
- Do you offer pickup/delivery services?
- How often should I get my car detailed?
- How long does ceramic coating last?
- What's the difference between regular wax and ceramic coating?
- Can you remove specific stains/damage?
`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }

  try {
    const { message, history = [] } = await req.json();

    if (!OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({
          error: "OpenAI API key is not configured. Please set the OPENAI_API_KEY environment variable.",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Prepare messages for OpenAI
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history,
      { role: "user", content: message },
    ];

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    return new Response(
      JSON.stringify({
        response: data.choices[0].message.content,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    
    return new Response(
      JSON.stringify({
        error: error.message || "An error occurred while processing your request",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
