import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AuthorBox, BlogCard } from "@/components/blog/blog-bits";
import { authors, getAuthor } from "@/lib/blog/authors";
import { postsByAuthor } from "@/lib/blog/posts";
import { siteConfig } from "@/lib/site";
import { defaultOgImage } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return {};
  return {
    title: `${author.name} — ${author.role} | ${siteConfig.name}`,
    description: author.bio,
    alternates: { canonical: `/blog/author/${author.slug}` },
    openGraph: { title: `${author.name} — ${author.role}`, description: author.bio, images: [defaultOgImage()] },
    twitter: { card: "summary_large_image", title: author.name, description: author.bio, images: [defaultOgImage()] },
  };
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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((p) => <BlogCard key={p.slug} post={p} />)}</div>
    </div>
  );
}
