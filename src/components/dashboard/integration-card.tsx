import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { IntegrationStatus } from "@/lib/dashboard/integrations";

/** A "connect this data source" card for Growth Dashboard sections that need
 *  a real external API this environment has no credentials or network for. */
export function IntegrationCard({ status, whatItUnlocks }: { status: IntegrationStatus; whatItUnlocks: string }) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm">{status.name}</CardTitle>
        <Badge variant={status.connected ? "success" : "secondary"}>{status.connected ? "Connected" : "Not connected"}</Badge>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p className="text-muted-foreground">{whatItUnlocks}</p>
        {!status.connected && (
          <div className="rounded-xl border border-dashed border-border p-3">
            <p className="mb-1.5 font-medium">Setup steps</p>
            <ol className="list-inside list-decimal space-y-1 text-muted-foreground">
              {status.setupSteps.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
            <a href={status.docsUrl} className="mt-2 inline-block text-xs font-medium text-primary underline underline-offset-2">
              API docs ↗
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
