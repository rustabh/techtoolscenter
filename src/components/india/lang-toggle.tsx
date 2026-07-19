import Link from "next/link";
import { Languages } from "lucide-react";

/**
 * English ↔ Hindi switch shown on services that have a Hindi version.
 * `current` is the active language; `enHref`/`hiHref` are the two URLs.
 */
export function LangToggle({ current, enHref, hiHref }: { current: "en" | "hi"; enHref: string; hiHref: string }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1 text-sm">
      <Languages className="ml-2 size-4 text-muted-foreground" />
      <Link
        href={enHref}
        className={`rounded-full px-3 py-1 font-medium transition-colors ${current === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
        hrefLang="en"
      >
        English
      </Link>
      <Link
        href={hiHref}
        className={`rounded-full px-3 py-1 font-medium transition-colors ${current === "hi" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
        hrefLang="hi"
      >
        हिंदी
      </Link>
    </div>
  );
}
