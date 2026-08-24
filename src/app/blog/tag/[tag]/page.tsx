import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { BlogCard } from "@/components/blog/blog-bits";
import { blogTopics, getBlogTopic } from "@/lib/blog/topics";
import { postsByTag } from "@/lib/blog/posts";
import { buildSimpleMetadata } from "@/lib/seo/metadata";

// Every tag is statically known at build time; an unmatched slug should be
// a real, correctly-coded 404 rather than an on-demand render that can race
// with the root loading.tsx Suspense boundary and report HTTP 200.
export const dynamicParams = false;

export function generateStaticParams() {
  return blogTopics.map((t) => ({ tag: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  const topic = getBlogTopic(tag);
  if (!topic) return {};
  return buildSimpleMetadata({
    title: `${topic.name} — Articles & How-Tos`,
    description: topic.description,
    canonical: `/blog/tag/${topic.slug}`,
  });
}

export default async function BlogTagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const topic = getBlogTopic(tag);
  if (!topic) notFound();
  const items = postsByTag(topic.tag);

  return (
    <div className="container-tight py-12">
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: topic.name }]} />
      <header className="mt-6 mb-8 flex items-center gap-4">
        <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground"><Icon name={topic.icon} className="size-7" /></span>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{topic.name}</h1>
          <p className="mt-1 text-muted-foreground">{topic.description}</p>
        </div>
      </header>
      {items.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((p) => <BlogCard key={p.slug} post={p} />)}</div>
      ) : (
        <p className="rounded-xl border border-dashed border-border p-6 text-muted-foreground">No articles for this topic yet — check back soon.</p>
      )}
    </div>
  );
}
