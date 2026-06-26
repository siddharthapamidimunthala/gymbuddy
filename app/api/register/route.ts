import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validation";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid signup request." }, { status: 400 });
  }

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Please check your signup details." }, { status: 400 });

  const { password: plainPassword, ...profile } = parsed.data;
  const password = await bcrypt.hash(plainPassword, 12);

  try {
    const existing = await prisma.user.findUnique({ where: { email: profile.email } });
    if (existing) return NextResponse.json({ error: "Email already registered" }, { status: 409 });

    const user = await prisma.user.create({
      data: { ...profile, password },
      select: { id: true, email: true, name: true }
    });

    return NextResponse.json(user, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Could not save account. Check the database connection." }, { status: 503 });
  }
}
