"use server";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

const AVAILABLE_CATEGORIES = [
  "News",
  "Sports",
  "Technology",
  "Business",
  "Entertainment",
  "Health",
];


export async function addCategories(selectedCategories: string[]) {
  const { userId } = await auth();

  if (!userId) {
    return { error: "No user found" };
  }

  try {
    const validCategories = selectedCategories.filter((category) =>
      AVAILABLE_CATEGORIES.includes(category)
    );

    if (validCategories.length === 0) {
      return { error: "No valid categories selected" };
    }

    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId))
      .limit(1);

    if (userResult.length === 0) {
      return { error: "User not found in database" };
    }

    await db
      .update(users)
      .set({
        selectedCategories: validCategories,
        onboarding: true,
      })
      .where(eq(users.clerkId, userId));

    return { success: true, categories: validCategories };
  } catch (error) {
    console.error("Error adding categories:", error);
    return { error: "Error in adding categories" };
  }
}

export async function updateCategories(selectedCategories: string[]) {
  const { userId } = await auth();

  if (!userId) {
    return { error: "No user found" };
  }

  try {
    // Validate categories
    const validCategories = selectedCategories.filter((category) =>
      AVAILABLE_CATEGORIES.includes(category)
    );

    if (validCategories.length === 0) {
      return { error: "No valid categories selected" };
    }
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId))
      .limit(1);

    if (userResult.length === 0) {
      return { error: "User not found in database" };
    }
    await db
      .update(users)
      .set({
        selectedCategories: validCategories,
      })
      .where(eq(users.clerkId, userId));

    return { success: true, categories: validCategories };
  } catch (error) {
    console.error("Error updating categories:", error);
    return { error: "Error in updating categories" };
  }
}

export async function checkOnboardingStatus() {
  const { userId } = await auth();

  if (!userId) {
    return { error: "No user found" };
  }

  try {
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId))
      .limit(1);

    if (userResult.length === 0) {
      return { error: "User not found in database" };
    }

    return {
      onboarded: userResult[0].onboarding,
      selectedCategories: userResult[0].selectedCategories,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    return { error: "Error checking onboarding status" };
  }
}
