import Link from "next/link"
import { MapPin, Users, CaretRight } from "phosphor-react"
import type { Programme } from "@/lib/types"
import { formatCredits } from "@/lib/utils"

interface ProgrammeCardProps {
  programme: Programme
}

export function ProgrammeCard({ programme: p }: ProgrammeCardProps) {
  const fillPct = Math.round((p.filledSlots / p.totalSlots) * 100)
  const isFull = p.status === "full"
  const isFree = p.price.SG_PR === 0

  const DAYS_SHORT: Record<string, string> = {
    monday: "Mon", tuesday: "Tue", wednesday: "Wed",
    thursday: "Thu", friday: "Fri", saturday: "Sat", sunday: "Sun",
  }

  const scheduleStr = `${p.schedule.days.map((d) => DAYS_SHORT[d] ?? d).join(" & ")} · ${
    p.schedule.startTime
  }–${p.schedule.endTime}`

  return (
    <Link
      href={`/programmes/${p.id}`}
      className="block active:scale-[0.99] transition-transform duration-100"
    >
      <div className="bg-white dark:bg-dark-surface-1 rounded-2xl border border-surface-2 dark:border-dark-surface-2 p-4">
        {/* Title + caret */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-[17px] font-bold text-text-primary dark:text-[#F5F5F5] leading-snug">
                {p.name}
              </p>
              {isFree && (
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                  Free
                </span>
              )}
              {isFull && (
                <span className="text-[11px] font-semibold text-neutral-500 bg-neutral-100 dark:bg-dark-surface-2 px-2 py-0.5 rounded-full">
                  Full
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={12} className="text-text-tertiary shrink-0" aria-hidden />
              <p className="text-[13px] text-text-secondary dark:text-[#AAAAAA] truncate">
                {p.venueName}
              </p>
            </div>
          </div>
          <CaretRight
            size={18}
            weight="bold"
            className="text-text-tertiary dark:text-[#555] shrink-0 mt-0.5"
            aria-hidden
          />
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-3 mt-3 text-[13px] text-text-secondary dark:text-[#AAAAAA]">
          <span>{scheduleStr}</span>
          <span className="text-text-tertiary">·</span>
          <div className="flex items-center gap-1">
            <Users size={13} aria-hidden />
            <span>Ages {p.ageGroup.min}–{p.ageGroup.max}</span>
          </div>
        </div>

        {/* Price + availability */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-surface-2 dark:border-dark-surface-2">
          <span className="text-[15px] font-bold text-text-primary dark:text-[#F5F5F5]">
            {isFree ? "Free" : formatCredits(p.price.SG_PR)}
          </span>
          <div className="flex items-center gap-2">
            {!isFull && (
              <span className="text-[12px] text-text-secondary dark:text-[#AAAAAA]">
                {p.availableSlots} left
              </span>
            )}
            {/* Fill bar */}
            <div className="w-20 h-1.5 bg-surface-2 dark:bg-dark-surface-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${isFull ? "bg-neutral-400" : fillPct >= 80 ? "bg-warning" : "bg-success"}`}
                style={{ width: `${fillPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
