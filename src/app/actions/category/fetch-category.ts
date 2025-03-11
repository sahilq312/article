"use server";

import { db } from "@/db/drizzle";
import { articles } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, desc } from "drizzle-orm";

export const fetchCategory = async (categoryString: string) => {
  const { userId } = await auth();
  if (!userId) {
    return { error: "User not found" };
  }
  
  try {
    const categories = categoryString.split(',').filter(cat => cat.trim() !== '');
    
    if (categories.length === 0) {
      const list = await db
        .select()
        .from(articles)
        .orderBy(desc(articles.id))
        .limit(10);
      return { success: list };
    }
    
    if (categories.length === 1) {
      const list = await db
        .select()
        .from(articles)
        .where(eq(articles.category, categories[0]))
        .orderBy(desc(articles.id))
        .limit(10);
      return { success: list };
    }
    
    let allArticles = [];
    
    const articlePromises = categories.map(category => 
      db
        .select()
        .from(articles)
        .where(eq(articles.category, category))
        .orderBy(desc(articles.id))
        .limit(10)
    );
    
    const results = await Promise.all(articlePromises);
    
    allArticles = results.flat();
    
    allArticles.sort((a, b) => (b.id as number) - (a.id as number));
    
    return { success: allArticles };
    
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { error: error };
  }
};