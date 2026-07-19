"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { searchIndiaServices } from "@/lib/india/services";
import { getIndiaCategory } from "@/lib/india/categories";

const EXAMPLES = ["Aadhaar", "PAN Card", "Passport", "Driving Licence", "ABHA", "GST Registration", "EPFO", "eShram", "Ayushman Bharat", "DigiLocker"];

/** Intent-aware search for India Services (understands problems & questions). */
export function IndiaSearch() {
  const [q, setQ] = useState("");
  const results = useMemo(() => searchIndiaServices(q, 8), [q]);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search any service — e.g. 'lost Aadhaar', 'need passport', 'GST registration'"
          aria-label="Search India services"
          className="w-full rounded-2xl border border-border bg-card py-4 pl-12 pr-4 text-sm shadow-sm outline-none focus:border-primary"
        />
      </div>

      {q.trim() ? (
        <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-card text-left shadow-lg">
          {results.length ? (
            results.map((r) => {
              const cat = getIndiaCategory(r.category);
              return (
                <Link key={r.slug} href={`/india-services/${r.category}/${r.slug}`}
                  className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 text-sm last:border-0 hover:bg-secondary">
                  <span><span className="font-medium">{r.name}</span> <span className="text-xs text-muted-foreground">· {cat?.name}</span></span>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                </Link>
              );
            })
          ) : (
            <p className="px-4 py-6 text-center text-sm text-muted-foreground">No services found for “{q}”. Try a different term.</p>
          )}
        </div>
      ) : (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {EXAMPLES.map((e) => (
            <button key={e} onClick={() => setQ(e)}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">
              {e}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
