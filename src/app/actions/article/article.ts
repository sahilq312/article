"use server"

import { db } from "@/db/drizzle";
import { articles } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export const fetchArticle = async (slug: number) => {
    const { userId } = await auth();
    if (!userId) {
        return { error: "User not found"}
    }
    try {
        const article = await db.select()
            .from(articles)
            .where(eq(articles.id, slug))
            .limit(1);

        if (!article || article.length === 0) {
            return { error: `Article with ID ${slug} not found` };
        }

        return { success: article[0] };
    } catch (error) {
        console.error("Error fetching article:", error); // Error log
        return { error: error instanceof Error ? error.message : "An unknown error occurred" };
    }
};
