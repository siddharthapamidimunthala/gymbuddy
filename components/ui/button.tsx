import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" ? "bg-gym-red text-white shadow-glow hover:bg-gym-crimson" : "border border-white/15 bg-white/5 text-white hover:bg-white/10",
        className
      )}
      {...props}
    />
  );
}
