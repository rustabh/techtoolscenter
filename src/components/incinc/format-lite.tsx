import { Fragment } from "react";

/** Renders **bold**, `inline code`, ```code fences``` and line breaks — no markdown dependency needed for this small subset. */
export function FormatLite({ text }: { text: string }) {
  const blocks = text.split(/```([\s\S]*?)```/g);

  return (
    <>
      {blocks.map((block, i) => {
        if (i % 2 === 1) {
          return (
            <pre key={i} className="my-2 overflow-x-auto rounded-lg bg-secondary/70 p-3 text-xs">
              <code>{block.trim()}</code>
            </pre>
          );
        }
        return (
          <Fragment key={i}>
            {block.split("\n").map((line, j) => (
              <span key={j} className="block">
                {renderInline(line)}
              </span>
            ))}
          </Fragment>
        );
      })}
    </>
  );
}

function renderInline(line: string) {
  const parts = line.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="rounded bg-secondary/70 px-1 py-0.5 text-[0.85em]">
          {part.slice(1, -1)}
        </code>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
