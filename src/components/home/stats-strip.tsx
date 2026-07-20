import { Wrench, Zap, ShieldCheck, Globe, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { tools } from "@/lib/tools";

/**
 * Homepage footer stats strip. Uses only claims we can stand behind — the real
 * tool count, plus generic, honest wording (no fabricated user/file numbers).
 */
const items = [
  { icon: Wrench, value: `${tools.length}+`, label: "Free Tools" },
  { icon: Sparkles, value: "Growing", label: "Collection" },
  { icon: Zap, value: "Instant", label: "Fast Processing" },
  { icon: ShieldCheck, value: "Privacy", label: "First" },
  { icon: Globe, value: "Any Device", label: "Works Everywhere" },
];

export function StatsStrip() {
  return (
    <section className="container-tight py-8">
      <Reveal>
        <div className="glass grid grid-cols-2 gap-4 rounded-3xl p-6 sm:grid-cols-3 lg:grid-cols-5">
          {items.map((it) => (
            <div key={it.label} className="flex flex-col items-center gap-1 text-center">
              <it.icon className="size-5 text-primary" />
              <span className="text-lg font-bold tracking-tight">{it.value}</span>
              <span className="text-xs text-muted-foreground">{it.label}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
