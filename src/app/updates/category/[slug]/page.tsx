import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryView } from "@/components/updates/category-view";
import { updateCategories, getUpdateCategory } from "@/lib/updates/categories";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return updateCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = getUpdateCategory(slug);
  if (!cat) return {};
  return {
    title: `${cat.name} — Updates | ${siteConfig.name}`,
    description: cat.description,
    alternates: { canonical: `/updates/category/${cat.slug}` },
    openGraph: { title: `${cat.name} — Updates`, description: cat.description, url: `/updates/category/${cat.slug}` },
  };
}

export default async function UpdatesCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getUpdateCategory(slug)) notFound();
  return <CategoryView slug={slug} />;
}
