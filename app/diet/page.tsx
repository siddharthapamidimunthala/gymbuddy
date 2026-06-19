"use client";

import { useEffect, useState } from "react";
import { Salad } from "lucide-react";
import { AppNav } from "@/components/nav";
import { Button } from "@/components/ui/button";
import { Card, StatCard } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import { generateMealPlan } from "@/lib/generators";

type Diet = { id: string; calories: number; protein: number; carbs: number; fats: number; mealPlan: { meals: { meal: string; item: string; calories: number }[] } };

export default function DietPage() {
  const [plans, setPlans] = useState<Diet[]>([]);
  const [status, setStatus] = useState("");
  async function load() {
    const response = await fetch("/api/diet");
    if (response.ok) setPlans(await response.json());
  }
  useEffect(() => { load(); }, []);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = Object.fromEntries(new FormData(event.currentTarget));
    const mealPlan = generateMealPlan(String(body.goal), Number(body.weight));
    const instantPlan: Diet = {
      id: `local-${Date.now()}`,
      calories: mealPlan.calories,
      protein: mealPlan.protein,
      carbs: mealPlan.carbs,
      fats: mealPlan.fats,
      mealPlan
    };
    setPlans((current) => [instantPlan, ...current]);
    setStatus("Generated instantly");

    try {
      const response = await fetch("/api/diet", { method: "POST", body: JSON.stringify(body) });
      if (response.ok) {
        setStatus("Generated and saved");
        load();
      }
    } catch {
      setStatus("Generated locally");
    }
  }
  const plan = plans[0];
  return (
    <main className="min-h-screen bg-red-radial pb-28 lg:pb-0 lg:pl-72">
      <AppNav />
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-4xl font-black">Diet Planner</h1>
        <p className="mt-2 text-white/60">Generate meal targets and a daily plan immediately.</p>
        <div className="mt-6 grid gap-4 lg:grid-cols-[.8fr_1.2fr]">
          <Card>
            <h2 className="font-black">Generate weekly meals</h2>
            {status && <p className="mt-2 text-sm text-red-200">{status}</p>}
            <form onSubmit={submit} className="mt-4 space-y-4">
              <Input name="age" type="number" placeholder="Age" defaultValue={28} />
              <Input name="weight" type="number" placeholder="Weight (kg)" defaultValue={75} />
              <Select name="goal"><option>Weight Loss</option><option>Muscle Gain</option><option>Strength</option><option>Endurance</option></Select>
              <Input name="workoutSchedule" placeholder="Workout schedule" defaultValue="4 workouts per week" />
              <Button className="w-full"><Salad className="h-4 w-4" /> Generate Diet</Button>
            </form>
          </Card>
          {plan && (
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-4"><StatCard label="Calories" value={`${plan.calories}`} detail="Daily target" /><StatCard label="Protein" value={`${plan.protein}g`} detail="Daily" /><StatCard label="Carbs" value={`${plan.carbs}g`} detail="Daily" /><StatCard label="Fats" value={`${plan.fats}g`} detail="Daily" /></div>
              <Card><h2 className="font-black">Meal Plan</h2><div className="mt-4 grid gap-3 md:grid-cols-2">{plan.mealPlan.meals.map((meal) => <div key={meal.meal} className="rounded-md border border-white/10 p-4"><p className="font-bold text-gym-red">{meal.meal}</p><p className="mt-1 text-sm text-white/70">{meal.item}</p><p className="mt-2 text-sm font-bold">{meal.calories} kcal</p></div>)}</div></Card>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
