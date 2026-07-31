import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { ResourceCard } from "@/components/devhub/resource-card";
import { ResourceSearch } from "@/components/devhub/resource-search";
import { devCategories } from "@/lib/devhub/categories";
import {
  allDevResources,
  featuredDevResources,
  trendingDevResources,
  recentlyAddedDevResources,
  communityFavoriteDevResources,
  resourcesByCategory,
} from "@/lib/devhub/resources";
import { builtinDevTools } from "@/lib/devhub/builtin";
import type { DevResource } from "@/lib/devhub/types";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Developer Hub — Tools, Frameworks, Docs & AI Coding Resources | ${siteConfig.name}`,
  description:
    "A curated developer ecosystem: frameworks, component libraries, databases, deployment platforms, AI coding assistants, icons and more — plus TechToolsCenter's own built-in developer tools, all from one place.",
  alternates: { canonical: "/developer-hub" },
  openGraph: { title: `Developer Hub | ${siteConfig.name}`, description: "Discover the best free developer tools, docs and resources — curated in one place." },
};

export default function DeveloperHubPage() {
  const featured = featuredDevResources(6);
  const trending = trendingDevResources(6);
  const recent = recentlyAddedDevResources(8);
  const favorites = communityFavoriteDevResources(6);
  const documented = allDevResources.filter((r) => r.docsUrl).slice(0, 8);

  return (
    <div className="container-tight py-12">
      <Breadcrumbs items={[{ label: "Developer Hub" }]} />

      <header className="mt-6 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Developer Hub</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          The best free developer resource center — discover tools, frameworks, component libraries, databases,
          deployment platforms, AI coding assistants, icons and more, curated in one place. Not a bookmark list —
          a developer ecosystem.
        </p>
      </header>

      <div className="mt-8">
        <ResourceSearch resources={allDevResources} />
      </div>

      {/* Popular Categories */}
      <section className="mt-14">
        <h2 className="mb-5 text-2xl font-bold tracking-tight">Popular Categories</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {devCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/developer-hub/${c.slug}`}
              className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                <Icon name={c.icon} className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold group-hover:text-primary">{c.name}</span>
                <span className="block text-xs text-muted-foreground">{resourcesByCategory(c.slug).length} resources</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recently Added */}
      <Section title="Recently Added" items={recent} />

      {/* Trending */}
      {trending.length > 0 && <Section title="Trending" items={trending} />}

      {/* Featured Resources */}
      <Section title="Featured Resources" items={featured} />

      {/* Official Documentation */}
      {documented.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-5 text-2xl font-bold tracking-tight">Official Documentation</h2>
          <div className="flex flex-wrap gap-2">
            {documented.map((r) => (
              <a
                key={r.slug}
                href={r.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Icon name={r.icon} className="size-3.5" /> {r.name} docs
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Our Built-in Developer Tools */}
      <section className="mt-14">
        <h2 className="mb-2 text-2xl font-bold tracking-tight">Our Built-in Developer Tools</h2>
        <p className="mb-5 text-sm text-muted-foreground">
          No need to leave TechToolsCenter for these — they run right here, free and private.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {builtinDevTools.map((r) => <ResourceCard key={r.slug} resource={r} />)}
        </div>
      </section>

      {/* Community Favorites */}
      {favorites.length > 0 && <Section title="Community Favorites" items={favorites} />}
    </div>
  );
}

function Section({ title, items }: { title: string; items: DevResource[] }) {
  if (!items.length) return null;
  return (
    <section className="mt-14">
      <h2 className="mb-5 text-2xl font-bold tracking-tight">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((r) => <ResourceCard key={r.slug} resource={r} />)}
      </div>
    </section>
  );
}
