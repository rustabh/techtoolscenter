import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "TechToolsCenter privacy policy. All tools run client-side and your data never leaves your browser.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="container-tight max-w-3xl py-12">
      <Breadcrumbs items={[{ label: "Privacy" }]} />
      <h1 className="mt-6 text-4xl font-bold tracking-tight">Privacy Policy</h1>
      <div className="mt-6 space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">Client-side by design</h2>
          <p className="mt-2">
            Every TechToolsCenter tool processes your data entirely within your browser. Documents, images and text you
            enter are never uploaded to or stored on any server we control.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">Local storage</h2>
          <p className="mt-2">
            To let you resume your work, some tools save your most recent input to your browser&apos;s local storage.
            This data stays on your device and can be cleared at any time by resetting the tool or clearing your
            browser data.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">Advertising</h2>
          <p className="mt-2">
            TechToolsCenter may display advertisements. Ad partners such as Google AdSense may use cookies to serve relevant
            ads in accordance with their own privacy policies.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">Contact</h2>
          <p className="mt-2">Questions about privacy? Reach out through the details on our About page.</p>
        </section>
      </div>
    </div>
  );
}
