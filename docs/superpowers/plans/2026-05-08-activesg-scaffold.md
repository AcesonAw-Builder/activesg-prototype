# ActiveSG Scaffold Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold the ActiveSG+ Next.js 14 prototype — project init, dependencies, Tailwind tokens, TypeScript types, and mock data. No UI components yet.

**Architecture:** Next.js 14 App Router with TypeScript. All prototype data lives in `/lib/mockData.ts` (imported, never fetched). `/lib/types.ts` defines all interfaces. Tailwind config + `globals.css` embed the design tokens from `prototype_02_visual_context.md`.

**Tech Stack:** Next.js 14 · TypeScript · Tailwind CSS 3 · motion/react · phosphor-react · qrcode.react · DM Sans / DM Mono (Google Fonts)

**Shell rule:** All shell commands run via `tmux send-keys -t activesg "COMMAND" Enter`. Never pass `--flags` outside the quoted string. Chain multi-step with `&&` on one line.

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `package.json` | Created by Next.js init | Dependencies |
| `tailwind.config.ts` | Modify | Brand tokens, font families |
| `app/globals.css` | Modify | CSS custom properties, base resets |
| `app/layout.tsx` | Modify | DM Sans + DM Mono font loading, html structure |
| `app/page.tsx` | Modify | Redirect to /home |
| `app/home/page.tsx` | Create stub | Home screen |
| `app/book/page.tsx` | Create stub | Sport selector |
| `app/book/[venueId]/page.tsx` | Create stub | Slot selection |
| `app/ballot/[slotId]/page.tsx` | Create stub | Ballot entry review |
| `app/ballot/confirm/page.tsx` | Create stub | Ballot confirmation |
| `app/ballot/result/[id]/page.tsx` | Create stub | Ballot result |
| `app/programmes/page.tsx` | Create stub | Programme browse |
| `app/programmes/[id]/page.tsx` | Create stub | Programme detail |
| `app/programmes/[id]/enrol/page.tsx` | Create stub | Enrolment flow |
| `app/passes/page.tsx` | Create stub | My passes |
| `app/passes/[id]/qr/page.tsx` | Create stub | QR display |
| `app/ballots/page.tsx` | Create stub | My ballots dashboard |
| `lib/types.ts` | Create | All TypeScript interfaces |
| `lib/mockData.ts` | Create | All prototype mock data |
| `lib/utils.ts` | Create | Date/credits formatting helpers |

---

### Task 1: Initialise Next.js 14 project

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`

- [ ] **Step 1: Run create-next-app**

```bash
tmux send-keys -t activesg "npx create-next-app@14 . --typescript --tailwind --app --no-eslint --no-src-dir --import-alias '@/*' --yes" Enter
```

Expected: "Success! Created project at ..." — accepts all defaults. The `.` installs into current directory.

- [ ] **Step 2: Verify dev server starts**

```bash
tmux send-keys -t activesg "npm run dev &" Enter
```

Wait 5 seconds, then check output:
```bash
tmux capture-pane -t activesg -p | grep -E "ready|localhost|error" | head -5
```
Expected: `ready - started server on localhost:3000`

- [ ] **Step 3: Kill dev server**

```bash
tmux send-keys -t activesg "kill %1 2>/dev/null; true" Enter
```

- [ ] **Step 4: Commit baseline**

```bash
tmux send-keys -t activesg "git init && git add -A && git commit -m 'chore: init Next.js 14 app router project'" Enter
```

---

### Task 2: Install additional dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install runtime dependencies**

```bash
tmux send-keys -t activesg "npm install motion phosphor-react qrcode.react" Enter
```

Expected: `added N packages`

- [ ] **Step 2: Install type definitions**

```bash
tmux send-keys -t activesg "npm install --save-dev @types/qrcode.react" Enter
```

If `@types/qrcode.react` 404s (package ships its own types), it will warn — that is fine, continue.

- [ ] **Step 3: Verify installs**

```bash
tmux send-keys -t activesg "node -e \"require('phosphor-react'); require('qrcode.react'); console.log('deps ok')\"" Enter
```

Expected: `deps ok`

- [ ] **Step 4: Commit**

```bash
tmux send-keys -t activesg "git add -A && git commit -m 'chore: add motion, phosphor-react, qrcode.react'" Enter
```

---

### Task 3: Configure Tailwind with design tokens

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Replace tailwind.config.ts**

Write this file at `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#E8311A",
          dark: "#1A1A1A",
          white: "#FFFFFF",
        },
        surface: {
          0: "#FFFFFF",
          1: "#F5F5F5",
          2: "#EBEBEB",
        },
        text: {
          primary: "#1A1A1A",
          secondary: "#555555",
          tertiary: "#888888",
        },
        ballot: "#FF6B35",
        peak: "#FFF3EE",
        offpeak: "#EDFAEE",
        success: "#1DB954",
        warning: "#FF9500",
        error: "#E8311A",
        // Dark mode surface tokens (applied via CSS vars)
        "dark-surface-0": "#121212",
        "dark-surface-1": "#1E1E1E",
        "dark-surface-2": "#2A2A2A",
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        mono: ["DM Mono", "monospace"],
      },
      fontSize: {
        display: ["32px", { fontWeight: "700", letterSpacing: "-0.5px" }],
        h1: ["24px", { fontWeight: "700" }],
        h2: ["20px", { fontWeight: "600" }],
        "body-lg": ["17px", { lineHeight: "1.5", fontWeight: "400" }],
        body: ["15px", { lineHeight: "1.5", fontWeight: "400" }],
        caption: ["13px", { fontWeight: "400" }],
        label: ["12px", { fontWeight: "500", letterSpacing: "0.4px" }],
      },
      spacing: {
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-top": "env(safe-area-inset-top)",
      },
      minHeight: {
        touch: "48px",
      },
      minWidth: {
        touch: "48px",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Replace app/globals.css**

Write this file at `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

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
  --bottom-nav-height: 64px;
}

.dark {
  --surface-0: #121212;
  --surface-1: #1E1E1E;
  --surface-2: #2A2A2A;
  --text-primary: #F5F5F5;
  --text-secondary: #AAAAAA;
}

@layer base {
  * {
    box-sizing: border-box;
  }

  html {
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }

  body {
    @apply bg-surface-0 text-text-primary font-sans;
    max-width: 428px;
    margin: 0 auto;
    min-height: 100dvh;
    overflow-x: hidden;
  }

  /* Touch targets */
  button, a, [role="button"] {
    min-height: 48px;
    min-width: 48px;
  }
}

@layer utilities {
  .pb-safe {
    padding-bottom: max(env(safe-area-inset-bottom), 16px);
  }

  .pt-safe {
    padding-top: env(safe-area-inset-top);
  }
}
```

- [ ] **Step 3: Verify Tailwind compiles**

```bash
tmux send-keys -t activesg "npx tailwindcss -i app/globals.css -o /tmp/tw-test.css --content 'app/**/*.tsx' 2>&1 | tail -3" Enter
```

Expected: no errors, output file written.

- [ ] **Step 4: Commit**

```bash
tmux send-keys -t activesg "git add -A && git commit -m 'chore: configure Tailwind tokens and CSS custom properties'" Enter
```

---

### Task 4: Create TypeScript types

**Files:**
- Create: `lib/types.ts`

- [ ] **Step 1: Create lib/types.ts**

Write this file at `lib/types.ts`:

```typescript
// ── Primitives ────────────────────────────────────────────────────────────────

export type MembershipType = "SG_PR" | "nonResident";
export type BookingType = "ballot" | "direct";
export type SlotStatus = "ballot_open" | "ballot_closed" | "available" | "full" | "cancelled";
export type BallotStatus = "pending" | "resolved";
export type BallotResult = "won" | "missed" | null;
export type BookingStatus = "confirmed" | "cancelled" | "pending";
export type PassType = "gym" | "pool" | "tennis";
export type PassStatus = "active" | "expired" | "used";
export type ProgrammeStatus = "open" | "full" | "closed" | "waitlist";
export type ProgrammeCategory = "learn_to_play" | "fundamentals" | "active_health" | "competition";
export type FacilityType = "badminton" | "basketball" | "squash" | "gym" | "pool" | "swimming" | "tennis" | "tabletennis" | "fitness";
export type DayOfWeek = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
export type NotificationMethod = "email" | "push" | "none";

// ── User ──────────────────────────────────────────────────────────────────────

export interface ChildAccount {
  id: string;
  name: string;
  age: number;
  relationship: "child";
}

export interface UserCredits {
  balance: number;
  currency: string;
  expiryDate: string;
}

export interface NotificationPreferences {
  ballotResults: NotificationMethod;
  bookingConfirmations: NotificationMethod;
  programmeReminders: NotificationMethod;
}

export interface User {
  id: string;
  name: string;
  singpassLinked: boolean;
  membershipType: MembershipType;
  credits: UserCredits;
  children: ChildAccount[];
  favouriteVenues: string[];
  notificationPreferences: NotificationPreferences;
}

// ── Venue ─────────────────────────────────────────────────────────────────────

export interface GymCapacity {
  current: number;
  max: number;
}

export interface VenueCoordinates {
  lat: number;
  lng: number;
}

export interface OperatingHours {
  open: string;
  close: string;
}

export interface Venue {
  id: string;
  name: string;
  shortName: string;
  address: string;
  coordinates: VenueCoordinates;
  facilities: FacilityType[];
  hasGantry: boolean;
  operatingHours: OperatingHours;
  gymCapacity: GymCapacity;
  image: string;
}

// ── Facility Slot ─────────────────────────────────────────────────────────────

export interface SlotPrice {
  SG_PR: number;
  nonResident: number;
  currency: string;
}

export interface FacilitySlot {
  id: string;
  venueId: string;
  facilityType: FacilityType;
  facilityName: string;
  date: string;
  startTime: string;
  endTime: string;
  isPeakHour: boolean;
  bookingType: BookingType;
  ballotWindowClose?: string;
  ballotResultTime?: string;
  price: SlotPrice;
  status: SlotStatus;
  currentBallotEntries: number | null;
}

// ── Ballot ────────────────────────────────────────────────────────────────────

export interface AlternativeSlot {
  venueId: string;
  slotId: string;
  date: string;
  startTime: string;
}

export interface BallotEntry {
  id: string;
  userId: string;
  slotId: string;
  venueId: string;
  facilityName: string;
  date: string;
  startTime: string;
  endTime: string;
  enteredAt: string;
  resultAt: string;
  status: BallotStatus;
  result: BallotResult;
  bookingId?: string | null;
  creditsHeld: number;
  alternativesAvailable?: AlternativeSlot[];
}

// ── Booking ───────────────────────────────────────────────────────────────────

export type BookingForType = "self" | "child";
export type PaymentMethod = "activesg_credits" | "paynow" | "credit_card";

export interface Booking {
  id: string;
  userId: string;
  type: "facility" | "programme";
  status: BookingStatus;
  facilityName?: string;
  venueName: string;
  venueId: string;
  date?: string;
  dates?: string[];
  startTime: string;
  endTime: string;
  bookedFor: BookingForType;
  participantId?: string;
  participantName?: string;
  paidBy: string;
  amountPaid: number;
  paymentMethod: PaymentMethod;
  bookedAt: string;
  qrCode: string;
  canCancel: boolean;
  cancelDeadline?: string | null;
  programmeName?: string;
  programmeId?: string;
}

// ── Programme ─────────────────────────────────────────────────────────────────

export interface ProgrammePrice {
  SG_PR: number;
  nonResident?: number;
  currency: string;
}

export interface ProgrammeSchedule {
  days: DayOfWeek[];
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
  totalSessions: number;
  isOneOff?: boolean;
}

export interface AgeGroup {
  min: number;
  max: number;
}

export interface Programme {
  id: string;
  name: string;
  sport: FacilityType | "fitness" | "swimming";
  category: ProgrammeCategory;
  ageGroup: AgeGroup;
  venueId: string;
  venueName: string;
  schedule: ProgrammeSchedule;
  price: ProgrammePrice;
  creditsApplicable: boolean;
  creditsOffsetPercentage: number;
  totalSlots: number;
  filledSlots: number;
  availableSlots: number;
  status: ProgrammeStatus;
  description: string;
  requirements: string;
  image: string;
  tags: string[];
}

// ── Pass ──────────────────────────────────────────────────────────────────────

export interface Pass {
  id: string;
  userId: string;
  type: PassType;
  venueId: string | null;
  venueName: string;
  purchasedAt: string;
  validFrom: string;
  validUntil: string;
  totalUses: number;
  usesConsumed: number;
  usesRemaining: number;
  qrToken: string | null;
  dynamicQRRefreshSeconds?: number;
  status: PassStatus;
}

// ── Homescreen Aggregated View ────────────────────────────────────────────────

export interface HomescreenUser {
  firstName: string;
  credits: number;
}

export interface HomescreenUpcomingBooking {
  type: "facility" | "programme";
  id: string;
  summary: string;
  date: string;
  time: string;
  status: BookingStatus;
}

export interface HomescreenActiveBallot {
  id: string;
  summary: string;
  date: string;
  time: string;
  resultAt: string;
  hoursUntilResult: number;
  status: BallotStatus;
}

export interface HomescreenActivePass {
  id: string;
  type: PassType;
  venueName: string;
  usesRemaining: number;
  validUntil: string;
  status: PassStatus;
}

export interface HomescreenSuggestedProgramme {
  id: string;
  name: string;
  availableSlots: number;
  price: number;
  tag: string;
}

export interface HomescreenNearbyVenue {
  venueId: string;
  venueName: string;
  distance: string;
  gymCapacity: GymCapacity & { percentFull: number };
}

export interface Homescreen {
  user: HomescreenUser;
  upcomingBookings: HomescreenUpcomingBooking[];
  activeBallots: HomescreenActiveBallot[];
  activePasses: HomescreenActivePass[];
  suggestedProgrammes: HomescreenSuggestedProgramme[];
  nearbyVenueAvailability: HomescreenNearbyVenue[];
}

// ── Ballot Result Notification ────────────────────────────────────────────────

export type NotificationType = "ballot_result";

export interface AlternativeSlotNotification {
  slotId: string;
  venueId: string;
  venueName: string;
  facilityName: string;
  date: string;
  time: string;
  type: BookingType;
  ballotWindowClose?: string;
  bookingWindowOpen?: boolean;
}

export interface NextBallotWindow {
  slotId: string;
  date: string;
  ballotOpensAt: string;
}

export interface BallotResultNotification {
  type: NotificationType;
  userId: string;
  ballotId: string;
  result: "won" | "missed";
  facilityName: string;
  venueName: string;
  date: string;
  time: string;
  alternatives: AlternativeSlotNotification[];
  nextBallotWindowFor: NextBallotWindow;
}

// ── App State ─────────────────────────────────────────────────────────────────

export interface MockDatabase {
  user: User;
  venues: Venue[];
  slots: FacilitySlot[];
  ballots: BallotEntry[];
  bookings: Booking[];
  programmes: Programme[];
  passes: Pass[];
  homescreen: Homescreen;
}
```

- [ ] **Step 2: Verify types compile**

```bash
tmux send-keys -t activesg "npx tsc --noEmit --strict lib/types.ts 2>&1 | head -20" Enter
```

Expected: no output (zero errors).

- [ ] **Step 3: Commit**

```bash
tmux send-keys -t activesg "git add lib/types.ts && git commit -m 'feat: add TypeScript type definitions for all entities'" Enter
```

---

### Task 5: Create mock data

**Files:**
- Create: `lib/mockData.ts`

- [ ] **Step 1: Create lib/mockData.ts**

Write this file at `lib/mockData.ts`:

```typescript
import type {
  User, Venue, FacilitySlot, BallotEntry, Booking,
  Programme, Pass, Homescreen, MockDatabase,
} from "./types";

export const mockUser: User = {
  id: "USR-88291",
  name: "Wei Ling Tan",
  singpassLinked: true,
  membershipType: "SG_PR",
  credits: {
    balance: 34.50,
    currency: "SGD",
    expiryDate: "2025-12-31",
  },
  children: [
    { id: "USR-88292", name: "Ethan Tan", age: 8, relationship: "child" },
  ],
  favouriteVenues: ["venue-sengkang-sc", "venue-jurong-east-sc"],
  notificationPreferences: {
    ballotResults: "email",
    bookingConfirmations: "email",
    programmeReminders: "email",
  },
};

export const mockVenues: Venue[] = [
  {
    id: "venue-sengkang-sc",
    name: "Sengkang Sport Centre",
    shortName: "Sengkang SC",
    address: "57 Anchorvale Road, Singapore 544965",
    coordinates: { lat: 1.3915, lng: 103.8953 },
    facilities: ["badminton", "basketball", "squash", "gym", "pool"],
    hasGantry: true,
    operatingHours: { open: "07:00", close: "22:00" },
    gymCapacity: { current: 34, max: 80 },
    image: "/images/venues/sengkang-sc.jpg",
  },
  {
    id: "venue-jurong-east-sc",
    name: "Jurong East Sport Centre",
    shortName: "Jurong East SC",
    address: "21 Jurong East Street 31, Singapore 609517",
    coordinates: { lat: 1.3372, lng: 103.7262 },
    facilities: ["badminton", "swimming", "gym", "tabletennis"],
    hasGantry: true,
    operatingHours: { open: "07:00", close: "22:00" },
    gymCapacity: { current: 12, max: 60 },
    image: "/images/venues/jurong-east-sc.jpg",
  },
  {
    id: "venue-bishan-sc",
    name: "Bishan Sport Centre",
    shortName: "Bishan SC",
    address: "5 Bishan Street 14, Singapore 579783",
    coordinates: { lat: 1.3520, lng: 103.8481 },
    facilities: ["badminton", "swimming", "gym", "tennis"],
    hasGantry: false,
    operatingHours: { open: "07:00", close: "22:00" },
    gymCapacity: { current: 28, max: 70 },
    image: "/images/venues/bishan-sc.jpg",
  },
];

export const mockSlots: FacilitySlot[] = [
  {
    id: "slot-001",
    venueId: "venue-sengkang-sc",
    facilityType: "badminton",
    facilityName: "Badminton Court 3",
    date: "2025-05-14",
    startTime: "19:00",
    endTime: "20:00",
    isPeakHour: true,
    bookingType: "ballot",
    ballotWindowClose: "2025-04-30T23:59:00+08:00",
    ballotResultTime: "2025-05-01T02:00:00+08:00",
    price: { SG_PR: 2.00, nonResident: 3.50, currency: "SGD" },
    status: "ballot_open",
    currentBallotEntries: 42,
  },
  {
    id: "slot-002",
    venueId: "venue-sengkang-sc",
    facilityType: "badminton",
    facilityName: "Badminton Court 3",
    date: "2025-05-14",
    startTime: "10:00",
    endTime: "11:00",
    isPeakHour: false,
    bookingType: "direct",
    price: { SG_PR: 2.00, nonResident: 3.50, currency: "SGD" },
    status: "available",
    currentBallotEntries: null,
  },
  {
    id: "slot-003",
    venueId: "venue-jurong-east-sc",
    facilityType: "badminton",
    facilityName: "Badminton Court 1",
    date: "2025-05-14",
    startTime: "20:00",
    endTime: "21:00",
    isPeakHour: true,
    bookingType: "ballot",
    ballotWindowClose: "2025-04-30T23:59:00+08:00",
    ballotResultTime: "2025-05-01T02:00:00+08:00",
    price: { SG_PR: 2.00, nonResident: 3.50, currency: "SGD" },
    status: "ballot_open",
    currentBallotEntries: 18,
  },
  {
    id: "slot-004",
    venueId: "venue-bishan-sc",
    facilityType: "badminton",
    facilityName: "Badminton Court 2",
    date: "2025-05-10",
    startTime: "20:00",
    endTime: "21:00",
    isPeakHour: true,
    bookingType: "ballot",
    ballotWindowClose: "2025-04-27T23:59:00+08:00",
    ballotResultTime: "2025-04-27T02:00:00+08:00",
    price: { SG_PR: 2.00, nonResident: 3.50, currency: "SGD" },
    status: "ballot_closed",
    currentBallotEntries: 31,
  },
  {
    id: "slot-005",
    venueId: "venue-sengkang-sc",
    facilityType: "badminton",
    facilityName: "Badminton Court 1",
    date: "2025-05-08",
    startTime: "19:00",
    endTime: "20:00",
    isPeakHour: true,
    bookingType: "ballot",
    ballotWindowClose: "2025-04-25T23:59:00+08:00",
    ballotResultTime: "2025-04-25T02:00:00+08:00",
    price: { SG_PR: 2.00, nonResident: 3.50, currency: "SGD" },
    status: "ballot_closed",
    currentBallotEntries: 27,
  },
  {
    id: "slot-alt-001",
    venueId: "venue-jurong-east-sc",
    facilityType: "badminton",
    facilityName: "Badminton Court 1",
    date: "2025-05-14",
    startTime: "20:00",
    endTime: "21:00",
    isPeakHour: true,
    bookingType: "ballot",
    ballotWindowClose: "2025-05-01T23:59:00+08:00",
    ballotResultTime: "2025-05-02T02:00:00+08:00",
    price: { SG_PR: 2.00, nonResident: 3.50, currency: "SGD" },
    status: "ballot_open",
    currentBallotEntries: 9,
  },
  {
    id: "slot-alt-002",
    venueId: "venue-bishan-sc",
    facilityType: "badminton",
    facilityName: "Badminton Court 2",
    date: "2025-05-15",
    startTime: "19:00",
    endTime: "20:00",
    isPeakHour: false,
    bookingType: "direct",
    price: { SG_PR: 2.00, nonResident: 3.50, currency: "SGD" },
    status: "available",
    currentBallotEntries: null,
  },
];

export const mockBallots: BallotEntry[] = [
  {
    id: "ballot-7741",
    userId: "USR-88291",
    slotId: "slot-001",
    venueId: "venue-sengkang-sc",
    facilityName: "Badminton Court 3",
    date: "2025-05-14",
    startTime: "19:00",
    endTime: "20:00",
    enteredAt: "2025-04-29T14:32:00+08:00",
    resultAt: "2025-05-01T02:00:00+08:00",
    status: "pending",
    result: null,
    creditsHeld: 2.00,
  },
  {
    id: "ballot-6630",
    userId: "USR-88291",
    slotId: "slot-004",
    venueId: "venue-bishan-sc",
    facilityName: "Badminton Court 2",
    date: "2025-05-10",
    startTime: "20:00",
    endTime: "21:00",
    enteredAt: "2025-04-26T09:15:00+08:00",
    resultAt: "2025-04-27T02:00:00+08:00",
    status: "resolved",
    result: "won",
    bookingId: "BKG-229901",
    creditsHeld: 0,
  },
  {
    id: "ballot-6529",
    userId: "USR-88291",
    slotId: "slot-005",
    venueId: "venue-sengkang-sc",
    facilityName: "Badminton Court 1",
    date: "2025-05-08",
    startTime: "19:00",
    endTime: "20:00",
    enteredAt: "2025-04-24T20:11:00+08:00",
    resultAt: "2025-04-25T02:00:00+08:00",
    status: "resolved",
    result: "missed",
    bookingId: null,
    creditsHeld: 0,
    alternativesAvailable: [
      { venueId: "venue-jurong-east-sc", slotId: "slot-alt-001", date: "2025-05-08", startTime: "20:00" },
      { venueId: "venue-bishan-sc", slotId: "slot-alt-002", date: "2025-05-09", startTime: "19:00" },
    ],
  },
];

export const mockBookings: Booking[] = [
  {
    id: "BKG-229901",
    userId: "USR-88291",
    type: "facility",
    status: "confirmed",
    facilityName: "Badminton Court 2",
    venueName: "Bishan Sport Centre",
    venueId: "venue-bishan-sc",
    date: "2025-05-10",
    startTime: "20:00",
    endTime: "21:00",
    bookedFor: "self",
    paidBy: "USR-88291",
    amountPaid: 2.00,
    paymentMethod: "activesg_credits",
    bookedAt: "2025-04-27T02:01:34+08:00",
    qrCode: "BKG229901-QR-TOKEN-A8F2K1",
    canCancel: false,
    cancelDeadline: null,
  },
  {
    id: "BKG-201447",
    userId: "USR-88291",
    type: "programme",
    status: "confirmed",
    programmeName: "SwimSafer Level 1",
    programmeId: "prog-swimsafer-l1-je-may",
    venueName: "Jurong East Sport Centre",
    venueId: "venue-jurong-east-sc",
    dates: ["2025-05-03","2025-05-10","2025-05-17","2025-05-24","2025-05-31","2025-06-07","2025-06-14","2025-06-21"],
    startTime: "09:00",
    endTime: "10:00",
    bookedFor: "child",
    participantId: "USR-88292",
    participantName: "Ethan Tan",
    paidBy: "USR-88291",
    amountPaid: 48.00,
    paymentMethod: "paynow",
    bookedAt: "2025-04-20T11:45:00+08:00",
    qrCode: "BKG201447-QR-TOKEN-P9M4X2",
    canCancel: false,
  },
];

export const mockProgrammes: Programme[] = [
  {
    id: "prog-swimsafer-l1-je-may",
    name: "SwimSafer Level 1",
    sport: "swimming",
    category: "learn_to_play",
    ageGroup: { min: 6, max: 12 },
    venueId: "venue-jurong-east-sc",
    venueName: "Jurong East Sport Centre",
    schedule: {
      days: ["saturday", "sunday"],
      startTime: "09:00",
      endTime: "10:00",
      startDate: "2025-05-03",
      endDate: "2025-06-21",
      totalSessions: 8,
    },
    price: { SG_PR: 48.00, nonResident: 72.00, currency: "SGD" },
    creditsApplicable: true,
    creditsOffsetPercentage: 0.30,
    totalSlots: 20,
    filledSlots: 16,
    availableSlots: 4,
    status: "open",
    description: "SwimSafer is Singapore's national water safety programme. Level 1 covers basic water safety, floating, and elementary swimming strokes.",
    requirements: "Non-swimmer or beginner. Participants must be able to enter the water independently.",
    image: "/images/programmes/swimsafer-l1.jpg",
    tags: ["water-safety", "children", "learn-to-swim", "swimsafer"],
  },
  {
    id: "prog-badminton-adults-sksc",
    name: "Badminton Fundamentals (Adults)",
    sport: "badminton",
    category: "fundamentals",
    ageGroup: { min: 18, max: 60 },
    venueId: "venue-sengkang-sc",
    venueName: "Sengkang Sport Centre",
    schedule: {
      days: ["tuesday", "thursday"],
      startTime: "19:30",
      endTime: "21:00",
      startDate: "2025-05-06",
      endDate: "2025-06-12",
      totalSessions: 6,
    },
    price: { SG_PR: 36.00, nonResident: 54.00, currency: "SGD" },
    creditsApplicable: true,
    creditsOffsetPercentage: 0.30,
    totalSlots: 16,
    filledSlots: 16,
    availableSlots: 0,
    status: "full",
    description: "Learn the basics of badminton including grip, footwork, and fundamental strokes. Suitable for beginners with no prior experience.",
    requirements: "No prior badminton experience required. Participants to bring their own racket.",
    image: "/images/programmes/badminton-adults.jpg",
    tags: ["beginners", "adults", "racket-sports"],
  },
  {
    id: "prog-active-health-sengkang",
    name: "Active Health Lab Assessment",
    sport: "fitness",
    category: "active_health",
    ageGroup: { min: 21, max: 99 },
    venueId: "venue-sengkang-sc",
    venueName: "Sengkang Sport Centre",
    schedule: {
      days: ["monday", "wednesday", "friday"],
      startTime: "10:00",
      endTime: "11:00",
      startDate: "2025-05-01",
      endDate: "2025-06-30",
      totalSessions: 1,
      isOneOff: true,
    },
    price: { SG_PR: 0, currency: "SGD" },
    creditsApplicable: true,
    creditsOffsetPercentage: 1.0,
    totalSlots: 8,
    filledSlots: 3,
    availableSlots: 5,
    status: "open",
    description: "A comprehensive fitness assessment including body composition, cardiovascular fitness, flexibility, and muscular endurance. Receive a personalised health report.",
    requirements: "For Singapore Citizens and Permanent Residents only. Bring your NRIC.",
    image: "/images/programmes/active-health.jpg",
    tags: ["health", "assessment", "free", "active-health"],
  },
];

export const mockPasses: Pass[] = [
  {
    id: "pass-gym-8812",
    userId: "USR-88291",
    type: "gym",
    venueId: "venue-sengkang-sc",
    venueName: "Sengkang Sport Centre",
    purchasedAt: "2025-04-28T09:15:00+08:00",
    validFrom: "2025-04-28",
    validUntil: "2025-05-28",
    totalUses: 10,
    usesConsumed: 2,
    usesRemaining: 8,
    qrToken: "PASS8812-QR-TOKEN-G7H3J9",
    dynamicQRRefreshSeconds: 60,
    status: "active",
  },
  {
    id: "pass-pool-5541",
    userId: "USR-88291",
    type: "pool",
    venueId: null,
    venueName: "Any ActiveSG Pool",
    purchasedAt: "2025-04-15T14:00:00+08:00",
    validFrom: "2025-04-15",
    validUntil: "2025-05-15",
    totalUses: 5,
    usesConsumed: 5,
    usesRemaining: 0,
    qrToken: null,
    status: "expired",
  },
];

export const mockHomescreen: Homescreen = {
  user: {
    firstName: "Wei Ling",
    credits: 34.50,
  },
  upcomingBookings: [
    {
      type: "facility",
      id: "BKG-229901",
      summary: "Badminton · Bishan SC",
      date: "2025-05-10",
      time: "8:00–9:00pm",
      status: "confirmed",
    },
  ],
  activeBallots: [
    {
      id: "ballot-7741",
      summary: "Badminton Court 3 · Sengkang",
      date: "2025-05-14",
      time: "7:00–8:00pm",
      resultAt: "2025-05-01T02:00:00+08:00",
      hoursUntilResult: 13.5,
      status: "pending",
    },
  ],
  activePasses: [
    {
      id: "pass-gym-8812",
      type: "gym",
      venueName: "Sengkang SC",
      usesRemaining: 8,
      validUntil: "2025-05-28",
      status: "active",
    },
  ],
  suggestedProgrammes: [
    {
      id: "prog-active-health-sengkang",
      name: "Active Health Assessment",
      availableSlots: 5,
      price: 0,
      tag: "Free",
    },
  ],
  nearbyVenueAvailability: [
    {
      venueId: "venue-sengkang-sc",
      venueName: "Sengkang SC",
      distance: "0.8km",
      gymCapacity: { current: 34, max: 80, percentFull: 43 },
    },
  ],
};

export const mockDb: MockDatabase = {
  user: mockUser,
  venues: mockVenues,
  slots: mockSlots,
  ballots: mockBallots,
  bookings: mockBookings,
  programmes: mockProgrammes,
  passes: mockPasses,
  homescreen: mockHomescreen,
};
```

- [ ] **Step 2: Verify types compile against mock data**

```bash
tmux send-keys -t activesg "npx tsc --noEmit --strict lib/types.ts lib/mockData.ts 2>&1 | head -20" Enter
```

Expected: no output (zero type errors).

- [ ] **Step 3: Commit**

```bash
tmux send-keys -t activesg "git add lib/mockData.ts && git commit -m 'feat: add mock data for all prototype entities'" Enter
```

---

### Task 6: Create utils

**Files:**
- Create: `lib/utils.ts`

- [ ] **Step 1: Create lib/utils.ts**

Write this file at `lib/utils.ts`:

```typescript
// Format a 24h time string "HH:MM" to "H:MMam/pm" (SG convention)
export function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "pm" : "am";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")}${period}`;
}

// Format a time range "HH:MM"-"HH:MM" to "H:MM–H:MMam/pm"
export function formatTimeRange(startTime: string, endTime: string): string {
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  const period = eh >= 12 ? "pm" : "am";
  const startHour = sh % 12 || 12;
  const endHour = eh % 12 || 12;
  return `${startHour}:${String(sm).padStart(2, "0")}–${endHour}:${String(em).padStart(2, "0")}${period}`;
}

// Format ISO date "YYYY-MM-DD" to "Wed, 14 May"
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00+08:00");
  return date.toLocaleDateString("en-SG", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "Asia/Singapore",
  });
}

// Format credits balance as "$34.50"
export function formatCredits(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

// Calculate ballot window progress (0–1)
export function ballotProgress(enteredAt: string, windowClose: string): number {
  const entered = new Date(enteredAt).getTime();
  const close = new Date(windowClose).getTime();
  const now = Date.now();
  if (now >= close) return 1;
  if (now <= entered) return 0;
  return (now - entered) / (close - entered);
}

// Gym capacity colour tier
export function gymCapacityColor(percentFull: number): "success" | "warning" | "error" {
  if (percentFull < 50) return "success";
  if (percentFull <= 80) return "warning";
  return "error";
}

// Hours until an ISO datetime string
export function hoursUntil(isoString: string): number {
  const ms = new Date(isoString).getTime() - Date.now();
  return Math.max(0, ms / (1000 * 60 * 60));
}

// Format hours remaining as "13h 30m" or "2h"
export function formatHoursRemaining(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}
```

- [ ] **Step 2: Verify utils compile**

```bash
tmux send-keys -t activesg "npx tsc --noEmit --strict lib/utils.ts 2>&1 | head -10" Enter
```

Expected: no output.

- [ ] **Step 3: Commit**

```bash
tmux send-keys -t activesg "git add lib/utils.ts && git commit -m 'feat: add date, time, and formatting utilities'" Enter
```

---

### Task 7: Set up app/layout.tsx with DM fonts

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update app/layout.tsx**

Write this file at `app/layout.tsx`:

```typescript
import type { Metadata, Viewport } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ActiveSG+",
  description: "MyActiveSG+ prototype — facility booking, balloting, and programmes",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ActiveSG+",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#E8311A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Update globals.css to use font variables**

Add to `app/globals.css` inside `@layer base`, after the existing body rule:

```css
  body {
    font-family: var(--font-dm-sans), system-ui, sans-serif;
  }

  code, pre, .font-mono {
    font-family: var(--font-dm-mono), monospace;
  }
```

- [ ] **Step 3: Commit**

```bash
tmux send-keys -t activesg "git add app/layout.tsx app/globals.css && git commit -m 'feat: configure DM Sans and DM Mono via next/font'" Enter
```

---

### Task 8: Create stub pages and component directories

**Files:**
- Modify: `app/page.tsx`
- Create: all page stubs listed in the file map
- Create: component directory structure

- [ ] **Step 1: Update root page to redirect to /home**

Write this file at `app/page.tsx`:

```typescript
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/home");
}
```

- [ ] **Step 2: Create page stubs**

Each stub is identical structure — just a placeholder. Create all of these:

`app/home/page.tsx`:
```typescript
export default function HomePage() {
  return <main className="p-4"><p className="text-text-secondary text-body">Home — coming soon</p></main>;
}
```

`app/book/page.tsx`:
```typescript
export default function BookPage() {
  return <main className="p-4"><p className="text-text-secondary text-body">Book Facility — coming soon</p></main>;
}
```

`app/book/[venueId]/page.tsx`:
```typescript
export default function VenueBookingPage({ params }: { params: { venueId: string } }) {
  return <main className="p-4"><p className="text-text-secondary text-body">Venue {params.venueId} slots — coming soon</p></main>;
}
```

`app/ballot/[slotId]/page.tsx`:
```typescript
export default function BallotEntryPage({ params }: { params: { slotId: string } }) {
  return <main className="p-4"><p className="text-text-secondary text-body">Ballot for {params.slotId} — coming soon</p></main>;
}
```

`app/ballot/confirm/page.tsx`:
```typescript
export default function BallotConfirmPage() {
  return <main className="p-4"><p className="text-text-secondary text-body">Ballot confirmed — coming soon</p></main>;
}
```

`app/ballot/result/[id]/page.tsx`:
```typescript
export default function BallotResultPage({ params }: { params: { id: string } }) {
  return <main className="p-4"><p className="text-text-secondary text-body">Ballot result {params.id} — coming soon</p></main>;
}
```

`app/programmes/page.tsx`:
```typescript
export default function ProgrammesPage() {
  return <main className="p-4"><p className="text-text-secondary text-body">Programmes — coming soon</p></main>;
}
```

`app/programmes/[id]/page.tsx`:
```typescript
export default function ProgrammeDetailPage({ params }: { params: { id: string } }) {
  return <main className="p-4"><p className="text-text-secondary text-body">Programme {params.id} — coming soon</p></main>;
}
```

`app/programmes/[id]/enrol/page.tsx`:
```typescript
export default function ProgrammeEnrolPage({ params }: { params: { id: string } }) {
  return <main className="p-4"><p className="text-text-secondary text-body">Enrol in {params.id} — coming soon</p></main>;
}
```

`app/passes/page.tsx`:
```typescript
export default function PassesPage() {
  return <main className="p-4"><p className="text-text-secondary text-body">My Passes — coming soon</p></main>;
}
```

`app/passes/[id]/qr/page.tsx`:
```typescript
export default function QRPassPage({ params }: { params: { id: string } }) {
  return <main className="p-4"><p className="text-text-secondary text-body">QR for {params.id} — coming soon</p></main>;
}
```

`app/ballots/page.tsx`:
```typescript
export default function BallotsPage() {
  return <main className="p-4"><p className="text-text-secondary text-body">My Ballots — coming soon</p></main>;
}
```

- [ ] **Step 3: Create component directory stubs**

Create empty `index.ts` barrel files so the directories exist:

```bash
tmux send-keys -t activesg "mkdir -p components/layout components/home components/booking components/programmes components/passes components/shared && touch components/layout/.gitkeep components/home/.gitkeep components/booking/.gitkeep components/programmes/.gitkeep components/passes/.gitkeep components/shared/.gitkeep" Enter
```

- [ ] **Step 4: Verify dev server builds without errors**

```bash
tmux send-keys -t activesg "npm run build 2>&1 | tail -15" Enter
```

Expected: `Route (app)` table with all routes listed, `✓ Compiled successfully`.

- [ ] **Step 5: Final commit**

```bash
tmux send-keys -t activesg "git add -A && git commit -m 'feat: scaffold all app routes and component directories'" Enter
```

---

## Self-Review

**Spec coverage check:**
- ✅ Next.js 14 App Router structure — Task 1, 8
- ✅ `/lib/mockData.ts` from data context — Task 5
- ✅ `/lib/types.ts` with all TypeScript types — Task 4
- ✅ Tailwind config with design tokens (colors, fonts, spacing) — Task 3
- ✅ `globals.css` with CSS custom properties — Task 3
- ✅ DM Sans + DM Mono fonts — Task 7
- ✅ `qrcode.react`, `phosphor-react`, `motion` installed — Task 2
- ✅ All route stubs created — Task 8
- ✅ Component directories scaffolded — Task 8
- ✅ Utils for date/credits formatting — Task 6
- ✅ Mobile viewport meta (no user-scale) — Task 7

**Placeholder scan:** No TBD/TODO in code steps. All code blocks are complete.

**Type consistency:** `MockDatabase` in types.ts matches field names used as keys in `mockDb` in mockData.ts.
