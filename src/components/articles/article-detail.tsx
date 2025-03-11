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
    <article className="flex flex-col md:flex-row justify-center md:justify-evenly items-center w-full h-auto md:h-1/3 gap-4">
        <div className="p-2 md:p-3">
          <Image
            src={data.imageUrl || "/placeholder.svg"}
            alt={data.title}
            width={200}
            height={200}
            unoptimized
            className="transition-opacity duration-300 rounded-md hover:opacity-75 w-full max-w-xs object-cover h-auto"
          />
        </div>
        <div className="p-2 md:p-3 flex flex-col gap-2 w-full md:w-auto max-w-md">
          <h1 className="scroll-m-20 text-xl md:text-2xl font-extrabold tracking-tight">
            {data.title}
          </h1>
          <h3 className="scroll-m-20 text-base md:text-lg font-semibold tracking-tight italic text-left text-muted-foreground">
            {data.snippet}
          </h3>
          <div className="flex items-center text-sm gap-2 text-muted-foreground">
            <TagIcon size={16} className="" />
            <span className="truncate">{data.category}</span>
          </div>
          <div className="flex items-center text-xs gap-2 text-muted-foreground">
            <NewspaperIcon size={16} className="" />
            <span className="truncate">{data.source}</span>
          </div>
          <div className="flex items-center text-sm gap-2 text-muted-foreground">
            <CalendarArrowDown size={16} className="mr-2" />
            <span>{data.createdAt?.toLocaleDateString()}</span>
          </div>
          <Link
            href={data.link}
            className="inline-flex items-center transition-colors duration-300 mt-2"
          >
            <Button className="bg-[#ff9066] text-[#2a1711] border-[#2a1711] w-full md:w-auto">Read More</Button>
          </Link>
        </div>
      </article>
  )
}

export default ArticleDetail