/**
 * Deterministic "per calendar day" pickers. The same index is returned for a
 * whole day (local date), so the daily quote / challenge / tip stays stable
 * throughout the day and rotates once per day. Different offsets are used so
 * the quote, tip and challenge don't all move in lock-step.
 */
export function dayNumber(date = new Date()): number {
  // Days since epoch in the viewer's local date (ignores time-of-day).
  const local = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor(local.getTime() / 86_400_000);
}

export function pickForDay<T>(list: T[], offset = 0, date = new Date()): T {
  if (list.length === 0) throw new Error("pickForDay: empty list");
  const idx = ((dayNumber(date) + offset) % list.length + list.length) % list.length;
  return list[idx];
}

export type Greeting = { text: string; emoji: string };

export function greetingFor(date = new Date()): Greeting {
  const h = date.getHours();
  if (h < 12) return { text: "Good Morning", emoji: "☀️" };
  if (h < 17) return { text: "Good Afternoon", emoji: "🌤️" };
  return { text: "Good Evening", emoji: "🌙" };
}

export function formatToday(date = new Date()): { day: string; date: string } {
  return {
    day: date.toLocaleDateString("en-US", { weekday: "long" }),
    date: date.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }),
  };
}
