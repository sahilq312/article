"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { ScrollArea } from "../ui/scroll-area";
import { Sparkles } from "lucide-react";

export const ArticleAIComponent = ({ article }: { article: string }) => {
  const [summary, setSummary] = useState<{ summary: string } | null>(null);

  useEffect(() => {
    const summarizeArticle = async () => {
      try {
        const response = await axios.post("/api/ai-summary", { url: article });
        console.log(response.data.success);
        setSummary({ summary: response.data.success });
      } catch (error) {
        console.error("Error fetching AI summary:", error);
        setSummary(null);
      }
    };
    summarizeArticle();
  }, [article]);

  return (
    <div className="w-full p-2">
      <ScrollArea>
        <h1 className="leading-7 [&:not(:first-child)]:mt-6 text-lg italic font-semibold flex gap-1">
          <Sparkles />
          AI Summary
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6 font-light text-base italic">
          {summary?.summary ?? <Skeleton className="w-full h-52" />}
        </p>
      </ScrollArea>
    </div>
  );
};
