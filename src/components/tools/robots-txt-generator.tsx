"use client";

import { useMemo, useState } from "react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";

export default function RobotsTxtGenerator() {
  const [allowAll, setAllowAll] = useState(true);
  const [disallow, setDisallow] = useState("/admin\n/private\n/cart");
  const [sitemap, setSitemap] = useState("https://techtoolscenter.com/sitemap.xml");
  const [crawlDelay, setCrawlDelay] = useState("");
  const { copied, copy } = useCopy();

  const out = useMemo(() => {
    const lines = ["User-agent: *"];
    if (allowAll) lines.push("Allow: /");
    disallow.split("\n").map((d) => d.trim()).filter(Boolean).forEach((d) => lines.push(`Disallow: ${d}`));
    if (crawlDelay) lines.push(`Crawl-delay: ${crawlDelay}`);
    lines.push("");
    if (sitemap) lines.push(`Sitemap: ${sitemap}`);
    return lines.join("\n");
  }, [allowAll, disallow, sitemap, crawlDelay]);

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
