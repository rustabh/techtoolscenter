"use client";

import { useMemo, useState } from "react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";

// Common AI-training crawlers — increasingly one of the top reasons people
// reach for a custom robots.txt today, separate from normal search-engine
// crawling (which the default "*" group already covers).
const AI_BOTS = [
  { id: "GPTBot", label: "OpenAI (GPTBot)" },
  { id: "ChatGPT-User", label: "OpenAI (ChatGPT-User)" },
  { id: "CCBot", label: "Common Crawl (CCBot)" },
  { id: "anthropic-ai", label: "Anthropic (anthropic-ai)" },
  { id: "ClaudeBot", label: "Anthropic (ClaudeBot)" },
  { id: "Google-Extended", label: "Google AI training (Google-Extended)" },
  { id: "PerplexityBot", label: "Perplexity (PerplexityBot)" },
  { id: "Bytespider", label: "ByteDance (Bytespider)" },
] as const;

export default function RobotsTxtGenerator() {
  const [allowAll, setAllowAll] = useState(true);
  const [disallow, setDisallow] = useState("/admin\n/private\n/cart");
  const [sitemap, setSitemap] = useState("https://techtoolscenter.com/sitemap.xml");
  const [crawlDelay, setCrawlDelay] = useState("");
  const [blockedBots, setBlockedBots] = useState<Set<string>>(new Set());
  const { copied, copy } = useCopy();

  const toggleBot = (id: string) => {
    setBlockedBots((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const out = useMemo(() => {
    const lines = ["User-agent: *"];
    if (allowAll) lines.push("Allow: /");
    disallow.split("\n").map((d) => d.trim()).filter(Boolean).forEach((d) => lines.push(`Disallow: ${d}`));
    if (crawlDelay) lines.push(`Crawl-delay: ${crawlDelay}`);
    for (const bot of AI_BOTS) {
      if (blockedBots.has(bot.id)) {
        lines.push("", `User-agent: ${bot.id}`, "Disallow: /");
      }
    }
    lines.push("");
    if (sitemap) lines.push(`Sitemap: ${sitemap}`);
    return lines.join("\n");
  }, [allowAll, disallow, sitemap, crawlDelay, blockedBots]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Rules</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input type="checkbox" checked={allowAll} onChange={(e) => setAllowAll(e.target.checked)} className="size-4 accent-[hsl(var(--primary))]" />
            Allow all crawlers by default
          </label>
          <div className="space-y-1.5"><Label>Disallow paths (one per line)</Label><Textarea value={disallow} onChange={(e) => setDisallow(e.target.value)} /></div>
          <div className="space-y-1.5"><Label>Crawl delay (seconds, optional)</Label><Input value={crawlDelay} onChange={(e) => setCrawlDelay(e.target.value)} placeholder="e.g. 10" /></div>
          <div className="space-y-1.5"><Label>Sitemap URL</Label><Input value={sitemap} onChange={(e) => setSitemap(e.target.value)} /></div>
          <div className="space-y-1.5">
            <Label>Block AI-training crawlers (optional)</Label>
            <div className="space-y-1.5">
              {AI_BOTS.map((bot) => (
                <label key={bot.id} className="flex cursor-pointer items-center justify-between rounded-lg border border-border px-3 py-2 text-sm">
                  {bot.label}
                  <input type="checkbox" checked={blockedBots.has(bot.id)} onChange={() => toggleBot(bot.id)} className="size-4 accent-[hsl(var(--primary))]" />
                </label>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">These are separate from your normal search-engine crawling rules above.</p>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader><CardTitle>robots.txt</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <pre className="min-h-[240px] whitespace-pre-wrap rounded-xl bg-secondary/50 p-4 text-sm leading-relaxed">{out}</pre>
          <div className="flex gap-2">
            <Button onClick={() => copy(out)}>{copied ? "Copied!" : "Copy"}</Button>
            <Button variant="outline" onClick={() => downloadBlob(new Blob([out], { type: "text/plain" }), "robots.txt")}>Download</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
