import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AiToolCard } from "@/components/aihub/ai-tool-card";
import { aiCollections, getAiCollection } from "@/lib/aihub/collections";
import { getAiTool } from "@/lib/aihub/tools";
import { defaultOgImage, socialTitle } from "@/lib/seo/metadata";

function collectionItemListLd(name: string, items: { name: string; officialUrl: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.officialUrl,
    })),
  };
}

// Every collection is statically known at build time; an unmatched slug
// should be a real, correctly-coded 404 rather than an on-demand render
// that can race with the root loading.tsx Suspense boundary and report
// HTTP 200.
export const dynamicParams = false;

export function generateStaticParams() {
  return aiCollections.map((c) => ({ collection: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ collection: string }> }): Promise<Metadata> {
  const { collection } = await params;
  const col = getAiCollection(collection);
  if (!col) return {};
  const title = `${col.name} (2026)`;
  return {
    title,
    description: `${col.description} A hand-picked list, with official sites and free/paid pricing for each.`,
    alternates: { canonical: `/ai-hub/collections/${col.slug}` },
    openGraph: { title: socialTitle(title), description: col.description, images: [defaultOgImage()] },
    twitter: { card: "summary_large_image", title: socialTitle(title), description: col.description, images: [defaultOgImage()] },
  };
}

export default async function AiHubCollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  const col = getAiCollection(collection);
  if (!col) notFound();

  const items = col.toolSlugs.map(getAiTool).filter((t): t is NonNullable<typeof t> => Boolean(t));
  const itemListLd = collectionItemListLd(col.name, items);

  return (
    <div className="container-tight py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <Breadcrumbs items={[{ label: "AI Hub", href: "/ai-hub" }, { label: "Collections", href: "/ai-hub/collections" }, { label: col.name }]} />
      <header className="mt-6">
        <h1 className="text-4xl font-bold tracking-tight">{col.name}</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">{col.description}</p>
      </header>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => t && <AiToolCard key={t.slug} tool={t} />)}
      </div>
    </div>
  );
}
