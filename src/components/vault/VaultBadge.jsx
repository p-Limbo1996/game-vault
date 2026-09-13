import { cn } from "@/lib/utils";

const tones = {
  gold: "text-gold border-gold/30 bg-gold/10",
  success: "text-success border-success/30 bg-success/10",
  danger: "text-danger border-danger/30 bg-danger/10",
  neutral: "text-titanium border-white/15 bg-white/5",
};

export default function VaultBadge({ children, tone = "neutral", className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-heading text-[10px] font-semibold uppercase tracking-widest",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
