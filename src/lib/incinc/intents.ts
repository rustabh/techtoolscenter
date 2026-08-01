import type { AssistantResponse, LinkItem } from "./types";
import { getTool } from "@/lib/tools";
import { getAiTool, featuredAiTools } from "@/lib/aihub/tools";
import { getDevResource, featuredDevResources } from "@/lib/devhub/resources";
import { getIndiaService, popularIndiaServices } from "@/lib/india/services";
import { lookupGlossaryTerm } from "./glossary";
import { searchCatalog } from "./catalog";
import { passportWorkflow, instagramWorkflow, saasStackWorkflow } from "./workflows";

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

function indiaServiceLink(slug: string): LinkItem | null {
  const s = getIndiaService(slug);
  if (!s) return null;
  return { label: s.name, href: `/india-services/${s.category}/${s.slug}`, kind: "internal", description: s.overview };
}

function compact<T>(items: (T | null)[]): T[] {
  return items.filter((x): x is T => x !== null);
}

interface FastPath {
  id: string;
  test: (q: string) => boolean;
  build: (q: string) => AssistantResponse;
}

const fastPaths: FastPath[] = [
  {
    id: "compress-pdf",
    test: (q) => /pdf/.test(q) && /(compress|shrink|smaller|reduce|too\s*(large|big)|under\s*\d+\s*mb)/.test(q),
    build: () => {
      const pdfCompress = toolLink("pdf-compress");
      const pdfStudio = toolLink("pdf-studio");
      return {
        summary: "Compress your PDF right in the browser — nothing is uploaded to a server.",
        recommendedTools: compact([pdfCompress, pdfStudio]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "1-2 minutes",
        difficulty: "Beginner",
        nextStep: "Choose a compression level (Low / Medium / High) and download the smaller file.",
        actions: pdfCompress ? [{ label: "Open PDF Compress", href: pdfCompress.href, kind: "internal" }] : [],
      };
    },
  },
  {
    id: "passport-photo",
    test: (q) => /passport/.test(q) && /(photo|pic|picture|image|photograph)/.test(q),
    build: () => passportWorkflow,
  },
  {
    id: "remove-background",
    test: (q) => /background/.test(q) && /(remove|removal|delete|erase|cut\s*out)/.test(q),
    build: () => {
      const imageStudio = toolLink("image-studio");
      const removeBg = aiToolLink("remove-bg");
      const clipdrop = aiToolLink("clipdrop");
      return {
        summary:
          "For a plain / solid background, Image Studio does it free and privately in your browser. For complex backgrounds (people, hair, busy scenes), an AI background remover gives cleaner edges.",
        recommendedTools: compact([imageStudio, removeBg, clipdrop]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "1 minute",
        difficulty: "Beginner",
        nextStep: "Try Image Studio first — it's free and your image never leaves your device.",
        actions: imageStudio ? [{ label: "Open Image Studio", href: imageStudio.href, kind: "internal" }] : [],
      };
    },
  },
  {
    id: "invoice",
    test: (q) => /invoice/.test(q),
    build: () => {
      const invoice = toolLink("invoice-maker");
      const gst = indiaServiceLink("gst-registration");
      return {
        summary: "Create a GST-compliant invoice in a few clicks — 20 designs with CGST/SGST/IGST breakdown built in.",
        recommendedTools: compact([invoice]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "2-3 minutes",
        difficulty: "Beginner",
        nextStep: gst ? "If you're not yet GST-registered, check the GST Registration guide first." : undefined,
        actions: compact([
          invoice ? { label: "Open Invoice Maker", href: invoice.href, kind: "internal" as const } : null,
          gst ? { label: "Read GST Guide", href: gst.href, kind: "internal" as const } : null,
        ]),
      };
    },
  },
  {
    id: "qr-code",
    test: (q) => /\bqr\b/.test(q) || /qr\s*code/.test(q),
    build: () => {
      const qr = toolLink("qr-generator");
      const qrScanner = toolLink("qr-scanner");
      return {
        summary: "Generate a premium QR code — 22 types, custom shapes, colours and an embedded logo.",
        recommendedTools: compact([qr, qrScanner]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "1 minute",
        difficulty: "Beginner",
        nextStep: "Pick a QR type (URL, Wi-Fi, UPI, vCard...) and customize its look before downloading.",
        actions: qr ? [{ label: "Open QR Studio", href: qr.href, kind: "internal" }] : [],
      };
    },
  },
  {
    id: "build-saas",
    test: (q) => /saas/.test(q) && /(build|start|launch|create|make)/.test(q),
    build: () => saasStackWorkflow,
  },
  {
    id: "gst",
    test: (q) => /\bgst\b/.test(q),
    build: () => {
      const gst = indiaServiceLink("gst-registration");
      const invoice = toolLink("invoice-maker");
      return {
        summary: "GST registration is done entirely on the official GST portal — here's the guide, the portal, and a tool for once you're registered.",
        recommendedTools: compact([gst, invoice]),
        relatedBlogs: [],
        officialResources: [{ label: "GST Portal (official)", href: "https://www.gst.gov.in", kind: "external" }],
        estimatedTime: "Registration: a few days for approval",
        difficulty: "Intermediate",
        nextStep: "Read the required-documents list in the India Hub guide before applying.",
        actions: compact([
          gst ? { label: "Open India Hub Guide", href: gst.href, kind: "internal" as const } : null,
          { label: "Visit Official Website", href: "https://www.gst.gov.in", kind: "external" as const },
        ]),
      };
    },
  },
  {
    id: "ai-for-coding",
    test: (q) => /\bai\b/.test(q) && /(cod(e|ing)|programming|developer|dev\b)/.test(q),
    build: () => {
      const slugs = ["claude", "cursor", "github-copilot", "windsurf", "bolt", "v0", "lovable", "replit-ai"];
      const tools = compact(slugs.map(aiToolLink));
      return {
        summary: "The strongest AI tools for writing and shipping code right now, each suited to a slightly different workflow.",
        recommendedTools: tools,
        relatedBlogs: [],
        officialResources: [],
        difficulty: "Intermediate",
        nextStep: "Cursor and Windsurf are full editors; Claude and GitHub Copilot fit inside your existing setup.",
        actions: [{ label: "Compare AI Coding Tools", href: "/ai-hub/coding", kind: "internal" }],
      };
    },
  },
  {
    id: "react-components",
    test: (q) => /(react component|ui kit|component librar|ui librar)/.test(q),
    build: () => {
      const slugs = ["21st-dev", "aceternity-ui", "magic-ui", "shadcn-ui", "react-bits"];
      const resources = compact(slugs.map(devResourceLink));
      return {
        summary: "Ready-made, copy-paste React/Tailwind component libraries — pick based on the visual style you want.",
        recommendedTools: resources,
        relatedBlogs: [],
        officialResources: [],
        difficulty: "Intermediate",
        nextStep: "Shadcn UI is the most common base; the others layer animated/styled components on top of it.",
        actions: [{ label: "Browse Developer Hub", href: "/developer-hub", kind: "internal" }],
      };
    },
  },
  {
    id: "instagram-workflow",
    test: (q) => /instagram/.test(q),
    build: () => instagramWorkflow,
  },
  {
    id: "build-website",
    test: (q) => /(build|create|make).*website/.test(q) || /website\s*builder/.test(q),
    build: () => {
      const durable = aiToolLink("durable");
      const framer = aiToolLink("framer-ai");
      const mockup = toolLink("website-mockup-generator");
      return {
        summary:
          "If you want a website without writing code, an AI website builder gets you live fastest. If you're building it yourself with code, see the Build-a-SaaS workflow instead.",
        recommendedTools: compact([durable, framer, mockup]),
        relatedBlogs: [],
        officialResources: [],
        difficulty: "Beginner",
        nextStep: "Durable and Framer AI can generate a full site from a prompt in minutes.",
        actions: [{ label: "Browse AI Hub: Design", href: "/ai-hub/design", kind: "internal" }],
      };
    },
  },
];

function browseAiTools(): AssistantResponse {
  const featured = featuredAiTools(6).map((t): LinkItem => ({
    label: t.name, href: t.officialUrl, kind: "external", description: t.overview, meta: t.pricing,
  }));
  return {
    summary: "AI Hub has 250+ AI tools across chatbots, image/video generation, coding, writing, SEO and more.",
    recommendedTools: featured,
    relatedBlogs: [],
    officialResources: [],
    actions: [{ label: "Open AI Hub", href: "/ai-hub", kind: "internal" }],
  };
}

function browseGovernmentHelp(): AssistantResponse {
  const popular = popularIndiaServices().slice(0, 6).map((s): LinkItem => ({
    label: s.name, href: `/india-services/${s.category}/${s.slug}`, kind: "internal", description: s.overview,
  }));
  return {
    summary: "India Hub covers identity documents, certificates, GST/business, vehicles and travel — with official links and required documents for each.",
    recommendedTools: popular,
    relatedBlogs: [],
    officialResources: [],
    actions: [{ label: "Open India Hub", href: "/india-services", kind: "internal" }],
  };
}

function browseDeveloperResources(): AssistantResponse {
  const featured = featuredDevResources(6).map((r): LinkItem => ({
    label: r.name,
    href: r.internalToolSlug ? `/tools/${r.internalToolSlug}` : r.officialUrl,
    kind: r.internalToolSlug ? "internal" : "external",
    description: r.description,
    meta: r.pricing,
  }));
  return {
    summary: "Developer Hub curates component libraries, UI kits, hosting, databases, testing tools and more.",
    recommendedTools: featured,
    relatedBlogs: [],
    officialResources: [],
    actions: [{ label: "Open Developer Hub", href: "/developer-hub", kind: "internal" }],
  };
}

function learningMode(q: string): AssistantResponse | null {
  const match = q.match(/what\s*is\s*(?:an?\s*)?(.+?)[?.!]*$/) ?? q.match(/explain\s*(?:an?\s*)?(.+?)[?.!]*$/);
  if (!match) return null;
  const term = lookupGlossaryTerm(match[1]);
  if (!term) return null;
  return {
    summary: term.explanation,
    recommendedTools: [],
    relatedBlogs: [],
    officialResources: term.learnMoreHref
      ? [{ label: term.learnMoreLabel ?? "Learn more", href: term.learnMoreHref, kind: term.learnMoreHref.startsWith("http") ? "external" : "internal" }]
      : [],
    difficulty: "Beginner",
    actions: term.learnMoreHref
      ? [{ label: term.learnMoreLabel ?? "Learn more", href: term.learnMoreHref, kind: term.learnMoreHref.startsWith("http") ? "external" : "internal" }]
      : [],
  };
}

function fallbackSearch(q: string): AssistantResponse {
  const results = searchCatalog(q, 6);
  if (!results.length) {
    return {
      summary:
        "I couldn't find an exact match for that. Try describing the outcome you want — for example \"compress a PDF\", \"remove image background\", or \"AI for coding\".",
      recommendedTools: [],
      relatedBlogs: [],
      officialResources: [],
      actions: [
        { label: "Browse All Tools", href: "/tools", kind: "internal" },
        { label: "Open AI Hub", href: "/ai-hub", kind: "internal" },
      ],
    };
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

  return {
    summary: `Here's what I found across TechToolsCenter for "${q}".`,
    recommendedTools,
    relatedBlogs,
    officialResources,
    actions: [],
  };
}

export function resolveIntent(rawQuery: string): AssistantResponse {
  const q = rawQuery.trim().toLowerCase();

  if (q === "ai tools") return browseAiTools();
  if (q === "government help") return browseGovernmentHelp();
  if (q === "developer resources") return browseDeveloperResources();

  for (const path of fastPaths) {
    if (path.test(q)) return path.build(q);
  }

  const learned = learningMode(q);
  if (learned) return learned;

  return fallbackSearch(q);
}
