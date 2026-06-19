import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <svg className={compact ? "h-10 w-10" : "h-11 w-11"} viewBox="0 0 80 80" role="img" aria-label="GymBuddy">
        <defs>
          <linearGradient id="gymbuddyLogo" x1="0" x2="1">
            <stop offset="0" stopColor="#ff0000" />
            <stop offset="1" stopColor="#dc2626" />
          </linearGradient>
        </defs>
        <rect width="80" height="80" rx="16" fill="#050505" />
        <path d="M52 26a21 21 0 1 0 5 21H41V36h30v9c-2 18-15 29-31 29A34 34 0 1 1 63 15z" fill="url(#gymbuddyLogo)" />
        <path d="M14 34h8v12h-8zm44 0h8v12h-8zM22 38h36v4H22z" fill="#fff" opacity=".92" />
      </svg>
      {!compact && (
        <span className="text-xl font-black tracking-wide">
          Gym<span className="text-gym-red">Buddy</span>
        </span>
      )}
    </Link>
  );
}
