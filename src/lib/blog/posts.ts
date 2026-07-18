import type { BlogPost, Block } from "./types";

export const posts: BlogPost[] = [
  {
    slug: "how-to-create-gst-invoice-online-free",
    title: "How to Create a GST Invoice Online for Free (No Sign-up)",
    excerpt:
      "A step-by-step guide to making a professional, GST-compliant invoice in minutes — with CGST/SGST/IGST, your logo and a downloadable PDF, all in your browser.",
    category: "business",
    author: "techtoolscenter-team",
    template: "tutorial",
    publishedOn: "2026-07-12",
    tags: ["invoice", "gst", "billing", "small business"],
    featured: true,
    relatedTools: ["invoice-maker", "gst-calculator", "quotation-generator"],
    content: [
      { type: "p", text: "Sending a clean, professional invoice is one of the fastest ways to get paid on time. But you don't need expensive accounting software to do it. With a free online **Invoice Maker**, you can create a fully GST-compliant invoice in a couple of minutes — add your logo, split the tax into CGST and SGST (or IGST), and download a print-ready PDF." },
      { type: "h2", text: "What is a GST invoice?" },
      { type: "p", text: "A GST invoice is a document a registered business issues for the sale of goods or services. It must show the seller and buyer details, GSTIN, a unique invoice number, the items with their taxable value, and the tax charged — broken into CGST + SGST for sales within a state, or IGST for inter-state sales." },
      { type: "h2", text: "Step-by-step: create your invoice" },
      { type: "ol", items: [
        "Open the Invoice Maker — it loads instantly, no sign-up needed.",
        "Add your company details and GSTIN, then your customer's details.",
        "Enter each line item with quantity and rate. The totals update live.",
        "Choose your tax type — CGST + SGST for intra-state or IGST for inter-state — and set the rate.",
        "Upload your logo and signature, pick a design, then download the PDF or print it.",
      ] },
      { type: "callout", text: "Everything runs in your browser — your invoice data is never uploaded to any server, so it stays completely private." },
      { type: "h2", text: "How the tax breakdown works" },
      { type: "p", text: "For a sale within your state, GST is split equally into CGST (Central) and SGST (State). For example, 18% GST becomes 9% CGST + 9% SGST. For a sale to another state, the same 18% is charged as a single IGST line. A good invoice tool shows each component separately so your buyer can claim input credit correctly." },
      { type: "h2", text: "Tips for professional invoices" },
      { type: "ul", items: [
        "Use a sequential invoice number so records stay organised.",
        "Always include your GSTIN and the customer's GSTIN.",
        "Add clear payment terms and a due date to get paid faster.",
        "Save a design as a template so every invoice looks consistent.",
      ] },
      { type: "p", text: "Once you're happy, download the PDF and email it — or print it. You can create as many invoices as you like, completely free." },
    ],
    faq: [
      { question: "Is this invoice maker really free?", answer: "Yes. It's 100% free with no sign-up, no watermark and no limit on how many invoices you create." },
      { question: "Does it calculate CGST, SGST and IGST?", answer: "Yes. Pick your tax type and rate, and the tool shows CGST + SGST (intra-state) or IGST (inter-state) as separate lines on the invoice and PDF." },
      { question: "Is my invoice data safe?", answer: "Completely. Everything is processed in your browser and never uploaded, so your business and customer data stay private." },
    ],
  },
  {
    slug: "how-to-make-qr-code-for-business",
    title: "How to Make a QR Code for Your Business (Free & Customisable)",
    excerpt:
      "Create branded QR codes for your website, menu, UPI payments or Wi-Fi in seconds — with your colours and logo, exported as PNG, SVG or PDF.",
    category: "guides",
    author: "editorial",
    template: "guide",
    publishedOn: "2026-07-14",
    tags: ["qr code", "marketing", "small business"],
    featured: true,
    relatedTools: ["qr-generator", "barcode-generator"],
    content: [
      { type: "p", text: "QR codes are everywhere — on menus, posters, business cards and payment counters. The good news is you can make your own **QR code** for free, style it with your brand colours and logo, and download it in high resolution for print or web." },
      { type: "h2", text: "What can a QR code link to?" },
      { type: "ul", items: [
        "Your website or a specific landing page",
        "A restaurant or product menu (PDF or page)",
        "UPI / payment details for quick checkout",
        "Wi-Fi credentials so guests connect in one tap",
        "Your contact card, social profiles or WhatsApp",
      ] },
      { type: "h2", text: "Step-by-step: create your QR code" },
      { type: "ol", items: [
        "Open the QR Studio and choose the type — website, text, email, phone, UPI and more.",
        "Enter your link or details. The preview updates instantly.",
        "Style it — pick your colours, dot shape and add your logo in the centre.",
        "Download as PNG for web, SVG for print, or a PDF/ZIP bundle.",
      ] },
      { type: "callout", text: "Always test your QR code with a phone camera before printing it at large size." },
      { type: "h2", text: "Design tips for scannable codes" },
      { type: "p", text: "Keep a strong contrast between the code and its background, don't shrink it below about 2 cm for print, and leave a small quiet zone (margin) around it. Adding a logo is fine as long as you keep the error-correction level high enough to stay scannable." },
    ],
    faq: [
      { question: "Do QR codes expire?", answer: "A static QR code — like the ones this tool makes — never expires. It encodes your data directly, so it works forever as long as the destination (your link) is live." },
      { question: "Can I add my logo?", answer: "Yes. You can drop your logo into the centre of the QR code and choose custom colours to match your brand." },
      { question: "Which format should I download?", answer: "Use PNG for websites and social media, and SVG for print so the code stays crisp at any size." },
    ],
  },
  {
    slug: "app-store-screenshots-that-convert",
    title: "How to Design App Store Screenshots That Convert",
    excerpt:
      "Learn the exact sizes Apple and Google accept and how to design device-framed screenshots that turn browsers into downloads.",
    category: "design",
    author: "techtoolscenter-team",
    template: "guide",
    publishedOn: "2026-07-16",
    tags: ["app store", "design", "mockups", "marketing"],
    relatedTools: ["app-screenshot-generator", "website-mockup-generator", "brand-kit-generator"],
    content: [
      { type: "p", text: "Your app's screenshots are the single biggest driver of downloads on the App Store and Google Play. Great screenshots tell a story, highlight one benefit each, and use the exact pixel sizes the stores accept — no oversized uploads, no rejections." },
      { type: "h2", text: "The exact sizes you need" },
      { type: "p", text: "Apple requires specific screenshot dimensions per device — 6.9″, 6.7″, 6.5″, 5.5″ and iPad. Google Play accepts phone, 7″ and 10″ tablet screenshots, plus a 1024×500 feature graphic and a 1280×720 TV banner. Using an **App Store Studio** that renders at these exact sizes means your uploads are always accepted." },
      { type: "h2", text: "What makes a screenshot convert" },
      { type: "ol", items: [
        "Lead with your strongest feature on the first screenshot.",
        "Add a short, benefit-led headline above each device frame.",
        "Use one idea per screenshot — don't crowd the frame.",
        "Keep colours and fonts consistent with your brand.",
        "Show the app inside a realistic device frame for context.",
      ] },
      { type: "callout", text: "Respect the safe area — keep text and key UI away from the edges so nothing gets clipped by rounded corners." },
      { type: "h2", text: "A simple workflow" },
      { type: "p", text: "Capture clean in-app screenshots, drop them into a device frame, add a headline and a branded background, then export every required size at once. Pair it with a consistent brand kit so your colours and logo carry across the whole listing." },
    ],
    faq: [
      { question: "What size should App Store screenshots be?", answer: "Apple accepts 6.9″ (1320×2868), 6.7″ (1290×2796), 6.5″ (1242×2688), 5.5″ (1242×2208) and iPad (2048×2732). Rendering at these exact sizes avoids upload rejections." },
      { question: "How many screenshots should I upload?", answer: "Both stores allow up to 8–10. Aim for at least 4–5, each highlighting a single key benefit." },
    ],
  },
];

/* ---------------- helpers ---------------- */
export function estimateReadingMinutes(post: BlogPost): number {
  if (post.readingMinutes) return post.readingMinutes;
  const words = post.content.reduce((n, b) => {
    if (b.type === "ul" || b.type === "ol") return n + b.items.join(" ").split(/\s+/).length;
    if ("text" in b) return n + b.text.split(/\s+/).length;
    return n;
  }, 0);
  return Math.max(1, Math.round(words / 200));
}

function byNewest(a: BlogPost, b: BlogPost) {
  return new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime();
}

export function allPosts(): BlogPost[] {
  return [...posts].sort(byNewest);
}
export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
export function postsByCategory(category: string): BlogPost[] {
  return allPosts().filter((p) => p.category === category);
}
export function postsByAuthor(author: string): BlogPost[] {
  return allPosts().filter((p) => p.author === author);
}
export function featuredPosts(): BlogPost[] {
  const f = allPosts().filter((p) => p.featured);
  return f.length ? f : allPosts().slice(0, 2);
}
export function relatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const scored = allPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => {
      let score = p.category === post.category ? 2 : 0;
      score += p.tags.filter((t) => post.tags.includes(t)).length;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score || byNewest(a.p, b.p));
  return scored.slice(0, limit).map((s) => s.p);
}

export const POSTS_PER_PAGE = 6;
export function paginate(list: BlogPost[], page: number, perPage = POSTS_PER_PAGE) {
  const total = Math.max(1, Math.ceil(list.length / perPage));
  const current = Math.min(Math.max(1, page), total);
  const start = (current - 1) * perPage;
  return { items: list.slice(start, start + perPage), current, total };
}

/* ---------------- Table of Contents ---------------- */
export function headingSlug(text: string): string {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
export function tableOfContents(post: BlogPost): { id: string; text: string; level: 2 | 3 }[] {
  return post.content
    .filter((b): b is { type: "h2" | "h3"; text: string } => b.type === "h2" || b.type === "h3")
    .map((b) => ({ id: headingSlug(b.text), text: b.text, level: b.type === "h2" ? 2 : 3 }));
}
