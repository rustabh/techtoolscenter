/** A simple, dependency-free horizontal bar list — no charting library needed. */
export function BarList({
  items,
  valueSuffix = "",
}: {
  items: { label: string; value: number; sub?: string }[];
  valueSuffix?: string;
}) {
  const max = Math.max(1, ...items.map((i) => i.value));
  return (
    <div className="space-y-2.5">
      {items.map((item) => (
        <div key={item.label}>
          <div className="mb-1 flex items-baseline justify-between gap-2 text-sm">
            <span className="truncate font-medium">{item.label}</span>
            <span className="shrink-0 tabular-nums text-muted-foreground">
              {item.value}
              {valueSuffix}
              {item.sub ? <span className="ml-1 text-xs">({item.sub})</span> : null}
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary/70"
              style={{ width: `${Math.max(2, (item.value / max) * 100)}%` }}
            />
          </div>
        </div>
      ))}
      {items.length === 0 && <p className="text-sm text-muted-foreground">No data.</p>}
    </div>
  );
}
