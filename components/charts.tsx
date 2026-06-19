"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const tooltipStyle = { background: "#090909", border: "1px solid rgba(255,255,255,.14)", borderRadius: 8, color: "#fff" };

export function WeightChart({ data }: { data: { label: string; weight: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid stroke="rgba(255,255,255,.08)" />
        <XAxis dataKey="label" stroke="rgba(255,255,255,.5)" />
        <YAxis stroke="rgba(255,255,255,.5)" />
        <Tooltip contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey="weight" stroke="#ff0000" strokeWidth={3} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function CaloriesChart({ data }: { data: { label: string; calories: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data}>
        <CartesianGrid stroke="rgba(255,255,255,.08)" />
        <XAxis dataKey="label" stroke="rgba(255,255,255,.5)" />
        <YAxis stroke="rgba(255,255,255,.5)" />
        <Tooltip contentStyle={tooltipStyle} />
        <Area type="monotone" dataKey="calories" stroke="#ff0000" fill="rgba(255,0,0,.24)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function WorkoutChart({ data }: { data: { label: string; workouts: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <CartesianGrid stroke="rgba(255,255,255,.08)" />
        <XAxis dataKey="label" stroke="rgba(255,255,255,.5)" />
        <YAxis stroke="rgba(255,255,255,.5)" />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="workouts" fill="#dc2626" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
