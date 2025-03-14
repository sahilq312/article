import { create } from "zustand";
import { Categories } from "@/utils/options";
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
      options: Categories, 
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
