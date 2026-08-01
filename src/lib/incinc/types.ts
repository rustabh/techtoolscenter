export interface LinkItem {
  label: string;
  href: string;
  kind: "internal" | "external";
  description?: string;
  meta?: string; // e.g. pricing, category
}

export interface WorkflowStep {
  label: string;
  href?: string;
  kind?: "internal" | "external";
  description?: string;
}

export interface SmartAction {
  label: string;
  href: string;
  kind: "internal" | "external";
}

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type IntentType = "knowledge" | "tool" | "government" | "ai-recommendation" | "workflow" | "fallback";

export interface AssistantResponse {
  summary: string;
  intent?: IntentType;
  recommendedTools: LinkItem[];
  workflow?: WorkflowStep[];
  requiredDocuments?: string[];
  relatedBlogs: LinkItem[];
  officialResources: LinkItem[];
  estimatedTime?: string;
  difficulty?: Difficulty;
  nextStep?: string;
  actions: SmartAction[];
}

export interface ChatTurn {
  role: "user" | "assistant";
  text: string;
}

export interface ChatContext {
  history: ChatTurn[];
}

export interface AssistantProvider {
  name: string;
  respond(query: string, context: ChatContext): Promise<AssistantResponse>;
}
