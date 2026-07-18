import type { AIProvider } from "./types";

// Built-in engine — deterministic, private, runs entirely in the browser.
// No API key, no network, no per-request cost. This is the only shipped
// provider. (A hosted model like GPT/Claude would require a paid API key and a
// server route that calls it — deliberately not enabled to keep the app free
// and fully client-side. To add one later, implement AIProvider.run to POST
// generator.toPrompt(inputs) to an API route and push it into PROVIDERS.)
export const localProvider: AIProvider = {
  id: "local",
  label: "TechToolsCenter engine",
  available: true,
  async run(generator, inputs) {
    return generator.local(inputs);
  },
};

export const PROVIDERS: AIProvider[] = [localProvider];

export function getProvider(id: string): AIProvider {
  return PROVIDERS.find((p) => p.id === id) ?? localProvider;
}
