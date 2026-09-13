import React from "react";
import { cn } from "@/lib/utils";

const variants = {
  gold: "bg-gradient-to-b from-gold-light to-gold text-void hover:from-gold-hover hover:to-gold shadow-[0_8px_30px_-8px_rgba(216,156,66,0.5)]",
  ghost: "vault-surface text-foreground hover:border-gold/40 hover:text-gold",
  danger: "bg-gradient-to-b from-[#FF5E6C] to-[#C73E4B] text-white hover:brightness-110",
  outline: "border border-white/10 text-titanium hover:text-foreground hover:border-white/25",
};

const sizes = {
  sm: "h-9 px-4 text-xs",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

export default function VaultButton({
  children,
  variant = "gold",
  size = "md",
  className,
  ...props
}) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-[18px] font-heading font-semibold uppercase tracking-wider transition-all duration-300 active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}