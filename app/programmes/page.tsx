"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { mockProgrammes } from "@/lib/mockData"
import { BottomNav } from "@/components/layout/BottomNav"
import { ProgrammeCard } from "@/components/programmes/ProgrammeCard"
import type { FacilityType } from "@/lib/types"

type FilterId = FacilityType | "kids" | null

const FILTERS: { id: FilterId; label: string }[] = [
  { id: null, label: "All" },
  { id: "swimming", label: "Swimming" },
  { id: "badminton", label: "Badminton" },
  { id: "basketball", label: "Basketball" },
  { id: "fitness", label: "Fitness" },
  { id: "kids", label: "For Kids" },
]

const itemV = {
  hidden: { y: 14, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 300, damping: 28 } },
}

export default function ProgrammesPage() {
  const [filter, setFilter] = useState<FilterId>(null)

  const programmes = filter
    ? mockProgrammes.filter((p) => {
        if (filter === "kids") return p.ageGroup.max <= 18
        return (p.sport as string) === filter
      })
    : mockProgrammes

  return (
    <div className="min-h-dvh bg-surface-1 dark:bg-dark-surface-0">
      {/* Sticky header */}
      <header className="sticky top-0 z-40 pt-safe">
        <div className="bg-surface-1/90 dark:bg-[#121212]/90 backdrop-blur-md border-b border-surface-2/60 dark:border-dark-surface-2/60">
          <div className="px-4 py-3">
            <h1 className="text-[22px] font-bold text-text-primary dark:text-[#F5F5F5]">
              Programmes
            </h1>
          </div>
        </div>
      </header>

      {/* Filter chips */}
      <div className="overflow-x-auto no-scrollbar pt-4 pb-2">
        <div className="flex gap-2 px-4 w-max">
          {FILTERS.map(({ id, label }) => {
            const active = filter === id
            return (
              <button
                key={label}
                onClick={() => setFilter(id)}
                className={`px-4 rounded-full border text-[13px] font-medium whitespace-nowrap transition-colors duration-150 ${
                  active
                    ? "bg-brand-red border-brand-red text-white"
                    : "bg-white dark:bg-dark-surface-1 border-surface-2 dark:border-dark-surface-2 text-text-secondary dark:text-[#AAAAAA]"
                }`}
                style={{ minHeight: 36 }}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Programme list */}
      <motion.div
        key={filter}
        className="px-4 pt-3 pb-28 space-y-3"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
      >
        <p className="text-[11px] font-semibold text-text-tertiary dark:text-[#555] uppercase tracking-widest px-0.5">
          {programmes.length} {programmes.length === 1 ? "programme" : "programmes"}
        </p>

        {programmes.map((p) => (
          <motion.div key={p.id} variants={itemV}>
            <ProgrammeCard programme={p} />
          </motion.div>
        ))}

        {programmes.length === 0 && (
          <motion.div variants={itemV} className="py-16 text-center">
            <p className="text-[15px] text-text-secondary dark:text-[#AAAAAA]">
              No programmes in this category.
            </p>
            <button
              onClick={() => setFilter(null)}
              className="mt-3 text-[14px] font-semibold text-brand-red"
            >
              Clear filter
            </button>
          </motion.div>
        )}
      </motion.div>

      <BottomNav />
    </div>
  )
}
