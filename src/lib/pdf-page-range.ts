/** Parses a page-range string like "1-3, 5, 8" into a sorted, deduped list of valid page numbers (1-indexed, clamped to [1, max]). */
export function parsePageRange(input: string, max: number): number[] {
  const set = new Set<number>();
  for (const part of input.split(",")) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    if (trimmed.includes("-")) {
      const [a, b] = trimmed.split("-").map((n) => parseInt(n, 10));
      for (let i = a; i <= b; i++) if (i >= 1 && i <= max) set.add(i);
    } else {
      const n = parseInt(trimmed, 10);
      if (n >= 1 && n <= max) set.add(n);
    }
  }
  return [...set].sort((a, b) => a - b);
}
