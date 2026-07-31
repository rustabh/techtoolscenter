# TechToolsCenter — Full Platform Audit

_Verified engineering, SEO, security, and architecture audit · no code changed_

Branch: `claude/techtoolscenter-audit-dqsjko` · Next.js 15.5.20 · React 19 · 488 static pages generated at build

This report replaces the previous `PROJECT_REPORT.md`. That version read as marketing
copy (unverifiable "estimated" Lighthouse scores, a tool count that didn't match the
code). Everything below was checked directly: a fresh `npm install`, `npx tsc --noEmit`,
`npm run lint`, `npm run build`, and `npm audit` were run in this session, and every
number is either read from that build output or cross-checked against the source file
it comes from.

## Executive summary

TechToolsCenter is a genuinely well-built, single-purpose product: a client-side,
privacy-first tools catalogue on Next.js 15 / React 19 / TypeScript, with a large
programmatic-SEO layer (India government-services hub, blog, collections) on top. The
build compiles cleanly, there are **zero TypeScript errors** and **zero lint
warnings** across the entire `src/` tree, and the tool-registration pattern is
consistent for all 80 tools.

The real issues are concentrated in four places:

1. **A fabricated SEO signal shipped on every tool page** — a hardcoded 4.8-star /
   128-review rating with no underlying data (`src/lib/seo/schema.ts:85`). Real
   Google rich-result risk.
2. **An outdated Next.js with 6 known vulnerabilities** (1 critical, 4 high) already
   fixed upstream — `npm audit fix` away from resolved.
3. **A server-side fetch endpoint with no private-IP guard** (`src/app/api/site-meta/route.ts`)
   — SSRF-adjacent.
4. **Small but real duplication** in file-upload UI and byte-formatting logic across
   the tools that handle files.

None of these require a rewrite.

## Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 15.5.20 | App Router, SSG-first |
| UI runtime | React 19.0.0 | Most tools are `ssr:false` client components |
| Language | TypeScript 5.7.3 | `strict: true`, zero errors |
| Styling | Tailwind CSS 3.4.17 | shadcn/ui-style HSL token system, `cva` + `tailwind-merge`, class-based dark mode |
| Motion | Framer Motion 12.x | Reveals, accordion, toaster |
| Document/export | pdf-lib, jspdf + autotable, pdfjs-dist, jszip, html-to-image, qrcode, qr-code-styling, jsbarcode | All dynamically imported at call time |
| Theming | next-themes 0.4.4 | System/light/dark |
| Persistence | Browser `localStorage` only | No database, no auth, no backend except one API route |

**Dependency freshness:** Next.js is behind stable (15.5.20 vs. 16.2.12 available),
React behind the 19.2 line, Tailwind 3.4 vs. an available 4.x, TypeScript 5.7 vs. 7.0.
Normal drift, not urgent on its own — but it's the direct cause of the vulnerability
count below.

## Folder structure

| Path | Contents |
|---|---|
| `src/app/` | Routes only. 60+ segments including 5 hand-rolled XML sitemap routes and 4 `opengraph-image.tsx` generators. |
| `src/components/tools/` | 86 files: 80 registered tool UIs + 2 shared internal modules (`business-studio.tsx`, `calc-modules.tsx`) + 4 page-chrome components. |
| `src/components/ui/` | 10 shadcn-style primitives. |
| `src/components/{home,india,blog,community,updates,stats,seo,pwa,files,ads,landing}/` | One folder per product surface. |
| `src/lib/` | All content and domain logic: `tools.ts` (1,377 lines), `seo/`, `india/`, `blog/`, `community/`, `updates/`, `ai/`, `search/`, `home/`, `stats/`, `saved.ts`, `utils.ts`. |
| `src/hooks/` | 5 hooks — see Duplication below for actual reuse. |

No `src/types/` sprawl, no circular-dependency smell, no orphaned folders. The
structure scales fine; strain shows up inside individual files, not the layout.

## Routing & content scale

All counts read from the actual `npm run build` output (488/488 pages) or the source array.

| Route | Static pages | Source |
|---|---:|---|
| `/tools/[slug]` | 148 | `lib/tools.ts` (80) + `lib/landing/landing.ts` non-colliding slugs (~68 programmatic-SEO landing pages reusing the same 80 components) |
| `/india-services/[category]/[service]` | 37 | `lib/india/services.ts` |
| `/india-services/city/[city]` | 26 | `lib/india/cities.ts` |
| `/india-services/state/[state]` | 15 | `lib/india/states.ts` |
| `/india-services/schemes/[scheme]` | 17 | `lib/india/schemes.ts` |
| `/india-services/[category]` | 14 | category index pages |
| `/hi/india-services/[service]` | 22 | `lib/india/hindi.ts` — subset of the 37 |
| `/collections/[slug]` | 14 | `lib/collections.ts` |
| `/category/[category]` | 11 | tool-category index pages |
| `/blog/[slug]` | 17 | `lib/blog/posts.ts` |
| `/blog/category`, `/blog/author`, `/blog/page` | 11 | 6 categories + 2 authors + 3 pagination pages |
| `/updates/[slug]` + `/updates/category/[slug]` | 31 | 23 updates + 8 categories |
| `opengraph-image.tsx` (dynamic) | 95 | service + city + state + scheme OG images |

Only `/api/site-meta` and the root `/opengraph-image` are genuinely dynamic (`ƒ`).
Every other page — all 488 — is prerendered at build time.

## Tool architecture

`src/lib/tools.ts` is a single well-typed `Tool` interface; `src/components/tools/registry.tsx`
maps every slug to a `next/dynamic` import with `{ ssr:false, loading: ToolSkeleton }`.
Verified by diffing both slug lists directly — every tool has exactly one registry
entry and vice versa. No orphaned metadata, no unregistered tool.

- **Registry is hand-maintained boilerplate, not a helper function.** 105 lines, one
  `dynamic(...)` call per tool with the identical options object repeated 80 times
  (`registry.tsx:18-99`). Not broken today, but error-prone to hand-edit past a few
  hundred tools.
- **Near-identical document tools are correctly centralized (good pattern).**
  Invoice/credit-note/debit-note/delivery-challan/packing-slip/quotation/estimate/
  purchase-order/receipt are each a 7–10 line wrapper around one 752-line
  `BusinessStudio` component with a `lockKind` prop. Calculators follow the same idea
  via `calc-modules.tsx`. This is the opposite of the duplication problem below.

## Design system

`src/components/ui/*` is a consistent, genuinely shadcn/ui-shaped set: every primitive
uses `React.forwardRef` + `cn()` (clsx + tailwind-merge) + `cva` variants, and
button/input/textarea/select all apply the same `focus-visible:ring-2
focus-visible:ring-ring` treatment. Color tokens are CSS-variable-driven HSL values
with class-based dark mode — a proper token system, not scattered Tailwind colors.

`accordion.tsx` and `toaster.tsx` are hand-rolled (Framer Motion + a small custom
event bus) rather than the forwardRef/cva pattern — reasonable since they're
self-contained, but the one inconsistency in an otherwise uniform system.

## Duplication & dead code

- **Drag-and-drop dropzone markup copy-pasted across 6+ files** — identical
  className string and `UploadCloud` icon block, no shared `<FileDropzone>`
  component, despite a `FileDropProvider` already existing globally. Files:
  `image-converter.tsx:78`, `image-resizer.tsx:81`, `pdf-merge.tsx:56`,
  `pdf-split.tsx:68`, `image-compressor.tsx:103-110`, `bulk-image-processor.tsx:128`.
- **`formatBytes()` reimplemented independently 4 times** — `image-compressor.tsx:12`,
  `image-converter.tsx:18`, `image-resizer.tsx:24`, `pdf-compress.tsx:12`. Obvious
  candidate for `src/lib/utils.ts`.
- **Three different PDF libraries for three PDF tools** — `pdf-merge.tsx`/`pdf-split.tsx`
  use `pdf-lib`; `pdf-compress.tsx` uses `pdfjs-dist` + `jspdf`. No shared PDF utility
  module.
- **Two competing conventions for the same UI job** — `action-bar.tsx` is imported by
  only ~23 of 80 tools; the rest hand-roll copy/download buttons inline.
- **No genuinely dead code found.** `samples.ts`, `confetti.ts`, `bulk/engine.ts`, and
  `file-drop-provider.tsx` were checked specifically — all have live importers. No
  `.tsx` file under `components/tools/` is missing from the registry beyond the two
  intentionally-internal shared modules.

## Build, types & lint — verified, not estimated

- `npx tsc --noEmit` → **0 errors**, strict mode, full project.
- `npm run lint` → **0 warnings/errors**. Note: `next lint` is deprecated as of
  Next 15.5 and removed in Next 16 — migrate to the ESLint CLI
  (`npx @next/codemod@canary next-lint-to-eslint-cli .`) before that upgrade.
- `npm run build` → compiles, **488/488 pages** generated.
- **One real build warning:** "Using edge runtime on a page currently disables
  static generation for that page," traced to the root OG image only
  (`src/app/opengraph-image.tsx:4`, `export const runtime = "edge"`). Every
  India-services OG image generator correctly uses the default runtime and
  statically generates; the root one opts into edge for no apparent reason (no
  params, no data fetch).

## SEO & metadata

The infrastructure is unusually thorough for a project this size — five sitemaps,
per-route `generateMetadata`, dynamic OG images, correct Hindi hreflang. The problems
are in the content layer on top of it, and one fabricated data point.

- **Every tool page emits a fabricated aggregate rating** (critical). The JSON-LD for
  all 80 tools hardcodes `aggregateRating: { ratingValue: "4.8", ratingCount: "128" }`
  — identical on every page, no real review data anywhere in the codebase. Google's
  structured-data guidelines require rating snippets to reflect genuine ratings; this
  is a manual-action / rich-result-suppression risk across the whole catalogue.
  `src/lib/seo/schema.ts:85`.
- **Templated How-To/Tips/FAQ content repeats within each category** (thin-content
  risk). Content is keyed per category (11 categories), not per tool — any tool
  without an override renders the same boilerplate as its siblings with only the name
  substituted. The generic-FAQ fallback used to pad any tool to 8 FAQs is near-identical
  wording everywhere it's used. `src/lib/seo/content.ts:19-142`, `:212-224`.
- **Five sitemaps overlap almost entirely, no sitemap index.** `sitemap.ts` already
  contains full tool/blog/collection routes; `tools-sitemap.xml`, `blog-sitemap.xml`,
  `collections-sitemap.xml`, `image-sitemap.xml` regenerate near-identical sets
  independently. Real gap: `blog-sitemap.xml` includes `/blog/author/[slug]` routes
  that `sitemap.ts`'s own blog list omits — author pages are discoverable only
  through the redundant file. `src/app/sitemap.ts:56-69`,
  `src/app/blog-sitemap.xml/route.ts:13`.
- **No OG image for several secondary route types** — category index, collections,
  blog posts, blog category/author, and updates pages have no `openGraph.images` and
  no dedicated `opengraph-image.tsx`; they fall back to the generic root image, so
  social shares for all of these look identical.
- **Hindi/English hreflang correctly bidirectional (good).** Both
  `/india-services/[category]/[service]` and `/hi/india-services/[service]` set
  `alternates.languages` pointing at each other. No duplicate-content risk from the
  localization. 22 of 37 services translated so far.

## Accessibility & mobile responsiveness

- **Form labels rarely wired to inputs programmatically.** `<Label>` is used 154
  times across tool files but paired with `htmlFor` in only 7 files.
- **Icon-only buttons mostly missing `aria-label`.** 53 of 86 tool files have zero
  `aria-label` occurrences. 66 raw `<button>` elements also don't specify
  `type="button"` — a latent risk anywhere a tool nests controls inside a `<form>`.
- **Before/after image slider is mouse-only.** `CompareSlider` (used by
  image-compressor/resizer/converter) has no `role`, `tabIndex`, or `onKeyDown` — not
  keyboard-operable.
- **Genuinely mobile-first layout (good).** Base classes are already single-column;
  responsive prefixes are used to *expand* to multi-column, the correct idiom. Navbar
  has a proper `md:hidden` hamburger with `aria-expanded`/`aria-label`.

## Security

- **Outdated Next.js carries 6 known vulnerabilities (1 critical, 4 high)** —
  confirmed via `npm audit --omit=dev`: DoS in Server Actions, SSRF in Server Actions
  on custom servers, cache confusion of response bodies (two variants), unbounded
  Server Action payload on Edge, SSRF via rewrites, DoS in Image Optimization via
  SVGs, unauthenticated disclosure of internal Server Function endpoints — plus
  inherited high-severity issues in bundled `postcss` and `sharp`. Already patched
  upstream; `npm audit fix` away from resolved.
- **`/api/site-meta` fetches attacker-controlled URLs server-side with no
  private-IP guard** (SSRF-adjacent). `normalizeUrl()` only checks the protocol is
  http/https — nothing blocks `127.0.0.1`, `169.254.169.254` (cloud metadata), or
  RFC1918 ranges, before a full server-side `fetch(target, …)`. The route also fetches
  the target's favicon/OG-image/apple-icon and proxies them back as base64.
  Mitigating factors: Node runtime, 6–8s timeouts, image proxy capped to
  `content-type: image/*` under 2MB. Practical impact is internal-network probing /
  minor DoS rather than data exfiltration, but add a hostname/IP blocklist before this
  sees more traffic. `src/app/api/site-meta/route.ts:6-14`, `:47-51`, `:24-36`.
- **No XSS surface, no `eval`, no committed secrets (clean).** All
  `dangerouslySetInnerHTML` usages are `JSON.stringify(...)` into `application/ld+json`
  script tags — safe. Blog content renders through a typed `Block[]` renderer, not raw
  HTML. No `.env` files or hardcoded API keys/tokens in the repo.
- **Consent banner disables GA client-side but doesn't gate the script mount**
  (minor). Declining sets `ga-disable-<ID>=true`, but the GA `<Script>` still mounts
  via `afterInteractive` regardless of the user's choice.

## Performance

Shared First Load JS is **104 kB**; homepage 260 kB, most tool pages 150–190 kB. Every
tool is a `next/dynamic` import with `ssr:false`, and every heavy library (jspdf,
jszip, qrcode, jsbarcode, html-to-image, qr-code-styling, pdf-lib, pdfjs-dist) is
imported at call time, never in a shared chunk. Combined with all 488 pages being
static HTML, this is a strong, deliberate performance architecture.

`public/sw.js` is hand-written and well-reasoned: skips non-GET and cross-origin
requests, explicitly excludes `/api/*` from caching, uses network-first (not
cache-first) for HTML navigations with an offline fallback — avoiding stale-app-shell
bugs after a deploy.

**No Lighthouse run exists anywhere in this repo's history.** The prior report's
"Lighthouse (estimated): ~90–97" was explicitly stated as an architecture-based guess,
not measured. Given the bundle numbers above, an actual run would likely score well —
but it should be run against the live deploy before being stated as fact anywhere
external-facing.

## Feature inventory & what's missing

| Surface | What it actually does |
|---|---|
| Tools catalogue | 80 real tools + ~68 keyword-targeted landing pages reusing the same components |
| Collections | 14 curated tool groupings |
| India Services hub | 37 services, 17 schemes, 26 cities, 15 states, 22 Hindi translations. Informational/directory content — **not** live status checking against real government APIs, despite file names like `status-checks.ts`/`finder.ts` |
| Blog | 17 posts through a custom typed block renderer, not raw HTML/CMS |
| Community | Feature-request/bug/idea board — submissions are **localStorage-only**, merged client-side with a static seed array; invisible across browsers/devices |
| Dashboard/workspace | Favorites, history, saved projects/QR/mockups/brand-kits, downloads — entirely `localStorage` (`saved.ts`), capped at 60 items, no account, no cross-device sync |
| Updates feed | 23 entries across 8 categories |
| "AI Studio" | **Confirmed stub**, not a real LLM integration — `lib/ai/providers.ts` ships only a `localProvider` running a deterministic template/regex generator client-side, no API key, no network call, no AI backend route exists |

**Structural gap underlying most of the above:** no database, no CMS, no auth
anywhere. All content lives in TypeScript files under `src/lib/` and requires a code
change + rebuild to update. Fine at the current volume, but an editorial bottleneck
if content velocity increases, and the reason community posts and the workspace can't
sync across devices.

## Prioritized punch list

Ranked by impact × how cheap the fix is. Nothing here requires a rewrite.

1. **Remove the fabricated `aggregateRating`** from tool schema — real rich-result
   risk on all 80 pages, one-line fix in `schema.ts:85`.
2. **Run `npm audit fix` / upgrade Next.js** — closes 1 critical + 4 high CVEs already
   patched upstream.
3. **Add a private-IP/hostname blocklist to `/api/site-meta`** — closes the
   SSRF-adjacent gap.
4. **Drop `edge` runtime from the root `opengraph-image.tsx`** — restores static
   generation, matches every other OG image generator.
5. **Extract a shared `<FileDropzone>` and one `formatBytes()`** — removes 6+ and 4
   duplicated implementations.
6. **Wire `htmlFor`/`id` pairs and `aria-label`s on icon-only buttons** — highest-leverage
   accessibility fix, mechanical not architectural.
7. **Collapse the 5 sitemaps into one indexed set**, add missing author routes to the
   primary sitemap.
8. **Differentiate category-level generated SEO content per tool** (or accept fewer,
   better tool pages) — addresses the thin-content risk.
9. **Run an actual Lighthouse pass** against the live deploy, replace estimated scores.
10. **Decide the CMS/backend question deliberately** before community or workspace
    features grow further.
