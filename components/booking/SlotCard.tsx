import Link from "next/link"
import { ArrowRight } from "phosphor-react"
import type { FacilitySlot } from "@/lib/types"
import { formatTimeRange, formatCredits } from "@/lib/utils"

interface SlotCardProps {
  slot: FacilitySlot
  membershipType?: "SG_PR" | "nonResident"
}

export function SlotCard({ slot, membershipType = "SG_PR" }: SlotCardProps) {
  const price = slot.price[membershipType]
  const isBallot = slot.bookingType === "ballot"
  const isUnavailable = slot.status === "ballot_closed" || slot.status === "full" || slot.status === "cancelled"

  const href = isBallot ? `/ballot/${slot.id}` : `/book/${slot.venueId}/${slot.id}`

  return (
    <div
      className={`rounded-2xl p-4 border transition-transform duration-100 ${
        isUnavailable
          ? "bg-surface-1 dark:bg-dark-surface-1 border-surface-2 dark:border-dark-surface-2 opacity-60"
          : isBallot
          ? "bg-peak dark:bg-[#2A1A0F] border-orange-100 dark:border-orange-900/30 active:scale-[0.99]"
          : "bg-offpeak dark:bg-[#0F1F10] border-emerald-100 dark:border-emerald-900/30 active:scale-[0.99]"
      }`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-bold text-text-primary dark:text-[#F5F5F5] leading-snug">
            {slot.facilityName}
          </p>
          <p className="text-[13px] text-text-secondary dark:text-[#AAAAAA] mt-0.5 font-mono tabular-nums">
            {formatTimeRange(slot.startTime, slot.endTime)}
          </p>
        </div>

        {/* Type badge */}
        <span
          className={`shrink-0 text-[11px] font-semibold px-2.5 py-0.5 rounded-full tracking-wide ${
            isUnavailable
              ? "bg-neutral-100 text-neutral-500"
              : isBallot
              ? "bg-orange-100 text-ballot"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {isUnavailable ? "CLOSED" : isBallot ? "BALLOT" : "BOOK NOW"}
        </span>
      </div>

      {/* Details row */}
      <div className="flex items-end justify-between mt-3">
        <div className="space-y-0.5">
          {isBallot && slot.currentBallotEntries !== null && (
            <p className="text-[12px] text-text-tertiary dark:text-[#777]">
              {slot.currentBallotEntries} entries so far
            </p>
          )}
          {isBallot && slot.ballotResultTime && (
            <p className="text-[12px] text-text-tertiary dark:text-[#777]">
              Result:{" "}
              {new Date(slot.ballotResultTime).toLocaleString("en-SG", {
                weekday: "short",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
                timeZone: "Asia/Singapore",
              })}
            </p>
          )}
          <p className="text-[13px] font-semibold text-text-primary dark:text-[#F5F5F5]">
            {formatCredits(price)}
          </p>
        </div>

        {!isUnavailable && (
          <Link
            href={href}
            className="flex items-center gap-1.5 bg-text-primary dark:bg-[#F5F5F5] text-white dark:text-[#1A1A1A] text-[13px] font-semibold px-4 rounded-full transition-opacity active:opacity-80"
            style={{ minHeight: 36 }}
          >
            {isBallot ? "Enter Ballot" : "Book Now"}
            <ArrowRight size={13} weight="bold" aria-hidden />
          </Link>
        )}
      </div>
    </div>
  )
}
