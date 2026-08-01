import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { collectionsWithCounts } from "@/lib/collections";
import { siteConfig } from "@/lib/site";
import { defaultOgImage } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  title: "Collections — Organized Tool Hubs",
  description: `Browse ${siteConfig.name}'s tools by collection — Calculator Hub, Text Studio, PDF Toolkit, Developer Studio and more. Find the right tool in seconds.`,
  alternates: { canonical: "/collections" },
  openGraph: {
    title: "Collections — Organized Tool Hubs",
    description: `Browse ${siteConfig.name}'s tools by collection — find the right tool in seconds.`,
    images: [defaultOgImage()],
  },
  twitter: {
    card: "summary_large_image",
    title: "Collections — Organized Tool Hubs",
    description: `Browse ${siteConfig.name}'s tools by collection.`,
    images: [defaultOgImage()],
  },
};

export default function CollectionsPage() {
  const cols = collectionsWithCounts();
  return (
    <div className="container-tight py-12">
      <Breadcrumbs items={[{ label: "Collections" }]} />
      <div className="mt-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Explore collections</h1>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          Every tool, neatly organised into focused hubs. Pick a collection to dive in.
        </p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cols.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.03}>
            <Link href={`/collections/${c.slug}`}
              className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
              <span className="grid size-12 place-items-center rounded-xl bg-accent text-accent-foreground">
                <Icon name={c.icon} className="size-6" />
              </span>
              <div>
                <h2 className="font-semibold">{c.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
                <span className="mt-2 inline-block text-xs font-medium text-primary">{c.count} tools →</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
