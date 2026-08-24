import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolCard } from "@/components/tool-card";
import { PremiumAd } from "@/components/ads/premium-ad";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { collections, getCollection, getToolsByCollection } from "@/lib/collections";
import { buildCollectionMetadata } from "@/lib/seo/metadata";
import { breadcrumbLd } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

// Every collection is statically known at build time; an unmatched slug
// should be a real, correctly-coded 404 rather than an on-demand render
// that can race with the root loading.tsx Suspense boundary and report
// HTTP 200.
export const dynamicParams = false;

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const col = getCollection(slug);
  if (!col) return {};
  return buildCollectionMetadata(col, getToolsByCollection(slug).length);
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const col = getCollection(slug);
  if (!col) notFound();
  const items = getToolsByCollection(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: col.name,
    description: col.description,
    url: `${siteConfig.url}/collections/${col.slug}`,
    hasPart: items.map((t) => ({ "@type": "SoftwareApplication", name: t.name, url: `${siteConfig.url}/tools/${t.slug}` })),
  };
  const crumbLd = breadcrumbLd([
    { name: "Home", url: "/" },
    { name: "Collections", url: "/collections" },
    { name: col.name, url: `/collections/${col.slug}` },
  ]);

  return (
    <div className="container-tight py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbLd) }} />
      <Breadcrumbs items={[{ label: "Collections", href: "/collections" }, { label: col.name }]} />
      <header className="mt-6 flex items-center gap-4">
        <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground">
          <Icon name={col.icon} className="size-7" />
        </span>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{col.name}</h1>
          <p className="mt-1 text-muted-foreground">{col.description}</p>
        </div>
      </header>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t, i) => (
          <ToolCard key={t.slug} tool={t} index={i} />
        ))}
      </div>

      {/* Ad — after the tool grid, before the footer */}
      <PremiumAd />
    </div>
  );
}
