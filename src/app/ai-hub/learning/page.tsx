import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GitCompareArrows, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { BlogCard } from "@/components/blog/blog-bits";
import { estimateReadingMinutes, getPost } from "@/lib/blog/posts";
import { prompts } from "@/lib/aihub/prompts";
import { aiCategories } from "@/lib/aihub/categories";
import { buildSimpleMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildSimpleMetadata({
  title: "AI Learning — Guides, Comparisons & Prompts",
  description:
    "Learn how to actually use AI well — comparisons of the top chatbots and generators, how-to guides for prompting and picking the right tool, a free prompt library, and every AI category to explore.",
  ogDescription: "Guides, comparisons, a prompt library and every AI category — one place to learn AI.",
  canonical: "/ai-hub/learning",
});

// Every slug here must exist in src/lib/blog/posts.ts — getPost() silently
// drops anything that doesn't, so a stale/renamed slug quietly shrinks this
// section instead of erroring.
const guideSlugs = [
  "chatgpt-vs-claude-vs-gemini-2026",
  "how-to-compare-ai-tools-before-you-commit",
  "how-to-write-better-ai-prompts",
  "best-free-ai-tools-for-coding-2026",
  "best-free-ai-image-generators-2026",
  "ai-video-generators-what-they-do-free-options",
  "best-free-ai-tools-for-small-business-india",
  "how-to-use-ai-to-write-a-better-resume",
];

export default function AiLearningPage() {
  const guides = guideSlugs.map(getPost).filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <div className="container-tight py-12">
      <Breadcrumbs items={[{ label: "AI Hub", href: "/ai-hub" }, { label: "AI Learning" }]} />

      <header className="mt-6 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">AI Learning</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Not another list of AI tools — this is where you learn to actually use them. Comparisons, how-to guides, a
          free prompt library, and every AI category to explore, all in one place.
        </p>
      </header>

      {/* Guides & comparisons */}
      <section className="mt-14">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Guides &amp; Comparisons</h2>
          <Link href="/blog" className="text-sm font-medium text-primary hover:underline">
            View all guides →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((p) => <BlogCard key={p.slug} post={p} readingMinutes={estimateReadingMinutes(p)} />)}
        </div>
      </section>

      {/* Prompt library + Compare */}
      <section className="mt-14">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/ai-hub/prompts"
            className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
              <Sparkles className="size-6" />
            </span>
            <span>
              <span className="block text-lg font-semibold">Prompt Library</span>
              <span className="mt-1 block text-sm text-muted-foreground">
                {prompts.length} ready-made prompts across writing, coding, business, career and more — copy and adapt.
              </span>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Browse prompts <ArrowRight className="size-3.5" />
              </span>
            </span>
          </Link>
          <Link
            href="/ai-hub/compare"
            className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
              <GitCompareArrows className="size-6" />
            </span>
            <span>
              <span className="block text-lg font-semibold">Compare AI Tools</span>
              <span className="mt-1 block text-sm text-muted-foreground">
                Put two or more AI tools side by side — pricing, features and what each one is actually best at.
              </span>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Start comparing <ArrowRight className="size-3.5" />
              </span>
            </span>
          </Link>
        </div>
      </section>

      {/* Browse by category */}
      <section className="mt-14 mb-4">
        <h2 className="mb-1 text-2xl font-bold tracking-tight">Learn by Category</h2>
        <p className="mb-5 text-sm text-muted-foreground">Every AI category on the site — jump straight to the tools that matter for what you&apos;re doing.</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {aiCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/ai-hub/${c.slug}`}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                <Icon name={c.icon} className="size-5" />
              </span>
              <span className="text-sm font-medium">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
