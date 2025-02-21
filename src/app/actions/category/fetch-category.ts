"use server";

import { db } from "@/db/drizzle";
import { articles } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export const fetchCategory = async (category: string) => {
    try {
        /* if (!category) {
            const list = await db.select()
                .from(articles)
                .orderBy(desc(articles.createdAt))
                .limit(10);
            return { success: list };
        } */
        
        const list = await db.select()
            .from(articles)
            .where(eq(articles.category, category))
            .orderBy(desc(articles.createdAt))
            .limit(10);
        return { success: list };
    } catch (error) {
        return {error: error}
    }
}
/* class : component__advertiserPhone */