import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CategoryState {
  options: string[];
  selectedOptions: string[];
  onboarding: boolean; 
  setSelectedOptions: (categories: string[]) => void;
  setOnboarding: (status: boolean) => void;
}

export const useCategoryStore = create(
  persist<CategoryState>(
    (set) => ({
      options: ["News", "Sports", "Technology", "Business", "Entertainment", "Health"], 
      selectedOptions: [],
      onboarding: false,
      setSelectedOptions: (categories) => set({ selectedOptions: categories }),
      setOnboarding: (status) => set({ onboarding: status }),
    }),
    {
      name: "category-store", 
    }
  )
);
