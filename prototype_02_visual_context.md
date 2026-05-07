# Visual Context Document
## ActiveSG+ — Design Language & UI Direction
**For: OGP Product Designer Application**
**Author: Aceson Aw**

---

## Design Principles

### 1. Civic warmth, not bureaucratic sterility
Government products often err toward safe, cold UI. ActiveSG should feel like it belongs to active, social Singapore — energetic but trustworthy. Not a utility, a companion.

### 2. Clarity at speed
Users open this on their way to the courts. They should be able to see what they need — QR code, next ballot result, programme time — in under 3 seconds. Every screen has one primary action.

### 3. Honest information density
Don't hide complexity. Balloting has rules. Pricing has tiers. Show the information clearly rather than obscuring it with progressive disclosure that creates anxiety.

### 4. Accessible by design
The platform serves users from 6 to 60+. Minimum 16px body text. Touch targets 48px+. Contrast ratios WCAG AA. Dark mode is not optional — it's needed for outdoor QR scanning.

---

## Visual Identity Reference

### Color System

**Primary Palette**
```
--color-brand-red:      #E8311A   /* ActiveSG red — primary action, CTAs */
--color-brand-dark:     #1A1A1A   /* Primary text */
--color-brand-white:    #FFFFFF   /* Backgrounds, cards */
```

**Extended Palette**
```
--color-surface-0:      #FFFFFF   /* Page background */
--color-surface-1:      #F5F5F5   /* Card backgrounds */
--color-surface-2:      #EBEBEB   /* Dividers, borders */

--color-text-primary:   #1A1A1A
--color-text-secondary: #555555
--color-text-tertiary:  #888888

--color-success:        #1DB954   /* Ballot won, booking confirmed */
--color-warning:        #FF9500   /* Ballot pending, low credits */
--color-error:          #E8311A   /* Payment failed, slot unavailable */

--color-ballot-badge:   #FF6B35   /* Distinct from red — ballot-specific indicator */
--color-peak:           #FFE4D9   /* Peak-hour slot background tint */
--color-off-peak:       #E8F5E9   /* Off-peak slot background tint */
```

**Dark Mode Overrides**
```
--color-surface-0:      #121212
--color-surface-1:      #1E1E1E
--color-surface-2:      #2A2A2A
--color-text-primary:   #F5F5F5
--color-text-secondary: #AAAAAA
```

---

## Typography

### Scale
```
Display:     32px / 700 / -0.5px letter-spacing
Heading 1:   24px / 700
Heading 2:   20px / 600
Body Large:  17px / 400 / 1.5 line-height
Body:        15px / 400 / 1.5 line-height
Caption:     13px / 400
Label:       12px / 500 / 0.4px letter-spacing / UPPERCASE
```

### Font Choice
- **Headings:** DM Sans (700) — geometric, civic, works across languages
- **Body:** DM Sans (400/500) — consistent family reduces cognitive load
- **Numerals/Data:** DM Mono — for credits balance, times, slot numbers — adds precision feel
- **Fallback:** system-ui, -apple-system, sans-serif

*Rationale: DM Sans is warm but authoritative. Unlike Inter (overused) or Roboto (Android-generic), it has personality without being playful. Scales well at small sizes — important for mobile.*

---

## Component Patterns

### Slot Card — Facility Booking
```
┌─────────────────────────────────┐
│ 🏸  Badminton Court 3            │
│     Sengkang Sport Centre        │
│                                  │
│  Wed, 14 May · 7:00–8:00pm      │
│  ───────────────────────────     │
│  [🎲 BALLOT]  Open until 11:59pm │
│                                  │
│  [  Enter Ballot  ]  ←── CTA   │
└─────────────────────────────────┘
```

**Design notes:**
- Peak slots have orange tint background + "BALLOT" badge in pill
- Off-peak slots have green tint + "BOOK NOW" badge
- Time displayed in 12h format (matches SG convention)
- CTA button full-width, 52px height, high contrast

---

### Ballot Status Card
```
┌─────────────────────────────────┐
│ ACTIVE BALLOT           ⏱ 14h  │
│                                  │
│ Badminton Court · Sengkang       │
│ Thu, 15 May · 8:00–9:00pm        │
│                                  │
│ Result announced: Thu 2:00am     │
│ ████████████░░ 73% window closed │
└─────────────────────────────────┘
```

**Design notes:**
- Progress bar shows ballot window closing
- Result time is explicit — removes "when will I know?" anxiety
- "ACTIVE" badge in amber; "WON" in green; "MISSED" in neutral grey (not red — losing isn't a failure)

---

### Programme Card
```
┌─────────────────────────────────┐
│  [Sport Icon]   SwimSafer Lvl 1 │
│                 Jurong East Pool │
│                                  │
│  Sat & Sun · 9:00–10:00am       │
│  Ages 6–12 · 8 sessions          │
│                                  │
│  $48 · 4 slots left              │
│  [──── 80% filled ────]          │
└─────────────────────────────────┘
```

**Design notes:**
- Scarcity indicator (slots left) drives action without dark patterns
- Fill bar gives visual sense of demand
- Price prominent — no sticker shock at checkout

---

### QR Pass Screen
```
┌─────────────────────────────────┐
│ ← Back       GYM PASS           │
│                                  │
│  ┌───────────────────────────┐  │
│  │                           │  │
│  │    [QR CODE — full size]  │  │
│  │                           │  │
│  └───────────────────────────┘  │
│                                  │
│  Bukit Batok Sport Centre        │
│  Valid today · 8 uses remaining  │
│  Expires: 31 May 2025            │
│                                  │
│  [  Scan to Enter  ]             │
└─────────────────────────────────┘
```

**Design notes:**
- QR takes ~60% of screen height
- Auto-brightness boost triggers on this screen
- Dynamic QR — refreshes every 60 seconds (anti-screenshot abuse)
- Bottom CTA is informational, not needed to scan — but reduces confusion

---

## Iconography

Use a consistent icon set:
- **Recommended:** Phosphor Icons (MIT license) — clean, available in multiple weights, good sports category
- Avoid emoji icons in functional UI
- Sport type icons: use filled variants for selected state, regular for unselected
- System icons (back, close, search): 24px / 2px stroke

---

## Motion & Animation

### Principles
- **Purposeful only** — no gratuitous animation
- **Fast** — transitions under 250ms; enter/exit under 350ms
- **Spring physics** for cards and modals (feel physical)
- **No animation** on the QR code screen — stability = trust

### Specific animations
| Interaction | Animation |
|-------------|-----------|
| Page transition | Horizontal slide (right-to-left drill down, left-to-right back) |
| Bottom sheet open | Ease-out spring upward, 300ms |
| Ballot confirmation | Confetti burst (brief, 1s, then clears) |
| Result "WON" reveal | Scale + fade in, 400ms |
| Result "MISSED" | Simple fade in — no drama |
| Tab switch | Crossfade, 150ms |

---

## Responsive Breakpoints

This is a mobile-first web app. Breakpoints:
```
Mobile (primary):    375px – 428px
Tablet (secondary):  768px – 1024px  (admin portal, kiosk)
Desktop (minimal):   1280px+          (admin only)
```

Mobile layout constraints:
- Bottom navigation (5 items max)
- Content cards full-width on mobile (16px padding each side)
- Bottom safe area padding for home indicator (iPhone)
- Min touch target: 48 × 48px

---

## Screen Inventory for Prototype

### MVP Screens (Must Have)
1. Home (personalised: upcoming bookings, active ballots, quick actions)
2. Facility Booking — venue list
3. Facility Booking — slot selection (peak + off-peak mixed)
4. Ballot entry — review + confirm
5. Ballot confirmation — success state
6. Ballot result — WON state (with calendar export)
7. Ballot result — MISSED state (with alternatives)
8. Programme browse — grid with filters
9. Programme detail
10. Programme enroll — participant selector (self / child)
11. QR Pass — display screen
12. My Ballots — dashboard
13. Empty state — first-time home

### Secondary Screens (Nice to Have)
14. Home (empty state — no upcoming)
15. Facility Booking — by sport (category selector)
16. Credits wallet
17. Notification settings
18. Family accounts management

---

## What to Avoid

- Purple gradients (generic civic app cliché)
- Overcrowded dashboards — one hero action per screen
- Dark patterns: hiding prices, burying cancellation
- Inconsistent icon weights in the same view
- Text below 14px on mobile
- Placeholder text as labels (accessibility fail)
- Red for anything non-destructive (red = danger, reserve it)
