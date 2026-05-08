# Changelog

All notable changes to the ActiveSG+ prototype are documented here.

---

## [1.0.0] — 2026-05-08

Full prototype covering the three core journeys: facility balloting, programme discovery, and QR pass access. Eleven screens built, compiled, and deployed.

### Added

#### Infrastructure
- Next.js 14 App Router project initialised with TypeScript, Tailwind CSS
- Dependencies: `motion` (animations), `phosphor-react` (icons), `qrcode.react` (QR codes)
- Google Fonts: DM Sans (headings + body) and DM Mono (numerals, times, credits)
- Tailwind config extended with brand tokens — `brand-red`, `ballot`, `peak`, `offpeak`, `success`, `warning`, surface scale, text scale
- CSS custom properties for all colour tokens; dark mode overrides via `.dark` class
- Viewport meta: `device-width`, no user-scale, `viewportFit=cover`, theme colour `#E8311A`
- `no-scrollbar` utility for horizontal chip bars
- `pb-safe` / `pt-safe` utilities for iOS safe area insets

#### Data layer
- `/lib/types.ts` — full TypeScript interface set: `User`, `Venue`, `FacilitySlot`, `BallotEntry`, `Booking`, `Programme`, `Pass`, `Homescreen`, `MockDatabase`, notification payloads, and all primitive unions
- `/lib/mockData.ts` — complete mock dataset: 3 venues, 7 slots, 3 ballots, 2 bookings, 3 programmes (SwimSafer, Badminton Fundamentals, Active Health Lab), 2 passes (active gym, expired pool), homescreen aggregate
- `/lib/utils.ts` — formatting helpers: `formatTime`, `formatTimeRange`, `formatDate`, `formatCredits`, `ballotProgress`, `gymCapacityColor`, `hoursUntil`, `formatHoursRemaining`

#### Shared components
- `components/shared/StatusBadge` — pill badge for PENDING / WON / MISSED / CONFIRMED / CANCELLED variants
- `components/shared/CreditsBadge` — credits balance display with DM Mono numerals
- `components/layout/BottomNav` — fixed 5-tab navigation (Home, Book, Programmes, Passes, Account); active tab shows filled icon + label in brand red; `usePathname` for active state detection
- `components/layout/PageHeader` — sticky back-button header used by all drill-down screens; accepts optional subtitle

#### Screens

| Route | Description |
|---|---|
| `/home` | Personalised home — sticky header with greeting + credits badge; active ballot card with animated progress bar (spring, ease-out); upcoming booking card; quick-access row (Gym Pass, Ballots, Programmes); motion stagger entrance (70ms stagger) |
| `/book` | Facility booking — sport filter chips (All, Badminton, Swimming, Gym, Basketball, Squash, Tennis, Pool); venue cards with facility tags and live gym capacity badge (green/amber/red) |
| `/book/[venueId]` | Slot selection — date strip; peak slots (ballot, orange tint, entry count, result time) and off-peak slots (direct, green tint) via `SlotCard`; routes to `/ballot/[slotId]` or direct booking |
| `/ballot/[slotId]` | Ballot entry review — slot summary card, ballot window/result time/credits-held details table, info notice, "Enter Ballot" CTA with credit amount |
| `/ballot/confirm` | Ballot success — animated scale-in checkmark; ballot summary; demo simulate buttons routing to `/ballot/result/[id]?result=won` or `?result=missed` |
| `/ballot/result/[id]` | Ballot result — **WON**: spring-scale checkmark, booking details, Add to Calendar; **MISSED**: empathetic copy, alternative slots via `SlotCard`, next ballot window card; layout controlled by `?result=` search param |
| `/programmes` | Programme browse — filter chips (All, Swimming, Badminton, Basketball, Fitness, For Kids); animated programme cards with fill bar, price, age group, slots remaining; sold-out badge |
| `/programmes/[id]` | Programme detail — animated fill bar, schedule meta, about + requirements, pricing table with credits offset percentage, Enrol CTA (or Join Waitlist if full) |
| `/programmes/[id]/enrol` | Enrolment flow — participant selector (self + linked children with age-range warning); booking summary with credits offset; inline success state with animated checkmark |
| `/ballots` | My Ballots dashboard — Active / Past tabs with counts; ballot cards showing status badge (PENDING/WON/MISSED), result countdown for pending; tap to result screen |
| `/passes` | Passes list — active and expired sections; pass cards with type icon, uses progress bar, expiry; tap active pass to QR; purchase prompt |
| `/passes/[id]/qr` | QR pass display — full-screen `QRCodeSVG`; auto-brightness boost (`filter: brightness(1.15)`) on mount, restored on unmount; simulated 60-second QR token refresh; Simulate Scan demo button → animated success state |

#### Booking components
- `SlotCard` — two visual variants: ballot (orange/peak tint) and direct (green/off-peak tint); disabled state for closed slots; routes to ballot entry or direct booking
- `VenueBookingCard` — venue name, address, facility chip tags with highlight for selected sport, gym capacity badge

#### Programme components
- `ProgrammeCard` — schedule, age group, price, fill bar, Free/Full badges

### Technical notes
- All screens are client components (`"use client"`) for motion and state; mock data imported directly
- Motion animations use `type: "spring"`, `stiffness: 300`, `damping: 28` throughout for consistency; page-level stagger via `staggerChildren: 0.07`
- Ballot progress bar hardcoded at 73% for prototype (mock dates are in the past)
- Dark mode implemented via Tailwind `dark:` classes; toggle by adding `dark` class to `<html>`
- `create-next-app@14` cannot install into a non-empty directory; project was scaffolded in `/tmp` and rsync'd

### Deployment
- GitHub: `https://github.com/AcesonAw-Builder/activesg-prototype`
- Vercel (production): `https://activesg-eight.vercel.app`
