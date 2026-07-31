import type { DevCategory } from "./types";

export const devCategories: DevCategory[] = [
  { slug: "frontend", name: "Frontend", description: "Build tooling and everyday frontend essentials.", icon: "MonitorSmartphone" },
  { slug: "backend", name: "Backend", description: "Server-side frameworks for building APIs and apps.", icon: "Server" },
  { slug: "frameworks", name: "Frameworks", description: "The frontend frameworks powering modern web apps.", icon: "Blocks" },
  { slug: "languages", name: "Languages", description: "The core languages of the web.", icon: "Code" },
  { slug: "databases", name: "Databases", description: "SQL, NoSQL and backend-as-a-service data stores.", icon: "Database" },
  { slug: "hosting", name: "Hosting", description: "Static and app hosting for your projects.", icon: "HardDrive" },
  { slug: "version-control", name: "Version Control", description: "Git and the platforms built around it.", icon: "GitBranch" },
  { slug: "package-managers", name: "Package Managers", description: "Install and manage your project's dependencies.", icon: "Package" },
  { slug: "component-libraries", name: "Component Libraries", description: "Copy-paste and Tailwind-based component collections.", icon: "Component" },
  { slug: "ui-kits", name: "UI Kits", description: "Full design-system component libraries.", icon: "LayoutGrid" },
  { slug: "css-libraries", name: "CSS Libraries", description: "Utility-first and classic CSS frameworks.", icon: "Palette" },
  { slug: "icons", name: "Icons", description: "Free icon sets for every project.", icon: "Shapes" },
  { slug: "illustrations", name: "Illustrations", description: "Illustrations and stock photography for design work.", icon: "Image" },
  { slug: "animations", name: "Animations", description: "Motion and animation libraries.", icon: "Sparkles" },
  { slug: "charts", name: "Charts", description: "Data visualization libraries.", icon: "ChartColumn" },
  { slug: "authentication", name: "Authentication", description: "Login, sessions and identity for your app.", icon: "KeyRound" },
  { slug: "cms", name: "CMS", description: "Content management systems, headless and traditional.", icon: "FileStack" },
  { slug: "testing", name: "Testing", description: "Test runners, E2E frameworks and API clients.", icon: "TestTube" },
  { slug: "performance", name: "Performance", description: "Audit and measure real-world site performance.", icon: "Gauge" },
  { slug: "api-tools", name: "API Tools", description: "Design, document and explore APIs.", icon: "Plug" },
  { slug: "ai-coding", name: "AI Coding", description: "AI assistants and editors for writing code faster.", icon: "Bot" },
  { slug: "deployment", name: "Deployment", description: "Ship your app to production in minutes.", icon: "Rocket" },
  { slug: "cloud", name: "Cloud", description: "Cloud infrastructure providers.", icon: "Cloud" },
  { slug: "monitoring", name: "Monitoring", description: "Error tracking, logging and analytics.", icon: "Activity" },
  { slug: "security", name: "Security", description: "Scan, harden and secure your applications.", icon: "ShieldAlert" },
  { slug: "devops", name: "DevOps", description: "Containers, CI/CD and infrastructure automation.", icon: "Workflow" },
  { slug: "browser-tools", name: "Browser Tools", description: "Everyday developer utilities — most built right into TechToolsCenter.", icon: "Wrench" },
  { slug: "learning", name: "Learning", description: "Free places to learn web development.", icon: "GraduationCap" },
];

export function getDevCategory(slug: string): DevCategory | undefined {
  return devCategories.find((c) => c.slug === slug);
}
