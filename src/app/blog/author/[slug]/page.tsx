import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AuthorBox, BlogCard } from "@/components/blog/blog-bits";
import { authors, getAuthor } from "@/lib/blog/authors";
import { estimateReadingMinutes, postsByAuthor } from "@/lib/blog/posts";
import { buildSimpleMetadata } from "@/lib/seo/metadata";

// Every author is statically known at build time; an unmatched slug should
// be a real, correctly-coded 404 rather than an on-demand render that can
// race with the root loading.tsx Suspense boundary and report HTTP 200.
export const dynamicParams = false;

export function generateStaticParams() {
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return {};
  return buildSimpleMetadata({
    title: `${author.name} — ${author.role}`,
    description: author.bio,
    canonical: `/blog/author/${author.slug}`,
  });
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();
  const items = postsByAuthor(slug);

  return (
    <div className="container-tight py-12">
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: author.name }]} />
      <div className="mt-6 mb-8"><AuthorBox author={author} /></div>
      <h2 className="mb-5 text-xl font-bold tracking-tight">Articles by {author.name}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((p) => <BlogCard key={p.slug} post={p} readingMinutes={estimateReadingMinutes(p)} />)}</div>
    </div>
  );
}
