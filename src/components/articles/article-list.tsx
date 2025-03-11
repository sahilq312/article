import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ScrollArea } from "../ui/scroll-area";

type ArticleListProp = {
  id: number;
  title: string;
  link: string;
  source: string;
  imageUrl: string | null;
  snippet: string | null;
  category: string;
  createdAt: Date | null;
}[];

const ArticleList = ({ articles }: { articles: ArticleListProp }) => {
  return (
    <div className="h-full w-full flex flex-col">
      <ScrollArea className="h-[85vh] w-full">
        <div className="flex flex-col gap-4 p-4 divide-y">
          {articles.map((article) => (
            <Link
              href={`/article/${article.id}`}
              className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center p-2 min-h-24 gap-3"
              key={article.id}
            >
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Image
                  className="w-16 h-16 rounded-sm object-cover"
                  unoptimized
                  width={20}
                  height={20}
                  src={article.imageUrl || "https://placeholder"}
                  alt="article"
                />
                <div className="flex flex-col justify-center text-left gap-2 flex-1 sm:hidden">
                  <Link href={article.link}>
                    <p className="text-base font-medium hover:underline italic">
                      {article.title}
                    </p>
                  </Link>
                </div>
              </div>

              <div className="flex-col justify-center text-left gap-2 flex-1 hidden sm:flex">
                <Link href={article.link}>
                  <p className="text-base font-medium hover:underline italic">
                    {article.title}
                  </p>
                </Link>
                <p className="text-sm text-pretty font-light line-clamp-2">
                  {article.snippet}
                </p>
              </div>

              <div className="sm:hidden w-full">
                <p className="text-sm text-pretty font-light line-clamp-2 mb-2">
                  {article.snippet}
                </p>
                <div className="flex justify-between items-center w-full">
                  <p className="text-muted-foreground text-xs">
                    {article.source}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {article.createdAt
                      ? article.createdAt.toDateString()
                      : "No date available"}
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex flex-col gap-2">
                <p className="text-muted-foreground text-xs text-right">
                  {article.source}
                </p>
                <p className="text-muted-foreground text-xs text-right">
                  {article.createdAt
                    ? article.createdAt.toDateString()
                    : "No date available"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ArticleList;