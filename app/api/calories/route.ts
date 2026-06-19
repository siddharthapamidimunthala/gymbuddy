import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { daysAgo, startOfDay } from "@/lib/utils";
import { calorieSchema } from "@/lib/validation";

export async function GET() {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const logs = await prisma.calorieLog.findMany({ where: { userId: auth.userId }, orderBy: { date: "desc" }, take: 60 });
  const today = logs.filter((log) => log.date >= startOfDay()).reduce((sum, log) => sum + log.calories, 0);
  const weekly = logs.filter((log) => log.date >= daysAgo(7)).reduce((sum, log) => sum + log.calories, 0);
  const monthly = logs.filter((log) => log.date >= daysAgo(30)).reduce((sum, log) => sum + log.calories, 0);
  return NextResponse.json({ logs, totals: { today, weekly, monthly } });
}

export async function POST(request: Request) {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const parsed = calorieSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const log = await prisma.calorieLog.create({ data: { userId: auth.userId, ...parsed.data } });
  return NextResponse.json(log, { status: 201 });
}
