import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

const buckets = new Map<string, { count: number; expires: number }>();

export async function requireUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  return { userId: session.user.id, session };
}

export function rateLimit(key: string, limit = 30, windowMs = 60_000) {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.expires < now) {
    buckets.set(key, { count: 1, expires: now + windowMs });
    return null;
  }
  if (bucket.count >= limit) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  bucket.count += 1;
  return null;
}
