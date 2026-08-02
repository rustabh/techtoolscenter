"use client";

import { useMemo, useState } from "react";
import { Code2, Copy, Check, Download } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { snippets } from "@/lib/ui-snippets-data";
import { uiSnippetCategories } from "@/lib/ui-snippets";
import { downloadBlob } from "@/lib/utils";

function frame(css: string, html: string) {
  return `<!doctype html><html><head><style>
    * { box-sizing: border-box; }
    body { margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: system-ui, sans-serif; background: #f8fafc; padding: 24px; }
    @media (prefers-color-scheme: dark) { body { background: #0f172a; } }
    ${css}
  </style></head><body>${html}</body></html>`;
}

function SnippetCard({ name, html, css }: { name: string; html: string; css: string }) {
  const [open, setOpen] = useState(false);
  const { copied, copy } = useCopy();
  const combined = useMemo(() => `<style>\n${css}\n</style>\n\n${html}`, [html, css]);

  return (
    <Card className="overflow-hidden">
      <iframe
        title={name}
        sandbox=""
        srcDoc={frame(css, html)}
        className="h-56 w-full border-0 bg-secondary/20"
      />
      <CardContent className="space-y-3 pt-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold tracking-tight">{name}</h3>
          <div className="flex gap-1.5">
            <Button type="button" size="sm" variant="outline" onClick={() => setOpen((o) => !o)}>
              <Code2 className="size-3.5" /> {open ? "Hide code" : "View code"}
            </Button>
            <Button type="button" size="sm" onClick={() => copy(combined)} aria-label="Copy code">
              {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
            </Button>
            <Button type="button" size="sm" variant="outline" aria-label="Download as HTML file"
              onClick={() => downloadBlob(new Blob([frame(css, html)], { type: "text/html" }), `${name.toLowerCase().replace(/\s+/g, "-")}.html`)}>
              <Download className="size-3.5" />
            </Button>
          </div>
        </div>
        {open && (
          <pre className="max-h-72 overflow-auto rounded-xl bg-secondary/50 p-3 font-mono text-xs leading-relaxed">
            {combined}
          </pre>
        )}
      </CardContent>
    </Card>
  );
}

export default function UiSnippets() {
  const [cat, setCat] = useState<string>(uiSnippetCategories[0]);
  const filtered = useMemo(() => snippets.filter((s) => s.category === cat), [cat]);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <p className="text-sm text-muted-foreground">
            Ready-made buttons, toggles, sliders, cards and more — pick a category, preview it live, and copy the
            HTML + CSS straight into your project. No sign-up, nothing sent to a server.
          </p>
          <div className="flex flex-wrap gap-2">
            {uiSnippetCategories.map((c) => (
              <Button key={c} type="button" size="sm" variant={cat === c ? "default" : "outline"} aria-pressed={cat === c} onClick={() => setCat(c)}>
                {c}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">No snippets in this category yet — try another one above.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <SnippetCard key={s.id} name={s.name} html={s.html} css={s.css} />
          ))}
        </div>
      )}
    </div>
  );
}
