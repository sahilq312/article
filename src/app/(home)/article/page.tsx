import { fetchCategory } from "@/app/actions/category/fetch-category";
import { TopicSelector } from "@/components/topics/topic-selector";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function ArticlesPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const selectedTopic =
    typeof searchParams.topic === "string" ? searchParams.topic : undefined;

  //console.log(selectedTopic);
  const articles = await fetchCategory(selectedTopic || "");
  if (!articles.success || articles.success.length === 0) {
    return (
      <div className="border border-dashed min-h-[85vh] flex flex-col items-center justify-center gap-10">
        <h1 className="text-2xl font-medium">Select a Category</h1>{" "}
        <TopicSelector selectedTopic={selectedTopic} />
      </div>
    );
  }
  return (
    <div className="flex border border-dashed min-h-[85vh] ">
      <div className="p-6 border border-dashed w-1/4 min-h-[85vh] pt-10">
        <h1 className=" text-3xl font-semibold mb-8 text-center">
          What&apos;s on your mind?
        </h1>
        <TopicSelector selectedTopic={selectedTopic} />
      </div>
      <div className="w-3/4 h-[85vh]">
        <ScrollArea className="h-full">
          <div className="flex flex-col items-center justify-center gap-4 p-4 divide-y">
            {articles.success.map((article) => (
              <div className="w-full flex justify-around items-center p-2 h-24 gap-2 " key={article.id}>
                <Image
                  className="w-16 h-16 rounded-sm"
                  objectFit="cover"
                  unoptimized
                  width={20}
                  height={20}
                  src={article.imageUrl || "https://placeholder"}
                  alt="article"
                />
                <div className="flex flex-col justify-center text-left gap-2 flex-1">
                  <Link /* href={`/article/${article.id}`} */ href={article.link}>
                    <p className=" text-base font-medium hover:underline italic">{article.title}</p>
                  </Link>
                  <p className="text-sm text-pretty font-light">{article.snippet}</p>
                </div>
                <div className="flex flex-col gap-2">
                <p className="text-muted-foreground text-xs text-right">{article.source}</p>
                  <p className="text-muted-foreground text-xs text-right">{article.createdAt ? article.createdAt.toDateString() : 'No date available'}</p>
                  </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
