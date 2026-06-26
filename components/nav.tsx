"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Activity, Bot, CalendarDays, Dumbbell, Gauge, LayoutDashboard, LogOut, Salad, Shield, UserCircle, Utensils } from "lucide-react";
import { Logo } from "@/components/logo";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/profile", label: "Profile", icon: UserCircle },
  { href: "/bmi", label: "BMI", icon: Gauge },
  { href: "/calories", label: "Calories", icon: Utensils },
  { href: "/workouts", label: "Workouts", icon: Dumbbell },
  { href: "/diet", label: "Diet", icon: Salad },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/progress", label: "Progress", icon: Activity },
  { href: "/chat", label: "Coach", icon: Bot },
  { href: "/admin", label: "Admin", icon: Shield }
];

export function AppNav() {
  const { data } = useSession();
  return (
    <aside className="glass fixed inset-x-3 bottom-3 z-40 flex items-center gap-2 rounded-lg p-2 lg:inset-y-4 lg:left-4 lg:right-auto lg:w-64 lg:flex-col lg:items-stretch">
      <div className="hidden p-3 lg:block"><Logo /></div>
      <nav className="flex flex-1 gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href} className="flex min-w-12 items-center justify-center gap-3 rounded-md px-3 py-3 text-sm text-white/75 transition hover:bg-white/10 hover:text-white lg:justify-start">
              <Icon className="h-5 w-5 text-gym-red" />
              <span className="hidden lg:inline">{link.label}</span>
            </Link>
          );
        })}
      </nav>
      {data?.user && (
        <button onClick={() => signOut({ callbackUrl: "/" })} className="hidden items-center gap-3 rounded-md px-3 py-3 text-sm text-white/75 transition hover:bg-white/10 hover:text-white lg:flex">
          <LogOut className="h-5 w-5 text-gym-red" /> Sign out
        </button>
      )}
    </aside>
  );
}
