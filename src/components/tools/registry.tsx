"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

function ToolSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-10 w-1/3 skeleton" />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-64 skeleton rounded-2xl" />
        <div className="h-64 skeleton rounded-2xl" />
      </div>
    </div>
  );
}

const registry: Record<string, ComponentType> = {
  "invoice-maker": dynamic(() => import("./invoice-maker"), { loading: ToolSkeleton, ssr: false }),
  "quotation-generator": dynamic(() => import("./quotation-generator"), { loading: ToolSkeleton, ssr: false }),
  "receipt-generator": dynamic(() => import("./receipt-generator"), { loading: ToolSkeleton, ssr: false }),
  "gst-calculator": dynamic(() => import("./gst-calculator"), { loading: ToolSkeleton, ssr: false }),
  "salary-slip-generator": dynamic(() => import("./salary-slip-generator"), { loading: ToolSkeleton, ssr: false }),
  "resume-builder": dynamic(() => import("./resume-builder"), { loading: ToolSkeleton, ssr: false }),
  "qr-generator": dynamic(() => import("./qr-generator"), { loading: ToolSkeleton, ssr: false }),
  "barcode-generator": dynamic(() => import("./barcode-generator"), { loading: ToolSkeleton, ssr: false }),
  "age-calculator": dynamic(() => import("./age-calculator"), { loading: ToolSkeleton, ssr: false }),
  "emi-calculator": dynamic(() => import("./emi-calculator"), { loading: ToolSkeleton, ssr: false }),
  "word-counter": dynamic(() => import("./word-counter"), { loading: ToolSkeleton, ssr: false }),
  "case-converter": dynamic(() => import("./case-converter"), { loading: ToolSkeleton, ssr: false }),
  "password-generator": dynamic(() => import("./password-generator"), { loading: ToolSkeleton, ssr: false }),
  "image-compressor": dynamic(() => import("./image-compressor"), { loading: ToolSkeleton, ssr: false }),
  "pdf-merge": dynamic(() => import("./pdf-merge"), { loading: ToolSkeleton, ssr: false }),
  "pdf-split": dynamic(() => import("./pdf-split"), { loading: ToolSkeleton, ssr: false }),
  "pdf-compress": dynamic(() => import("./pdf-compress"), { loading: ToolSkeleton, ssr: false }),
};

export function ToolRenderer({ slug }: { slug: string }) {
  const Cmp = registry[slug];
  if (!Cmp) return <p className="text-muted-foreground">This tool is coming soon.</p>;
  return <Cmp />;
}
