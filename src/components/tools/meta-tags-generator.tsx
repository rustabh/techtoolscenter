"use client";

import { useMemo, useState } from "react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";

// Guards against a title/description containing a quote or angle bracket
// breaking out of the attribute (e.g. He said "hi" would otherwise produce
// content="He said "hi""), which would emit invalid, unparsable HTML.
function escapeAttr(s: string) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export default function MetaTagsGenerator() {
  const [title, setTitle] = useState("TechToolsCenter — Free Online Tools");
  const [desc, setDesc] = useState("A premium collection of free, privacy-first online tools that run in your browser.");
  const [url, setUrl] = useState("https://techtoolscenter.com");
  const [image, setImage] = useState("https://techtoolscenter.com/opengraph-image");
  const [type, setType] = useState("website");
  const [indexable, setIndexable] = useState(true);
  const [themeColor, setThemeColor] = useState("");
  const { copied, copy } = useCopy();

  const tags = useMemo(() => {
    const t = escapeAttr(title), d = escapeAttr(desc), u = escapeAttr(url), img = escapeAttr(image), ty = escapeAttr(type);
    // twitter:summary_large_image specifically requires an image per
    // Twitter's own Card spec — emitting it with no image (or an empty
    // og:image/twitter:image content="") produces tags that validators flag
    // and that social platforms may reject or render blank. Fall back to
    // the imageless "summary" card, and drop the image lines entirely
    // rather than emitting them empty.
    return [
      `<title>${t}</title>`,
      `<meta name="description" content="${d}">`,
      `<link rel="canonical" href="${u}">`,
      `<meta name="robots" content="${indexable ? "index, follow" : "noindex, nofollow"}">`,
      `<meta name="viewport" content="width=device-width, initial-scale=1">`,
      themeColor ? `<meta name="theme-color" content="${escapeAttr(themeColor)}">` : "",
      ``,
      `<!-- OpenGraph -->`,
      `<meta property="og:type" content="${ty}">`,
      `<meta property="og:title" content="${t}">`,
      `<meta property="og:description" content="${d}">`,
      `<meta property="og:url" content="${u}">`,
      image ? `<meta property="og:image" content="${img}">` : "",
      ``,
      `<!-- Twitter -->`,
      `<meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}">`,
      `<meta name="twitter:title" content="${t}">`,
      `<meta name="twitter:description" content="${d}">`,
      image ? `<meta name="twitter:image" content="${img}">` : "",
    ].filter((line, i, arr) => line !== "" || arr[i - 1] !== "").join("\n");
  }, [title, desc, url, image, type, indexable, themeColor]);

  const count = (v: string, max: number) => (
    <span className={v.length > max ? "text-destructive" : "text-muted-foreground"}>{v.length}/{max}</span>
  );

  const domain = useMemo(() => {
    try { return new URL(url).hostname; } catch { return url.replace(/^https?:\/\//, "").split("/")[0]; }
  }, [url]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Page details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5"><div className="flex justify-between"><Label htmlFor="meta-title">Title</Label>{count(title, 60)}</div><Input id="meta-title" value={title} onChange={(e) => setTitle(e.target.value)} /></div>
          <div className="space-y-1.5"><div className="flex justify-between"><Label htmlFor="meta-desc">Description</Label>{count(desc, 160)}</div><Textarea id="meta-desc" value={desc} onChange={(e) => setDesc(e.target.value)} /></div>
          <div className="space-y-1.5"><Label htmlFor="meta-url">Canonical URL</Label><Input id="meta-url" value={url} onChange={(e) => setUrl(e.target.value)} /></div>
          <div className="space-y-1.5"><Label htmlFor="meta-image">OG image URL</Label><Input id="meta-image" value={image} onChange={(e) => setImage(e.target.value)} /></div>
          <div className="space-y-1.5"><Label htmlFor="meta-type">OG type</Label><Input id="meta-type" value={type} onChange={(e) => setType(e.target.value)} /></div>
          <div className="space-y-1.5"><Label htmlFor="meta-theme-color">Theme color (optional)</Label><Input id="meta-theme-color" type="text" placeholder="#4f46e5" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} /></div>
          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-border p-3 text-sm">
            Allow this page to be indexed
            <input type="checkbox" checked={indexable} onChange={(e) => setIndexable(e.target.checked)} className="size-4 accent-[hsl(var(--primary))]" />
          </label>
          {!indexable && <p className="text-xs text-amber-500">robots will be set to &quot;noindex, nofollow&quot; — this page won&apos;t appear in search results.</p>}
        </CardContent>
      </Card>
      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Social share preview</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-xl border border-border">
              {image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image} alt="" className="aspect-[1.91/1] w-full bg-secondary object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />
              )}
              <div className="space-y-1 bg-secondary/40 p-3">
                <p className="truncate text-xs uppercase tracking-wide text-muted-foreground">{domain}</p>
                <p className="truncate text-sm font-semibold">{title || "Page title"}</p>
                <p className="line-clamp-2 text-xs text-muted-foreground">{desc || "Page description"}</p>
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Approximates how Twitter/X, Facebook, LinkedIn and WhatsApp render a shared link.</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader><CardTitle>HTML tags</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <pre className="max-h-[320px] overflow-auto whitespace-pre-wrap rounded-xl bg-secondary/50 p-4 text-xs leading-relaxed">{tags}</pre>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => copy(tags)}>{copied ? "Copied!" : "Copy all tags"}</Button>
              <Button variant="outline" onClick={() => downloadBlob(new Blob([tags], { type: "text/html" }), "meta-tags.html")}>Download .html</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
