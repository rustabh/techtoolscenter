"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/tools${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ""}`);
      }}
      className="glass mx-auto flex w-full max-w-xl items-center gap-2 rounded-full p-2 pl-5"
      role="search"
    >
      <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search 17+ tools — invoice, GST, PDF, QR…"
        aria-label="Search tools"
        className="h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
      <Button type="submit" size="sm" className="shrink-0">Search</Button>
    </form>
  );
}
