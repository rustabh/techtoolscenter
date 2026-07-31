import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AiToolCard } from "@/components/aihub/ai-tool-card";
import { AiToolSearch } from "@/components/aihub/ai-tool-search";
import { aiCategories } from "@/lib/aihub/categories";
import { aiCollections } from "@/lib/aihub/collections";
import {
  aiTools,
  featuredAiTools,
  trendingAiTools,
  recentlyAddedAiTools,
  newReleaseAiTools,
  mostPopularAiTools,
  toolsByCategory,
} from "@/lib/aihub/tools";
import type { AiTool } from "@/lib/aihub/types";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `AI Hub — Discover, Compare & Learn the World's Best AI Tools | ${siteConfig.name}`,
  description:
    "An AI discovery platform and learning center — browse, search and compare the best AI chatbots, image and video generators, coding assistants and more, all in one place.",
  alternates: { canonical: "/ai-hub" },
  openGraph: { title: `AI Hub | ${siteConfig.name}`, description: "Discover, compare and learn the world's best AI tools — all in one place." },
};

function Section({ title, items }: { title: string; items: AiTool[] }) {
  if (!items.length) return null;
  return (
    <section className="mt-14">
      <h2 className="mb-5 text-2xl font-bold tracking-tight">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => <AiToolCard key={t.slug} tool={t} />)}
      </div>
    </section>
  );
}

export default function AiHubPage() {
  const featured = featuredAiTools(6);
  const trending = trendingAiTools(6);
  const recent = recentlyAddedAiTools(8);
  const newReleases = newReleaseAiTools(6);
  const popular = mostPopularAiTools(6);

  return (
    <div className="container-tight py-12">
      <Breadcrumbs items={[{ label: "AI Hub" }]} />

      <header className="mt-6 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">AI Hub</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Discover, compare and learn the world&apos;s best AI tools — chatbots, image and video generators, coding
          assistants, writing tools and more, all in one place. Not just a directory — an AI discovery platform.
        </p>
      </header>

      <div className="mt-8">
        <AiToolSearch tools={aiTools} />
      </div>

      {/* Categories */}
      <section className="mt-14">
        <h2 className="mb-5 text-2xl font-bold tracking-tight">Categories</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {aiCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/ai-hub/${c.slug}`}
              className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                <Icon name={c.icon} className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold group-hover:text-primary">{c.name}</span>
                <span className="block text-xs text-muted-foreground">{toolsByCategory(c.slug).length} tools</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Collections */}
      <section className="mt-14">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Collections</h2>
          <Link href="/ai-hub/collections" className="text-sm font-medium text-primary hover:underline">See all</Link>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {aiCollections.slice(0, 6).map((c) => (
            <Link
              key={c.slug}
              href={`/ai-hub/collections/${c.slug}`}
              className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                <Icon name={c.icon} className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold group-hover:text-primary">{c.name}</span>
                <span className="block text-xs text-muted-foreground">{c.toolSlugs.length} tools</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Section title="Featured AI" items={featured} />
      <Section title="Trending This Week" items={trending} />
      <Section title="Recently Added" items={recent} />
      <Section title="New Releases" items={newReleases} />
      <Section title="Most Popular" items={popular} />

      {/* AI Learning */}
      <section className="mt-14 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">AI Learning Center</h2>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              Beginner-friendly guides — what AI actually is, how prompt engineering works, and how to pick the
              right tool for the job.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-muted-foreground">
            Coming soon
          </span>
        </div>
      </section>
    </div>
  );
}
