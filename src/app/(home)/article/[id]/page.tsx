import { fetchArticle } from "@/app/actions/article/article";
import {ArticleAIComponent} from "@/components/articles/article-ai";
import ArticleDetail from "@/components/articles/article-detail";
import React from "react";

export default async function ArticlePreview({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const articleId = parseInt(id, 10);

  if (isNaN(articleId)) {
    return (
      <div className="flex items-center justify-center min-h-[85vh]">
        <div className="p-4 text-red-500 border border-red-300 rounded">
          Invalid article ID
        </div>
      </div>
    );
  }

  const article = await fetchArticle(articleId);
  const data = article.success;

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[85vh]">
        <div className="p-4 text-red-500 border border-red-300 rounded">
          {article.error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6 min-h-[85vh] border border-dashed">
      <ArticleDetail data={data} />
      <ArticleAIComponent article={data.title} />
    </div>
  );
}
