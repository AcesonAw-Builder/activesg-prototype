"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { QRCodeSVG } from "qrcode.react"
import { CheckCircle } from "phosphor-react"
import { mockPasses } from "@/lib/mockData"
import { PageHeader } from "@/components/layout/PageHeader"

const PASS_LABELS: Record<string, string> = {
  gym: "Gym Pass",
  pool: "Pool Pass",
  tennis: "Tennis Pass",
}

export default function QRPassPage({ params }: { params: { id: string } }) {
  const pass = mockPasses.find((p) => p.id === params.id)
  const [scanned, setScanned] = useState(false)
  const [qrToken, setQrToken] = useState(pass?.qrToken ?? "")

  // Brightness boost on mount, restore on unmount
  useEffect(() => {
    document.documentElement.style.filter = "brightness(1.15)"
    return () => {
      document.documentElement.style.filter = ""
    }
  }, [])

  // Simulate QR refresh every 60s
  useEffect(() => {
    if (!pass) return
    const interval = setInterval(() => {
      setQrToken(`${pass.qrToken}-${Date.now()}`)
    }, 60_000)
    return () => clearInterval(interval)
  }, [pass])

  if (!pass || !pass.qrToken) {
    return (
      <div className="min-h-dvh bg-white dark:bg-[#121212] flex flex-col">
        <PageHeader title={pass ? PASS_LABELS[pass.type] ?? "Pass" : "Pass"} />
        <div className="flex-1 flex items-center justify-center px-6 text-center">
          <div>
            <p className="text-[17px] font-semibold text-text-primary dark:text-[#F5F5F5]">
              {pass?.status === "expired" ? "Pass expired" : "No active pass"}
            </p>
            <p className="text-[14px] text-text-secondary dark:text-[#AAAAAA] mt-1">
              Purchase a new pass to generate a QR code.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const expiry = new Date(pass.validUntil).toLocaleDateString("en-SG", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Singapore",
  })

  return (
    <div className="min-h-dvh bg-white dark:bg-[#0A0A0A] flex flex-col">
      <PageHeader title={PASS_LABELS[pass.type] ?? "Pass"} subtitle={pass.venueName} />

      <div className="flex-1 flex flex-col items-center justify-between px-6 py-8">
        {/* QR code */}
        <AnimatePresence mode="wait">
          {scanned ? (
            <motion.div
              key="success"
              className="flex-1 flex flex-col items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <CheckCircle size={96} weight="fill" className="text-success" aria-label="Scan successful" />
              <p className="text-[22px] font-bold text-text-primary dark:text-[#F5F5F5] mt-5">
                Scan accepted
              </p>
              <p className="text-[14px] text-text-secondary dark:text-[#AAAAAA] mt-1">
                {pass.usesRemaining - 1} uses remaining after this visit
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="qr"
              className="flex-1 flex flex-col items-center justify-center w-full"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28, delay: 0.1 }}
            >
              {/* QR container */}
              <div className="w-full max-w-[280px] aspect-square bg-white rounded-3xl shadow-lg flex items-center justify-center p-5">
                <QRCodeSVG
                  value={qrToken}
                  size={240}
                  level="M"
                  fgColor="#1A1A1A"
                  bgColor="#FFFFFF"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>

              {/* Pass meta */}
              <div className="mt-8 text-center space-y-1">
                <p className="text-[17px] font-bold text-text-primary dark:text-[#F5F5F5]">
                  {pass.venueName}
                </p>
                <p className="text-[14px] text-text-secondary dark:text-[#AAAAAA]">
                  <span className="font-mono font-semibold text-text-primary dark:text-[#F5F5F5]">
                    {pass.usesRemaining}
                  </span>{" "}
                  {pass.usesRemaining === 1 ? "use" : "uses"} remaining &middot; Expires {expiry}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom section */}
        <div className="w-full space-y-3 pt-4">
          {!scanned && (
            <p className="text-[12px] text-center text-text-tertiary dark:text-[#555]">
              QR refreshes every 60 seconds
            </p>
          )}
          <motion.button
            onClick={() => setScanned((s) => !s)}
            className={`w-full text-[16px] font-bold rounded-2xl transition-colors ${
              scanned
                ? "bg-surface-1 dark:bg-dark-surface-1 text-text-secondary dark:text-[#AAAAAA] border border-surface-2 dark:border-dark-surface-2"
                : "bg-brand-red text-white"
            }`}
            style={{ minHeight: 56 }}
            whileTap={{ scale: 0.98 }}
          >
            {scanned ? "Reset (Demo)" : "Simulate Scan"}
          </motion.button>
        </div>
      </div>
    </div>
  )
}
