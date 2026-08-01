import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { BlogCard } from "@/components/blog/blog-bits";
import { blogCategories, getBlogCategory } from "@/lib/blog/categories";
import { postsByCategory } from "@/lib/blog/posts";
import { siteConfig } from "@/lib/site";
import { defaultOgImage } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return blogCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = getBlogCategory(category);
  if (!cat) return {};
  return {
    title: `${cat.name} Articles | ${siteConfig.name} Blog`,
    description: cat.description,
    alternates: { canonical: `/blog/category/${cat.slug}` },
    openGraph: { title: `${cat.name} Articles | ${siteConfig.name} Blog`, description: cat.description, images: [defaultOgImage()] },
    twitter: { card: "summary_large_image", title: `${cat.name} Articles`, description: cat.description, images: [defaultOgImage()] },
  };
}

export default async function BlogCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getBlogCategory(category);
  if (!cat) notFound();
  const items = postsByCategory(category);

  return (
    <div className="container-tight py-12">
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: cat.name }]} />
      <header className="mt-6 mb-8 flex items-center gap-4">
        <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground"><Icon name={cat.icon} className="size-7" /></span>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{cat.name}</h1>
          <p className="mt-1 text-muted-foreground">{cat.description}</p>
        </div>
      </header>
      {items.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((p) => <BlogCard key={p.slug} post={p} />)}</div>
      ) : (
        <p className="rounded-xl border border-dashed border-border p-6 text-muted-foreground">No articles in this category yet — check back soon.</p>
      )}
    </div>
  );
}
