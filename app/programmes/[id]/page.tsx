"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { MapPin, CalendarBlank, Users, Clock, ArrowRight, Info } from "phosphor-react"
import { mockProgrammes } from "@/lib/mockData"
import { PageHeader } from "@/components/layout/PageHeader"
import { BottomNav } from "@/components/layout/BottomNav"
import { formatCredits } from "@/lib/utils"

const DAYS_SHORT: Record<string, string> = {
  monday: "Mon", tuesday: "Tue", wednesday: "Wed",
  thursday: "Thu", friday: "Fri", saturday: "Sat", sunday: "Sun",
}

const itemV = {
  hidden: { y: 14, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 300, damping: 28 } },
}

export default function ProgrammeDetailPage({ params }: { params: { id: string } }) {
  const p = mockProgrammes.find((prog) => prog.id === params.id)

  if (!p) {
    return (
      <div className="min-h-dvh bg-surface-1 dark:bg-dark-surface-0 flex items-center justify-center">
        <p className="text-text-secondary">Programme not found.</p>
      </div>
    )
  }

  const fillPct = Math.round((p.filledSlots / p.totalSlots) * 100)
  const isFull = p.status === "full"
  const isFree = p.price.SG_PR === 0
  const schedule = `${p.schedule.days.map((d) => DAYS_SHORT[d] ?? d).join(" & ")} · ${p.schedule.startTime}–${p.schedule.endTime}`
  const creditOffset = isFree ? null : Math.round(p.price.SG_PR * p.creditsOffsetPercentage * 100) / 100

  return (
    <div className="min-h-dvh bg-surface-1 dark:bg-dark-surface-0">
      <PageHeader title={p.name} />

      <motion.div
        className="px-4 pt-5 pb-28 space-y-4"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
      >
        {/* Hero */}
        <motion.div variants={itemV} className="bg-white dark:bg-dark-surface-1 rounded-2xl border border-surface-2 dark:border-dark-surface-2 p-4">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-[20px] font-bold text-text-primary dark:text-[#F5F5F5] leading-snug">
              {p.name}
            </h2>
            {isFree && (
              <span className="shrink-0 text-[11px] font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full mt-0.5">
                Free
              </span>
            )}
          </div>

          <div className="space-y-2 mt-3">
            <MetaRow icon={<MapPin size={14} className="text-text-tertiary" aria-hidden />} label={p.venueName} />
            <MetaRow icon={<CalendarBlank size={14} className="text-text-tertiary" aria-hidden />} label={schedule} />
            <MetaRow icon={<Clock size={14} className="text-text-tertiary" aria-hidden />} label={`${p.schedule.totalSessions} session${p.schedule.totalSessions > 1 ? "s" : ""} · ${p.schedule.startDate} to ${p.schedule.endDate}`} />
            <MetaRow icon={<Users size={14} className="text-text-tertiary" aria-hidden />} label={`Ages ${p.ageGroup.min}–${p.ageGroup.max}`} />
          </div>

          {/* Availability fill bar */}
          <div className="mt-4 pt-4 border-t border-surface-2 dark:border-dark-surface-2">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[12px] text-text-secondary dark:text-[#AAAAAA]">
                {isFull ? "Fully booked" : `${p.availableSlots} of ${p.totalSlots} slots left`}
              </span>
              <span className="text-[12px] font-semibold text-text-secondary dark:text-[#AAAAAA] tabular-nums">
                {fillPct}%
              </span>
            </div>
            <div className="h-2 bg-surface-2 dark:bg-dark-surface-2 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${isFull ? "bg-neutral-400" : fillPct >= 80 ? "bg-warning" : "bg-success"}`}
                initial={{ width: 0 }}
                animate={{ width: `${fillPct}%` }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div variants={itemV} className="bg-white dark:bg-dark-surface-1 rounded-2xl border border-surface-2 dark:border-dark-surface-2 p-4">
          <p className="text-[11px] font-semibold text-text-tertiary dark:text-[#555] uppercase tracking-widest mb-2">
            About
          </p>
          <p className="text-[14px] text-text-primary dark:text-[#F5F5F5] leading-relaxed">
            {p.description}
          </p>
          <div className="mt-3 pt-3 border-t border-surface-2 dark:border-dark-surface-2 flex items-start gap-2">
            <Info size={14} className="text-text-tertiary shrink-0 mt-0.5" aria-hidden />
            <p className="text-[13px] text-text-secondary dark:text-[#AAAAAA] leading-snug">
              {p.requirements}
            </p>
          </div>
        </motion.div>

        {/* Pricing */}
        {!isFree && (
          <motion.div variants={itemV} className="bg-white dark:bg-dark-surface-1 rounded-2xl border border-surface-2 dark:border-dark-surface-2 divide-y divide-surface-2 dark:divide-dark-surface-2">
            <PriceRow label="Programme fee" value={formatCredits(p.price.SG_PR)} />
            {creditOffset !== null && (
              <PriceRow
                label={`ActiveSG Credits offset (${Math.round(p.creditsOffsetPercentage * 100)}%)`}
                value={`−${formatCredits(creditOffset)}`}
                valueClass="text-success font-semibold"
              />
            )}
            {p.price.nonResident && (
              <PriceRow label="Non-resident fee" value={formatCredits(p.price.nonResident)} valueClass="text-text-tertiary" />
            )}
          </motion.div>
        )}

        {/* CTA */}
        <motion.div variants={itemV}>
          {isFull ? (
            <button
              className="w-full bg-neutral-100 dark:bg-dark-surface-2 border border-surface-2 dark:border-dark-surface-2 text-text-secondary dark:text-[#AAAAAA] text-[16px] font-bold rounded-2xl"
              style={{ minHeight: 56 }}
              disabled
            >
              Join Waitlist
            </button>
          ) : (
            <Link
              href={`/programmes/${p.id}/enrol`}
              className="flex items-center justify-center gap-2 w-full bg-brand-red text-white text-[16px] font-bold rounded-2xl"
              style={{ minHeight: 56 }}
            >
              {isFree ? "Register" : `Enrol · ${formatCredits(p.price.SG_PR)}`}
              <ArrowRight size={16} weight="bold" aria-hidden />
            </Link>
          )}
        </motion.div>
      </motion.div>

      <BottomNav />
    </div>
  )
}

function MetaRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 shrink-0">{icon}</span>
      <span className="text-[14px] text-text-secondary dark:text-[#AAAAAA] leading-snug">{label}</span>
    </div>
  )
}

function PriceRow({
  label,
  value,
  valueClass = "text-text-primary dark:text-[#F5F5F5] font-semibold",
}: {
  label: string
  value: string
  valueClass?: string
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <span className="text-[13px] text-text-secondary dark:text-[#AAAAAA]">{label}</span>
      <span className={`text-[13px] font-mono ${valueClass}`}>{value}</span>
    </div>
  )
}
