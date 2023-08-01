import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const res = await fetch("https://api.nostr.watch/v1/online", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const relays = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: relays.error }, { status: 400 });
  }

  return NextResponse.json([relays], { status: 200 });
}
