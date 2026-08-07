import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ResourceCard } from "@/components/devhub/resource-card";
import { ResourceSearch } from "@/components/devhub/resource-search";
import { devCategories } from "@/lib/devhub/categories";
import { allDevResources } from "@/lib/devhub/resources";
import { buildSimpleMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildSimpleMetadata({
  title: "Official Documentation — Every Framework, Library & Tool",
  description:
    "Direct links to the official documentation for every language, framework, library and platform in the Developer Hub — grouped by category, no digging required.",
  ogDescription: "Official docs for every framework, library and tool in the Developer Hub, grouped by category.",
  canonical: "/developer-hub/documentation",
});

export default function DocumentationPage() {
  const documented = allDevResources.filter((r) => r.docsUrl);
  const byCategory = devCategories
    .map((c) => ({ category: c, items: documented.filter((r) => r.category === c.slug) }))
    .filter((g) => g.items.length > 0);
  const total = documented.length;

  return (
    <div className="container-tight py-12">
      <Breadcrumbs items={[{ label: "Developer Hub", href: "/developer-hub" }, { label: "Documentation" }]} />

      <header className="mt-6 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Official Documentation</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {total} direct links to official docs — for every language, framework, database, hosting platform and
          tool in the Developer Hub. No aggregator sites, no stale mirrors — straight to the source, grouped by
          category.
        </p>
      </header>

      <div className="mt-8">
        <ResourceSearch resources={documented} />
      </div>

      {byCategory.map(({ category, items }) => (
        <section key={category.slug} className="mt-14">
          <h2 className="mb-5 text-2xl font-bold tracking-tight">{category.name}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((r) => (
              <ResourceCard key={r.slug} resource={r} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
