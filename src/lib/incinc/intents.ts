import type { AssistantResponse, LinkItem, IntentType } from "./types";
import { getTool } from "@/lib/tools";
import { getAiTool, featuredAiTools, toolsByCategory as aiToolsByCategory } from "@/lib/aihub/tools";
import { aiCategories } from "@/lib/aihub/categories";
import { getDevResource, featuredDevResources } from "@/lib/devhub/resources";
import { getIndiaService, popularIndiaServices, searchIndiaServices } from "@/lib/india/services";
import type { IndiaService } from "@/lib/india/types";
import { lookupGlossaryTerm } from "./glossary";
import { lookupKnowledge } from "./knowledge";
import { searchCatalog } from "./catalog";
import { passportWorkflow, instagramWorkflow, saasStackWorkflow, startBusinessWorkflow } from "./workflows";

function toolLink(slug: string): LinkItem | null {
  const t = getTool(slug);
  if (!t) return null;
  return { label: t.name, href: `/tools/${t.slug}`, kind: "internal", description: t.description };
}

function aiToolLink(slug: string): LinkItem | null {
  const t = getAiTool(slug);
  if (!t) return null;
  return { label: t.name, href: t.officialUrl, kind: "external", description: t.overview, meta: t.pricing };
}

function devResourceLink(slug: string): LinkItem | null {
  const r = getDevResource(slug);
  if (!r) return null;
  return {
    label: r.name,
    href: r.internalToolSlug ? `/tools/${r.internalToolSlug}` : r.officialUrl,
    kind: r.internalToolSlug ? "internal" : "external",
    description: r.description,
    meta: r.pricing,
  };
}

function compact<T>(items: (T | null | undefined)[]): T[] {
  return items.filter((x): x is T => x !== null && x !== undefined);
}

function withIntent(intent: IntentType, response: Omit<AssistantResponse, "intent">): AssistantResponse {
  return { ...response, intent };
}

// ---------------------------------------------------------------------------
// 1. Knowledge Question — company facts + glossary. Answer first, tools only
//    if genuinely useful. Never falls through to a tool search by accident.
// ---------------------------------------------------------------------------

const KNOWLEDGE_PREFIX =
  /^(?:what\s+is|what's|whats|explain|define|tell me (?:more )?about|who\s+is|who\s+founded|who\s+made|who\s+owns|who\s+created|how\s+does)\s+(?:an?\s+)?(.+?)[?.!]*$/i;

function knowledgeIntent(q: string): AssistantResponse | null {
  const prefixMatch = q.match(KNOWLEDGE_PREFIX);
  const extracted = prefixMatch?.[1]?.trim();

  const candidates = compact([extracted, q.split(/\s+/).length <= 4 ? q : null]);

  for (const candidate of candidates) {
    const company = lookupKnowledge(candidate);
    if (company) {
      return withIntent("knowledge", {
        summary: company.answer,
        recommendedTools: company.relatedTools ?? [],
        relatedBlogs: [],
        officialResources: company.officialResources ?? [],
        difficulty: "Beginner",
        nextStep: company.nextStep,
        actions: (company.officialResources ?? []).map((r) => ({ label: r.label, href: r.href, kind: r.kind })),
      });
    }
  }

  if (extracted) {
    const term = lookupGlossaryTerm(extracted);
    if (term) {
      const learnMore: LinkItem | null = term.learnMoreHref
        ? { label: term.learnMoreLabel ?? "Learn more", href: term.learnMoreHref, kind: term.learnMoreHref.startsWith("http") ? "external" : "internal" }
        : null;
      return withIntent("knowledge", {
        summary: term.explanation,
        recommendedTools: compact([learnMore]),
        relatedBlogs: [],
        officialResources: [],
        difficulty: "Beginner",
        actions: compact([learnMore]),
      });
    }
  }

  return null;
}

// ---------------------------------------------------------------------------
// 2. Tool Request — a specific, named task with one clear tool.
// ---------------------------------------------------------------------------

interface FastPath {
  id: string;
  intent: IntentType;
  test: (q: string) => boolean;
  build: (q: string) => AssistantResponse;
}

const fastPaths: FastPath[] = [
  {
    id: "compress-pdf",
    intent: "tool",
    test: (q) => /pdf/.test(q) && /(compress|shrink|smaller|reduce|too\s*(large|big)|under\s*\d+\s*mb)/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Compress your PDF right in the browser — nothing is uploaded to a server.",
        recommendedTools: compact([toolLink("pdf-compress"), toolLink("pdf-studio")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "1-2 minutes",
        difficulty: "Beginner",
        nextStep: "Choose a compression level (Low / Medium / High) and download the smaller file.",
        actions: [{ label: "Open PDF Compress", href: "/tools/pdf-compress", kind: "internal" }],
      }),
  },
  {
    id: "passport-photo",
    intent: "workflow",
    test: (q) => /passport/.test(q) && /(photo|pic|picture|image|photograph)/.test(q),
    build: () => withIntent("workflow", passportWorkflow),
  },
  {
    id: "remove-background",
    intent: "tool",
    test: (q) => /background/.test(q) && /(remove|removal|delete|erase|cut\s*out)/.test(q),
    build: () =>
      withIntent("tool", {
        summary:
          "For a plain / solid background, Image Studio does it free and privately in your browser. For complex backgrounds (people, hair, busy scenes), an AI background remover gives cleaner edges.",
        recommendedTools: compact([toolLink("image-studio"), aiToolLink("remove-bg"), aiToolLink("clipdrop")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "1 minute",
        difficulty: "Beginner",
        nextStep: "Try Image Studio first — it's free and your image never leaves your device.",
        actions: [{ label: "Open Image Studio", href: "/tools/image-studio", kind: "internal" }],
      }),
  },
  {
    id: "invoice",
    intent: "tool",
    test: (q) => /invoice/.test(q),
    build: () => {
      const gst = getIndiaService("gst-registration");
      return withIntent("tool", {
        summary: "Create a GST-compliant invoice in a few clicks — 20 designs with CGST/SGST/IGST breakdown built in.",
        recommendedTools: compact([toolLink("invoice-maker")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "2-3 minutes",
        difficulty: "Beginner",
        nextStep: gst ? "If you're not yet GST-registered, check the GST Registration guide first." : undefined,
        actions: compact([
          { label: "Open Invoice Maker", href: "/tools/invoice-maker", kind: "internal" as const },
          gst ? { label: "Read GST Guide", href: `/india-services/${gst.category}/${gst.slug}`, kind: "internal" as const } : null,
        ]),
      });
    },
  },
  {
    id: "qr-code",
    intent: "tool",
    test: (q) => /\bqr\b/.test(q) || /qr\s*code/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Generate a premium QR code — 22 types, custom shapes, colours and an embedded logo.",
        recommendedTools: compact([toolLink("qr-generator"), toolLink("qr-scanner")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "1 minute",
        difficulty: "Beginner",
        nextStep: "Pick a QR type (URL, Wi-Fi, UPI, vCard...) and customize its look before downloading.",
        actions: [{ label: "Open QR Studio", href: "/tools/qr-generator", kind: "internal" }],
      }),
  },
  {
    id: "react-components",
    intent: "tool",
    test: (q) => /(react component|ui kit|component librar|ui librar)/.test(q),
    build: () => {
      const resources = compact(["21st-dev", "aceternity-ui", "magic-ui", "shadcn-ui", "react-bits"].map(devResourceLink));
      return withIntent("tool", {
        summary: "Ready-made, copy-paste React/Tailwind component libraries — pick based on the visual style you want.",
        recommendedTools: resources,
        relatedBlogs: [],
        officialResources: [],
        difficulty: "Intermediate",
        nextStep: "Shadcn UI is the most common base; the others layer animated/styled components on top of it.",
        actions: [{ label: "Browse Developer Hub", href: "/developer-hub", kind: "internal" }],
      });
    },
  },
  {
    id: "build-website",
    intent: "tool",
    test: (q) => /(build|create|make).*website/.test(q) || /website\s*builder/.test(q),
    build: () =>
      withIntent("tool", {
        summary:
          "If you want a website without writing code, an AI website builder gets you live fastest. If you're building it yourself with code, ask about starting a SaaS instead.",
        recommendedTools: compact([aiToolLink("durable"), aiToolLink("framer-ai"), toolLink("website-mockup-generator")]),
        relatedBlogs: [],
        officialResources: [],
        difficulty: "Beginner",
        nextStep: "Durable and Framer AI can generate a full site from a prompt in minutes.",
        actions: [{ label: "Browse AI Hub: Design", href: "/ai-hub/design", kind: "internal" }],
      }),
  },
  {
    id: "instagram-workflow",
    intent: "workflow",
    test: (q) => /instagram/.test(q),
    build: () => withIntent("workflow", instagramWorkflow),
  },
  {
    id: "build-saas",
    intent: "workflow",
    test: (q) => /saas/.test(q) && /(build|start|launch|create|make)/.test(q),
    build: () => withIntent("workflow", saasStackWorkflow),
  },
  {
    id: "start-business",
    intent: "workflow",
    test: (q) => /(start|open|register|launch).*(business|company|startup|shop|firm)/.test(q),
    build: () => withIntent("workflow", startBusinessWorkflow),
  },
  {
    id: "merge-pdf",
    intent: "tool",
    test: (q) => /pdf/.test(q) && /(merge|combine|join)/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Merge multiple PDFs into one file, in the order you choose — nothing leaves your browser.",
        recommendedTools: compact([toolLink("pdf-merge"), toolLink("pdf-studio")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "1 minute",
        difficulty: "Beginner",
        nextStep: "Drag your PDFs into the order you want before merging.",
        actions: [{ label: "Open PDF Merge", href: "/tools/pdf-merge", kind: "internal" }],
      }),
  },
  {
    id: "split-pdf",
    intent: "tool",
    test: (q) => /pdf/.test(q) && /(split|separate|extract\s*pages?)/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Split a PDF into separate files by page range, or pull out just the pages you need.",
        recommendedTools: compact([toolLink("pdf-split"), toolLink("pdf-studio")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "1 minute",
        difficulty: "Beginner",
        actions: [{ label: "Open PDF Split", href: "/tools/pdf-split", kind: "internal" }],
      }),
  },
  {
    id: "resize-image",
    intent: "tool",
    test: (q) => /resize/.test(q) && /(image|photo|picture|pic)/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Resize an image to exact dimensions or a percentage scale, with the aspect ratio locked so nothing stretches.",
        recommendedTools: compact([toolLink("image-resizer"), toolLink("image-studio")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "1 minute",
        difficulty: "Beginner",
        actions: [{ label: "Open Image Resizer", href: "/tools/image-resizer", kind: "internal" }],
      }),
  },
  {
    id: "convert-image-format",
    intent: "tool",
    test: (q) => !/pdf/.test(q) && (/\b(jpe?g|png|webp|gif|bmp)\b.*\bto\b.*\b(jpe?g|png|webp|gif|bmp)\b/.test(q) || (/convert/.test(q) && /(image|photo|picture)/.test(q))),
    build: () =>
      withIntent("tool", {
        summary: "Convert between JPG, PNG, WebP, GIF and more, in your browser — no upload, no watermark.",
        recommendedTools: compact([toolLink("image-converter"), toolLink("image-studio")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "1 minute",
        difficulty: "Beginner",
        actions: [{ label: "Open Image Converter", href: "/tools/image-converter", kind: "internal" }],
      }),
  },
  {
    id: "emi-calculator",
    intent: "tool",
    test: (q) => /emi/.test(q) || (/loan/.test(q) && /(calculat|monthly|instal)/.test(q)),
    build: () =>
      withIntent("tool", {
        summary: "Calculate your monthly EMI, total interest and full amortization schedule for any loan amount, rate and tenure.",
        recommendedTools: compact([toolLink("emi-calculator")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "1 minute",
        difficulty: "Beginner",
        actions: [{ label: "Open EMI Calculator", href: "/tools/emi-calculator", kind: "internal" }],
      }),
  },
  {
    id: "gst-calculator",
    intent: "tool",
    test: (q) => /gst/.test(q) && /(calculat|add|remove|split|inclusive|exclusive)/.test(q),
    build: () => {
      const gst = getIndiaService("gst-registration");
      return withIntent("tool", {
        summary: "Add or remove GST from an amount, with the CGST/SGST or IGST split shown separately.",
        recommendedTools: compact([toolLink("gst-calculator")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "30 seconds",
        difficulty: "Beginner",
        nextStep: gst ? "Not GST-registered yet? See the GST Registration guide." : undefined,
        actions: compact([
          { label: "Open GST Calculator", href: "/tools/gst-calculator", kind: "internal" as const },
          gst ? { label: "Read GST Registration Guide", href: `/india-services/${gst.category}/${gst.slug}`, kind: "internal" as const } : null,
        ]),
      });
    },
  },
  {
    id: "generate-password",
    intent: "tool",
    test: (q) => /password/.test(q) && /(generat|creat|strong|random|secure)/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Generate a strong, random password with control over length, symbols, numbers and case — created locally, never sent anywhere.",
        recommendedTools: compact([toolLink("password-generator")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "10 seconds",
        difficulty: "Beginner",
        actions: [{ label: "Open Password Generator", href: "/tools/password-generator", kind: "internal" }],
      }),
  },
  {
    id: "build-resume",
    intent: "tool",
    test: (q) => /resume/.test(q) || /\bcv\b/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Build a clean, ATS-friendly resume with ready-made templates — fill in your details and export a polished PDF.",
        recommendedTools: compact([toolLink("resume-builder")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "10-15 minutes",
        difficulty: "Beginner",
        actions: [{ label: "Open Resume Builder", href: "/tools/resume-builder", kind: "internal" }],
      }),
  },
  {
    id: "word-count",
    intent: "tool",
    test: (q) => /word\s*count/.test(q) || (/count/.test(q) && /(word|character)/.test(q)),
    build: () =>
      withIntent("tool", {
        summary: "Get a live word, character, sentence and reading-time count as you write or paste in text.",
        recommendedTools: compact([toolLink("word-counter")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "instant",
        difficulty: "Beginner",
        actions: [{ label: "Open Word Counter", href: "/tools/word-counter", kind: "internal" }],
      }),
  },
  {
    id: "unit-convert",
    intent: "tool",
    test: (q) => !/(image|photo|picture|pdf)/.test(q) && (/unit\s*convert/.test(q) || (/convert/.test(q) && /(cm|kg|km|miles|celsius|fahrenheit|inches|pounds|litre|liter|gallon)/.test(q))),
    build: () =>
      withIntent("tool", {
        summary: "Convert between length, weight, temperature, volume and more — all common unit systems in one place.",
        recommendedTools: compact([toolLink("unit-converter")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "30 seconds",
        difficulty: "Beginner",
        actions: [{ label: "Open Unit Converter", href: "/tools/unit-converter", kind: "internal" }],
      }),
  },
  {
    id: "age-calculator",
    intent: "tool",
    test: (q) => /age/.test(q) && /(calculat|how old)/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Calculate exact age in years, months and days from a date of birth — useful for eligibility checks on age-restricted forms too.",
        recommendedTools: compact([toolLink("age-calculator")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "10 seconds",
        difficulty: "Beginner",
        actions: [{ label: "Open Age Calculator", href: "/tools/age-calculator", kind: "internal" }],
      }),
  },
  {
    id: "generate-barcode",
    intent: "tool",
    test: (q) => /barcode/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Generate a barcode in the standard format you need (CODE128, EAN, UPC and more), ready to download and print.",
        recommendedTools: compact([toolLink("barcode-generator")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "30 seconds",
        difficulty: "Beginner",
        actions: [{ label: "Open Barcode Generator", href: "/tools/barcode-generator", kind: "internal" }],
      }),
  },
];

// ---------------------------------------------------------------------------
// 3. Government Services — resolved against the real India Hub dataset, with
//    official site, required documents and related tools always attached.
// ---------------------------------------------------------------------------

function governmentServiceResponse(service: IndiaService): AssistantResponse {
  const relatedTools = compact((service.relatedTools ?? []).map(toolLink));
  return withIntent("government", {
    summary: `${service.name}: ${service.overview}`,
    recommendedTools: relatedTools,
    requiredDocuments: service.documents,
    relatedBlogs: [],
    officialResources: [{ label: `${service.officialName} (official)`, href: service.officialUrl, kind: "external" }],
    difficulty: "Intermediate",
    estimatedTime: service.processingTime,
    nextStep: service.steps?.[0] ? `First step: ${service.steps[0]}` : undefined,
    actions: [
      { label: "Open India Hub Guide", href: `/india-services/${service.category}/${service.slug}`, kind: "internal" },
      { label: "Visit Official Website", href: service.officialUrl, kind: "external" },
    ],
  });
}

function governmentIntent(q: string): AssistantResponse | null {
  const [top] = searchIndiaServices(q, 1);
  if (!top) return null;
  const service = getIndiaService(top.slug);
  if (!service) return null;
  return governmentServiceResponse(service);
}

// ---------------------------------------------------------------------------
// 4. AI Recommendations — compare tools in a category, with pricing and
//    official links, generalized beyond just "coding".
// ---------------------------------------------------------------------------

function matchAiCategorySlug(term: string): string | null {
  const t = term.toLowerCase().trim();
  const exact = aiCategories.find((c) => c.name.toLowerCase() === t || c.slug === t.replace(/\s+/g, "-"));
  if (exact) return exact.slug;
  const partial = aiCategories.find((c) => t.includes(c.name.toLowerCase()) || c.name.toLowerCase().includes(t));
  return partial?.slug ?? null;
}

function aiRecommendationIntent(q: string): AssistantResponse | null {
  const match = q.match(/(?:best\s+)?ai\s+(?:tools?\s+)?for\s+(.+?)[?.!]*$/);
  if (!match) return null;
  const term = match[1].trim();
  const categorySlug = matchAiCategorySlug(term);

  const tools = categorySlug
    ? aiToolsByCategory(categorySlug)
        .slice()
        .sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0))
        .slice(0, 8)
    : [];

  const recommendedTools: LinkItem[] = tools.length
    ? tools.map((t) => ({ label: t.name, href: t.officialUrl, kind: "external", description: t.overview, meta: t.pricing }))
    : featuredAiTools(6).map((t) => ({ label: t.name, href: t.officialUrl, kind: "external", description: t.overview, meta: t.pricing }));

  return withIntent("ai-recommendation", {
    summary: categorySlug
      ? `The strongest AI tools for ${term}, compared with pricing and official links.`
      : `I don't have a dedicated "${term}" category yet, so here are some standout AI tools from across AI Hub.`,
    recommendedTools,
    relatedBlogs: [],
    officialResources: [],
    difficulty: "Intermediate",
    nextStep: "Most have a free tier — try 2-3 before committing to a paid plan.",
    actions: [{ label: `Compare in AI Hub${categorySlug ? `: ${term}` : ""}`, href: categorySlug ? `/ai-hub/${categorySlug}` : "/ai-hub", kind: "internal" }],
  });
}

// ---------------------------------------------------------------------------
// Quick-start chip browse responses (exact-match shortcuts)
// ---------------------------------------------------------------------------

function browseAiTools(): AssistantResponse {
  const featured = featuredAiTools(6).map((t): LinkItem => ({
    label: t.name, href: t.officialUrl, kind: "external", description: t.overview, meta: t.pricing,
  }));
  return withIntent("ai-recommendation", {
    summary: "AI Hub has 250+ AI tools across chatbots, image/video generation, coding, writing, SEO and more.",
    recommendedTools: featured,
    relatedBlogs: [],
    officialResources: [],
    actions: [{ label: "Open AI Hub", href: "/ai-hub", kind: "internal" }],
  });
}

function browseGovernmentHelp(): AssistantResponse {
  const popular = popularIndiaServices().slice(0, 6).map((s): LinkItem => ({
    label: s.name, href: `/india-services/${s.category}/${s.slug}`, kind: "internal", description: s.overview,
  }));
  return withIntent("government", {
    summary: "India Hub covers identity documents, certificates, GST/business, vehicles and travel — with official links and required documents for each.",
    recommendedTools: popular,
    relatedBlogs: [],
    officialResources: [],
    actions: [{ label: "Open India Hub", href: "/india-services", kind: "internal" }],
  });
}

function browseDeveloperResources(): AssistantResponse {
  const featured = featuredDevResources(6).map((r): LinkItem => ({
    label: r.name,
    href: r.internalToolSlug ? `/tools/${r.internalToolSlug}` : r.officialUrl,
    kind: r.internalToolSlug ? "internal" : "external",
    description: r.description,
    meta: r.pricing,
  }));
  return withIntent("tool", {
    summary: "Developer Hub curates component libraries, UI kits, hosting, databases, testing tools and more.",
    recommendedTools: featured,
    relatedBlogs: [],
    officialResources: [],
    actions: [{ label: "Open Developer Hub", href: "/developer-hub", kind: "internal" }],
  });
}

// ---------------------------------------------------------------------------
// Fallback — generic catalog search, only reached once every specific
// intent has been ruled out. Never a dead end.
// ---------------------------------------------------------------------------

function fallbackSearch(q: string): AssistantResponse {
  const results = searchCatalog(q, 6);
  if (!results.length) {
    return withIntent("fallback", {
      summary:
        "I couldn't find an exact match for that. Try describing the outcome you want — for example \"compress a PDF\", \"remove image background\", or \"best AI for coding\".",
      recommendedTools: [],
      relatedBlogs: [],
      officialResources: [],
      actions: [
        { label: "Browse All Tools", href: "/tools", kind: "internal" },
        { label: "Open AI Hub", href: "/ai-hub", kind: "internal" },
      ],
    });
  }
  const recommendedTools = results
    .filter((r) => r.source === "tool" || r.source === "ai-tool" || r.source === "dev-resource")
    .map((r): LinkItem => ({ label: r.title, href: r.href, kind: r.kind, description: r.description, meta: r.meta }));
  const relatedBlogs = results
    .filter((r) => r.source === "blog" || r.source === "update")
    .map((r): LinkItem => ({ label: r.title, href: r.href, kind: r.kind, description: r.description }));
  const officialResources = results
    .filter((r) => r.source === "india-service" || r.source === "scheme")
    .map((r): LinkItem => ({ label: r.title, href: r.href, kind: r.kind, description: r.description }));

  return withIntent("fallback", {
    summary: `Here's what I found across TechToolsCenter for "${q}".`,
    recommendedTools,
    relatedBlogs,
    officialResources,
    actions: [],
  });
}

/** Number of deterministic fast-path intents registered — used by the internal dashboard as an intent-coverage signal. */
export function fastPathCount(): number {
  return fastPaths.length;
}

// ---------------------------------------------------------------------------
// Classification entry point — Knowledge is checked first so the assistant
// never defaults to tool-spam for a question that just wants an answer.
// ---------------------------------------------------------------------------

export function resolveIntent(rawQuery: string): AssistantResponse {
  const q = rawQuery.trim().toLowerCase();

  if (q === "ai tools") return browseAiTools();
  if (q === "government help") return browseGovernmentHelp();
  if (q === "developer resources") return browseDeveloperResources();

  const knowledge = knowledgeIntent(q);
  if (knowledge) return knowledge;

  for (const path of fastPaths) {
    if (path.test(q)) return path.build(q);
  }

  const ai = aiRecommendationIntent(q);
  if (ai) return ai;

  const government = governmentIntent(q);
  if (government) return government;

  return fallbackSearch(q);
}
