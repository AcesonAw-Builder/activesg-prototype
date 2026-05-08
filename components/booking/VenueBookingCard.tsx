import Link from "next/link"
import { MapPin, CaretRight } from "phosphor-react"
import type { Venue, FacilityType } from "@/lib/types"
import { gymCapacityColor } from "@/lib/utils"

const FACILITY_LABELS: Record<string, string> = {
  badminton: "Badminton",
  basketball: "Basketball",
  squash: "Squash",
  gym: "Gym",
  pool: "Pool",
  swimming: "Swimming",
  tennis: "Tennis",
  tabletennis: "Table Tennis",
  fitness: "Fitness",
}

const CAPACITY_STYLES = {
  success: "text-emerald-700 bg-emerald-50",
  warning: "text-orange-700 bg-orange-50",
  error: "text-red-700 bg-red-50",
}

interface VenueBookingCardProps {
  venue: Venue
  highlightSport?: FacilityType | null
}

export function VenueBookingCard({ venue, highlightSport }: VenueBookingCardProps) {
  const capacityPct = Math.round((venue.gymCapacity.current / venue.gymCapacity.max) * 100)
  const tier = gymCapacityColor(capacityPct)

  return (
    <Link
      href={`/book/${venue.id}`}
      className="block active:scale-[0.99] transition-transform duration-100"
    >
      <div className="bg-white dark:bg-dark-surface-1 rounded-2xl border border-surface-2 dark:border-dark-surface-2 p-4">
        {/* Name + caret */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-[17px] font-bold text-text-primary dark:text-[#F5F5F5]">
              {venue.shortName}
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={12} className="text-text-tertiary shrink-0" aria-hidden />
              <p className="text-[13px] text-text-secondary dark:text-[#AAAAAA] truncate">
                {venue.address.split(",")[0]}
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

        {/* Facility chips */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {venue.facilities.map((f) => (
            <span
              key={f}
              className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                highlightSport === f
                  ? "bg-brand-red/10 text-brand-red"
                  : "bg-surface-1 dark:bg-dark-surface-2 text-text-tertiary dark:text-[#777]"
              }`}
            >
              {FACILITY_LABELS[f] ?? f}
            </span>
          ))}
        </div>

        {/* Gym capacity */}
        {venue.facilities.includes("gym") && (
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-surface-2 dark:border-dark-surface-2">
            <span className="text-[12px] text-text-tertiary dark:text-[#777]">
              Gym capacity
            </span>
            <span
              className={`text-[12px] font-semibold px-2 py-0.5 rounded-full tabular-nums ${CAPACITY_STYLES[tier]}`}
            >
              {venue.gymCapacity.current}/{venue.gymCapacity.max} &middot; {capacityPct}%
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
