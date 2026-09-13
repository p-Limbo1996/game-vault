import React, { useEffect, useState } from "react";
import { Shield, Activity, Wifi } from "lucide-react";

export default function HudFrame() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = time.toLocaleTimeString("en-GB", { hour12: false });

  return (
    <>
      {/* Ambient glow orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-gold/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-gold/[0.06] blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-playstation/5 blur-[100px]" />
      </div>

      {/* Scan lines */}
      <div className="pointer-events-none fixed inset-0 vault-scanlines opacity-30 z-[1]" />

      {/* Top status bar */}
      <div className="fixed top-0 left-0 right-0 z-30 h-8 flex items-center justify-between px-4 font-heading text-[9px] tracking-[0.25em] text-titanium/70 border-b border-white/[0.04] backdrop-blur-md bg-void/40">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><Shield className="h-3 w-3 text-success" /> SECURE LINK</span>
          <span className="hidden md:flex items-center gap-1.5"><Wifi className="h-3 w-3" /> NODE-7A · 12ms</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:flex items-center gap-1.5"><Activity className="h-3 w-3 text-gold animate-pulse-glow" /> 1,284 ACTIVE</span>
          <span className="font-num tabular-nums text-gold/80">{timeStr} UTC</span>
        </div>
      </div>
    </>
  );
}