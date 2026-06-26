"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { AppNav } from "@/components/nav";
import { CaloriesChart } from "@/components/charts";
import { Button } from "@/components/ui/button";
import { Card, StatCard } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { estimateFoodCalories } from "@/lib/nutrition";

type Log = { id: string; food: string; quantity: string; calories: number; date: string };

export default function CaloriesPage() {
  const [data, setData] = useState<{ logs: Log[]; totals: { today: number; weekly: number; monthly: number } }>({ logs: [], totals: { today: 0, weekly: 0, monthly: 0 } });
  const [status, setStatus] = useState("");
  const [food, setFood] = useState("");
  const [weightGrams, setWeightGrams] = useState("");
  const estimate = food && Number(weightGrams) > 0 ? estimateFoodCalories(food, Number(weightGrams)) : null;

  async function load() {
    const response = await fetch("/api/calories");
    if (response.ok) setData(await response.json());
  }

  useEffect(() => { load(); }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form));
    const calories = estimateFoodCalories(String(body.food), Number(body.weightGrams)).calories;
    const instantLog: Log = {
      id: `local-${Date.now()}`,
      food: String(body.food),
      quantity: `${Number(body.weightGrams)} g`,
      calories,
      date: new Date().toISOString()
    };
    setData((current) => ({
      logs: [instantLog, ...current.logs],
      totals: {
        today: current.totals.today + calories,
        weekly: current.totals.weekly + calories,
        monthly: current.totals.monthly + calories
      }
    }));
    setStatus("Added instantly");
    form.reset();
    setFood("");
    setWeightGrams("");
    try {
      const response = await fetch("/api/calories", { method: "POST", body: JSON.stringify(body) });
      if (response.ok) {
        setStatus("Added and saved");
        load();
      }
    } catch {
      setStatus("Added locally");
    }
  }
  const chart = data.logs.slice(0, 14).reverse().map((log) => ({ label: new Date(log.date).toLocaleDateString("en", { month: "short", day: "numeric" }), calories: log.calories }));
  return (
    <main className="min-h-screen bg-red-radial pb-28 lg:pb-0 lg:pl-72">
      <AppNav />
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-4xl font-black">Calorie Counter</h1>
        <p className="mt-2 text-white/60">Enter a food and weight in grams. Calories are estimated automatically.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3"><StatCard label="Today" value={`${data.totals.today}`} detail="Calories logged" /><StatCard label="Weekly" value={`${data.totals.weekly}`} detail="Last 7 days" /><StatCard label="Monthly" value={`${data.totals.monthly}`} detail="Last 30 days" /></div>
        <div className="mt-6 grid gap-4 lg:grid-cols-[.85fr_1.15fr]">
          <Card>
            <h2 className="font-black">Add food</h2>
            {status && <p className="mt-2 text-sm text-red-200">{status}</p>}
            <form onSubmit={submit} className="mt-4 space-y-4">
              <Input name="food" value={food} onChange={(event) => setFood(event.target.value)} placeholder="Food name" required />
              <Input name="weightGrams" value={weightGrams} onChange={(event) => setWeightGrams(event.target.value)} type="number" placeholder="Weight (grams)" required />
              <div className="rounded-md border border-white/10 bg-black/25 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-white/45">Estimated calories</p>
                <p className="mt-2 text-3xl font-black">{estimate ? estimate.calories : "--"} kcal</p>
                <p className="mt-1 text-sm text-white/55">{estimate ? `${estimate.matchedFood} at ${estimate.caloriesPer100g} kcal / 100g` : "Add food and weight to calculate"}</p>
              </div>
              <Button className="w-full"><Plus className="h-4 w-4" /> Add Food</Button>
            </form>
          </Card>
          <Card><h2 className="mb-4 font-black">Intake Trend</h2><CaloriesChart data={chart} /></Card>
        </div>
        <Card className="mt-6">
          <h2 className="font-black">Recent logs</h2>
          <div className="mt-4 divide-y divide-white/10">{data.logs.map((log) => <div key={log.id} className="grid grid-cols-3 gap-3 py-3 text-sm"><span>{log.food}</span><span className="text-white/55">{log.quantity}</span><span className="text-right font-bold text-gym-red">{log.calories}</span></div>)}</div>
        </Card>
      </section>
    </main>
  );
}
