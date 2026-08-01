import { NextResponse } from "next/server";
import { getAssistantProvider } from "@/lib/incinc/provider";
import type { ChatTurn } from "@/lib/incinc/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_QUERY_LENGTH = 500;
const MAX_HISTORY_TURNS = 20;

function sanitizeHistory(input: unknown): ChatTurn[] {
  if (!Array.isArray(input)) return [];
  return input
    .filter(
      (t): t is ChatTurn =>
        typeof t === "object" &&
        t !== null &&
        (t.role === "user" || t.role === "assistant") &&
        typeof t.text === "string",
    )
    .slice(-MAX_HISTORY_TURNS);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { query, history } = (body ?? {}) as { query?: unknown; history?: unknown };

  if (typeof query !== "string" || !query.trim()) {
    return NextResponse.json({ error: "A non-empty 'query' string is required" }, { status: 400 });
  }
  if (query.length > MAX_QUERY_LENGTH) {
    return NextResponse.json({ error: `Query too long (max ${MAX_QUERY_LENGTH} characters)` }, { status: 400 });
  }

  const provider = getAssistantProvider();
  const response = await provider.respond(query.trim(), { history: sanitizeHistory(history) });

  return NextResponse.json(response);
}
