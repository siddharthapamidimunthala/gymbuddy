import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { daysAgo } from "@/lib/utils";

export async function GET() {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const current = await prisma.user.findUnique({ where: { id: auth.userId } });
  if (current?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const [totalUsers, activeUsers, workoutsLogged, dietPlansGenerated, chatbotUsage] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { OR: [{ workouts: { some: { date: { gte: daysAgo(30) } } } }, { calorieLogs: { some: { date: { gte: daysAgo(30) } } } }] } }),
    prisma.workout.count(),
    prisma.dietPlan.count(),
    prisma.chatHistory.count()
  ]);

  return NextResponse.json({ totalUsers, activeUsers, workoutsLogged, dietPlansGenerated, chatbotUsage });
}
