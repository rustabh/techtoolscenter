import type { AiTool } from "./types";

export const aiTools: AiTool[] = [
  {
    "slug": "chatgpt",
    "name": "ChatGPT",
    "category": "chatbots",
    "developer": "OpenAI",
    "officialUrl": "https://chat.openai.com",
    "overview": "A general-purpose conversational assistant that can answer questions, draft text, and reason through multi-step problems across many domains.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "platforms": [
      "Web",
      "Mobile",
      "Desktop"
    ],
    "tags": [
      "chatbot",
      "assistant",
      "writing",
      "coding"
    ],
    "relatedTools": [
      "word-counter",
      "markdown-converter"
    ],
    "icon": "MessageCircle",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "claude",
    "name": "Claude",
    "category": "chatbots",
    "developer": "Anthropic",
    "officialUrl": "https://claude.ai",
    "overview": "A conversational assistant built for long-form reasoning, document analysis, and coding help, with a focus on careful, thorough responses.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "platforms": [
      "Web",
      "Mobile",
      "Desktop"
    ],
    "tags": [
      "chatbot",
      "assistant",
      "writing",
      "analysis"
    ],
    "relatedTools": [
      "word-counter",
      "pdf-studio"
    ],
    "icon": "MessageCircle",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "gemini",
    "name": "Gemini",
    "category": "chatbots",
    "developer": "Google",
    "officialUrl": "https://gemini.google.com",
    "overview": "Google's conversational AI assistant that integrates with search and Google Workspace apps to help with everyday questions and tasks.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "platforms": [
      "Web",
      "Mobile"
    ],
    "tags": [
      "chatbot",
      "assistant",
      "search",
      "productivity"
    ],
    "relatedTools": [
      "word-counter"
    ],
    "icon": "Sparkles",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "microsoft-copilot",
    "name": "Microsoft Copilot",
    "category": "chatbots",
    "developer": "Microsoft",
    "officialUrl": "https://copilot.microsoft.com",
    "overview": "A chat assistant embedded across Windows, Edge, and Microsoft 365 that helps with search, drafting, and everyday office tasks.",
    "pricing": "Freemium",
    "platforms": [
      "Web",
      "Mobile",
      "Desktop"
    ],
    "tags": [
      "chatbot",
      "assistant",
      "productivity",
      "office"
    ],
    "relatedTools": [
      "word-counter"
    ],
    "icon": "Bot",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "deepseek",
    "name": "DeepSeek",
    "category": "chatbots",
    "developer": "DeepSeek",
    "officialUrl": "https://chat.deepseek.com",
    "overview": "A chatbot built on DeepSeek's open-weight language models, offering conversational answers and step-by-step reasoning for technical questions.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "platforms": [
      "Web",
      "Mobile"
    ],
    "tags": [
      "chatbot",
      "assistant",
      "reasoning",
      "coding"
    ],
    "icon": "MessageCircle",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "le-chat",
    "name": "Le Chat",
    "category": "chatbots",
    "developer": "Mistral AI",
    "officialUrl": "https://chat.mistral.ai",
    "overview": "Mistral AI's chat assistant for conversation, writing help, and code generation, built on the company's own language models.",
    "pricing": "Freemium",
    "platforms": [
      "Web",
      "Mobile"
    ],
    "tags": [
      "chatbot",
      "assistant",
      "writing",
      "coding"
    ],
    "icon": "MessageCircle",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "meta-ai",
    "name": "Meta AI",
    "category": "chatbots",
    "developer": "Meta",
    "officialUrl": "https://meta.ai",
    "overview": "Meta's assistant for chatting, answering questions, and generating content, accessible standalone and inside Meta's own apps like Instagram and WhatsApp.",
    "pricing": "Free",
    "platforms": [
      "Web",
      "Mobile"
    ],
    "tags": [
      "chatbot",
      "assistant",
      "social"
    ],
    "icon": "MessageCircle",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "character-ai",
    "name": "Character AI",
    "category": "chatbots",
    "developer": "Character.AI",
    "officialUrl": "https://character.ai",
    "overview": "A platform for chatting with user-created AI personas and characters, geared toward roleplay, entertainment, and companionship rather than general assistance.",
    "pricing": "Freemium",
    "platforms": [
      "Web",
      "Mobile"
    ],
    "tags": [
      "chatbot",
      "roleplay",
      "entertainment",
      "characters"
    ],
    "icon": "Users",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "pi-ai",
    "name": "Pi AI",
    "category": "chatbots",
    "developer": "Inflection AI",
    "officialUrl": "https://pi.ai",
    "overview": "A conversational assistant designed for supportive, personal-feeling dialogue, emphasizing empathetic back-and-forth chat over task automation.",
    "pricing": "Free",
    "platforms": [
      "Web",
      "Mobile"
    ],
    "tags": [
      "chatbot",
      "assistant",
      "conversation"
    ],
    "icon": "MessageCircle",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "notebooklm",
    "name": "NotebookLM",
    "category": "chatbots",
    "developer": "Google",
    "officialUrl": "https://notebooklm.google",
    "overview": "A research and note-taking assistant that answers questions and generates summaries grounded strictly in documents and sources you upload.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "research",
      "notes",
      "documents",
      "summarization"
    ],
    "relatedTools": [
      "pdf-studio",
      "word-counter"
    ],
    "icon": "BookOpen",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "grok",
    "name": "Grok",
    "category": "chatbots",
    "developer": "xAI",
    "officialUrl": "https://grok.com",
    "overview": "xAI's conversational assistant, integrated with X (formerly Twitter), that answers questions with awareness of real-time posts and trending topics.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "platforms": [
      "Web",
      "Mobile"
    ],
    "tags": [
      "chatbot",
      "assistant",
      "real-time",
      "social"
    ],
    "icon": "MessageCircle",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "perplexity",
    "name": "Perplexity",
    "category": "research",
    "developer": "Perplexity AI",
    "officialUrl": "https://perplexity.ai",
    "overview": "An AI-powered answer engine that searches the web in real time and returns synthesized answers with linked source citations, rather than a plain list of results.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "platforms": [
      "Web",
      "Mobile",
      "Chrome Extension"
    ],
    "tags": [
      "search",
      "research",
      "citations",
      "answer engine"
    ],
    "relatedTools": [
      "pdf-studio",
      "word-counter"
    ],
    "icon": "Search",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "elicit",
    "name": "Elicit",
    "category": "research",
    "developer": "Elicit / Ought",
    "officialUrl": "https://elicit.com",
    "overview": "A research assistant that searches academic literature, extracts key findings from papers, and summarizes them into structured, comparable tables.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "research",
      "academic",
      "papers",
      "summarization"
    ],
    "relatedTools": [
      "pdf-studio",
      "word-counter"
    ],
    "icon": "FileSearch",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "consensus",
    "name": "Consensus",
    "category": "research",
    "developer": "Consensus",
    "officialUrl": "https://consensus.app",
    "overview": "A search engine that queries peer-reviewed scientific papers to answer questions directly, surfacing supporting citations from the underlying studies.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "research",
      "academic",
      "citations",
      "science"
    ],
    "relatedTools": [
      "pdf-studio"
    ],
    "icon": "FileSearch",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "deepl",
    "name": "DeepL",
    "category": "translation",
    "developer": "DeepL",
    "officialUrl": "https://deepl.com",
    "overview": "A neural machine translation service known for producing natural-sounding translations across dozens of languages, with tools for translating documents.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "platforms": [
      "Web",
      "Desktop",
      "Chrome Extension"
    ],
    "tags": [
      "translation",
      "language",
      "documents"
    ],
    "relatedTools": [
      "text-cleaner"
    ],
    "icon": "Languages",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "google-translate",
    "name": "Google Translate",
    "category": "translation",
    "developer": "Google",
    "officialUrl": "https://translate.google.com",
    "overview": "Google's free translation service, using neural machine translation to convert text, speech, and images between a very wide range of languages.",
    "pricing": "Free",
    "apiAvailable": true,
    "platforms": [
      "Web",
      "Mobile",
      "Chrome Extension"
    ],
    "tags": [
      "translation",
      "language",
      "free"
    ],
    "icon": "Languages",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "khanmigo",
    "name": "Khanmigo",
    "category": "education",
    "developer": "Khan Academy",
    "officialUrl": "https://khanmigo.ai",
    "overview": "An AI tutor built into Khan Academy's courses that guides students through problems with Socratic hints instead of just giving away answers.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "education",
      "tutor",
      "learning",
      "students"
    ],
    "icon": "GraduationCap",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "duolingo-max",
    "name": "Duolingo Max",
    "category": "education",
    "developer": "Duolingo",
    "officialUrl": "https://duolingo.com",
    "overview": "A premium AI-powered tier of Duolingo offering features like 'Explain My Answer' and roleplay-style conversation practice to deepen language learning.",
    "pricing": "Paid",
    "platforms": [
      "Mobile",
      "Web"
    ],
    "tags": [
      "education",
      "language learning",
      "roleplay"
    ],
    "icon": "GraduationCap",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "cursor",
    "name": "Cursor",
    "category": "coding",
    "developer": "Anysphere",
    "officialUrl": "https://cursor.com",
    "overview": "An AI-first code editor built on top of VS Code that lets you chat with, edit, and generate code across an entire project using natural language.",
    "pricing": "Freemium",
    "platforms": [
      "Desktop"
    ],
    "tags": [
      "code editor",
      "ai pair programmer",
      "autocomplete",
      "refactoring"
    ],
    "relatedTools": [
      "code-playground"
    ],
    "icon": "Terminal",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "github-copilot",
    "name": "GitHub Copilot",
    "category": "coding",
    "developer": "GitHub / Microsoft",
    "officialUrl": "https://github.com/features/copilot",
    "docsUrl": "https://docs.github.com/copilot",
    "overview": "An AI coding companion embedded in popular editors that suggests completions, explains code, and answers programming questions inline as you type.",
    "pricing": "Freemium",
    "tags": [
      "autocomplete",
      "pair programming",
      "ide extension",
      "code suggestions"
    ],
    "relatedTools": [
      "code-playground",
      "ui-snippets"
    ],
    "icon": "Code2",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "windsurf",
    "name": "Windsurf",
    "category": "coding",
    "developer": "Windsurf (formerly Codeium)",
    "officialUrl": "https://windsurf.com",
    "overview": "A standalone AI-powered code editor built around agentic, multi-file coding flows that aim to keep developers in a continuous state of focus.",
    "pricing": "Freemium",
    "platforms": [
      "Desktop"
    ],
    "tags": [
      "ai ide",
      "agentic coding",
      "code editor",
      "developer tools"
    ],
    "relatedTools": [
      "code-playground"
    ],
    "icon": "Terminal",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "bolt",
    "name": "Bolt",
    "category": "coding",
    "developer": "StackBlitz",
    "officialUrl": "https://bolt.new",
    "overview": "A browser-based tool that turns natural-language prompts into full-stack web applications you can preview, edit, and deploy without leaving the browser.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "app builder",
      "prompt to app",
      "full stack",
      "instant deploy"
    ],
    "relatedTools": [
      "code-playground"
    ],
    "icon": "Zap",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "lovable",
    "name": "Lovable",
    "category": "coding",
    "developer": "Lovable",
    "officialUrl": "https://lovable.dev",
    "overview": "A conversational app-building platform that generates working web applications from plain-language descriptions, letting non-engineers ship real products.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "ai app builder",
      "prompt to app",
      "web apps",
      "product prototyping"
    ],
    "relatedTools": [
      "code-playground",
      "ui-snippets"
    ],
    "icon": "Sparkles",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "v0",
    "name": "v0",
    "category": "coding",
    "developer": "Vercel",
    "officialUrl": "https://v0.app",
    "overview": "A generative UI tool that turns text prompts into ready-to-use React components and interface layouts styled with modern design conventions.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "ui generation",
      "react components",
      "design to code",
      "frontend"
    ],
    "relatedTools": [
      "ui-snippets",
      "code-playground"
    ],
    "icon": "SquareCode",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "codeium",
    "name": "Codeium",
    "category": "coding",
    "developer": "Codeium / Exafunction",
    "officialUrl": "https://codeium.com",
    "overview": "A free AI autocomplete and chat plugin that adds code suggestions and in-editor Q&A to dozens of existing editors without requiring a switch to a new IDE.",
    "pricing": "Freemium",
    "tags": [
      "autocomplete",
      "editor plugin",
      "code suggestions",
      "ai assistant"
    ],
    "relatedTools": [
      "code-playground"
    ],
    "icon": "Puzzle",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "continue-dev",
    "name": "Continue.dev",
    "category": "coding",
    "developer": "Continue",
    "officialUrl": "https://continue.dev",
    "overview": "An open, customizable AI coding assistant that plugs into your editor and lets you connect your own choice of language models for chat and autocomplete.",
    "pricing": "Free",
    "openSource": true,
    "tags": [
      "open source",
      "customizable",
      "editor plugin",
      "llm integration"
    ],
    "relatedTools": [
      "code-playground"
    ],
    "icon": "Blocks",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "tabnine",
    "name": "Tabnine",
    "category": "coding",
    "developer": "Tabnine",
    "officialUrl": "https://tabnine.com",
    "overview": "A privacy-focused AI code completion tool offering private and on-premises deployment options for teams that don't want code leaving their own environment.",
    "pricing": "Freemium",
    "tags": [
      "autocomplete",
      "privacy",
      "enterprise",
      "code suggestions"
    ],
    "relatedTools": [
      "code-playground"
    ],
    "icon": "Cpu",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "replit-ai",
    "name": "Replit AI",
    "category": "coding",
    "developer": "Replit",
    "officialUrl": "https://replit.com",
    "overview": "AI features built into the Replit cloud coding environment that help write, debug, and explain code directly inside browser-based projects.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "cloud ide",
      "code generation",
      "debugging",
      "browser coding"
    ],
    "relatedTools": [
      "code-playground"
    ],
    "icon": "Boxes",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "autogpt",
    "name": "AutoGPT",
    "category": "agents",
    "developer": "Significant Gravitas / open-source community",
    "officialUrl": "https://agpt.co",
    "overview": "An open-source framework for building autonomous agents that break a goal into steps, call tools, and iterate on their own with minimal human input.",
    "pricing": "Free",
    "openSource": true,
    "tags": [
      "autonomous agents",
      "open source",
      "task automation",
      "self-hosted"
    ],
    "icon": "Bot",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "devin",
    "name": "Devin",
    "category": "agents",
    "developer": "Cognition",
    "officialUrl": "https://cognition.ai",
    "overview": "An autonomous software engineering agent that plans, writes, tests, and debugs code across a full task with the goal of working with limited supervision.",
    "pricing": "Paid",
    "tags": [
      "autonomous agent",
      "software engineering",
      "task automation",
      "ai engineer"
    ],
    "relatedTools": [
      "code-playground"
    ],
    "icon": "Bot",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "crewai",
    "name": "CrewAI",
    "category": "agents",
    "developer": "CrewAI, Inc.",
    "officialUrl": "https://crewai.com",
    "overview": "An open-source framework for orchestrating teams of AI agents that collaborate on complex tasks, each with a defined role, goal, and set of tools.",
    "pricing": "Freemium",
    "openSource": true,
    "tags": [
      "multi-agent",
      "orchestration",
      "open source",
      "framework"
    ],
    "icon": "Bot",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "zapier-ai",
    "name": "Zapier AI",
    "category": "automation",
    "developer": "Zapier",
    "officialUrl": "https://zapier.com",
    "overview": "AI features layered onto Zapier's app-automation platform that let you describe a workflow in plain language and have it wired together across thousands of apps.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "tags": [
      "workflow automation",
      "integrations",
      "natural language",
      "business tools"
    ],
    "icon": "Workflow",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "make",
    "name": "Make",
    "category": "automation",
    "developer": "Make (formerly Integromat)",
    "officialUrl": "https://make.com",
    "overview": "A visual automation platform that connects apps and data through drag-and-drop workflow scenarios, increasingly enhanced with AI-powered modules.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "tags": [
      "visual automation",
      "integrations",
      "workflow builder",
      "business tools"
    ],
    "icon": "Workflow",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "n8n",
    "name": "n8n",
    "category": "automation",
    "developer": "n8n",
    "officialUrl": "https://n8n.io",
    "docsUrl": "https://docs.n8n.io",
    "overview": "An open-source, self-hostable workflow automation tool that combines visual flow building with code flexibility and native AI-agent nodes.",
    "pricing": "Free",
    "openSource": true,
    "apiAvailable": true,
    "tags": [
      "workflow automation",
      "open source",
      "self-hosted",
      "integrations"
    ],
    "relatedTools": [
      "json-formatter"
    ],
    "icon": "Workflow",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "bubble",
    "name": "Bubble",
    "category": "no-code",
    "developer": "Bubble",
    "officialUrl": "https://bubble.io",
    "overview": "A no-code platform for building full web applications visually, now with AI-assisted features that help scaffold app logic and design from a description.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "no-code",
      "app builder",
      "web apps",
      "visual development"
    ],
    "icon": "Blocks",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "softr",
    "name": "Softr",
    "category": "no-code",
    "developer": "Softr",
    "officialUrl": "https://softr.io",
    "overview": "A no-code website and app builder that turns spreadsheets and databases into client portals, internal tools, and marketplaces using ready-made blocks.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "no-code",
      "website builder",
      "internal tools",
      "templates"
    ],
    "icon": "Blocks",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "glide",
    "name": "Glide",
    "category": "no-code",
    "developer": "Glide",
    "officialUrl": "https://glideapps.com",
    "overview": "A no-code platform that turns spreadsheet or database data into polished mobile and web apps, with AI tools that help generate app structure and content.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "no-code",
      "app builder",
      "mobile apps",
      "data-driven apps"
    ],
    "icon": "Blocks",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "adobe-firefly",
    "name": "Adobe Firefly",
    "category": "image-generation",
    "developer": "Adobe",
    "officialUrl": "https://firefly.adobe.com",
    "overview": "Adobe's family of generative AI models for image creation and editing, trained on licensed and public-domain content and integrated directly into Photoshop and other Creative Cloud apps.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "platforms": [
      "Web"
    ],
    "tags": [
      "text-to-image",
      "generative-fill",
      "photoshop",
      "commercial-safe"
    ],
    "relatedTools": [
      "image-studio",
      "image-compressor"
    ],
    "icon": "Sparkles",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "midjourney",
    "name": "Midjourney",
    "category": "image-generation",
    "developer": "Midjourney, Inc.",
    "officialUrl": "https://midjourney.com",
    "overview": "A text-to-image model known for painterly, highly stylized output, historically accessed through Discord commands and now also through its own web app.",
    "pricing": "Paid",
    "tags": [
      "text-to-image",
      "discord",
      "stylized-art",
      "illustration"
    ],
    "relatedTools": [
      "image-studio",
      "image-compressor"
    ],
    "icon": "Wand2",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "leonardo-ai",
    "name": "Leonardo AI",
    "category": "image-generation",
    "developer": "Leonardo.Ai",
    "officialUrl": "https://leonardo.ai",
    "overview": "An image-generation platform aimed at game and creative asset production, offering fine-tunable models, a canvas editor, and real-time generation modes.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "platforms": [
      "Web"
    ],
    "tags": [
      "text-to-image",
      "game-assets",
      "fine-tuning",
      "canvas-editor"
    ],
    "relatedTools": [
      "image-studio",
      "image-compressor"
    ],
    "icon": "Palette",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "ideogram",
    "name": "Ideogram",
    "category": "image-generation",
    "developer": "Ideogram AI",
    "officialUrl": "https://ideogram.ai",
    "overview": "A text-to-image generator particularly strong at rendering accurate, legible text within generated images, useful for logos, posters, and typographic designs.",
    "pricing": "Freemium",
    "tags": [
      "text-to-image",
      "typography",
      "logo-design",
      "poster-design"
    ],
    "relatedTools": [
      "image-studio",
      "image-compressor"
    ],
    "icon": "PenTool",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "flux",
    "name": "Flux",
    "category": "image-generation",
    "developer": "Black Forest Labs",
    "officialUrl": "https://blackforestlabs.ai",
    "overview": "A family of fast, high-fidelity text-to-image models from the team behind the original Stable Diffusion, available in both open-weight and hosted variants.",
    "pricing": "Freemium",
    "tags": [
      "text-to-image",
      "open-weight",
      "photorealism"
    ],
    "relatedTools": [
      "image-studio",
      "image-compressor"
    ],
    "icon": "Image",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "dreamina",
    "name": "Dreamina",
    "category": "image-generation",
    "developer": "CapCut/ByteDance",
    "officialUrl": "https://dreamina.capcut.com",
    "overview": "ByteDance's AI image and short-video generation tool built into the CapCut ecosystem, covering text-to-image, image editing, and stylized templates.",
    "pricing": "Freemium",
    "tags": [
      "text-to-image",
      "capcut",
      "templates",
      "short-video"
    ],
    "relatedTools": [
      "image-studio",
      "image-compressor"
    ],
    "icon": "Sparkle",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "playground-ai",
    "name": "Playground AI",
    "category": "image-generation",
    "developer": "Playground",
    "officialUrl": "https://playground.com",
    "overview": "A browser-based image generation canvas that lets users mix multiple AI models, apply filters, and iteratively refine a composition in one workspace.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "text-to-image",
      "canvas-editor",
      "filters",
      "multi-model"
    ],
    "relatedTools": [
      "image-studio",
      "image-compressor"
    ],
    "icon": "Layers",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "stable-diffusion",
    "name": "Stable Diffusion",
    "category": "image-generation",
    "developer": "Stability AI",
    "officialUrl": "https://stability.ai",
    "overview": "An open-weight text-to-image diffusion model that can be run locally or self-hosted, forming the backbone of a large ecosystem of community tools and fine-tunes.",
    "pricing": "Free",
    "apiAvailable": true,
    "openSource": true,
    "tags": [
      "text-to-image",
      "open-source",
      "open-weight",
      "self-hosted"
    ],
    "relatedTools": [
      "image-studio"
    ],
    "icon": "Image",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "krea-ai",
    "name": "Krea AI",
    "category": "image-generation",
    "developer": "Krea",
    "officialUrl": "https://krea.ai",
    "overview": "A real-time AI image generation and enhancement tool that renders results as you sketch or type, alongside upscaling and image-to-image editing features.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "real-time",
      "text-to-image",
      "upscaling",
      "image-editing"
    ],
    "relatedTools": [
      "image-studio",
      "image-resizer"
    ],
    "icon": "Wand2",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "remove-bg",
    "name": "Remove.bg",
    "category": "image-generation",
    "developer": "Kaleido AI / Canva",
    "officialUrl": "https://remove.bg",
    "overview": "A single-purpose tool that automatically detects and removes the background from a photo in one click, with no manual masking required.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "platforms": [
      "Web",
      "Chrome Extension"
    ],
    "tags": [
      "background-removal",
      "photo-editing",
      "automation"
    ],
    "relatedTools": [
      "image-studio",
      "image-compressor",
      "image-converter"
    ],
    "icon": "Eraser",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "clipdrop",
    "name": "Clipdrop",
    "category": "image-generation",
    "developer": "Stability AI",
    "officialUrl": "https://clipdrop.co",
    "overview": "A broader creative toolkit from Stability AI bundling background removal, upscaling, relighting, and text-to-image generation into a single app.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "platforms": [
      "Web"
    ],
    "tags": [
      "background-removal",
      "upscaling",
      "creative-toolkit",
      "text-to-image"
    ],
    "relatedTools": [
      "image-studio",
      "image-compressor"
    ],
    "icon": "Camera",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "photoroom",
    "name": "Photoroom",
    "category": "image-generation",
    "developer": "Photoroom",
    "officialUrl": "https://photoroom.com",
    "overview": "A background removal and product photo editor focused on e-commerce, generating studio-style backgrounds and batch-processing product images.",
    "pricing": "Freemium",
    "platforms": [
      "Web",
      "Mobile"
    ],
    "tags": [
      "background-removal",
      "product-photography",
      "ecommerce",
      "batch-editing"
    ],
    "relatedTools": [
      "image-studio",
      "bulk-image-processor",
      "image-compressor"
    ],
    "icon": "Camera",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "canva-ai",
    "name": "Canva AI",
    "category": "design",
    "developer": "Canva",
    "officialUrl": "https://canva.com",
    "overview": "Canva's Magic Studio suite of AI features built into its design editor, covering text-to-image generation, background removal, and one-click layout edits.",
    "pricing": "Freemium",
    "platforms": [
      "Web",
      "Mobile",
      "Desktop"
    ],
    "tags": [
      "design",
      "templates",
      "magic-studio",
      "background-removal"
    ],
    "relatedTools": [
      "image-studio",
      "favicon-generator"
    ],
    "icon": "Palette",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "uizard",
    "name": "Uizard",
    "category": "design",
    "developer": "Uizard",
    "officialUrl": "https://uizard.io",
    "overview": "An AI-assisted UI/UX design tool that turns text prompts, hand-drawn sketches, or screenshots into editable app and website mockups.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "ui-design",
      "prototyping",
      "wireframing",
      "mockups"
    ],
    "icon": "Layers",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "framer-ai",
    "name": "Framer AI",
    "category": "design",
    "developer": "Framer",
    "officialUrl": "https://framer.com",
    "overview": "An AI website generator built into the Framer site builder that turns a text description into an editable, responsive site layout.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "website-builder",
      "no-code",
      "responsive-design"
    ],
    "icon": "PenTool",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "spline-ai",
    "name": "Spline AI",
    "category": "3d",
    "developer": "Spline",
    "officialUrl": "https://spline.design",
    "overview": "AI-assisted features inside the Spline 3D web design tool that generate and texture 3D objects and scenes from text prompts.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "3d-design",
      "text-to-3d",
      "web-design"
    ],
    "icon": "Box",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "meshy",
    "name": "Meshy",
    "category": "3d",
    "developer": "Meshy AI",
    "officialUrl": "https://meshy.ai",
    "overview": "A text-to-3D and image-to-3D generator that produces textured 3D models ready for use in games and other real-time applications.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "platforms": [
      "Web"
    ],
    "tags": [
      "text-to-3d",
      "image-to-3d",
      "3d-models",
      "game-assets"
    ],
    "icon": "Box",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "kaiber",
    "name": "Kaiber",
    "category": "animation",
    "developer": "Kaiber",
    "officialUrl": "https://kaiber.ai",
    "overview": "An AI video and animation generator focused on turning prompts, images, or songs into stylized music videos and motion visuals.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "ai-video",
      "music-video",
      "animation",
      "motion-generation"
    ],
    "icon": "Film",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "runway",
    "name": "Runway",
    "category": "video-generation",
    "developer": "Runway",
    "officialUrl": "https://runwayml.com",
    "overview": "A general-purpose AI video generation and editing suite built around the Gen-3 model family, spanning text-to-video, image-to-video and video-to-video workflows. Also ships a wider toolkit of editing and motion features aimed at filmmakers and creative teams.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "platforms": [
      "Web"
    ],
    "tags": [
      "ai video",
      "text-to-video",
      "video editing",
      "generative video"
    ],
    "icon": "Video",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "pika",
    "name": "Pika",
    "category": "video-generation",
    "developer": "Pika Labs",
    "officialUrl": "https://pika.art",
    "overview": "A text-to-video and image-to-video generator geared toward quick, stylized short clips, with prompt-driven controls for camera motion and scene transformation.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "ai video",
      "text-to-video",
      "short clips",
      "generative video"
    ],
    "icon": "Video",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "luma-ai",
    "name": "Luma AI",
    "category": "video-generation",
    "developer": "Luma AI",
    "officialUrl": "https://lumalabs.ai",
    "overview": "Maker of the Dream Machine video generation model, turning text and image prompts into short video clips, and separately known for its 3D capture (NeRF-based) technology.",
    "pricing": "Freemium",
    "tags": [
      "ai video",
      "dream machine",
      "3d capture",
      "text-to-video"
    ],
    "icon": "Video",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "synthesia",
    "name": "Synthesia",
    "category": "video-generation",
    "developer": "Synthesia",
    "officialUrl": "https://www.synthesia.io",
    "overview": "An AI avatar video platform built for corporate training and internal communications, converting scripts into presenter-led videos without cameras or studios.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "tags": [
      "ai avatar",
      "corporate video",
      "training video",
      "text-to-video"
    ],
    "icon": "Video",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "heygen",
    "name": "HeyGen",
    "category": "video-generation",
    "developer": "HeyGen",
    "officialUrl": "https://www.heygen.com",
    "overview": "An AI avatar video generator popular for marketing content, with strong emphasis on multilingual localization and lip-synced video dubbing across languages.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "tags": [
      "ai avatar",
      "video dubbing",
      "localization",
      "marketing video"
    ],
    "icon": "Video",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "elevenlabs",
    "name": "ElevenLabs",
    "category": "voice-ai",
    "developer": "ElevenLabs",
    "officialUrl": "https://elevenlabs.io",
    "overview": "A realistic AI voice platform offering text-to-speech, voice cloning and dubbing, widely used by developers and creators for natural-sounding narration.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "platforms": [
      "Web",
      "Mobile"
    ],
    "tags": [
      "text-to-speech",
      "voice cloning",
      "ai voice",
      "narration"
    ],
    "icon": "MicVocal",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "suno",
    "name": "Suno",
    "category": "music-generation",
    "developer": "Suno",
    "officialUrl": "https://suno.com",
    "overview": "A text-to-song generator that creates full original songs, including vocals, lyrics and instrumentation, from a short text prompt or style description.",
    "pricing": "Freemium",
    "tags": [
      "ai music",
      "text-to-song",
      "song generator",
      "lyrics"
    ],
    "icon": "Music2",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "udio",
    "name": "Udio",
    "category": "music-generation",
    "developer": "Udio",
    "officialUrl": "https://www.udio.com",
    "overview": "A text-to-song generator that produces original songs with vocals and instrumentation from text prompts, with editing controls for refining sections of a generated track.",
    "pricing": "Freemium",
    "tags": [
      "ai music",
      "text-to-song",
      "song generator",
      "music editing"
    ],
    "icon": "Music2",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "descript",
    "name": "Descript",
    "category": "audio-generation",
    "developer": "Descript",
    "officialUrl": "https://www.descript.com",
    "overview": "An audio and video editor that works through a text transcript, so cutting or rearranging the written words edits the underlying recording. Its Overdub feature adds AI voice cloning for correcting or extending narration.",
    "pricing": "Freemium",
    "platforms": [
      "Desktop",
      "Web"
    ],
    "tags": [
      "audio editing",
      "transcript editing",
      "voice cloning",
      "podcast editing"
    ],
    "icon": "Mic",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "adobe-podcast",
    "name": "Adobe Podcast",
    "category": "audio-generation",
    "developer": "Adobe",
    "officialUrl": "https://podcast.adobe.com",
    "overview": "An AI-powered speech enhancement tool that cleans up recorded audio, removing background noise and room echo to make recordings sound like they were captured in a studio.",
    "pricing": "Freemium",
    "tags": [
      "audio enhancement",
      "noise removal",
      "speech cleanup",
      "podcast audio"
    ],
    "icon": "Mic",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "grammarly",
    "name": "Grammarly",
    "category": "writing",
    "developer": "Grammarly",
    "officialUrl": "https://www.grammarly.com",
    "overview": "An AI-powered grammar, spelling and style checker that reviews writing in real time across browsers, documents and apps, with suggestions ranging from basic corrections to tone and clarity adjustments.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "platforms": [
      "Web",
      "Desktop",
      "Mobile",
      "Chrome Extension"
    ],
    "tags": [
      "grammar",
      "proofreading",
      "writing assistant",
      "editing"
    ],
    "relatedTools": [
      "word-counter",
      "text-cleaner",
      "case-converter"
    ],
    "icon": "PenLine",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "jasper",
    "name": "Jasper",
    "category": "writing",
    "developer": "Jasper AI",
    "officialUrl": "https://www.jasper.ai",
    "overview": "An AI content platform aimed at marketing teams and brands, generating long-form copy, campaign assets and on-brand content with tools for maintaining a consistent brand voice across a company.",
    "pricing": "Freemium",
    "tags": [
      "ai copywriting",
      "marketing content",
      "brand voice",
      "long-form content"
    ],
    "relatedTools": [
      "word-counter",
      "text-cleaner"
    ],
    "icon": "Type",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "copy-ai",
    "name": "Copy.ai",
    "category": "writing",
    "developer": "Copy.ai",
    "officialUrl": "https://www.copy.ai",
    "overview": "An AI writing tool for generating marketing copy, social posts and general business content, offering a broad library of templates aimed at teams that need quick first-draft copy across many formats.",
    "pricing": "Freemium",
    "tags": [
      "ai copywriting",
      "content generation",
      "templates",
      "marketing"
    ],
    "relatedTools": [
      "word-counter",
      "text-cleaner"
    ],
    "icon": "Type",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "writesonic",
    "name": "Writesonic",
    "category": "writing",
    "developer": "Writesonic",
    "officialUrl": "https://writesonic.com",
    "overview": "An AI writing platform for generating articles, ads and general marketing copy, positioned as a broad, general-purpose content generator with a wide set of writing templates.",
    "pricing": "Freemium",
    "tags": [
      "ai copywriting",
      "content generation",
      "articles",
      "marketing"
    ],
    "relatedTools": [
      "word-counter",
      "meta-tags-generator"
    ],
    "icon": "Type",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "frase",
    "name": "Frase",
    "category": "writing",
    "developer": "Frase",
    "officialUrl": "https://www.frase.io",
    "overview": "An AI content research and writing tool that analyzes top-ranking search results to build SEO-informed outlines, briefs and drafts, aimed squarely at content teams optimizing for search.",
    "pricing": "Freemium",
    "tags": [
      "content research",
      "seo writing",
      "content briefs",
      "outlines"
    ],
    "relatedTools": [
      "keyword-density-checker",
      "meta-tags-generator",
      "serp-preview"
    ],
    "icon": "FileText",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "surfer-ai",
    "name": "Surfer AI",
    "category": "seo",
    "developer": "Surfer",
    "officialUrl": "https://surferseo.com",
    "overview": "A content editor and AI writer built around on-page SEO scoring, comparing a draft against top-ranking pages for a keyword and suggesting terms, structure and length to improve search relevance.",
    "pricing": "Freemium",
    "tags": [
      "seo content",
      "content editor",
      "on-page seo",
      "keyword optimization"
    ],
    "relatedTools": [
      "keyword-density-checker",
      "serp-preview",
      "meta-tags-generator"
    ],
    "icon": "Search",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "semrush",
    "name": "Semrush",
    "category": "seo",
    "developer": "Semrush",
    "officialUrl": "https://www.semrush.com",
    "overview": "A full SEO and marketing suite covering keyword research, site audits, backlink analysis and competitor tracking, with AI-powered features layered on top rather than an AI-first product on its own.",
    "pricing": "Freemium",
    "tags": [
      "seo suite",
      "keyword research",
      "site audit",
      "competitor analysis"
    ],
    "relatedTools": [
      "keyword-density-checker",
      "sitemap-generator",
      "meta-tags-generator"
    ],
    "icon": "Rocket",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "gamma",
    "name": "Gamma",
    "category": "presentation",
    "developer": "Gamma",
    "officialUrl": "https://gamma.app",
    "overview": "An AI tool that turns a prompt or outline into a designed slide deck, document or simple webpage, handling layout and visual styling automatically so users can focus on the content.",
    "pricing": "Freemium",
    "tags": [
      "ai presentations",
      "slide design",
      "deck generator",
      "document design"
    ],
    "relatedTools": [
      "word-counter",
      "markdown-converter"
    ],
    "icon": "Presentation",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "beautiful-ai",
    "name": "Beautiful.ai",
    "category": "presentation",
    "developer": "Beautiful.ai",
    "officialUrl": "https://www.beautiful.ai",
    "overview": "A presentation tool with AI-assisted smart templates that automatically adjust layout and design as slides are edited, aimed at helping non-designers produce polished decks quickly.",
    "pricing": "Freemium",
    "tags": [
      "ai presentations",
      "smart templates",
      "slide design",
      "deck builder"
    ],
    "relatedTools": [
      "word-counter"
    ],
    "icon": "Presentation",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "napkin-ai",
    "name": "Napkin AI",
    "category": "presentation",
    "developer": "Napkin",
    "officialUrl": "https://www.napkin.ai",
    "overview": "A tool that turns written text into visual diagrams, charts and graphics, letting users paste in a paragraph or outline and get back visual representations to illustrate the same idea.",
    "pricing": "Freemium",
    "tags": [
      "text to visual",
      "diagrams",
      "infographics",
      "visual storytelling"
    ],
    "relatedTools": [
      "markdown-converter"
    ],
    "icon": "Sparkles",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "notion-ai",
    "name": "Notion AI",
    "category": "productivity",
    "developer": "Notion",
    "officialUrl": "https://www.notion.so",
    "overview": "An AI add-on built into the Notion workspace that can draft, summarize, translate and edit text directly inside pages and databases, layered on top of Notion's existing free and paid plans.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "platforms": [
      "Web",
      "Desktop",
      "Mobile"
    ],
    "tags": [
      "workspace ai",
      "summarization",
      "note taking",
      "docs"
    ],
    "relatedTools": [
      "markdown-converter",
      "word-counter"
    ],
    "icon": "ClipboardList",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "otter-ai",
    "name": "Otter.ai",
    "category": "productivity",
    "developer": "Otter.ai",
    "officialUrl": "https://otter.ai",
    "overview": "An AI meeting assistant that transcribes conversations in real time and generates searchable notes, summaries and action items from calls and in-person meetings.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "platforms": [
      "Web",
      "Mobile"
    ],
    "tags": [
      "meeting transcription",
      "notes",
      "voice to text",
      "summaries"
    ],
    "relatedTools": [
      "word-counter",
      "text-cleaner"
    ],
    "icon": "Mic",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "fireflies-ai",
    "name": "Fireflies.ai",
    "category": "productivity",
    "developer": "Fireflies.ai",
    "officialUrl": "https://fireflies.ai",
    "overview": "An AI meeting recorder that joins calls to transcribe conversations and produce searchable notes and summaries, with integrations for sharing meeting recaps across common work tools.",
    "pricing": "Freemium",
    "tags": [
      "meeting recording",
      "transcription",
      "notes",
      "call summaries"
    ],
    "relatedTools": [
      "word-counter",
      "text-cleaner"
    ],
    "icon": "Mic",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "superhuman",
    "name": "Superhuman",
    "category": "email",
    "developer": "Superhuman",
    "officialUrl": "https://superhuman.com",
    "overview": "A fast, keyboard-driven email client with AI features for triaging an inbox and drafting replies, built around speed and focus for people managing high email volume.",
    "pricing": "Freemium",
    "tags": [
      "email client",
      "ai replies",
      "inbox triage",
      "productivity"
    ],
    "relatedTools": [
      "word-counter"
    ],
    "icon": "Mail",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "shortwave",
    "name": "Shortwave",
    "category": "email",
    "developer": "Shortwave",
    "officialUrl": "https://www.shortwave.com",
    "overview": "An AI-enhanced email client that layers natural-language search and automatic summarization on top of the inbox, aiming to help users find and process email faster than a standard mail app.",
    "pricing": "Freemium",
    "tags": [
      "email client",
      "ai search",
      "email summarization",
      "productivity"
    ],
    "relatedTools": [
      "word-counter",
      "text-cleaner"
    ],
    "icon": "Mail",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "intercom-fin",
    "name": "Intercom Fin",
    "category": "customer-support",
    "developer": "Intercom",
    "officialUrl": "https://www.intercom.com/fin",
    "overview": "An AI agent embedded in Intercom's customer service platform that reads a company's help center and past conversations to answer support questions and resolve tickets without human involvement.",
    "pricing": "Enterprise",
    "apiAvailable": true,
    "tags": [
      "customer support",
      "ai agent",
      "help desk",
      "live chat"
    ],
    "icon": "MessagesSquare",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "zendesk-ai",
    "name": "Zendesk AI",
    "category": "customer-support",
    "developer": "Zendesk",
    "officialUrl": "https://www.zendesk.com",
    "overview": "A set of AI capabilities layered onto Zendesk's customer service suite, including automatic ticket routing, suggested replies for agents, and a bot that handles common support requests.",
    "pricing": "Enterprise",
    "apiAvailable": true,
    "tags": [
      "customer support",
      "ticketing",
      "chatbot",
      "automation"
    ],
    "icon": "MessagesSquare",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "ada",
    "name": "Ada",
    "category": "customer-support",
    "developer": "Ada",
    "officialUrl": "https://www.ada.cx",
    "overview": "A customer service automation platform that lets companies deploy an AI agent across chat, email, and social channels to resolve support inquiries and hand off complex cases to human agents.",
    "pricing": "Enterprise",
    "tags": [
      "customer support",
      "ai agent",
      "automation",
      "chatbot"
    ],
    "icon": "MessagesSquare",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "hubspot-ai",
    "name": "HubSpot AI",
    "category": "marketing",
    "developer": "HubSpot",
    "officialUrl": "https://www.hubspot.com",
    "overview": "AI features built into HubSpot's marketing and CRM platform that help draft campaign content, generate copy, and summarize customer interactions from within the same workspace.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "tags": [
      "marketing",
      "crm",
      "content generation",
      "campaigns"
    ],
    "icon": "Megaphone",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "adcreative-ai",
    "name": "AdCreative.ai",
    "category": "marketing",
    "developer": "AdCreative.ai",
    "officialUrl": "https://www.adcreative.ai",
    "overview": "A tool that generates multiple ad creative and banner variations from a brand's existing assets, intended to help marketers test conversion-focused designs faster.",
    "pricing": "Paid",
    "tags": [
      "marketing",
      "ad creative",
      "banners",
      "design"
    ],
    "icon": "Megaphone",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "harvey-ai",
    "name": "Harvey AI",
    "category": "legal",
    "developer": "Harvey",
    "officialUrl": "https://www.harvey.ai",
    "overview": "An AI assistant built for law firms that supports legal research, contract and document review, and drafting across large volumes of legal text.",
    "pricing": "Enterprise",
    "tags": [
      "legal",
      "legal research",
      "document review",
      "law firms"
    ],
    "icon": "Scale",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "cleo",
    "name": "Cleo",
    "category": "finance",
    "developer": "Cleo AI",
    "officialUrl": "https://www.meetcleo.com",
    "overview": "A chat-based personal finance app that uses AI to help users track spending, build budgets, and get a conversational, plain-language view of their money.",
    "pricing": "Freemium",
    "platforms": [
      "Mobile"
    ],
    "tags": [
      "personal finance",
      "budgeting",
      "chatbot",
      "money management"
    ],
    "icon": "Coins",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "nabla",
    "name": "Nabla",
    "category": "healthcare",
    "developer": "Nabla",
    "officialUrl": "https://www.nabla.com",
    "overview": "An AI ambient documentation assistant that listens to a clinician's conversation with a patient and helps draft the resulting clinical note, aiming to reduce manual charting time. It supports documentation only and does not diagnose or give medical advice.",
    "pricing": "Enterprise",
    "tags": [
      "healthcare",
      "clinical documentation",
      "medical scribe",
      "clinician tools"
    ],
    "icon": "Stethoscope",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "glean",
    "name": "Glean",
    "category": "business",
    "developer": "Glean",
    "officialUrl": "https://www.glean.com",
    "overview": "An enterprise search and knowledge assistant that connects to a company's internal apps and documents so employees can find information and get AI-generated answers grounded in that content.",
    "pricing": "Enterprise",
    "tags": [
      "enterprise search",
      "knowledge management",
      "business",
      "ai assistant"
    ],
    "icon": "Building2",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "rezi",
    "name": "Rezi",
    "category": "resume",
    "developer": "Rezi",
    "officialUrl": "https://www.rezi.ai",
    "overview": "An AI resume builder that helps users write and format resumes intended to pass the applicant tracking systems many employers use to screen candidates.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "resume",
      "ats",
      "job search",
      "resume builder"
    ],
    "relatedTools": [
      "resume-builder"
    ],
    "icon": "FileUser",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "teal",
    "name": "Teal",
    "category": "resume",
    "developer": "Teal",
    "officialUrl": "https://www.tealhq.com",
    "overview": "A job search platform with an AI resume tailoring feature that compares a resume's content against a specific job description and highlights relevant experience to add or emphasize.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "resume",
      "job search",
      "job tracker",
      "ats"
    ],
    "relatedTools": [
      "resume-builder"
    ],
    "icon": "FileUser",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "kickresume",
    "name": "Kickresume",
    "category": "resume",
    "developer": "Kickresume",
    "officialUrl": "https://www.kickresume.com",
    "overview": "An AI-powered resume and cover letter builder offering a range of templates and writing suggestions aimed at job seekers.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "resume",
      "cover letter",
      "templates",
      "job search"
    ],
    "relatedTools": [
      "resume-builder"
    ],
    "icon": "FileUser",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "buffer-ai",
    "name": "Buffer AI",
    "category": "social-media",
    "developer": "Buffer",
    "officialUrl": "https://buffer.com",
    "overview": "AI-assisted post writing built into Buffer's social media scheduling tool, helping users draft and repurpose captions for posting across multiple platforms.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "platforms": [
      "Web",
      "Mobile"
    ],
    "tags": [
      "social media",
      "scheduling",
      "content writing",
      "captions"
    ],
    "icon": "Share2",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "later",
    "name": "Later",
    "category": "social-media",
    "developer": "Later",
    "officialUrl": "https://later.com",
    "overview": "A social media scheduling platform with AI features that help draft captions and suggest content ideas alongside its visual content calendar.",
    "pricing": "Freemium",
    "platforms": [
      "Web",
      "Mobile"
    ],
    "tags": [
      "social media",
      "scheduling",
      "captions",
      "content calendar"
    ],
    "icon": "Share2",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "adobe-scan",
    "name": "Adobe Scan",
    "category": "ocr",
    "developer": "Adobe",
    "officialUrl": "https://scan.adobe.com",
    "overview": "A mobile scanning app that turns photos of paper documents into cleaned-up PDFs, using AI-based text recognition to make the scans searchable and editable.",
    "pricing": "Freemium",
    "platforms": [
      "Mobile"
    ],
    "tags": [
      "ocr",
      "document scanning",
      "pdf",
      "text recognition"
    ],
    "relatedTools": [
      "pdf-studio",
      "pdf-compress"
    ],
    "icon": "Eye",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "nanonets",
    "name": "Nanonets",
    "category": "ocr",
    "developer": "Nanonets",
    "officialUrl": "https://www.nanonets.com",
    "overview": "An OCR and document data extraction platform that uses AI to pull structured data out of scanned forms, invoices, and other business documents, generally aimed at developers and businesses automating data entry.",
    "pricing": "Paid",
    "apiAvailable": true,
    "tags": [
      "ocr",
      "data extraction",
      "document automation",
      "invoices"
    ],
    "relatedTools": [
      "pdf-studio",
      "invoice-maker"
    ],
    "icon": "Eye",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "chatpdf",
    "name": "ChatPDF",
    "category": "pdf-ai",
    "developer": "ChatPDF",
    "officialUrl": "https://www.chatpdf.com",
    "overview": "A tool that lets users upload a PDF and ask questions about its contents in a chat interface, returning answers grounded in the uploaded document's text.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "pdf",
      "chat with pdf",
      "document qa",
      "summarization"
    ],
    "relatedTools": [
      "pdf-studio",
      "pdf-compress"
    ],
    "icon": "FileText",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "pdf-ai-tool",
    "name": "PDF.ai",
    "category": "pdf-ai",
    "developer": "PDF.ai",
    "officialUrl": "https://pdf.ai",
    "overview": "A chat-based tool for summarizing and asking questions about PDF documents, letting users pull out key information without reading the full file.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "pdf",
      "chat with pdf",
      "summarization",
      "document qa"
    ],
    "relatedTools": [
      "pdf-studio",
      "pdf-merge"
    ],
    "icon": "FileText",
    "addedOn": "2026-07-31"
  }
];

export function getAiTool(slug: string): AiTool | undefined {
  return aiTools.find((t) => t.slug === slug);
}

export function toolsByCategory(category: string): AiTool[] {
  return aiTools.filter((t) => t.category === category);
}

export function searchAiTools(query: string, limit = 24): AiTool[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return aiTools
    .filter((t) => [t.name, t.developer, t.overview, t.category, t.tags.join(" ")].join(" ").toLowerCase().includes(q))
    .slice(0, limit);
}

export function featuredAiTools(limit = 8): AiTool[] {
  const featured = aiTools.filter((t) => t.badge === "Popular" || t.badge === "Trending");
  return (featured.length ? featured : aiTools).slice(0, limit);
}

export function trendingAiTools(limit = 8): AiTool[] {
  return aiTools.filter((t) => t.badge === "Trending").slice(0, limit);
}

export function recentlyAddedAiTools(limit = 8): AiTool[] {
  return [...aiTools].sort((a, b) => (a.addedOn < b.addedOn ? 1 : -1)).slice(0, limit);
}

export function newReleaseAiTools(limit = 8): AiTool[] {
  return aiTools.filter((t) => t.badge === "New").slice(0, limit);
}

export function mostPopularAiTools(limit = 8): AiTool[] {
  return aiTools.filter((t) => t.badge === "Popular").slice(0, limit);
}
