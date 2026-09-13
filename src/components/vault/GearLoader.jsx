import React from "react";

export default function GearLoader({ size = 64, label = "INITIALIZING" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow" style={{ animationDuration: "4s" }}>
          <path
            d="M50 10 L55 22 L68 18 L66 32 L80 34 L72 46 L84 54 L72 62 L80 74 L66 76 L68 90 L55 86 L50 98 L45 86 L32 90 L34 76 L20 74 L28 62 L16 54 L28 46 L20 34 L34 32 L32 18 L45 22 Z"
            fill="none"
            stroke="#D89C42"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <circle cx="50" cy="50" r="14" fill="none" stroke="#D89C42" strokeWidth="2" />
        </svg>
        <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow" style={{ animationDuration: "3s", animationDirection: "reverse" }}>
          <circle cx="50" cy="50" r="6" fill="#D89C42" opacity="0.9" />
        </svg>
      </div>
      {label && (
        <span className="font-heading text-[10px] uppercase tracking-[0.3em] text-titanium animate-pulse-glow">
          {label}
        </span>
      )}
    </div>
  );
}