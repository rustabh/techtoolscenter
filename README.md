# TechToolsCenter

A premium, SaaS-quality collection of **30+ free, privacy-first online tools** — built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion and Lucide icons. Every tool runs **100% client-side**: nothing is ever uploaded to a server.

## Features

- **Premium UI** — minimal, glassmorphism, rounded cards, soft shadows, full light/dark mode, mobile-first & fully responsive.
- **30+ working tools**, each on its own SEO-optimized page with dynamic metadata, breadcrumbs, FAQ, canonical URLs and Schema.org structured data.
- **Client-side everything** — PDF generation (jsPDF), PDF merge/split/compress (pdf-lib), QR (qrcode), barcodes (jsbarcode), image compression (Canvas), calculators and text tools.
- **Local storage** persistence with **Undo / Redo / Reset / Duplicate / Copy / Download** actions.
- **SEO** — dynamic sitemap, robots.txt, web manifest, OpenGraph + Twitter cards, dynamic OG image, JSON-LD (Organization, WebSite, SoftwareApplication, FAQPage, BreadcrumbList).
- **Performance & a11y** — lazy-loaded tools, code splitting, image optimization, keyboard-friendly, ARIA labels, high-contrast theme.
- **AdSense-ready** responsive, layout-safe ad placeholders (no CLS).

## Tools

Invoice Maker · Quotation Generator · Receipt Generator · GST Calculator · Salary Slip Generator · Resume Builder · QR Generator · Barcode Generator · Age Calculator · EMI Calculator · Word Counter · Case Converter · Password Generator · Image Compressor · PDF Merge · PDF Split · PDF Compress

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve production build
```

## Deployment

Zero-config deploy to **Vercel** — import the repo and deploy. Optionally set `NEXT_PUBLIC_SITE_URL` to your production domain so canonical URLs, sitemap and OG tags use it.

## Project structure

```
src/
  app/                 # App Router pages, sitemap, robots, manifest, OG image
    tools/[slug]/      # Dynamic tool pages (metadata + JSON-LD)
    category/[category]/
  components/
    tools/             # One component per tool + registry (lazy-loaded)
    ui/                # Shadcn-style primitives
  hooks/               # useLocalStorage (with undo/redo), useCopy
  lib/                 # tools registry, site config, utils
```

All tool metadata lives in `src/lib/tools.ts` — the single source of truth that drives the homepage, listings, categories, search, sitemap and per-tool SEO.
