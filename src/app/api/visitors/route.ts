import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// In-memory store: sessionId -> lastSeen timestamp
const visitors = new Map<string, number>();
const HEARTBEAT_TIMEOUT = 45_000; // 45s without heartbeat = gone

function prune() {
  const now = Date.now();
  for (const [id, ts] of visitors) {
    if (now - ts > HEARTBEAT_TIMEOUT) visitors.delete(id);
  }
}

// POST /api/visitors { action: "heartbeat" | "leave", sessionId: string }
export async function POST(request: NextRequest) {
  try {
    let body: Record<string, unknown>;

    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      body = await request.json();
    } else {
      // sendBeacon may send text/plain
      const text = await request.text();
      body = JSON.parse(text);
    }

    const { action, sessionId } = body;

    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json({ error: "sessionId required" }, { status: 400 });
    }

    prune();

    if (action === "leave") {
      visitors.delete(sessionId);
    } else {
      visitors.set(sessionId, Date.now());
    }

    return NextResponse.json({ count: visitors.size });
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
}

// GET /api/visitors -> { count: number }
export async function GET() {
  prune();
  return NextResponse.json({ count: visitors.size });
}
