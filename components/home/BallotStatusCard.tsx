"use client"

import { motion } from "motion/react"
import { Timer } from "phosphor-react"
import Link from "next/link"
import type { HomescreenActiveBallot } from "@/lib/types"
import { formatDate, formatHoursRemaining } from "@/lib/utils"

interface BallotStatusCardProps {
  ballot: HomescreenActiveBallot
  /** 0–1. Hardcoded at 0.73 for prototype since mock dates are past. */
  windowProgress?: number
}

export function BallotStatusCard({ ballot, windowProgress = 0.73 }: BallotStatusCardProps) {
  const [facilityName, venueName] = ballot.summary.split(" · ")
  const resultDate = new Date(ballot.resultAt).toLocaleString("en-SG", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Singapore",
  })

  return (
    <Link href={`/ballot/${ballot.id}`} className="block" tabIndex={0}>
      <div className="bg-peak dark:bg-[#2A1A0F] rounded-2xl p-4 border border-orange-100 dark:border-orange-900/30 active:scale-[0.99] transition-transform duration-100">
        {/* Header row */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-semibold text-ballot tracking-[0.08em] uppercase">
            Active Ballot
          </span>
          <div className="flex items-center gap-1 text-text-secondary dark:text-[#AAAAAA]">
            <Timer size={13} weight="regular" aria-hidden />
            <span className="text-[13px] font-medium font-mono tabular-nums">
              {formatHoursRemaining(ballot.hoursUntilResult)}
            </span>
          </div>
        </div>

        {/* Facility info */}
        <p className="text-[17px] font-bold text-text-primary dark:text-[#F5F5F5] leading-snug">
          {facilityName}
        </p>
        <p className="text-[13px] text-text-secondary dark:text-[#AAAAAA] mt-0.5">
          {venueName}
        </p>
        <p className="text-[13px] text-text-secondary dark:text-[#AAAAAA] mt-0.5">
          {formatDate(ballot.date)} &middot; {ballot.time}
        </p>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-medium text-text-tertiary dark:text-[#777]">
              Ballot window
            </span>
            <span className="text-[11px] font-semibold text-ballot tabular-nums">
              {Math.round(windowProgress * 100)}% closed
            </span>
          </div>
          <div className="h-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-ballot rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${windowProgress * 100}%` }}
              transition={{
                duration: 0.9,
                delay: 0.35,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
          </div>
        </div>

        {/* Result time */}
        <div className="mt-3 pt-3 border-t border-orange-100 dark:border-orange-900/30">
          <p className="text-[12px] text-text-tertiary dark:text-[#777]">
            Result announced {resultDate}
          </p>
        </div>
      </div>
    </Link>
  )
}
