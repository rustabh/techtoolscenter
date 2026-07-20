import Link from "next/link";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { getTool } from "@/lib/tools";
import { getLanding } from "@/lib/landing/landing";

// Popular one-tap shortcuts. Slugs resolve to a tool or SEO landing page.
const SHORTCUTS = [
  "image-compressor",
  "pdf-compress",
  "pdf-merge",
  "qr-generator",
  "image-compressor-for-passport-photo",
  "image-studio",
  "image-resizer",
  "case-converter",
  "uuid-generator",
  "json-formatter",
];

function resolve(slug: string) {
  const t = getTool(slug);
  if (t) return { slug: t.slug, name: t.name, icon: t.icon };
  const l = getLanding(slug);
  if (l) return { slug: l.slug, name: l.h1, icon: getTool(l.core)?.icon ?? "Sparkles" };
  return null;
}

export function QuickActions() {
  const items = SHORTCUTS.map(resolve).filter(Boolean) as { slug: string; name: string; icon: string }[];

  return (
    <section className="container-tight py-8" aria-label="Quick actions">
      <Reveal>
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Quick actions</h2>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {items.map((it, i) => (
            <Reveal key={it.slug} delay={i * 0.03}>
              <Link
                href={`/tools/${it.slug}`}
                className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110">
                  <Icon name={it.icon} className="size-4" />
                </span>
                <span className="truncate text-sm font-medium">{it.name}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
