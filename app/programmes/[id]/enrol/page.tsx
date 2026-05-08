"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { User, Baby, CheckCircle, ArrowRight } from "phosphor-react"
import { mockProgrammes, mockUser } from "@/lib/mockData"
import { PageHeader } from "@/components/layout/PageHeader"
import { BottomNav } from "@/components/layout/BottomNav"
import { formatCredits } from "@/lib/utils"

type ParticipantId = "self" | string

export default function ProgrammeEnrolPage({ params }: { params: { id: string } }) {
  const p = mockProgrammes.find((prog) => prog.id === params.id)
  const [participantId, setParticipantId] = useState<ParticipantId>("self")
  const [confirmed, setConfirmed] = useState(false)

  if (!p) {
    return (
      <div className="min-h-dvh bg-surface-1 dark:bg-dark-surface-0 flex items-center justify-center">
        <p className="text-text-secondary">Programme not found.</p>
      </div>
    )
  }

  const price = p.price.SG_PR
  const isFree = price === 0
  const creditOffset = Math.round(price * p.creditsOffsetPercentage * 100) / 100
  const afterCredits = Math.max(0, price - creditOffset)

  const selectedParticipant =
    participantId === "self"
      ? { name: mockUser.name.split(" ")[0], detail: "Adult member" }
      : mockUser.children.find((c) => c.id === participantId)
        ? { name: mockUser.children.find((c) => c.id === participantId)!.name, detail: `Age ${mockUser.children.find((c) => c.id === participantId)!.age}` }
        : null

  function handleConfirm() {
    setConfirmed(true)
  }

  return (
    <div className="min-h-dvh bg-surface-1 dark:bg-dark-surface-0">
      <PageHeader title="Enrol" subtitle={p.name} />

      <AnimatePresence mode="wait">
        {confirmed ? (
          <motion.div
            key="success"
            className="flex flex-col items-center justify-center px-6 pt-20 pb-16 text-center min-h-[70vh]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
            >
              <CheckCircle size={72} weight="fill" className="text-success mx-auto" aria-hidden />
            </motion.div>
            <h2 className="text-[24px] font-bold text-text-primary dark:text-[#F5F5F5] mt-5 leading-tight">
              {selectedParticipant?.name} is enrolled
            </h2>
            <p className="text-[15px] text-text-secondary dark:text-[#AAAAAA] mt-2 max-w-[260px] leading-relaxed">
              A confirmation and QR code will be sent to your registered email.
            </p>
            <Link
              href="/home"
              className="mt-10 flex items-center justify-center gap-2 w-full bg-brand-red text-white text-[16px] font-bold rounded-2xl"
              style={{ minHeight: 56 }}
            >
              Back to Home
              <ArrowRight size={16} weight="bold" aria-hidden />
            </Link>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            className="px-4 pt-5 pb-28 space-y-4"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          >
            {/* Participant selector */}
            <motion.section
              variants={{ hidden: { y: 14, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 28 } } }}
            >
              <p className="text-[11px] font-semibold text-text-tertiary dark:text-[#555] uppercase tracking-widest mb-2 px-0.5">
                Enrolling for
              </p>
              <div className="space-y-2">
                {/* Self */}
                <ParticipantOption
                  id="self"
                  selected={participantId === "self"}
                  onSelect={() => setParticipantId("self")}
                  icon={<User size={18} weight="fill" aria-hidden />}
                  name={`${mockUser.name.split(" ")[0]} (me)`}
                  detail="Adult member · SG/PR"
                />
                {/* Children */}
                {mockUser.children.map((child) => (
                  <ParticipantOption
                    key={child.id}
                    id={child.id}
                    selected={participantId === child.id}
                    onSelect={() => setParticipantId(child.id)}
                    icon={<Baby size={18} weight="fill" aria-hidden />}
                    name={child.name}
                    detail={`Age ${child.age} · Child account`}
                    ageWarning={child.age < p.ageGroup.min || child.age > p.ageGroup.max
                      ? `Programme is for ages ${p.ageGroup.min}–${p.ageGroup.max}`
                      : undefined}
                  />
                ))}
              </div>
            </motion.section>

            {/* Booking summary */}
            <motion.div
              variants={{ hidden: { y: 14, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 28 } } }}
              className="bg-white dark:bg-dark-surface-1 rounded-2xl border border-surface-2 dark:border-dark-surface-2 divide-y divide-surface-2 dark:divide-dark-surface-2"
            >
              <SummaryRow label="Programme" value={p.name} />
              <SummaryRow label="Venue" value={p.venueName} />
              <SummaryRow label="Sessions" value={`${p.schedule.totalSessions} sessions`} />
              {!isFree && (
                <>
                  <SummaryRow label="Fee" value={formatCredits(price)} />
                  {p.creditsApplicable && creditOffset > 0 && (
                    <SummaryRow
                      label={`Credits offset (${Math.round(p.creditsOffsetPercentage * 100)}%)`}
                      value={`−${formatCredits(creditOffset)}`}
                      valueClass="text-success font-semibold"
                    />
                  )}
                  <SummaryRow
                    label="Total due"
                    value={formatCredits(afterCredits)}
                    valueClass="font-mono font-bold text-text-primary dark:text-[#F5F5F5] text-[15px]"
                  />
                </>
              )}
              {isFree && <SummaryRow label="Total due" value="Free" valueClass="font-semibold text-success" />}
            </motion.div>

            {/* Confirm CTA */}
            <motion.div
              variants={{ hidden: { y: 14, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 28 } } }}
            >
              <motion.button
                onClick={handleConfirm}
                className="w-full bg-brand-red text-white text-[16px] font-bold rounded-2xl"
                style={{ minHeight: 56 }}
                whileTap={{ scale: 0.98 }}
              >
                {isFree ? "Confirm Registration" : `Confirm · ${formatCredits(afterCredits)}`}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  )
}

function ParticipantOption({
  id, selected, onSelect, icon, name, detail, ageWarning,
}: {
  id: string; selected: boolean; onSelect: () => void
  icon: React.ReactNode; name: string; detail: string; ageWarning?: string
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center gap-3 p-4 rounded-2xl border text-left transition-colors duration-150 ${
        selected
          ? "bg-brand-red/5 border-brand-red dark:border-brand-red/60"
          : "bg-white dark:bg-dark-surface-1 border-surface-2 dark:border-dark-surface-2"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
          selected ? "bg-brand-red text-white" : "bg-surface-1 dark:bg-dark-surface-2 text-text-secondary dark:text-[#AAAAAA]"
        }`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-semibold text-text-primary dark:text-[#F5F5F5]">{name}</p>
        <p className="text-[13px] text-text-secondary dark:text-[#AAAAAA]">{detail}</p>
        {ageWarning && (
          <p className="text-[12px] text-warning mt-0.5">{ageWarning}</p>
        )}
      </div>
      <div
        className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${
          selected ? "border-brand-red bg-brand-red" : "border-surface-2 dark:border-dark-surface-2"
        }`}
      >
        {selected && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
    </button>
  )
}

function SummaryRow({
  label, value,
  valueClass = "text-text-secondary dark:text-[#AAAAAA]",
}: {
  label: string; value: string; valueClass?: string
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <span className="text-[13px] text-text-tertiary dark:text-[#777]">{label}</span>
      <span className={`text-[13px] text-right font-mono ${valueClass}`}>{value}</span>
    </div>
  )
}
