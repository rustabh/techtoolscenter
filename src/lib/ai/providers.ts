import type { AIProvider } from "./types";

// Built-in offline engine — deterministic, private, no network.
export const localProvider: AIProvider = {
  id: "local",
  label: "Built-in engine (offline)",
  available: true,
  async run(generator, inputs) {
    return generator.local(inputs);
  },
};

// Placeholders for hosted models. They are declared here so the UI can list
// them, but stay `available: false` until an API route is wired up. When that
// happens, swap the body for a fetch to that route passing generator.toPrompt(inputs).
function pending(id: string, label: string): AIProvider {
  return {
    id,
    label,
    available: false,
    async run(generator, inputs) {
      // Falls back to the offline engine until the provider is connected.
      return generator.local(inputs);
    },
  };
}

export const PROVIDERS: AIProvider[] = [
  localProvider,
  pending("openai", "OpenAI · GPT (connect later)"),
  pending("claude", "Claude (connect later)"),
  pending("gemini", "Google Gemini (connect later)"),
];

export function getProvider(id: string): AIProvider {
  return PROVIDERS.find((p) => p.id === id) ?? localProvider;
}
