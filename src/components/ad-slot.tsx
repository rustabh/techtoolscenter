import { cn } from "@/lib/utils";

/**
 * Responsive, layout-safe placeholder for Google AdSense units.
 * Reserves fixed space to avoid CLS. Swap the inner content for a real
 * <ins class="adsbygoogle"> unit when an AdSense account is connected.
 */
export function AdSlot({
  className,
  label = "Advertisement",
  format = "horizontal",
}: {
  className?: string;
  label?: string;
  format?: "horizontal" | "square" | "vertical";
}) {
  const sizes = {
    horizontal: "min-h-[90px] md:min-h-[100px]",
    square: "min-h-[250px]",
    vertical: "min-h-[250px] md:min-h-[600px]",
  } as const;

  return (
    <aside
      aria-label={label}
      className={cn(
        "flex w-full items-center justify-center rounded-2xl border border-dashed border-border bg-muted/40 text-center",
        sizes[format],
        className
      )}
    >
      <span className="select-none text-xs font-medium uppercase tracking-widest text-muted-foreground/70">
        {label}
      </span>
    </aside>
  );
}
