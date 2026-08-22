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
import { passportWorkflow, instagramWorkflow, saasStackWorkflow, startBusinessWorkflow, itrFilingWorkflow, loanPrepWorkflow, freelanceWorkflow, fundraisingWorkflow } from "./workflows";

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
    id: "compress-image",
    intent: "tool",
    test: (q) => /(image|photo|picture|pic|jpe?g|png)/.test(q) && /(compress|shrink|smaller|reduce|too\s*(large|big)|under\s*\d+\s*(mb|kb))/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Compress a photo right in your browser — pick a quality level and see the exact new file size before you download.",
        recommendedTools: compact([toolLink("image-compressor"), toolLink("image-studio")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "30 seconds",
        difficulty: "Beginner",
        nextStep: "Drag in your image, adjust the quality slider, and compare the before/after size.",
        actions: [{ label: "Open Image Compressor", href: "/tools/image-compressor", kind: "internal" }],
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
    id: "freelance-workflow",
    intent: "workflow",
    test: (q) => /freelanc/.test(q),
    build: () => withIntent("workflow", freelanceWorkflow),
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
    id: "quotation-generator",
    intent: "tool",
    test: (q) => /quotation/.test(q) || (/\bquote\b/.test(q) && /(client|customer|business|generat|template|maker)/.test(q)),
    build: () =>
      withIntent("tool", {
        summary: "Create a professional price quotation in 20 designs, with a GST breakdown, logo and QR code — then export as PDF.",
        recommendedTools: compact([toolLink("quotation-generator")]),
        relatedBlogs: [{ label: "Proforma Invoice vs Invoice vs Quotation: What's the Difference", href: "/blog/proforma-invoice-vs-invoice-vs-quotation-difference", kind: "internal" }],
        officialResources: [],
        estimatedTime: "2-3 minutes",
        difficulty: "Beginner",
        nextStep: "Once the client accepts, convert it into an invoice using the same layout and details.",
        actions: [{ label: "Open Quotation Generator", href: "/tools/quotation-generator", kind: "internal" }],
      }),
  },
  {
    id: "estimate-maker",
    intent: "tool",
    test: (q) => /\bestimate\b/.test(q) && !/(loan|emi|tax|salary|age|time|read(ing)?)/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Create a cost estimate for a client — line items, taxes and validity period — in a few clicks, with a downloadable PDF.",
        recommendedTools: compact([toolLink("estimate-maker")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "2-3 minutes",
        difficulty: "Beginner",
        actions: [{ label: "Open Estimate Maker", href: "/tools/estimate-maker", kind: "internal" }],
      }),
  },
  {
    id: "purchase-order-generator",
    intent: "tool",
    test: (q) => /purchase\s*order/.test(q) || /\bpo\s*(generat|maker|template)/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Generate a purchase order with vendor details, itemised quantities and pricing — 20 designs, exported as a PDF.",
        recommendedTools: compact([toolLink("purchase-order-generator")]),
        relatedBlogs: [{ label: "What Is a Purchase Order? When You Need One and What to Include", href: "/blog/what-is-a-purchase-order-when-you-need-one", kind: "internal" }],
        officialResources: [],
        estimatedTime: "2-3 minutes",
        difficulty: "Beginner",
        actions: [{ label: "Open Purchase Order Generator", href: "/tools/purchase-order-generator", kind: "internal" }],
      }),
  },
  {
    id: "receipt-generator",
    intent: "tool",
    test: (q) => /\breceipt\b/.test(q) && !/rent/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Create a payment receipt with amount, payment mode and a paid-in-full note — 20 designs, exported as a PDF.",
        recommendedTools: compact([toolLink("receipt-generator")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "1-2 minutes",
        difficulty: "Beginner",
        nextStep: "Need a rent receipt specifically for HRA exemption instead? Use the Rent Receipt Generator.",
        actions: [{ label: "Open Receipt Generator", href: "/tools/receipt-generator", kind: "internal" }],
      }),
  },
  {
    id: "delivery-challan",
    intent: "tool",
    test: (q) => /delivery\s*challan/.test(q) || /\bchallan\b/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Create a delivery challan for goods sent without an immediate invoice — job work, stock transfer or goods on approval.",
        recommendedTools: compact([toolLink("delivery-challan")]),
        relatedBlogs: [{ label: "Delivery Challan vs Invoice vs Packing Slip: What's the Difference", href: "/blog/delivery-challan-vs-invoice-vs-packing-slip", kind: "internal" }],
        officialResources: [],
        estimatedTime: "2 minutes",
        difficulty: "Beginner",
        nextStep: "If this movement is actually a sale, use Invoice Maker instead — a challan is only for non-sale movements.",
        actions: [{ label: "Open Delivery Challan Maker", href: "/tools/delivery-challan", kind: "internal" }],
      }),
  },
  {
    id: "credit-note",
    intent: "tool",
    test: (q) => /credit\s*note/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Issue a GST credit note for returned goods, an overcharge or a post-sale adjustment, with a tax breakdown.",
        recommendedTools: compact([toolLink("credit-note")]),
        relatedBlogs: [{ label: "Debit Note vs Credit Note: What's the Difference and When to Issue Each", href: "/blog/debit-note-vs-credit-note-difference", kind: "internal" }],
        officialResources: [],
        estimatedTime: "2 minutes",
        difficulty: "Beginner",
        actions: [{ label: "Open Credit Note Maker", href: "/tools/credit-note", kind: "internal" }],
      }),
  },
  {
    id: "debit-note",
    intent: "tool",
    test: (q) => /debit\s*note/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Raise a GST debit note for additional charges, short supply or an upward price revision, with a tax breakdown.",
        recommendedTools: compact([toolLink("debit-note")]),
        relatedBlogs: [{ label: "Debit Note vs Credit Note: What's the Difference and When to Issue Each", href: "/blog/debit-note-vs-credit-note-difference", kind: "internal" }],
        officialResources: [],
        estimatedTime: "2 minutes",
        difficulty: "Beginner",
        actions: [{ label: "Open Debit Note Maker", href: "/tools/debit-note", kind: "internal" }],
      }),
  },
  {
    id: "packing-slip",
    intent: "tool",
    test: (q) => /packing\s*(slip|list)/.test(q) || /shipping\s*slip/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Create a packing slip listing items and quantities inside a shipment, so the recipient can verify contents on arrival.",
        recommendedTools: compact([toolLink("packing-slip")]),
        relatedBlogs: [{ label: "Delivery Challan vs Invoice vs Packing Slip: What's the Difference", href: "/blog/delivery-challan-vs-invoice-vs-packing-slip", kind: "internal" }],
        officialResources: [],
        estimatedTime: "1-2 minutes",
        difficulty: "Beginner",
        actions: [{ label: "Open Packing Slip Maker", href: "/tools/packing-slip", kind: "internal" }],
      }),
  },
  {
    id: "letterhead-maker",
    intent: "tool",
    test: (q) => /letterhead/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Design a branded company letterhead with your logo, name and address — 20 designs, exported as a PDF or PNG.",
        recommendedTools: compact([toolLink("letterhead-maker")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "1-2 minutes",
        difficulty: "Beginner",
        actions: [{ label: "Open Letterhead Maker", href: "/tools/letterhead-maker", kind: "internal" }],
      }),
  },
  {
    id: "fundraising-workflow",
    intent: "workflow",
    test: (q) => /(rais(e|ing))\s*(fund|money|capital|investment)/.test(q) || (/pitch/.test(q) && /investor/.test(q) && !/deck/.test(q)),
    build: () => withIntent("workflow", fundraisingWorkflow),
  },
  {
    id: "pitch-deck-generator",
    intent: "tool",
    test: (q) => /pitch\s*deck/.test(q) || (/investor/.test(q) && /(deck|slides|presentation)/.test(q)),
    build: () =>
      withIntent("tool", {
        summary: "Build an investor pitch deck using the standard slide structure — cover, problem, solution, market, traction, ask — with images, and export a landscape PDF.",
        recommendedTools: compact([toolLink("pitch-deck-generator"), toolLink("business-plan-generator")]),
        relatedBlogs: [{ label: "How to Structure a Pitch Deck: The Slides Investors Actually Read", href: "/blog/how-to-structure-a-pitch-deck-slide-by-slide", kind: "internal" }],
        officialResources: [],
        estimatedTime: "20-30 minutes for a first draft",
        difficulty: "Intermediate",
        nextStep: "Need the longer, detailed version investors ask for after the pitch? Use the Business Plan Generator too.",
        actions: [{ label: "Open Pitch Deck Generator", href: "/tools/pitch-deck-generator", kind: "internal" }],
      }),
  },
  {
    id: "business-plan-generator",
    intent: "tool",
    test: (q) => /business\s*plan/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Write a structured business plan — executive summary, market, financials, milestones — with your logo, and export a PDF.",
        recommendedTools: compact([toolLink("business-plan-generator"), toolLink("pitch-deck-generator")]),
        relatedBlogs: [{ label: "How to Write a Business Plan for a Small Business (Free Template)", href: "/blog/how-to-write-a-business-plan-free-template", kind: "internal" }],
        officialResources: [],
        estimatedTime: "30-45 minutes for a first draft",
        difficulty: "Intermediate",
        nextStep: "Presenting to investors live? Turn the key sections into a short Pitch Deck instead.",
        actions: [{ label: "Open Business Plan Generator", href: "/tools/business-plan-generator", kind: "internal" }],
      }),
  },
  {
    id: "proposal-generator",
    intent: "tool",
    test: (q) => /\bproposal\b/.test(q) && !/marriage/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Create a client-ready business proposal — scope, timeline and pricing — with your branding, and export as a PDF.",
        recommendedTools: compact([toolLink("proposal-generator")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "10-15 minutes",
        difficulty: "Beginner",
        nextStep: "Once it's accepted, send a formal Quotation or Invoice using the same details.",
        actions: [{ label: "Open Proposal Generator", href: "/tools/proposal-generator", kind: "internal" }],
      }),
  },
  {
    id: "css-gradient",
    intent: "tool",
    test: (q) => /gradient/.test(q) && !/gradient\s*descent/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Design a linear, radial or conic CSS gradient visually, with any number of colour stops, and copy production-ready code.",
        recommendedTools: compact([toolLink("gradient-generator")]),
        relatedBlogs: [{ label: "CSS Gradients Explained: linear-gradient vs radial-gradient vs conic-gradient", href: "/blog/css-gradients-linear-vs-radial-vs-conic", kind: "internal" }],
        officialResources: [],
        estimatedTime: "instant",
        difficulty: "Beginner",
        actions: [{ label: "Open CSS Gradient Generator", href: "/tools/gradient-generator", kind: "internal" }],
      }),
  },
  {
    id: "contrast-checker",
    intent: "tool",
    test: (q) => /contrast/.test(q) && !/high\s*contrast\s*mode/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Check a text/background colour pair against WCAG contrast ratios (AA / AAA) and get a pass/fail instantly.",
        recommendedTools: compact([toolLink("contrast-checker")]),
        relatedBlogs: [{ label: "WCAG Color Contrast Explained: How to Pass Accessibility Audits", href: "/blog/wcag-color-contrast-explained-how-to-pass-accessibility-audits", kind: "internal" }],
        officialResources: [],
        estimatedTime: "instant",
        difficulty: "Beginner",
        actions: [{ label: "Open Contrast Checker", href: "/tools/contrast-checker", kind: "internal" }],
      }),
  },
  {
    id: "glassmorphism-generator",
    intent: "tool",
    test: (q) => /glassmorphism/.test(q) || (/glass/.test(q) && /(effect|css|ui|design)/.test(q)),
    build: () =>
      withIntent("tool", {
        summary: "Design a frosted-glass UI card visually — blur, transparency and border — and copy the exact CSS.",
        recommendedTools: compact([toolLink("glassmorphism-generator")]),
        relatedBlogs: [{ label: "Glassmorphism in UI Design: What It Actually Is and How to Use It Without Overdoing It", href: "/blog/glassmorphism-ui-design-explained", kind: "internal" }],
        officialResources: [],
        estimatedTime: "instant",
        difficulty: "Beginner",
        actions: [{ label: "Open Glassmorphism Generator", href: "/tools/glassmorphism-generator", kind: "internal" }],
      }),
  },
  {
    id: "excel-formula-generator",
    intent: "tool",
    test: (q) => /excel\s*formula/.test(q) || /\bvlookup\b/.test(q) || /\bxlookup\b/.test(q) || (/spreadsheet/.test(q) && /formula/.test(q)),
    build: () =>
      withIntent("tool", {
        summary: "Describe what you want in plain English and get the matching Excel/Google Sheets formula, explained.",
        recommendedTools: compact([toolLink("excel-formula-generator")]),
        relatedBlogs: [{ label: "VLOOKUP vs XLOOKUP: What's the Difference (and Which Should You Use)?", href: "/blog/vlookup-vs-xlookup-difference", kind: "internal" }],
        officialResources: [],
        estimatedTime: "1 minute",
        difficulty: "Beginner",
        actions: [{ label: "Open Excel Formula Generator", href: "/tools/excel-formula-generator", kind: "internal" }],
      }),
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
    id: "jwt-decoder",
    intent: "tool",
    test: (q) => /jwt/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Paste a JWT to see its decoded header and payload instantly — entirely client-side, so the token never leaves your browser.",
        recommendedTools: compact([toolLink("jwt-decoder")]),
        relatedBlogs: [{ label: "JWT Decoder Explained: How to Safely Inspect a JSON Web Token", href: "/blog/jwt-decoder-explained-how-to-inspect-json-web-tokens", kind: "internal" }],
        officialResources: [],
        estimatedTime: "instant",
        difficulty: "Beginner",
        actions: [{ label: "Open JWT Decoder", href: "/tools/jwt-decoder", kind: "internal" }],
      }),
  },
  {
    id: "csv-json-converter",
    intent: "tool",
    test: (q) => /csv/.test(q) && /json/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Convert CSV to JSON, or JSON to CSV, right in your browser — paste, upload, or drag a file in.",
        recommendedTools: compact([toolLink("csv-json-converter")]),
        relatedBlogs: [{ label: "CSV to JSON: What's the Difference and When to Convert", href: "/blog/csv-to-json-difference-when-to-convert", kind: "internal" }],
        officialResources: [],
        estimatedTime: "instant",
        difficulty: "Beginner",
        actions: [{ label: "Open CSV ⇄ JSON Converter", href: "/tools/csv-json-converter", kind: "internal" }],
      }),
  },
  {
    id: "json-formatter",
    intent: "tool",
    test: (q) => /json/.test(q) && /(format|validat|beautif|pretty|lint)/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Format, validate and beautify JSON, with the exact syntax error location pointed out if it's invalid.",
        recommendedTools: compact([toolLink("json-formatter")]),
        relatedBlogs: [{ label: "How to Validate and Beautify JSON Online (and Actually Fix It)", href: "/blog/json-formatter-validate-and-beautify-json-online", kind: "internal" }],
        officialResources: [],
        estimatedTime: "instant",
        difficulty: "Beginner",
        actions: [{ label: "Open JSON Formatter", href: "/tools/json-formatter", kind: "internal" }],
      }),
  },
  {
    id: "base64",
    intent: "tool",
    test: (q) => /base\s*64/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Encode text or a file to Base64, or decode a Base64 string back to its original form.",
        recommendedTools: compact([toolLink("base64-encoder")]),
        relatedBlogs: [{ label: "What Is Base64 Encoding? A Plain-English Explanation", href: "/blog/what-is-base64-encoding-explained", kind: "internal" }],
        officialResources: [],
        estimatedTime: "instant",
        difficulty: "Beginner",
        actions: [{ label: "Open Base64 Encoder/Decoder", href: "/tools/base64-encoder", kind: "internal" }],
      }),
  },
  {
    id: "url-encode",
    intent: "tool",
    test: (q) => /url\s*(encod|decod)/.test(q) || /percent[\s-]?encod/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Percent-encode a value to make it safe inside a URL, or decode an already-encoded string back to plain text.",
        recommendedTools: compact([toolLink("url-encoder")]),
        relatedBlogs: [{ label: "URL Encoding Explained: What Percent-Encoding Actually Does", href: "/blog/url-encoding-explained-what-percent-encoding-actually-does", kind: "internal" }],
        officialResources: [],
        estimatedTime: "instant",
        difficulty: "Beginner",
        actions: [{ label: "Open URL Encoder / Decoder", href: "/tools/url-encoder", kind: "internal" }],
      }),
  },
  {
    id: "uuid-generator",
    intent: "tool",
    test: (q) => /uuid/.test(q) || /\bguid\b/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Generate one or many UUIDs (v4, or other versions) — copy a single one or export a bulk list.",
        recommendedTools: compact([toolLink("uuid-generator")]),
        relatedBlogs: [{ label: "What Is a UUID and When Do You Actually Need One?", href: "/blog/what-is-a-uuid-when-do-you-need-one", kind: "internal" }],
        officialResources: [],
        estimatedTime: "instant",
        difficulty: "Beginner",
        actions: [{ label: "Open UUID Generator", href: "/tools/uuid-generator", kind: "internal" }],
      }),
  },
  {
    id: "hash-generator",
    intent: "tool",
    test: (q) => /(checksum|md5|sha-?1\b|sha-?256|sha-?512)/.test(q) || (/hash/.test(q) && !/hashtag/.test(q)),
    build: () =>
      withIntent("tool", {
        summary: "Generate an MD5, SHA-1, SHA-256 or SHA-512 hash of text or a file — useful for verifying a download or checking two files match.",
        recommendedTools: compact([toolLink("hash-generator")]),
        relatedBlogs: [{ label: "MD5 vs SHA-256: What's the Difference and Which Should You Use?", href: "/blog/md5-vs-sha-256-difference-which-to-use", kind: "internal" }],
        officialResources: [],
        estimatedTime: "instant",
        difficulty: "Beginner",
        actions: [{ label: "Open Hash Generator", href: "/tools/hash-generator", kind: "internal" }],
      }),
  },
  {
    id: "timestamp-converter",
    intent: "tool",
    test: (q) => /timestamp/.test(q) || /unix\s*time/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Convert a Unix timestamp to a readable date, or the other way around, with timezone handling built in.",
        recommendedTools: compact([toolLink("timestamp-converter")]),
        relatedBlogs: [{ label: "What Is a Unix Timestamp, and How Do You Convert It?", href: "/blog/what-is-a-unix-timestamp-and-how-to-convert-it", kind: "internal" }],
        officialResources: [],
        estimatedTime: "instant",
        difficulty: "Beginner",
        actions: [{ label: "Open Timestamp Converter", href: "/tools/timestamp-converter", kind: "internal" }],
      }),
  },
  {
    id: "youtube-thumbnail",
    intent: "tool",
    test: (q) => /youtube/.test(q) && /thumbnail/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Download any YouTube video's thumbnail in the highest resolution available, straight from the video URL.",
        recommendedTools: compact([toolLink("youtube-thumbnail-downloader")]),
        relatedBlogs: [{ label: "How to Download YouTube Thumbnails in HD", href: "/blog/how-to-download-youtube-thumbnail-hd", kind: "internal" }],
        officialResources: [],
        estimatedTime: "10 seconds",
        difficulty: "Beginner",
        actions: [{ label: "Open YouTube Thumbnail Downloader", href: "/tools/youtube-thumbnail-downloader", kind: "internal" }],
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
    id: "bmi-calculator",
    intent: "tool",
    test: (q) => /\bbmi\b/.test(q) || (/body\s*mass/.test(q) && /index/.test(q)),
    build: () =>
      withIntent("tool", {
        summary: "Calculate your Body Mass Index from height and weight, with the standard underweight/normal/overweight/obese category shown alongside it.",
        recommendedTools: compact([toolLink("bmi-calculator")]),
        relatedBlogs: [{ label: "BMI Explained: What It Actually Measures", href: "/blog/bmi-explained-what-it-actually-measures", kind: "internal" }],
        officialResources: [],
        estimatedTime: "10 seconds",
        difficulty: "Beginner",
        actions: [{ label: "Open BMI Calculator", href: "/tools/bmi-calculator", kind: "internal" }],
      }),
  },
  {
    id: "percentage-calculator",
    intent: "tool",
    test: (q) => /percentage/.test(q) && /(calculat|find|work\s*out)/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Work out a percentage, a percentage change, or what number a percentage represents — all the common percentage calculations in one place.",
        recommendedTools: compact([toolLink("percentage-calculator")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "10 seconds",
        difficulty: "Beginner",
        actions: [{ label: "Open Percentage Calculator", href: "/tools/percentage-calculator", kind: "internal" }],
      }),
  },
  {
    id: "tip-calculator",
    intent: "tool",
    test: (q) => /tip/.test(q) && /(calculat|split|bill)/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Calculate a tip and split the total bill evenly across any number of people.",
        recommendedTools: compact([toolLink("tip-calculator")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "10 seconds",
        difficulty: "Beginner",
        actions: [{ label: "Open Tip Calculator", href: "/tools/tip-calculator", kind: "internal" }],
      }),
  },
  {
    id: "cgpa-calculator",
    intent: "tool",
    test: (q) => /cgpa/.test(q) || (/\bgpa\b/.test(q) && /(calculat|convert|percentage)/.test(q)),
    build: () =>
      withIntent("tool", {
        summary: "Convert CGPA to percentage (or the other way around) using the correct formula for CBSE, VTU and other common university scales.",
        recommendedTools: compact([toolLink("cgpa-calculator")]),
        relatedBlogs: [{ label: "CGPA to Percentage: CBSE, VTU and University Formulas Explained", href: "/blog/cgpa-to-percentage-calculator-guide", kind: "internal" }],
        officialResources: [],
        estimatedTime: "10 seconds",
        difficulty: "Beginner",
        actions: [{ label: "Open CGPA Calculator", href: "/tools/cgpa-calculator", kind: "internal" }],
      }),
  },
  {
    id: "income-tax-calculator",
    intent: "tool",
    test: (q) => /income\s*tax/.test(q) && /(calculat|estimate|how\s*much)/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Estimate your income tax liability under both the old and new regime, and see which one actually saves you more.",
        recommendedTools: compact([toolLink("income-tax-calculator")]),
        relatedBlogs: [{ label: "Old vs New Tax Regime: Which to Choose", href: "/blog/old-vs-new-tax-regime-which-to-choose", kind: "internal" }],
        officialResources: [],
        estimatedTime: "2 minutes",
        difficulty: "Beginner",
        nextStep: "Enter your income once and compare both regimes side by side before you file.",
        actions: [{ label: "Open Income Tax Calculator", href: "/tools/income-tax-calculator", kind: "internal" }],
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
    id: "rent-receipt-generator",
    intent: "tool",
    test: (q) => /rent\s*receipt/.test(q) || (/rent/.test(q) && /(receipt|generat)/.test(q) && !/agreement/.test(q)),
    build: () =>
      withIntent("tool", {
        summary: "Generate a rent receipt with landlord and tenant details, revenue stamp note, and a downloadable PDF — the exact document you need to claim HRA exemption.",
        recommendedTools: compact([toolLink("rent-receipt-generator")]),
        relatedBlogs: [{ label: "HRA Exemption Explained: How Much of Your House Rent Allowance Is Tax-Free", href: "/blog/hra-exemption-explained-how-much-is-tax-free", kind: "internal" }],
        officialResources: [],
        estimatedTime: "2 minutes",
        difficulty: "Beginner",
        nextStep: "Generating receipts for all 12 months at once? The tool has a bulk ZIP download for that.",
        actions: [{ label: "Open Rent Receipt Generator", href: "/tools/rent-receipt-generator", kind: "internal" }],
      }),
  },
  {
    id: "salary-slip-generator",
    intent: "tool",
    test: (q) => /salary\s*slip/.test(q) || /payslip/.test(q) || /pay\s*slip/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Create a professional salary slip with earnings, deductions and net pay calculated automatically — download as a PDF.",
        recommendedTools: compact([toolLink("salary-slip-generator")]),
        relatedBlogs: [{ label: "How to Calculate Your In-Hand Salary From CTC", href: "/blog/how-to-calculate-in-hand-salary-from-ctc", kind: "internal" }],
        officialResources: [],
        estimatedTime: "2 minutes",
        difficulty: "Beginner",
        actions: [{ label: "Open Salary Slip Generator", href: "/tools/salary-slip-generator", kind: "internal" }],
      }),
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
  {
    id: "watermark-pdf",
    intent: "tool",
    test: (q) => /pdf/.test(q) && /watermark/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Stamp a text watermark — tiled, centered or in a corner — across every page of a PDF, with control over opacity, rotation and color.",
        recommendedTools: compact([toolLink("pdf-watermark")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "1 minute",
        difficulty: "Beginner",
        actions: [{ label: "Open PDF Watermark", href: "/tools/pdf-watermark", kind: "internal" }],
      }),
  },
  {
    id: "rotate-pdf",
    intent: "tool",
    test: (q) => /pdf/.test(q) && /rotat/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Fix a sideways or upside-down PDF — rotate all pages or just a specific range by 90°, 180° or 270°.",
        recommendedTools: compact([toolLink("pdf-page-rotator")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "30 seconds",
        difficulty: "Beginner",
        actions: [{ label: "Open PDF Page Rotator", href: "/tools/pdf-page-rotator", kind: "internal" }],
      }),
  },
  {
    id: "pdf-page-numbers",
    intent: "tool",
    test: (q) => /pdf/.test(q) && /page\s*number/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Add page numbers to a PDF — pick the position, format (like \"1 of 10\"), and a custom starting number.",
        recommendedTools: compact([toolLink("pdf-page-numbers")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "1 minute",
        difficulty: "Beginner",
        actions: [{ label: "Open PDF Page Numbers", href: "/tools/pdf-page-numbers", kind: "internal" }],
      }),
  },
  {
    id: "markdown-to-pdf",
    intent: "tool",
    test: (q) => /markdown/.test(q) && /pdf/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Convert Markdown — headings, lists, code blocks — into a clean, paginated A4 PDF.",
        recommendedTools: compact([toolLink("markdown-to-pdf"), toolLink("markdown-converter")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "30 seconds",
        difficulty: "Beginner",
        actions: [{ label: "Open Markdown to PDF", href: "/tools/markdown-to-pdf", kind: "internal" }],
      }),
  },
  {
    id: "pdf-to-jpg",
    intent: "tool",
    test: (q) => /pdf[\s\S]*\b(jpe?g|png|image)\b/.test(q) && !/(compress|merge|split|rotat|watermark|page\s*number)/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Convert every page of a PDF into a JPG (or PNG) image, or go the other way and rebuild a PDF from images — both directions, no watermark.",
        recommendedTools: compact([toolLink("pdf-to-jpg")]),
        relatedBlogs: [{ label: "How to Convert PDF to JPG (and Back)", href: "/blog/how-to-convert-pdf-to-jpg-and-back", kind: "internal" }],
        officialResources: [],
        estimatedTime: "30 seconds",
        difficulty: "Beginner",
        actions: [{ label: "Open PDF to JPG", href: "/tools/pdf-to-jpg", kind: "internal" }],
      }),
  },
  {
    id: "image-to-pdf",
    intent: "tool",
    test: (q) => /\b(jpe?g|png|photo|image|picture)s?\b[\s\S]*\bpdf\b/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Combine one or more photos into a single PDF, in the order you choose — useful for submitting scanned documents as one file.",
        recommendedTools: compact([toolLink("image-to-pdf")]),
        relatedBlogs: [{ label: "How to Convert Photos into a Single PDF", href: "/blog/how-to-convert-photos-into-one-pdf", kind: "internal" }],
        officialResources: [],
        estimatedTime: "30 seconds",
        difficulty: "Beginner",
        actions: [{ label: "Open Image to PDF", href: "/tools/image-to-pdf", kind: "internal" }],
      }),
  },
  {
    id: "pdf-to-excel",
    intent: "tool",
    test: (q) => /pdf/.test(q) && /excel/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Pull tables out of a PDF (like a bank statement) into an editable Excel spreadsheet.",
        recommendedTools: compact([toolLink("pdf-to-excel")]),
        relatedBlogs: [{ label: "How to Convert a Bank Statement PDF to Excel", href: "/blog/how-to-convert-bank-statement-pdf-to-excel", kind: "internal" }],
        officialResources: [],
        estimatedTime: "1 minute",
        difficulty: "Beginner",
        actions: [{ label: "Open PDF to Excel", href: "/tools/pdf-to-excel", kind: "internal" }],
      }),
  },
  {
    id: "watermark-image",
    intent: "tool",
    test: (q) => /watermark/.test(q) && !/pdf/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Add a tiled or positioned text watermark to a photo — set opacity, rotation and color, then download.",
        recommendedTools: compact([toolLink("image-watermark")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "1 minute",
        difficulty: "Beginner",
        actions: [{ label: "Open Image Watermark", href: "/tools/image-watermark", kind: "internal" }],
      }),
  },
  {
    id: "meme-generator",
    intent: "tool",
    test: (q) => /meme/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Upload any image and add classic top/bottom Impact-style captions — download as a PNG, no watermark.",
        recommendedTools: compact([toolLink("meme-generator")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "1 minute",
        difficulty: "Beginner",
        actions: [{ label: "Open Meme Generator", href: "/tools/meme-generator", kind: "internal" }],
      }),
  },
  {
    id: "speech-to-text",
    intent: "tool",
    test: (q) => /dictat/.test(q) || (/(speech|voice|talk)/.test(q) && /(text|transcri)/.test(q)),
    build: () =>
      withIntent("tool", {
        summary: "Dictate into your microphone and get a live text transcript — supports English (India/US/UK) and Hindi.",
        recommendedTools: compact([toolLink("speech-to-text")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "instant",
        difficulty: "Beginner",
        actions: [{ label: "Open Speech to Text", href: "/tools/speech-to-text", kind: "internal" }],
      }),
  },
  {
    id: "voice-recorder",
    intent: "tool",
    test: (q) => /record/.test(q) && /(voice|audio|myself|mic)/.test(q) && !/(text|transcri)/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Record a quick voice memo or clip from your microphone, play it back, then download — no app needed.",
        recommendedTools: compact([toolLink("voice-recorder")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "instant",
        difficulty: "Beginner",
        actions: [{ label: "Open Voice Recorder", href: "/tools/voice-recorder", kind: "internal" }],
      }),
  },
  {
    id: "signature-maker",
    intent: "tool",
    test: (q) => /signature/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Draw a signature with your mouse or finger, or type your name in a cursive style — download as a transparent PNG.",
        recommendedTools: compact([toolLink("signature-maker")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "30 seconds",
        difficulty: "Beginner",
        nextStep: "This makes a signature image for informal use — for legally binding e-signatures, use a certified provider.",
        actions: [{ label: "Open Signature Maker", href: "/tools/signature-maker", kind: "internal" }],
      }),
  },
  {
    id: "typing-speed-test",
    intent: "tool",
    test: (q) => (/typing/.test(q) && /(speed|test)/.test(q)) || /\bwpm\b/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Type a passage and see your live words-per-minute (WPM) and accuracy, with character-by-character highlighting.",
        recommendedTools: compact([toolLink("typing-speed-test")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "1 minute",
        difficulty: "Beginner",
        actions: [{ label: "Open Typing Speed Test", href: "/tools/typing-speed-test", kind: "internal" }],
      }),
  },
  {
    id: "pomodoro-timer",
    intent: "tool",
    test: (q) => /pomodoro/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Run focused work sessions with the Pomodoro Technique — 25 minutes on, 5 off, with your completed sessions tracked by day.",
        recommendedTools: compact([toolLink("pomodoro-timer")]),
        relatedBlogs: [{ label: "The Pomodoro Technique Explained: How to Actually Use It", href: "/blog/pomodoro-technique-explained-how-to-actually-use-it", kind: "internal" }],
        officialResources: [],
        estimatedTime: "25 minutes per session",
        difficulty: "Beginner",
        nextStep: "Pick one task, start the timer, and take the break when it rings — don't skip it.",
        actions: [{ label: "Open Pomodoro Timer", href: "/tools/pomodoro-timer", kind: "internal" }],
      }),
  },
  {
    id: "countdown-timer",
    intent: "tool",
    test: (q) => /countdown/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Set a live countdown to any date and time — an exam, launch or festival — with a shareable link.",
        recommendedTools: compact([toolLink("countdown-timer")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "30 seconds",
        difficulty: "Beginner",
        actions: [{ label: "Open Countdown Timer", href: "/tools/countdown-timer", kind: "internal" }],
      }),
  },
  {
    id: "number-to-words",
    intent: "tool",
    test: (q) => /(number|amount|cheque|check).*words/.test(q) || /words.*(number|amount)/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Convert a number into words using the Indian numbering system (Lakh, Crore) — with a Rupees & Paise mode built for cheques.",
        recommendedTools: compact([toolLink("number-to-words")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "10 seconds",
        difficulty: "Beginner",
        actions: [{ label: "Open Number to Words", href: "/tools/number-to-words", kind: "internal" }],
      }),
  },
  {
    id: "ascii-art",
    intent: "tool",
    test: (q) => /ascii/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Turn any image into text-character ASCII art — adjustable width, three character sets, and an invert option.",
        recommendedTools: compact([toolLink("image-to-ascii-art")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "30 seconds",
        difficulty: "Beginner",
        actions: [{ label: "Open Image to ASCII Art", href: "/tools/image-to-ascii-art", kind: "internal" }],
      }),
  },
  {
    id: "color-blindness-simulator",
    intent: "tool",
    test: (q) => /colou?r\s*blind/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Preview an image as someone with protanopia, deuteranopia, tritanopia or achromatopsia might see it — useful for checking your designs stay accessible.",
        recommendedTools: compact([toolLink("color-blindness-simulator")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "1 minute",
        difficulty: "Beginner",
        actions: [{ label: "Open Color Blindness Simulator", href: "/tools/color-blindness-simulator", kind: "internal" }],
      }),
  },
  {
    id: "random-team-generator",
    intent: "tool",
    test: (q) => /(random|split|divide).*(team|group)/.test(q) || /(team|group).*(random|generator)/.test(q),
    build: () =>
      withIntent("tool", {
        summary: "Paste a list of names and get a fair, shuffled split into any number of teams — great for classrooms, office games or sports days.",
        recommendedTools: compact([toolLink("random-team-generator")]),
        relatedBlogs: [],
        officialResources: [],
        estimatedTime: "30 seconds",
        difficulty: "Beginner",
        actions: [{ label: "Open Random Team Generator", href: "/tools/random-team-generator", kind: "internal" }],
      }),
  },
  {
    id: "itr-filing-workflow",
    intent: "workflow",
    test: (q) => /\bitr\b/.test(q) || (/income\s*tax/.test(q) && /(file|filing|return)/.test(q)),
    build: () => withIntent("workflow", itrFilingWorkflow),
  },
  {
    id: "loan-prep-workflow",
    intent: "workflow",
    test: (q) => /loan/.test(q) && !/(kisan|kcc|credit\s*card)/.test(q),
    build: () => withIntent("workflow", loanPrepWorkflow),
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
