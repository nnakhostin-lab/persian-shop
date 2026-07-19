export default function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  const textColor = variant === "light" ? "text-navy" : "text-cream";
  const subColor = variant === "light" ? "text-firuzeh-dark" : "text-firuzeh-light";

  return (
    <span className="flex items-center gap-2">
      <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#12A594" />
            <stop offset="100%" stopColor="#C9962C" />
          </linearGradient>
        </defs>
        <path
          d="M17 1 L21.5 12.5 L33 17 L21.5 21.5 L17 33 L12.5 21.5 L1 17 L12.5 12.5 Z"
          fill="url(#logo-grad)"
        />
        <circle cx="17" cy="17" r="4.2" fill="#0B2E4A" />
      </svg>
      <span className="flex items-baseline gap-1.5 leading-none">
        <span className={`text-2xl font-black tracking-tight ${textColor}`}>کارگاه</span>
        <span className={`text-2xl font-light ${subColor}`}>صنایع‌دستی نخستین</span>
      </span>
    </span>
  );
}
