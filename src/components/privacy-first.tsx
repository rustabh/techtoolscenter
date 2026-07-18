import { ShieldCheck, Rocket, XCircle, Zap, Globe, Ban } from "lucide-react";

/**
 * Reusable Privacy-First strip. Drop it on any page to consistently communicate
 * TechToolsCenter's core promises. `variant="compact"` renders an inline row.
 */
const POINTS = [
  { icon: ShieldCheck, emoji: "🔒", text: "Files stay in your browser whenever possible." },
  { icon: Rocket, emoji: "🚀", text: "We never sell your data." },
  { icon: XCircle, emoji: "❌", text: "No sign-up required." },
  { icon: Ban, emoji: "❌", text: "No watermarks." },
  { icon: XCircle, emoji: "❌", text: "No hidden charges." },
  { icon: Zap, emoji: "⚡", text: "Fast processing." },
  { icon: Globe, emoji: "🌍", text: "Works everywhere." },
];

export function PrivacyFirst({ variant = "grid", className = "" }: { variant?: "grid" | "compact"; className?: string }) {
  if (variant === "compact") {
    return (
      <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground ${className}`}>
        {POINTS.slice(0, 5).map((p) => (
          <span key={p.text} className="inline-flex items-center gap-1.5"><span aria-hidden>{p.emoji}</span> {p.text}</span>
        ))}
      </div>
    );
  }
  return (
    <div className={`rounded-2xl border border-border bg-card p-6 ${className}`}>
      <p className="mb-4 flex items-center gap-2 font-semibold"><ShieldCheck className="size-5 text-primary" /> Privacy first, always</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {POINTS.map((p) => (
          <div key={p.text} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span aria-hidden className="mt-0.5">{p.emoji}</span>
            <span>{p.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
