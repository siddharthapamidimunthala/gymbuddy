import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { AppNav } from "@/components/nav";
import { authOptions } from "@/lib/auth";

export async function AppShell({ children, title, subtitle, requireAuth = true }: { children: React.ReactNode; title: string; subtitle: string; requireAuth?: boolean }) {
  const session = await getServerSession(authOptions);
  if (requireAuth && !session?.user) redirect("/login");

  return (
    <main className="min-h-screen bg-red-radial pb-28 lg:pb-0 lg:pl-72">
      <AppNav />
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-gym-red">GymBuddy</p>
          <h1 className="mt-2 text-3xl font-black sm:text-5xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-white/65">{subtitle}</p>
        </header>
        {children}
      </section>
    </main>
  );
}
