import { getTool, getPopularTools, getRecentTools, tools } from "@/lib/tools";
import { pickForWeek } from "@/lib/home/daily";
import { aiTools, featuredAiTools, recentlyAddedAiTools } from "@/lib/aihub/tools";
import { featuredDevResources, recentlyAddedDevResources } from "@/lib/devhub/resources";
import { popularIndiaServices } from "@/lib/india/services";
import { allPosts } from "@/lib/blog/posts";
import type { MegaMenuConfig, MegaMenuLink } from "./types";

function toolLink(slug: string, label?: string): MegaMenuLink {
  const t = getTool(slug);
  return t ? { label: label ?? t.name, href: `/tools/${t.slug}`, description: t.description } : { label: label ?? slug, comingSoon: true };
}

/* ---------------- dynamic single-item resolvers (computed once, no hooks needed) ---------------- */

const popularTools = getPopularTools();
const recentTools = getRecentTools(2);
const toolOfWeek = tools.length ? pickForWeek(tools, 1) : null;

const aiFeatured = featuredAiTools(2);
const aiRecent = recentlyAddedAiTools(2);

const devFeatured = featuredDevResources(2);
const devRecent = recentlyAddedDevResources(2);

const indiaPopular = popularIndiaServices();
const newestPosts = allPosts();
const newestTutorial = newestPosts.find((p) => p.template === "tutorial");

/* ---------------- TOOLS ---------------- */

export const toolsMenu: MegaMenuConfig = {
  id: "tools",
  label: "Tools",
  href: "/tools",
  columns: [
    {
      title: "Popular",
      icon: "Star",
      groups: [{ items: [
        toolLink("image-studio", "Image Studio"),
        toolLink("pdf-studio", "PDF Studio"),
        toolLink("qr-generator", "QR Studio"),
        { label: "Text Studio", href: "/collections/text-studio", description: "Fancy fonts, symbols & text transformers." },
        { label: "Calculator Hub", href: "/collections/calculator-hub", description: "Every calculator in one place." },
        { label: "Converter Hub", href: "/collections/converter-hub", description: "Units, measurements and colours." },
        { label: "Business Tools", href: "/collections/business-toolkit", description: "Invoices, quotations, receipts & more." },
        { label: "Developer Tools", href: "/collections/developer-studio", description: "Encoders, formatters, generators." },
      ] }],
    },
    {
      title: "Categories",
      icon: "LayoutGrid",
      groups: [{ items: [
        { label: "Image", href: "/category/image" },
        { label: "PDF", href: "/collections/pdf-toolkit" },
        { label: "QR", href: "/collections/qr-studio" },
        { label: "Text", href: "/category/text" },
        { label: "Calculators", href: "/category/calculators" },
        { label: "Creative", href: "/category/creative" },
        { label: "Business", href: "/category/business" },
        { label: "Security", href: "/collections/security-studio" },
        { label: "Developer", href: "/category/developer" },
        { label: "Utilities", href: "/category/everyday" },
      ] }],
    },
    {
      title: "Featured",
      icon: "Sparkles",
      groups: [{ items: [
        popularTools[0] ? { label: "Trending Tools", href: `/tools/${popularTools[0].slug}`, description: popularTools[0].name, badge: "Trending" } : { label: "Trending Tools", comingSoon: true },
        recentTools[0] ? { label: "Recently Added", href: `/tools/${recentTools[0].slug}`, description: recentTools[0].name, badge: "New" } : { label: "Recently Added", comingSoon: true },
        toolOfWeek ? { label: "Tool of the Week", href: `/tools/${toolOfWeek.slug}`, description: toolOfWeek.name } : { label: "Tool of the Week", comingSoon: true },
        popularTools[1] ? { label: "Most Used", href: `/tools/${popularTools[1].slug}`, description: popularTools[1].name } : { label: "Most Used", comingSoon: true },
        recentTools[1] ? { label: "New Releases", href: `/tools/${recentTools[1].slug}`, description: recentTools[1].name, badge: "New" } : { label: "New Releases", comingSoon: true },
      ] }],
    },
    {
      title: "Quick Actions",
      icon: "Zap",
      groups: [{ items: [
        toolLink("image-compressor", "Compress Image"),
        toolLink("pdf-compress", "Compress PDF"),
        toolLink("pdf-merge", "Merge PDF"),
        toolLink("image-resizer", "Resize Image"),
        toolLink("qr-generator", "Generate QR"),
        toolLink("invoice-maker", "Create Invoice"),
        toolLink("image-studio", "Remove BG"),
      ] }],
    },
  ],
  featured: {
    eyebrow: "🚀 New",
    title: "Incinc AI",
    subtitle: "Ask. Discover. Build.",
    cta: "Try Now",
    action: "incinc",
  },
  quickAccess: [
    { label: "View All", href: "/tools" },
    { label: "Popular", href: "/collections" },
    recentTools[0] ? { label: "Recently Added", href: `/tools/${recentTools[0].slug}` } : { label: "Recently Added", href: "/tools" },
    popularTools[0] ? { label: "Trending", href: `/tools/${popularTools[0].slug}` } : { label: "Trending", href: "/tools" },
    { label: "What's New", href: "/updates" },
  ],
};

/* ---------------- AI HUB ---------------- */

export const aiHubMenu: MegaMenuConfig = {
  id: "ai-hub",
  label: "AI Hub",
  href: "/ai-hub",
  columns: [
    {
      title: "Discover",
      icon: "Sparkles",
      groups: [{ items: [
        { label: "Featured AI", href: "/ai-hub", description: "Hand-picked tools across every category." },
        { label: "AI Categories", href: "/ai-hub/chatbots", description: "Browse by category — starting with Chatbots." },
        { label: "AI Comparisons", href: "/ai-hub/compare" },
        { label: "Prompt Library", href: "/ai-hub/prompts" },
      ] }],
    },
    {
      title: "Learn & Explore",
      icon: "BookOpen",
      groups: [{ items: [
        { label: "AI Learning", href: "/ai-hub/learning" },
        { label: "AI News", href: "/ai-hub/news" },
        { label: "AI Workflows", action: "incinc", description: "Ask Incinc AI to build one." },
      ] }],
    },
    {
      title: "Browse",
      icon: "Filter",
      groups: [{ items: [
        { label: "Free AI Tools", href: "/ai-hub/collections/best-free-ai-tools" },
        { label: "Open Source AI", href: "/ai-hub/collections/best-open-source-ai" },
        aiRecent[0] ? { label: "Latest AI Releases", href: aiRecent[0].officialUrl, external: true, description: aiRecent[0].name, badge: "New" } : { label: "Latest AI Releases", comingSoon: true },
      ] }],
    },
  ],
  featured: {
    eyebrow: "⭐ Featured",
    title: "AI Hub",
    subtitle: `Explore ${aiTools.length}+ AI tools`,
    cta: "Explore",
    href: "/ai-hub",
  },
  quickAccess: [
    { label: "View All", href: "/ai-hub" },
    aiFeatured[0] ? { label: "Popular", href: aiFeatured[0].officialUrl, external: true } : { label: "Popular", href: "/ai-hub" },
    aiRecent[0] ? { label: "Recently Added", href: aiRecent[0].officialUrl, external: true } : { label: "Recently Added", href: "/ai-hub" },
    aiFeatured[1] ? { label: "Trending", href: aiFeatured[1].officialUrl, external: true } : { label: "Trending", href: "/ai-hub" },
    { label: "What's New", href: "/updates" },
  ],
};

/* ---------------- DEVELOPER HUB ---------------- */

export const developerHubMenu: MegaMenuConfig = {
  id: "developer-hub",
  label: "Developer Hub",
  href: "/developer-hub",
  columns: [
    {
      title: "Build",
      icon: "Code2",
      groups: [{ items: [
        { label: "Frontend", href: "/developer-hub/frontend" },
        { label: "Backend", href: "/developer-hub/backend" },
        { label: "Languages", href: "/developer-hub/languages" },
        { label: "Frameworks", href: "/developer-hub/frameworks" },
        { label: "Databases", href: "/developer-hub/databases" },
        { label: "Component Libraries", href: "/developer-hub/component-libraries" },
      ] }],
    },
    {
      title: "Ship",
      icon: "Rocket",
      groups: [{ items: [
        { label: "Hosting", href: "/developer-hub/hosting" },
        { label: "Deployment", href: "/developer-hub/deployment" },
        { label: "API Hub", href: "/developer-hub/api-tools" },
        { label: "Browser Utilities", href: "/developer-hub/browser-tools" },
      ] }],
    },
    {
      title: "Learn",
      icon: "GraduationCap",
      groups: [{ items: [
        { label: "Playgrounds", href: "/developer-hub/playground" },
        { label: "Roadmaps", href: "/developer-hub/roadmaps" },
        { label: "Documentation", href: "/developer-hub/documentation" },
        { label: "Useful Developer Websites", href: "/developer-hub/learning" },
      ] }],
    },
  ],
  featured: {
    eyebrow: "⭐ Featured",
    title: "Developer Playground",
    subtitle: "Run code snippets right in the browser",
    cta: "Open Playground",
    href: "/developer-hub/playground",
  },
  quickAccess: [
    { label: "View All", href: "/developer-hub" },
    devFeatured[0] ? { label: "Popular", href: devFeatured[0].internalToolSlug ? `/tools/${devFeatured[0].internalToolSlug}` : devFeatured[0].officialUrl, external: !devFeatured[0].internalToolSlug } : { label: "Popular", href: "/developer-hub" },
    devRecent[0] ? { label: "Recently Added", href: devRecent[0].internalToolSlug ? `/tools/${devRecent[0].internalToolSlug}` : devRecent[0].officialUrl, external: !devRecent[0].internalToolSlug } : { label: "Recently Added", href: "/developer-hub" },
    devFeatured[1] ? { label: "Trending", href: devFeatured[1].internalToolSlug ? `/tools/${devFeatured[1].internalToolSlug}` : devFeatured[1].officialUrl, external: !devFeatured[1].internalToolSlug } : { label: "Trending", href: "/developer-hub" },
    { label: "What's New", href: "/updates" },
  ],
};

/* ---------------- INDIA HUB ---------------- */

export const indiaHubMenu: MegaMenuConfig = {
  id: "india-hub",
  label: "India Hub",
  href: "/india-services",
  columns: [
    {
      title: "Identity",
      icon: "IdCard",
      groups: [{ items: [
        { label: "Aadhaar", href: "/india-services/identity-documents/aadhaar-card" },
        { label: "PAN", href: "/india-services/identity-documents/pan-card" },
        { label: "Passport", href: "/india-services/travel-immigration/passport" },
        { label: "Driving Licence", href: "/india-services/vehicles/driving-licence" },
        { label: "Voter ID", href: "/india-services/identity-documents/voter-id" },
        { label: "ABHA", href: "/india-services/healthcare/abha-health-id" },
      ] }],
    },
    {
      title: "Business",
      icon: "Briefcase",
      groups: [{ items: [
        { label: "GST", href: "/india-services/business-tax/gst-registration" },
        { label: "MSME", href: "/india-services/business-tax/msme-udyam" },
        { label: "IEC", href: "/india-services/business-tax/iec-code" },
        { label: "Income Tax", href: "/india-services/business-tax/itr-filing" },
        { label: "EPFO", href: "/india-services/employment/epfo" },
        { label: "ESIC", href: "/india-services/employment/esic" },
      ] }],
    },
    {
      title: "Certificates",
      icon: "ScrollText",
      groups: [{ items: [
        { label: "Birth Certificate", href: "/india-services/certificates/birth-certificate" },
        { label: "Death Certificate", href: "/india-services/certificates/death-certificate" },
        { label: "Marriage Certificate", href: "/india-services/certificates/marriage-certificate" },
        { label: "Income Certificate", href: "/india-services/certificates/income-certificate" },
        { label: "Caste Certificate", href: "/india-services/certificates/caste-certificate" },
        { label: "Domicile", href: "/india-services/certificates/domicile-certificate" },
      ] }],
    },
    {
      title: "More",
      icon: "Landmark",
      groups: [{ items: [
        { label: "Property Records", href: "/india-services/certificates/property-encumbrance-certificate" },
        { label: "Utility Services", href: "/india-services/utilities" },
        { label: "Government Updates", href: "/updates/category/government" },
        { label: "Official Websites", href: "/india-services/official-websites" },
        { label: "Latest Schemes", href: "/india-services/schemes" },
      ] }],
    },
  ],
  featured: {
    eyebrow: "⭐ Featured",
    title: "India Hub",
    subtitle: "Official guides, documents and government links",
    cta: "Explore",
    href: "/india-services",
  },
  quickAccess: [
    { label: "View All", href: "/india-services" },
    indiaPopular[0] ? { label: "Popular", href: `/india-services/${indiaPopular[0].category}/${indiaPopular[0].slug}` } : { label: "Popular", href: "/india-services" },
    { label: "Recently Added", href: "/india-services/schemes" },
    indiaPopular[1] ? { label: "Trending", href: `/india-services/${indiaPopular[1].category}/${indiaPopular[1].slug}` } : { label: "Trending", href: "/india-services" },
    { label: "What's New", href: "/updates/category/government" },
  ],
};

/* ---------------- BLOG ---------------- */

export const blogMenu: MegaMenuConfig = {
  id: "blog",
  label: "Blog",
  href: "/blog",
  columns: [
    {
      title: "Discover",
      icon: "Newspaper",
      groups: [{ items: [
        newestPosts[0] ? { label: "Latest Articles", href: `/blog/${newestPosts[0].slug}`, description: newestPosts[0].title, badge: "New" } : { label: "Latest Articles", href: "/blog" },
        { label: "Popular Guides", href: "/blog/category/guides" },
        newestTutorial ? { label: "Trending Tutorials", href: `/blog/${newestTutorial.slug}`, description: newestTutorial.title } : { label: "Trending Tutorials", comingSoon: true },
      ] }],
    },
    {
      title: "By Topic",
      icon: "LayoutGrid",
      groups: [{ items: [
        { label: "Image Guides", href: "/blog/category/design" },
        { label: "Developer Guides", href: "/blog/category/developer" },
        { label: "SEO Guides", href: "/blog/category/seo" },
      ] }],
    },
    {
      title: "More Topics",
      icon: "Tag",
      groups: [{ items: [
        { label: "Business Guides", href: "/blog/category/business" },
        { label: "PDF Guides", href: "/blog/tag/pdf" },
        { label: "AI Guides", href: "/blog/tag/ai" },
        { label: "Government Guides", href: "/blog/tag/india" },
      ] }],
    },
  ],
  featured: {
    eyebrow: "🚀 New",
    title: "Incinc AI",
    subtitle: "Ask. Discover. Build.",
    cta: "Try Now",
    action: "incinc",
  },
  quickAccess: [
    { label: "View All", href: "/blog" },
    { label: "Popular", href: "/blog" },
    newestPosts[0] ? { label: "Recently Added", href: `/blog/${newestPosts[0].slug}` } : { label: "Recently Added", href: "/blog" },
    newestPosts[1] ? { label: "Trending", href: `/blog/${newestPosts[1].slug}` } : { label: "Trending", href: "/blog" },
    { label: "What's New", href: "/updates" },
  ],
};

export const megaMenus: MegaMenuConfig[] = [toolsMenu, aiHubMenu, developerHubMenu, indiaHubMenu, blogMenu];
