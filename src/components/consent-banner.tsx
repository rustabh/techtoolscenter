"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

const KEY = "ttc:consent";
const GA_ID = "G-HRX6TPNMWF";

type Choice = "accepted" | "rejected";

function applyChoice(choice: Choice) {
  // If the user declines, stop Google Analytics from sending data.
  if (typeof window !== "undefined") {
    (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = choice === "rejected";
  }
}

/**
 * Privacy-first cookie/analytics consent banner. Non-blocking, theme-aware,
 * remembered in localStorage. Declining disables Google Analytics for the
 * visitor. Essential functionality (which is fully client-side anyway) always
 * works. Shown once until a choice is made.
 */
export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try { stored = localStorage.getItem(KEY); } catch { /* ignore */ }
    if (stored === "accepted" || stored === "rejected") {
      applyChoice(stored);
    } else {
      setVisible(true);
    }
  }, []);

  const choose = (choice: Choice) => {
    try { localStorage.setItem(KEY, choice); } catch { /* ignore */ }
    applyChoice(choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-16 z-[90] p-3 md:bottom-0 sm:p-4"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="glass mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-border p-4 shadow-2xl sm:flex-row sm:items-center sm:gap-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
            <Cookie className="size-5" />
          </span>
          <p className="text-sm text-muted-foreground">
            We use privacy-friendly analytics to understand what&apos;s useful and improve the site. Your files and inputs
            always stay in your browser. See our{" "}
            <Link href="/privacy" className="font-medium text-foreground underline underline-offset-2">privacy policy</Link>.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:ml-auto">
          <button
            onClick={() => choose("rejected")}
            className="flex-1 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary sm:flex-none"
          >
            Decline
          </button>
          <button
            onClick={() => choose("accepted")}
            className="flex-1 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:flex-none"
          >
            Accept
          </button>
          <button
            onClick={() => choose("rejected")}
            aria-label="Dismiss"
            className="hidden rounded-full p-2 text-muted-foreground hover:bg-secondary sm:inline-flex"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
