import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AiToolCard } from "@/components/aihub/ai-tool-card";
import { aiCategories, getAiCategory } from "@/lib/aihub/categories";
import { toolsByCategory } from "@/lib/aihub/tools";
import { siteConfig } from "@/lib/site";

function categoryItemListLd(categoryName: string, items: { name: string; officialUrl: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${categoryName} AI Tools`,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.officialUrl,
    })),
  };
}

export function generateStaticParams() {
  return aiCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = getAiCategory(category);
  if (!cat) return {};
  const title = `${cat.name} AI Tools — Compare & Discover | ${siteConfig.name}`;
  return {
    title,
    description: `${cat.description} Curated, original overviews with official sites and docs — free to browse on ${siteConfig.name}'s AI Hub.`,
    alternates: { canonical: `/ai-hub/${cat.slug}` },
    openGraph: { title, description: cat.description },
  };
}

export default async function AiHubCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getAiCategory(category);
  if (!cat) notFound();

  const items = toolsByCategory(cat.slug);
  const itemListLd = categoryItemListLd(cat.name, items);

  return (
    <div className="container-tight py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <Breadcrumbs items={[{ label: "AI Hub", href: "/ai-hub" }, { label: cat.name }]} />
      <header className="mt-6">
        <h1 className="text-4xl font-bold tracking-tight">{cat.name} AI Tools</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">{cat.description}</p>
      </header>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => <AiToolCard key={t.slug} tool={t} />)}
      </div>
      {items.length === 0 && (
        <p className="mt-10 rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          No tools listed here yet.
        </p>
      )}
    </div>
  );
}
