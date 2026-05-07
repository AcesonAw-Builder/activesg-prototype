import Link from "next/link"
import { ArrowRight } from "phosphor-react"
import type { HomescreenUpcomingBooking } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { StatusBadge } from "@/components/shared/StatusBadge"

interface UpcomingCardProps {
  booking: HomescreenUpcomingBooking
}

export function UpcomingCard({ booking }: UpcomingCardProps) {
  const [facilityName, venueName] = booking.summary.split(" · ")

  return (
    <Link
      href={`/bookings/${booking.id}`}
      className="block active:scale-[0.99] transition-transform duration-100"
    >
      <div className="bg-white dark:bg-dark-surface-1 rounded-2xl p-4 border border-surface-2 dark:border-dark-surface-2">
        {/* Top row: title + badge */}
        <div className="flex items-start justify-between gap-3 mb-1">
          <p className="text-[17px] font-bold text-text-primary dark:text-[#F5F5F5] leading-snug">
            {facilityName}
          </p>
          <StatusBadge variant="confirmed" className="shrink-0 mt-0.5" />
        </div>

        <p className="text-[13px] text-text-secondary dark:text-[#AAAAAA]">
          {venueName}
        </p>

        {/* Date + arrow */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-surface-2 dark:border-dark-surface-2">
          <p className="text-[13px] text-text-secondary dark:text-[#AAAAAA]">
            {formatDate(booking.date)} &middot; {booking.time}
          </p>
          <ArrowRight
            size={16}
            weight="bold"
            className="text-text-tertiary dark:text-[#555] shrink-0"
            aria-hidden
          />
        </div>
      </div>
    </Link>
  )
}
