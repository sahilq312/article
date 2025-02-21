import { fetchCategory } from "@/app/actions/category/fetch-category";
import ArticleList from "@/components/articles/article-list";
import { TopicSelector } from "@/components/topics/topic-selector";
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
      <ArticleList articles={articles.success} />
    </div>
  );
}
