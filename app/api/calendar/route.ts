import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function demoMonth() {
  return Array.from({ length: 31 }, (_, index) => ({
    day: index + 1,
    count: [1, 3, 5, 8, 10, 13, 15, 18, 22, 25, 28].includes(index + 1) ? 1 : 0,
    completed: [1, 3, 5, 8, 10, 13, 18, 22].includes(index + 1)
  }));
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ month: demoMonth() });

  const workouts = await prisma.workout.findMany({
    where: { userId: session.user.id },
    orderBy: { date: "desc" },
    take: 31
  });
  const month = Array.from({ length: 31 }, (_, index) => {
    const dayWorkouts = workouts.filter((workout) => workout.date.getDate() === index + 1);
    return { day: index + 1, count: dayWorkouts.length, completed: dayWorkouts.some((workout) => workout.completed) };
  });
  return NextResponse.json({ month });
}
