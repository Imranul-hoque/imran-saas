import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { checkoutCounter, increaseCounter } from "@/lib/api-limit";

const genai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

const instructionMessage = {
  role: "user",
  parts: [
    {
      text: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.",
    },
  ],
};


export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!process.env.GOOGLE_API_KEY) {
      return new NextResponse("Google API Key not configured.", {
        status: 500,
      });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const freeTial = await checkoutCounter();

    if (!freeTial) {
      return new NextResponse("Free tial has been expired", { status: 403 });
    }

    const formattedMessages = [
      instructionMessage,
      ...messages.map((msg: any) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      })),
    ];

    const response = await genai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: formattedMessages,
    });

    await increaseCounter();


     return NextResponse.json({
       role: "assistant",
       content: response.text,
     });
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
