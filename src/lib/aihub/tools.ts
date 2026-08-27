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
  },
  {
    "slug": "poe",
    "name": "Poe",
    "category": "chatbots",
    "developer": "Quora",
    "officialUrl": "https://poe.com",
    "overview": "A chat platform that lets users converse with many different AI models from one interface, and lets creators publish their own bots on top of them.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "platforms": [
      "Web",
      "Mobile"
    ],
    "tags": [
      "chatbot",
      "multi-model",
      "bots",
      "aggregator"
    ],
    "relatedTools": [],
    "icon": "MessageCircle",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "you-com",
    "name": "You.com",
    "category": "chatbots",
    "developer": "You.com",
    "officialUrl": "https://you.com",
    "overview": "An AI chat assistant that pairs conversational answers with live web search results, letting users verify claims against cited sources.",
    "pricing": "Freemium",
    "platforms": [
      "Web",
      "Chrome Extension"
    ],
    "tags": [
      "chatbot",
      "web-search",
      "ai-assistant",
      "citations"
    ],
    "relatedTools": [],
    "icon": "Search",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "qwen-chat",
    "name": "Qwen Chat",
    "category": "chatbots",
    "developer": "Alibaba",
    "officialUrl": "https://chat.qwen.ai",
    "overview": "The official chat interface for Alibaba's Qwen family of language models, supporting text conversation alongside image and document understanding.",
    "pricing": "Freemium",
    "tags": [
      "chatbot",
      "llm",
      "alibaba",
      "multilingual"
    ],
    "relatedTools": [],
    "icon": "MessageCircle",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "huggingchat",
    "name": "HuggingChat",
    "category": "chatbots",
    "developer": "Hugging Face",
    "officialUrl": "https://huggingface.co/chat",
    "overview": "A free chat interface from Hugging Face for conversing with a rotating lineup of leading open-source language models.",
    "pricing": "Free",
    "openSource": true,
    "tags": [
      "chatbot",
      "open-source",
      "llm",
      "hugging-face"
    ],
    "relatedTools": [],
    "icon": "Bot",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "scite",
    "name": "Scite",
    "category": "research",
    "developer": "scite.ai",
    "officialUrl": "https://scite.ai",
    "overview": "A research tool that shows how a published paper has been cited elsewhere, classifying each citation as supporting, contrasting or merely mentioning the original claim.",
    "pricing": "Freemium",
    "tags": [
      "research",
      "citations",
      "academic",
      "papers"
    ],
    "relatedTools": [],
    "icon": "FileSearch",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "scispace",
    "name": "SciSpace",
    "category": "research",
    "developer": "SciSpace",
    "officialUrl": "https://scispace.com",
    "overview": "An AI research assistant that helps users read, understand and search scientific literature, including explaining dense passages of a PDF in plain language.",
    "pricing": "Freemium",
    "tags": [
      "research",
      "papers",
      "academic",
      "literature-review"
    ],
    "relatedTools": [
      "pdf-studio"
    ],
    "icon": "Microscope",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "reverso",
    "name": "Reverso",
    "category": "translation",
    "developer": "Reverso",
    "officialUrl": "https://www.reverso.net",
    "overview": "A translation service that backs up its translations with real-world usage examples in context, plus built-in grammar and conjugation checking tools.",
    "pricing": "Freemium",
    "platforms": [
      "Web",
      "Mobile"
    ],
    "tags": [
      "translation",
      "grammar",
      "context",
      "language-learning"
    ],
    "relatedTools": [
      "text-cleaner"
    ],
    "icon": "Languages",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "papago",
    "name": "Papago",
    "category": "translation",
    "developer": "Naver",
    "officialUrl": "https://papago.naver.com",
    "overview": "A neural machine translation app from Naver that is particularly well tuned for Korean alongside Japanese, Chinese and other Asian languages.",
    "pricing": "Free",
    "platforms": [
      "Web",
      "Mobile"
    ],
    "tags": [
      "translation",
      "korean",
      "asian-languages",
      "neural-mt"
    ],
    "relatedTools": [],
    "icon": "Languages",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "quizlet",
    "name": "Quizlet",
    "category": "education",
    "developer": "Quizlet",
    "officialUrl": "https://quizlet.com",
    "overview": "A study platform that uses AI to turn notes into flashcards, practice tests and study sets, adapting questions to what a student still struggles with.",
    "pricing": "Freemium",
    "platforms": [
      "Web",
      "Mobile"
    ],
    "tags": [
      "flashcards",
      "study",
      "practice-tests",
      "ai-tutor"
    ],
    "relatedTools": [],
    "icon": "BookOpen",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "socratic",
    "name": "Socratic",
    "category": "education",
    "developer": "Google",
    "officialUrl": "https://socratic.org",
    "overview": "A homework-help app, acquired by Google, that uses AI to break down a photographed question and walk students through the underlying concept.",
    "pricing": "Free",
    "platforms": [
      "Mobile"
    ],
    "tags": [
      "homework-help",
      "ai-tutor",
      "students",
      "google"
    ],
    "relatedTools": [],
    "icon": "School",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "coursera-coach",
    "name": "Coursera Coach",
    "category": "education",
    "developer": "Coursera",
    "officialUrl": "https://coursera.org",
    "overview": "An AI assistant built into Coursera that answers learner questions, summarizes video lectures and quizzes students on course material.",
    "pricing": "Freemium",
    "platforms": [
      "Web",
      "Mobile"
    ],
    "tags": [
      "ai-tutor",
      "online-learning",
      "course-assistant",
      "coursera"
    ],
    "relatedTools": [],
    "icon": "GraduationCap",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "manus",
    "name": "Manus",
    "category": "agents",
    "developer": "Manus AI",
    "officialUrl": "https://manus.im",
    "overview": "A general-purpose autonomous AI agent that plans multi-step tasks and independently executes them, from research to file creation.",
    "pricing": "Freemium",
    "tags": [
      "ai-agent",
      "autonomous",
      "task-automation",
      "general-purpose"
    ],
    "relatedTools": [],
    "icon": "Bot",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "openai-operator",
    "name": "OpenAI Operator",
    "category": "agents",
    "developer": "OpenAI",
    "officialUrl": "https://openai.com",
    "overview": "A research-preview AI agent from OpenAI that controls a web browser to carry out tasks like booking or filling out forms on a user's behalf.",
    "pricing": "Paid",
    "tags": [
      "ai-agent",
      "browser-automation",
      "autonomous",
      "research-preview"
    ],
    "relatedTools": [],
    "icon": "Bot",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "multion",
    "name": "MultiOn",
    "category": "agents",
    "developer": "MultiOn",
    "officialUrl": "https://multion.ai",
    "overview": "An AI agent platform that lets developers and users automate multi-step actions across websites through an API or browser extension.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "tags": [
      "ai-agent",
      "web-automation",
      "api",
      "task-automation"
    ],
    "relatedTools": [],
    "icon": "Bot",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "amazon-q-developer",
    "name": "Amazon Q Developer",
    "category": "coding",
    "developer": "Amazon Web Services",
    "officialUrl": "https://aws.amazon.com/q/developer/",
    "overview": "An AI coding assistant from AWS that suggests code, explains and transforms existing code, and answers questions directly inside popular IDEs and AWS tooling.",
    "pricing": "Freemium",
    "platforms": [
      "Desktop",
      "Web"
    ],
    "tags": [
      "coding assistant",
      "aws",
      "ide",
      "code completion"
    ],
    "relatedTools": [
      "code-playground"
    ],
    "icon": "Cpu",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "jetbrains-ai-assistant",
    "name": "JetBrains AI Assistant",
    "category": "coding",
    "developer": "JetBrains",
    "officialUrl": "https://www.jetbrains.com/ai/",
    "overview": "An AI coding assistant built directly into JetBrains IDEs such as IntelliJ IDEA and PyCharm, offering code completion, chat-based help, and code explanations without leaving the editor.",
    "pricing": "Freemium",
    "platforms": [
      "Desktop"
    ],
    "tags": [
      "coding assistant",
      "ide",
      "jetbrains",
      "code completion"
    ],
    "relatedTools": [
      "code-playground"
    ],
    "icon": "Code2",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "cline",
    "name": "Cline",
    "category": "coding",
    "developer": "Cline",
    "officialUrl": "https://cline.bot",
    "overview": "An open-source autonomous coding agent that runs as a VS Code extension, able to read and edit files, run terminal commands, and work through multi-step coding tasks with developer oversight.",
    "pricing": "Freemium",
    "openSource": true,
    "platforms": [
      "Desktop"
    ],
    "tags": [
      "coding agent",
      "vs code",
      "open source",
      "autonomous agent"
    ],
    "relatedTools": [
      "code-playground"
    ],
    "icon": "Terminal",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "gumloop",
    "name": "Gumloop",
    "category": "automation",
    "developer": "Gumloop",
    "officialUrl": "https://www.gumloop.com",
    "overview": "A visual workflow builder that lets teams chain AI steps and app integrations on a drag-and-drop canvas to automate repetitive, multi-step business tasks.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "platforms": [
      "Web"
    ],
    "tags": [
      "workflow automation",
      "no-code",
      "ai agents",
      "visual builder"
    ],
    "relatedTools": [
      "csv-json-converter"
    ],
    "icon": "Workflow",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "lindy",
    "name": "Lindy",
    "category": "automation",
    "developer": "Lindy AI",
    "officialUrl": "https://www.lindy.ai",
    "overview": "A platform for building AI agents and assistants that handle multi-step business workflows like scheduling, email triage, and lead follow-up on their own.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "platforms": [
      "Web"
    ],
    "tags": [
      "ai agents",
      "workflow automation",
      "assistant",
      "business automation"
    ],
    "icon": "Bot",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "adalo",
    "name": "Adalo",
    "category": "no-code",
    "developer": "Adalo",
    "officialUrl": "https://www.adalo.com",
    "overview": "A no-code platform for building native mobile and web apps using a visual drag-and-drop editor, letting non-developers ship functional apps without writing code.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "no-code",
      "app builder",
      "mobile apps",
      "visual development"
    ],
    "icon": "Blocks",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "flutterflow",
    "name": "FlutterFlow",
    "category": "no-code",
    "developer": "FlutterFlow",
    "officialUrl": "https://flutterflow.io",
    "overview": "A visual app builder that generates real, exportable Flutter code from a drag-and-drop design canvas, with AI-assisted features for scaffolding screens and logic.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "no-code",
      "flutter",
      "app builder",
      "visual development"
    ],
    "relatedTools": [
      "code-playground"
    ],
    "icon": "Boxes",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "thunkable",
    "name": "Thunkable",
    "category": "no-code",
    "developer": "Thunkable",
    "officialUrl": "https://thunkable.com",
    "overview": "A drag-and-drop platform for building native iOS and Android apps without writing code, aimed at makers and small teams shipping mobile products quickly.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "no-code",
      "mobile apps",
      "app builder",
      "drag and drop"
    ],
    "icon": "Puzzle",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "clay",
    "name": "Clay",
    "category": "business",
    "developer": "Clay",
    "officialUrl": "https://www.clay.com",
    "overview": "A data enrichment and outbound sales tool that pulls from dozens of data sources and uses AI to personalize prospect research and messaging at scale.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "sales",
      "data enrichment",
      "outbound",
      "lead generation"
    ],
    "relatedTools": [
      "csv-json-converter"
    ],
    "icon": "Table2",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "airtable-ai",
    "name": "Airtable AI",
    "category": "business",
    "developer": "Airtable",
    "officialUrl": "https://www.airtable.com",
    "overview": "AI features built into Airtable's spreadsheet-database platform that summarize records, categorize data, and draft content directly inside a team's tables.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "platforms": [
      "Web",
      "Desktop",
      "Mobile"
    ],
    "tags": [
      "database",
      "spreadsheet",
      "business",
      "productivity"
    ],
    "relatedTools": [
      "csv-json-converter",
      "json-formatter"
    ],
    "icon": "Grid3x3",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "coda-ai",
    "name": "Coda AI",
    "category": "business",
    "developer": "Coda",
    "officialUrl": "https://coda.io",
    "overview": "AI writing and automation features layered into Coda's all-in-one docs platform, helping teams draft content, summarize pages, and automate doc-based workflows.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "platforms": [
      "Web",
      "Desktop",
      "Mobile"
    ],
    "tags": [
      "docs",
      "productivity",
      "business",
      "writing assistant"
    ],
    "icon": "Sparkles",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "freepik-ai",
    "name": "Freepik AI",
    "category": "image-generation",
    "developer": "Freepik",
    "officialUrl": "https://www.freepik.com",
    "overview": "AI image generation and editing tools built directly into Freepik's stock-asset platform, letting users create or edit visuals alongside a large library of existing stock content.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "tags": [
      "image generation",
      "stock assets",
      "ai editing",
      "text-to-image"
    ],
    "relatedTools": [
      "image-studio"
    ],
    "icon": "Image",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "magnific-ai",
    "name": "Magnific AI",
    "category": "image-generation",
    "developer": "Magnific",
    "officialUrl": "https://magnific.ai",
    "overview": "An AI upscaler and enhancer that adds realistic, high-resolution detail to existing images rather than generating new scenes from scratch.",
    "pricing": "Freemium",
    "tags": [
      "upscaling",
      "image enhancement",
      "detail generation",
      "ai upscaler"
    ],
    "relatedTools": [
      "image-resizer"
    ],
    "icon": "Wand2",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "bing-image-creator",
    "name": "Bing Image Creator",
    "category": "image-generation",
    "developer": "Microsoft",
    "officialUrl": "https://www.bing.com/images/create",
    "overview": "A free AI image generator built into Bing, powered by DALL-E, that turns text prompts into images directly in the browser.",
    "pricing": "Free",
    "tags": [
      "text-to-image",
      "free",
      "dall-e",
      "bing"
    ],
    "icon": "Image",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "recraft",
    "name": "Recraft",
    "category": "image-generation",
    "developer": "Recraft",
    "officialUrl": "https://www.recraft.ai",
    "overview": "An AI image and vector generation tool with strong controls for keeping a consistent brand style across generated raster and vector assets.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "tags": [
      "vector graphics",
      "brand style",
      "image generation",
      "icons"
    ],
    "relatedTools": [
      "image-studio"
    ],
    "icon": "Palette",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "looka",
    "name": "Looka",
    "category": "design",
    "developer": "Looka",
    "officialUrl": "https://looka.com",
    "overview": "An AI logo and brand identity generator that produces logo options, color palettes and basic brand kits from a business name and style preferences.",
    "pricing": "Freemium",
    "tags": [
      "logo maker",
      "brand identity",
      "branding",
      "logo generator"
    ],
    "relatedTools": [
      "favicon-generator"
    ],
    "icon": "PenTool",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "galileo-ai",
    "name": "Galileo AI",
    "category": "design",
    "developer": "Galileo AI",
    "officialUrl": "https://www.usegalileo.ai",
    "overview": "Generates editable user interface designs directly from a text description, giving designers a starting point instead of a blank canvas.",
    "pricing": "Freemium",
    "tags": [
      "ui design",
      "text-to-ui",
      "product design",
      "mockups"
    ],
    "icon": "LayoutTemplate",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "visily",
    "name": "Visily",
    "category": "design",
    "developer": "Visily",
    "officialUrl": "https://www.visily.ai",
    "overview": "An AI-assisted wireframing and UI mockup tool that can also convert existing screenshots or hand-drawn sketches into editable design files.",
    "pricing": "Freemium",
    "tags": [
      "wireframing",
      "ui mockups",
      "screenshot-to-design",
      "prototyping"
    ],
    "icon": "Grid3x3",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "tripo-ai",
    "name": "Tripo AI",
    "category": "3d",
    "developer": "Tripo",
    "officialUrl": "https://www.tripo3d.ai",
    "overview": "Generates 3D models from text prompts or reference images, aimed at speeding up asset creation for games and design workflows.",
    "pricing": "Freemium",
    "tags": [
      "text-to-3d",
      "image-to-3d",
      "3d models",
      "game assets"
    ],
    "icon": "Box",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "immersity-ai",
    "name": "Immersity AI",
    "category": "animation",
    "developer": "Immersity AI",
    "officialUrl": "https://www.immersity.ai",
    "overview": "Converts flat, still images into animated depth and parallax video, adding a sense of 3D motion without manual keyframing.",
    "pricing": "Freemium",
    "tags": [
      "depth animation",
      "parallax video",
      "image-to-video",
      "3d effect"
    ],
    "relatedTools": [
      "image-studio"
    ],
    "icon": "Layers",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "renderforest",
    "name": "Renderforest",
    "category": "animation",
    "developer": "Renderforest",
    "officialUrl": "https://www.renderforest.com",
    "overview": "An AI-assisted video and animation maker that builds animated clips, intros and promos from customizable templates.",
    "pricing": "Freemium",
    "tags": [
      "video maker",
      "animation templates",
      "intros",
      "promo video"
    ],
    "icon": "Film",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "animaker",
    "name": "Animaker",
    "category": "animation",
    "developer": "Animaker",
    "officialUrl": "https://www.animaker.com",
    "overview": "An online animated video maker with AI-assisted features for turning scripts and templates into animated explainer and marketing videos.",
    "pricing": "Freemium",
    "tags": [
      "animated video",
      "explainer video",
      "video templates",
      "animation maker"
    ],
    "icon": "Film",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "kling-ai",
    "name": "Kling AI",
    "category": "video-generation",
    "developer": "Kuaishou",
    "officialUrl": "https://klingai.com",
    "overview": "Kling AI is Kuaishou's text-to-video and image-to-video model that turns prompts or still images into short, high-motion video clips.",
    "pricing": "Freemium",
    "tags": [
      "video generation",
      "text-to-video",
      "image-to-video",
      "kuaishou"
    ],
    "icon": "Video",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "hailuo-ai",
    "name": "Hailuo AI",
    "category": "video-generation",
    "developer": "MiniMax",
    "officialUrl": "https://hailuoai.video",
    "overview": "Hailuo AI is MiniMax's text-to-video generation model, producing short cinematic clips from text prompts with an emphasis on realistic motion and camera movement.",
    "pricing": "Freemium",
    "tags": [
      "video generation",
      "text-to-video",
      "minimax"
    ],
    "icon": "Film",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "vidu",
    "name": "Vidu",
    "category": "video-generation",
    "developer": "Vidu / ShengShu Technology",
    "officialUrl": "https://vidu.studio",
    "overview": "Vidu is a text-to-video generation model from Vidu / ShengShu Technology that converts written prompts into short video clips with consistent characters and scenes.",
    "pricing": "Freemium",
    "tags": [
      "video generation",
      "text-to-video",
      "shengshu"
    ],
    "icon": "Camera",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "hedra",
    "name": "Hedra",
    "category": "video-generation",
    "developer": "Hedra",
    "officialUrl": "https://hedra.com",
    "overview": "Hedra generates AI talking-head and character videos by animating a still image to lip-sync and perform a supplied audio track or script.",
    "pricing": "Freemium",
    "tags": [
      "talking head",
      "character video",
      "lip sync",
      "video generation"
    ],
    "icon": "Wand2",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "resemble-ai",
    "name": "Resemble AI",
    "category": "voice-ai",
    "developer": "Resemble AI",
    "officialUrl": "https://resemble.ai",
    "docsUrl": "https://docs.resemble.ai",
    "overview": "Resemble AI provides realistic AI voice cloning and text-to-speech built primarily for developers to integrate custom voices via API.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "tags": [
      "voice cloning",
      "text-to-speech",
      "api",
      "developer tools"
    ],
    "icon": "MicVocal",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "play-ht",
    "name": "Play.ht",
    "category": "voice-ai",
    "developer": "Play.ht",
    "officialUrl": "https://play.ht",
    "docsUrl": "https://docs.play.ht",
    "overview": "Play.ht is a text-to-speech and voice cloning platform offering a large library of AI voices for narration, content and app integrations.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "tags": [
      "text-to-speech",
      "voice cloning",
      "api",
      "narration"
    ],
    "icon": "Speech",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "wellsaid-labs",
    "name": "WellSaid Labs",
    "category": "voice-ai",
    "developer": "WellSaid Labs",
    "officialUrl": "https://wellsaidlabs.com",
    "overview": "WellSaid Labs is an enterprise-focused AI voice generation platform aimed at corporate training, e-learning and narration voiceovers.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "tags": [
      "text-to-speech",
      "enterprise",
      "corporate training",
      "voiceover"
    ],
    "icon": "Mic",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "soundraw",
    "name": "Soundraw",
    "category": "music-generation",
    "developer": "Soundraw",
    "officialUrl": "https://soundraw.io",
    "overview": "Soundraw generates royalty-free AI music tracks that users can customize by mood, genre, and length for use in videos and content.",
    "pricing": "Freemium",
    "tags": [
      "music generation",
      "royalty-free",
      "background music"
    ],
    "icon": "Music2",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "aiva",
    "name": "AIVA",
    "category": "music-generation",
    "developer": "AIVA Technologies",
    "officialUrl": "https://aiva.ai",
    "overview": "AIVA is an AI composer that creates original orchestral and soundtrack-style music, letting users generate and edit compositions for film, games and other media.",
    "pricing": "Freemium",
    "tags": [
      "music composition",
      "orchestral music",
      "soundtrack"
    ],
    "icon": "Music2",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "podcastle",
    "name": "Podcastle",
    "category": "audio-generation",
    "developer": "Podcastle",
    "officialUrl": "https://podcastle.ai",
    "overview": "Podcastle is an AI-powered platform for recording, editing and enhancing podcasts, including AI voice cleanup and transcription tools.",
    "pricing": "Freemium",
    "tags": [
      "podcasting",
      "audio editing",
      "transcription"
    ],
    "icon": "Mic",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "krisp",
    "name": "Krisp",
    "category": "audio-generation",
    "developer": "Krisp",
    "officialUrl": "https://krisp.ai",
    "overview": "Krisp is an AI noise-cancellation tool that removes background noise and echo from calls in real time, rather than generating or synthesizing audio.",
    "pricing": "Freemium",
    "platforms": [
      "Desktop"
    ],
    "tags": [
      "noise cancellation",
      "calls",
      "audio enhancement"
    ],
    "icon": "ShieldCheck",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "rytr",
    "name": "Rytr",
    "category": "writing",
    "developer": "Rytr",
    "officialUrl": "https://rytr.me",
    "overview": "Rytr is an AI writing assistant geared toward short-form content like ads, product descriptions and emails, built for quick drafts rather than long-form manuscripts.",
    "pricing": "Freemium",
    "tags": [
      "writing",
      "copywriting",
      "short-form",
      "ai assistant"
    ],
    "relatedTools": [
      "word-counter",
      "text-cleaner"
    ],
    "icon": "PenLine",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "quillbot",
    "name": "QuillBot",
    "category": "writing",
    "developer": "QuillBot",
    "officialUrl": "https://quillbot.com",
    "overview": "QuillBot centers on paraphrasing, grammar correction and summarizing existing text, helping users rephrase and polish writing rather than generate it from a blank page.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "tags": [
      "paraphrasing",
      "grammar",
      "summarizing",
      "writing"
    ],
    "relatedTools": [
      "word-counter",
      "text-cleaner"
    ],
    "icon": "Type",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "sudowrite",
    "name": "Sudowrite",
    "category": "writing",
    "developer": "Sudowrite",
    "officialUrl": "https://sudowrite.com",
    "overview": "Sudowrite is an AI writing assistant built specifically for fiction authors, offering brainstorming, description and scene-continuation tools tuned for storytelling rather than business copy.",
    "pricing": "Freemium",
    "tags": [
      "fiction",
      "creative writing",
      "storytelling",
      "ai assistant"
    ],
    "relatedTools": [
      "word-counter"
    ],
    "icon": "Sparkles",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "wordtune",
    "name": "Wordtune",
    "category": "writing",
    "developer": "AI21 Labs",
    "officialUrl": "https://wordtune.com",
    "overview": "Wordtune rewrites existing sentences to adjust tone, length and clarity, acting as a rewriting companion rather than a full content generator.",
    "pricing": "Freemium",
    "tags": [
      "rewriting",
      "tone",
      "clarity",
      "writing"
    ],
    "relatedTools": [
      "word-counter",
      "text-cleaner"
    ],
    "icon": "Type",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "neuronwriter",
    "name": "NeuronWriter",
    "category": "seo",
    "developer": "NeuronWriter",
    "officialUrl": "https://neuronwriter.com",
    "overview": "NeuronWriter analyzes top-ranking competitor pages and SERP data to generate content optimization suggestions and topic coverage recommendations for a target keyword.",
    "pricing": "Freemium",
    "tags": [
      "seo",
      "content optimization",
      "serp analysis",
      "keyword research"
    ],
    "relatedTools": [
      "keyword-density-checker",
      "serp-preview"
    ],
    "icon": "Search",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "clearscope",
    "name": "Clearscope",
    "category": "seo",
    "developer": "Clearscope",
    "officialUrl": "https://clearscope.io",
    "overview": "Clearscope grades content against keyword and topical relevance benchmarks derived from top search results, helping writers optimize articles for organic search performance.",
    "pricing": "Paid",
    "tags": [
      "seo",
      "content optimization",
      "keyword research",
      "content grading"
    ],
    "relatedTools": [
      "keyword-density-checker",
      "meta-tags-generator"
    ],
    "icon": "Search",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "marketmuse",
    "name": "MarketMuse",
    "category": "seo",
    "developer": "MarketMuse",
    "officialUrl": "https://marketmuse.com",
    "overview": "MarketMuse applies AI content analysis to plan topic clusters and optimize existing pages at scale, aimed more at SEO teams and content strategy than individual writers.",
    "pricing": "Enterprise",
    "tags": [
      "seo",
      "content strategy",
      "content planning",
      "topic clusters"
    ],
    "relatedTools": [
      "keyword-density-checker"
    ],
    "icon": "Search",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "slidesgo-ai",
    "name": "Slidesgo AI",
    "category": "presentation",
    "developer": "Slidesgo/Freepik",
    "officialUrl": "https://slidesgo.com",
    "overview": "Slidesgo's AI presentation tool generates a full slide deck design, layout and imagery from a short text prompt, building on Slidesgo's existing template library.",
    "pricing": "Freemium",
    "tags": [
      "presentation",
      "slide deck",
      "ai design",
      "templates"
    ],
    "icon": "Presentation",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "decktopus",
    "name": "Decktopus",
    "category": "presentation",
    "developer": "Decktopus",
    "officialUrl": "https://decktopus.com",
    "overview": "Decktopus is an AI-assisted presentation builder that suggests slide structure, layouts and design choices as you type content, aiming to speed up deck creation.",
    "pricing": "Freemium",
    "tags": [
      "presentation",
      "slide deck",
      "ai design",
      "productivity"
    ],
    "icon": "Presentation",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "motion",
    "name": "Motion",
    "category": "productivity",
    "developer": "Motion",
    "officialUrl": "https://usemotion.com",
    "overview": "Motion uses AI to automatically build and continuously re-plan your daily calendar and task list around deadlines and priorities, rather than just tracking tasks manually.",
    "pricing": "Paid",
    "platforms": [
      "Web",
      "Mobile"
    ],
    "tags": [
      "scheduling",
      "calendar",
      "task management",
      "ai planning"
    ],
    "icon": "CalendarClock",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "reclaim-ai",
    "name": "Reclaim AI",
    "category": "productivity",
    "developer": "Reclaim.ai",
    "officialUrl": "https://reclaim.ai",
    "overview": "Reclaim AI works inside your existing calendar to automatically defend focus time, habits and buffer time, adapting the schedule as new meetings appear rather than replacing your task manager.",
    "pricing": "Freemium",
    "platforms": [
      "Web",
      "Mobile"
    ],
    "tags": [
      "scheduling",
      "calendar",
      "focus time",
      "ai planning"
    ],
    "icon": "CalendarClock",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "mem",
    "name": "Mem",
    "category": "productivity",
    "developer": "Mem Labs",
    "officialUrl": "https://mem.ai",
    "overview": "Mem is an AI-organized note-taking app that automatically connects and surfaces related notes, aiming to cut down on manual folder and tag management for personal knowledge.",
    "pricing": "Freemium",
    "tags": [
      "notes",
      "knowledge management",
      "productivity",
      "ai organization"
    ],
    "icon": "StickyNote",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "taskade",
    "name": "Taskade",
    "category": "productivity",
    "developer": "Taskade",
    "officialUrl": "https://taskade.com",
    "overview": "Taskade combines AI-assisted task lists, docs and team workspaces in one tool, generating project outlines and action items from a prompt for collaborative planning.",
    "pricing": "Freemium",
    "platforms": [
      "Web",
      "Mobile",
      "Desktop"
    ],
    "tags": [
      "task management",
      "collaboration",
      "docs",
      "productivity"
    ],
    "icon": "ClipboardList",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "lavender",
    "name": "Lavender",
    "category": "email",
    "developer": "Lavender",
    "officialUrl": "https://lavender.ai",
    "overview": "Lavender scores and coaches sales emails before you send them, flagging tone, length and readability issues to improve reply rates rather than writing full emails outright.",
    "pricing": "Freemium",
    "tags": [
      "email",
      "sales",
      "email coaching",
      "ai scoring"
    ],
    "relatedTools": [
      "word-counter"
    ],
    "icon": "Mail",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "flowrite",
    "name": "Flowrite",
    "category": "email",
    "developer": "Flowrite",
    "officialUrl": "https://flowrite.com",
    "overview": "Flowrite turns a short bullet-point prompt into a fully written email, aiming to cut down the time spent drafting routine business correspondence.",
    "pricing": "Freemium",
    "tags": [
      "email",
      "writing",
      "ai drafting",
      "productivity"
    ],
    "relatedTools": [
      "word-counter"
    ],
    "icon": "Mail",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "anyword",
    "name": "Anyword",
    "category": "marketing",
    "developer": "Anyword",
    "officialUrl": "https://anyword.com",
    "overview": "Anyword generates marketing copy variants and predicts their likely performance using historical data, aimed at data-driven ad and landing page copywriting.",
    "pricing": "Freemium",
    "tags": [
      "marketing",
      "copywriting",
      "ad copy",
      "performance prediction"
    ],
    "relatedTools": [
      "word-counter"
    ],
    "icon": "Megaphone",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "ocoya",
    "name": "Ocoya",
    "category": "marketing",
    "developer": "Ocoya",
    "officialUrl": "https://ocoya.com",
    "overview": "Ocoya generates social media captions and graphics and includes built-in scheduling and publishing, combining content creation with a posting calendar in one workspace.",
    "pricing": "Freemium",
    "tags": [
      "social media",
      "content generation",
      "scheduling",
      "marketing"
    ],
    "icon": "Megaphone",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "vidyard-ai",
    "name": "Vidyard AI",
    "category": "marketing",
    "developer": "Vidyard",
    "officialUrl": "https://vidyard.com",
    "overview": "Vidyard's AI features help script, create and personalize short sales and marketing videos, layered on top of Vidyard's existing video hosting and analytics platform.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "tags": [
      "video",
      "sales enablement",
      "marketing",
      "personalization"
    ],
    "icon": "Megaphone",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "donotpay",
    "name": "DoNotPay",
    "category": "legal",
    "developer": "DoNotPay",
    "officialUrl": "https://donotpay.com",
    "overview": "An AI-powered consumer-rights assistant that helps people contest parking tickets, cancel unwanted subscriptions, and draft everyday legal paperwork.",
    "pricing": "Paid",
    "tags": [
      "legal",
      "consumer-rights",
      "ai-assistant",
      "automation"
    ],
    "icon": "Scale",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "spellbook",
    "name": "Spellbook",
    "category": "legal",
    "developer": "Spellbook",
    "officialUrl": "https://spellbook.legal",
    "overview": "An AI contract drafting and review assistant that works directly inside Microsoft Word, flagging risky clauses and suggesting redlines for lawyers.",
    "pricing": "Paid",
    "tags": [
      "legal",
      "contracts",
      "ai-review",
      "word-addin"
    ],
    "icon": "Scale",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "ironclad-ai",
    "name": "Ironclad AI",
    "category": "legal",
    "developer": "Ironclad",
    "officialUrl": "https://ironcladapp.com",
    "overview": "AI features built into Ironclad's contract lifecycle management platform, helping legal teams review, negotiate, and manage contracts at scale.",
    "pricing": "Enterprise",
    "tags": [
      "legal",
      "contract-lifecycle",
      "contracts",
      "enterprise"
    ],
    "icon": "Handshake",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "copilot-money",
    "name": "Copilot Money",
    "category": "finance",
    "developer": "Copilot Money",
    "officialUrl": "https://copilot.money",
    "overview": "An AI-assisted personal finance app that automatically categorizes transactions and tracks net worth across linked accounts.",
    "pricing": "Freemium",
    "platforms": [
      "Mobile"
    ],
    "tags": [
      "finance",
      "budgeting",
      "net-worth",
      "personal-finance"
    ],
    "icon": "Wallet",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "rocket-money",
    "name": "Rocket Money",
    "category": "finance",
    "developer": "Rocket Money",
    "officialUrl": "https://rocketmoney.com",
    "overview": "An AI-assisted app that tracks recurring subscriptions, negotiates bills on a user's behalf, and helps build a monthly budget.",
    "pricing": "Freemium",
    "platforms": [
      "Mobile"
    ],
    "tags": [
      "finance",
      "subscriptions",
      "budgeting",
      "bill-negotiation"
    ],
    "icon": "ReceiptText",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "origin",
    "name": "Origin",
    "category": "finance",
    "developer": "Origin",
    "officialUrl": "https://meetorigin.com",
    "overview": "An AI-assisted personal finance and financial planning platform, often offered to employees as a workplace benefit.",
    "pricing": "Freemium",
    "tags": [
      "finance",
      "financial-planning",
      "benefits",
      "retirement"
    ],
    "icon": "Coins",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "ambience-healthcare",
    "name": "Ambience Healthcare",
    "category": "healthcare",
    "developer": "Ambience Healthcare",
    "officialUrl": "https://ambiencehealthcare.com",
    "overview": "An AI ambient clinical documentation assistant that listens during patient visits and helps clinicians draft notes, reducing time spent on paperwork. It is a documentation aid, not a diagnostic or clinical decision-making tool.",
    "pricing": "Enterprise",
    "tags": [
      "healthcare",
      "clinical-documentation",
      "ambient-ai",
      "scribe"
    ],
    "icon": "Stethoscope",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "suki-ai",
    "name": "Suki AI",
    "category": "healthcare",
    "developer": "Suki",
    "officialUrl": "https://suki.ai",
    "overview": "An AI voice assistant for clinicians that generates clinical documentation from patient conversations, aimed at reducing administrative burden. It supports note-taking and is not a substitute for clinical judgment.",
    "pricing": "Enterprise",
    "tags": [
      "healthcare",
      "voice-ai",
      "clinical-documentation",
      "scribe"
    ],
    "icon": "Stethoscope",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "novoresume",
    "name": "Novoresume",
    "category": "resume",
    "developer": "Novoresume",
    "officialUrl": "https://novoresume.com",
    "overview": "An AI-assisted resume and cover letter builder offering ATS-friendly templates and content suggestions for job seekers.",
    "pricing": "Freemium",
    "tags": [
      "resume",
      "cover-letter",
      "templates",
      "job-search"
    ],
    "relatedTools": [
      "resume-builder"
    ],
    "icon": "FileUser",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "enhancv",
    "name": "Enhancv",
    "category": "resume",
    "developer": "Enhancv",
    "officialUrl": "https://enhancv.com",
    "overview": "An AI resume builder that tailors resume content and formatting to match specific job listings and industries.",
    "pricing": "Freemium",
    "tags": [
      "resume",
      "job-search",
      "ats",
      "career"
    ],
    "relatedTools": [
      "resume-builder"
    ],
    "icon": "FileUser",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "vista-social",
    "name": "Vista Social",
    "category": "social-media",
    "developer": "Vista Social",
    "officialUrl": "https://vistasocial.com",
    "overview": "A social media scheduling and management platform with AI-assisted caption writing across multiple networks.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "social-media",
      "scheduling",
      "captions",
      "marketing"
    ],
    "icon": "Share2",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "predis-ai",
    "name": "Predis.ai",
    "category": "social-media",
    "developer": "Predis.ai",
    "officialUrl": "https://predis.ai",
    "overview": "An AI tool that generates social media posts, captions, and short-form video or carousel content from a simple prompt.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "social-media",
      "content-generation",
      "video",
      "captions"
    ],
    "icon": "Share2",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "simplified",
    "name": "Simplified",
    "category": "social-media",
    "developer": "Simplified",
    "officialUrl": "https://simplified.com",
    "overview": "An all-in-one AI content and design tool that helps marketing teams create social posts, graphics, and copy in one workspace.",
    "pricing": "Freemium",
    "tags": [
      "social-media",
      "design",
      "content-creation",
      "marketing"
    ],
    "icon": "Share2",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "rossum",
    "name": "Rossum",
    "category": "ocr",
    "developer": "Rossum",
    "officialUrl": "https://rossum.ai",
    "overview": "An AI-powered document data extraction platform that specializes in reading and structuring data from invoices and other business documents.",
    "pricing": "Enterprise",
    "apiAvailable": true,
    "tags": [
      "ocr",
      "document-extraction",
      "invoices",
      "automation"
    ],
    "relatedTools": [
      "invoice-maker"
    ],
    "icon": "Eye",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "docsumo",
    "name": "Docsumo",
    "category": "ocr",
    "developer": "Docsumo",
    "officialUrl": "https://docsumo.com",
    "overview": "An AI document processing platform that extracts structured data from business documents such as invoices, receipts, and bank statements.",
    "pricing": "Enterprise",
    "apiAvailable": true,
    "tags": [
      "ocr",
      "document-processing",
      "data-extraction",
      "automation"
    ],
    "relatedTools": [
      "invoice-maker"
    ],
    "icon": "Eye",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "humata",
    "name": "Humata",
    "category": "pdf-ai",
    "developer": "Humata",
    "officialUrl": "https://humata.ai",
    "overview": "An AI tool that lets users ask questions and get answers across the contents of one or many uploaded PDFs at once.",
    "pricing": "Freemium",
    "tags": [
      "pdf-ai",
      "document-qa",
      "research",
      "chat"
    ],
    "relatedTools": [
      "pdf-studio"
    ],
    "icon": "FileText",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "askyourpdf",
    "name": "AskYourPDF",
    "category": "pdf-ai",
    "developer": "AskYourPDF",
    "officialUrl": "https://askyourpdf.com",
    "overview": "An AI chat tool that lets users upload a PDF and ask questions about its contents in plain language.",
    "pricing": "Freemium",
    "tags": [
      "pdf-ai",
      "document-qa",
      "chat",
      "productivity"
    ],
    "relatedTools": [
      "pdf-studio"
    ],
    "icon": "FileText",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "sider",
    "name": "Sider",
    "category": "pdf-ai",
    "developer": "Sider",
    "officialUrl": "https://sider.ai",
    "overview": "An AI sidebar assistant that includes PDF summarization and document chat features alongside general AI chat capabilities.",
    "pricing": "Freemium",
    "tags": [
      "pdf-ai",
      "summarization",
      "chat",
      "productivity"
    ],
    "relatedTools": [
      "pdf-studio"
    ],
    "icon": "FileText",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "forethought",
    "name": "Forethought",
    "category": "customer-support",
    "developer": "Forethought",
    "officialUrl": "https://forethought.ai",
    "overview": "An AI platform that automates customer support workflows, triaging tickets and suggesting resolutions for support teams.",
    "pricing": "Enterprise",
    "tags": [
      "customer-support",
      "automation",
      "ticket-triage",
      "enterprise"
    ],
    "icon": "MessagesSquare",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "decagon",
    "name": "Decagon",
    "category": "customer-support",
    "developer": "Decagon",
    "officialUrl": "https://decagon.ai",
    "overview": "An AI customer support agent platform that enterprises use to automate conversational support across chat and other channels.",
    "pricing": "Enterprise",
    "tags": [
      "customer-support",
      "ai-agent",
      "enterprise",
      "automation"
    ],
    "icon": "MessagesSquare",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "chatglm",
    "name": "ChatGLM",
    "category": "chatbots",
    "developer": "Zhipu AI",
    "officialUrl": "https://chatglm.cn",
    "overview": "A Chinese-language conversational AI assistant built on Zhipu AI's GLM model family, handling chat, writing and reasoning tasks.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "chatbot",
      "chinese",
      "llm",
      "conversational-ai"
    ],
    "icon": "MessageCircle",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "ernie-bot",
    "name": "Ernie Bot",
    "category": "chatbots",
    "developer": "Baidu",
    "officialUrl": "https://yiyan.baidu.com",
    "overview": "Baidu's conversational AI assistant powered by its ERNIE foundation models, offering chat, content generation and Q&A in Chinese.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "chatbot",
      "chinese",
      "llm",
      "baidu"
    ],
    "icon": "MessageCircle",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "semantic-scholar",
    "name": "Semantic Scholar",
    "category": "research",
    "developer": "Allen Institute for AI",
    "officialUrl": "https://www.semanticscholar.org",
    "overview": "A free academic search engine that uses AI to generate paper summaries and TLDRs, helping researchers quickly assess relevance across millions of papers.",
    "pricing": "Free",
    "platforms": [
      "Web"
    ],
    "tags": [
      "academic-search",
      "papers",
      "citations",
      "tldr"
    ],
    "relatedTools": [
      "pdf-studio"
    ],
    "icon": "FileSearch",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "researchrabbit",
    "name": "ResearchRabbit",
    "category": "research",
    "developer": "ResearchRabbit",
    "officialUrl": "https://www.researchrabbit.ai",
    "overview": "A citation-graph discovery tool that visualizes connections between academic papers, helping researchers surface related work they might otherwise miss.",
    "pricing": "Free",
    "platforms": [
      "Web"
    ],
    "tags": [
      "citation-graph",
      "academic-search",
      "papers",
      "literature-review"
    ],
    "icon": "Search",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "litmaps",
    "name": "Litmaps",
    "category": "research",
    "developer": "Litmaps",
    "officialUrl": "https://www.litmaps.com",
    "overview": "A visual citation mapping tool that plots how research papers cite and build on one another, making it easier to trace a field's development.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "citation-mapping",
      "literature-review",
      "research",
      "papers"
    ],
    "relatedTools": [
      "pdf-studio"
    ],
    "icon": "Microscope",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "microsoft-translator",
    "name": "Microsoft Translator",
    "category": "translation",
    "developer": "Microsoft",
    "officialUrl": "https://www.microsoft.com/translator",
    "docsUrl": "https://learn.microsoft.com/azure/ai-services/translator",
    "overview": "A free AI-powered translation service from Microsoft supporting text and speech translation across dozens of languages, with apps and API access.",
    "pricing": "Free",
    "apiAvailable": true,
    "platforms": [
      "Web",
      "Mobile"
    ],
    "tags": [
      "translation",
      "speech-translation",
      "microsoft",
      "languages"
    ],
    "icon": "Languages",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "systran",
    "name": "Systran",
    "category": "translation",
    "developer": "SYSTRAN",
    "officialUrl": "https://www.systransoft.com",
    "docsUrl": "https://docs.systran.net",
    "overview": "One of the longest-running machine translation companies, now offering AI-powered neural translation aimed at enterprise and government customers.",
    "pricing": "Enterprise",
    "apiAvailable": true,
    "platforms": [
      "Web"
    ],
    "tags": [
      "translation",
      "enterprise",
      "neural-mt",
      "localization"
    ],
    "icon": "Globe",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "lokalise",
    "name": "Lokalise",
    "category": "translation",
    "developer": "Lokalise",
    "officialUrl": "https://lokalise.com",
    "docsUrl": "https://developers.lokalise.com",
    "overview": "An AI-assisted software localization platform that helps teams translate and manage app and website content across many languages in one workflow.",
    "pricing": "Paid",
    "apiAvailable": true,
    "platforms": [
      "Web"
    ],
    "tags": [
      "localization",
      "translation-management",
      "software-translation",
      "team-workflow"
    ],
    "icon": "Languages",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "photomath",
    "name": "Photomath",
    "category": "education",
    "developer": "Photomath",
    "officialUrl": "https://photomath.com",
    "overview": "A math-solving app that scans handwritten or printed problems with a phone camera and returns step-by-step AI-generated solutions and explanations.",
    "pricing": "Freemium",
    "platforms": [
      "Mobile"
    ],
    "tags": [
      "math",
      "homework-help",
      "ocr",
      "step-by-step"
    ],
    "icon": "Calculator",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "numerade",
    "name": "Numerade",
    "category": "education",
    "developer": "Numerade",
    "officialUrl": "https://www.numerade.com",
    "overview": "An education platform offering AI-assisted video explanations for STEM textbook and homework problems across math, physics, chemistry and more.",
    "pricing": "Freemium",
    "platforms": [
      "Web",
      "Mobile"
    ],
    "tags": [
      "stem",
      "homework-help",
      "video-explanations",
      "tutoring"
    ],
    "icon": "GraduationCap",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "speak",
    "name": "Speak",
    "category": "education",
    "developer": "Speak",
    "officialUrl": "https://www.speak.com",
    "overview": "An AI-powered spoken language learning app that lets learners practice real conversations with an AI tutor and get instant pronunciation feedback.",
    "pricing": "Freemium",
    "platforms": [
      "Mobile"
    ],
    "tags": [
      "language-learning",
      "speaking-practice",
      "pronunciation",
      "conversational-ai"
    ],
    "icon": "Speech",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "cognosys",
    "name": "Cognosys",
    "category": "agents",
    "developer": "Cognosys",
    "officialUrl": "https://www.cognosys.ai",
    "overview": "An autonomous AI agent that plans and executes multi-step web research and task workflows from a single natural-language goal.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "autonomous-agent",
      "web-research",
      "task-automation",
      "planning"
    ],
    "icon": "Bot",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "adept-ai",
    "name": "Adept AI",
    "category": "agents",
    "developer": "Adept AI",
    "officialUrl": "https://www.adept.ai",
    "overview": "An AI agent company building models that can perceive software interfaces and take real actions inside apps and websites on a user's behalf.",
    "pricing": "Enterprise",
    "platforms": [
      "Web"
    ],
    "tags": [
      "ai-agents",
      "automation",
      "action-taking",
      "enterprise"
    ],
    "icon": "Cpu",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "imbue",
    "name": "Imbue",
    "category": "agents",
    "developer": "Imbue",
    "officialUrl": "https://imbue.com",
    "overview": "An AI research lab building agents focused on reliable multi-step reasoning and coding, aiming to make autonomous agents more trustworthy in practice.",
    "pricing": "Enterprise",
    "platforms": [
      "Web"
    ],
    "tags": [
      "ai-agents",
      "reasoning",
      "coding-agent",
      "research-lab"
    ],
    "icon": "Compass",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "sourcegraph-cody",
    "name": "Sourcegraph Cody",
    "category": "coding",
    "developer": "Sourcegraph",
    "officialUrl": "https://sourcegraph.com/cody",
    "overview": "Cody indexes an entire codebase to power code completions, chat and refactoring suggestions that understand project-wide context rather than just the currently open file.",
    "pricing": "Freemium",
    "tags": [
      "code completion",
      "codebase context",
      "ai pair programming",
      "refactoring"
    ],
    "relatedTools": [
      "code-playground"
    ],
    "icon": "SquareCode",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "aider",
    "name": "Aider",
    "category": "coding",
    "developer": "Aider",
    "officialUrl": "https://aider.chat",
    "overview": "Aider runs as a terminal-based pair programmer that edits real files inside a local git repository, applying AI-suggested diffs directly and committing changes as it goes.",
    "pricing": "Free",
    "openSource": true,
    "platforms": [
      "Desktop"
    ],
    "tags": [
      "cli",
      "open source",
      "pair programming",
      "git integration"
    ],
    "relatedTools": [
      "code-playground"
    ],
    "icon": "Terminal",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "qodo",
    "name": "Qodo",
    "category": "coding",
    "developer": "Qodo (formerly CodiumAI)",
    "officialUrl": "https://qodo.ai",
    "overview": "Qodo analyzes code changes to generate meaningful test cases and automated code review feedback aimed at catching bugs before a pull request merges.",
    "pricing": "Freemium",
    "tags": [
      "test generation",
      "code review",
      "code quality",
      "ci/cd"
    ],
    "relatedTools": [
      "code-playground"
    ],
    "icon": "Code2",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "relay-app",
    "name": "Relay.app",
    "category": "automation",
    "developer": "Relay.app",
    "officialUrl": "https://relay.app",
    "overview": "Relay.app builds multi-step automations that mix AI actions with human-in-the-loop approval steps, letting a person review or edit an output before the workflow continues.",
    "pricing": "Freemium",
    "tags": [
      "workflow automation",
      "human in the loop",
      "integrations",
      "ai agents"
    ],
    "relatedTools": [
      "json-formatter"
    ],
    "icon": "Workflow",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "pipedream",
    "name": "Pipedream",
    "category": "automation",
    "developer": "Pipedream",
    "officialUrl": "https://pipedream.com",
    "overview": "Pipedream lets developers wire APIs and events into automated workflows, mixing custom JavaScript or Python code steps with pre-built app connectors and AI-assisted step generation.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "tags": [
      "workflow automation",
      "developer tools",
      "api integration",
      "serverless"
    ],
    "relatedTools": [
      "json-formatter",
      "code-playground"
    ],
    "icon": "Zap",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "workato",
    "name": "Workato",
    "category": "automation",
    "developer": "Workato",
    "officialUrl": "https://workato.com",
    "overview": "Workato is an enterprise integration platform that connects business applications and data pipelines, using AI to recommend and help assemble automation recipes at scale.",
    "pricing": "Enterprise",
    "apiAvailable": true,
    "tags": [
      "enterprise automation",
      "integration platform",
      "workflow",
      "ipaas"
    ],
    "icon": "Boxes",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "draftbit",
    "name": "Draftbit",
    "category": "no-code",
    "developer": "Draftbit",
    "officialUrl": "https://draftbit.com",
    "overview": "Draftbit provides a drag-and-drop visual builder for creating cross-platform React Native apps, generating real exportable source code instead of a locked-in proprietary runtime.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "no-code",
      "react native",
      "app builder",
      "mobile development"
    ],
    "relatedTools": [
      "ui-snippets"
    ],
    "icon": "Blocks",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "buildship",
    "name": "Buildship",
    "category": "no-code",
    "developer": "Buildship",
    "officialUrl": "https://buildship.com",
    "overview": "Buildship is a visual, node-based backend builder where AI helps generate individual workflow nodes, letting teams assemble APIs and automations without writing boilerplate code.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "tags": [
      "low-code",
      "backend builder",
      "workflow automation",
      "api"
    ],
    "relatedTools": [
      "json-formatter"
    ],
    "icon": "Waypoints",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "attio",
    "name": "Attio",
    "category": "business",
    "developer": "Attio",
    "officialUrl": "https://attio.com",
    "overview": "Attio is a CRM that automatically enriches and structures customer records from email and calendar activity, giving sales teams a continuously up-to-date view of every relationship.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "tags": [
      "crm",
      "sales",
      "data enrichment",
      "customer data"
    ],
    "relatedTools": [
      "csv-json-converter"
    ],
    "icon": "Table2",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "fyxer-ai",
    "name": "Fyxer AI",
    "category": "business",
    "developer": "Fyxer AI",
    "officialUrl": "https://fyxer.com",
    "overview": "Fyxer AI sits in a professional's inbox and calendar, drafting email replies, labeling messages by priority, and preparing meeting notes to cut down on daily admin work.",
    "pricing": "Freemium",
    "tags": [
      "email assistant",
      "inbox management",
      "calendar",
      "productivity"
    ],
    "icon": "Sparkles",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "bardeen",
    "name": "Bardeen",
    "category": "business",
    "developer": "Bardeen",
    "officialUrl": "https://bardeen.ai",
    "overview": "Bardeen is a browser automation tool that lets users chain actions across web apps into no-code playbooks, triggered manually, on a schedule, or by an AI-driven prompt.",
    "pricing": "Freemium",
    "platforms": [
      "Chrome Extension"
    ],
    "tags": [
      "browser automation",
      "no-code",
      "web scraping",
      "workflow"
    ],
    "icon": "Bot",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "civitai",
    "name": "Civitai",
    "category": "image-generation",
    "developer": "Civitai",
    "officialUrl": "https://civitai.com",
    "overview": "Civitai is a community platform for discovering, sharing and running community-trained Stable Diffusion checkpoints, LoRAs and image generation models.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "tags": [
      "image generation",
      "stable diffusion",
      "community",
      "models"
    ],
    "relatedTools": [
      "image-studio"
    ],
    "icon": "Image",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "nightcafe",
    "name": "NightCafe",
    "category": "image-generation",
    "developer": "NightCafe Studio",
    "officialUrl": "https://nightcafe.studio",
    "overview": "NightCafe is an AI art generator and creative community where users generate, remix and share artwork across multiple diffusion models.",
    "pricing": "Freemium",
    "tags": [
      "ai art",
      "image generation",
      "community",
      "creative"
    ],
    "relatedTools": [
      "image-studio"
    ],
    "icon": "Image",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "artbreeder",
    "name": "Artbreeder",
    "category": "image-generation",
    "developer": "Artbreeder",
    "officialUrl": "https://artbreeder.com",
    "overview": "Artbreeder lets users collaboratively create and evolve AI-generated images by blending genes from existing portraits, landscapes and artworks.",
    "pricing": "Freemium",
    "tags": [
      "image generation",
      "blending",
      "collaborative",
      "portraits"
    ],
    "icon": "Layers",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "microsoft-designer",
    "name": "Microsoft Designer",
    "category": "image-generation",
    "developer": "Microsoft",
    "officialUrl": "https://designer.microsoft.com",
    "overview": "Microsoft Designer is a free AI-powered graphic design tool that turns text prompts into social posts, invitations and other visual designs.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "graphic design",
      "templates",
      "image generation",
      "social media"
    ],
    "relatedTools": [
      "image-studio"
    ],
    "icon": "LayoutTemplate",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "durable",
    "name": "Durable",
    "category": "design",
    "developer": "Durable",
    "officialUrl": "https://durable.co",
    "overview": "Durable generates a complete small-business website, brand kit and marketing copy from a single prompt in minutes.",
    "pricing": "Freemium",
    "tags": [
      "website builder",
      "branding",
      "small business",
      "no-code"
    ],
    "relatedTools": [
      "favicon-generator"
    ],
    "icon": "Globe",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "khroma",
    "name": "Khroma",
    "category": "design",
    "developer": "Khroma",
    "officialUrl": "https://khroma.co",
    "overview": "Khroma is an AI color palette generator that learns your color preferences to create personalized palettes for design projects.",
    "pricing": "Free",
    "tags": [
      "color palette",
      "design tools",
      "branding",
      "ai"
    ],
    "icon": "Palette",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "diagram",
    "name": "Diagram",
    "category": "design",
    "developer": "Diagram, now part of Figma",
    "officialUrl": "https://diagram.com",
    "overview": "Diagram was an AI-assisted product design tool, later acquired by Figma, that helped generate layouts, copy and design variations directly within design workflows.",
    "pricing": "Paid",
    "tags": [
      "product design",
      "ui design",
      "figma",
      "ai design"
    ],
    "icon": "PenTool",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "kaedim",
    "name": "Kaedim",
    "category": "3d",
    "developer": "Kaedim",
    "officialUrl": "https://kaedim3d.com",
    "overview": "Kaedim converts 2D images and concept art into game-ready 3D models using AI, speeding up asset creation for game studios.",
    "pricing": "Paid",
    "apiAvailable": true,
    "tags": [
      "3d modeling",
      "game assets",
      "image to 3d",
      "concept art"
    ],
    "icon": "Box",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "sloyd",
    "name": "Sloyd",
    "category": "3d",
    "developer": "Sloyd",
    "officialUrl": "https://sloyd.ai",
    "overview": "Sloyd procedurally generates game-ready 3D models from a text prompt, letting developers customize parameters and export assets instantly.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "tags": [
      "3d modeling",
      "procedural generation",
      "game assets",
      "no-code"
    ],
    "icon": "Box",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "vidnoz",
    "name": "Vidnoz",
    "category": "animation",
    "developer": "Vidnoz",
    "officialUrl": "https://vidnoz.com",
    "overview": "Vidnoz is an AI video and avatar creation tool that turns scripts into narrated videos using digital avatars and text-to-speech.",
    "pricing": "Freemium",
    "tags": [
      "ai avatar",
      "video generation",
      "text to speech",
      "animation"
    ],
    "icon": "Film",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "wonder-studio",
    "name": "Wonder Studio",
    "category": "animation",
    "developer": "Wonder Dynamics",
    "officialUrl": "https://wonderdynamics.com",
    "overview": "Wonder Studio uses AI to automatically animate, light and composite CGI characters into live-action footage, replacing manual VFX pipelines.",
    "pricing": "Paid",
    "tags": [
      "cgi animation",
      "vfx",
      "character animation",
      "film"
    ],
    "icon": "Film",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "sora",
    "name": "Sora",
    "category": "video-generation",
    "developer": "OpenAI",
    "officialUrl": "https://openai.com/sora",
    "overview": "Sora is OpenAI's text-to-video generation model that creates realistic and imaginative video scenes from a written prompt.",
    "pricing": "Paid",
    "tags": [
      "text-to-video",
      "video generation",
      "openai",
      "ai video"
    ],
    "icon": "Video",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "haiper",
    "name": "Haiper",
    "category": "video-generation",
    "developer": "Haiper AI",
    "officialUrl": "https://haiper.ai",
    "overview": "Haiper is a text-to-video and image-to-video generation tool for quickly producing short AI-generated video clips.",
    "pricing": "Freemium",
    "tags": [
      "text-to-video",
      "image-to-video",
      "video generation",
      "ai video"
    ],
    "icon": "Video",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "murf-ai",
    "name": "Murf AI",
    "category": "voice-ai",
    "developer": "Murf AI",
    "officialUrl": "https://murf.ai",
    "overview": "Murf AI generates realistic AI voiceovers and text-to-speech audio, widely used for marketing videos and e-learning content.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "tags": [
      "text-to-speech",
      "voiceover",
      "voice ai",
      "e-learning"
    ],
    "icon": "MicVocal",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "speechify",
    "name": "Speechify",
    "category": "voice-ai",
    "developer": "Speechify",
    "officialUrl": "https://speechify.com",
    "overview": "Speechify turns any text into natural-sounding speech, and is widely used for accessibility and studying by reading documents and articles aloud.",
    "pricing": "Freemium",
    "platforms": [
      "Mobile",
      "Chrome Extension"
    ],
    "tags": [
      "text-to-speech",
      "accessibility",
      "reading",
      "voice ai"
    ],
    "icon": "Speech",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "cartesia",
    "name": "Cartesia",
    "category": "voice-ai",
    "developer": "Cartesia",
    "officialUrl": "https://cartesia.ai",
    "overview": "Cartesia is a low-latency, real-time AI voice generation platform built for developers embedding speech into apps and products.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "tags": [
      "voice ai",
      "text-to-speech",
      "real-time",
      "api"
    ],
    "icon": "MicVocal",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "boomy",
    "name": "Boomy",
    "category": "music-generation",
    "developer": "Boomy",
    "officialUrl": "https://boomy.com",
    "overview": "Boomy lets anyone generate original songs in seconds and even release the finished tracks to major streaming platforms.",
    "pricing": "Freemium",
    "tags": [
      "music generation",
      "song creation",
      "ai music",
      "streaming"
    ],
    "icon": "Music2",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "mubert",
    "name": "Mubert",
    "category": "music-generation",
    "developer": "Mubert",
    "officialUrl": "https://mubert.com",
    "overview": "Mubert generates royalty-free background music and soundtracks with AI, often used via API to power music inside other apps.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "tags": [
      "music generation",
      "royalty-free",
      "background music",
      "api"
    ],
    "icon": "Music2",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "auphonic",
    "name": "Auphonic",
    "category": "audio-generation",
    "developer": "Auphonic",
    "officialUrl": "https://auphonic.com",
    "overview": "Auphonic automatically cleans up, levels and masters podcast and audio recordings for a consistent, professional sound.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "tags": [
      "podcast",
      "audio mastering",
      "audio cleanup",
      "post-production"
    ],
    "icon": "Mic",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "cleanvoice",
    "name": "Cleanvoice",
    "category": "audio-generation",
    "developer": "Cleanvoice",
    "officialUrl": "https://cleanvoice.ai",
    "overview": "Cleanvoice automatically removes filler words, mouth sounds and silences from podcast audio, cutting editing time.",
    "pricing": "Freemium",
    "tags": [
      "podcast",
      "audio editing",
      "filler word removal",
      "audio cleanup"
    ],
    "icon": "Mic",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "prowritingaid",
    "name": "ProWritingAid",
    "category": "writing",
    "developer": "ProWritingAid",
    "officialUrl": "https://prowritingaid.com",
    "overview": "Grammar and style editor that flags readability, repetition and pacing issues, aimed at novelists and other long-form writers rather than short marketing copy.",
    "pricing": "Freemium",
    "platforms": [
      "Web",
      "Chrome Extension",
      "Desktop"
    ],
    "tags": [
      "grammar",
      "style-editing",
      "writing-assistant",
      "readability",
      "authors"
    ],
    "relatedTools": [
      "word-counter",
      "text-cleaner"
    ],
    "icon": "PenLine",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "jenni-ai",
    "name": "Jenni AI",
    "category": "writing",
    "developer": "Jenni AI",
    "officialUrl": "https://jenni.ai",
    "overview": "AI writing assistant built specifically for academic essays and research papers, helping with drafting, citations and paraphrasing in an academic tone.",
    "pricing": "Freemium",
    "tags": [
      "academic-writing",
      "essay-assistant",
      "research-papers",
      "citations"
    ],
    "relatedTools": [
      "word-counter"
    ],
    "icon": "Type",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "ahrefs",
    "name": "Ahrefs",
    "category": "seo",
    "developer": "Ahrefs",
    "officialUrl": "https://ahrefs.com",
    "overview": "A major SEO toolset for keyword research and backlink analysis that has layered in AI content-assistance features; fundamentally an SEO data platform rather than an AI-first writing tool.",
    "pricing": "Paid",
    "apiAvailable": true,
    "tags": [
      "seo",
      "keyword-research",
      "backlink-analysis",
      "site-audit"
    ],
    "relatedTools": [
      "keyword-density-checker",
      "serp-preview"
    ],
    "icon": "ChartColumn",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "scalenut",
    "name": "Scalenut",
    "category": "seo",
    "developer": "Scalenut",
    "officialUrl": "https://scalenut.com",
    "overview": "AI content writing platform paired with SEO research tools to help plan, draft and optimize articles for search rankings.",
    "pricing": "Freemium",
    "tags": [
      "seo-content",
      "ai-writing",
      "content-optimization",
      "keyword-research"
    ],
    "relatedTools": [
      "keyword-density-checker",
      "meta-tags-generator"
    ],
    "icon": "Search",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "plus-ai",
    "name": "Plus AI",
    "category": "presentation",
    "developer": "Plus AI",
    "officialUrl": "https://plusai.com",
    "overview": "Generates and edits full slide decks directly inside Google Slides or PowerPoint from a prompt or outline, keeping the workflow inside the native tool.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "slide-generation",
      "google-slides",
      "powerpoint",
      "presentations"
    ],
    "icon": "Presentation",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "slidesai",
    "name": "SlidesAI",
    "category": "presentation",
    "developer": "SlidesAI",
    "officialUrl": "https://slidesai.io",
    "overview": "Turns pasted text or a short outline into a formatted Google Slides presentation in a few clicks.",
    "pricing": "Freemium",
    "platforms": [
      "Web"
    ],
    "tags": [
      "slide-generation",
      "google-slides",
      "outline-to-slides",
      "presentations"
    ],
    "icon": "Presentation",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "sunsama",
    "name": "Sunsama",
    "category": "productivity",
    "developer": "Sunsama",
    "officialUrl": "https://sunsama.com",
    "overview": "AI-assisted daily planner that pulls tasks, emails and calendar events from multiple apps into a single daily view for planning your day.",
    "pricing": "Paid",
    "platforms": [
      "Web",
      "Mobile",
      "Desktop"
    ],
    "tags": [
      "daily-planner",
      "task-management",
      "calendar",
      "productivity"
    ],
    "icon": "CalendarClock",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "akiflow",
    "name": "Akiflow",
    "category": "productivity",
    "developer": "Akiflow",
    "officialUrl": "https://akiflow.com",
    "overview": "Task and calendar management app that centralizes to-dos from various tools and uses AI to help plan and schedule your day.",
    "pricing": "Paid",
    "platforms": [
      "Web",
      "Mobile",
      "Desktop"
    ],
    "tags": [
      "task-management",
      "calendar",
      "daily-planning",
      "productivity"
    ],
    "icon": "CalendarClock",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "todoist",
    "name": "Todoist",
    "category": "productivity",
    "developer": "Doist",
    "officialUrl": "https://todoist.com",
    "overview": "Widely used to-do list app whose AI features assist with quick-add task parsing and smart suggestions on top of its existing task management product.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "platforms": [
      "Web",
      "Mobile",
      "Desktop"
    ],
    "tags": [
      "to-do-list",
      "task-management",
      "quick-add",
      "productivity"
    ],
    "icon": "ClipboardList",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "missive",
    "name": "Missive",
    "category": "email",
    "developer": "Missive",
    "officialUrl": "https://missiveapp.com",
    "overview": "Shared team inbox for email and messaging that includes AI-assisted drafting to speed up collaborative replies.",
    "pricing": "Freemium",
    "platforms": [
      "Web",
      "Mobile",
      "Desktop"
    ],
    "tags": [
      "shared-inbox",
      "team-email",
      "ai-drafting",
      "collaboration"
    ],
    "relatedTools": [
      "text-cleaner"
    ],
    "icon": "Mail",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "sanebox",
    "name": "SaneBox",
    "category": "email",
    "developer": "SaneBox",
    "officialUrl": "https://sanebox.com",
    "overview": "AI email triage service that learns which messages matter and automatically filters unimportant email out of your inbox.",
    "pricing": "Paid",
    "tags": [
      "email-triage",
      "inbox-management",
      "spam-filtering",
      "email-ai"
    ],
    "icon": "Mail",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "omneky",
    "name": "Omneky",
    "category": "marketing",
    "developer": "Omneky",
    "officialUrl": "https://omneky.com",
    "overview": "Generates and optimizes ad creative at scale using AI, producing and testing variations across channels for performance.",
    "pricing": "Enterprise",
    "tags": [
      "ad-creative",
      "creative-generation",
      "advertising",
      "creative-testing"
    ],
    "icon": "Megaphone",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "pencil",
    "name": "Pencil",
    "category": "marketing",
    "developer": "Pencil",
    "officialUrl": "https://trypencil.com",
    "overview": "AI-generated ad creative with built-in performance prediction, helping teams produce and rank ad variants before spending budget on them.",
    "pricing": "Paid",
    "tags": [
      "ad-creative",
      "performance-prediction",
      "advertising",
      "creative-generation"
    ],
    "icon": "Megaphone",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "smartly-io",
    "name": "Smartly.io",
    "category": "marketing",
    "developer": "Smartly.io",
    "officialUrl": "https://smartly.io",
    "overview": "AI-powered management of social and programmatic ad campaigns aimed at large advertisers running high-volume creative and media buying.",
    "pricing": "Enterprise",
    "apiAvailable": true,
    "tags": [
      "ad-campaigns",
      "social-advertising",
      "programmatic",
      "campaign-automation"
    ],
    "icon": "Megaphone",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "robin-ai",
    "name": "Robin AI",
    "category": "legal",
    "developer": "Robin AI",
    "officialUrl": "https://www.robinai.com",
    "overview": "AI-assisted contract review and negotiation platform that helps legal and business teams draft, redline, and analyze contracts faster.",
    "pricing": "Enterprise",
    "tags": [
      "legal",
      "contracts",
      "ai-review",
      "negotiation"
    ],
    "icon": "Scale",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "luminance",
    "name": "Luminance",
    "category": "legal",
    "developer": "Luminance",
    "officialUrl": "https://www.luminance.com",
    "overview": "AI contract analysis and review platform that helps legal teams identify risk, extract key clauses, and speed up due diligence.",
    "pricing": "Enterprise",
    "tags": [
      "legal",
      "contract-analysis",
      "due-diligence",
      "ai-review"
    ],
    "icon": "Scale",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "plum",
    "name": "Plum",
    "category": "finance",
    "developer": "Plum",
    "officialUrl": "https://www.plum.com",
    "overview": "An AI-powered money app that studies your spending patterns and automatically sets aside savings you won't miss.",
    "pricing": "Freemium",
    "platforms": [
      "Mobile"
    ],
    "tags": [
      "finance",
      "savings",
      "budgeting",
      "personal-finance"
    ],
    "icon": "Coins",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "monarch-money",
    "name": "Monarch Money",
    "category": "finance",
    "developer": "Monarch Money",
    "officialUrl": "https://www.monarchmoney.com",
    "overview": "AI-assisted personal finance app that tracks budgets, net worth, and spending across all your accounts in one dashboard.",
    "pricing": "Freemium",
    "platforms": [
      "Mobile"
    ],
    "tags": [
      "finance",
      "budgeting",
      "net-worth",
      "personal-finance"
    ],
    "icon": "Coins",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "abridge",
    "name": "Abridge",
    "category": "healthcare",
    "developer": "Abridge",
    "officialUrl": "https://www.abridge.com",
    "overview": "An AI ambient clinical documentation assistant that listens during patient visits and helps clinicians draft structured notes. It is not a diagnostic tool and is not a substitute for professional medical judgment.",
    "pricing": "Enterprise",
    "tags": [
      "healthcare",
      "clinical-documentation",
      "ambient-ai",
      "medical-scribe"
    ],
    "icon": "Stethoscope",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "heidi-health",
    "name": "Heidi Health",
    "category": "healthcare",
    "developer": "Heidi Health",
    "officialUrl": "https://www.heidihealth.com",
    "overview": "An AI medical scribe that listens to consultations and helps clinicians write structured notes, intended purely as a documentation aid rather than a diagnostic tool.",
    "pricing": "Paid",
    "tags": [
      "healthcare",
      "medical-scribe",
      "clinical-notes",
      "ambient-ai"
    ],
    "icon": "Stethoscope",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "dax-copilot",
    "name": "DAX Copilot",
    "category": "healthcare",
    "developer": "Microsoft (Nuance)",
    "officialUrl": "https://www.nuance.com/healthcare/dragon-ax-copilot.html",
    "overview": "An ambient clinical documentation assistant from Microsoft/Nuance that listens during patient visits and drafts the clinical note, integrated directly into major electronic health record systems used by large health systems.",
    "pricing": "Enterprise",
    "apiAvailable": false,
    "tags": [
      "healthcare",
      "medical-scribe",
      "clinical-notes",
      "ambient-ai",
      "ehr-integration"
    ],
    "icon": "Stethoscope",
    "addedOn": "2026-08-06"
  },
  {
    "slug": "zety",
    "name": "Zety",
    "category": "resume",
    "developer": "Zety",
    "officialUrl": "https://zety.com",
    "overview": "An AI-assisted resume and cover letter builder that offers guided templates and phrasing suggestions to speed up job applications.",
    "pricing": "Freemium",
    "tags": [
      "resume",
      "cover-letter",
      "career",
      "templates"
    ],
    "relatedTools": [
      "resume-builder"
    ],
    "icon": "FileUser",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "resume-io",
    "name": "Resume.io",
    "category": "resume",
    "developer": "Resume.io",
    "officialUrl": "https://resume.io",
    "overview": "An online resume builder that pairs professionally designed templates with AI-assisted content suggestions.",
    "pricing": "Freemium",
    "tags": [
      "resume",
      "resume-builder",
      "career",
      "templates"
    ],
    "relatedTools": [
      "resume-builder"
    ],
    "icon": "FileUser",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "hootsuite-owlywriter-ai",
    "name": "Hootsuite OwlyWriter AI",
    "category": "social-media",
    "developer": "Hootsuite",
    "officialUrl": "https://www.hootsuite.com",
    "overview": "An AI caption and post-idea generator built into Hootsuite's social media management platform, helping teams draft on-brand posts faster.",
    "pricing": "Paid",
    "tags": [
      "social-media",
      "caption-generator",
      "scheduling",
      "content-creation"
    ],
    "icon": "Share2",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "lately-ai",
    "name": "Lately AI",
    "category": "social-media",
    "developer": "Lately",
    "officialUrl": "https://www.lately.ai",
    "overview": "Turns long-form content like blog posts, podcasts, or videos into dozens of AI-generated social media posts tailored per platform.",
    "pricing": "Freemium",
    "tags": [
      "social-media",
      "content-repurposing",
      "ai-writing",
      "marketing"
    ],
    "icon": "Share2",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "klippa",
    "name": "Klippa",
    "category": "ocr",
    "developer": "Klippa",
    "officialUrl": "https://www.klippa.com",
    "overview": "AI-powered document scanning and data extraction platform that helps businesses digitize receipts, invoices, and other paperwork.",
    "pricing": "Paid",
    "apiAvailable": true,
    "tags": [
      "ocr",
      "document-scanning",
      "data-extraction",
      "automation"
    ],
    "relatedTools": [
      "invoice-maker"
    ],
    "icon": "Eye",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "veryfi",
    "name": "Veryfi",
    "category": "ocr",
    "developer": "Veryfi",
    "officialUrl": "https://www.veryfi.com",
    "overview": "AI-powered OCR and data extraction platform specialized in reading receipts, invoices, and bills into structured data via API.",
    "pricing": "Paid",
    "apiAvailable": true,
    "tags": [
      "ocr",
      "receipt-scanning",
      "invoice-data",
      "api"
    ],
    "relatedTools": [
      "invoice-maker",
      "gst-calculator"
    ],
    "icon": "Eye",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "adobe-acrobat-ai-assistant",
    "name": "Adobe Acrobat AI Assistant",
    "category": "pdf-ai",
    "developer": "Adobe",
    "officialUrl": "https://acrobat.adobe.com",
    "overview": "An AI assistant built into Adobe Acrobat that summarizes long PDFs and answers questions about their content directly inside the document.",
    "pricing": "Freemium",
    "tags": [
      "pdf-ai",
      "document-summarization",
      "pdf-assistant",
      "adobe"
    ],
    "relatedTools": [
      "pdf-studio",
      "pdf-compress"
    ],
    "icon": "FileText",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "aisera",
    "name": "Aisera",
    "category": "customer-support",
    "developer": "Aisera",
    "officialUrl": "https://www.aisera.com",
    "overview": "An AI customer service and IT support automation platform that resolves tickets and answers queries for enterprises using conversational agents.",
    "pricing": "Enterprise",
    "apiAvailable": true,
    "tags": [
      "customer-support",
      "automation",
      "conversational-ai",
      "enterprise"
    ],
    "icon": "MessagesSquare",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "kore-ai",
    "name": "Kore.ai",
    "category": "customer-support",
    "developer": "Kore.ai",
    "officialUrl": "https://www.kore.ai",
    "overview": "An enterprise conversational AI platform for building virtual assistants that handle customer service and support interactions across channels.",
    "pricing": "Enterprise",
    "apiAvailable": true,
    "tags": [
      "customer-support",
      "conversational-ai",
      "virtual-assistant",
      "enterprise"
    ],
    "icon": "MessagesSquare",
    "addedOn": "2026-08-02"
  },
  {
    "slug": "hyper3d-rodin",
    "name": "Hyper3D Rodin",
    "category": "3d",
    "developer": "Deemos",
    "officialUrl": "https://hyper3d.ai",
    "overview": "A native 3D generative AI model that turns a text prompt or reference image into a textured, quad-mesh 3D model in under a minute, aimed at game, film and 3D-printing workflows.",
    "pricing": "Freemium",
    "apiAvailable": true,
    "platforms": ["Web"],
    "tags": ["text-to-3d", "image-to-3d", "3d-models", "quad-mesh", "game-assets"],
    "icon": "Boxes",
    "addedOn": "2026-08-20"
  },
  {
    "slug": "cocounsel",
    "name": "CoCounsel",
    "category": "legal",
    "developer": "Thomson Reuters",
    "officialUrl": "https://www.thomsonreuters.com/en/cocounsel",
    "overview": "A legal AI assistant built on Thomson Reuters' Westlaw content for research memos, contract review, deposition prep and document summarization, aimed at law firms already inside the Westlaw ecosystem.",
    "pricing": "Enterprise",
    "tags": ["legal", "legal research", "westlaw", "contract-review", "law-firms"],
    "icon": "Scale",
    "addedOn": "2026-08-27"
  },
  {
    "slug": "corti",
    "name": "Corti",
    "category": "healthcare",
    "developer": "Corti",
    "officialUrl": "https://www.corti.ai",
    "overview": "A healthcare AI platform providing speech-to-text, medical coding and an AI scribe (Corti Assistant) that listens during a consultation and drafts clinical documentation from the conversation, with an API for EHR and telehealth integrations.",
    "pricing": "Enterprise",
    "apiAvailable": true,
    "tags": ["healthcare", "clinical-documentation", "ai-scribe", "medical-coding", "api"],
    "icon": "Stethoscope",
    "addedOn": "2026-08-27"
  },
  {
    "slug": "pocketguard",
    "name": "PocketGuard",
    "category": "finance",
    "developer": "PocketGuard",
    "officialUrl": "https://pocketguard.com",
    "overview": "A personal budgeting app that links your accounts, tracks spending automatically and uses AI chat to answer questions about your budget, plus a debt payoff planner and bill-negotiation feature.",
    "pricing": "Paid",
    "platforms": ["Web", "Mobile"],
    "tags": ["budgeting", "personal-finance", "expense-tracking", "debt-payoff"],
    "icon": "Coins",
    "addedOn": "2026-08-27"
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
