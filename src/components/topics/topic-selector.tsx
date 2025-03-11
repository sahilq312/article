"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useCategoryStore } from "@/store/category-store";

export function TopicSelector({
  selectedTopic: initialSelectedTopic,
}: {
  selectedTopic?: string;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();
  const { selectedOptions } = useCategoryStore();

  useEffect(() => {
    if (initialSelectedTopic) {
      const initialTopics = initialSelectedTopic.split(",");
      setSelected(initialTopics);
    } else if (selectedOptions.length > 0) {
      setSelected(selectedOptions);
      updateURL(selectedOptions);
    }
  }, [initialSelectedTopic, selectedOptions]);

  const updateURL = (topics: string[]) => {
    const searchParams = new URLSearchParams();
    if (topics.length > 0) {
      searchParams.set("topic", topics.join(","));
    }
    router.push(
      `/article/${searchParams.toString() ? `?${searchParams.toString()}` : ""}`
    );
  };

  const toggleTopic = (topic: string) => {
    let updatedTopics: string[];

    if (selected.includes(topic)) {
      updatedTopics = selected.filter((t) => t !== topic);
    } else {
      updatedTopics = [...selected, topic];
    }

    setSelected(updatedTopics);
    updateURL(updatedTopics);
  };

  return (
    <div className="max-w-[500px] mx-auto">
      <div className="overflow-x-auto pb-2 md:overflow-visible">
        <motion.div
          className="flex flex-nowrap md:flex-wrap gap-3 min-w-min"
          layout
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            mass: 0.5,
          }}
        >
          {selectedOptions.map((topic) => {
            const isSelected = selected.includes(topic);
            return (
              <motion.button
                key={topic}
                onClick={() => toggleTopic(topic)}
                layout
                initial={false}
                animate={{
                  backgroundColor: isSelected
                    ? "#2a1711"
                    : "rgba(39, 39, 42, 0.5)",
                }}
                whileHover={{
                  backgroundColor: isSelected
                    ? "#2a1711"
                    : "rgba(39, 39, 42, 0.8)",
                }}
                whileTap={{
                  backgroundColor: isSelected
                    ? "#1f1209"
                    : "rgba(39, 39, 42, 0.9)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  mass: 0.5,
                  backgroundColor: { duration: 0.1 },
                }}
                className={`
                  inline-flex items-center px-4 py-2 rounded-full text-base font-medium
                  whitespace-nowrap overflow-hidden ring-1 ring-inset
                  ${
                    isSelected
                      ? "text-[#ff9066] ring-[hsla(0,0%,100%,0.12)]"
                      : "text-zinc-400 ring-[hsla(0,0%,100%,0.06)]"
                  }
                `}
              >
                <motion.div
                  className="relative flex items-center"
                  animate={{
                    width: isSelected ? "auto" : "100%",
                    paddingRight: isSelected ? "1.5rem" : "0",
                  }}
                  transition={{
                    ease: [0.175, 0.885, 0.32, 1.275],
                    duration: 0.3,
                  }}
                >
                  <span>{topic}</span>
                  <AnimatePresence>
                    {isSelected && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                          mass: 0.5,
                        }}
                        className="absolute right-0"
                      >
                        <div className="w-4 h-4 rounded-full bg-[#ff9066] flex items-center justify-center">
                          <Check
                            className="w-3 h-3 text-[#2a1711]"
                            strokeWidth={1.5}
                          />
                        </div>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
