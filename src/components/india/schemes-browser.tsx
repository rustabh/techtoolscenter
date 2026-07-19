"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { schemes, schemeAudiences } from "@/lib/india/schemes";
import { cn } from "@/lib/utils";

export function SchemesBrowser() {
  const [audience, setAudience] = useState<string | null>(null);
  const list = audience ? schemes.filter((s) => s.audiences.includes(audience)) : schemes;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setAudience(null)}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            audience === null ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary/40"
          )}
        >
          All schemes
        </button>
        {schemeAudiences.map((a) => (
          <button
            key={a.slug}
            onClick={() => setAudience(a.slug)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              audience === a.slug ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary/40"
            )}
          >
            <span>{a.icon}</span> {a.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {list.map((s) => (
          <Link
            key={s.slug}
            href={`/india-services/schemes/${s.slug}`}
            className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
          >
            <h3 className="font-semibold group-hover:text-primary">{s.name}</h3>
            <p className="mt-1 flex-1 text-sm text-muted-foreground">{s.tagline}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
              View scheme <ArrowRight className="size-3" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
