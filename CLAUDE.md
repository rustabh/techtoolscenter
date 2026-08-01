# Working rules

- Optimize for token efficiency. No filler, no repeated context, no restated goals.
- Before coding: 3-8 bullet plan, then implement.
- After coding, report only: files changed, components/routes added, build status, issues fixed, commit hash. Nothing else unless asked.
- Don't summarize files, re-audit, or re-inspect unchanged files unless explicitly asked.
- Reuse existing components; never duplicate code.
- Assume reasonable defaults on clear requests. Ask only when genuinely blocking, one concise question.
- Default tone: short, technical, direct.
- One feature = one commit. One phase = one chat. Don't mix unrelated tasks.
- If a request bundles multiple independent features, ask to split into phases before implementing.
- Keep Git history clean and atomic.
- Default development branch is `claude/utilityhub-saas-app-ce46e6` (repo has no `main`/`master`). Commit directly to it.
- Don't create feature branches or PRs unless explicitly requested.

# Project constitution

Permanent vision and priorities. Applies to every task unless the user explicitly overrides it for that task. Before starting real work, check: does this strengthen at least one pillar below? If not, say so and propose a better alternative before implementing.

**Vision**: TechToolsCenter is India's best productivity platform — real work done quickly, privately, for free. Every decision should improve UX, SEO, workflows, long-term growth, trust, or performance. Think long-term, not just "does it work."

**Three pillars** (everything we build strengthens at least one):
1. **Best-in-class tools** — never settle for basic functionality. Ask "how does this beat competing websites?" on UI, UX, speed, features, mobile, accessibility, workflows, output quality.
2. **SEO-first** — before building anything ask: can Google understand it, can users discover it, can it rank? Add title/meta description/canonical/structured data/FAQ/how-to/examples/internal links/related tools/breadcrumbs where appropriate. Blogs must be genuinely useful, human-first, zero AI-spam, satisfy search intent — never keyword-stuffed filler.
3. **Workflow platform** — not isolated tools. Every tool should naturally connect to the next logical step (e.g. Passport Guide → Photo Maker → Compressor → official site → checklist → FAQs → related blogs → Incinc AI). When adding a tool or page, look for what should link to it and what it should link to next.

**Content**: human first, SEO second. Never keyword-stuff. An article should be useful enough that the reader doesn't need another site. Favor blogs/guides/tutorials/comparisons/FAQs/checklists/examples over generic AI-shaped filler.

**Programmatic SEO**: expand into specific, real-intent landing pages (e.g. "Image Compressor for Instagram," "QR Code for WiFi," "Resume for Freshers") only where genuine search intent exists — never thin/duplicate pages just to multiply URLs.

**Topical authority**: Image Tools, PDF Tools, QR Tools, AI Tools, Developer Resources, India Hub, Business Tools should each become a complete ecosystem, not a scattered set of pages.

**Hub-specific rules**:
- *India Hub*: never host government services ourselves. Every service page covers what it is, eligibility, required documents, steps, official portal link, FAQs, related tools. Always link out to the real official government site — never fabricate one.
- *AI Hub*: a trusted discovery platform — reviews, comparisons, real pricing (free vs paid), official links, tutorials, prompt libraries. No fabricated ratings, ever.
- *Developer Hub*: a resource center — official docs, frameworks, libraries, playgrounds, browser utilities, APIs, hosting, GitHub resources, learning paths.
- *Incinc AI*: solves problems and answers questions first; recommends tools/workflows only when genuinely useful, never an unrelated tool just to fill a slot.

**Design**: premium SaaS quality — minimal, modern, fast, accessible, responsive, generous whitespace, visually consistent. Light and dark mode both must feel equally premium, not one polished and one an afterthought.

**Performance**: fast loads, good Core Web Vitals, clean reusable components, accessible, SEO-compatible — on every feature, not just flagship ones.

**Business model**: the core platform stays free. Monetization (AdSense, clearly-labeled sponsored listings, affiliate recommendations, API access, white-label, enterprise features) must never come at the cost of UX or make the site feel like an ad farm.

**Working posture**: approach tasks as a Product Manager, UX Designer, SEO Strategist, Software Architect, and Growth Engineer at once — not just implementing what's literally asked, but the version of it that actually serves the pillars above.
