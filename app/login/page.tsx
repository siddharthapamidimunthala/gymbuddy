"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Github, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false
    });
    setLoading(false);
    if (result?.error) setError("Invalid email or password.");
    else router.push("/dashboard");
  }

  return (
    <main className="fitness-bg flex min-h-screen items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md">
        <Logo />
        <h1 className="mt-8 text-3xl font-black">Welcome back</h1>
        <p className="mt-2 text-sm text-white/60">Log in and keep today’s workout moving.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <Input name="email" type="email" placeholder="Email" required />
          <Input name="password" type="password" placeholder="Password" required />
          <div className="flex items-center justify-between text-sm text-white/55">
            <label className="flex items-center gap-2"><input type="checkbox" className="accent-gym-red" /> Remember me</label>
            <Link href="/login" className="hover:text-white">Forgot password?</Link>
          </div>
          {error && <p className="text-sm text-red-300">{error}</p>}
          <Button className="w-full" disabled={loading}><LogIn className="h-4 w-4" /> {loading ? "Signing in..." : "Login"}</Button>
        </form>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button variant="ghost" onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>Google</Button>
          <Button variant="ghost" onClick={() => signIn("github", { callbackUrl: "/dashboard" })}><Github className="h-4 w-4" /> GitHub</Button>
        </div>
        <p className="mt-6 text-center text-sm text-white/55">New here? <Link href="/register" className="font-bold text-gym-red">Create account</Link></p>
      </Card>
    </main>
  );
}
