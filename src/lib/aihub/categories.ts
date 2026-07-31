import type { AiCategory } from "./types";

export const aiCategories: AiCategory[] = [
  { slug: "chatbots", name: "Chatbots", description: "General-purpose conversational AI assistants.", icon: "MessageCircle" },
  { slug: "image-generation", name: "Image Generation", description: "Create and edit images from text prompts.", icon: "Image" },
  { slug: "video-generation", name: "Video Generation", description: "Generate and edit video from text, images or scripts.", icon: "Video" },
  { slug: "audio-generation", name: "Audio Generation", description: "Generate speech, sound effects and audio content.", icon: "Mic" },
  { slug: "music-generation", name: "Music Generation", description: "Compose original music and songs from a prompt.", icon: "Music2" },
  { slug: "voice-ai", name: "Voice AI", description: "Realistic voice cloning, narration and text-to-speech.", icon: "MicVocal" },
  { slug: "coding", name: "Coding", description: "AI assistants and editors for writing and shipping code.", icon: "Code2" },
  { slug: "productivity", name: "Productivity", description: "AI note-taking, meetings and everyday work assistants.", icon: "ClipboardList" },
  { slug: "writing", name: "Writing", description: "Grammar, copywriting and long-form writing assistants.", icon: "PenLine" },
  { slug: "marketing", name: "Marketing", description: "Ad copy, campaigns and marketing content generation.", icon: "Megaphone" },
  { slug: "design", name: "Design", description: "AI-assisted graphic and product design.", icon: "Palette" },
  { slug: "presentation", name: "Presentation", description: "Turn an outline or prompt into a designed slide deck.", icon: "Presentation" },
  { slug: "research", name: "Research", description: "Summarize papers, find sources and reason over documents.", icon: "FileSearch" },
  { slug: "translation", name: "Translation", description: "Translate text and speech between languages.", icon: "Languages" },
  { slug: "education", name: "Education", description: "AI tutors and personalized learning tools.", icon: "GraduationCap" },
  { slug: "legal", name: "Legal", description: "Contract review and legal research assistants.", icon: "Scale" },
  { slug: "finance", name: "Finance", description: "AI assistants for budgeting, investing and money management.", icon: "Coins" },
  { slug: "healthcare", name: "Healthcare", description: "Clinical documentation and health-focused AI assistants.", icon: "Stethoscope" },
  { slug: "business", name: "Business", description: "General-purpose AI for running a business.", icon: "Briefcase" },
  { slug: "automation", name: "Automation", description: "Connect apps and automate workflows with AI.", icon: "Workflow" },
  { slug: "agents", name: "Agents", description: "Autonomous AI agents that plan and execute multi-step tasks.", icon: "Bot" },
  { slug: "no-code", name: "No-code", description: "Build apps and websites with AI, without writing code.", icon: "Blocks" },
  { slug: "3d", name: "3D", description: "Generate and edit 3D models and scenes with AI.", icon: "Box" },
  { slug: "animation", name: "Animation", description: "AI-assisted animation and motion generation.", icon: "Film" },
  { slug: "ocr", name: "OCR", description: "Extract text from images, scans and documents.", icon: "Eye" },
  { slug: "pdf-ai", name: "PDF AI", description: "Chat with, summarize and extract data from PDFs.", icon: "FileText" },
  { slug: "resume", name: "Resume", description: "AI resume and cover letter writing assistants.", icon: "FileUser" },
  { slug: "email", name: "Email", description: "AI-assisted email writing and inbox management.", icon: "Mail" },
  { slug: "social-media", name: "Social Media", description: "Plan, write and schedule social content with AI.", icon: "Share2" },
  { slug: "seo", name: "SEO", description: "AI-assisted keyword research and content optimization.", icon: "Rocket" },
  { slug: "customer-support", name: "Customer Support", description: "AI chatbots and copilots for customer service teams.", icon: "MessagesSquare" },
];

export function getAiCategory(slug: string): AiCategory | undefined {
  return aiCategories.find((c) => c.slug === slug);
}
