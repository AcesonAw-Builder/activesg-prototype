# Data Context Document
## ActiveSG+ — Schema & Mock Data
**For: OGP Product Designer Application**
**Author: Aceson Aw**

---

## Overview

This document defines the data structures powering the prototype. Use this JSON directly in your Claude Code prototype — feed it as the mock data layer so components render realistically without requiring a live API.

The schema mirrors what the real MyActiveSG+ likely uses, inferred from the public update logs, FAQ documentation, and API endpoint patterns.

---

## Core Entities

### 1. User
```json
{
  "user": {
    "id": "USR-88291",
    "name": "Wei Ling Tan",
    "singpassLinked": true,
    "membershipType": "SG_PR",
    "credits": {
      "balance": 34.50,
      "currency": "SGD",
      "expiryDate": "2025-12-31"
    },
    "children": [
      {
        "id": "USR-88292",
        "name": "Ethan Tan",
        "age": 8,
        "relationship": "child"
      }
    ],
    "favouriteVenues": ["venue-sengkang-sc", "venue-jurong-east-sc"],
    "notificationPreferences": {
      "ballotResults": "email",
      "bookingConfirmations": "email",
      "programmeReminders": "email"
    }
  }
}
```

---

### 2. Venue
```json
{
  "venues": [
    {
      "id": "venue-sengkang-sc",
      "name": "Sengkang Sport Centre",
      "shortName": "Sengkang SC",
      "address": "57 Anchorvale Road, Singapore 544965",
      "coordinates": { "lat": 1.3915, "lng": 103.8953 },
      "facilities": ["badminton", "basketball", "squash", "gym", "pool"],
      "hasGantry": true,
      "operatingHours": { "open": "07:00", "close": "22:00" },
      "gymCapacity": { "current": 34, "max": 80 },
      "image": "/images/venues/sengkang-sc.jpg"
    },
    {
      "id": "venue-jurong-east-sc",
      "name": "Jurong East Sport Centre",
      "shortName": "Jurong East SC",
      "address": "21 Jurong East Street 31, Singapore 609517",
      "coordinates": { "lat": 1.3372, "lng": 103.7262 },
      "facilities": ["badminton", "swimming", "gym", "tabletennis"],
      "hasGantry": true,
      "operatingHours": { "open": "07:00", "close": "22:00" },
      "gymCapacity": { "current": 12, "max": 60 },
      "image": "/images/venues/jurong-east-sc.jpg"
    },
    {
      "id": "venue-bishan-sc",
      "name": "Bishan Sport Centre",
      "shortName": "Bishan SC",
      "address": "5 Bishan Street 14, Singapore 579783",
      "coordinates": { "lat": 1.3520, "lng": 103.8481 },
      "facilities": ["badminton", "swimming", "gym", "tennis"],
      "hasGantry": false,
      "operatingHours": { "open": "07:00", "close": "22:00" },
      "gymCapacity": { "current": 28, "max": 70 },
      "image": "/images/venues/bishan-sc.jpg"
    }
  ]
}
```

---

### 3. Facility Slot
```json
{
  "slots": [
    {
      "id": "slot-001",
      "venueId": "venue-sengkang-sc",
      "facilityType": "badminton",
      "facilityName": "Badminton Court 3",
      "date": "2025-05-14",
      "startTime": "19:00",
      "endTime": "20:00",
      "isPeakHour": true,
      "bookingType": "ballot",
      "ballotWindowClose": "2025-04-30T23:59:00+08:00",
      "ballotResultTime": "2025-05-01T02:00:00+08:00",
      "price": {
        "SG_PR": 2.00,
        "nonResident": 3.50,
        "currency": "SGD"
      },
      "status": "ballot_open",
      "currentBallotEntries": 42
    },
    {
      "id": "slot-002",
      "venueId": "venue-sengkang-sc",
      "facilityType": "badminton",
      "facilityName": "Badminton Court 3",
      "date": "2025-05-14",
      "startTime": "10:00",
      "endTime": "11:00",
      "isPeakHour": false,
      "bookingType": "direct",
      "price": {
        "SG_PR": 2.00,
        "nonResident": 3.50,
        "currency": "SGD"
      },
      "status": "available",
      "currentBallotEntries": null
    },
    {
      "id": "slot-003",
      "venueId": "venue-jurong-east-sc",
      "facilityType": "badminton",
      "facilityName": "Badminton Court 1",
      "date": "2025-05-14",
      "startTime": "20:00",
      "endTime": "21:00",
      "isPeakHour": true,
      "bookingType": "ballot",
      "ballotWindowClose": "2025-04-30T23:59:00+08:00",
      "ballotResultTime": "2025-05-01T02:00:00+08:00",
      "price": {
        "SG_PR": 2.00,
        "nonResident": 3.50,
        "currency": "SGD"
      },
      "status": "ballot_open",
      "currentBallotEntries": 18
    }
  ]
}
```

---

### 4. Ballot Entry
```json
{
  "ballots": [
    {
      "id": "ballot-7741",
      "userId": "USR-88291",
      "slotId": "slot-001",
      "venueId": "venue-sengkang-sc",
      "facilityName": "Badminton Court 3",
      "date": "2025-05-14",
      "startTime": "19:00",
      "endTime": "20:00",
      "enteredAt": "2025-04-29T14:32:00+08:00",
      "resultAt": "2025-05-01T02:00:00+08:00",
      "status": "pending",
      "result": null,
      "creditsHeld": 2.00
    },
    {
      "id": "ballot-6630",
      "userId": "USR-88291",
      "slotId": "slot-004",
      "venueId": "venue-bishan-sc",
      "facilityName": "Badminton Court 2",
      "date": "2025-05-10",
      "startTime": "20:00",
      "endTime": "21:00",
      "enteredAt": "2025-04-26T09:15:00+08:00",
      "resultAt": "2025-04-27T02:00:00+08:00",
      "status": "resolved",
      "result": "won",
      "bookingId": "BKG-229901",
      "creditsHeld": 0
    },
    {
      "id": "ballot-6529",
      "userId": "USR-88291",
      "slotId": "slot-005",
      "venueId": "venue-sengkang-sc",
      "facilityName": "Badminton Court 1",
      "date": "2025-05-08",
      "startTime": "19:00",
      "endTime": "20:00",
      "enteredAt": "2025-04-24T20:11:00+08:00",
      "resultAt": "2025-04-25T02:00:00+08:00",
      "status": "resolved",
      "result": "missed",
      "bookingId": null,
      "creditsHeld": 0,
      "alternativesAvailable": [
        { "venueId": "venue-jurong-east-sc", "slotId": "slot-006", "date": "2025-05-08", "startTime": "20:00" },
        { "venueId": "venue-bishan-sc", "slotId": "slot-007", "date": "2025-05-09", "startTime": "19:00" }
      ]
    }
  ]
}
```

---

### 5. Booking
```json
{
  "bookings": [
    {
      "id": "BKG-229901",
      "userId": "USR-88291",
      "type": "facility",
      "status": "confirmed",
      "facilityName": "Badminton Court 2",
      "venueName": "Bishan Sport Centre",
      "venueId": "venue-bishan-sc",
      "date": "2025-05-10",
      "startTime": "20:00",
      "endTime": "21:00",
      "bookedFor": "self",
      "paidBy": "USR-88291",
      "amountPaid": 2.00,
      "paymentMethod": "activesg_credits",
      "bookedAt": "2025-04-27T02:01:34+08:00",
      "qrCode": "BKG229901-QR-TOKEN-A8F2K1",
      "canCancel": false,
      "cancelDeadline": null
    },
    {
      "id": "BKG-201447",
      "userId": "USR-88291",
      "type": "programme",
      "status": "confirmed",
      "programmeName": "SwimSafer Level 1",
      "programmeId": "prog-swimsafer-l1-je-may",
      "venueName": "Jurong East Sport Centre",
      "venueId": "venue-jurong-east-sc",
      "dates": ["2025-05-03", "2025-05-10", "2025-05-17", "2025-05-24", "2025-05-31", "2025-06-07", "2025-06-14", "2025-06-21"],
      "startTime": "09:00",
      "endTime": "10:00",
      "bookedFor": "child",
      "participantId": "USR-88292",
      "participantName": "Ethan Tan",
      "paidBy": "USR-88291",
      "amountPaid": 48.00,
      "paymentMethod": "paynow",
      "bookedAt": "2025-04-20T11:45:00+08:00",
      "qrCode": "BKG201447-QR-TOKEN-P9M4X2",
      "canCancel": false
    }
  ]
}
```

---

### 6. Programme
```json
{
  "programmes": [
    {
      "id": "prog-swimsafer-l1-je-may",
      "name": "SwimSafer Level 1",
      "sport": "swimming",
      "category": "learn_to_play",
      "ageGroup": { "min": 6, "max": 12 },
      "venueId": "venue-jurong-east-sc",
      "venueName": "Jurong East Sport Centre",
      "schedule": {
        "days": ["saturday", "sunday"],
        "startTime": "09:00",
        "endTime": "10:00",
        "startDate": "2025-05-03",
        "endDate": "2025-06-21",
        "totalSessions": 8
      },
      "price": {
        "SG_PR": 48.00,
        "nonResident": 72.00,
        "currency": "SGD"
      },
      "creditsApplicable": true,
      "creditsOffsetPercentage": 0.30,
      "totalSlots": 20,
      "filledSlots": 16,
      "availableSlots": 4,
      "status": "open",
      "description": "SwimSafer is Singapore's national water safety programme. Level 1 covers basic water safety, floating, and elementary swimming strokes.",
      "requirements": "Non-swimmer or beginner. Participants must be able to enter the water independently.",
      "image": "/images/programmes/swimsafer-l1.jpg",
      "tags": ["water-safety", "children", "learn-to-swim", "swimsafer"]
    },
    {
      "id": "prog-badminton-adults-sksc",
      "name": "Badminton Fundamentals (Adults)",
      "sport": "badminton",
      "category": "fundamentals",
      "ageGroup": { "min": 18, "max": 60 },
      "venueId": "venue-sengkang-sc",
      "venueName": "Sengkang Sport Centre",
      "schedule": {
        "days": ["tuesday", "thursday"],
        "startTime": "19:30",
        "endTime": "21:00",
        "startDate": "2025-05-06",
        "endDate": "2025-06-12",
        "totalSessions": 6
      },
      "price": {
        "SG_PR": 36.00,
        "nonResident": 54.00,
        "currency": "SGD"
      },
      "creditsApplicable": true,
      "creditsOffsetPercentage": 0.30,
      "totalSlots": 16,
      "filledSlots": 16,
      "availableSlots": 0,
      "status": "full",
      "description": "Learn the basics of badminton including grip, footwork, and fundamental strokes. Suitable for beginners with no prior experience.",
      "requirements": "No prior badminton experience required. Participants to bring their own racket.",
      "image": "/images/programmes/badminton-adults.jpg",
      "tags": ["beginners", "adults", "racket-sports"]
    },
    {
      "id": "prog-active-health-sengkang",
      "name": "Active Health Lab Assessment",
      "sport": "fitness",
      "category": "active_health",
      "ageGroup": { "min": 21, "max": 99 },
      "venueId": "venue-sengkang-sc",
      "venueName": "Sengkang Sport Centre",
      "schedule": {
        "days": ["monday", "wednesday", "friday"],
        "startTime": "10:00",
        "endTime": "11:00",
        "startDate": "2025-05-01",
        "endDate": "2025-06-30",
        "totalSessions": 1,
        "isOneOff": true
      },
      "price": {
        "SG_PR": 0,
        "currency": "SGD"
      },
      "creditsApplicable": true,
      "creditsOffsetPercentage": 1.0,
      "totalSlots": 8,
      "filledSlots": 3,
      "availableSlots": 5,
      "status": "open",
      "description": "A comprehensive fitness assessment including body composition, cardiovascular fitness, flexibility, and muscular endurance. Receive a personalised health report.",
      "requirements": "For Singapore Citizens and Permanent Residents only. Bring your NRIC.",
      "image": "/images/programmes/active-health.jpg",
      "tags": ["health", "assessment", "free", "active-health"]
    }
  ]
}
```

---

### 7. Pass
```json
{
  "passes": [
    {
      "id": "pass-gym-8812",
      "userId": "USR-88291",
      "type": "gym",
      "venueId": "venue-sengkang-sc",
      "venueName": "Sengkang Sport Centre",
      "purchasedAt": "2025-04-28T09:15:00+08:00",
      "validFrom": "2025-04-28",
      "validUntil": "2025-05-28",
      "totalUses": 10,
      "usesConsumed": 2,
      "usesRemaining": 8,
      "qrToken": "PASS8812-QR-TOKEN-G7H3J9",
      "dynamicQRRefreshSeconds": 60,
      "status": "active"
    },
    {
      "id": "pass-pool-5541",
      "userId": "USR-88291",
      "type": "pool",
      "venueId": null,
      "venueName": "Any ActiveSG Pool",
      "purchasedAt": "2025-04-15T14:00:00+08:00",
      "validFrom": "2025-04-15",
      "validUntil": "2025-05-15",
      "totalUses": 5,
      "usesConsumed": 5,
      "usesRemaining": 0,
      "qrToken": null,
      "status": "expired"
    }
  ]
}
```

---

## Homepage Aggregated View

The homepage pulls from multiple entities. Use this pre-aggregated structure for the home screen component:

```json
{
  "homescreen": {
    "user": {
      "firstName": "Wei Ling",
      "credits": 34.50
    },
    "upcomingBookings": [
      {
        "type": "facility",
        "id": "BKG-229901",
        "summary": "Badminton · Bishan SC",
        "date": "2025-05-10",
        "time": "8:00–9:00pm",
        "status": "confirmed"
      }
    ],
    "activeBallots": [
      {
        "id": "ballot-7741",
        "summary": "Badminton Court 3 · Sengkang",
        "date": "2025-05-14",
        "time": "7:00–8:00pm",
        "resultAt": "2025-05-01T02:00:00+08:00",
        "hoursUntilResult": 13.5,
        "status": "pending"
      }
    ],
    "activePasses": [
      {
        "id": "pass-gym-8812",
        "type": "gym",
        "venueName": "Sengkang SC",
        "usesRemaining": 8,
        "validUntil": "2025-05-28",
        "status": "active"
      }
    ],
    "suggestedProgrammes": [
      {
        "id": "prog-active-health-sengkang",
        "name": "Active Health Assessment",
        "availableSlots": 5,
        "price": 0,
        "tag": "Free"
      }
    ],
    "nearbyVenueAvailability": [
      {
        "venueId": "venue-sengkang-sc",
        "venueName": "Sengkang SC",
        "distance": "0.8km",
        "gymCapacity": { "current": 34, "max": 80, "percentFull": 43 }
      }
    ]
  }
}
```

---

## Ballot Result Notification Payload

Used to construct the result email and in-app notification:

```json
{
  "notification": {
    "type": "ballot_result",
    "userId": "USR-88291",
    "ballotId": "ballot-7741",
    "result": "missed",
    "facilityName": "Badminton Court 3",
    "venueName": "Sengkang Sport Centre",
    "date": "2025-05-14",
    "time": "7:00–8:00pm",
    "alternatives": [
      {
        "slotId": "slot-alt-001",
        "venueId": "venue-jurong-east-sc",
        "venueName": "Jurong East SC",
        "facilityName": "Badminton Court 1",
        "date": "2025-05-14",
        "time": "8:00–9:00pm",
        "type": "ballot",
        "ballotWindowClose": "2025-05-01T23:59:00+08:00"
      },
      {
        "slotId": "slot-alt-002",
        "venueId": "venue-bishan-sc",
        "venueName": "Bishan SC",
        "facilityName": "Badminton Court 2",
        "date": "2025-05-15",
        "time": "7:00–8:00pm",
        "type": "direct",
        "bookingWindowOpen": true
      }
    ],
    "nextBallotWindowFor": {
      "slotId": "slot-next-ballot",
      "date": "2025-05-21",
      "ballotOpensAt": "2025-05-07T00:00:00+08:00"
    }
  }
}
```

---

## Implementation Notes for Claude Code

1. **Use this data as a local `mockData.ts` module** — import and use across components
2. **Dates:** All times in SGT (UTC+8), ISO 8601 format — format for display using `toLocaleString('en-SG')`
3. **Credits:** Store as numbers (cents-safe, e.g. `34.50`), display with `$` prefix
4. **QR tokens:** These are mock strings — in the prototype, render a QR code using `qrcode.react` or a QR SVG library using the token as the payload
5. **Ballot window progress:** Calculate `(now - enteredAt) / (ballotWindowClose - enteredAt)` for the progress bar
6. **Gym capacity colour:** `< 50%` = green, `50–80%` = amber, `> 80%` = red
