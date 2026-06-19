import { cn } from "@/lib/utils";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn("w-full rounded-md border border-white/10 bg-black/45 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-gym-red", props.className)} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn("w-full rounded-md border border-white/10 bg-black/45 px-4 py-3 text-sm text-white outline-none transition focus:border-gym-red", props.className)} />;
}
