import Link from "next/link"
import { Barbell, ClipboardText, GraduationCap } from "phosphor-react"
import type { HomescreenActivePass } from "@/lib/types"

interface PassQuickAccessProps {
  activePasses: HomescreenActivePass[]
  pendingBallotCount?: number
}

export function PassQuickAccess({ activePasses, pendingBallotCount = 0 }: PassQuickAccessProps) {
  const gymPass = activePasses.find((p) => p.type === "gym" && p.status === "active")

  return (
    <div className="grid grid-cols-3 gap-2.5">
      {/* Gym Pass tile */}
      <QuickTile
        href={gymPass ? `/passes/${gymPass.id}/qr` : "/passes"}
        icon={<Barbell size={22} weight={gymPass ? "fill" : "regular"} className="text-brand-red" aria-hidden />}
        label="Gym Pass"
        sublabel={gymPass ? `${gymPass.usesRemaining} uses` : "No pass"}
        active={!!gymPass}
      />

      {/* My Ballots tile */}
      <QuickTile
        href="/ballots"
        icon={<ClipboardText size={22} weight="regular" className="text-text-secondary dark:text-[#AAAAAA]" aria-hidden />}
        label="Ballots"
        sublabel={pendingBallotCount > 0 ? `${pendingBallotCount} active` : "View all"}
        badge={pendingBallotCount}
      />

      {/* Programmes tile */}
      <QuickTile
        href="/programmes"
        icon={<GraduationCap size={22} weight="regular" className="text-text-secondary dark:text-[#AAAAAA]" aria-hidden />}
        label="Programmes"
        sublabel="Browse"
      />
    </div>
  )
}

interface QuickTileProps {
  href: string
  icon: React.ReactNode
  label: string
  sublabel: string
  active?: boolean
  badge?: number
}

function QuickTile({ href, icon, label, sublabel, active = false, badge = 0 }: QuickTileProps) {
  return (
    <Link
      href={href}
      className="relative flex flex-col items-center justify-center gap-1.5 bg-white dark:bg-dark-surface-1 rounded-2xl py-4 px-2 border border-surface-2 dark:border-dark-surface-2 min-h-[90px] active:bg-surface-1 dark:active:bg-dark-surface-2 transition-colors duration-100"
    >
      <div className="relative">
        {icon}
        {badge > 0 && (
          <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 bg-brand-red text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1 tabular-nums">
            {badge}
          </span>
        )}
      </div>
      <div className="text-center">
        <p className="text-[12px] font-semibold text-text-primary dark:text-[#F5F5F5] leading-tight">
          {label}
        </p>
        <p className={`text-[11px] leading-tight mt-0.5 ${active ? "text-brand-red font-medium" : "text-text-tertiary dark:text-[#777]"}`}>
          {sublabel}
        </p>
      </div>
    </Link>
  )
}
