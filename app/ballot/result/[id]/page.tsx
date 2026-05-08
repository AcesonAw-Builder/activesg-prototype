"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "motion/react"
import { CheckCircle, ArrowCounterClockwise, ArrowRight, CalendarBlank } from "phosphor-react"
import { mockBallots, mockSlots, mockVenues } from "@/lib/mockData"
import { PageHeader } from "@/components/layout/PageHeader"
import { SlotCard } from "@/components/booking/SlotCard"
import { formatDate, formatTimeRange } from "@/lib/utils"

const itemV = {
  hidden: { y: 14, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 300, damping: 28 } },
}

export default function BallotResultPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams()
  const result = searchParams.get("result") ?? "missed"
  const isWon = result === "won"

  const ballot = mockBallots.find((b) => b.id === params.id)
  const altSlots = (ballot?.alternativesAvailable ?? [])
    .map((a) => mockSlots.find((s) => s.id === a.slotId))
    .filter(Boolean) as typeof mockSlots

  const venueName = ballot
    ? (mockVenues.find((v) => v.id === ballot.venueId)?.shortName ?? "")
    : ""

  return (
    <div className="min-h-dvh bg-surface-1 dark:bg-dark-surface-0">
      <PageHeader title={isWon ? "Ballot Result" : "Ballot Result"} />

      {isWon ? (
        <WonView ballot={ballot} venueName={venueName} />
      ) : (
        <MissedView ballot={ballot} altSlots={altSlots} />
      )}
    </div>
  )
}

function WonView({ ballot, venueName }: { ballot: typeof mockBallots[0] | undefined; venueName: string }) {
  return (
    <motion.div
      className="px-4 pt-6 pb-16 space-y-5"
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
    >
      {/* Hero */}
      <motion.div variants={itemV} className="text-center py-4">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.05 }}
        >
          <CheckCircle size={64} weight="fill" className="text-success mx-auto" aria-hidden />
        </motion.div>
        <h2 className="text-[26px] font-bold text-text-primary dark:text-[#F5F5F5] mt-4 leading-tight">
          You&rsquo;re in!
        </h2>
        <p className="text-[15px] text-text-secondary dark:text-[#AAAAAA] mt-1">
          Booking confirmed for {venueName}
        </p>
      </motion.div>

      {/* Booking card */}
      {ballot && (
        <motion.div variants={itemV}>
          <div className="bg-white dark:bg-dark-surface-1 rounded-2xl border border-surface-2 dark:border-dark-surface-2 divide-y divide-surface-2 dark:divide-dark-surface-2">
            <ResultRow label="Facility" value={ballot.facilityName} />
            <ResultRow label="Venue" value={venueName} />
            <ResultRow label="Date" value={formatDate(ballot.date)} />
            <ResultRow
              label="Time"
              value={formatTimeRange(ballot.startTime, ballot.endTime)}
              valueClass="font-mono tabular-nums text-text-primary dark:text-[#F5F5F5] font-semibold"
            />
          </div>
        </motion.div>
      )}

      {/* Actions */}
      <motion.div variants={itemV} className="space-y-3 pt-2">
        <button
          className="w-full flex items-center justify-center gap-2 bg-surface-1 dark:bg-dark-surface-2 border border-surface-2 dark:border-dark-surface-2 text-text-primary dark:text-[#F5F5F5] text-[15px] font-semibold rounded-2xl"
          style={{ minHeight: 52 }}
        >
          <CalendarBlank size={17} weight="bold" aria-hidden />
          Add to Calendar
        </button>
        <Link
          href="/ballots"
          className="flex items-center justify-center gap-2 w-full bg-brand-red text-white text-[16px] font-bold rounded-2xl"
          style={{ minHeight: 56 }}
        >
          View Booking
          <ArrowRight size={16} weight="bold" aria-hidden />
        </Link>
      </motion.div>
    </motion.div>
  )
}

function MissedView({
  ballot,
  altSlots,
}: {
  ballot: typeof mockBallots[0] | undefined
  altSlots: typeof mockSlots
}) {
  return (
    <motion.div
      className="px-4 pt-6 pb-16 space-y-5"
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
    >
      {/* Header */}
      <motion.div variants={itemV}>
        <h2 className="text-[22px] font-bold text-text-primary dark:text-[#F5F5F5] leading-snug">
          Not selected this time
        </h2>
        {ballot && (
          <p className="text-[14px] text-text-secondary dark:text-[#AAAAAA] mt-1">
            {ballot.facilityName} &middot; {formatDate(ballot.date)} &middot;{" "}
            {formatTimeRange(ballot.startTime, ballot.endTime)}
          </p>
        )}
        <p className="text-[14px] text-text-secondary dark:text-[#AAAAAA] mt-3 leading-relaxed">
          There were more entries than available courts. Slots nearby are still open.
        </p>
      </motion.div>

      {/* Alternatives */}
      {altSlots.length > 0 && (
        <motion.section variants={itemV}>
          <p className="text-[11px] font-semibold text-text-tertiary dark:text-[#555] uppercase tracking-widest mb-2 px-0.5">
            Try these instead
          </p>
          <div className="space-y-2.5">
            {altSlots.map((slot) => (
              <SlotCard key={slot.id} slot={slot} />
            ))}
          </div>
        </motion.section>
      )}

      {/* Next ballot window */}
      <motion.section variants={itemV}>
        <p className="text-[11px] font-semibold text-text-tertiary dark:text-[#555] uppercase tracking-widest mb-2 px-0.5">
          Next ballot window
        </p>
        <div className="bg-white dark:bg-dark-surface-1 rounded-2xl border border-surface-2 dark:border-dark-surface-2 p-4">
          <p className="text-[15px] font-semibold text-text-primary dark:text-[#F5F5F5]">
            Wed, 21 May ballot
          </p>
          <p className="text-[13px] text-text-secondary dark:text-[#AAAAAA] mt-0.5">
            Opens 7 May &middot; midnight
          </p>
          <Link
            href="/book/venue-sengkang-sc"
            className="mt-3 flex items-center gap-1.5 text-brand-red text-[13px] font-semibold"
          >
            <ArrowCounterClockwise size={14} weight="bold" aria-hidden />
            Enter next ballot
          </Link>
        </div>
      </motion.section>

      {/* Back */}
      <motion.div variants={itemV}>
        <Link
          href="/book"
          className="flex items-center justify-center w-full bg-text-primary dark:bg-[#F5F5F5] text-white dark:text-[#1A1A1A] text-[15px] font-bold rounded-2xl"
          style={{ minHeight: 56 }}
        >
          Back to Booking
        </Link>
      </motion.div>
    </motion.div>
  )
}

function ResultRow({
  label,
  value,
  valueClass = "text-text-secondary dark:text-[#AAAAAA]",
}: {
  label: string
  value: string
  valueClass?: string
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <span className="text-[13px] text-text-tertiary dark:text-[#777]">{label}</span>
      <span className={`text-[13px] text-right ${valueClass}`}>{value}</span>
    </div>
  )
}
