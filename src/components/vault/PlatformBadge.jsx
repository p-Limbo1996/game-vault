import React from "react";
import { cn } from "@/lib/utils";

const platformConfig = {
  PlayStation: { color: "text-playstation", bg: "bg-playstation/15", border: "border-playstation/30", glow: "shadow-[0_0_20px_-4px_rgba(0,112,209,0.5)]" },
  Xbox: { color: "text-xbox", bg: "bg-xbox/15", border: "border-xbox/30", glow: "shadow-[0_0_20px_-4px_rgba(16,124,16,0.5)]" },
  Steam: { color: "text-steam", bg: "bg-steam/15", border: "border-steam/30", glow: "shadow-[0_0_20px_-4px_rgba(102,51,166,0.5)]" },
  Nintendo: { color: "text-nintendo", bg: "bg-nintendo/15", border: "border-nintendo/30", glow: "shadow-[0_0_20px_-4px_rgba(230,0,18,0.5)]" },
  PC: { color: "text-gold", bg: "bg-gold/15", border: "border-gold/30", glow: "shadow-[0_0_20px_-4px_rgba(216,156,66,0.5)]" },
  Multi: { color: "text-titanium", bg: "bg-white/10", border: "border-white/20", glow: "" },
};

export function getPlatformConfig(platform) {
  return platformConfig[platform] || platformConfig.Multi;
}

export default function PlatformBadge({ platform, className }) {
  const cfg = getPlatformConfig(platform);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-heading text-[10px] font-semibold uppercase tracking-widest backdrop-blur-md",
        cfg.bg, cfg.color, cfg.border, cfg.glow,
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse-glow" />
      {platform}
    </span>
  );
}