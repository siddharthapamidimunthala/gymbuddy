"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import { AppNav } from "@/components/nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { calculateBmi } from "@/lib/utils";

type Result = { bmi: number; category: string; suggestion: string };

export default function BmiPage() {
  const [result, setResult] = useState<Result | null>(null);
  const [status, setStatus] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = Object.fromEntries(new FormData(event.currentTarget));
    const height = Number(body.height);
    const weight = Number(body.weight);
    const localResult = calculateBmi(height, weight);
    setResult(localResult);
    setStatus("Calculated instantly");

    try {
      const response = await fetch("/api/bmi", { method: "POST", body: JSON.stringify(body) });
      if (response.ok) {
        setResult(await response.json());
        setStatus("Saved to your BMI history");
      }
    } catch {
      setStatus("Calculated locally");
    }
  }

  return (
    <main className="min-h-screen bg-red-radial pb-28 lg:pb-0 lg:pl-72">
      <AppNav />
      <section className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-4xl font-black">BMI Calculator</h1>
        <p className="mt-2 text-white/60">Enter height and weight, then calculate instantly.</p>
        <Card className="mt-6">
          <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
            <Input name="height" type="number" placeholder="Height (cm)" required />
            <Input name="weight" type="number" placeholder="Weight (kg)" required />
            <Button className="md:col-span-2"><Calculator className="h-4 w-4" /> Calculate BMI</Button>
          </form>
          {result && (
            <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-5">
              {status && <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-red-200">{status}</p>}
              <p className="text-5xl font-black">{result.bmi}</p>
              <p className="mt-2 font-bold text-gym-red">{result.category}</p>
              <p className="mt-2 text-white/65">{result.suggestion}</p>
            </div>
          )}
        </Card>
      </section>
    </main>
  );
}
