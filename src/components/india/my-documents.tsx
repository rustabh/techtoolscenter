"use client";

import Link from "next/link";
import { Trash2, ArrowRight, FolderOpen, ExternalLink } from "lucide-react";
import { useIndiaSaved } from "@/hooks/use-india-saved";
import { getIndiaService } from "@/lib/india/services";

export function MyDocuments() {
  const { store, savedSlugs, toggleDoc, remove } = useIndiaSaved();

  if (savedSlugs.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-dashed border-border bg-secondary/30 p-10 text-center">
        <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-accent text-accent-foreground">
          <FolderOpen className="size-6" />
        </div>
        <h2 className="mt-4 font-semibold">Your checklist is empty</h2>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
          Open any India service and tap <span className="font-medium text-foreground">“Save to My Documents”</span> to
          start a personal checklist of what you need to collect.
        </p>
        <Link href="/india-services" className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          Browse India Services <ArrowRight className="size-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10 space-y-6">
      {savedSlugs.map((slug) => {
        const svc = getIndiaService(slug);
        if (!svc) return null;
        const entry = store[slug];
        const checked = new Set(entry?.checked ?? []);
        const done = svc.documents.filter((d) => checked.has(d)).length;
        const total = svc.documents.length;
        const pct = total ? Math.round((done / total) * 100) : 0;

        return (
          <section key={slug} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <Link href={`/india-services/${svc.category}/${svc.slug}`} className="font-semibold hover:text-primary">
                  {svc.name}
                </Link>
                <p className="mt-0.5 text-xs text-muted-foreground">{svc.officialName}</p>
              </div>
              <button
                onClick={() => remove(slug)}
                aria-label={`Remove ${svc.name}`}
                className="shrink-0 rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

            {/* Progress */}
            <div className="mt-4 flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
              </div>
              <span className="text-xs font-medium tabular-nums text-muted-foreground">{done}/{total}</span>
            </div>

            {/* Document checklist */}
            <ul className="mt-4 space-y-2">
              {svc.documents.map((doc) => {
                const isChecked = checked.has(doc);
                return (
                  <li key={doc}>
                    <label className="flex cursor-pointer items-start gap-3 text-sm">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleDoc(slug, doc)}
                        className="mt-0.5 size-4 shrink-0 accent-[var(--primary,#0d9f6e)]"
                      />
                      <span className={isChecked ? "text-muted-foreground line-through" : ""}>{doc}</span>
                    </label>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 flex items-center gap-3">
              <Link href={`/india-services/${svc.category}/${svc.slug}`} className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                Open full guide <ArrowRight className="size-3" />
              </Link>
              <a href={svc.officialUrl} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground">
                Official site <ExternalLink className="size-3" />
              </a>
            </div>
          </section>
        );
      })}
    </div>
  );
}
