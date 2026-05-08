"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import { Timer, CreditCard, Info } from "phosphor-react"
import { mockSlots, mockVenues, mockUser } from "@/lib/mockData"
import { PageHeader } from "@/components/layout/PageHeader"
import { BottomNav } from "@/components/layout/BottomNav"
import { formatDate, formatTimeRange, formatCredits } from "@/lib/utils"

export default function BallotEntryPage({ params }: { params: { slotId: string } }) {
  const router = useRouter()
  const [confirmed, setConfirmed] = useState(false)

  const slot = mockSlots.find((s) => s.id === params.slotId)
  const venue = slot ? mockVenues.find((v) => v.id === slot.venueId) : null
  const price = slot ? slot.price[mockUser.membershipType] : 0

  if (!slot || !venue) {
    return (
      <div className="min-h-dvh bg-surface-1 dark:bg-dark-surface-0 flex items-center justify-center">
        <p className="text-text-secondary">Slot not found.</p>
      </div>
    )
  }

  const resultDate = slot.ballotResultTime
    ? new Date(slot.ballotResultTime).toLocaleString("en-SG", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Singapore",
      })
    : null

  const windowClose = slot.ballotWindowClose
    ? new Date(slot.ballotWindowClose).toLocaleString("en-SG", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Singapore",
      })
    : null

  function handleEnterBallot() {
    setConfirmed(true)
    setTimeout(() => router.push("/ballot/confirm"), 600)
  }

  return (
    <div className="min-h-dvh bg-surface-1 dark:bg-dark-surface-0">
      <PageHeader title="Enter Ballot" subtitle={venue.shortName} />

      <motion.div
        className="px-4 pt-5 pb-28 space-y-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28, delay: 0.05 }}
      >
        {/* Slot summary */}
        <div className="bg-peak dark:bg-[#2A1A0F] rounded-2xl p-4 border border-orange-100 dark:border-orange-900/30">
          <div className="flex items-start justify-between gap-2 mb-3">
            <span className="text-[11px] font-semibold text-ballot tracking-[0.08em] uppercase">
              Peak Hour &middot; Ballot
            </span>
            <span className="text-[11px] font-medium text-text-tertiary dark:text-[#777] tabular-nums">
              {slot.currentBallotEntries} entries
            </span>
          </div>
          <p className="text-[20px] font-bold text-text-primary dark:text-[#F5F5F5] leading-tight">
            {slot.facilityName}
          </p>
          <p className="text-[14px] text-text-secondary dark:text-[#AAAAAA] mt-0.5">
            {venue.name}
          </p>
          <p className="text-[14px] text-text-secondary dark:text-[#AAAAAA] mt-1 font-mono tabular-nums">
            {formatDate(slot.date)} &middot; {formatTimeRange(slot.startTime, slot.endTime)}
          </p>
        </div>

        {/* Ballot details */}
        <div className="bg-white dark:bg-dark-surface-1 rounded-2xl border border-surface-2 dark:border-dark-surface-2 divide-y divide-surface-2 dark:divide-dark-surface-2">
          {windowClose && (
            <DetailRow label="Ballot closes" value={windowClose} />
          )}
          {resultDate && (
            <DetailRow icon={<Timer size={14} className="text-text-tertiary" aria-hidden />} label="Result announced" value={resultDate} />
          )}
          <DetailRow
            icon={<CreditCard size={14} className="text-text-tertiary" aria-hidden />}
            label="Credits held"
            value={formatCredits(price)}
            valueClass="font-mono font-semibold text-text-primary dark:text-[#F5F5F5]"
          />
          <DetailRow label="Your balance" value={formatCredits(mockUser.credits.balance)} valueClass="font-mono text-success" />
        </div>

        {/* Info notice */}
        <div className="flex items-start gap-2.5 bg-blue-50 dark:bg-blue-950/30 rounded-xl p-3.5 border border-blue-100 dark:border-blue-900/30">
          <Info size={16} weight="fill" className="text-blue-500 shrink-0 mt-0.5" aria-hidden />
          <p className="text-[13px] text-blue-700 dark:text-blue-300 leading-snug">
            Credits will be held until the ballot result is announced. You can only enter one ballot per slot.
          </p>
        </div>

        {/* CTA */}
        <motion.button
          onClick={handleEnterBallot}
          disabled={confirmed}
          className="w-full bg-brand-red text-white text-[16px] font-bold rounded-2xl transition-opacity active:opacity-90 disabled:opacity-60"
          style={{ minHeight: 56 }}
          whileTap={{ scale: 0.98 }}
        >
          {confirmed ? "Entering ballot..." : `Enter Ballot · ${formatCredits(price)}`}
        </motion.button>
      </motion.div>

      <BottomNav />
    </div>
  )
}

function DetailRow({
  icon,
  label,
  value,
  valueClass = "text-text-secondary dark:text-[#AAAAAA]",
}: {
  icon?: React.ReactNode
  label: string
  value: string
  valueClass?: string
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      <div className="flex items-center gap-2 text-[13px] text-text-secondary dark:text-[#AAAAAA]">
        {icon}
        {label}
      </div>
      <span className={`text-[13px] text-right ${valueClass}`}>{value}</span>
    </div>
  )
}
