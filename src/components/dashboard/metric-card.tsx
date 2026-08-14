import { Card, CardContent } from "@/components/ui/card";
import { Icon, type IconName } from "@/components/icon";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "good" | "warning" | "bad";

const TONE_CLASSES: Record<Tone, string> = {
  neutral: "text-foreground",
  good: "text-emerald-600 dark:text-emerald-400",
  warning: "text-amber-600 dark:text-amber-400",
  bad: "text-red-600 dark:text-red-400",
};

export function MetricCard({
  label,
  value,
  icon,
  tone = "neutral",
  hint,
}: {
  label: string;
  value: string | number;
  icon?: IconName;
  tone?: Tone;
  hint?: string;
}) {
  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-3 p-4">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
          <p
            className={cn(
              "mt-1 font-bold tabular-nums",
              typeof value === "number" || /^\d/.test(String(value)) ? "text-2xl" : "text-base leading-snug",
              TONE_CLASSES[tone],
            )}
          >
            {value}
          </p>
          {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
        </div>
        {icon && (
          <span className={cn("grid size-9 shrink-0 place-items-center rounded-xl bg-accent", TONE_CLASSES[tone])}>
            <Icon name={icon} className="size-4" />
          </span>
        )}
      </CardContent>
    </Card>
  );
}

/** Zero is good (green), small counts are a warning (amber), large counts are bad (red). */
export function toneForIssueCount(count: number, badAt = 5): Tone {
  if (count <= 0) return "good";
  if (count < badAt) return "warning";
  return "bad";
}
