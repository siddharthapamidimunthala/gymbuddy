import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resetPasswordSchema } from "@/lib/validation";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid password reset request." }, { status: 400 });
  }

  const parsed = resetPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email and a password with at least 8 characters." }, { status: 400 });
  }

  const password = await bcrypt.hash(parsed.data.password, 12);

  try {
    const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    if (!user) {
      return NextResponse.json({ error: "No account found for that email." }, { status: 404 });
    }

    await prisma.user.update({
      where: { email: parsed.data.email },
      data: { password }
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not reset password. Check the database connection." }, { status: 503 });
  }
}
