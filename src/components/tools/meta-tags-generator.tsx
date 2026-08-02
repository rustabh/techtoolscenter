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
  const { copied, copy } = useCopy();

  const tags = useMemo(() => {
    const t = escapeAttr(title), d = escapeAttr(desc), u = escapeAttr(url), img = escapeAttr(image), ty = escapeAttr(type);
    return [
      `<title>${t}</title>`,
      `<meta name="description" content="${d}">`,
      `<link rel="canonical" href="${u}">`,
      ``,
      `<!-- OpenGraph -->`,
      `<meta property="og:type" content="${ty}">`,
      `<meta property="og:title" content="${t}">`,
      `<meta property="og:description" content="${d}">`,
      `<meta property="og:url" content="${u}">`,
      `<meta property="og:image" content="${img}">`,
      ``,
      `<!-- Twitter -->`,
      `<meta name="twitter:card" content="summary_large_image">`,
      `<meta name="twitter:title" content="${t}">`,
      `<meta name="twitter:description" content="${d}">`,
      `<meta name="twitter:image" content="${img}">`,
    ].join("\n");
  }, [title, desc, url, image, type]);

  const count = (v: string, max: number) => (
    <span className={v.length > max ? "text-destructive" : "text-muted-foreground"}>{v.length}/{max}</span>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Page details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5"><div className="flex justify-between"><Label>Title</Label>{count(title, 60)}</div><Input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
          <div className="space-y-1.5"><div className="flex justify-between"><Label>Description</Label>{count(desc, 160)}</div><Textarea value={desc} onChange={(e) => setDesc(e.target.value)} /></div>
          <div className="space-y-1.5"><Label>Canonical URL</Label><Input value={url} onChange={(e) => setUrl(e.target.value)} /></div>
          <div className="space-y-1.5"><Label>OG image URL</Label><Input value={image} onChange={(e) => setImage(e.target.value)} /></div>
          <div className="space-y-1.5"><Label>OG type</Label><Input value={type} onChange={(e) => setType(e.target.value)} /></div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader><CardTitle>HTML tags</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap rounded-xl bg-secondary/50 p-4 text-xs leading-relaxed">{tags}</pre>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => copy(tags)}>{copied ? "Copied!" : "Copy all tags"}</Button>
            <Button variant="outline" onClick={() => downloadBlob(new Blob([tags], { type: "text/html" }), "meta-tags.html")}>Download .html</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
