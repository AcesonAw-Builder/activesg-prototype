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


## Tomorrow — remaining screens
Resume building screens in this priority order, one at a time:
1. /book
2. /book/[venueId]
3. /ballot/[slotId]
4. /ballot/confirm
5. /ballot/result/[id]
6. /programmes
7. /programmes/[id]
8. /programmes/[id]/enrol
9. /passes/[id]/qr

Rules:
- Build one screen at a time
- npm run build after each to confirm no errors
- Log to devlog.md and Notion after each screen
- git add . && git commit -m "feat: [screen name]" && git push after each
- Do not start the next screen until the current one compiles clean
## 2026-05-08 08:00
**Task:** /book — venue selector with sport filter chips
**Changed:** app/book/page.tsx, components/booking/VenueBookingCard.tsx, app/globals.css (no-scrollbar utility)
**Notes:** Sport chips filter venue list. Gym capacity badge (green/amber/red). Build clean.

## 2026-05-08 08:01
**Task:** /book/[venueId] — slot selection
**Changed:** app/book/[venueId]/page.tsx, components/layout/PageHeader.tsx, components/booking/SlotCard.tsx
**Notes:** Peak (ballot/orange) and off-peak (direct/green) slot cards. PageHeader reusable for all drill-down screens. Build clean.

## 2026-05-08 08:02
**Task:** /ballot/[slotId] — ballot entry review
**Changed:** app/ballot/[slotId]/page.tsx
**Notes:** Slot summary, ballot details (window close, result time, credit hold), info notice, CTA routes to /ballot/confirm. Build clean.

## 2026-05-08 08:03
**Task:** /ballot/confirm — success state
**Changed:** app/ballot/confirm/page.tsx
**Notes:** Animated checkmark, ballot summary card, demo simulate buttons (Won/Missed), Back to Home CTA. Build clean.

## 2026-05-08 08:04
**Task:** /ballot/result/[id] — won and missed states
**Changed:** app/ballot/result/[id]/page.tsx
**Notes:** Two layouts via ?result=won/missed. Won: checkmark hero + booking card. Missed: alternatives + next ballot window. Build clean.

## 2026-05-08 08:05
**Task:** /programmes — browse with filter chips
**Changed:** app/programmes/page.tsx, components/programmes/ProgrammeCard.tsx
**Notes:** Filter chips (All/Swimming/Badminton/Basketball/Fitness/For Kids). Fill bar shows availability. Free badge. Build clean.

## 2026-05-08 08:06
**Task:** /programmes/[id] — programme detail
**Changed:** app/programmes/[id]/page.tsx
**Notes:** Fill bar, schedule, pricing with credits offset, description, Enrol CTA / waitlist for full. Build clean.

