import { getServerSession } from "next-auth";
import { Activity, CalendarDays, Dumbbell, Mail, Ruler, Scale, Timer, Trophy, UserCircle } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card, StatCard } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function display(value: string | number | null | undefined, suffix = "") {
  if (value === null || value === undefined || value === "") return "Not set";
  return `${value}${suffix}`;
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? "";
  const [user, workouts, calories, bmiEntries] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.workout.count({ where: { userId } }),
    prisma.calorieLog.count({ where: { userId } }),
    prisma.bMIHistory.count({ where: { userId } })
  ]);

  const profile = [
    { label: "Email", value: user?.email, icon: Mail },
    { label: "Age", value: display(user?.age), icon: CalendarDays },
    { label: "Gender", value: display(user?.gender), icon: UserCircle },
    { label: "Height", value: display(user?.height, " cm"), icon: Ruler },
    { label: "Weight", value: display(user?.weight, " kg"), icon: Scale },
    { label: "Goal", value: display(user?.goal), icon: Trophy },
    { label: "Experience", value: display(user?.experienceLevel), icon: Activity },
    { label: "Workout Duration", value: display(user?.workoutTime, " min"), icon: Timer }
  ];

  return (
    <AppShell title={user?.name ? `${user.name}'s Profile` : "User Profile"} subtitle="Your account details and saved fitness activity.">
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Saved Workouts" value={`${workouts}`} detail="Workout plans in your account" />
        <StatCard label="Calorie Logs" value={`${calories}`} detail="Food entries saved" />
        <StatCard label="BMI Entries" value={`${bmiEntries}`} detail="Body metric history" />
      </div>

      <Card className="mt-6">
        <h2 className="font-black">Account Details</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {profile.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3 rounded-md border border-white/10 bg-black/20 p-4">
              <Icon className="h-5 w-5 text-gym-red" />
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/45">{label}</p>
                <p className="mt-1 font-bold text-white">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mt-6">
        <div className="flex items-center gap-3">
          <Dumbbell className="h-5 w-5 text-gym-red" />
          <div>
            <h2 className="font-black">Next Step</h2>
            <p className="mt-1 text-sm text-white/60">Use Dashboard, BMI, Calories, Workouts, Diet, and Coach from the sidebar to build your profile history.</p>
          </div>
        </div>
      </Card>
    </AppShell>
  );
}
