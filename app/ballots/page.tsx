"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { Timer, CheckCircle, MinusCircle, ArrowRight } from "phosphor-react"
import { mockBallots, mockVenues } from "@/lib/mockData"
import { BottomNav } from "@/components/layout/BottomNav"
import { formatDate, formatTimeRange, formatHoursRemaining } from "@/lib/utils"
import type { BallotEntry } from "@/lib/types"

type Tab = "active" | "past"

const STATUS_CONFIG = {
  pending: {
    label: "PENDING",
    bg: "bg-orange-50 dark:bg-orange-950/30",
    text: "text-orange-700 dark:text-orange-400",
    Icon: Timer,
  },
  won: {
    label: "WON",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-700 dark:text-emerald-400",
    Icon: CheckCircle,
  },
  missed: {
    label: "MISSED",
    bg: "bg-neutral-100 dark:bg-dark-surface-2",
    text: "text-neutral-500 dark:text-[#777]",
    Icon: MinusCircle,
  },
} as const

const itemV = {
  hidden: { y: 12, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 300, damping: 28 } },
}

function BallotCard({ ballot }: { ballot: BallotEntry }) {
  const venue = mockVenues.find((v) => v.id === ballot.venueId)
  const result = ballot.result ?? "pending"
  const cfg = STATUS_CONFIG[result as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.pending
  const { Icon } = cfg

  const isWon = ballot.result === "won"
  const href = ballot.status === "resolved"
    ? `/ballot/result/${ballot.id}?result=${ballot.result}`
    : undefined

  const inner = (
    <div className="bg-white dark:bg-dark-surface-1 rounded-2xl border border-surface-2 dark:border-dark-surface-2 p-4 active:scale-[0.99] transition-transform duration-100">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-[16px] font-bold text-text-primary dark:text-[#F5F5F5] leading-snug truncate">
            {ballot.facilityName}
          </p>
          <p className="text-[13px] text-text-secondary dark:text-[#AAAAAA] mt-0.5 truncate">
            {venue?.shortName ?? ballot.venueId}
          </p>
        </div>
        <span className={`shrink-0 flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>
          <Icon size={11} weight="fill" aria-hidden />
          {cfg.label}
        </span>
      </div>

      <p className="text-[13px] text-text-secondary dark:text-[#AAAAAA] mt-2 font-mono tabular-nums">
        {formatDate(ballot.date)} &middot; {formatTimeRange(ballot.startTime, ballot.endTime)}
      </p>

      {ballot.status === "pending" && (
        <p className="text-[12px] text-text-tertiary dark:text-[#777] mt-1.5">
          Result in{" "}
          <span className="font-semibold text-ballot tabular-nums">
            {formatHoursRemaining(
              Math.max(0, (new Date(ballot.resultAt).getTime() - Date.now()) / 3_600_000)
            )}
          </span>
        </p>
      )}

      {(isWon || ballot.result === "missed") && (
        <div className="flex items-center justify-end mt-2">
          <span className={`text-[12px] font-semibold flex items-center gap-1 ${isWon ? "text-emerald-600 dark:text-emerald-400" : "text-text-tertiary dark:text-[#777]"}`}>
            View result <ArrowRight size={12} weight="bold" aria-hidden />
          </span>
        </div>
      )}
    </div>
  )

  return href ? <Link href={href}>{inner}</Link> : <div>{inner}</div>
}

export default function BallotsPage() {
  const [tab, setTab] = useState<Tab>("active")

  const active = mockBallots.filter((b) => b.status === "pending")
  const past = mockBallots.filter((b) => b.status === "resolved")
  const shown = tab === "active" ? active : past

  return (
    <div className="min-h-dvh bg-surface-1 dark:bg-dark-surface-0">
      {/* Sticky header */}
      <header className="sticky top-0 z-40 pt-safe">
        <div className="bg-surface-1/90 dark:bg-[#121212]/90 backdrop-blur-md border-b border-surface-2/60 dark:border-dark-surface-2/60">
          <div className="px-4 pt-3 pb-0">
            <h1 className="text-[22px] font-bold text-text-primary dark:text-[#F5F5F5]">
              My Ballots
            </h1>
            {/* Tabs */}
            <div className="flex mt-3">
              {(["active", "past"] as Tab[]).map((t) => {
                const isActive = tab === t
                const count = t === "active" ? active.length : past.length
                return (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 pb-2 text-[14px] font-semibold capitalize border-b-2 transition-colors duration-150 ${
                      isActive
                        ? "border-brand-red text-brand-red"
                        : "border-transparent text-text-tertiary dark:text-[#555]"
                    }`}
                    style={{ minHeight: 40 }}
                  >
                    {t === "active" ? "Active" : "Past"}
                    {count > 0 && (
                      <span className={`ml-1.5 text-[11px] font-bold px-1.5 py-0.5 rounded-full ${isActive ? "bg-brand-red/10 text-brand-red" : "bg-surface-2 dark:bg-dark-surface-2 text-text-tertiary dark:text-[#555]"}`}>
                        {count}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Ballot list */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          className="px-4 pt-4 pb-28 space-y-3"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        >
          {shown.length === 0 ? (
            <motion.div variants={itemV} className="py-16 text-center">
              <p className="text-[15px] text-text-secondary dark:text-[#AAAAAA]">
                {tab === "active" ? "No active ballots." : "No past ballots yet."}
              </p>
              {tab === "active" && (
                <Link
                  href="/book"
                  className="inline-flex items-center mt-3 text-[14px] font-semibold text-brand-red"
                >
                  Browse facilities <ArrowRight size={14} weight="bold" className="ml-1" aria-hidden />
                </Link>
              )}
            </motion.div>
          ) : (
            shown.map((b) => (
              <motion.div key={b.id} variants={itemV}>
                <BallotCard ballot={b} />
              </motion.div>
            ))
          )}
        </motion.div>
      </AnimatePresence>

      <BottomNav />
    </div>
  )
}
