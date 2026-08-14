import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { usefulWebsiteCategories, totalUsefulWebsites } from "@/lib/useful-websites";
import { buildSimpleMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildSimpleMetadata({
  title: "Useful Websites — A Hand-Picked Directory of Free Tools & Resources",
  description:
    "A small, curated directory of genuinely useful websites that complement TechToolsCenter — free file transfer, site uptime checkers, WHOIS lookup, fact-checking and free learning resources.",
  canonical: "/useful-websites",
});

const PRICING_CLASSES: Record<string, string> = {
  Free: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Freemium: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

export default function UsefulWebsitesPage() {
  const total = totalUsefulWebsites();

  return (
    <div className="container-tight py-12">
      <Breadcrumbs items={[{ label: "Useful Websites" }]} />

      <header className="mt-8 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm">🌍 Directory</span>
        <h1 className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Useful Websites
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          {total} genuinely useful, independently-run websites that complement what TechToolsCenter does — free file
          transfer, uptime checkers, WHOIS lookup, fact-checking and free learning. No fabricated ratings, no
          affiliate padding — every entry is a real site we&apos;d actually recommend.
        </p>
      </header>

      <div className="mt-10 space-y-12">
        {usefulWebsiteCategories.map((cat) => (
          <section key={cat.slug}>
            <div className="mb-1.5 flex items-center gap-2.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent text-primary">
                <Icon name={cat.icon} className="size-4.5" />
              </span>
              <h2 className="text-xl font-bold tracking-tight">{cat.name}</h2>
            </div>
            <p className="ml-11.5 -mt-0.5 mb-4 max-w-xl text-sm text-muted-foreground">{cat.description}</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {cat.sites.map((site) => (
                <a
                  key={site.url}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="group rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold group-hover:text-primary">{site.name}</span>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${PRICING_CLASSES[site.pricing]}`}>
                      {site.pricing}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-xs text-muted-foreground">{site.url.replace(/^https?:\/\//, "")}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{site.description}</p>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
