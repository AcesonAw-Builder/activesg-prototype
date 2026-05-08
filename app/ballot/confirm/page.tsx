"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { CheckCircle, House } from "phosphor-react"
import { mockBallots, mockUser } from "@/lib/mockData"
import { formatDate, formatTimeRange, formatCredits } from "@/lib/utils"

const ballot = mockBallots.find((b) => b.status === "pending" && b.userId === mockUser.id)!

const resultDate = new Date(ballot.resultAt).toLocaleString("en-SG", {
  weekday: "long",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Singapore",
})

export default function BallotConfirmPage() {
  useEffect(() => {
    // Remove any stale body class from qr screen
    document.documentElement.style.filter = ""
  }, [])

  return (
    <div className="min-h-dvh bg-surface-1 dark:bg-dark-surface-0 flex flex-col">
      {/* Success hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-8 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        >
          <CheckCircle
            size={72}
            weight="fill"
            className="text-success mx-auto"
            aria-hidden
          />
        </motion.div>

        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 28 }}
        >
          <h1 className="text-[26px] font-bold text-text-primary dark:text-[#F5F5F5] mt-5 leading-tight">
            You&rsquo;re in the ballot
          </h1>
          <p className="text-[15px] text-text-secondary dark:text-[#AAAAAA] mt-2 max-w-[280px] mx-auto leading-relaxed">
            We&rsquo;ll notify you when results are announced.
          </p>
        </motion.div>

        {/* Ballot summary card */}
        <motion.div
          className="w-full mt-8"
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45, type: "spring", stiffness: 300, damping: 28 }}
        >
          <div className="bg-white dark:bg-dark-surface-1 rounded-2xl border border-surface-2 dark:border-dark-surface-2 divide-y divide-surface-2 dark:divide-dark-surface-2 text-left">
            <ConfirmRow label="Facility" value={ballot.facilityName} />
            <ConfirmRow label="Date" value={formatDate(ballot.date)} />
            <ConfirmRow
              label="Time"
              value={formatTimeRange(ballot.startTime, ballot.endTime)}
              valueClass="font-mono tabular-nums"
            />
            <ConfirmRow label="Result announced" value={resultDate} />
            <ConfirmRow
              label="Credits held"
              value={formatCredits(ballot.creditsHeld)}
              valueClass="font-mono font-semibold text-text-primary dark:text-[#F5F5F5]"
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom actions */}
      <motion.div
        className="px-4 pb-12 pt-2 space-y-3"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 300, damping: 28 }}
      >
        {/* Demo: simulate result */}
        <p className="text-[11px] font-semibold text-text-tertiary dark:text-[#555] uppercase tracking-widest text-center">
          Demo — simulate result
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Link
            href={`/ballot/result/${ballot.id}?result=won`}
            className="flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400 text-[14px] font-semibold rounded-2xl text-center"
            style={{ minHeight: 52 }}
          >
            Simulate Won
          </Link>
          <Link
            href={`/ballot/result/${ballot.id}?result=missed`}
            className="flex items-center justify-center bg-neutral-100 dark:bg-dark-surface-2 border border-surface-2 dark:border-dark-surface-2 text-text-secondary dark:text-[#AAAAAA] text-[14px] font-semibold rounded-2xl text-center"
            style={{ minHeight: 52 }}
          >
            Simulate Missed
          </Link>
        </div>

        <Link
          href="/home"
          className="flex items-center justify-center gap-2 w-full bg-text-primary dark:bg-[#F5F5F5] text-white dark:text-[#1A1A1A] text-[16px] font-bold rounded-2xl"
          style={{ minHeight: 56 }}
        >
          <House size={18} weight="fill" aria-hidden />
          Back to Home
        </Link>
      </motion.div>
    </div>
  )
}

function ConfirmRow({
  label,
  value,
  valueClass = "text-text-secondary dark:text-[#AAAAAA]",
}: {
  label: string
  value: string
  valueClass?: string
}) {
  return (
    <div className="flex items-start justify-between gap-4 px-4 py-3">
      <span className="text-[13px] text-text-tertiary dark:text-[#777] shrink-0">{label}</span>
      <span className={`text-[13px] text-right ${valueClass}`}>{value}</span>
    </div>
  )
}
