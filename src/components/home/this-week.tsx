import { CalendarDays, FileText, Wrench, Gauge, Bug, BookMarked, FolderTree } from "lucide-react";
import { Reveal } from "@/components/reveal";

/**
 * "This Week at TechToolsCenter" — a compact activity snapshot. Values are
 * conservative placeholders for now and are structured so they can later be
 * driven by real analytics/CMS data without touching the layout.
 */
const items = [
  { icon: FileText, label: "New guides", value: "6" },
  { icon: Wrench, label: "New tools", value: "2" },
  { icon: Gauge, label: "Performance improvements", value: "4" },
  { icon: Bug, label: "Bug fixes", value: "5" },
  { icon: BookMarked, label: "Updated guides", value: "12" },
  { icon: FolderTree, label: "Updated categories", value: "3" },
];

export function ThisWeek() {
  return (
    <section className="container-tight py-14">
      <Reveal>
        <div className="glass rounded-3xl p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <CalendarDays className="size-5 text-primary" />
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">This Week at TechToolsCenter</h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">A quick look at what changed recently — we ship improvements every week.</p>
          <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {items.map((it) => (
              <div key={it.label} className="rounded-2xl border border-border bg-card p-4">
                <it.icon className="size-4 text-primary" />
                <dt className="mt-2 text-2xl font-bold tabular-nums tracking-tight">{it.value}</dt>
                <dd className="mt-0.5 text-xs text-muted-foreground">{it.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}
