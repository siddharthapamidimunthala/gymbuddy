import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("glass rounded-lg p-5", className)} {...props} />;
}

export function StatCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <Card>
      <p className="text-sm text-white/55">{label}</p>
      <p className="mt-2 text-3xl font-black">{value}</p>
      <p className="mt-1 text-sm text-white/60">{detail}</p>
    </Card>
  );
}
