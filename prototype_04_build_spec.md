# Prototype Build Spec
## ActiveSG+ Redesign — Claude Code Build Guide
**For: OGP Product Designer Application**
**Author: Aceson Aw**

---

## What to Build

A **Next.js + Tailwind CSS** interactive prototype of MyActiveSG+ that demonstrates three improved user journeys:

1. **Peak-hour facility balloting** (ballot entry → confirmation → result)
2. **Programme discovery and enrolment**
3. **QR pass display**

This is a design prototype — no backend, no real Singpass. All data from `mockData.ts`.

---

## Tech Stack

```
Framework:       Next.js 14 (App Router)
Styling:         Tailwind CSS
Animation:       Motion (motion/react) or CSS transitions
Icons:           Phosphor Icons (phosphor-react)
QR Code:         qrcode.react
Fonts:           DM Sans (Google Fonts), DM Mono
State:           React useState / useContext
Data:            Local mock data (no API calls)
Deployment:      Vercel (via existing pipeline)
```

---

## File Structure

```
/app
  /layout.tsx                  ← Font setup, global styles
  /page.tsx                    → Redirect to /home
  /home/page.tsx               → Home screen
  /book/page.tsx               → Facility booking — sport selector
  /book/[venueId]/page.tsx     → Slot selection for venue
  /ballot/[slotId]/page.tsx    → Ballot entry review
  /ballot/confirm/page.tsx     → Ballot confirmation success
  /ballot/result/[id]/page.tsx → Ballot result (won/missed)
  /programmes/page.tsx         → Programme browse
  /programmes/[id]/page.tsx    → Programme detail
  /programmes/[id]/enrol/page.tsx → Enrolment flow
  /passes/page.tsx             → My passes
  /passes/[id]/qr/page.tsx     → QR display (full screen)
  /ballots/page.tsx            → My ballots dashboard

/components
  /layout
    BottomNav.tsx              ← Persistent bottom navigation
    PageHeader.tsx             ← Back button + title pattern
    SafeArea.tsx               ← iOS safe area wrapper
  /home
    UpcomingCard.tsx
    BallotStatusCard.tsx
    PassQuickAccess.tsx
    GymCapacityBadge.tsx
  /booking
    SlotCard.tsx               ← Peak (ballot) and off-peak (direct)
    SlotGrid.tsx
    BallotEntrySheet.tsx       ← Bottom sheet confirm
  /programmes
    ProgrammeCard.tsx
    FilterChips.tsx
    ParticipantSelector.tsx    ← Self / child switcher
  /passes
    PassCard.tsx
    QRDisplay.tsx              ← Full-screen QR with auto-brightness
  /shared
    CreditsBadge.tsx
    StatusBadge.tsx            ← WON / PENDING / MISSED / CONFIRMED
    EmptyState.tsx
    SkeletonCard.tsx

/lib
  mockData.ts                  ← All mock data (from data context doc)
  utils.ts                     ← Date formatting, credits formatting
  types.ts                     ← TypeScript interfaces

/styles
  globals.css                  ← CSS variables, base styles
```

---

## Component Specs

### BottomNav
5 tabs: Home · Book · Programmes · Passes · Account
- Active tab: ActiveSG red icon + label
- Inactive: grey icon, no label (icon-only on mobile)
- Badge on "Ballots" within Account when results pending

### SlotCard
Props: `slot`, `onSelect`, `userMembershipType`
- Two variants: `ballot` and `direct`
- Ballot variant: orange tint bg, ballot badge, entry count, result time
- Direct variant: green tint bg, "Book Now" badge, price
- Disabled state if slot is full or user already entered

### BallotStatusCard
Props: `ballot`, `onView`
- Shows: facility name, venue, date/time, result time
- Progress bar: time elapsed in ballot window
- Status variants: PENDING (amber), WON (green), MISSED (grey)

### QRDisplay
Props: `pass`
- Takes full viewport height
- QR from `qrcode.react` using `pass.qrToken`
- Auto-refreshes display every 60 seconds (simulate dynamic QR)
- Brightness boost: `document.documentElement.style.filter = 'brightness(1.2)'` on mount, remove on unmount
- Show: pass type, venue, uses remaining, expiry

### ParticipantSelector
Props: `user`, `onSelect`
- Toggle between "Myself" and each linked child
- Shows child's name + age
- If no children linked: inline prompt "Add a child account"

### EmptyState
Props: `title`, `description`, `action?`
- Consistent illustration placeholder (SVG)
- CTA button
- Used for: no upcoming bookings, no active passes, no programme results

---

## Key Page Specs

### /home
Layout:
```
[Header: "Good morning, Wei Ling" + credits badge ($34.50)]
[Quick actions row: Book Facility | Browse Programmes | My Passes]
[Section: Upcoming — BKG-229901 card]
[Section: Active Ballots — ballot-7741 card with result countdown]
[Section: Active Passes — pass-gym-8812 quick access + gym capacity]
[Section: Suggested — Active Health programme card]
```

State handling:
- Empty (no bookings/ballots): show "Start exploring" onboarding card
- Ballot result ready: show notification banner at top

---

### /ballot/result/[id]
Two layouts based on `ballot.result`:

**WON:**
```
[Animation: confetti or scale-in celebration]
[Status: "You're in! 🎉"]
[Booking details card]
[Action: Add to Calendar]
[Action: View Booking]
```

**MISSED:**
```
[Status: "Not selected this time"]
[Empathetic copy — no failure language]
[Section: "Try these instead"]
  [AlternativeSlotCard × 2]
[Section: "Next ballot window"]
  [NextBallotCard]
[Action: Back to Booking]
```

---

### /programmes
Filter chips (horizontal scroll): All · Swimming · Badminton · Basketball · Fitness · For Kids

Programme grid:
- 1 column on mobile (full-width cards)
- Show: name, venue, schedule, age group, price, availability indicator
- Sold-out programmes still show (greyed), with "Join Waitlist" CTA

Sort options: Nearest · Soonest · Availability

---

## Styling Notes for Claude Code

### CSS Variables to set in globals.css
```css
:root {
  --brand-red: #E8311A;
  --brand-dark: #1A1A1A;
  --surface-0: #FFFFFF;
  --surface-1: #F5F5F5;
  --surface-2: #EBEBEB;
  --text-primary: #1A1A1A;
  --text-secondary: #555555;
  --text-tertiary: #888888;
  --color-success: #1DB954;
  --color-warning: #FF9500;
  --ballot-badge: #FF6B35;
  --peak-tint: #FFF3EE;
  --off-peak-tint: #EDFAEE;
}
```

### Tailwind Config additions
```js
// tailwind.config.js
extend: {
  colors: {
    brand: {
      red: '#E8311A',
      dark: '#1A1A1A',
    },
    ballot: '#FF6B35',
  },
  fontFamily: {
    sans: ['DM Sans', 'system-ui', 'sans-serif'],
    mono: ['DM Mono', 'monospace'],
  }
}
```

---

## Animation Specs

### Page transitions
Use `AnimatePresence` + `motion.div` with:
```js
// Drill-down (forward)
initial: { x: '100%', opacity: 0 }
animate: { x: 0, opacity: 1 }
exit: { x: '-20%', opacity: 0 }
transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }

// Back navigation
initial: { x: '-100%', opacity: 0 }
animate: { x: 0, opacity: 1 }
```

### Bottom sheet (BallotEntrySheet)
```js
initial: { y: '100%' }
animate: { y: 0 }
transition: { type: 'spring', damping: 30, stiffness: 300 }
```

### Ballot WON celebration
```js
// Staggered reveal
initial: { scale: 0.8, opacity: 0 }
animate: { scale: 1, opacity: 1 }
transition: { delay: 0.2, type: 'spring', damping: 20 }
```

---

## Mock Interaction Flows

Since there's no backend, simulate these with state:

### Ballot Entry
1. User clicks slot → `BallotEntrySheet` opens (bottom sheet)
2. User confirms → optimistic UI: ballot added to `activeBallots` state
3. Route to `/ballot/confirm`
4. Demo button: "Simulate Result (Won)" / "Simulate Result (Missed)" → route to `/ballot/result/[id]?result=won` or `?result=missed`

### Programme Enrolment
1. User clicks "Enrol" → `ParticipantSelector` appears
2. User selects participant → payment method selection
3. Confirms → booking added to state → confirmation screen

### QR Pass
1. From home "Quick Access" → route to `/passes/[id]/qr`
2. Auto-brightness boost on mount
3. "Simulate Scan" button → success animation (QR turns green, checkmark)

---

## Prototype Demo Script (for Interview)

Prepare to walk through this 3-minute flow:

**1. The problem setup (30s)**
"MyActiveSG+ launched in 2024 with a hard mandate — fix bot abuse, make booking fairer. It achieved that. But the transition created new friction: payment, balloting anxiety, and a gap where native app UX used to be. This prototype targets those gaps."

**2. Balloting flow demo (60s)**
- Open home → show active ballot card with countdown
- Navigate to book facility → select Sengkang → select peak-hour slot
- Enter ballot → review sheet → confirm
- Tap "Simulate Result: Missed" → show missed state with alternatives

**3. Programme discovery (45s)**
- Navigate to Programmes → show filter chips
- Select "For Kids" filter → cards narrow
- Select SwimSafer → detail view → Enrol → select child (Ethan) → confirm

**4. QR pass (30s)**
- From home → tap gym pass → QR full screen → "Simulate Scan" → success

**5. What I'd do next (15s)**
"I'd take this to the sports centre — talk to ground staff, watch how users actually scan in, understand where the gantry experience breaks. The data says 34/80 gym capacity right now — what does that look like in person? That's where the next iteration comes from."

---

## CLAUDE.md Rule for this Prototype

Add to your project's CLAUDE.md:

```markdown
## ActiveSG Prototype

- This is a design prototype — no real API calls, all data from /lib/mockData.ts
- Singpass login is out of scope — always render authenticated state
- All flows use optimistic UI — mutations update local state only
- QR tokens are mock strings — render using qrcode.react
- Target: mobile Chrome / Safari at 390px viewport
- Before making changes to visual design, check /prototype_02_visual_context.md
- Data shapes are in /prototype_03_data_context.md and /lib/types.ts
```
