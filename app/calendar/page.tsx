"use client";

import { useEffect, useState } from "react";
import { AppNav } from "@/components/nav";
import { Card } from "@/components/ui/card";

type Day = { day: number; count: number; completed: boolean };

export default function CalendarPage() {
  const [month, setMonth] = useState<Day[]>([]);

  useEffect(() => {
    fetch("/api/calendar")
      .then((response) => response.json())
      .then((data) => setMonth(data.month ?? []))
      .catch(() => {
        setMonth(Array.from({ length: 31 }, (_, index) => ({ day: index + 1, count: index % 4 === 0 ? 1 : 0, completed: index % 5 === 0 })));
      });
  }, []);

  return (
    <main className="min-h-screen bg-red-radial pb-28 lg:pb-0 lg:pl-72">
      <AppNav />
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-gym-red">GymBuddy</p>
          <h1 className="mt-2 text-3xl font-black sm:text-5xl">Workout Calendar</h1>
          <p className="mt-3 max-w-2xl text-white/65">Monthly workout logs, completed days, and streak visibility powered by the calendar backend.</p>
        </header>
        <div className="grid gap-3 sm:grid-cols-7">
          {month.map((day) => (
            <Card key={day.day} className={day.count ? "red-ring" : ""}>
              <p className="text-sm text-white/50">Day</p>
              <p className="text-2xl font-black">{day.day}</p>
              <p className="mt-3 text-sm text-white/60">{day.count ? `${day.count} workout${day.count > 1 ? "s" : ""}` : "Rest / open"}</p>
              <p className="mt-1 text-xs font-bold text-gym-red">{day.completed ? "Completed" : day.count ? "Planned" : ""}</p>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
