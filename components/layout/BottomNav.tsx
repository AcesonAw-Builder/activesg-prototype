"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { House, CalendarBlank, GraduationCap, QrCode, User } from "phosphor-react"

const TABS = [
  { href: "/home",        Icon: House,          label: "Home" },
  { href: "/book",        Icon: CalendarBlank,  label: "Book" },
  { href: "/programmes",  Icon: GraduationCap,  label: "Programmes" },
  { href: "/passes",      Icon: QrCode,         label: "Passes" },
  { href: "/ballots",     Icon: User,           label: "Account" },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Main navigation"
      className="fixed bottom-0 inset-x-0 z-50 flex justify-center pointer-events-none"
    >
      <div className="w-full max-w-[428px] pointer-events-auto bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md border-t border-surface-2 dark:border-dark-surface-2 pb-safe">
        <div className="flex" style={{ height: "var(--bottom-nav-height)" }}>
          {TABS.map(({ href, Icon, label }) => {
            const active = pathname === href || pathname.startsWith(href + "/")
            return (
              <Link
                key={href}
                href={href}
                className="flex-1 flex flex-col items-center justify-center gap-[3px] min-h-[48px] transition-colors duration-150 active:bg-surface-1 dark:active:bg-dark-surface-1"
                aria-current={active ? "page" : undefined}
              >
                <Icon
                  size={22}
                  weight={active ? "fill" : "regular"}
                  className={active ? "text-brand-red" : "text-text-tertiary dark:text-[#666]"}
                  aria-hidden
                />
                {active && (
                  <span className="text-[10px] font-semibold text-brand-red leading-none tracking-wide">
                    {label}
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
