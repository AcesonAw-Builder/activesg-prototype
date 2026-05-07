// Format "HH:MM" to "H:MMam/pm" (SG 12h convention)
export function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "pm" : "am";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")}${period}`;
}

// Format "HH:MM"–"HH:MM" to "H:MM–H:MMam/pm"
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

// Ballot window progress as 0–1
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

// Hours until an ISO datetime string (floor to 0)
export function hoursUntil(isoString: string): number {
  const ms = new Date(isoString).getTime() - Date.now();
  return Math.max(0, ms / (1000 * 60 * 60));
}

// "13h 30m" or "2h"
export function formatHoursRemaining(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}
