"use client"

import { motion } from "motion/react"
import { mockVenues, mockSlots } from "@/lib/mockData"
import { PageHeader } from "@/components/layout/PageHeader"
import { SlotCard } from "@/components/booking/SlotCard"
import { BottomNav } from "@/components/layout/BottomNav"

const itemV = {
  hidden: { y: 14, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 300, damping: 28 } },
}

export default function VenueBookingPage({ params }: { params: { venueId: string } }) {
  const venue = mockVenues.find((v) => v.id === params.venueId)
  const slots = mockSlots.filter((s) => s.venueId === params.venueId)
  const ballotSlots = slots.filter((s) => s.bookingType === "ballot")
  const directSlots = slots.filter((s) => s.bookingType === "direct")

  if (!venue) {
    return (
      <div className="min-h-dvh bg-surface-1 dark:bg-dark-surface-0 flex items-center justify-center">
        <p className="text-text-secondary">Venue not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-surface-1 dark:bg-dark-surface-0">
      <PageHeader
        title={venue.shortName}
        subtitle={venue.address.split(",")[0]}
      />

      <motion.div
        className="px-4 pt-5 pb-28 space-y-5"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      >
        {/* Date strip — demo shows today's slots */}
        <motion.div variants={itemV} className="overflow-x-auto no-scrollbar -mx-4 px-4">
          <div className="flex gap-2 w-max">
            {["Today", "Tomorrow", "Thu", "Fri", "Sat"].map((day, i) => (
              <button
                key={day}
                className={`px-4 rounded-full text-[13px] font-medium border transition-colors ${
                  i === 0
                    ? "bg-brand-red border-brand-red text-white"
                    : "bg-white dark:bg-dark-surface-1 border-surface-2 dark:border-dark-surface-2 text-text-secondary dark:text-[#AAAAAA]"
                }`}
                style={{ minHeight: 36 }}
              >
                {day}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Peak / ballot slots */}
        {ballotSlots.length > 0 && (
          <motion.section variants={itemV}>
            <p className="text-[11px] font-semibold text-text-tertiary dark:text-[#555] uppercase tracking-widest mb-2 px-0.5">
              Peak hours &middot; Ballot required
            </p>
            <div className="space-y-2.5">
              {ballotSlots.map((slot) => (
                <SlotCard key={slot.id} slot={slot} />
              ))}
            </div>
          </motion.section>
        )}

        {/* Off-peak / direct slots */}
        {directSlots.length > 0 && (
          <motion.section variants={itemV}>
            <p className="text-[11px] font-semibold text-text-tertiary dark:text-[#555] uppercase tracking-widest mb-2 px-0.5">
              Off-peak &middot; Book directly
            </p>
            <div className="space-y-2.5">
              {directSlots.map((slot) => (
                <SlotCard key={slot.id} slot={slot} />
              ))}
            </div>
          </motion.section>
        )}

        {slots.length === 0 && (
          <motion.div variants={itemV} className="py-16 text-center">
            <p className="text-[15px] text-text-secondary dark:text-[#AAAAAA]">
              No slots available for this date.
            </p>
          </motion.div>
        )}
      </motion.div>

      <BottomNav />
    </div>
  )
}
