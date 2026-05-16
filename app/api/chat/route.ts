import { openai } from "@/lib/openai";
import { getSystemPrompt } from "@/lib/portfolio-context";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body?.messages || [];

    // Keep only last 10 messages
    const trimmedMessages = messages.slice(-10);

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: getSystemPrompt(),
        },
        ...trimmedMessages,
      ],
      max_tokens: 300,
      temperature: 0.5,
    });

    return NextResponse.json({
      message: response.choices[0]?.message?.content || "",
    });
  } catch (error) {
    console.error("Chat API Error:", error);

    return NextResponse.json(
        {
          error: "Failed to fetch response from AI",
        },
        { status: 500 }
    );
  }
}