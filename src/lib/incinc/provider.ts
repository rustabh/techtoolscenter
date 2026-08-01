import type { AssistantProvider, ChatContext, AssistantResponse } from "./types";
import { resolveIntent } from "./intents";

/**
 * The default provider: fast, deterministic, and grounded entirely in
 * TechToolsCenter's own data (no external API calls, nothing invented).
 * This is what answers every request today.
 */
export const localProvider: AssistantProvider = {
  name: "local",
  async respond(query: string, _context: ChatContext): Promise<AssistantResponse> {
    return resolveIntent(query);
  },
};

/**
 * Provider registry — the seam for future LLM integration.
 *
 * To add a real LLM-backed provider (OpenAI, Anthropic, Gemini, a local
 * model, ...), implement `AssistantProvider` in its own file under
 * `providers/`, register it below, and select it with the
 * INCINC_PROVIDER env var. Nothing above this layer (the API route, the
 * chat UI) needs to change.
 */
const providers: Record<string, AssistantProvider> = {
  local: localProvider,
};

export function getAssistantProvider(): AssistantProvider {
  const requested = process.env.INCINC_PROVIDER?.toLowerCase();
  if (requested && providers[requested]) return providers[requested];
  return localProvider;
}
