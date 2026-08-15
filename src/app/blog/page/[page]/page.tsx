import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BlogCard, Pagination } from "@/components/blog/blog-bits";
import { allPosts, paginate, totalBlogPages } from "@/lib/blog/posts";
import { buildSimpleMetadata } from "@/lib/seo/metadata";

// Any page number outside the statically-generated set (including page 1,
// which is redirected to /blog via next.config.mjs — a real HTTP redirect,
// unlike redirect() called inside a statically-cached page, which only
// produces a client-side meta-refresh) gets Next's built-in 404 before this
// component ever runs, with a correct 404 HTTP status.
export const dynamicParams = false;

export function generateStaticParams() {
  const total = totalBlogPages(allPosts().length);
  return Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({ page: String(i + 2) }));
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
  const { items, current, total } = paginate(allPosts(), Number(page));

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
