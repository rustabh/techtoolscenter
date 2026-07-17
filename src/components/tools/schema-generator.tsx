"use client";

import { useMemo, useState } from "react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type SType = "Organization" | "Website" | "Article" | "Product" | "LocalBusiness" | "FAQPage";

export default function SchemaGenerator() {
  const [type, setType] = useState<SType>("Organization");
  const [f, setF] = useState<Record<string, string>>({ name: "TechToolsCenter", url: "https://techtoolscenter.com" });
  const { copied, copy } = useCopy();
  const g = (k: string) => f[k] ?? "";
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  const FIELDS: Record<SType, { key: string; label: string }[]> = {
    Organization: [{ key: "name", label: "Name" }, { key: "url", label: "URL" }, { key: "logo", label: "Logo URL" }],
    Website: [{ key: "name", label: "Name" }, { key: "url", label: "URL" }],
    Article: [{ key: "headline", label: "Headline" }, { key: "author", label: "Author" }, { key: "datePublished", label: "Date published" }, { key: "image", label: "Image URL" }],
    Product: [{ key: "name", label: "Name" }, { key: "image", label: "Image URL" }, { key: "price", label: "Price" }, { key: "currency", label: "Currency" }],
    LocalBusiness: [{ key: "name", label: "Name" }, { key: "phone", label: "Phone" }, { key: "address", label: "Address" }, { key: "url", label: "URL" }],
    FAQPage: [{ key: "q1", label: "Question 1" }, { key: "a1", label: "Answer 1" }, { key: "q2", label: "Question 2" }, { key: "a2", label: "Answer 2" }],
  };

  const json = useMemo(() => {
    let obj: Record<string, unknown> = { "@context": "https://schema.org", "@type": type };
    if (type === "Organization") obj = { ...obj, name: g("name"), url: g("url"), logo: g("logo") };
    else if (type === "Website") obj = { ...obj, name: g("name"), url: g("url") };
    else if (type === "Article") obj = { ...obj, headline: g("headline"), author: { "@type": "Person", name: g("author") }, datePublished: g("datePublished"), image: g("image") };
    else if (type === "Product") obj = { ...obj, name: g("name"), image: g("image"), offers: { "@type": "Offer", price: g("price"), priceCurrency: g("currency") || "USD" } };
    else if (type === "LocalBusiness") obj = { ...obj, name: g("name"), telephone: g("phone"), address: g("address"), url: g("url") };
    else if (type === "FAQPage") obj = { ...obj, mainEntity: [
      { "@type": "Question", name: g("q1"), acceptedAnswer: { "@type": "Answer", text: g("a1") } },
      { "@type": "Question", name: g("q2"), acceptedAnswer: { "@type": "Answer", text: g("a2") } },
    ] };
    return `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2)}\n</script>`;
  }, [type, f]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Schema type</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5"><Label>Type</Label>
            <Select value={type} onChange={(e) => setType(e.target.value as SType)}>
              {Object.keys(FIELDS).map((t) => <option key={t}>{t}</option>)}
            </Select>
          </div>
          {FIELDS[type].map((field) => (
            <div key={field.key} className="space-y-1.5"><Label>{field.label}</Label><Input value={g(field.key)} onChange={(e) => set(field.key, e.target.value)} /></div>
          ))}
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
