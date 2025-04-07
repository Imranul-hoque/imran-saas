import { checkoutCounter, increaseCounter } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!process.env.REPLICATE_API_TOKEN) {
      return new NextResponse("Replicate API Key not configured.", {
        status: 500,
      });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    if (!amount) {
      return new NextResponse("Amount is required", { status: 400 });
    }

    if (!resolution) {
      return new NextResponse("Resolution is required", { status: 400 });
    }

    const freeTial = await checkoutCounter();

    if (!freeTial) {
      return new NextResponse("Free tial has been expired", { status: 403 });
    }

    const input = {
      raw: false,
      prompt: prompt,
      aspect_ratio: "3:2",
      output_format: "jpg",
      safety_tolerance: 2,
    };

    const output = await replicate.run("black-forest-labs/flux-1.1-pro-ultra", {
      input,
    });
    
    // @ts-ignore
    const images = output?.map?.((image: { url: string }) => image.url) || [];

    await increaseCounter();
    return NextResponse.json({ images });
  } catch (error) {
    console.log("[IMAGE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
