"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import { Logo } from "@/components/logo";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch("/api/register", { method: "POST", body: JSON.stringify(form) });
    if (!response.ok) {
      setError("Could not create account. Check your details and try again.");
      setLoading(false);
      return;
    }
    await signIn("credentials", { email: form.email, password: form.password, redirect: false });
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-red-radial px-4 py-10">
      <Card className="mx-auto w-full max-w-4xl">
        <Logo />
        <h1 className="mt-8 text-3xl font-black">Create your GymBuddy profile</h1>
        <form onSubmit={submit} className="mt-6 grid gap-4 md:grid-cols-2">
          <Input name="name" placeholder="Name" required />
          <Input name="age" type="number" placeholder="Age" required />
          <Select name="gender" required><option>Male</option><option>Female</option><option>Non-binary</option><option>Prefer not to say</option></Select>
          <Input name="height" type="number" placeholder="Height (cm)" required />
          <Input name="weight" type="number" placeholder="Weight (kg)" required />
          <Select name="goal" required><option>Weight Loss</option><option>Muscle Gain</option><option>Strength</option><option>Endurance</option></Select>
          <Select name="experienceLevel" required><option>Beginner</option><option>Intermediate</option><option>Advanced</option></Select>
          <Input name="workoutTime" type="number" placeholder="Available workout time (minutes)" required />
          <Input name="email" type="email" placeholder="Email" required />
          <Input name="password" type="password" placeholder="Password" required />
          {error && <p className="text-sm text-red-300 md:col-span-2">{error}</p>}
          <Button className="md:col-span-2" disabled={loading}><UserPlus className="h-4 w-4" /> {loading ? "Creating..." : "Create account"}</Button>
        </form>
        <p className="mt-5 text-center text-sm text-white/55">Already registered? <Link href="/login" className="font-bold text-gym-red">Login</Link></p>
      </Card>
    </main>
  );
}
