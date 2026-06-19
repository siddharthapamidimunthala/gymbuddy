import Link from "next/link";
import { getServerSession } from "next-auth";
import { Bot, Calculator, Dumbbell, Salad, Utensils, type LucideIcon } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { CaloriesChart, WeightChart, WorkoutChart } from "@/components/charts";
import { Card, StatCard } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { calculateBmi, daysAgo } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? "";
  const [user, bmiHistory, calorieLogs, workouts] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.bMIHistory.findMany({ where: { userId }, orderBy: { date: "asc" }, take: 10 }),
    prisma.calorieLog.findMany({ where: { userId, date: { gte: daysAgo(30) } }, orderBy: { date: "asc" } }),
    prisma.workout.findMany({ where: { userId, date: { gte: daysAgo(30) } }, orderBy: { date: "asc" } })
  ]);

  const bmi = user?.height && user?.weight ? calculateBmi(user.height, user.weight) : null;
  const calories = calorieLogs.reduce((sum, log) => sum + log.calories, 0);
  const completed = workouts.filter((workout) => workout.completed).length;
  const streak = Math.min(workouts.length, 14);
  const chartDays = Array.from({ length: 7 }, (_, i) => {
    const date = daysAgo(6 - i);
    const label = date.toLocaleDateString("en", { weekday: "short" });
    return {
      label,
      calories: calorieLogs.filter((log) => log.date.toDateString() === date.toDateString()).reduce((s, log) => s + log.calories, 0),
      workouts: workouts.filter((workout) => workout.date.toDateString() === date.toDateString()).length
    };
  });
  const weightData = bmiHistory.map((item) => ({ label: item.date.toLocaleDateString("en", { month: "short", day: "numeric" }), weight: item.weight }));

  const quickActions: { href: string; label: string; icon: LucideIcon }[] = [
    { href: "/workouts", label: "Add Workout", icon: Dumbbell },
    { href: "/diet", label: "Generate Diet", icon: Salad },
    { href: "/workouts", label: "Generate Workout", icon: Dumbbell },
    { href: "/chat", label: "Open Chatbot", icon: Bot },
    { href: "/bmi", label: "BMI Calculator", icon: Calculator },
    { href: "/calories", label: "Calorie Counter", icon: Utensils }
  ];

  return (
    <AppShell title={`Welcome${user?.name ? `, ${user.name}` : ""}`} subtitle="Your training command center for metrics, calories, workouts, diets, and AI coaching.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Current Weight" value={`${user?.weight ?? "--"} kg`} detail="Updated from BMI logs" />
        <StatCard label="BMI" value={bmi ? `${bmi.bmi}` : "--"} detail={bmi?.category ?? "Add height and weight"} />
        <StatCard label="Calories" value={`${calories}`} detail="Last 30 days consumed" />
        <StatCard label="Workout Streak" value={`${streak} days`} detail={`${completed} completed workouts`} />
      </div>
      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-1"><h2 className="mb-4 font-black">Weight Progress</h2><WeightChart data={weightData.length ? weightData : [{ label: "Start", weight: user?.weight ?? 75 }]} /></Card>
        <Card><h2 className="mb-4 font-black">Calories Burned</h2><CaloriesChart data={chartDays} /></Card>
        <Card><h2 className="mb-4 font-black">Workout Frequency</h2><WorkoutChart data={chartDays} /></Card>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {quickActions.map(({ href, label, icon: Icon }) => (
          <Link key={label} href={href} className="glass flex items-center gap-3 rounded-lg p-4 text-sm font-bold transition hover:bg-white/10">
            <Icon className="h-5 w-5 text-gym-red" /> {label}
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
