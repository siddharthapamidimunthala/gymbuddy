import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { daysAgo } from "@/lib/utils";

const demoWeekly = [
  { label: "Mon", calories: 2100, workouts: 1 },
  { label: "Tue", calories: 1900, workouts: 0 },
  { label: "Wed", calories: 2200, workouts: 1 },
  { label: "Thu", calories: 2050, workouts: 1 },
  { label: "Fri", calories: 2300, workouts: 0 },
  { label: "Sat", calories: 2150, workouts: 1 },
  { label: "Sun", calories: 2000, workouts: 1 }
];

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({
      totals: { weightLogs: 4, calories: 14600, workouts: 5, completed: 4 },
      weight: [
        { label: "Week 1", weight: 82 },
        { label: "Week 2", weight: 81.2 },
        { label: "Week 3", weight: 80.6 },
        { label: "Week 4", weight: 79.8 }
      ],
      weekly: demoWeekly
    });
  }

  const userId = session.user.id;
  const [bmi, calories, workouts] = await Promise.all([
    prisma.bMIHistory.findMany({ where: { userId }, orderBy: { date: "asc" }, take: 30 }),
    prisma.calorieLog.findMany({ where: { userId, date: { gte: daysAgo(365) } }, orderBy: { date: "asc" } }),
    prisma.workout.findMany({ where: { userId, date: { gte: daysAgo(365) } }, orderBy: { date: "asc" } })
  ]);
  const weekly = Array.from({ length: 7 }, (_, i) => {
    const date = daysAgo(6 - i);
    return {
      label: date.toLocaleDateString("en", { weekday: "short" }),
      calories: calories.filter((log) => log.date.toDateString() === date.toDateString()).reduce((sum, log) => sum + log.calories, 0),
      workouts: workouts.filter((workout) => workout.date.toDateString() === date.toDateString()).length
    };
  });

  return NextResponse.json({
    totals: {
      weightLogs: bmi.length,
      calories: calories.reduce((sum, log) => sum + log.calories, 0),
      workouts: workouts.length,
      completed: workouts.filter((workout) => workout.completed).length
    },
    weight: bmi.map((item) => ({ label: item.date.toLocaleDateString("en", { month: "short", day: "numeric" }), weight: item.weight })),
    weekly: weekly.length ? weekly : demoWeekly
  });
}
