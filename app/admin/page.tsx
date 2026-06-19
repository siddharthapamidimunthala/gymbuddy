"use client";

import { useEffect, useState } from "react";
import { AppNav } from "@/components/nav";
import { StatCard } from "@/components/ui/card";

type Metrics = { totalUsers: number; activeUsers: number; workoutsLogged: number; dietPlansGenerated: number; chatbotUsage: number };

export default function AdminPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [forbidden, setForbidden] = useState(false);
  useEffect(() => {
    fetch("/api/admin").then(async (response) => {
      if (response.status === 403) setForbidden(true);
      if (response.ok) setMetrics(await response.json());
    });
  }, []);
  return (
    <main className="min-h-screen bg-red-radial pb-28 lg:pb-0 lg:pl-72">
      <AppNav />
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-4xl font-black">Admin Dashboard</h1>
        {forbidden && <p className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-5 text-red-100">Admin access required.</p>}
        {metrics && (
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <StatCard label="Total Users" value={`${metrics.totalUsers}`} detail="Registered accounts" />
            <StatCard label="Active Users" value={`${metrics.activeUsers}`} detail="Last 30 days" />
            <StatCard label="Workouts Logged" value={`${metrics.workoutsLogged}`} detail="All time" />
            <StatCard label="Diet Plans" value={`${metrics.dietPlansGenerated}`} detail="Generated" />
            <StatCard label="Chatbot Usage" value={`${metrics.chatbotUsage}`} detail="Messages" />
          </div>
        )}
      </section>
    </main>
  );
}
