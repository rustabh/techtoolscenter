"use client";

import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { downloadBlob, localDateISO } from "@/lib/utils";

interface SitemapUrl {
  id: string;
  loc: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: string;
}

const newUrl = (loc = ""): SitemapUrl => ({
  id: Math.random().toString(36).slice(2),
  loc,
  changefreq: "weekly",
  priority: "0.5",
});

function initial(): SitemapUrl[] {
  return [newUrl("https://example.com/"), newUrl("https://example.com/about")];
}

function escapeXml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export default function SitemapGenerator() {
  const { value, set } = useLocalStorage<SitemapUrl[]>("uh:sitemap-generator", initial());
  const [today] = useState(() => localDateISO());
  const { copied, copy } = useCopy();

  const xml = useMemo(() => {
    const entries = value
      .filter((u) => u.loc.trim())
      .map(
        (u) =>
          `  <url>\n    <loc>${escapeXml(u.loc.trim())}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
      )
      .join("\n");
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
  }, [value, today]);

  const patch = (id: string, p: Partial<SitemapUrl>) => set(value.map((u) => (u.id === id ? { ...u, ...p } : u)));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>URLs</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {value.map((u, i) => (
            <div key={u.id} className="space-y-2 rounded-xl border border-border p-3">
              <div className="space-y-1.5">
                <Label htmlFor={`sitemap-loc-${u.id}`}>URL {i + 1}</Label>
                <div className="flex gap-2">
                  <Input
                    id={`sitemap-loc-${u.id}`}
                    value={u.loc}
                    onChange={(e) => patch(u.id, { loc: e.target.value })}
                    placeholder="https://example.com/page"
                  />
                  <Button type="button" variant="ghost" size="icon" aria-label="Remove URL" onClick={() => set(value.filter((x) => x.id !== u.id))}>
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <Label htmlFor={`sitemap-freq-${u.id}`}>Change frequency</Label>
                  <Select id={`sitemap-freq-${u.id}`} value={u.changefreq} onChange={(e) => patch(u.id, { changefreq: e.target.value as SitemapUrl["changefreq"] })}>
                    {(["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"] as const).map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`sitemap-priority-${u.id}`}>Priority</Label>
                  <Select id={`sitemap-priority-${u.id}`} value={u.priority} onChange={(e) => patch(u.id, { priority: e.target.value })}>
                    {["1.0", "0.9", "0.8", "0.7", "0.6", "0.5", "0.4", "0.3", "0.2", "0.1", "0.0"].map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={() => set([...value, newUrl()])}>
            <Plus /> Add URL
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>sitemap.xml</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <pre className="max-h-96 overflow-auto rounded-xl bg-secondary/50 p-4 font-mono text-xs">{xml}</pre>
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => copy(xml)}>{copied ? "Copied" : "Copy"}</Button>
            <Button type="button" variant="outline" onClick={() => downloadBlob(new Blob([xml], { type: "application/xml" }), "sitemap.xml")}>
              Download sitemap.xml
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
