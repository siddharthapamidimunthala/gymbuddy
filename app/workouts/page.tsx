"use client";

import { useEffect, useState } from "react";
import { Dumbbell } from "lucide-react";
import { AppNav } from "@/components/nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import { estimateWorkoutCalories, generateWorkoutPlan } from "@/lib/generators";

type Workout = { id: string; workoutType: string; goal: string; caloriesBurned: number; exercises: { name: string; sets: number; reps: string; rest: string; focus: string }[]; date: string };

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [status, setStatus] = useState("");
  async function load() {
    const response = await fetch("/api/workouts");
    if (response.ok) setWorkouts(await response.json());
  }
  useEffect(() => { load(); }, []);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = Object.fromEntries(new FormData(event.currentTarget));
    const input = {
      goal: String(body.goal),
      workoutType: String(body.workoutType),
      experienceLevel: String(body.experienceLevel),
      workoutTime: Number(body.workoutTime)
    };
    const instantWorkout: Workout = {
      id: `local-${Date.now()}`,
      date: new Date().toISOString(),
      goal: input.goal,
      workoutType: input.workoutType,
      caloriesBurned: estimateWorkoutCalories(input.workoutTime, input.goal),
      exercises: generateWorkoutPlan(input)
    };
    setWorkouts((current) => [instantWorkout, ...current]);
    setStatus("Generated instantly");

    try {
      const response = await fetch("/api/workouts", { method: "POST", body: JSON.stringify(body) });
      if (response.ok) {
        setStatus("Generated and saved");
        load();
      }
    } catch {
      setStatus("Generated locally");
    }
  }
  return (
    <main className="min-h-screen bg-red-radial pb-28 lg:pb-0 lg:pl-72">
      <AppNav />
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-4xl font-black">Workout Planner</h1>
        <p className="mt-2 text-white/60">Choose your goal and time to get a routine immediately.</p>
        <div className="mt-6 grid gap-4 lg:grid-cols-[.8fr_1.2fr]">
          <Card>
            <h2 className="font-black">Generate workout</h2>
            {status && <p className="mt-2 text-sm text-red-200">{status}</p>}
            <form onSubmit={submit} className="mt-4 space-y-4">
              <Select name="goal"><option>Weight Loss</option><option>Muscle Gain</option><option>Strength</option><option>Endurance</option></Select>
              <Select name="workoutType"><option>Home Workout</option><option>Gym Workout</option></Select>
              <Select name="experienceLevel"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></Select>
              <Input name="workoutTime" type="number" placeholder="Available time (minutes)" defaultValue={45} />
              <Button className="w-full"><Dumbbell className="h-4 w-4" /> Generate</Button>
            </form>
          </Card>
          <div className="space-y-4">
            {workouts.map((workout) => (
              <Card key={workout.id}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-black">{workout.goal} - {workout.workoutType}</h2>
                  <span className="rounded-md bg-red-500/15 px-3 py-1 text-sm font-bold text-red-200">{workout.caloriesBurned} kcal</span>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-2">{workout.exercises.map((exercise) => <div key={exercise.name} className="rounded-md border border-white/10 p-3"><p className="font-bold">{exercise.name}</p><p className="text-sm text-white/55">{exercise.sets} sets x {exercise.reps}, rest {exercise.rest}</p></div>)}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
