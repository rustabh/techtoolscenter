// Modular AI Studio contract.
// Each generator declares a form schema, an offline `local()` implementation
// (rule/template based, runs entirely in the browser) and a `toPrompt()`
// builder that produces the prompt a real LLM provider would receive once one
// is plugged in. Swapping in a hosted model means implementing AIProvider.run
// to call `generator.toPrompt(inputs)` instead of `generator.local(inputs)`.

export type FieldType = "text" | "textarea" | "select";

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  placeholder?: string;
  default?: string;
}

export type Inputs = Record<string, string>;

export interface Generator {
  id: string;
  name: string;
  description: string;
  icon: string; // lucide-react icon name
  output: "text" | "code";
  fields: Field[];
  /** Offline, deterministic output — no network. */
  local: (inputs: Inputs) => string;
  /** Prompt a hosted LLM would receive (used once a provider is connected). */
  toPrompt: (inputs: Inputs) => string;
}

export interface AIProvider {
  id: string;
  label: string;
  /** Whether the provider can be selected right now. */
  available: boolean;
  /** Produce output for a generator + inputs. */
  run: (generator: Generator, inputs: Inputs) => Promise<string>;
}
