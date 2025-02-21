import { text, pgTable, serial, boolean, timestamp } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  link: text("link").notNull(),
  source: text("source").notNull(),
  imageUrl: text("image_url"),
  snippet: text("snippet"),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const users = pgTable("users", {
  id: serial().primaryKey(),
  email: text("email").unique().notNull(),
  name: text("name").notNull(),
  onboarding: boolean("onboarding").notNull().default(false),
  //clerkId: text("clerk_id").notNull(),
  selectedCategories: text("selected_categories").array().notNull(),
});
