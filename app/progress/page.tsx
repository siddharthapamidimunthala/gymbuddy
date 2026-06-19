"use client";

import { useEffect, useState } from "react";
import { AppNav } from "@/components/nav";
import { CaloriesChart, WeightChart, WorkoutChart } from "@/components/charts";
import { Card, StatCard } from "@/components/ui/card";

type ProgressData = {
  totals: { weightLogs: number; calories: number; workouts: number; completed: number };
  weight: { label: string; weight: number }[];
  weekly: { label: string; calories: number; workouts: number }[];
};

const fallback: ProgressData = {
  totals: { weightLogs: 4, calories: 14600, workouts: 5, completed: 4 },
  weight: [
    { label: "Week 1", weight: 82 },
    { label: "Week 2", weight: 81.2 },
    { label: "Week 3", weight: 80.6 },
    { label: "Week 4", weight: 79.8 }
  ],
  weekly: [
    { label: "Mon", calories: 2100, workouts: 1 },
    { label: "Tue", calories: 1900, workouts: 0 },
    { label: "Wed", calories: 2200, workouts: 1 },
    { label: "Thu", calories: 2050, workouts: 1 },
    { label: "Fri", calories: 2300, workouts: 0 },
    { label: "Sat", calories: 2150, workouts: 1 },
    { label: "Sun", calories: 2000, workouts: 1 }
  ]
};

export default function ProgressPage() {
  const [data, setData] = useState<ProgressData>(fallback);

  useEffect(() => {
    fetch("/api/progress")
      .then((response) => response.json())
      .then((next) => setData(next))
      .catch(() => setData(fallback));
  }, []);

  return (
    <main className="min-h-screen bg-red-radial pb-28 lg:pb-0 lg:pl-72">
      <AppNav />
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-gym-red">GymBuddy</p>
          <h1 className="mt-2 text-3xl font-black sm:text-5xl">Progress Tracker</h1>
          <p className="mt-3 max-w-2xl text-white/65">Weekly, monthly, and yearly trends for body metrics, calories, and completed training.</p>
        </header>
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard label="Weight Logs" value={`${data.totals.weightLogs}`} detail="BMI entries" />
          <StatCard label="Calories" value={`${data.totals.calories}`} detail="Tracked total" />
          <StatCard label="Workouts" value={`${data.totals.workouts}`} detail="Logged total" />
          <StatCard label="Completed" value={`${data.totals.completed}`} detail="Marked complete" />
        </div>
        <div className="mt-6 grid gap-4 xl:grid-cols-3">
          <Card><h2 className="mb-4 font-black">Weight</h2><WeightChart data={data.weight} /></Card>
          <Card><h2 className="mb-4 font-black">Calories</h2><CaloriesChart data={data.weekly} /></Card>
          <Card><h2 className="mb-4 font-black">Workout Frequency</h2><WorkoutChart data={data.weekly} /></Card>
        </div>
      </section>
    </main>
  );
}
