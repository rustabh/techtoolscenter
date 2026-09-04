import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Sparkles } from "lucide-react";
import { Icon } from "@/components/icon";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BlogCard } from "@/components/blog/blog-bits";
import { Badge } from "@/components/ui/badge";
import { estimateReadingMinutes, getPost } from "@/lib/blog/posts";
import { recentlyAddedAiTools } from "@/lib/aihub/tools";
import { getAiCategory } from "@/lib/aihub/categories";
import { buildSimpleMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildSimpleMetadata({
  title: "AI News — Directory Updates & Official AI Sources",
  description:
    "What's new in TechToolsCenter's AI Hub directory, honestly dated, plus direct links to the official sources — OpenAI, Anthropic, Google, Meta and more — where real AI news is actually published first.",
  ogDescription: "Directory updates, honestly dated, plus direct links to where real AI news is published.",
  canonical: "/ai-hub/news",
});

// We don't run a newsroom, so we don't publish speculative "X just released Y"
// posts — that's exactly the kind of thing that goes stale or turns out wrong
// within a day in this space. What we can offer honestly: when we ourselves
// added or updated a tool in the directory, and a direct line to the actual
// primary sources for real releases and announcements.
const officialSources: { name: string; url: string; note: string }[] = [
  { name: "OpenAI", url: "https://openai.com/news/", note: "Product announcements and model releases" },
  { name: "Anthropic", url: "https://www.anthropic.com/news", note: "Claude model updates and research" },
  { name: "Google AI", url: "https://blog.google/technology/ai/", note: "Gemini and Google DeepMind updates" },
  { name: "Meta AI", url: "https://ai.meta.com/blog/", note: "Llama and Meta AI product news" },
  { name: "Microsoft AI", url: "https://blogs.microsoft.com/ai/", note: "Copilot and Azure AI announcements" },
  { name: "Mistral AI", url: "https://mistral.ai/news", note: "Open and commercial model releases" },
  { name: "xAI", url: "https://x.ai/news", note: "Grok model updates" },
  { name: "Hugging Face", url: "https://huggingface.co/blog", note: "Open-source model and tooling news" },
];

// Verified against src/lib/blog/posts.ts — every slug here resolves.
const editorialSlugs = [
  "how-to-compare-ai-tools-before-you-commit",
  "how-to-write-better-ai-prompts",
  "ai-video-generators-what-they-do-free-options",
  "best-free-ai-tools-for-small-business-india",
  "how-to-use-ai-to-write-a-better-resume",
];

export default function AiNewsPage() {
  const recentlyAdded = recentlyAddedAiTools(10);
  const editorial = editorialSlugs.map(getPost).filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <div className="container-tight py-12">
      <Breadcrumbs items={[{ label: "AI Hub", href: "/ai-hub" }, { label: "AI News" }]} />

      <header className="mt-6 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">AI News</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We don&apos;t publish speculative &quot;breaking AI news&quot; — this space moves fast enough that
          third-party roundups are often stale or wrong within a day. Instead: an honest changelog of what&apos;s new
          in our own directory, and direct links to the primary sources where real AI news actually gets published.
        </p>
      </header>

      {/* Directory changelog */}
      <section className="mt-14">
        <h2 className="mb-1 text-2xl font-bold tracking-tight">Directory Changelog</h2>
        <p className="mb-5 text-sm text-muted-foreground">
          When we added or last updated a tool&apos;s listing in the AI Hub — not a claim about when the tool itself
          was released.
        </p>
        <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {recentlyAdded.map((tool) => {
            const cat = getAiCategory(tool.category);
            const date = new Date(tool.addedOn).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
            return (
              <Link
                key={tool.slug}
                href={`/ai-hub/${tool.category}`}
                className="group flex items-center gap-4 p-4 transition-colors hover:bg-secondary/50"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <Icon name={tool.icon} className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold group-hover:text-primary">{tool.name}</span>
                    {tool.badge && <Badge variant="secondary" className="text-[10px]">{tool.badge}</Badge>}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {tool.developer} · {cat?.name ?? tool.category}
                  </span>
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">{date}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Official sources */}
      <section className="mt-14">
        <h2 className="mb-1 text-2xl font-bold tracking-tight">Straight From the Source</h2>
        <p className="mb-5 text-sm text-muted-foreground">
          For actual release announcements, these official pages are faster and more reliable than any third-party
          summary — including ours.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {officialSources.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="group flex items-start justify-between gap-2 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <span>
                <span className="block text-sm font-semibold group-hover:text-primary">{s.name}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{s.note}</span>
              </span>
              <ExternalLink className="size-4 shrink-0 text-muted-foreground" />
            </a>
          ))}
        </div>
      </section>

      {/* Editorial guides */}
      {editorial.length > 0 && (
        <section className="mt-14">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
              <Sparkles className="size-5 text-primary" /> From Our Editorial Desk
            </h2>
            <Link href="/ai-hub/learning" className="text-sm font-medium text-primary hover:underline">
              More AI guides →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {editorial.map((p) => <BlogCard key={p.slug} post={p} readingMinutes={estimateReadingMinutes(p)} />)}
          </div>
        </section>
      )}
    </div>
  );
}
