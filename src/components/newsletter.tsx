"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <div className="glass relative overflow-hidden rounded-3xl p-8 text-center sm:p-12">
      <div className="glow absolute inset-0" aria-hidden />
      <span className="relative mx-auto grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Mail className="size-6" />
      </span>
      <h2 className="relative mt-4 text-2xl font-bold tracking-tight sm:text-3xl">Stay in the loop</h2>
      <p className="relative mx-auto mt-2 max-w-md text-muted-foreground">
        Get notified when we ship new tools. No spam, unsubscribe anytime.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!email) return;
          try {
            localStorage.setItem("ttc:newsletter", email);
          } catch { /* storage unavailable */ }
          setDone(true);
        }}
        className="relative mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          aria-label="Email address"
          disabled={done}
          className="h-11 flex-1 rounded-full border border-input bg-background px-5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
        />
        <Button type="submit" size="lg" disabled={done} className="shrink-0">
          {done ? (<><Check className="size-4" /> Subscribed</>) : "Subscribe"}
        </Button>
      </form>
    </div>
  );
}
