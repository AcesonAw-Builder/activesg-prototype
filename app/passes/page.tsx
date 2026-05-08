"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Barbell, Drop, QrCode, CaretRight, ShoppingCart } from "phosphor-react"
import { mockPasses } from "@/lib/mockData"
import { BottomNav } from "@/components/layout/BottomNav"
import type { Pass } from "@/lib/types"

const PASS_ICONS: Record<string, React.ElementType> = {
  gym: Barbell,
  pool: Drop,
  tennis: QrCode,
}

const PASS_LABELS: Record<string, string> = {
  gym: "Gym Pass",
  pool: "Pool Pass",
  tennis: "Tennis Pass",
}

const STATUS_STYLES = {
  active: { pill: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400", dot: "bg-success" },
  expired: { pill: "bg-neutral-100 dark:bg-dark-surface-2 text-neutral-500 dark:text-[#777]", dot: "bg-neutral-400" },
  used: { pill: "bg-neutral-100 dark:bg-dark-surface-2 text-neutral-500 dark:text-[#777]", dot: "bg-neutral-400" },
}

const itemV = {
  hidden: { y: 12, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 300, damping: 28 } },
}

function PassCard({ pass }: { pass: Pass }) {
  const Icon = PASS_ICONS[pass.type] ?? QrCode
  const label = PASS_LABELS[pass.type] ?? "Pass"
  const styles = STATUS_STYLES[pass.status] ?? STATUS_STYLES.expired
  const isActive = pass.status === "active" && pass.qrToken

  const expiry = new Date(pass.validUntil).toLocaleDateString("en-SG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Singapore",
  })

  const fillPct = Math.round((pass.usesConsumed / pass.totalUses) * 100)

  const inner = (
    <div className={`bg-white dark:bg-dark-surface-1 rounded-2xl border border-surface-2 dark:border-dark-surface-2 p-4 transition-transform duration-100 ${isActive ? "active:scale-[0.99]" : "opacity-70"}`}>
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${isActive ? "bg-brand-red/10" : "bg-surface-1 dark:bg-dark-surface-2"}`}>
          <Icon
            size={22}
            weight="fill"
            className={isActive ? "text-brand-red" : "text-text-tertiary dark:text-[#555]"}
            aria-hidden
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[16px] font-bold text-text-primary dark:text-[#F5F5F5] leading-snug">
              {label}
            </p>
            <span className={`shrink-0 flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${styles.pill}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} aria-hidden />
              {pass.status.charAt(0).toUpperCase() + pass.status.slice(1)}
            </span>
          </div>
          <p className="text-[13px] text-text-secondary dark:text-[#AAAAAA] mt-0.5 truncate">
            {pass.venueName}
          </p>
        </div>
      </div>

      {/* Uses + expiry */}
      <div className="mt-3 pt-3 border-t border-surface-2 dark:border-dark-surface-2">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[12px] text-text-secondary dark:text-[#AAAAAA]">
            <span className="font-mono font-semibold text-text-primary dark:text-[#F5F5F5] tabular-nums">
              {pass.usesRemaining}
            </span>
            {" "}/ {pass.totalUses} uses remaining
          </span>
          <span className="text-[12px] text-text-tertiary dark:text-[#777]">
            Exp {expiry}
          </span>
        </div>

        {/* Uses progress bar */}
        <div className="h-1.5 bg-surface-2 dark:bg-dark-surface-2 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${isActive ? "bg-brand-red" : "bg-neutral-300 dark:bg-[#444]"}`}
            style={{ width: `${100 - fillPct}%` }}
          />
        </div>
      </div>

      {/* View QR link */}
      {isActive && (
        <div className="flex items-center justify-end mt-2.5">
          <span className="text-[12px] font-semibold text-brand-red flex items-center gap-1">
            <QrCode size={13} weight="bold" aria-hidden />
            Show QR
            <CaretRight size={12} weight="bold" aria-hidden />
          </span>
        </div>
      )}
    </div>
  )

  return isActive ? (
    <Link href={`/passes/${pass.id}/qr`}>{inner}</Link>
  ) : (
    <div>{inner}</div>
  )
}

export default function PassesPage() {
  const active = mockPasses.filter((p) => p.status === "active")
  const expired = mockPasses.filter((p) => p.status !== "active")

  return (
    <div className="min-h-dvh bg-surface-1 dark:bg-dark-surface-0">
      {/* Sticky header */}
      <header className="sticky top-0 z-40 pt-safe">
        <div className="bg-surface-1/90 dark:bg-[#121212]/90 backdrop-blur-md border-b border-surface-2/60 dark:border-dark-surface-2/60">
          <div className="px-4 py-3">
            <h1 className="text-[22px] font-bold text-text-primary dark:text-[#F5F5F5]">
              My Passes
            </h1>
          </div>
        </div>
      </header>

      <motion.div
        className="px-4 pt-4 pb-28 space-y-5"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
      >
        {/* Active passes */}
        {active.length > 0 && (
          <motion.section variants={itemV}>
            <p className="text-[11px] font-semibold text-text-tertiary dark:text-[#555] uppercase tracking-widest mb-2 px-0.5">
              Active
            </p>
            <div className="space-y-3">
              {active.map((p) => (
                <PassCard key={p.id} pass={p} />
              ))}
            </div>
          </motion.section>
        )}

        {/* Expired passes */}
        {expired.length > 0 && (
          <motion.section variants={itemV}>
            <p className="text-[11px] font-semibold text-text-tertiary dark:text-[#555] uppercase tracking-widest mb-2 px-0.5">
              Expired
            </p>
            <div className="space-y-3">
              {expired.map((p) => (
                <PassCard key={p.id} pass={p} />
              ))}
            </div>
          </motion.section>
        )}

        {/* Purchase prompt */}
        <motion.div variants={itemV}>
          <button
            className="w-full flex items-center justify-center gap-2 bg-white dark:bg-dark-surface-1 border border-surface-2 dark:border-dark-surface-2 border-dashed rounded-2xl text-[14px] font-semibold text-text-secondary dark:text-[#AAAAAA]"
            style={{ minHeight: 56 }}
          >
            <ShoppingCart size={17} weight="regular" aria-hidden />
            Purchase a new pass
          </button>
        </motion.div>
      </motion.div>

      <BottomNav />
    </div>
  )
}
