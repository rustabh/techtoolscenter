import Link from "next/link";
import { ShieldCheck, CalendarClock, ExternalLink } from "lucide-react";

function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/**
 * E-E-A-T trust strip for India Services / schemes — shows freshness
 * (last updated), the official source we verified against, and an honest
 * "educational, not a government site" line. Improves user trust and the
 * signals Google looks for on YMYL (government/finance) content.
 */
export function TrustStrip({
  updatedOn,
  sourceName,
  sourceUrl,
  className = "",
}: {
  updatedOn?: string;
  sourceName?: string;
  sourceUrl?: string;
  className?: string;
}) {
  const date = formatDate(updatedOn);
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-xl border border-border bg-secondary/40 px-4 py-2.5 text-xs text-muted-foreground ${className}`}>
      {date && (
        <span className="inline-flex items-center gap-1.5">
          <CalendarClock className="size-3.5" /> Last updated <span className="font-medium text-foreground">{date}</span>
        </span>
      )}
      {sourceName && (
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="size-3.5 text-primary" /> Verified against{" "}
          {sourceUrl ? (
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center gap-0.5 font-medium text-foreground underline decoration-dotted underline-offset-2">
              {sourceName} <ExternalLink className="size-3" />
            </a>
          ) : (
            <span className="font-medium text-foreground">{sourceName}</span>
          )}
        </span>
      )}
      <span className="inline-flex items-center gap-1.5">
        Educational guide, not a government site — see our{" "}
        <Link href="/editorial-policy" className="font-medium text-foreground underline decoration-dotted underline-offset-2">editorial policy</Link>.
      </span>
    </div>
  );
}
