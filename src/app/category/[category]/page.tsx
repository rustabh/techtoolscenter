import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolCard } from "@/components/tool-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { categories, getToolsByCategory, type ToolCategory } from "@/lib/tools";
import { buildSimpleMetadata } from "@/lib/seo/metadata";

function resolve(slug: string) {
  return categories.find((c) => c.id.toLowerCase() === slug.toLowerCase());
}

// Every category is statically known at build time; an unmatched slug should
// be a real, correctly-coded 404 rather than an on-demand render that can
// race with the root loading.tsx Suspense boundary and report HTTP 200.
export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = resolve(category);
  if (!cat) return {};
  return buildSimpleMetadata({
    title: `${cat.label} Tools`,
    description: cat.description,
    canonical: `/category/${cat.id.toLowerCase()}`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = resolve(category);
  if (!cat) notFound();

  const items = getToolsByCategory(cat.id as ToolCategory);

  return (
    <div className="container-tight py-12">
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: cat.label }]} />
      <div className="mt-6">
        <h1 className="text-4xl font-bold tracking-tight">{cat.label}</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">{cat.description}</p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t, i) => (
          <ToolCard key={t.slug} tool={t} index={i} />
        ))}
      </div>
    </div>
  );
}
