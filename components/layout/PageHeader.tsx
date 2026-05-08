"use client"

import { useRouter } from "next/navigation"
import { CaretLeft } from "phosphor-react"

interface PageHeaderProps {
  title: string
  subtitle?: string
  onBack?: () => void
}

export function PageHeader({ title, subtitle, onBack }: PageHeaderProps) {
  const router = useRouter()
  const handleBack = onBack ?? (() => router.back())

  return (
    <header className="sticky top-0 z-40 pt-safe">
      <div className="bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md border-b border-surface-2 dark:border-dark-surface-2">
        <div className="flex items-center gap-1 px-2 py-2 min-h-[52px]">
          <button
            onClick={handleBack}
            aria-label="Go back"
            className="flex items-center justify-center w-10 h-10 rounded-full text-text-primary dark:text-[#F5F5F5] active:bg-surface-1 dark:active:bg-dark-surface-1 transition-colors shrink-0"
          >
            <CaretLeft size={20} weight="bold" aria-hidden />
          </button>
          <div className="flex-1 min-w-0 px-1">
            <h1 className="text-[17px] font-bold text-text-primary dark:text-[#F5F5F5] truncate leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[12px] text-text-secondary dark:text-[#AAAAAA] truncate leading-tight">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
