import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DevResourceFilteredGrid } from "@/components/devhub/dev-resource-filtered-grid";
import { devCategories, getDevCategory } from "@/lib/devhub/categories";
import { resourcesByCategory } from "@/lib/devhub/resources";
import { siteConfig } from "@/lib/site";
import { buildSimpleMetadata } from "@/lib/seo/metadata";

// Built-in tools store officialUrl as a site-relative path (e.g.
// "/tools/json-formatter"), unlike external resources' absolute URLs —
// structured data needs an absolute URL either way, so relative ones get
// resolved against the site origin before going into the ItemList.
function absoluteUrl(url: string): string {
  return url.startsWith("/") ? `${siteConfig.url}${url}` : url;
}

function categoryItemListLd(categoryName: string, items: { name: string; officialUrl: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${categoryName} Developer Resources`,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.officialUrl),
    })),
  };
}

// Every category is statically known at build time; an unmatched slug should
// be a real, correctly-coded 404 rather than an on-demand render that can
// race with the root loading.tsx Suspense boundary and report HTTP 200.
export const dynamicParams = false;

export function generateStaticParams() {
  return devCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = getDevCategory(category);
  if (!cat) return {};
  return buildSimpleMetadata({
    title: `${cat.name} — Developer Resources & Tools`,
    description: `${cat.description} Curated, original descriptions with official sites and docs — free to browse on ${siteConfig.name}'s Developer Hub.`,
    ogDescription: cat.description,
    canonical: `/developer-hub/${cat.slug}`,
  });
}

export default async function DevHubCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getDevCategory(category);
  if (!cat) notFound();

  const items = resourcesByCategory(cat.slug);
  const itemListLd = categoryItemListLd(cat.name, items);

  return (
    <div className="container-tight py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <Breadcrumbs items={[{ label: "Developer Hub", href: "/developer-hub" }, { label: cat.name }]} />
      <header className="mt-6">
        <h1 className="text-4xl font-bold tracking-tight">{cat.name}</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">{cat.description}</p>
      </header>
      <div className="mt-10">
        {items.length > 0 ? (
          <DevResourceFilteredGrid resources={items} />
        ) : (
          <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            No resources listed here yet.
          </p>
        )}
      </div>
    </div>
  );
}
