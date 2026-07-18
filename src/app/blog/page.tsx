import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { BlogCard, Pagination } from "@/components/blog/blog-bits";
import { BlogSearch } from "@/components/blog/blog-search";
import { allPosts, featuredPosts, paginate } from "@/lib/blog/posts";
import { blogCategories } from "@/lib/blog/categories";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Blog — Guides, Tips & Tutorials | ${siteConfig.name}`,
  description: "Practical how-to guides, tutorials and tips on invoicing, QR codes, design, productivity, SEO and more — from the TechToolsCenter team.",
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/rss.xml" } },
};

export default function BlogIndex() {
  const all = allPosts();
  const featured = featuredPosts();
  const { items, current, total } = paginate(all, 1);

  return (
    <div className="container-tight py-12">
      <Breadcrumbs items={[{ label: "Blog" }]} />
      <header className="mt-6 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">The TechToolsCenter Blog</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">Guides, tutorials and tips to help you get more done with free, private, browser-based tools.</p>
      </header>

      <div className="mb-10"><BlogSearch posts={all} /></div>

      {/* Categories */}
      <div className="mb-12 flex flex-wrap gap-2">
        {blogCategories.map((c) => (
          <Link key={c.slug} href={`/blog/category/${c.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm transition-colors hover:border-primary/40 hover:text-primary">
            <Icon name={c.icon} className="size-3.5" /> {c.name}
          </Link>
        ))}
      </div>

      {/* Featured */}
      <section className="mb-12">
        <h2 className="mb-5 text-xl font-bold tracking-tight">Featured</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((p) => <BlogCard key={p.slug} post={p} featured />)}
        </div>
      </section>

      {/* Latest */}
      <section>
        <h2 className="mb-5 text-xl font-bold tracking-tight">Latest articles</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => <BlogCard key={p.slug} post={p} />)}
        </div>
        <Pagination base="/blog" current={current} total={total} />
      </section>
    </div>
  );
}
