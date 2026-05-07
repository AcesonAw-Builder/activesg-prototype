# Functional Context Document
## ActiveSG+ — Balloting & Programme Discovery Redesign Prototype
**For: OGP Product Designer Application**
**Author: Aceson Aw**

---

## What the prototype does

This prototype reimagines two high-friction user journeys in MyActiveSG+:

1. **Peak-hour facility balloting** — from entering the ballot to understanding your result and rebooking if unsuccessful
2. **Programme discovery** — browsing and joining sports programmes without relying on exact search strings

The prototype focuses on the mobile web experience, as ~80% of users are expected to access the platform from mobile browsers.

---

## Core Use Cases

### UC-1: Ballot for a Badminton Court (Peak Hour)
**Actor:** Regular user, 28–45, books badminton weekly
**Entry point:** Home screen → "Book Facility" → Select sport → Select venue → Select peak-hour slot

**Happy path:**
1. User opens MyActiveSG+ on mobile browser
2. Navigates to facility booking → selects Badminton → selects venue
3. Sees peak-hour slots marked with "Ballot" badge (off-peak slots show direct booking)
4. Selects preferred slot → reviews ballot details (D-14 window, result date, fallback slots)
5. Confirms ballot entry
6. Receives confirmation screen with: slot summary, result announcement time, calendar export option
7. At result time: receives email notification → result shown in "My Ballots" dashboard

**Unhappy path (ballot lost):**
1. Notification: "Ballot result — you were not selected for [venue] on [date]"
2. User lands on result screen showing: what they missed, alternative venues with availability, next ballot window
3. One-tap re-ballot or direct book off-peak option

**Edge cases to prototype:**
- User already has an active ballot for the same slot (prevent duplicate entry)
- User's credits are insufficient (credit check before confirm)
- Slot cancelled by admin after ballot (trigger refund flow)

---

### UC-2: Discover and Join a Programme
**Actor:** Parent looking for swimming lessons for child, age 8
**Entry point:** Home screen → "Programmes" → Browse

**Happy path:**
1. User sees curated programme cards (filtered by: age group, sport type, location, vacancy)
2. Selects "SwimSafer" programme → views schedule, venue, coach profile, fees
3. Reviews family account — selects child as participant
4. Confirms booking → pays via PayNow or ActiveSG Credits
5. Receives confirmation with QR code for first session

**Edge cases:**
- Programme fully booked → show waitlist option
- Child not yet linked → inline prompt to add child account
- Overlapping booking → conflict detection alert

---

### UC-3: Gym/Pool Pass — Scan to Enter
**Actor:** Daily gym user
**Entry point:** Home → "My Passes" → QR code display

**Requirements:**
- QR code must be visible within 2 taps from home
- Must work in dark mode / bright sunlight
- Show remaining uses + expiry
- Auto-brightness boost when QR is displayed

---

## Feature States (All Screens Must Handle)

Every screen in the prototype must have defined behaviour for:

| State | Description |
|-------|-------------|
| **Empty** | No bookings, no ballots, no passes yet |
| **Loading** | Data fetching in progress |
| **Success** | Action confirmed |
| **Error** | Payment failed, Singpass timeout, slot taken |
| **Partial** | Credits insufficient, needs top-up |
| **Offline** | No internet — QR pass must still display (cached) |

---

## User Permissions Model

| Role | Can do |
|------|--------|
| Adult member (SG/PR) | Book, ballot, buy passes, book for linked children |
| Adult member (non-SG) | Book (different pricing), limited credits access |
| Child account (under 15) | View only — parent books on their behalf |
| Corporate member | Bulk booking, group management |

---

## Navigation Structure

```
Home
├── Book Facility
│   ├── Browse by Sport
│   ├── Browse by Venue
│   └── My Bookings
│       ├── Upcoming
│       ├── Past
│       └── Cancelled
├── Programmes
│   ├── Browse (filter: sport, age, venue, availability)
│   ├── My Programmes
│   └── Waitlisted
├── Passes
│   ├── Active Passes (QR display)
│   └── Purchase
├── Ballots
│   ├── Active Ballots
│   └── Past Results
├── Wallet
│   ├── Credits Balance
│   └── Transaction History
└── Account
    ├── Profile
    ├── Family (children accounts)
    ├── Notifications
    └── Settings
```

---

## Key Interactions to Prototype

1. **Ballot entry flow** — slot selection → review → confirm → success state
2. **Ballot result notification** — email/push → result screen → next action options
3. **Programme browse** — filter chips → card grid → programme detail → enroll
4. **QR pass display** — home shortcut → full-screen QR → auto-brightness → scan success
5. **Family booking** — "Book for" switcher in checkout flow
6. **Empty state — no ballots** — first-time user guidance, not a blank screen

---

## Out of Scope for This Prototype

- Admin portal flows
- Corporate bulk booking
- Payment method management (credit card vault)
- Singpass authentication screens (assume logged-in state)
- Backend/API integrations

---

## Success Criteria

The prototype should demonstrate:
- A user can complete a ballot entry in under 60 seconds
- A user who loses a ballot can discover alternatives without leaving the result screen
- A parent can book a programme for their child in under 3 steps from the programme detail
- A gym user can display their QR pass within 2 taps of opening the platform
