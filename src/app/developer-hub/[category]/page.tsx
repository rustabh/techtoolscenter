import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DevResourceFilteredGrid } from "@/components/devhub/dev-resource-filtered-grid";
import { devCategories, getDevCategory } from "@/lib/devhub/categories";
import { resourcesByCategory } from "@/lib/devhub/resources";
import { siteConfig } from "@/lib/site";
import { buildSimpleMetadata } from "@/lib/seo/metadata";

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

  return (
    <div className="container-tight py-12">
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
