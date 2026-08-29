export interface GlossaryTerm {
  term: string;
  aliases: string[];
  explanation: string;
  learnMoreHref?: string;
  learnMoreLabel?: string;
}

export const glossary: GlossaryTerm[] = [
  {
    term: "Next.js",
    aliases: ["nextjs", "next js"],
    explanation:
      "Next.js is a React framework for building websites and web apps. It adds routing, server rendering and built-in optimizations on top of React, so you get fast pages without wiring that up yourself.",
    learnMoreHref: "https://nextjs.org/docs",
    learnMoreLabel: "Next.js docs",
  },
  {
    term: "JWT",
    aliases: ["json web token", "jwt token"],
    explanation:
      "A JWT (JSON Web Token) is a compact, signed piece of text used to prove who a user is between a client and a server, without the server needing to look up a session on every request.",
    learnMoreHref: "/tools/jwt-decoder",
    learnMoreLabel: "Decode a JWT",
  },
  {
    term: "WebP",
    aliases: ["webp format", "webp image"],
    explanation:
      "WebP is a modern image format from Google that's usually much smaller than JPG or PNG at the same visual quality, which makes pages load faster.",
    learnMoreHref: "/tools/image-converter",
    learnMoreLabel: "Convert to WebP",
  },
  {
    term: "GST",
    aliases: ["goods and services tax", "gst tax"],
    explanation:
      "GST (Goods and Services Tax) is India's unified indirect tax on the sale of goods and services, replacing older taxes like VAT and service tax. Businesses above a turnover threshold must register for a GSTIN.",
    learnMoreHref: "/india-services/business-tax/gst-registration",
    learnMoreLabel: "GST Registration guide",
  },
  {
    term: "AI",
    aliases: ["artificial intelligence"],
    explanation:
      "AI (Artificial Intelligence) refers to software that can perform tasks — like writing, generating images, answering questions or writing code — that normally need human intelligence, by learning patterns from large amounts of data.",
    learnMoreHref: "/ai-hub",
    learnMoreLabel: "Explore AI Hub",
  },
  {
    term: "API",
    aliases: ["application programming interface"],
    explanation:
      "An API (Application Programming Interface) is a defined way for one piece of software to talk to another — for example, your app asking a payment provider to charge a card, without needing to know how that provider works internally.",
  },
  {
    term: "SaaS",
    aliases: ["software as a service"],
    explanation:
      "SaaS (Software as a Service) is software you access over the internet and usually pay for on a subscription, rather than installing and managing it yourself — think Gmail, Notion or Netflix.",
  },
  {
    term: "PWA",
    aliases: ["progressive web app"],
    explanation:
      "A PWA (Progressive Web App) is a website built to behave like a native app — installable on your home screen, working offline, and sending notifications — without needing an app-store download.",
  },
  {
    term: "Markdown",
    aliases: ["md format"],
    explanation:
      "Markdown is a simple, plain-text way to format documents — using symbols like `#` for headings and `**bold**` for bold text — that's readable as-is and easy to convert into formatted HTML.",
    learnMoreHref: "/tools/markdown-converter",
    learnMoreLabel: "Markdown converter",
  },
  {
    term: "SEO",
    aliases: ["search engine optimization", "search engine optimisation"],
    explanation:
      "SEO (Search Engine Optimization) is the practice of structuring and writing content so search engines like Google can understand and rank it well, bringing more organic visitors to a page.",
    learnMoreHref: "/ai-hub/seo",
    learnMoreLabel: "AI Hub: SEO tools",
  },
  {
    term: "DNS",
    aliases: ["domain name system"],
    explanation:
      "DNS (Domain Name System) is the internet's phonebook — it translates a domain name like example.com into the numeric IP address a computer actually needs to connect to.",
  },
  {
    term: "SSL",
    aliases: ["ssl certificate", "https", "tls"],
    explanation:
      "SSL/TLS is the encryption that secures the connection between a browser and a website (the padlock icon and \"https\"), so data passed between them can't be read or tampered with in transit.",
  },
  {
    term: "PDF",
    aliases: ["pdf file", "portable document format"],
    explanation:
      "A PDF (Portable Document Format) is a file format designed to look identical no matter what device or software opens it — the standard for documents, forms, invoices and reports.",
    learnMoreHref: "/tools/pdf-studio",
    learnMoreLabel: "PDF Studio",
  },
  {
    term: "LLM",
    aliases: ["large language model"],
    explanation:
      "An LLM (Large Language Model) is the type of AI model behind tools like ChatGPT and Claude — trained on huge amounts of text so it can understand and generate human-like language.",
    learnMoreHref: "/ai-hub/chatbots",
    learnMoreLabel: "AI Hub: Chatbots",
  },
  {
    term: "UUID",
    aliases: ["unique identifier", "guid"],
    explanation:
      "A UUID (Universally Unique Identifier) is a randomly generated ID, long enough that two systems can each create one independently and be extremely unlikely to ever produce the same value.",
    learnMoreHref: "/tools/uuid-generator",
    learnMoreLabel: "UUID Generator",
  },
  {
    term: "CDN",
    aliases: ["content delivery network"],
    explanation:
      "A CDN (Content Delivery Network) is a network of servers spread across many locations that serve a website's files from the copy closest to the visitor, making pages load faster.",
  },
  {
    term: "Webhook",
    aliases: ["webhooks"],
    explanation:
      "A webhook is a way for one system to notify another the instant something happens — instead of your app repeatedly asking \"anything new yet?\", the other service sends a message to a URL you provide as soon as the event occurs.",
    learnMoreHref: "/blog/what-is-a-webhook-how-is-it-different-from-an-api",
    learnMoreLabel: "Webhook vs API, explained",
  },
];

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
}

export function lookupGlossaryTerm(raw: string): GlossaryTerm | undefined {
  const q = normalize(raw);
  if (!q) return undefined;
  return glossary.find(
    (g) => normalize(g.term) === q || g.aliases.some((a) => normalize(a) === q),
  ) ?? glossary.find(
    (g) => q.includes(normalize(g.term)) || g.aliases.some((a) => q.includes(normalize(a))),
  );
}
