"use client";

import { useMemo, useState } from "react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type SType = "Organization" | "Website" | "Article" | "Product" | "LocalBusiness" | "FAQPage" | "HowTo" | "BreadcrumbList";

// Google's structured-data guidelines treat an empty-string property as
// invalid/misleading rather than "not provided" — omit it entirely instead
// of shipping `"logo": ""` in the JSON-LD.
function pruneEmpty<T>(obj: T): T {
  if (Array.isArray(obj)) return obj.map(pruneEmpty).filter((v) => v !== undefined) as unknown as T;
  if (obj && typeof obj === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      if (v === "" || v === null || v === undefined) continue;
      const pruned = pruneEmpty(v);
      if (pruned && typeof pruned === "object" && !Array.isArray(pruned) && Object.keys(pruned).length === 0) continue;
      out[k] = pruned;
    }
    return out as T;
  }
  return obj;
}

export default function SchemaGenerator() {
  const [type, setType] = useState<SType>("Organization");
  const [f, setF] = useState<Record<string, string>>({ name: "TechToolsCenter", url: "https://techtoolscenter.com" });
  const [faqs, setFaqs] = useState([{ q: "", a: "" }, { q: "", a: "" }]);
  const [steps, setSteps] = useState([{ text: "" }, { text: "" }]);
  const [crumbs, setCrumbs] = useState([{ name: "Home", url: "https://example.com" }, { name: "Category", url: "https://example.com/category" }]);
  const { copied, copy } = useCopy();
  const g = (k: string) => f[k] ?? "";
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  const LIST_TYPES = ["FAQPage", "HowTo", "BreadcrumbList"] as const;
  const FIELDS: Record<Exclude<SType, (typeof LIST_TYPES)[number]>, { key: string; label: string }[]> = {
    Organization: [{ key: "name", label: "Name" }, { key: "url", label: "URL" }, { key: "logo", label: "Logo URL" }],
    Website: [{ key: "name", label: "Name" }, { key: "url", label: "URL" }],
    Article: [{ key: "headline", label: "Headline" }, { key: "author", label: "Author" }, { key: "datePublished", label: "Date published" }, { key: "image", label: "Image URL" }],
    Product: [{ key: "name", label: "Name" }, { key: "image", label: "Image URL" }, { key: "price", label: "Price" }, { key: "currency", label: "Currency" }],
    LocalBusiness: [{ key: "name", label: "Name" }, { key: "phone", label: "Phone" }, { key: "address", label: "Address" }, { key: "url", label: "URL" }],
  };
  const HOWTO_FIELDS = [{ key: "howtoName", label: "Title" }, { key: "howtoDescription", label: "Short description" }];

  const json = useMemo(() => {
    let obj: Record<string, unknown> = { "@context": "https://schema.org", "@type": type };
    if (type === "Organization") obj = { ...obj, name: g("name"), url: g("url"), logo: g("logo") };
    else if (type === "Website") obj = { ...obj, name: g("name"), url: g("url") };
    else if (type === "Article") obj = { ...obj, headline: g("headline"), author: { "@type": "Person", name: g("author") }, datePublished: g("datePublished"), image: g("image") };
    else if (type === "Product") obj = { ...obj, name: g("name"), image: g("image"), offers: { "@type": "Offer", price: g("price"), priceCurrency: g("currency") || "USD" } };
    else if (type === "LocalBusiness") obj = { ...obj, name: g("name"), telephone: g("phone"), address: g("address"), url: g("url") };
    else if (type === "FAQPage") obj = { ...obj, mainEntity: faqs
      .filter((item) => item.q.trim() || item.a.trim())
      .map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
    else if (type === "HowTo") obj = { ...obj,
      name: g("howtoName"),
      description: g("howtoDescription"),
      step: steps
        .filter((item) => item.text.trim())
        .map((item, i) => ({ "@type": "HowToStep", position: i + 1, text: item.text })),
    };
    else if (type === "BreadcrumbList") obj = { ...obj, itemListElement: crumbs
      .filter((c) => c.name.trim() || c.url.trim())
      .map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.url })) };
    return `<script type="application/ld+json">\n${JSON.stringify(pruneEmpty(obj), null, 2)}\n</script>`;
  }, [type, f, faqs, steps, crumbs]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Schema type</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5"><Label htmlFor="schema-type">Type</Label>
            <Select id="schema-type" value={type} onChange={(e) => setType(e.target.value as SType)}>
              {[...Object.keys(FIELDS), ...LIST_TYPES].map((t) => <option key={t}>{t}</option>)}
            </Select>
          </div>
          {type === "FAQPage" ? (
            <div className="space-y-3">
              {faqs.map((item, i) => (
                <div key={i} className="space-y-2 rounded-xl border border-border p-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`schema-faq-q-${i}`}>Question {i + 1}</Label>
                    {faqs.length > 1 && (
                      <button type="button" className="text-xs text-muted-foreground hover:text-destructive" onClick={() => setFaqs((prev) => prev.filter((_, idx) => idx !== i))}>Remove</button>
                    )}
                  </div>
                  <Input id={`schema-faq-q-${i}`} value={item.q} onChange={(e) => setFaqs((prev) => prev.map((x, idx) => (idx === i ? { ...x, q: e.target.value } : x)))} placeholder="Question" />
                  <Input value={item.a} onChange={(e) => setFaqs((prev) => prev.map((x, idx) => (idx === i ? { ...x, a: e.target.value } : x)))} placeholder="Answer" />
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => setFaqs((prev) => [...prev, { q: "", a: "" }])}>+ Add question</Button>
            </div>
          ) : type === "HowTo" ? (
            <div className="space-y-4">
              {HOWTO_FIELDS.map((field) => (
                <div key={field.key} className="space-y-1.5"><Label htmlFor={`schema-field-${field.key}`}>{field.label}</Label><Input id={`schema-field-${field.key}`} value={g(field.key)} onChange={(e) => set(field.key, e.target.value)} /></div>
              ))}
              <div className="space-y-3">
                {steps.map((item, i) => (
                  <div key={i} className="space-y-2 rounded-xl border border-border p-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`schema-step-${i}`}>Step {i + 1}</Label>
                      {steps.length > 1 && (
                        <button type="button" className="text-xs text-muted-foreground hover:text-destructive" onClick={() => setSteps((prev) => prev.filter((_, idx) => idx !== i))}>Remove</button>
                      )}
                    </div>
                    <Input id={`schema-step-${i}`} value={item.text} onChange={(e) => setSteps((prev) => prev.map((x, idx) => (idx === i ? { text: e.target.value } : x)))} placeholder="What to do in this step" />
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => setSteps((prev) => [...prev, { text: "" }])}>+ Add step</Button>
              </div>
            </div>
          ) : type === "BreadcrumbList" ? (
            <div className="space-y-3">
              {crumbs.map((item, i) => (
                <div key={i} className="space-y-2 rounded-xl border border-border p-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`schema-crumb-name-${i}`}>Crumb {i + 1}</Label>
                    {crumbs.length > 1 && (
                      <button type="button" className="text-xs text-muted-foreground hover:text-destructive" onClick={() => setCrumbs((prev) => prev.filter((_, idx) => idx !== i))}>Remove</button>
                    )}
                  </div>
                  <Input id={`schema-crumb-name-${i}`} value={item.name} onChange={(e) => setCrumbs((prev) => prev.map((x, idx) => (idx === i ? { ...x, name: e.target.value } : x)))} placeholder="Page name" />
                  <Input value={item.url} onChange={(e) => setCrumbs((prev) => prev.map((x, idx) => (idx === i ? { ...x, url: e.target.value } : x)))} placeholder="Page URL" />
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => setCrumbs((prev) => [...prev, { name: "", url: "" }])}>+ Add crumb</Button>
            </div>
          ) : (
            FIELDS[type].map((field) => (
              <div key={field.key} className="space-y-1.5"><Label htmlFor={`schema-field-${field.key}`}>{field.label}</Label><Input id={`schema-field-${field.key}`} value={g(field.key)} onChange={(e) => set(field.key, e.target.value)} /></div>
            ))
          )}
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader><CardTitle>JSON-LD</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap rounded-xl bg-secondary/50 p-4 text-xs leading-relaxed">{json}</pre>
          <Button onClick={() => copy(json)}>{copied ? "Copied!" : "Copy JSON-LD"}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
