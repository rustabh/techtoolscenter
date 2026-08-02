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

const registry: Record<string, ComponentType<{ preset?: Record<string, unknown> }>> = {
  "ai-studio": dynamic(() => import("./ai-studio"), { loading: ToolSkeleton, ssr: false }),
  "invoice-maker": dynamic(() => import("./invoice-maker"), { loading: ToolSkeleton, ssr: false }),
  "quotation-generator": dynamic(() => import("./quotation-generator"), { loading: ToolSkeleton, ssr: false }),
  "estimate-maker": dynamic(() => import("./estimate-maker"), { loading: ToolSkeleton, ssr: false }),
  "purchase-order-generator": dynamic(() => import("./purchase-order-generator"), { loading: ToolSkeleton, ssr: false }),
  "receipt-generator": dynamic(() => import("./receipt-generator"), { loading: ToolSkeleton, ssr: false }),
  "delivery-challan": dynamic(() => import("./delivery-challan"), { loading: ToolSkeleton, ssr: false }),
  "credit-note": dynamic(() => import("./credit-note"), { loading: ToolSkeleton, ssr: false }),
  "debit-note": dynamic(() => import("./debit-note"), { loading: ToolSkeleton, ssr: false }),
  "packing-slip": dynamic(() => import("./packing-slip"), { loading: ToolSkeleton, ssr: false }),
  "letterhead-maker": dynamic(() => import("./letterhead-maker"), { loading: ToolSkeleton, ssr: false }),
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
  "image-studio": dynamic(() => import("./image-studio"), { loading: ToolSkeleton, ssr: false }),
  "image-compressor": dynamic(() => import("./image-compressor"), { loading: ToolSkeleton, ssr: false }),
  "image-converter": dynamic(() => import("./image-converter"), { loading: ToolSkeleton, ssr: false }),
  "image-resizer": dynamic(() => import("./image-resizer"), { loading: ToolSkeleton, ssr: false }),
  "bulk-image-processor": dynamic(() => import("./bulk-image-processor"), { loading: ToolSkeleton, ssr: false }),
  "pdf-studio": dynamic(() => import("./pdf-studio"), { loading: ToolSkeleton, ssr: false }),
  "pdf-merge": dynamic(() => import("./pdf-merge"), { loading: ToolSkeleton, ssr: false }),
  "pdf-split": dynamic(() => import("./pdf-split"), { loading: ToolSkeleton, ssr: false }),
  "pdf-compress": dynamic(() => import("./pdf-compress"), { loading: ToolSkeleton, ssr: false }),
  "percentage-calculator": dynamic(() => import("./percentage-calculator"), { loading: ToolSkeleton, ssr: false }),
  "bmi-calculator": dynamic(() => import("./bmi-calculator"), { loading: ToolSkeleton, ssr: false }),
  "discount-calculator": dynamic(() => import("./discount-calculator"), { loading: ToolSkeleton, ssr: false }),
  "json-formatter": dynamic(() => import("./json-formatter"), { loading: ToolSkeleton, ssr: false }),
  "base64-encoder": dynamic(() => import("./base64-encoder"), { loading: ToolSkeleton, ssr: false }),
  "url-encoder": dynamic(() => import("./url-encoder"), { loading: ToolSkeleton, ssr: false }),
  "uuid-generator": dynamic(() => import("./uuid-generator"), { loading: ToolSkeleton, ssr: false }),
  "hash-generator": dynamic(() => import("./hash-generator"), { loading: ToolSkeleton, ssr: false }),
  "color-converter": dynamic(() => import("./color-converter"), { loading: ToolSkeleton, ssr: false }),
  "timestamp-converter": dynamic(() => import("./timestamp-converter"), { loading: ToolSkeleton, ssr: false }),
  "slug-generator": dynamic(() => import("./slug-generator"), { loading: ToolSkeleton, ssr: false }),
  "lorem-ipsum-generator": dynamic(() => import("./lorem-ipsum-generator"), { loading: ToolSkeleton, ssr: false }),
  "remove-duplicate-lines": dynamic(() => import("./remove-duplicate-lines"), { loading: ToolSkeleton, ssr: false }),
  "favicon-generator": dynamic(() => import("./favicon-generator"), { loading: ToolSkeleton, ssr: false }),
  "website-mockup-generator": dynamic(() => import("./website-mockup-generator"), { loading: ToolSkeleton, ssr: false }),
  "app-screenshot-generator": dynamic(() => import("./app-screenshot-generator"), { loading: ToolSkeleton, ssr: false }),
  "social-media-kit": dynamic(() => import("./social-media-kit"), { loading: ToolSkeleton, ssr: false }),
  "brand-kit-generator": dynamic(() => import("./brand-kit-generator"), { loading: ToolSkeleton, ssr: false }),
  "prompt-generator": dynamic(() => import("./prompt-generator"), { loading: ToolSkeleton, ssr: false }),
  "email-generator": dynamic(() => import("./email-generator"), { loading: ToolSkeleton, ssr: false }),
  "hashtag-generator": dynamic(() => import("./hashtag-generator"), { loading: ToolSkeleton, ssr: false }),
  "blog-outline-generator": dynamic(() => import("./blog-outline-generator"), { loading: ToolSkeleton, ssr: false }),
  "excel-formula-generator": dynamic(() => import("./excel-formula-generator"), { loading: ToolSkeleton, ssr: false }),
  "meta-tags-generator": dynamic(() => import("./meta-tags-generator"), { loading: ToolSkeleton, ssr: false }),
  "schema-generator": dynamic(() => import("./schema-generator"), { loading: ToolSkeleton, ssr: false }),
  "robots-txt-generator": dynamic(() => import("./robots-txt-generator"), { loading: ToolSkeleton, ssr: false }),
  "serp-preview": dynamic(() => import("./serp-preview"), { loading: ToolSkeleton, ssr: false }),
  "keyword-density-checker": dynamic(() => import("./keyword-density-checker"), { loading: ToolSkeleton, ssr: false }),
  "jwt-decoder": dynamic(() => import("./jwt-decoder"), { loading: ToolSkeleton, ssr: false }),
  "gradient-generator": dynamic(() => import("./gradient-generator"), { loading: ToolSkeleton, ssr: false }),
  "cron-expression-helper": dynamic(() => import("./cron-expression-helper"), { loading: ToolSkeleton, ssr: false }),
  "diff-checker": dynamic(() => import("./diff-checker"), { loading: ToolSkeleton, ssr: false }),
  "calculator-hub": dynamic(() => import("./calculator-hub"), { loading: ToolSkeleton, ssr: false }),
  "scientific-calculator": dynamic(() => import("./scientific-calculator"), { loading: ToolSkeleton, ssr: false }),
  "unit-converter": dynamic(() => import("./unit-converter"), { loading: ToolSkeleton, ssr: false }),
  "tip-calculator": dynamic(() => import("./tip-calculator"), { loading: ToolSkeleton, ssr: false }),
  "fuel-cost-calculator": dynamic(() => import("./fuel-cost-calculator"), { loading: ToolSkeleton, ssr: false }),
  "font-style-generator": dynamic(() => import("./font-style-generator"), { loading: ToolSkeleton, ssr: false }),
  "text-decorator": dynamic(() => import("./text-decorator"), { loading: ToolSkeleton, ssr: false }),
  "symbol-library": dynamic(() => import("./symbol-library"), { loading: ToolSkeleton, ssr: false }),
  "emoji-studio": dynamic(() => import("./emoji-studio"), { loading: ToolSkeleton, ssr: false }),
  "reverse-text": dynamic(() => import("./reverse-text"), { loading: ToolSkeleton, ssr: false }),
  "find-and-replace": dynamic(() => import("./find-and-replace"), { loading: ToolSkeleton, ssr: false }),
  "text-cleaner": dynamic(() => import("./text-cleaner"), { loading: ToolSkeleton, ssr: false }),
  "random-number-generator": dynamic(() => import("./random-number-generator"), { loading: ToolSkeleton, ssr: false }),
  "pomodoro-timer": dynamic(() => import("./pomodoro-timer"), { loading: ToolSkeleton, ssr: false }),
  "quick-notes": dynamic(() => import("./quick-notes"), { loading: ToolSkeleton, ssr: false }),
  "screen-ruler": dynamic(() => import("./screen-ruler"), { loading: ToolSkeleton, ssr: false }),
  "contrast-checker": dynamic(() => import("./contrast-checker"), { loading: ToolSkeleton, ssr: false }),
  "color-palette-generator": dynamic(() => import("./color-palette-generator"), { loading: ToolSkeleton, ssr: false }),
  "qr-scanner": dynamic(() => import("./qr-scanner"), { loading: ToolSkeleton, ssr: false }),
  "income-tax-calculator": dynamic(() => import("./income-tax-calculator"), { loading: ToolSkeleton, ssr: false }),
  "ctc-calculator": dynamic(() => import("./ctc-calculator"), { loading: ToolSkeleton, ssr: false }),
  "rent-receipt-generator": dynamic(() => import("./rent-receipt-generator"), { loading: ToolSkeleton, ssr: false }),
  "passport-photo-maker": dynamic(() => import("./passport-photo-maker"), { loading: ToolSkeleton, ssr: false }),
  "image-to-pdf": dynamic(() => import("./image-to-pdf"), { loading: ToolSkeleton, ssr: false }),
  "pdf-to-jpg": dynamic(() => import("./pdf-to-jpg"), { loading: ToolSkeleton, ssr: false }),
  "markdown-converter": dynamic(() => import("./markdown-converter"), { loading: ToolSkeleton, ssr: false }),
  "csv-json-converter": dynamic(() => import("./csv-json-converter"), { loading: ToolSkeleton, ssr: false }),
  "flexbox-generator": dynamic(() => import("./flexbox-generator"), { loading: ToolSkeleton, ssr: false }),
  "grid-generator": dynamic(() => import("./grid-generator"), { loading: ToolSkeleton, ssr: false }),
  "border-radius-generator": dynamic(() => import("./border-radius-generator"), { loading: ToolSkeleton, ssr: false }),
  "box-shadow-generator": dynamic(() => import("./box-shadow-generator"), { loading: ToolSkeleton, ssr: false }),
  "glassmorphism-generator": dynamic(() => import("./glassmorphism-generator"), { loading: ToolSkeleton, ssr: false }),
  "code-playground": dynamic(() => import("./code-playground"), { loading: ToolSkeleton, ssr: false }),
  "tailwind-playground": dynamic(() => import("./tailwind-playground"), { loading: ToolSkeleton, ssr: false }),
  "sitemap-generator": dynamic(() => import("./sitemap-generator"), { loading: ToolSkeleton, ssr: false }),
  "svg-blob-generator": dynamic(() => import("./svg-blob-generator"), { loading: ToolSkeleton, ssr: false }),
  "svg-optimizer": dynamic(() => import("./svg-optimizer"), { loading: ToolSkeleton, ssr: false }),
  "ui-snippets": dynamic(() => import("./ui-snippets"), { loading: ToolSkeleton, ssr: false }),
  "youtube-thumbnail-downloader": dynamic(() => import("./youtube-thumbnail-downloader"), { loading: ToolSkeleton, ssr: false }),
  "cgpa-calculator": dynamic(() => import("./cgpa-calculator"), { loading: ToolSkeleton, ssr: false }),
  "text-to-speech": dynamic(() => import("./text-to-speech"), { loading: ToolSkeleton, ssr: false }),
};

export function ToolRenderer({ slug, preset }: { slug: string; preset?: Record<string, unknown> }) {
  const Cmp = registry[slug];
  if (!Cmp) return <p className="text-muted-foreground">This tool is coming soon.</p>;
  return <Cmp preset={preset} />;
}
