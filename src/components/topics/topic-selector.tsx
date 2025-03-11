"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"
import { useCategoryStore } from "@/store/category-store"


export function TopicSelector({ selectedTopic: initialSelectedTopic }: { selectedTopic?: string }) {
  const [selected, setSelected] = useState<string[]>(initialSelectedTopic ? [initialSelectedTopic] : [])
  const router = useRouter()
  const { selectedOptions } = useCategoryStore();

  const toggleTopic = (topic: string) => {
    let updatedTopics: string[]
    if (topic === "all") {
      updatedTopics = []
    } else if (selected.includes(topic)) {
      updatedTopics = selected.filter((t) => t !== topic)
    } else {
      updatedTopics = [topic]
    }
    setSelected(updatedTopics)

    // Update URL
    const searchParams = new URLSearchParams()
    if (updatedTopics.length > 0 && updatedTopics[0] !== "all") {
      searchParams.set("topic", updatedTopics[0])
    }
    router.push(`/article/${searchParams.toString() ? `?${searchParams.toString()}` : ""}`)
  }

  return (
    <div className="max-w-[500px] mx-auto">
      {/* <FilterSection topics={topics} selectedTopic={selected[0]} onFilterChange={toggleTopic} /> */}
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
          {selectedOptions
            .filter((topic) => topic !== "all")
            .map((topic) => {
              const isSelected = selected.includes(topic)
              return (
                <motion.button
                  key={topic}
                  onClick={() => toggleTopic(topic)}
                  layout
                  initial={false}
                  animate={{
                    backgroundColor: isSelected ? "#2a1711" : "rgba(39, 39, 42, 0.5)",
                  }}
                  whileHover={{
                    backgroundColor: isSelected ? "#2a1711" : "rgba(39, 39, 42, 0.8)",
                  }}
                  whileTap={{
                    backgroundColor: isSelected ? "#1f1209" : "rgba(39, 39, 42, 0.9)",
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
                            <Check className="w-3 h-3 text-[#2a1711]" strokeWidth={1.5} />
                          </div>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.button>
              )
            })}
        </motion.div>
      </div>
    </div>
  )
}