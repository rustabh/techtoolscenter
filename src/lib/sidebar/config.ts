export interface SidebarLink {
  label: string;
  href?: string;
  external?: boolean;
  comingSoon?: boolean;
  /** Triggers a UI action instead of navigating. */
  action?: "command-palette" | "incinc" | "shortcuts" | "theme";
}

export interface SidebarSection {
  id: string;
  label: string;
  emoji: string;
  icon: string;
  items: SidebarLink[];
}

/**
 * Every item here is either a real, already-shipped destination on this site,
 * or explicitly flagged `comingSoon` — never a fabricated page. When a new
 * section genuinely ships, flip its `comingSoon` flag instead of adding a
 * new item, so this stays the single source of truth for the sidebar.
 */
export const sidebarSections: SidebarSection[] = [
  {
    id: "productivity",
    label: "Productivity",
    emoji: "🛠",
    icon: "Wrench",
    items: [
      { label: "Tool Collections", href: "/collections" },
      { label: "Quick Actions", action: "command-palette" },
      { label: "Templates", comingSoon: true },
      { label: "Workflow Hub", action: "incinc" },
    ],
  },
  {
    id: "ai",
    label: "AI",
    emoji: "🤖",
    icon: "Bot",
    items: [
      { label: "AI Hub", href: "/ai-hub" },
      { label: "Prompt Library", href: "/ai-hub/prompts" },
      { label: "AI News", comingSoon: true },
      { label: "AI Comparisons", href: "/ai-hub/compare" },
      { label: "AI Learning", comingSoon: true },
    ],
  },
  {
    id: "developer",
    label: "Developer",
    emoji: "👨‍💻",
    icon: "Code2",
    items: [
      { label: "Developer Hub", href: "/developer-hub" },
      { label: "Playgrounds", href: "/developer-hub/playground" },
      { label: "Browser Utilities", href: "/developer-hub/browser-tools" },
      { label: "API Hub", href: "/developer-hub/api-tools" },
      { label: "Roadmaps", comingSoon: true },
      { label: "Documentation", comingSoon: true },
    ],
  },
  {
    id: "design",
    label: "Design",
    emoji: "🎨",
    icon: "Palette",
    items: [
      { label: "Design Hub", href: "/developer-hub/ui-kits" },
      { label: "Brand Kit", href: "/tools/brand-kit-generator" },
      { label: "Icons", href: "/developer-hub/icons" },
      { label: "Fonts", href: "/tools/font-style-generator" },
      { label: "Gradients", href: "/tools/gradient-generator" },
      { label: "Illustrations", href: "/developer-hub/illustrations" },
      { label: "Mockups", href: "/tools/website-mockup-generator" },
      { label: "Patterns", comingSoon: true },
    ],
  },
  {
    id: "india",
    label: "India",
    emoji: "🇮🇳",
    icon: "Landmark",
    items: [
      { label: "India Hub", href: "/india-services" },
      { label: "Government Guides", href: "/india-services/finder" },
      { label: "Government Updates", href: "/updates/category/government" },
      { label: "Official Websites", href: "/india-services/official-websites" },
    ],
  },
  {
    id: "startup",
    label: "Startup",
    emoji: "🚀",
    icon: "Rocket",
    items: [
      { label: "Startup Hub", href: "/collections/business-toolkit" },
      { label: "Business Templates", comingSoon: true },
      { label: "Pitch Decks", comingSoon: true },
      { label: "Business Plan", comingSoon: true },
      { label: "Proposal Generator", comingSoon: true },
    ],
  },
  {
    id: "learning",
    label: "Learning",
    emoji: "📚",
    icon: "BookOpen",
    items: [
      { label: "Blog", href: "/blog" },
      { label: "Learning Center", comingSoon: true },
      { label: "Tutorials", href: "/developer-hub/learning" },
      { label: "Tech News", href: "/updates" },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    emoji: "🌍",
    icon: "Globe",
    items: [
      { label: "Free Hosting", href: "/developer-hub/hosting" },
      { label: "Free APIs", href: "/developer-hub/api-tools" },
      { label: "Free Fonts", href: "/tools/font-style-generator" },
      { label: "Free Icons", href: "/developer-hub/icons" },
      { label: "Free Images", href: "/developer-hub/illustrations" },
      { label: "Chrome Extensions", href: "/ai-hub/collections/best-ai-chrome-extensions" },
      { label: "Useful Websites", comingSoon: true },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    emoji: "⚙",
    icon: "Settings",
    items: [
      { label: "Theme", action: "theme" },
      { label: "Keyboard Shortcuts", action: "shortcuts" },
      { label: "Feedback", href: "/contact" },
      { label: "About", href: "/about" },
    ],
  },
];
