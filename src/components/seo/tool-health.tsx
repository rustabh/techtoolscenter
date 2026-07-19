import { Gauge, ShieldCheck, WifiOff, Wifi, TrendingUp, CalendarClock, FileType2, Cpu } from "lucide-react";
import type { Tool } from "@/lib/tools";
import { toolFormats } from "@/lib/seo/content";

/** Reusable Tool Health panel — every metric is derived from the registry,
 *  no fabricated data. `network` tools are marked as hybrid / online. */
export function ToolHealth({ tool, network }: { tool: Tool; network: boolean }) {
  const { formats } = toolFormats(tool);
  const rows: { icon: React.ReactNode; label: string; value: string; good?: boolean }[] = [
    { icon: <Gauge className="size-4" />, label: "Speed", value: "Instant", good: true },
    { icon: <ShieldCheck className="size-4" />, label: "Privacy", value: network ? "Hybrid (fetches metadata)" : "In-browser", good: !network },
    { icon: network ? <Wifi className="size-4" /> : <WifiOff className="size-4" />, label: "Offline", value: network ? "Online only" : "Available", good: !network },
    { icon: <TrendingUp className="size-4" />, label: "Popularity", value: tool.popular ? "Popular" : "Growing" },
    { icon: <CalendarClock className="size-4" />, label: "Last updated", value: new Date(tool.addedOn).toLocaleDateString("en-US", { month: "short", year: "numeric" }) },
    { icon: <Cpu className="size-4" />, label: "Processing", value: network ? "Browser + metadata fetch" : "Browser only", good: !network },
    { icon: <FileType2 className="size-4" />, label: "Formats", value: formats.join(", ") },
  ];
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="mb-4 text-sm font-semibold">Tool health</p>
      <dl className="grid gap-3 sm:grid-cols-2">
        {rows.map((r) => (
          <div key={r.label} className="flex items-start gap-2.5 text-sm">
            <span className={`mt-0.5 ${r.good === false ? "text-amber-500" : r.good ? "text-emerald-500" : "text-primary"}`}>{r.icon}</span>
            <span><span className="block text-xs text-muted-foreground">{r.label}</span><span className="font-medium">{r.value}</span></span>
          </div>
        ))}
      </dl>
    </div>
  );
}
