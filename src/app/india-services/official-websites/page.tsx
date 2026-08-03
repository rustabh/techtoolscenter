import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { IndiaDisclaimer } from "@/components/india/disclaimer";
import { indiaCategories, getIndiaCategory } from "@/lib/india/categories";
import { officialWebsitesByCategory } from "@/lib/india/official-websites";
import { breadcrumbLd } from "@/lib/seo/schema";
import { buildSimpleMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildSimpleMetadata({
  title: "Official Government Websites Directory — India",
  description:
    "Every official Indian government website referenced across TechToolsCenter's India Services guides, organised by category — Aadhaar, PAN, Passport, GST, EPFO and more, with direct links to each real government portal.",
  canonical: "/india-services/official-websites",
});

const SCHEMES_LABEL = "Government Schemes";

export default function OfficialWebsitesPage() {
  const grouped = officialWebsitesByCategory();
  const categoryOrder = [...indiaCategories.map((c) => c.slug), "schemes"].filter((slug) => grouped.has(slug));
  const totalSites = [...grouped.values()].reduce((n, list) => n + list.length, 0);
  const crumb = breadcrumbLd([
    { name: "Home", url: "/" },
    { name: "India Services", url: "/india-services" },
    { name: "Official Websites", url: "/india-services/official-websites" },
  ]);

  return (
    <div className="container-tight py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }} />
      <Breadcrumbs items={[{ label: "India Services", href: "/india-services" }, { label: "Official Websites" }]} />

      <header className="mt-8 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm">🇮🇳 Directory</span>
        <h1 className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Official Government Websites Directory
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          {totalSites} official government portals, organised by category — every link goes straight to the real
          government website, never a copy hosted here.
        </p>
      </header>

      <IndiaDisclaimer className="mx-auto mt-8 max-w-3xl" />

      <div className="mt-10 space-y-12">
        {categoryOrder.map((catSlug) => {
          const cat = getIndiaCategory(catSlug);
          const sites = grouped.get(catSlug) ?? [];
          if (!sites.length) return null;
          return (
            <section key={catSlug}>
              <div className="mb-4 flex items-center gap-2.5">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent text-primary">
                  <Icon name={cat?.icon ?? "Landmark"} className="size-4.5" />
                </span>
                <h2 className="text-xl font-bold tracking-tight">{cat?.name ?? SCHEMES_LABEL}</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {sites.map((site) => (
                  <div key={site.url} className="rounded-2xl border border-border bg-card p-4">
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex items-start justify-between gap-2 font-semibold hover:text-primary"
                    >
                      <span>{site.name}</span>
                      <ExternalLink className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    </a>
                    <p className="mt-1 truncate text-xs text-muted-foreground">{site.url.replace(/^https?:\/\//, "")}</p>
                    {site.entries.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {site.entries.slice(0, 4).map((e) => (
                          <Link key={e.slug} href={e.href} className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground">
                            {e.name}
                          </Link>
                        ))}
                        {site.entries.length > 4 && (
                          <span className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">+{site.entries.length - 4} more</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
