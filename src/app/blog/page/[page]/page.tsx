import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BlogCard, Pagination } from "@/components/blog/blog-bits";
import { allPosts, paginate, POSTS_PER_PAGE } from "@/lib/blog/posts";
import { buildSimpleMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  const total = Math.max(1, Math.ceil(allPosts().length / POSTS_PER_PAGE));
  return Array.from({ length: total }, (_, i) => ({ page: String(i + 1) }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const { page } = await params;
  return buildSimpleMetadata({
    title: `Blog — Page ${page}`,
    description: "More guides, tutorials and tips from TechToolsCenter.",
    canonical: `/blog/page/${page}`,
  });
}

export default async function BlogPaged({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const n = Number(page);
  if (!Number.isInteger(n) || n < 1) notFound();
  const { items, current, total } = paginate(allPosts(), n);
  if (n > total) notFound();

  return (
    <div className="container-tight py-12">
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: `Page ${current}` }]} />
      <h1 className="mt-6 mb-8 text-3xl font-bold tracking-tight">All articles — page {current}</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => <BlogCard key={p.slug} post={p} />)}
      </div>
      <Pagination base="/blog" current={current} total={total} />
    </div>
  );
}
