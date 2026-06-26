"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: String(form.get("email") ?? "").trim().toLowerCase(),
        password: String(form.get("password") ?? "")
      })
    });

    setLoading(false);
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setError(data?.error ?? "Could not reset password.");
      return;
    }

    setSuccess("Password updated. Redirecting to login...");
    setTimeout(() => router.replace("/login"), 900);
  }

  return (
    <main className="fitness-bg flex min-h-screen items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md">
        <Logo />
        <h1 className="mt-8 text-3xl font-black">Reset password</h1>
        <p className="mt-2 text-sm text-white/60">Enter your account email and choose a new password.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <Input name="email" type="email" placeholder="Email" required />
          <div className="relative">
            <Input name="password" type={showPassword ? "text" : "password"} placeholder="New password" className="pr-12" required />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((value) => !value)}
              className="absolute inset-y-0 right-3 flex items-center text-white/55 transition hover:text-white"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {error && <p className="text-sm text-red-300">{error}</p>}
          {success && <p className="text-sm text-emerald-300">{success}</p>}
          <Button className="w-full" disabled={loading}><KeyRound className="h-4 w-4" /> {loading ? "Updating..." : "Update password"}</Button>
        </form>
        <p className="mt-6 text-center text-sm text-white/55">Remembered it? <Link href="/login" className="font-bold text-gym-red">Login</Link></p>
      </Card>
    </main>
  );
}
