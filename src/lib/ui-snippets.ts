export interface UiSnippet {
  id: string;
  name: string;
  category: string;
  html: string;
  css: string;
}

export const uiSnippetCategories = [
  "Buttons",
  "Toggle Switches",
  "Range Sliders",
  "Cards",
  "Badges & Tags",
  "Avatars",
  "Loaders & Spinners",
  "Alerts & Toasts",
] as const;
