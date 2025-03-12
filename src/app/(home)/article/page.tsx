import { fetchCategory } from "@/app/actions/category/fetch-category";
import { checkOnboardingStatus } from "@/app/actions/category/user-category";
import ArticleList from "@/components/articles/article-list";
import { TopicSelector } from "@/components/topics/topic-selector";
import React from "react";

export default async function ArticlesPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const topicParam = searchParams.topic;
  const { selectedCategories } = await checkOnboardingStatus();
  
  let selectedTopics: string[] = [];
  if (typeof topicParam === "string") {
    selectedTopics = topicParam.split(',');
  } else if (Array.isArray(topicParam)) {
    selectedTopics = topicParam;
  }

  const topicQueryString = selectedTopics.join(',');
  
  const articles = await fetchCategory(topicQueryString || "");

  if (!articles.success || articles.success.length === 0) {
    return (
      <div className="border border-dashed min-h-[85vh] flex flex-col items-center justify-center gap-10">
        <h1 className="text-2xl font-medium">Select a Category</h1>{" "}
        <TopicSelector selectedTopic={topicQueryString} userTopic={selectedCategories} />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col md:flex sm:flex-row border border-dashed h-full lg:max-h-[85vh] ">
      <div className="pt-5 lg:p-6 border border-dashed w-full lg:w-1/4 h-[8vh] lg:min-h-[85vh] lg:pt-10">
        <h1 className="text-3xl font-semibold mb-8 text-center hidden lg:block">
          What&apos;s on your mind?
        </h1>
        <TopicSelector selectedTopic={topicQueryString} userTopic={selectedCategories}/>
      </div>
      <ArticleList articles={articles.success} />
    </div>
  );
}