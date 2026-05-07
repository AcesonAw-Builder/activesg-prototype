type StatusVariant = "pending" | "won" | "missed" | "confirmed" | "cancelled"

const config: Record<StatusVariant, { bg: string; text: string; label: string }> = {
  pending: { bg: "bg-orange-50", text: "text-orange-700", label: "PENDING" },
  won:     { bg: "bg-emerald-50", text: "text-emerald-700", label: "WON" },
  missed:  { bg: "bg-neutral-100", text: "text-neutral-500", label: "MISSED" },
  confirmed: { bg: "bg-emerald-50", text: "text-emerald-700", label: "CONFIRMED" },
  cancelled: { bg: "bg-neutral-100", text: "text-neutral-500", label: "CANCELLED" },
}

interface StatusBadgeProps {
  variant: StatusVariant
  className?: string
}

export function StatusBadge({ variant, className = "" }: StatusBadgeProps) {
  const { bg, text, label } = config[variant]
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-widest ${bg} ${text} ${className}`}
    >
      {label}
    </span>
  )
}
