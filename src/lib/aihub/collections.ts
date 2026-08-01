export interface AiCollection {
  slug: string;
  name: string;
  description: string;
  icon: string;
  toolSlugs: string[];
}

export const aiCollections: AiCollection[] = [
  { slug: "best-ai-for-students", name: "Best AI for Students", description: "Research, study and writing help for coursework.", icon: "GraduationCap", toolSlugs: ["chatgpt", "claude", "gemini", "perplexity", "notebooklm", "elicit", "consensus", "grammarly", "quillbot", "socratic"] },
  { slug: "best-ai-for-developers", name: "Best AI for Developers", description: "AI pair-programmers and coding agents.", icon: "Code2", toolSlugs: ["cursor", "github-copilot", "windsurf", "replit-ai", "v0", "codeium", "cline", "amazon-q-developer", "jetbrains-ai-assistant"] },
  { slug: "best-ai-for-designers", name: "Best AI for Designers", description: "Image, layout and creative-asset generation.", icon: "Palette", toolSlugs: ["canva-ai", "uizard", "framer-ai", "midjourney", "leonardo-ai", "spline-ai", "looka", "galileo-ai"] },
  { slug: "best-ai-for-businesses", name: "Best AI for Businesses", description: "General-purpose assistants for running day-to-day operations.", icon: "Briefcase", toolSlugs: ["hubspot-ai", "glean", "zapier-ai", "intercom-fin", "notion-ai", "clay", "airtable-ai"] },
  { slug: "best-ai-for-marketing", name: "Best AI for Marketing", description: "Campaign copy, ad creative and content at scale.", icon: "Megaphone", toolSlugs: ["hubspot-ai", "adcreative-ai", "jasper", "copy-ai", "writesonic", "anyword", "ocoya"] },
  { slug: "best-ai-for-content-creators", name: "Best AI for Content Creators", description: "Scripts, visuals, voiceovers and editing for creators.", icon: "Video", toolSlugs: ["midjourney", "runway", "elevenlabs", "suno", "canva-ai", "dreamina", "hedra"] },
  { slug: "best-ai-for-video-editing", name: "Best AI for Video Editing", description: "Generate, edit and polish video with AI.", icon: "Film", toolSlugs: ["runway", "pika", "descript", "heygen", "synthesia", "kling-ai", "hailuo-ai"] },
  { slug: "best-ai-for-coding", name: "Best AI for Coding", description: "The strongest AI tools for writing and shipping code.", icon: "Terminal", toolSlugs: ["cursor", "github-copilot", "windsurf", "bolt", "lovable", "v0", "replit-ai", "cline"] },
  { slug: "best-ai-for-resume-writing", name: "Best AI for Resume Writing", description: "Build and tailor a resume with AI.", icon: "FileUser", toolSlugs: ["rezi", "teal", "kickresume", "novoresume", "enhancv"] },
  { slug: "best-ai-for-research", name: "Best AI for Research", description: "Summarize papers, find sources and reason over documents.", icon: "FileSearch", toolSlugs: ["perplexity", "elicit", "consensus", "notebooklm", "chatgpt", "scite", "scispace"] },
  { slug: "best-ai-for-productivity", name: "Best AI for Productivity", description: "Meeting notes, task management and everyday work assistants.", icon: "ClipboardList", toolSlugs: ["notion-ai", "otter-ai", "fireflies-ai", "superhuman", "shortwave", "motion", "reclaim-ai", "taskade"] },
  { slug: "best-open-source-ai", name: "Best Open Source AI", description: "AI tools you can self-host or inspect the code of.", icon: "Github", toolSlugs: ["continue-dev", "autogpt", "crewai", "n8n", "stable-diffusion", "cline", "huggingchat"] },
  { slug: "best-free-ai-tools", name: "Best Free AI Tools", description: "Genuinely free AI tools, no credit card required.", icon: "Gem", toolSlugs: ["meta-ai", "pi-ai", "google-translate", "continue-dev", "autogpt", "n8n", "stable-diffusion", "huggingchat", "bing-image-creator"] },
  { slug: "best-ai-chrome-extensions", name: "Best AI Chrome Extensions", description: "AI that works right inside your browser.", icon: "Chrome", toolSlugs: ["perplexity", "deepl", "google-translate", "remove-bg", "grammarly"] },
];

export function getAiCollection(slug: string) {
  return aiCollections.find((c) => c.slug === slug);
}
