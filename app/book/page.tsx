"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { TennisBall, Drop, Barbell, Basketball, Waves } from "phosphor-react"
import { mockVenues } from "@/lib/mockData"
import { BottomNav } from "@/components/layout/BottomNav"
import { VenueBookingCard } from "@/components/booking/VenueBookingCard"
import type { FacilityType } from "@/lib/types"

type SportOption = {
  id: FacilityType | null
  label: string
  Icon?: React.ElementType
}

const SPORT_FILTERS: SportOption[] = [
  { id: null, label: "All" },
  { id: "badminton", label: "Badminton", Icon: TennisBall },
  { id: "swimming", label: "Swimming", Icon: Drop },
  { id: "gym", label: "Gym", Icon: Barbell },
  { id: "basketball", label: "Basketball", Icon: Basketball },
  { id: "squash", label: "Squash", Icon: TennisBall },
  { id: "tennis", label: "Tennis", Icon: TennisBall },
  { id: "pool", label: "Pool", Icon: Waves },
]

const itemV = {
  hidden: { y: 14, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 300, damping: 28 } },
}

export default function BookPage() {
  const [sport, setSport] = useState<FacilityType | null>(null)

  const venues = sport
    ? mockVenues.filter((v) => (v.facilities as string[]).includes(sport))
    : mockVenues

  return (
    <div className="min-h-dvh bg-surface-1 dark:bg-dark-surface-0">
      {/* Sticky header */}
      <header className="sticky top-0 z-40 pt-safe">
        <div className="bg-surface-1/90 dark:bg-[#121212]/90 backdrop-blur-md border-b border-surface-2/60 dark:border-dark-surface-2/60">
          <div className="px-4 py-3">
            <h1 className="text-[22px] font-bold text-text-primary dark:text-[#F5F5F5]">
              Book
            </h1>
          </div>
        </div>
      </header>

      {/* Sport filter chips */}
      <div className="overflow-x-auto no-scrollbar pt-4 pb-2">
        <div className="flex gap-2 px-4 w-max">
          {SPORT_FILTERS.map(({ id, label, Icon }) => {
            const active = sport === id
            return (
              <button
                key={label}
                onClick={() => setSport(id)}
                className={`flex items-center gap-1.5 px-4 rounded-full border text-[13px] font-medium whitespace-nowrap transition-colors duration-150 ${
                  active
                    ? "bg-brand-red border-brand-red text-white"
                    : "bg-white dark:bg-dark-surface-1 border-surface-2 dark:border-dark-surface-2 text-text-secondary dark:text-[#AAAAAA]"
                }`}
                style={{ minHeight: 36 }}
              >
                {Icon && <Icon size={13} weight="regular" aria-hidden />}
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Venue cards */}
      <motion.div
        className="px-4 pt-3 pb-28 space-y-3"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      >
        <p className="text-[11px] font-semibold text-text-tertiary dark:text-[#555] uppercase tracking-widest px-0.5">
          {venues.length} {venues.length === 1 ? "venue" : "venues"}
        </p>

        {venues.map((venue) => (
          <motion.div key={venue.id} variants={itemV}>
            <VenueBookingCard venue={venue} highlightSport={sport} />
          </motion.div>
        ))}

        {venues.length === 0 && (
          <motion.div variants={itemV} className="py-16 text-center">
            <p className="text-[15px] text-text-secondary dark:text-[#AAAAAA]">
              No venues with this facility.
            </p>
            <button
              onClick={() => setSport(null)}
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
