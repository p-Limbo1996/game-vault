import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, ShieldCheck, Lock, Clock, ArrowLeft } from "lucide-react";
import VaultButton from "@/components/vault/VaultButton";

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function OtpPage() {
  const [values, setValues] = useState([0, 0, 0, 0, 0, 0]);
  const [activeWheel, setActiveWheel] = useState(0);
  const [countdown, setCountdown] = useState(180);
  const [verifying, setVerifying] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const wheelRefs = useRef([]);

  // Countdown timer
  useEffect(() => {
    if (verifying || unlocked) return;
    const id = setInterval(() => setCountdown(c => (c <= 0 ? 180 : c - 1)), 1000);
    return () => clearInterval(id);
  }, [verifying, unlocked]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (unlocked) return;
      if (e.key === "ArrowRight" || e.key === "Tab") {
        e.preventDefault();
        setActiveWheel(w => (w + 1) % 6);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveWheel(w => (w - 1 + 6) % 6);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        spinWheel(activeWheel, 1);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        spinWheel(activeWheel, -1);
      } else if (/^[0-9]$/.test(e.key)) {
        setValues(prev => {
          const next = [...prev];
          next[activeWheel] = parseInt(e.key);
          return next;
        });
        setActiveWheel(w => (w + 1) % 6);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeWheel, unlocked]);

  const spinWheel = useCallback((index, dir) => {
    setValues(prev => {
      const next = [...prev];
      next[index] = (next[index] + dir + 10) % 10;
      return next;
    });
  }, []);

  const handleWheelScroll = useCallback((e, index) => {
    e.preventDefault();
    spinWheel(index, e.deltaY > 0 ? -1 : 1);
  }, [spinWheel]);

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setUnlocked(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 2800);
    }, 1600);
  };

  const fmtTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-void relative overflow-hidden flex items-center justify-center px-6 vignette">
      {/* Animated background */}
      <div className="absolute inset-0">
        <img
          src="https://media.base44.com/images/public/6a66186ca15773e0916f168d/6428da4d2_generated_0af383b5.png"
          alt=""
          className="h-full w-full object-cover opacity-30 scale-110 animate-pulse-glow"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/80 via-void/70 to-void/95" />
      </div>

      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-gold/15 blur-[140px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-gold/10 blur-[140px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>
      <div className="fixed inset-0 vault-scanlines opacity-25" />

      {/* Vault unlock overlay */}
      <AnimatePresence>
        {unlocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-gold/20 blur-[80px]"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center gap-4"
            >
              <ShieldCheck className="h-24 w-24 text-gold glow-gold" strokeWidth={1.2} />
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="font-heading font-black text-4xl text-gold-gradient tracking-widest"
              >
                VAULT UNLOCKED
              </motion.h2>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "200px" }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="relative rounded-[28px] vault-metal p-8 md:p-12 overflow-hidden">
          {/* Screws */}
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="absolute h-2.5 w-2.5 rounded-full bg-gradient-to-br from-titanium/50 to-black/70 shadow-inner z-20"
              style={{
                top: i < 2 ? "14px" : "auto",
                bottom: i >= 2 ? "14px" : "auto",
                left: i % 2 === 0 ? "14px" : "auto",
                right: i % 2 === 1 ? "14px" : "auto",
              }}
            />
          ))}

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full vault-glass px-4 py-1.5 mb-5">
              <Lock className="h-3.5 w-3.5 text-gold" />
              <span className="font-heading text-[9px] tracking-[0.3em] text-titanium">SECURE VAULT ACCESS</span>
            </div>
            <h1 className="font-heading font-black text-3xl md:text-4xl text-foreground tracking-wide">
              ENTER <span className="text-gold-gradient">ACCESS CODE</span>
            </h1>
            <p className="text-titanium mt-2 text-sm">
              Rotate each mechanical dial to align your six-digit security code.
            </p>
          </div>

          {/* Wheels */}
          <div className="flex justify-center gap-2 md:gap-3 mb-8">
            {values.map((val, i) => (
              <Wheel
                key={i}
                index={i}
                value={val}
                active={activeWheel === i}
                onSelect={() => setActiveWheel(i)}
                onSpin={(dir) => spinWheel(i, dir)}
                onScroll={(e) => handleWheelScroll(e, i)}
                ref={(el) => (wheelRefs.current[i] = el)}
              />
            ))}
          </div>

          {/* Hints */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-8 text-center">
            <span className="font-heading text-[9px] tracking-[0.2em] text-titanium/70">↑↓ ROTATE</span>
            <span className="font-heading text-[9px] tracking-[0.2em] text-titanium/70">SCROLL</span>
            <span className="font-heading text-[9px] tracking-[0.2em] text-titanium/70">←→ NAVIGATE</span>
            <span className="font-heading text-[9px] tracking-[0.2em] text-titanium/70">TYPE DIGIT</span>
          </div>

          {/* Security status panel */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <StatusCell label="ATTEMPTS" value="3 / 5" tone="gold" />
            <StatusCell label="SESSION" value="VERIFIED" tone="success" />
            <StatusCell label="EXPIRES IN" value={fmtTime(countdown)} tone={countdown < 30 ? "danger" : "neutral"} mono />
          </div>

          {/* Verify button */}
          <div className="flex gap-3">
            <button
              onClick={() => window.location.href = "/login"}
              className="h-14 w-14 shrink-0 rounded-[18px] vault-glass border border-white/10 flex items-center justify-center text-titanium hover:text-foreground hover:border-white/25 transition-all"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <VaultButton
              variant="gold"
              size="lg"
              onClick={handleVerify}
              disabled={verifying || unlocked}
              className="flex-1 relative overflow-hidden h-14 text-base"
            >
              {verifying ? (
                <span className="flex items-center gap-3">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-5 w-5 rounded-full border-2 border-void/30 border-t-void"
                  />
                  AUTHENTICATING...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Lock className="h-5 w-5" /> VERIFY & UNLOCK
                </span>
              )}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: verifying ? "100%" : "-100%" }}
                transition={{ duration: 1.4, repeat: verifying ? Infinity : 0 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              />
            </VaultButton>
          </div>

          <p className="text-center text-titanium/60 text-xs mt-6">
            Resend code · Security protocol enforced · All attempts are logged
          </p>
        </div>
      </motion.div>
    </div>
  );
}

const Wheel = React.forwardRef(function Wheel({ index, value, active, onSelect, onSpin, onScroll }, ref) {
  const [dragStart, setDragStart] = useState(null);
  const [localSpin, setLocalSpin] = useState(0);

  const handlePointerDown = (e) => {
    onSelect();
    setDragStart({ y: e.clientY || e.touches?.[0]?.clientY, startVal: value });
  };

  const handlePointerMove = (e) => {
    if (dragStart == null) return;
    const y = e.clientY || e.touches?.[0]?.clientY;
    const delta = dragStart.y - y;
    if (Math.abs(delta) > 24) {
      const steps = Math.round(delta / 24);
      onSpin(steps - localSpin);
      setLocalSpin(steps);
    }
  };

  const handlePointerUp = () => {
    setDragStart(null);
    setLocalSpin(0);
  };

  useEffect(() => {
    if (dragStart == null) return;
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  });

  return (
    <div
      ref={ref}
      onWheel={onScroll}
      onPointerDown={handlePointerDown}
      onClick={onSelect}
      className="relative cursor-grab active:cursor-grabbing select-none"
      style={{ perspective: "800px" }}
    >
      {/* Active glow */}
      {active && (
        <motion.div
          layoutId="wheel-glow"
          className="absolute -inset-1.5 rounded-[18px] bg-gold/20 blur-md -z-10"
        />
      )}

      {/* Frame */}
      <div className={`relative h-28 w-16 md:h-32 md:w-20 rounded-[16px] vault-metal overflow-hidden transition-all duration-300 ${active ? "ring-1 ring-gold/50" : ""}`}>
        {/* Top/bottom screws */}
        <span className="absolute top-1.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-titanium/40 z-20" />
        <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-titanium/40 z-20" />

        {/* Gradient fade top/bottom */}
        <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-void to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-void to-transparent z-20 pointer-events-none" />

        {/* Center line markers */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gold/20 z-20" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-y-[2px] w-1.5 h-1.5 rounded-full bg-gold z-20" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-y-[2px] w-1.5 h-1.5 rounded-full bg-gold z-20" />

        {/* Rotating digits */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{
            transform: `translateY(calc(50% - ${value * 56}px - 28px))`,
            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {DIGITS.map((d) => (
            <div
              key={d}
              className={`h-14 md:h-16 w-full flex items-center justify-center font-num font-bold text-2xl md:text-3xl ${
                d === value ? "text-gold glow-gold" : "text-titanium/40"
              }`}
              style={{
                textShadow: d === value ? "0 0 18px rgba(216,156,66,0.7)" : "none",
              }}
            >
              {d}
            </div>
          ))}
        </div>
      </div>

      {/* Up / Down buttons */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-3 z-30">
        <button
          onClick={(e) => { e.stopPropagation(); onSpin(1); }}
          className="h-6 w-6 rounded-md vault-glass flex items-center justify-center text-gold hover:bg-gold/20 transition-colors"
        >
          <ChevronUp className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 z-30">
        <button
          onClick={(e) => { e.stopPropagation(); onSpin(-1); }}
          className="h-6 w-6 rounded-md vault-glass flex items-center justify-center text-gold hover:bg-gold/20 transition-colors"
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Index label */}
      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-heading text-[8px] tracking-[0.2em] text-titanium/50">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
});

function StatusCell({ label, value, tone = "neutral", mono }) {
  const tones = {
    gold: "text-gold border-gold/30",
    success: "text-success border-success/30",
    danger: "text-danger border-danger/30",
    neutral: "text-foreground border-white/15",
  };
  return (
    <div className={`rounded-[14px] vault-glass border px-3 py-2.5 text-center ${tones[tone]}`}>
      <p className="font-heading text-[8px] tracking-[0.2em] text-titanium/70">{label}</p>
      <p className={`font-heading font-bold text-sm mt-1 ${mono ? "font-num" : ""} ${tones[tone].split(" ")[0]}`}>
        {value}
      </p>
    </div>
  );
}