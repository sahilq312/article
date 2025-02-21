"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useCategoryStore } from "@/store/category-store";

export default function ChangePrefernce() {
  const { options, selectedOptions, setSelectedOptions } = useCategoryStore();

  const toggleTopic = (topic: string) => {
    setSelectedOptions(
      selectedOptions.includes(topic)
        ? selectedOptions.filter((c) => c !== topic)
        : [...selectedOptions, topic]
    );
  };

  return (
    <div className="w-full p-6 pt-40">
      <h1 className="text-white text-3xl font-semibold mb-12 text-center">
        Change your prefernce?
      </h1>
      <div className="max-w-[500px] mx-auto">
        <motion.div
          className="flex flex-wrap gap-3 overflow-visible"
          layout
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            mass: 0.5,
          }}
        >
          {options.map((topic) => {
            const isSelected = selectedOptions.includes(topic);
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
