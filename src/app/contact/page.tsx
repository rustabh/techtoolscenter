import type { Metadata } from "next";
import { Mail, MessageSquare, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactForm } from "@/components/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with the ${siteConfig.name} team. Questions, feedback or suggestions for new tools — we'd love to hear from you.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container-tight max-w-4xl py-12">
      <Breadcrumbs items={[{ label: "Contact" }]} />
      <div className="mt-6">
        <h1 className="text-4xl font-bold tracking-tight">Contact us</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Have a question, found a bug, or want to suggest a new tool? Fill out the form below or email us directly —
          we read every message and usually reply within 1–2 business days.
        </p>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardContent className="pt-6">
            <ContactForm />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <InfoRow icon={Mail} title="Email" value={siteConfig.email} href={`mailto:${siteConfig.email}`} />
          <InfoRow icon={MessageSquare} title="Feedback" value="Suggest a tool or report an issue" />
          <InfoRow icon={Clock} title="Response time" value="Within 1–2 business days" />
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon, title, value, href,
}: {
  icon: typeof Mail; title: string; value: string; href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
        <Icon className="size-5" />
      </span>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href} className="block transition-colors hover:opacity-80">{inner}</a> : inner;
}
