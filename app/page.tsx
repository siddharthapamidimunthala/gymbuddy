import Link from "next/link";
import { ArrowRight, Bot, CalendarDays, Dumbbell, Gauge, LineChart, Salad, Utensils } from "lucide-react";
import { Logo } from "@/components/logo";
import { MotionDiv, MotionSection } from "@/components/motion";

const features = [
  { href: "/diet", icon: Salad, title: "AI Diet Planner", text: "Weekly meal plans with calories, protein, carbs, and fats." },
  { href: "/workouts", icon: Dumbbell, title: "Workout Generator", text: "Home and gym routines tuned to time, goal, and experience." },
  { href: "/bmi", icon: Gauge, title: "BMI Calculator", text: "Track BMI history and receive practical health suggestions." },
  { href: "/calories", icon: Utensils, title: "Calorie Counter", text: "Daily, weekly, and monthly intake analytics." },
  { href: "/progress", icon: LineChart, title: "Progress Tracking", text: "Visualize weight, workouts, and calorie patterns." },
  { href: "/calendar", icon: CalendarDays, title: "Workout Calendar", text: "Monthly and weekly workout history with streaks." },
  { href: "/chat", icon: Bot, title: "AI Coach Chatbot", text: "Fitness guidance backed by OpenAI when configured." }
];

const quotes = ["Discipline beats motivation.", "Strong habits build strong bodies.", "Train with purpose. Recover with respect."];

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="fitness-bg min-h-[92vh] px-4 pb-14 pt-6 sm:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <Logo />
          <div className="flex gap-2">
            <Link href="/login" className="rounded-md border border-white/15 px-4 py-2 text-sm font-bold hover:bg-white/10">Login</Link>
            <Link href="/register" className="rounded-md bg-gym-red px-4 py-2 text-sm font-bold shadow-glow hover:bg-gym-crimson">Join</Link>
          </div>
        </nav>
        <div className="mx-auto grid max-w-7xl gap-8 pt-24 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
          <MotionDiv initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-sm font-black uppercase tracking-[0.4em] text-gym-red">Your AI Fitness Partner</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black leading-tight sm:text-7xl">GymBuddy</h1>
            <p className="mt-5 max-w-2xl text-lg text-white/72">Plan workouts, build diets, count calories, calculate BMI, and stay accountable with a premium AI-powered fitness dashboard.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/register" className="rounded-md bg-gym-red px-6 py-4 text-sm font-black shadow-glow hover:bg-gym-crimson">Start Training</Link>
              <Link href="/login" className="rounded-md border border-white/15 bg-white/5 px-6 py-4 text-sm font-black hover:bg-white/10">Open Dashboard</Link>
            </div>
          </MotionDiv>
          <div className="grid gap-3 sm:grid-cols-3 lg:mb-4">
            {quotes.map((quote, index) => (
              <MotionDiv key={quote} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.12 }} className="glass rounded-lg p-4">
                <p className="text-sm font-bold text-white/85">{quote}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      <MotionSection initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mx-auto max-w-7xl px-4 py-16 sm:px-8">
        <h2 className="text-3xl font-black">Everything your training week needs</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.title} href={feature.href} className="glass group rounded-lg p-5 transition hover:-translate-y-1 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-gym-red">
                <Icon className="h-8 w-8 text-gym-red" />
                <h3 className="mt-4 font-black">{feature.title}</h3>
                <p className="mt-2 text-sm text-white/58">{feature.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-red-200">
                  Open tool <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </MotionSection>

      <section className="bg-gym-charcoal/60 px-4 py-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {["Before: inconsistent meals. After: 14-week recomposition.", "Before: no plan. After: 5-day strength split.", "Before: stalled. After: habit-driven analytics."].map((text, index) => (
            <div key={text} className="min-h-72 rounded-lg bg-cover bg-center p-5" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.22), rgba(0,0,0,.82)), url(https://images.unsplash.com/photo-${["1517838277536-f5f99be501cd", "1571019613454-1cb2f99b2d8b", "1605296867304-46d5465a13f1"][index]}?auto=format&fit=crop&w=900&q=80)` }}>
              <p className="mt-48 text-lg font-black">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <video className="h-[420px] w-full rounded-lg object-cover red-ring" autoPlay loop muted playsInline poster="https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?auto=format&fit=crop&w=1400&q=80">
            <source src="https://videos.pexels.com/video-files/855828/855828-hd_1280_720_25fps.mp4" type="video/mp4" />
          </video>
          <div>
            <h2 className="text-3xl font-black">Motivation, made measurable</h2>
            <p className="mt-4 text-white/65">Track streaks, calories, completed workouts, and body metrics in one dashboard that keeps the next action obvious.</p>
            <div className="mt-6 space-y-3">
              {["The chatbot helped me stop guessing.", "The calendar made consistency visible.", "Meal macros finally clicked."].map((review) => <p key={review} className="glass rounded-lg p-4 text-sm text-white/78">{review}</p>)}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-8 text-sm text-white/50 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <Logo />
          <div className="flex gap-5"><span>About</span><span>Contact</span><span>Privacy Policy</span><span>Terms</span></div>
        </div>
      </footer>
    </main>
  );
}
