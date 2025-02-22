import { CalendarArrowDown, NewspaperIcon, TagIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

type Article = {
    id: number;
    title: string;
    link: string;
    source: string;
    imageUrl: string | null;
    snippet: string | null;
    category: string;
    createdAt: Date | null;
} 

const ArticleDetail = ({data}: {data: Article}) => {
  return (
    <article className="flex justify-evenly items-center w-full h-1/3">
        <div className="p-3 ">
          <Image
            src={data.imageUrl || "/placeholder.svg"}
            alt={data.title}
            width={200}
            height={200}
            unoptimized
            className="transition-opacity duration-300 rounded-md hover:opacity-75"
          />
        </div>
        <div className="p-3 flex flex-col gap-2">
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-2xl">
            {data.title}
          </h1>
          <h3 className="scroll-m-20 text-lg font-semibold tracking-tight italic text-left text-muted-foreground">
            {data.snippet}
          </h3>
          <div className="flex items-center text-sm gap-2 text-muted-foreground">
            <TagIcon size={16} className="" />
            <span>{data.category}</span>
          </div>
          <div className="flex items-center text-xs gap-2 text-muted-foreground">
            <NewspaperIcon size={16} className="" />
            <span>{data.source}</span>
          </div>
          <div className="flex items-center text-sm gap-2 text-muted-foreground">
            <CalendarArrowDown size={16} className="mr-2" />
            <span>{data.createdAt?.toLocaleDateString()}</span>
          </div>
          <Link
            href={data.link}
            className="inline-flex items-center px-4 py-2 transition-colors duration-300"
          >
            <Button className="bg-[#ff9066] text-[#2a1711] border-[#2a1711]">Read More</Button>
          </Link>
        </div>
      </article>
  )
}

export default ArticleDetail