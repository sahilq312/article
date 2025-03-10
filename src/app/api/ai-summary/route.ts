import FireCrawlApp from "@mendable/firecrawl-js";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type ArticleSummary = {
    url: string;
}

export async function POST(req: NextRequest) {
  const { url }: ArticleSummary = await req.json();

  if (!url) {
    return NextResponse.json(
      { error: "Fill the form properly and retry" },
      { status: 400 }
    );
  }
  try {
    const app = new FireCrawlApp({
      apiKey: process.env.FIRECRAWL_APIKEY,
    });

    const schema = z.object({
      summary: z.string(),
    });
    const extractResult = await app.extract(
      [url],
      {
        prompt:
          "Extract and provide a detailed summary of the article, explaining it thoroughly. Include any relevant context if available. also make it atleast 200 words long.",
        schema,
      }
    );
    if (!extractResult.success) {
      return NextResponse.json(
        { error: "Error getting the response" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: extractResult.data.summary},
      { status: 200 }
    );
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Error getting the response" },
      { status: 500 }
    );
  }
}
