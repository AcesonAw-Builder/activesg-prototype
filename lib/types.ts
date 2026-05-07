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
export type FacilityType =
  | "badminton"
  | "basketball"
  | "squash"
  | "gym"
  | "pool"
  | "swimming"
  | "tennis"
  | "tabletennis"
  | "fitness";
export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";
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
  sport: FacilityType;
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
