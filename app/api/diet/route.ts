import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api";
import { generateMealPlan } from "@/lib/generators";
import { prisma } from "@/lib/prisma";
import { dietSchema } from "@/lib/validation";

export async function GET() {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const plans = await prisma.dietPlan.findMany({ where: { userId: auth.userId }, orderBy: { createdAt: "desc" }, take: 20 });
  return NextResponse.json(plans);
}

export async function POST(request: Request) {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const parsed = dietSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const plan = generateMealPlan(parsed.data.goal, parsed.data.weight);
  const saved = await prisma.dietPlan.create({
    data: {
      userId: auth.userId,
      mealPlan: plan,
      calories: plan.calories,
      protein: plan.protein,
      carbs: plan.carbs,
      fats: plan.fats
    }
  });
  return NextResponse.json(saved, { status: 201 });
}
