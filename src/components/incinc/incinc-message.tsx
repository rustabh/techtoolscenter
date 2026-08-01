import Link from "next/link";
import { ArrowRight, Clock, Gauge, ExternalLink } from "lucide-react";
import { FormatLite } from "./format-lite";
import type { AssistantResponse, LinkItem } from "@/lib/incinc/types";
import { cn } from "@/lib/utils";

function LinkTile({ item }: { item: LinkItem }) {
  const content = (
    <>
      <span className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold">{item.label}</span>
        {item.kind === "external" ? (
          <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
        ) : (
          <ArrowRight className="size-3.5 shrink-0 text-muted-foreground" />
        )}
      </span>
      {item.description && <span className="mt-0.5 block text-xs text-muted-foreground">{item.description}</span>}
      {item.meta && <span className="mt-1 inline-block rounded-md bg-secondary/70 px-1.5 py-0.5 text-[10px] text-muted-foreground">{item.meta}</span>}
    </>
  );
  const className = "block rounded-xl border border-border/60 bg-background/60 p-3 transition-colors hover:border-primary/40 hover:bg-secondary/40";

  if (item.kind === "external") {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }
  return (
    <Link href={item.href} className={className}>
      {content}
    </Link>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-3">
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</p>
      {children}
    </div>
  );
}

export function IncincMessage({ response }: { response: AssistantResponse }) {
  return (
    <div className="text-sm leading-relaxed">
      <FormatLite text={response.summary} />

      {response.recommendedTools.length > 0 && (
        <Section title="Recommended">
          <div className="grid gap-2 sm:grid-cols-2">
            {response.recommendedTools.map((item) => <LinkTile key={item.href} item={item} />)}
          </div>
        </Section>
      )}

      {response.workflow && response.workflow.length > 0 && (
        <Section title="Workflow">
          <div className="flex flex-col gap-1.5">
            {response.workflow.map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">{i + 1}</span>
                {step.href ? (
                  step.kind === "external" ? (
                    <a href={step.href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">{step.label}</a>
                  ) : (
                    <Link href={step.href} className="text-sm font-medium text-primary hover:underline">{step.label}</Link>
                  )
                ) : (
                  <span className="text-sm font-medium">{step.label}</span>
                )}
                {step.description && <span className="text-xs text-muted-foreground">— {step.description}</span>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {response.requiredDocuments && response.requiredDocuments.length > 0 && (
        <Section title="Required Documents">
          <ul className="space-y-1 text-sm text-muted-foreground">
            {response.requiredDocuments.map((doc, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="mt-1 size-1 shrink-0 rounded-full bg-primary" />
                {doc}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {response.relatedBlogs.length > 0 && (
        <Section title="Related Reading">
          <div className="grid gap-2 sm:grid-cols-2">
            {response.relatedBlogs.map((item) => <LinkTile key={item.href} item={item} />)}
          </div>
        </Section>
      )}

      {response.officialResources.length > 0 && (
        <Section title="Official Resources">
          <div className="grid gap-2 sm:grid-cols-2">
            {response.officialResources.map((item) => <LinkTile key={item.href} item={item} />)}
          </div>
        </Section>
      )}

      {(response.estimatedTime || response.difficulty) && (
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
          {response.estimatedTime && (
            <span className="inline-flex items-center gap-1"><Clock className="size-3.5" /> {response.estimatedTime}</span>
          )}
          {response.difficulty && (
            <span className="inline-flex items-center gap-1"><Gauge className="size-3.5" /> {response.difficulty}</span>
          )}
        </div>
      )}

      {response.nextStep && (
        <p className="mt-3 rounded-lg bg-primary/5 p-2.5 text-xs text-foreground">
          <span className="font-semibold">Next step: </span>{response.nextStep}
        </p>
      )}

      {response.actions.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {response.actions.map((action) =>
            action.kind === "external" ? (
              <a
                key={action.href}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn("inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90")}
              >
                {action.label} <ExternalLink className="size-3" />
              </a>
            ) : (
              <Link
                key={action.href}
                href={action.href}
                className={cn("inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90")}
              >
                {action.label} <ArrowRight className="size-3" />
              </Link>
            ),
          )}
        </div>
      )}
    </div>
  );
}
