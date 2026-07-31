import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { aiCollections } from "@/lib/aihub/collections";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `AI Tool Collections — Best AI for Students, Developers & More | ${siteConfig.name}`,
  description: "Hand-picked collections of the best AI tools for students, developers, designers, marketers, content creators and more.",
  alternates: { canonical: "/ai-hub/collections" },
};

export default function AiHubCollectionsPage() {
  return (
    <div className="container-tight py-12">
      <Breadcrumbs items={[{ label: "AI Hub", href: "/ai-hub" }, { label: "Collections" }]} />
      <header className="mt-6 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight">AI Tool Collections</h1>
        <p className="mt-3 text-muted-foreground">Hand-picked groups of the best AI tools for a specific job.</p>
      </header>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {aiCollections.map((c) => (
          <Link
            key={c.slug}
            href={`/ai-hub/collections/${c.slug}`}
            className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
              <Icon name={c.icon} className="size-5" />
            </span>
            <span>
              <span className="block font-semibold group-hover:text-primary">{c.name}</span>
              <span className="mt-0.5 block text-sm text-muted-foreground">{c.description}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
