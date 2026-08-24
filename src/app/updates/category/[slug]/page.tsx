import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryView } from "@/components/updates/category-view";
import { updateCategories, getUpdateCategory } from "@/lib/updates/categories";
import { buildSimpleMetadata } from "@/lib/seo/metadata";

// Every category is statically known at build time; an unmatched slug should
// be a real, correctly-coded 404 rather than an on-demand render that can
// race with the root loading.tsx Suspense boundary and report HTTP 200.
export const dynamicParams = false;

export function generateStaticParams() {
  return updateCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = getUpdateCategory(slug);
  if (!cat) return {};
  return buildSimpleMetadata({
    title: `${cat.name} — Updates`,
    description: cat.description,
    canonical: `/updates/category/${cat.slug}`,
  });
}

export default async function UpdatesCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getUpdateCategory(slug)) notFound();
  return <CategoryView slug={slug} />;
}
