# ActiveSG+ (MyActiveSG+) Product Audit
**Prepared for: OGP Product Designer Application**
**Audited by: Aceson Aw | May 2026**

---

## 1. Product Overview

**Product:** MyActiveSG+ (activesg.gov.sg)
**Type:** Web-based Progressive Web App (PWA)
**Owner:** Open Government Products (OGP) + Sport Singapore (SportSG), transitioning to MCCY
**Live since:** June 2024
**Users:** 397,748 active users in Q1 2025
**Usage:** 2.96 million hours of exercise tracked through MyActiveSG+ in Q1 2025

### Why it was built
The previous ActiveSG app (native mobile, built by iAPPS Pte Ltd) had a 10-year-old underlying system with systemic abuse: 200+ accounts suspended for bot use, 600+ bookings cancelled for "on-selling" (scalping), and dead members' accounts being misused. OGP was brought in as the contract expired to rebuild the system from scratch.

---

## 2. The Transition: Native App → Web Platform

### Old System (Pre-June 2024)
- Native iOS + Android app (iAPPS Pte Ltd)
- Web booking portal alongside
- MyCash e-wallet (QR code top-up, used for bookings)
- First-come-first-served for all slots including peak hours
- Email/password login (allowed multiple accounts, bots)
- 2.5 million account holders (inflated by multi-accounts)

### New System (MyActiveSG+, June 2024 →)
- Web-based only (no native app download required)
- Singpass-gated login (prevents multiple accounts)
- Balloting system for peak-hour slots (6–10pm weekdays, 7am–10pm weekends/PH)
- ActiveSG Credits wallet (no top-up e-wallet; credit/debit/PayNow only)
- Family accounts: parents can link children via Singpass
- QR code entry for gym/pool passes
- Physical gantries being rolled out across all sport centres (Q3 2025 – Q4 2025)

### Transition Timeline
| Date | Event |
|------|--------|
| Mar 2024 | Beta launched with 2,000 trial users |
| Jun 15, 2024 | MyActiveSG+ launched publicly |
| Jun 15–30, 2024 | ActiveSG credits migration (2-week payment freeze) |
| Jul 1, 2024 | Old app bookings disabled |
| Aug 14, 2024 | MyCash (e-wallet) decommissioned |
| Aug 15, 2024 | Pass compatibility broken (old passes invalid) |
| Oct 1, 2024 | Old ActiveSG app fully discontinued |

---

## 3. Public Feedback & Pain Points

### Critical launch issues (Aug–Oct 2024)
1. **E-wallet removal (MyCash):** Users who relied on the QR-based MyCash wallet for quick payments found the new system requires credit/debit card entry each time — described as "troublesome" by multiple users (CNA, Aug 2024).
2. **Pass incompatibility:** From Aug 15, passes bought on the old platform became invalid. Users arriving at sports centres (e.g. Sengkang Sports Centre) were turned away. ActiveSG staff were physically stationed at entrances to assist — a visible sign of UX failure at the physical-digital seam.
3. **Credit migration blackout:** A 2-week freeze on ActiveSG Credits during migration meant users couldn't use any stored credits. Only a $10 anniversary credit offset was provided.
4. **Children's account linking:** Parents were confused about how to link children to accounts. The new Singpass-gated flow was not intuitive for this multi-user household scenario.
5. **Singpass friction:** Dependency on Singpass app launch, Face ID, and OTP flows created new authentication friction — particularly for older users and those without Singpass set up on their device.

### Parliamentary scrutiny
MP Faisal Manap raised the transition issues in Parliament (Mar 2025), specifically calling out: credit transfer problems, children's account access issues, and payment friction — indicating the problems were significant enough for formal government inquiry.

### What users praised
- Balloting system seen as fairer than FCFS: "Quite appreciate balloting. Equal opportunity for everyone."
- Before balloting: "Almost impossible to get peak hour... but with this new system at least we have a chance."
- 30% of beta bookings were by users who hadn't booked in the past 12 months — balloting democratised access.

---

## 4. Feature Inventory (Current State, Q4 2025)

### Core User Flows
| Feature | Status | Notes |
|---------|--------|-------|
| Facility booking | ✅ Live | Off-peak direct, peak via ballot |
| Peak-hour balloting | ✅ Live | D-14, 24hr window |
| Programme booking | ✅ Live | Includes filter for full programmes |
| Gym/pool passes | ✅ Live | QR code + gantry entry |
| QR scan entry | ✅ Live (phased rollout) | Turnstile pilot complete |
| Family/children accounts | ✅ Live | Singpass-linked |
| ActiveSG Credits wallet | ✅ Live | No top-up, received via promos/SG60 |
| Credit/debit card payment | ✅ Live | 3DS enabled (Q4 2024) |
| PayNow | ✅ Live | |
| Favourite venues | ✅ Live | Added Q4 2024 |
| Refunds & cancellations | ✅ Live | Improved Q4 2025; role-based |
| Finance self-serve reports | ✅ Live (admin) | Daily reports downloadable |
| Dark mode QR visibility | ✅ Fixed | Q1 2025 patch |
| Singpass ID+password login | ✅ Live | Added Apr 2025 (no app needed) |
| Email notifications | ✅ Live | Shifted from SMS to reduce costs |
| SMS non-essential notifications | ❌ Removed | From Aug 31, 2025 (cost cut) |
| MyCash e-wallet | ❌ Removed | Aug 2024 |
| Native mobile app | ❌ Removed | Oct 2024 |
| One-touch/remembered bookings | ❌ Not present | Was in old app; missing in new |

### Admin Portal
- Role-based access control (OpenFGA)
- Calendar view for facility bookings
- Capacity tracking (gym)
- Receipt viewing
- Admin-triggered closures (single-step)
- Find available slots feature
- Punggol SAFRA API integration (Q4 2025)

---

## 5. Technical Architecture Signals

From public update logs:
- **Stack signals:** Mentions of Stripe (payments + 3DS), OneMap API, Singpass/sgID, OpenFGA (access control), transactional outbox pattern (refunds resilience), BullMQ/Bullboard (job queues), end-to-end testing
- **Performance improvements:** Payment confirmation time reduced from 5s+ to ~2s (Stripe metadata deferral)
- **SMS cost reduction:** 90% cost cut by moving non-essential messages to email (Q3 2025)
- **Load testing:** Done pre-SG60 credit top-up surge (Q2 2025); waiting room + maintenance page implemented
- **SEO improvements:** Added OGP branding + increased indexable pages (Q4 2025)

---

## 6. Facility Network (from data.gov.sg)

**Dataset:** SportSG Sport Facilities (GEOJSON) — 40+ venues across Singapore
Notable facilities include:
- ActiveSG Sport Centres (Sengkang, Jurong East, Clementi, Hougang, Tampines, Bishan, etc.)
- Swimming complexes (Kallang, Geylang East, Jurong Lake Gardens, etc.)
- Gyms (including community centre locations)
- Specialised: Burghley Squash & Tennis, sport parks, stadiums

All venues link to activesgcircle.gov.sg/facilities — suggesting a split between booking platform (activesg.gov.sg) and content/discovery layer (activesgcircle.gov.sg).

---

## 7. UX Audit: Current Pain Points & Opportunities

### A. Onboarding & Authentication
**Issue:** Singpass dependency creates a multi-app authentication flow. Users must switch between browser → Singpass app → browser. Friction compounds for new users unfamiliar with Singpass.
**Evidence:** FAQ page has extensive troubleshooting section for Singpass issues; multiple failure modes documented (OTP, Face ID, sgID, QR launch).
**Opportunity:** Progressive onboarding — allow limited browsing/discovery without Singpass, gate only at booking. Apr 2025 fix (Singpass ID + password) partially addresses this.

### B. Payment Experience
**Issue:** Removal of MyCash creates a "pay each time" friction. No quick-pay or saved payment methods visible in public UX.
**Evidence:** CNA coverage, parliamentary questions.
**Opportunity:** Integrate PayNow as default fast-pay; consider stored payment methods; re-examine if a credit wallet top-up model could return without the old abuse vectors.

### C. Balloting UX Clarity
**Issue:** Balloting logic (D-14, 24-hour window, results timing) is non-trivial. Users unfamiliar with the system may not know when to check or what to do after an unsuccessful ballot.
**Evidence:** FAQ category exists specifically for "Booking and balloting."
**Opportunity:** Proactive state communication — "Your ballot result arrives on [date]." Push notifications / email nudges. Better empty states.

### D. Physical-Digital Seam (QR + Gantries)
**Issue:** The pass QR experience has required multiple iterations (dark mode fix, auto-scroll, dynamic QR codes). Physical gantries are still rolling out (phased, not complete as of Q4 2025).
**Evidence:** Multiple quarters of QR-related fixes in changelog.
**Opportunity:** A smooth entry experience that works reliably across screen sizes, brightness, and device types — including for seniors. Consider add-to-wallet (Apple Wallet/Google Wallet) for the pass QR.

### E. Family/Children Account Management
**Issue:** Multi-user household scenario is complex — linking children, booking on behalf of them, using the child's credits. Required multiple quarters of fixes.
**Evidence:** OGP update logs Q1 2024, Q4 2024, Q1 2025. MP parliamentary question.
**Opportunity:** A dedicated "Family" view in the app. Clear parent/guardian context-switching. Simplified "book for child" primary action.

### F. Programme Discovery
**Issue:** Sports programme discovery relies on search — "search for SHP60" type instructions suggest discoverability is weak. Adding filters for full programmes was a relatively recent addition (Q2 2025).
**Evidence:** Update logs; FAQ instructions suggesting search term usage.
**Opportunity:** Interest-based programme recommendations; browse by sport, age group, or proximity. Reduce reliance on exact search strings.

### G. No Native App / PWA Gap
**Issue:** MyActiveSG+ is web-based but not a full PWA (no clear add-to-homescreen prompt, no push notifications as of last audit). Users lose the immediacy and notification layer of a native app.
**Evidence:** SMS notifications being cut; no mention of push notifications in update logs.
**Opportunity:** PWA upgrade — service worker, push notifications, offline QR pass caching. This would recover the native app UX without the maintenance burden.

---

## 8. Competitive Benchmarks

| Feature | MyActiveSG+ | Typical sports booking apps |
|---------|-------------|---------------------------|
| Identity verification | Singpass (strong, civic) | Email/social |
| Fairness mechanism | Balloting | FCFS |
| Family accounts | Yes | Rare |
| QR pass entry | Yes (gantries rolling) | Varies |
| E-wallet | No (credits only) | Often yes |
| Native app | No | Usually yes |
| Push notifications | No | Usually yes |
| Programme discovery | Weak (search-first) | Varies |
| Saved favourites | Yes | Common |

---

## 9. Strategic Context

- **Mission transition:** OGP team is moving under MCCY — product decisions will increasingly navigate ministry politics alongside technical priorities
- **Scale:** 2.5M account holders, 397K active (Q1 2025) — significant public infrastructure
- **SG60 signal:** The platform was load-tested and scaled for SG60 credit top-up campaign (Q2 2025) — government promotion events are a key usage spike driver
- **Healthy365 integration:** Programmes API delivered for Healthy365 (HPB) integration — signals platform is becoming a government fitness infrastructure layer, not just a booking tool
- **SAFRA integration (Q4 2025):** First external org integration — hints at future B2G/B2B expansion
- **Gantries rollout:** Physical infrastructure investment aligns with long-term platform lock-in — turnstiles create a hardware-software dependency that makes the platform sticky

---

## 10. Summary: Design Opportunity Map

| Priority | Area | Nature |
|----------|------|--------|
| 🔴 High | PWA upgrade + push notifications | Recover native app UX |
| 🔴 High | Payment friction (no e-wallet) | Reduce per-transaction effort |
| 🔴 High | Balloting UX + state communication | Reduce confusion, dropout |
| 🟡 Medium | Family/children account UX | Simplify multi-user flows |
| 🟡 Medium | Programme discovery | Move beyond search-first |
| 🟡 Medium | Onboarding + Singpass friction | Lower first-time barrier |
| 🟢 Lower | Apple/Google Wallet pass integration | Convenience layer |
| 🟢 Lower | Venue map + facility discovery | Pre-booking exploration |

---

*Sources: OGP Report Card (reports.open.gov.sg/activesg), SportSG press releases, CNA coverage (Aug 2024), Mothership (May 2024), Parliament records (Mar 2025), data.gov.sg SportSG facilities dataset, activesgcircle.gov.sg FAQ.*
