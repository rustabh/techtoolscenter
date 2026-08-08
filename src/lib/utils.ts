import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "INR", locale = "en-IN") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(isFinite(amount) ? amount : 0);
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  // Record the download in the private workspace + stats (client-only, best effort).
  if (typeof window !== "undefined") {
    import("./saved").then((m) => m.recordDownload(filename)).catch(() => {});
    import("./stats/stats").then((m) => m.track("downloads")).catch(() => {});
    import("@/components/ui/toaster").then((m) => m.showToast(`Downloaded ${filename}`)).catch(() => {});
  }
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(2)} MB`;
}

/** The device's local calendar date as YYYY-MM-DD. Unlike `toISOString().slice(0, 10)`
 *  (which is UTC-based), this matches the date shown on the user's own clock — important
 *  for anyone in a positive UTC offset (e.g. IST, UTC+5:30), where the UTC date is still
 *  "yesterday" for the first few hours of each local day. */
export function localDateISO(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** The device's local date and time formatted for an `<input type="datetime-local">`
 *  (YYYY-MM-DDTHH:mm:ss). Unlike `toISOString().slice(0, 19)` (which is UTC-based),
 *  this matches what the user's own clock shows — a datetime-local input's value is
 *  defined to be local time with no timezone offset, so formatting it from UTC is
 *  wrong by the full UTC offset (e.g. 5:30 hours for IST) at every hour of the day. */
export function localDatetimeISO(date: Date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${localDateISO(date)}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
