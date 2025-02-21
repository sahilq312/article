import { NextResponse } from "next/server";
import axios from "axios";
import { db } from "@/db/drizzle";
import { articles } from "@/db/schema";

const topics: string[] = ["News", "Sports", "Technology", "Business", "Entertainment", "Health"];

interface Article {
  title: string;
  link: string;
  snippet: string;
  source: string;
  imageUrl: string;
}

interface TopicResult {
  topic: string;
  articles?: Article[];
  error?: string;
}

interface FlattenedArticle extends Article {
  category: string;
}

function flattenArticles(data: TopicResult[]): FlattenedArticle[] {
  return data.flatMap((item) =>
    item.articles?.map((article) => ({
      title: article.title,
      link: article.link,
      source: article.source,
      imageUrl: article.imageUrl,
      snippet: article.snippet || "",
      category: item.topic,
    })) || []
  );
}

export async function GET() {
  try {
    const apiKey = process.env.SERPER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API key." }, { status: 500 });
    }

    const fetchArticles = async (topic: string): Promise<TopicResult> => {
      try {
        const response = await axios.post<{ news: Article[] }>(
          "https://google.serper.dev/news",
          { q: topic, num: 10, hl: "en", gl: "us" },
          {
            headers: {
              "X-API-KEY": apiKey,
              "Content-Type": "application/json",
            },
          }
        );
        return { topic, articles: response.data.news };
      } catch (error) {
        return { topic, error: error instanceof Error ? error.message : String(error) };
      }
    };

    const results = await Promise.allSettled(topics.map(fetchArticles));

    // Normalize results
    const formattedResults: TopicResult[] = results.map((result) =>
      result.status === "fulfilled" ? result.value : { topic: "", error: "Unknown error" }
    );

    // Flatten articles
    const flattenedArticles = flattenArticles(formattedResults);

    if(flattenedArticles.length === 0) {
      return NextResponse.json({ message: "No articles found" }, { status: 404 });
    }
    if (flattenedArticles.length > 0) {
      await db.insert(articles).values(flattenedArticles).onConflictDoNothing();
    }


    return NextResponse.json(flattenedArticles);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch articles from Serper", error: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}
