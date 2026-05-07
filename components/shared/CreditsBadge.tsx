import { formatCredits } from "@/lib/utils"

interface CreditsBadgeProps {
  balance: number
  className?: string
}

export function CreditsBadge({ balance, className = "" }: CreditsBadgeProps) {
  return (
    <div
      className={`flex items-center gap-2 bg-white dark:bg-dark-surface-1 border border-surface-2 dark:border-dark-surface-2 rounded-full pl-3 pr-3.5 py-1.5 ${className}`}
    >
      <span className="text-[11px] font-medium text-text-tertiary dark:text-[#777] uppercase tracking-wider">
        Credits
      </span>
      <span className="text-[14px] font-semibold font-mono text-text-primary dark:text-[#F5F5F5]">
        {formatCredits(balance)}
      </span>
    </div>
  )
}
