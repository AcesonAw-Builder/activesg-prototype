## 2026-05-08 01:50
**Task:** ActiveSG scaffold — Next.js 14 init, dependencies, Tailwind tokens, types, mockData, utils, layout, route stubs
**Changed:** tailwind.config.ts, app/globals.css, app/layout.tsx, app/page.tsx, lib/types.ts, lib/mockData.ts, lib/utils.ts, app/home/, app/book/, app/ballot/, app/ballots/, app/programmes/, app/passes/, components/
**Notes:** create-next-app@14 cannot run in non-empty dir; initialised in /tmp and rsync'd. tmux session runs Claude Code TUI — used Bash tool directly for all shell ops. 13 routes build cleanly. No UI yet.

## 2026-05-08 02:02
**Task:** Home screen — header, BallotStatusCard, UpcomingCard, PassQuickAccess, BottomNav
**Changed:** app/home/page.tsx, components/home/BallotStatusCard.tsx, components/home/UpcomingCard.tsx, components/home/PassQuickAccess.tsx, components/layout/BottomNav.tsx, components/shared/StatusBadge.tsx, components/shared/CreditsBadge.tsx
**Notes:** motion stagger entrance. Progress bar animates to 730n mount (demo override since mock dates are past). BottomNav fixed-position, centered to 428px max-width. Dark mode classes throughout. Build clean, zero TS errors.

## 2026-05-08 02:20
**Task:** Home screen complete
**Changed:** app/home/page.tsx, components/home/BallotStatusCard.tsx, components/home/UpcomingCard.tsx, components/home/PassQuickAccess.tsx, components/layout/BottomNav.tsx, components/shared/StatusBadge.tsx, components/shared/CreditsBadge.tsx
**Notes:** All 5 spec items implemented: header w/ credits badge, active ballot card (73% progress bar, animated), upcoming booking, quick access row (gym pass/ballots/programmes tiles), persistent BottomNav. Motion stagger entrance. Dark mode tokens throughout. Build clean.

