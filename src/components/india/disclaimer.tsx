import { ShieldAlert } from "lucide-react";

/** Mandatory, clearly-visible disclaimer shown on every India Services page. */
export function IndiaDisclaimer({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm ${className}`}>
      <p className="flex items-center gap-2 font-semibold text-amber-700 dark:text-amber-400">
        <ShieldAlert className="size-4" /> Disclaimer
      </p>
      <p className="mt-1.5 text-muted-foreground">
        TechToolsCenter is an independent educational platform. We are <strong>not affiliated with any Government
        authority</strong>. We do not process applications or collect personal information for government services.
        Always complete your application through the official government website linked on this page.
      </p>
    </div>
  );
}
