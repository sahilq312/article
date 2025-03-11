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
    <div className="flex flex-col md:flex sm:flex-row border border-dashed min-h-[85vh] ">
      <div className="pt-5 lg:p-6 border border-dashed w-full lg:w-1/4 h-[8vh] lg:min-h-[85vh] lg:pt-10">
        <h1 className=" text-3xl font-semibold mb-8 text-center hidden lg:block">
          What&apos;s on your mind?
        </h1>
        <TopicSelector selectedTopic={selectedTopic} />
      </div>
      <ArticleList articles={articles.success} />
    </div>
  );
}
