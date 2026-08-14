"use client";

import { useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Serp { title: string; url: string; desc: string; }
const initial: Serp = {
  title: "TechToolsCenter — Free Online Tools for Everyday Work",
  url: "https://techtoolscenter.com",
  desc: "A premium collection of 30+ free, privacy-first online tools — invoices, PDFs, calculators and generators, all running in your browser.",
};

export default function SerpPreview() {
  const { value, set } = useLocalStorage<Serp>("uh:serp", initial);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  const titleTooLong = value.title.length > 60;
  const descTooLong = value.desc.length > 160;
  const crumb = value.url.replace(/^https?:\/\//, "").replace(/\/$/, "").split("/").join(" › ");

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Snippet content</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between"><Label htmlFor="serp-title">Title</Label><span className={titleTooLong ? "text-destructive text-xs" : "text-muted-foreground text-xs"}>{value.title.length}/60</span></div>
            <Input id="serp-title" value={value.title} onChange={(e) => set({ ...value, title: e.target.value })} />
          </div>
          <div className="space-y-1.5"><Label htmlFor="serp-url">URL</Label><Input id="serp-url" value={value.url} onChange={(e) => set({ ...value, url: e.target.value })} /></div>
          <div className="space-y-1.5">
            <div className="flex justify-between"><Label htmlFor="serp-desc">Description</Label><span className={descTooLong ? "text-destructive text-xs" : "text-muted-foreground text-xs"}>{value.desc.length}/160</span></div>
            <Textarea id="serp-desc" value={value.desc} onChange={(e) => set({ ...value, desc: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {(["desktop", "mobile"] as const).map((d) => (
              <Button key={d} variant={device === d ? "default" : "outline"} size="sm" onClick={() => setDevice(d)} className="capitalize">{d}</Button>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Google preview</CardTitle></CardHeader>
        <CardContent>
          <div className={`rounded-xl border border-border bg-white p-4 ${device === "mobile" ? "max-w-sm" : ""}`}>
            <p className="text-xs text-[#202124]">{crumb}</p>
            <p className="mt-1 text-[18px] leading-snug text-[#1a0dab] hover:underline">
              {titleTooLong ? value.title.slice(0, 60) + "…" : value.title}
            </p>
            <p className="mt-1 text-sm text-[#4d5156]">
              {descTooLong ? value.desc.slice(0, 160) + "…" : value.desc}
            </p>
          </div>
          {(titleTooLong || descTooLong) && (
            <p className="mt-3 text-xs text-amber-600 dark:text-amber-400">⚠ {titleTooLong && "Title"} {titleTooLong && descTooLong && "and "} {descTooLong && "description"} may be truncated by Google.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
