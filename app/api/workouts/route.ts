import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api";
import { estimateWorkoutCalories, generateWorkoutPlan } from "@/lib/generators";
import { prisma } from "@/lib/prisma";
import { workoutSchema } from "@/lib/validation";

export async function GET() {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const workouts = await prisma.workout.findMany({ where: { userId: auth.userId }, orderBy: { date: "desc" }, take: 50 });
  return NextResponse.json(workouts);
}

export async function POST(request: Request) {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const parsed = workoutSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const exercises = generateWorkoutPlan(parsed.data);
  const caloriesBurned = estimateWorkoutCalories(parsed.data.workoutTime, parsed.data.goal);
  const workout = await prisma.workout.create({
    data: {
      userId: auth.userId,
      workoutType: parsed.data.workoutType,
      goal: parsed.data.goal,
      exercises,
      caloriesBurned
    }
  });
  return NextResponse.json(workout, { status: 201 });
}
