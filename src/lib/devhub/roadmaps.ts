import { devCategories, getDevCategory } from "./categories";

export interface RoadmapStep {
  title: string;
  description: string;
  categorySlug: string; // DevCategory slug — resolved to /developer-hub/[category]
}

export interface Roadmap {
  slug: string;
  name: string;
  icon: string; // lucide-react icon name
  tagline: string;
  description: string;
  steps: RoadmapStep[];
}

/**
 * Role-based learning paths built entirely from TechToolsCenter's own
 * Developer Hub categories — every step links to a real, already-populated
 * category page, in the order most people actually learn it. No external
 * links here by design: for a broader map of the whole ecosystem, external
 * resources like roadmap.sh are better suited (see Developer Hub: Learning).
 */
export const roadmaps: Roadmap[] = [
  {
    slug: "frontend-developer",
    name: "Frontend Developer",
    icon: "MonitorSmartphone",
    tagline: "From HTML basics to a deployed, tested UI",
    description: "The path most frontend developers actually follow — core languages first, then a framework, a styling approach, reusable components, and finally testing and shipping.",
    steps: [
      { title: "Learn the core languages", description: "HTML, CSS and JavaScript are non-negotiable — everything else is built on top of them.", categorySlug: "languages" },
      { title: "Get comfortable with frontend tooling", description: "Bundlers, dev servers and the everyday build tooling that sits under every modern frontend project.", categorySlug: "frontend" },
      { title: "Pick a framework", description: "React, Vue, Svelte and others — pick one and go deep rather than sampling all of them at once.", categorySlug: "frameworks" },
      { title: "Add a styling approach", description: "Tailwind and other utility-first or component-based CSS libraries that scale better than plain stylesheets.", categorySlug: "css-libraries" },
      { title: "Reach for component libraries", description: "Copy-paste and Tailwind-based component collections so you're not rebuilding buttons and modals from scratch.", categorySlug: "component-libraries" },
      { title: "Learn to test what you build", description: "Unit and end-to-end testing — catching regressions before your users do.", categorySlug: "testing" },
      { title: "Ship it", description: "Deploy your app to production — most modern hosts get you live in minutes.", categorySlug: "deployment" },
    ],
  },
  {
    slug: "backend-developer",
    name: "Backend Developer",
    icon: "Server",
    tagline: "From a server framework to a deployed, monitored API",
    description: "Backend work is less about picking the trendiest framework and more about the fundamentals — data, auth, and knowing when something breaks in production.",
    steps: [
      { title: "Learn a core language", description: "Pick a backend-capable language and get genuinely comfortable with it before adding a framework on top.", categorySlug: "languages" },
      { title: "Pick a server framework", description: "The framework that handles routing, requests and responses for your API or app.", categorySlug: "backend" },
      { title: "Learn a database", description: "SQL, NoSQL or a backend-as-a-service data store — most real apps need at least one.", categorySlug: "databases" },
      { title: "Add authentication", description: "Login, sessions and identity — almost every real backend needs this, and it's easy to get wrong.", categorySlug: "authentication" },
      { title: "Design your API properly", description: "Tools to design, document and explore the API you're building, before consumers depend on it.", categorySlug: "api-tools" },
      { title: "Test it", description: "API and integration testing — the backend equivalent of not shipping blind.", categorySlug: "testing" },
      { title: "Deploy and monitor it", description: "Ship to production, then keep an eye on errors and performance once real traffic hits it.", categorySlug: "deployment" },
    ],
  },
  {
    slug: "full-stack-developer",
    name: "Full-Stack Developer",
    icon: "Layers",
    tagline: "Frontend and backend, in the order that avoids rework",
    description: "Full-stack doesn't mean learning everything at once — it means learning the frontend and backend paths in an order where each piece has something real to connect to.",
    steps: [
      { title: "Core languages", description: "HTML, CSS, JavaScript and a backend-capable language — the shared foundation for everything below.", categorySlug: "languages" },
      { title: "A frontend framework", description: "React, Vue, Svelte or similar — the UI layer your users actually see.", categorySlug: "frameworks" },
      { title: "A backend framework", description: "The server layer that powers your frontend with real data and logic.", categorySlug: "backend" },
      { title: "A database", description: "Where your app's actual data lives, once it needs to persist anything.", categorySlug: "databases" },
      { title: "Authentication", description: "Connect real user accounts across both the frontend and backend you've built.", categorySlug: "authentication" },
      { title: "API design", description: "The contract between your frontend and backend — worth getting deliberate about early.", categorySlug: "api-tools" },
      { title: "Deployment", description: "Ship the whole stack — frontend and backend — to production.", categorySlug: "deployment" },
    ],
  },
  {
    slug: "devops-engineer",
    name: "DevOps Engineer",
    icon: "Workflow",
    tagline: "From version control to a monitored, secured production system",
    description: "DevOps sits across the whole delivery pipeline — this path goes from the basics everyone needs to the infrastructure and security layer that's specific to the role.",
    steps: [
      { title: "Master version control", description: "Git and the platforms built around it — the foundation every other step in this path assumes.", categorySlug: "version-control" },
      { title: "Get fluent with package managers", description: "Installing and managing dependencies reliably, across languages and environments.", categorySlug: "package-managers" },
      { title: "Learn cloud infrastructure", description: "The cloud providers most production systems actually run on.", categorySlug: "cloud" },
      { title: "Build CI/CD and automation skills", description: "Containers, CI/CD pipelines and the infrastructure-automation tooling that defines the role.", categorySlug: "devops" },
      { title: "Get comfortable deploying", description: "Shipping code to production reliably and repeatably, not just once by hand.", categorySlug: "deployment" },
      { title: "Add monitoring", description: "Error tracking, logging and analytics — knowing something broke before a user tells you.", categorySlug: "monitoring" },
      { title: "Layer in security", description: "Scanning, hardening and securing the systems you're now responsible for keeping up.", categorySlug: "security" },
    ],
  },
];

export function getRoadmap(slug: string): Roadmap | undefined {
  return roadmaps.find((r) => r.slug === slug);
}

/** Resolves each step's category slug to its real DevCategory — used to render name/icon/href consistently and to fail loudly (undefined) if a slug ever drifts out of sync with devCategories. */
export function resolvedSteps(roadmap: Roadmap) {
  return roadmap.steps.map((step) => ({ ...step, category: getDevCategory(step.categorySlug) }));
}

// Sanity check, evaluated at module load: every roadmap step must reference
// a category that actually exists — never a dangling/fabricated link.
for (const roadmap of roadmaps) {
  for (const step of roadmap.steps) {
    if (!devCategories.some((c) => c.slug === step.categorySlug)) {
      throw new Error(`Roadmap "${roadmap.slug}" references unknown category "${step.categorySlug}"`);
    }
  }
}
