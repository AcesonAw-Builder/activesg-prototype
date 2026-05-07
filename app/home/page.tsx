"use client"

import { motion } from "motion/react"
import { mockHomescreen } from "@/lib/mockData"
import { BottomNav } from "@/components/layout/BottomNav"
import { BallotStatusCard } from "@/components/home/BallotStatusCard"
import { UpcomingCard } from "@/components/home/UpcomingCard"
import { PassQuickAccess } from "@/components/home/PassQuickAccess"
import { CreditsBadge } from "@/components/shared/CreditsBadge"

const { user, upcomingBookings, activeBallots, activePasses } = mockHomescreen

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

const item = {
  hidden: { y: 18, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 320, damping: 28 },
  },
}

export default function HomePage() {
  const pendingBallots = activeBallots.filter((b) => b.status === "pending").length

  return (
    <div className="relative min-h-dvh bg-surface-1 dark:bg-dark-surface-0">
      {/* ── Sticky header ────────────────────────────────── */}
      <header className="sticky top-0 z-40 pt-safe">
        <div className="bg-surface-1/90 dark:bg-[#121212]/90 backdrop-blur-md border-b border-surface-2/60 dark:border-dark-surface-2/60">
          <div className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-[11px] font-medium text-text-tertiary dark:text-[#666] uppercase tracking-widest leading-none">
                Good morning
              </p>
              <p className="text-[22px] font-bold text-text-primary dark:text-[#F5F5F5] leading-tight mt-0.5">
                {user.firstName}
              </p>
            </div>
            <CreditsBadge balance={user.credits} />
          </div>
        </div>
      </header>

      {/* ── Scrollable content ────────────────────────────── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="px-4 pt-4 pb-28 space-y-5"
      >
        {/* Active ballot */}
        {activeBallots.length > 0 && (
          <motion.section variants={item}>
            <SectionLabel>Active Ballot</SectionLabel>
            <BallotStatusCard ballot={activeBallots[0]} />
          </motion.section>
        )}

        {/* Upcoming booking */}
        {upcomingBookings.length > 0 && (
          <motion.section variants={item}>
            <SectionLabel>Upcoming</SectionLabel>
            <UpcomingCard booking={upcomingBookings[0]} />
          </motion.section>
        )}

        {/* Quick access */}
        <motion.section variants={item}>
          <SectionLabel>Quick Access</SectionLabel>
          <PassQuickAccess
            activePasses={activePasses}
            pendingBallotCount={pendingBallots}
          />
        </motion.section>
      </motion.div>

      {/* ── Bottom nav ────────────────────────────────────── */}
      <BottomNav />
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold text-text-tertiary dark:text-[#555] uppercase tracking-widest mb-2 px-0.5">
      {children}
    </p>
  )
}
