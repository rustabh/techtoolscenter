import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { BlogCard } from "@/components/blog/blog-bits";
import { blogCategories } from "@/lib/blog/categories";
import { estimateReadingMinutes, postsByCategory } from "@/lib/blog/posts";
import { devCategories } from "@/lib/devhub/categories";
import { resourcesByCategory } from "@/lib/devhub/resources";
import { prompts as aiPrompts } from "@/lib/aihub/prompts";
import { buildSimpleMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildSimpleMetadata({
  title: "Learning Center — Guides, Tutorials & Prompts",
  description:
    "One place to learn: how-to guides for every tool, developer learning resources, ready-made AI prompts, and India government guides — all free, all in one place.",
  ogDescription: "Guides, tutorials, dev learning paths, AI prompts and India guides — one place to learn.",
  canonical: "/learning-center",
});

export default function LearningCenterPage() {
  const guides = postsByCategory("guides");
  const indiaGuides = guides.filter((p) => p.tags.includes("india")).slice(-3).reverse();
  const featuredGuides = guides.filter((p) => !p.tags.includes("india")).slice(-6).reverse();
  const devLearning = resourcesByCategory("learning");
  const devCategory = devCategories.find((c) => c.slug === "learning");

  return (
    <div className="container-tight py-12">
      <Breadcrumbs items={[{ label: "Learning Center" }]} />

      <header className="mt-6 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Learning Center</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          One place to learn, not four separate ones. Start-to-finish guides for TechToolsCenter&apos;s tools, free
          places to learn web development, ready-made AI prompts, and India government how-tos — all free, no
          sign-up.
        </p>
      </header>

      {/* Start with a guide */}
      <section className="mt-14">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Start With a Guide</h2>
          <Link href="/blog/category/guides" className="text-sm font-medium text-primary hover:underline">
            View all guides →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredGuides.map((p) => <BlogCard key={p.slug} post={p} readingMinutes={estimateReadingMinutes(p)} />)}
        </div>
      </section>

      {/* Browse by topic */}
      <section className="mt-14">
        <h2 className="mb-5 text-2xl font-bold tracking-tight">Browse Articles by Topic</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {blogCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/blog/category/${c.slug}`}
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

      {/* Developer learning */}
      {devCategory && devLearning.length > 0 && (
        <section className="mt-14">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Learn Web Development, Free</h2>
              <p className="mt-1 text-sm text-muted-foreground">{devLearning.length} free places to learn, curated in the Developer Hub.</p>
            </div>
            <Link href="/developer-hub/learning" className="text-sm font-medium text-primary hover:underline">
              View all →
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {devLearning.map((r) => (
              <a
                key={r.slug}
                href={r.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Icon name={r.icon} className="size-3.5" /> {r.name}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* AI prompts */}
      <section className="mt-14">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Ready-Made AI Prompts</h2>
            <p className="mt-1 text-sm text-muted-foreground">{aiPrompts.length} original prompts across writing, coding, business, career and more.</p>
          </div>
          <Link href="/ai-hub/prompts" className="text-sm font-medium text-primary hover:underline">
            Browse Prompt Library →
          </Link>
        </div>
      </section>

      {/* India guides */}
      <section className="mt-14 mb-4">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">India Government Guides</h2>
            <p className="mt-1 text-sm text-muted-foreground">Step-by-step how-tos for Aadhaar, PAN, passports, licences and more.</p>
          </div>
          <Link href="/india-services/finder" className="text-sm font-medium text-primary hover:underline">
            Find a service →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {indiaGuides.map((p) => <BlogCard key={p.slug} post={p} readingMinutes={estimateReadingMinutes(p)} />)}
        </div>
      </section>
    </div>
  );
}
