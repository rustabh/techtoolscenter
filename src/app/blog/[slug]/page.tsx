import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowRight, CalendarDays } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { Accordion } from "@/components/ui/accordion";
import { PostContent } from "@/components/blog/post-content";
import { PremiumAd } from "@/components/ads/premium-ad";
import { AuthorBox, BlogCard, TableOfContents } from "@/components/blog/blog-bits";
import { allPosts, getPost, relatedPosts, tableOfContents, estimateReadingMinutes } from "@/lib/blog/posts";
import { getAuthor } from "@/lib/blog/authors";
import { getBlogCategory } from "@/lib/blog/categories";
import { articleLd, faqPageFromItemsLd, breadcrumbLd } from "@/lib/seo/schema";
import { defaultOgImage } from "@/lib/seo/metadata";
import { relatedToolsFor } from "@/lib/seo/related";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return allPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const title = post.seoTitle ?? `${post.title} | ${siteConfig.name}`;
  const description = post.seoDescription ?? post.excerpt;
  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `${siteConfig.url}/blog/${post.slug}`,
      title,
      description,
      publishedTime: post.publishedOn,
      images: [defaultOgImage()],
    },
    twitter: { card: "summary_large_image", title, description, images: [defaultOgImage()] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const cat = getBlogCategory(post.category);
  const author = getAuthor(post.author);
  const toc = tableOfContents(post);
  const related = relatedPosts(post);
  const relatedTools = relatedToolsFor(post.relatedTools, { category: post.category, tags: post.tags });

  const schemas = [
    articleLd({ slug: post.slug, title: post.title, description: post.excerpt, authorName: author?.name ?? siteConfig.name, publishedOn: post.publishedOn, updatedOn: post.updatedOn }),
    breadcrumbLd([
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blog" },
      ...(cat ? [{ name: cat.name, url: `/blog/category/${cat.slug}` }] : []),
      { name: post.title, url: `/blog/${post.slug}` },
    ]),
    ...(post.faq?.length ? [faqPageFromItemsLd(post.faq)] : []),
  ];

  return (
    <div className="container-tight py-10">
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, ...(cat ? [{ label: cat.name, href: `/blog/category/${cat.slug}` }] : []), { label: post.title }]} />

      <article className="mt-6 grid gap-10 lg:grid-cols-[1fr_260px]">
        <div className="min-w-0">
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {cat && <Link href={`/blog/category/${cat.slug}`} className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 font-medium text-accent-foreground"><Icon name={cat.icon} className="size-3" /> {cat.name}</Link>}
              <span className="flex items-center gap-1 text-muted-foreground"><CalendarDays className="size-3" /> {new Date(post.publishedOn).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              <span className="flex items-center gap-1 text-muted-foreground"><Clock className="size-3" /> {estimateReadingMinutes(post)} min read</span>
            </div>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight">{post.title}</h1>
            <p className="mt-3 text-lg text-muted-foreground">{post.excerpt}</p>
            {author && (
              <Link href={`/blog/author/${author.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm">
                <span className="grid size-8 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{author.avatarInitials}</span>
                <span className="font-medium">{author.name}</span>
              </Link>
            )}
          </header>

          {/* Mobile TOC */}
          <div className="mb-8 lg:hidden"><TableOfContents items={toc} /></div>

          <PostContent content={post.content} />

          {/* Related tools */}
          {relatedTools.length > 0 && (
            <section className="mt-12">
              <h2 className="mb-5 text-2xl font-bold tracking-tight">Tools used in this article</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedTools.map((t) => t && (
                  <Link key={t.slug} href={`/tools/${t.slug}`}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                    <span className="flex items-center gap-3">
                      <Icon name={t.icon} className="size-5 text-primary" />
                      <span><span className="block text-sm font-medium">{t.name}</span><span className="block text-xs text-muted-foreground">{t.description}</span></span>
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Ad — before the FAQ / conclusion */}
          <PremiumAd className="!px-0" />

          {/* FAQ */}
          {post.faq?.length ? (
            <section className="mt-12">
              <h2 className="mb-6 text-2xl font-bold tracking-tight">Frequently asked questions</h2>
              <Accordion items={post.faq} />
            </section>
          ) : null}

          {/* Author box */}
          {author && <div className="mt-12"><AuthorBox author={author} /></div>}

          {/* Related articles */}
          {related.length > 0 && (
            <section className="mt-12">
              <h2 className="mb-5 text-2xl font-bold tracking-tight">Related articles</h2>
              <div className="grid gap-4 sm:grid-cols-3">{related.map((p) => <BlogCard key={p.slug} post={p} />)}</div>
            </section>
          )}
        </div>

        {/* Desktop sticky TOC + vertical ad */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <TableOfContents items={toc} />
            <PremiumAd variant="vertical" />
          </div>
        </aside>
      </article>
    </div>
  );
}
