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
  {
    term: "Redis",
    aliases: [],
    explanation:
      "Redis is an in-memory data store, most often used as a fast cache in front of a slower database, since reading from RAM is dramatically quicker than reading from disk. It also doubles as a simple queue and pub/sub system in many backends.",
    learnMoreHref: "/blog/what-is-redis-why-developers-use-it-for-caching",
    learnMoreLabel: "What Is Redis?",
  },
  {
    term: "Docker",
    aliases: ["container", "containers", "containerization", "containerisation"],
    explanation:
      "Docker packages an application together with everything it needs to run — code, dependencies, system libraries — into a single container image, so it behaves identically on a developer's laptop, a test server, and production.",
    learnMoreHref: "/blog/what-is-docker-containers-explained-for-beginners",
    learnMoreLabel: "What Is Docker?",
  },
  {
    term: "Kubernetes",
    aliases: ["k8s"],
    explanation:
      "Kubernetes is a system for running many containers across a cluster of machines automatically — restarting ones that crash, scaling up under load, and rolling out new versions without downtime.",
    learnMoreHref: "/blog/what-is-kubernetes-container-orchestration-explained",
    learnMoreLabel: "What Is Kubernetes?",
  },
  {
    term: "RAG",
    aliases: ["retrieval augmented generation", "retrieval-augmented generation"],
    explanation:
      "RAG (Retrieval-Augmented Generation) is a pattern where an AI system first searches a knowledge base for the most relevant information, then hands that information to a language model as context — so it answers using real, specific content instead of only what it learned during training.",
    learnMoreHref: "/blog/what-is-rag-retrieval-augmented-generation-explained",
    learnMoreLabel: "What Is RAG?",
  },
  {
    term: "Vector Database",
    aliases: ["vector db", "vector store"],
    explanation:
      "A vector database stores content as numerical embeddings and searches by meaning rather than exact match — finding the records most similar to a query, which is what powers semantic search and RAG pipelines for AI.",
    learnMoreHref: "/blog/what-is-a-vector-database-explained",
    learnMoreLabel: "What Is a Vector Database?",
  },
  {
    term: "CI/CD",
    aliases: ["cicd", "continuous integration", "continuous deployment", "continuous delivery"],
    explanation:
      "CI/CD automates the path from a code commit to a tested, deployed change — running the test suite and build on every push, then packaging and releasing it — so every change goes through the same reliable process instead of a manual, error-prone one.",
    learnMoreHref: "/blog/what-is-ci-cd-continuous-integration-deployment-explained",
    learnMoreLabel: "What Is CI/CD?",
  },
  {
    term: "Message Queue",
    aliases: ["message queues", "job queue"],
    explanation:
      "A message queue holds tasks or events for a separate process to work through, one at a time, so the sender doesn't have to wait for the work to finish — useful for surviving traffic spikes and decoupling slow work from a fast user-facing request.",
    learnMoreHref: "/blog/what-is-a-message-queue-when-do-you-need-one",
    learnMoreLabel: "What Is a Message Queue?",
  },
  {
    term: "Idempotency",
    aliases: ["idempotent"],
    explanation:
      "An idempotent API request produces the same end result no matter how many times it's sent — so if a network hiccup causes a client to accidentally retry a request, it doesn't double-charge a card or create a duplicate order.",
    learnMoreHref: "/blog/what-is-idempotency-in-apis",
    learnMoreLabel: "What Is Idempotency?",
  },
  {
    term: "AI Agent",
    aliases: ["ai agents", "agentic ai"],
    explanation:
      "An AI agent doesn't just answer a question the way a chatbot does — it can take multi-step actions on its own (searching, calling tools, checking its own results) to actually complete a task, deciding what to do next based on what happened at each step.",
    learnMoreHref: "/blog/what-is-an-ai-agent-vs-chatbot",
    learnMoreLabel: "AI Agent vs Chatbot",
  },
  {
    term: "Prompt Injection",
    aliases: ["prompt injection attack"],
    explanation:
      "Prompt injection is an attack where malicious instructions are hidden inside content an AI system processes — a webpage, a document, an email — trying to hijack the AI into ignoring its actual instructions and following the attacker's instead.",
    learnMoreHref: "/blog/what-is-prompt-injection-ai-security",
    learnMoreLabel: "What Is Prompt Injection?",
  },
  {
    term: "Load Balancer",
    aliases: ["load balancing", "load balancers"],
    explanation:
      "A load balancer sits in front of multiple servers and spreads incoming requests across them, so no single server gets overwhelmed and traffic keeps flowing even if one server goes down.",
    learnMoreHref: "/blog/what-is-a-load-balancer-how-does-it-work",
    learnMoreLabel: "What Is a Load Balancer?",
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
