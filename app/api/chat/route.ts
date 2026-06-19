import OpenAI from "openai";
import { NextResponse } from "next/server";
import { rateLimit, requireUser } from "@/lib/api";
import { localCoachReply } from "@/lib/generators";
import { prisma } from "@/lib/prisma";
import { chatSchema } from "@/lib/validation";

export async function GET() {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const history = await prisma.chatHistory.findMany({ where: { userId: auth.userId }, orderBy: { date: "asc" }, take: 40 });
  return NextResponse.json(history);
}

export async function POST(request: Request) {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const limited = rateLimit(`chat:${auth.userId}`, 20);
  if (limited) return limited;
  const parsed = chatSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  let response = localCoachReply(parsed.data.message);
  if (process.env.OPENAI_API_KEY) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "You are GymBuddy, a concise, safe, motivational fitness coach. Avoid medical diagnosis and recommend professionals for injuries or medical conditions." },
        { role: "user", content: parsed.data.message }
      ]
    });
    response = completion.choices[0]?.message.content ?? response;
  }

  const saved = await prisma.chatHistory.create({
    data: { userId: auth.userId, message: parsed.data.message, response }
  });
  return NextResponse.json(saved, { status: 201 });
}
