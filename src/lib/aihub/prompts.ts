export interface PromptCategory {
  slug: string;
  name: string;
  description: string;
  icon: string; // lucide-react icon name
}

export const promptCategories: PromptCategory[] = [
  { slug: "writing", name: "Writing", description: "Drafting, editing and polishing any piece of text.", icon: "PenLine" },
  { slug: "business", name: "Business", description: "Emails, proposals and everyday business communication.", icon: "Briefcase" },
  { slug: "coding", name: "Coding", description: "Explaining, debugging and documenting code.", icon: "Code2" },
  { slug: "marketing", name: "Marketing", description: "Ad copy, social captions and campaign ideas.", icon: "Megaphone" },
  { slug: "career", name: "Career", description: "Resumes, cover letters and interview preparation.", icon: "FileUser" },
  { slug: "productivity", name: "Productivity", description: "Planning, summarizing and organizing your work.", icon: "ClipboardList" },
  { slug: "social-media", name: "Social Media", description: "Captions, hooks and content ideas for social platforms.", icon: "Share2" },
  { slug: "education", name: "Education", description: "Learning, explaining and studying any topic.", icon: "GraduationCap" },
];

export interface PromptTemplate {
  slug: string;
  title: string;
  category: string; // PromptCategory slug
  description: string; // when/why to use this prompt
  prompt: string; // ready-to-use text with [bracketed] placeholders
  tags: string[];
  relatedTools?: string[]; // TechToolsCenter tool slugs this pairs well with
}

/**
 * Curated, original prompt library — every prompt here is written for this
 * site, not copied from anywhere. Each one is a genuinely useful starting
 * point for a real task, with [bracketed] placeholders to fill in — not
 * generic filler. Pair with any chatbot on /ai-hub/chatbots.
 */
export const prompts: PromptTemplate[] = [
  // Writing
  {
    slug: "tighten-paragraph",
    title: "Tighten a wordy paragraph",
    category: "writing",
    description: "Cuts filler words and redundant phrasing without losing meaning — useful before sending anything important.",
    prompt: "Rewrite the following paragraph to be about 30% shorter, keeping the same meaning and tone. Cut filler words and redundant phrases, but don't remove any actual information:\n\n[paste your paragraph here]",
    tags: ["editing", "clarity"],
    relatedTools: ["word-counter"],
  },
  {
    slug: "match-my-tone",
    title: "Match my existing writing tone",
    category: "writing",
    description: "Keeps a new piece of writing consistent with something you already wrote, instead of sounding generically \"AI.\"",
    prompt: "Here is a sample of my writing style:\n\n[paste 1-2 paragraphs you've written]\n\nUsing that same tone and vocabulary level, write [describe what you need — e.g. \"a 200-word LinkedIn post about X\"].",
    tags: ["tone", "voice"],
  },
  {
    slug: "explain-simpler",
    title: "Explain this more simply",
    category: "writing",
    description: "Turns dense or jargon-heavy text into something a general audience can actually follow.",
    prompt: "Rewrite the following so a smart 12-year-old could understand it, without dumbing down the actual facts. Keep it under [X] words:\n\n[paste the text]",
    tags: ["simplify", "clarity"],
  },
  {
    slug: "outline-before-draft",
    title: "Outline before you draft",
    category: "writing",
    description: "Forces a structure decision before you write, so the first draft doesn't wander.",
    prompt: "I'm writing about [topic] for [audience]. Before I draft, give me a 5-7 point outline covering the most important angles, in the order they should appear.",
    tags: ["outline", "structure"],
    relatedTools: ["blog-outline-generator"],
  },

  // Business
  {
    slug: "polite-follow-up-email",
    title: "Polite follow-up on an unanswered email",
    category: "business",
    description: "For chasing a reply without sounding pushy or passive-aggressive.",
    prompt: "Write a short, polite follow-up email referencing my message from [date] about [topic]. Keep it under 80 words, friendly but direct, and end with a clear, easy next step.",
    tags: ["email", "follow-up"],
  },
  {
    slug: "decline-request-professionally",
    title: "Decline a request professionally",
    category: "business",
    description: "For saying no to a client, vendor or colleague without burning the relationship.",
    prompt: "Write a short, professional email declining [request], without over-explaining or sounding defensive. Keep the door open for future collaboration if appropriate.",
    tags: ["email", "negotiation"],
  },
  {
    slug: "summarize-meeting-notes",
    title: "Turn messy notes into a clean summary",
    category: "business",
    description: "Converts raw meeting notes into decisions, owners and next steps — the format people actually read.",
    prompt: "Turn these raw meeting notes into a clean summary with three sections: Decisions Made, Action Items (with owner if mentioned), and Open Questions:\n\n[paste your notes]",
    tags: ["meetings", "summary"],
  },
  {
    slug: "price-negotiation-email",
    title: "Respond to a price objection",
    category: "business",
    description: "For replying to a client who pushed back on your quote, without immediately dropping the price.",
    prompt: "A client said my price of [amount] for [service] is too high. Write a response that reaffirms the value without being defensive, and offers one reasonable alternative (e.g. reduced scope) if it fits.",
    tags: ["sales", "negotiation"],
    relatedTools: ["quotation-generator", "invoice-maker"],
  },

  // Coding
  {
    slug: "explain-this-code",
    title: "Explain what this code actually does",
    category: "coding",
    description: "For understanding unfamiliar code — yours from months ago, or someone else's — line by line where it matters.",
    prompt: "Explain what this code does, step by step, focusing on the parts that aren't obvious from variable names alone. Point out any edge cases it handles or misses:\n\n[paste code]",
    tags: ["debugging", "learning"],
  },
  {
    slug: "find-the-bug",
    title: "Find the bug I'm missing",
    category: "coding",
    description: "For when something is silently wrong and you've stared at it too long to see it.",
    prompt: "This code should [expected behavior] but instead [actual behavior]. Walk through the logic and identify where it diverges from what I expect:\n\n[paste code]",
    tags: ["debugging"],
  },
  {
    slug: "write-unit-tests",
    title: "Write test cases for this function",
    category: "coding",
    description: "For getting a starting set of test cases, including edge cases you might not think of first.",
    prompt: "Write test cases for this function, covering normal input, edge cases (empty, null, boundary values) and at least one case that should throw an error:\n\n[paste function]",
    tags: ["testing"],
  },
  {
    slug: "code-review-feedback",
    title: "Review this code like a senior engineer",
    category: "coding",
    description: "For a second opinion before opening a pull request.",
    prompt: "Review this code as if you were a senior engineer doing a PR review. Flag anything risky, unclear, or that could be simplified — but don't nitpick pure style preferences:\n\n[paste code]",
    tags: ["code review"],
  },

  // Marketing
  {
    slug: "product-launch-announcement",
    title: "Write a product launch announcement",
    category: "marketing",
    description: "A first draft for announcing something new, in whichever format you need.",
    prompt: "Write a product launch announcement for [product/feature]. Target audience: [who]. Key benefit: [main benefit]. Tone: [professional/casual/excited]. Format: [email/social post/blog intro]. Keep it under [X] words.",
    tags: ["launch", "announcement"],
    relatedTools: ["prompt-generator"],
  },
  {
    slug: "ad-copy-variations",
    title: "Generate ad copy variations to A/B test",
    category: "marketing",
    description: "For getting several genuinely different angles instead of five versions of the same sentence.",
    prompt: "Write 5 short ad headlines (under 10 words each) for [product], each using a different angle: urgency, curiosity, social proof, a direct benefit, and a question.",
    tags: ["ads", "copywriting"],
  },
  {
    slug: "email-subject-lines",
    title: "Generate email subject lines that won't get ignored",
    category: "marketing",
    description: "For getting past the inbox skim — variations worth testing, not just synonyms of one idea.",
    prompt: "Write 8 email subject lines for an email about [topic], mixing styles: direct/benefit-led, curiosity-driven, and personalized. Keep each under 50 characters.",
    tags: ["email marketing"],
  },

  // Career
  {
    slug: "rewrite-resume-bullet",
    title: "Turn a task into an achievement-focused bullet",
    category: "career",
    description: "Rewrites a task-description resume line into one that shows measurable impact.",
    prompt: "Rewrite this resume bullet point to lead with impact and include a metric if one is implied. Keep it to one line:\n\n[paste your current bullet point, e.g. \"Responsible for managing social media accounts\"]",
    tags: ["resume"],
    relatedTools: ["resume-builder"],
  },
  {
    slug: "tailor-resume-to-job",
    title: "Check my resume against a job description",
    category: "career",
    description: "Flags genuine keyword and skill gaps between your resume and a specific job posting — an honest check, not a rewrite that invents experience.",
    prompt: "Compare my resume summary and skills against this job description. List which required skills I'm clearly missing evidence for, and which ones I have but haven't mentioned:\n\nResume summary: [paste]\nJob description: [paste]",
    tags: ["resume", "job search"],
    relatedTools: ["resume-builder"],
  },
  {
    slug: "prepare-interview-answer",
    title: "Prepare a STAR-format interview answer",
    category: "career",
    description: "Structures a real work story into the Situation-Task-Action-Result format interviewers expect.",
    prompt: "Help me structure this into a STAR-format interview answer (Situation, Task, Action, Result). Keep it tight enough to say out loud in under 90 seconds:\n\n[describe the work situation in your own words]",
    tags: ["interview prep"],
  },
  {
    slug: "cold-outreach-message",
    title: "Write a cold outreach message that isn't generic",
    category: "career",
    description: "For reaching out to someone you admire professionally, without sounding like a template.",
    prompt: "Write a short LinkedIn connection message to [role/person] referencing [something specific about their work]. Keep it under 40 words, no generic flattery.",
    tags: ["networking"],
  },

  // Productivity
  {
    slug: "break-down-big-task",
    title: "Break a vague task into concrete steps",
    category: "productivity",
    description: "For turning an overwhelming, vague to-do into a sequence you can actually start.",
    prompt: "I need to [describe the task, e.g. \"launch a small online store\"]. Break this into a concrete, ordered checklist of steps, grouping related ones together.",
    tags: ["planning"],
  },
  {
    slug: "prioritize-todo-list",
    title: "Prioritize a messy to-do list",
    category: "productivity",
    description: "Applies urgency/importance thinking to a raw list instead of tackling it top to bottom.",
    prompt: "Here's my to-do list. Sort it into Do Now, Schedule, and Consider Dropping, based on urgency and impact:\n\n[paste your list]",
    tags: ["prioritization"],
  },
  {
    slug: "summarize-long-article",
    title: "Summarize a long article in 3 bullet points",
    category: "productivity",
    description: "For deciding whether something is worth reading in full, or extracting the core point fast.",
    prompt: "Summarize this in exactly 3 bullet points, capturing the core argument, not just the topic:\n\n[paste article text]",
    tags: ["summarization"],
  },

  // Social Media
  {
    slug: "instagram-caption-hooks",
    title: "Write Instagram caption hooks that stop the scroll",
    category: "social-media",
    description: "First-line hooks specifically, since that's what determines whether someone reads the rest.",
    prompt: "Write 5 opening lines (hooks) for an Instagram caption about [topic], each using a different technique: a bold claim, a question, a relatable problem, a number/stat, and a mini-story opener.",
    tags: ["instagram", "captions"],
    relatedTools: ["hashtag-generator"],
  },
  {
    slug: "repurpose-blog-to-social",
    title: "Turn a blog post into 3 social posts",
    category: "social-media",
    description: "For getting more mileage out of content you've already written, adapted per platform rather than copy-pasted.",
    prompt: "Turn this blog post into: (1) a LinkedIn post under 150 words, (2) a Twitter/X thread of 4-5 short posts, (3) an Instagram caption under 100 words. Adapt the tone for each platform:\n\n[paste blog post or summary]",
    tags: ["repurposing"],
  },

  // Education
  {
    slug: "explain-like-im-new",
    title: "Explain a topic assuming zero background",
    category: "education",
    description: "For genuinely learning something from scratch, with a check on what you'd need to know next.",
    prompt: "Explain [topic] assuming I know nothing about it. Use a real-world analogy if it helps, and end by telling me the 2-3 things I'd need to learn next to go deeper.",
    tags: ["learning"],
  },
  {
    slug: "quiz-me-on-topic",
    title: "Quiz me to check real understanding",
    category: "education",
    description: "Active recall instead of just re-reading notes — the actual evidence-backed way to retain material.",
    prompt: "Ask me 5 questions about [topic], one at a time, waiting for my answer before the next. After each answer, tell me if I'm right and correct any misunderstanding.",
    tags: ["study", "active recall"],
  },
  {
    slug: "compare-two-concepts",
    title: "Compare two concepts I keep mixing up",
    category: "education",
    description: "For the pairs of ideas that sound similar but aren't — nails the actual distinction, not just definitions side by side.",
    prompt: "I keep confusing [concept A] and [concept B]. Explain the core difference in one sentence, then give one example that would only make sense for each.",
    tags: ["clarity", "study"],
  },
];

export function getPromptCategory(slug: string): PromptCategory | undefined {
  return promptCategories.find((c) => c.slug === slug);
}
export function getPrompt(slug: string): PromptTemplate | undefined {
  return prompts.find((p) => p.slug === slug);
}
export function promptsByCategory(category: string): PromptTemplate[] {
  return prompts.filter((p) => p.category === category);
}
