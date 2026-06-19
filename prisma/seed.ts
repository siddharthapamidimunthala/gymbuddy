import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("GymBuddy123!", 12);
  const user = await prisma.user.upsert({
    where: { email: "demo@gymbuddy.app" },
    update: {},
    create: {
      email: "demo@gymbuddy.app",
      name: "Demo Athlete",
      password,
      age: 29,
      gender: "Male",
      height: 178,
      weight: 78,
      goal: "Muscle Gain",
      experienceLevel: "Intermediate",
      workoutTime: 50,
      role: "ADMIN"
    }
  });

  await prisma.bMIHistory.createMany({
    data: [
      { userId: user.id, bmi: 25.2, category: "Overweight", height: 178, weight: 80, date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14) },
      { userId: user.id, bmi: 24.9, category: "Healthy", height: 178, weight: 79, date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7) },
      { userId: user.id, bmi: 24.6, category: "Healthy", height: 178, weight: 78, date: new Date() }
    ],
    skipDuplicates: true
  });

  await prisma.calorieLog.createMany({
    data: [
      { userId: user.id, food: "Chicken rice bowl", quantity: "1 bowl", calories: 640 },
      { userId: user.id, food: "Protein shake", quantity: "1 serving", calories: 180 },
      { userId: user.id, food: "Greek yogurt", quantity: "250g", calories: 220 }
    ]
  });
}

main().finally(async () => prisma.$disconnect());
