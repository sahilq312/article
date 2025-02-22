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
    <div className="w-3/4 h-[85vh]">
      <ScrollArea className="h-full">
        <div className="flex flex-col items-center justify-center gap-4 p-4 divide-y">
          {articles.map((article) => (
            <Link 
              href={`/article/${article.id}`}
              className="w-full flex justify-around items-center p-2 h-24 gap-2 "
              key={article.id}
            >
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
                  <p className=" text-base font-medium hover:underline italic">
                    {article.title}
                  </p>
                </Link>
                <p className="text-sm text-pretty font-light">
                  {article.snippet}
                </p>
              </div>
              <div className="flex flex-col gap-2">
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
