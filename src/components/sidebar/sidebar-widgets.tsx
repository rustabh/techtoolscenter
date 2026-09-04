"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Quote as QuoteIcon, Target, Sparkles } from "lucide-react";
import { quotes } from "@/lib/home/quotes";
import { challenges } from "@/lib/home/challenges";
import { pickForDay, pickForWeek } from "@/lib/home/daily";
import { getRecentTools } from "@/lib/tools";
import { aiTools } from "@/lib/aihub/tools";
import { updates } from "@/lib/updates/updates";
import { useLatestBlogPost } from "./latest-blog-context";

function WidgetCard({ eyebrow, title, href, external, icon }: { eyebrow: string; title: string; href: string; external?: boolean; icon?: React.ReactNode }) {
  const inner = (
    <>
      <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-primary">
        {icon}
        {eyebrow}
      </span>
      <span className="mt-1 block truncate text-xs font-medium">{title}</span>
    </>
  );
  const className = "block rounded-lg border border-border/50 bg-background/50 px-2.5 py-2 transition-colors hover:border-primary/40 hover:bg-secondary/40";
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{inner}</a>
  ) : (
    <Link href={href} className={className}>{inner}</Link>
  );
}

/** AI Tool of the Week — attached under the AI section. */
export function AiToolOfWeekWidget() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || aiTools.length === 0) return null;
  const tool = pickForWeek(aiTools, 0);
  return <WidgetCard eyebrow="AI Tool of the Week" title={tool.name} href={tool.officialUrl} external icon={<Sparkles className="size-3" />} />;
}

/** Recently Added Tool — attached under the Productivity section. */
export function RecentlyAddedToolWidget() {
  const [tool, setTool] = useState<{ name: string; slug: string } | null>(null);
  useEffect(() => {
    const [t] = getRecentTools(1);
    if (t) setTool({ name: t.name, slug: t.slug });
  }, []);
  if (!tool) return null;
  return <WidgetCard eyebrow="Recently Added" title={tool.name} href={`/tools/${tool.slug}`} />;
}

/** Government Update — attached under the India section. */
export function GovernmentUpdateWidget() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const govUpdates = updates.filter((u) => u.category === "government").sort((a, b) => (a.publishedOn < b.publishedOn ? 1 : -1));
  const latest = govUpdates[0];
  if (!latest) return null;
  return <WidgetCard eyebrow="Government Update" title={latest.title} href={`/updates/${latest.slug}`} />;
}

/** Latest Blog — attached under the Learning section. The post's slug/title
 *  come from context (see latest-blog-context.tsx), computed server-side in
 *  the root layout — not imported here, which would otherwise pull every
 *  post's full article body and FAQ into this client-side sidebar bundle. */
export function LatestBlogWidget() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const latest = useLatestBlogPost();
  if (!mounted || !latest) return null;
  return <WidgetCard eyebrow="Latest Blog" title={latest.title} href={`/blog/${latest.slug}`} />;
}

/** Today's Quote + Today's Challenge — compact footer widgets, same data as the homepage. */
export function DailyFooterWidgets() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const quote = pickForDay(quotes, 0);
  const challenge = pickForDay(challenges, 0);

  return (
    <div className="space-y-2">
      <div className="rounded-lg border border-border/50 bg-background/50 px-2.5 py-2">
        <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-primary">
          <QuoteIcon className="size-3" /> Today&apos;s Quote
        </span>
        <p className="mt-1 text-xs italic text-muted-foreground">&ldquo;{quote.text}&rdquo;</p>
        <p className="mt-0.5 text-[10px] text-muted-foreground">— {quote.author}</p>
      </div>
      <Link
        href={`/tools/${challenge.toolSlug}`}
        className="block rounded-lg border border-border/50 bg-background/50 px-2.5 py-2 transition-colors hover:border-primary/40 hover:bg-secondary/40"
      >
        <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-primary">
          <Target className="size-3" /> Today&apos;s Challenge
        </span>
        <span className="mt-1 block truncate text-xs font-medium">{challenge.title}</span>
      </Link>
    </div>
  );
}
