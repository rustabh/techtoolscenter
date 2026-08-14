"use client";

import Link from "next/link";
import { Check, Copy, ExternalLink, Rss, Sparkles } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useCopy } from "@/hooks/use-copy";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const RSS_URL = `${siteConfig.url}/blog/rss.xml`;

// This used to be an email-capture form, but the address only ever got
// written to the visitor's own localStorage — there was no backend, so
// "get notified when we ship" was a promise nobody at TechToolsCenter could
// actually keep. Replaced with two mechanisms that genuinely work today: a
// real RSS feed anyone can subscribe to right now, and a link to the
// /updates page that already tracks every ship in real time.
export function Newsletter() {
  const { copied, copy } = useCopy();

  return (
    <div className="glass relative overflow-hidden rounded-3xl p-8 text-center sm:p-12">
      <div className="glow absolute inset-0" aria-hidden />
      <span className="relative mx-auto grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Sparkles className="size-6" />
      </span>
      <h2 className="relative mt-4 text-2xl font-bold tracking-tight sm:text-3xl">Stay in the loop</h2>
      <p className="relative mx-auto mt-2 max-w-md text-muted-foreground">
        New tools and updates ship regularly. Follow along with our real-time updates feed or subscribe to the RSS
        feed — no account or email required.
      </p>
      <div className="relative mx-auto mt-6 flex max-w-md flex-col items-center justify-center gap-3 sm:flex-row">
        <Link href="/updates" className={cn(buttonVariants({ size: "lg" }))}>
          See what&apos;s new
        </Link>
        <Button type="button" size="lg" variant="outline" onClick={() => copy(RSS_URL)}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? "RSS link copied" : "Copy RSS link"}
        </Button>
      </div>
      <a
        href="/blog/rss.xml"
        className="relative mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground hover:underline"
      >
        <Rss className="size-3" /> or open the feed directly <ExternalLink className="size-3" />
      </a>
    </div>
  );
}
