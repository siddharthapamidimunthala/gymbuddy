import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { calculateBmi } from "@/lib/utils";
import { bmiSchema } from "@/lib/validation";

export async function GET() {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const history = await prisma.bMIHistory.findMany({
    where: { userId: auth.userId },
    orderBy: { date: "desc" },
    take: 20
  });
  return NextResponse.json(history);
}

export async function POST(request: Request) {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const parsed = bmiSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const result = calculateBmi(parsed.data.height, parsed.data.weight);
  const record = await prisma.bMIHistory.create({
    data: {
      userId: auth.userId,
      bmi: result.bmi,
      category: result.category,
      height: parsed.data.height,
      weight: parsed.data.weight
    }
  });
  await prisma.user.update({
    where: { id: auth.userId },
    data: { height: parsed.data.height, weight: parsed.data.weight }
  });
  return NextResponse.json({ ...record, suggestion: result.suggestion });
}
