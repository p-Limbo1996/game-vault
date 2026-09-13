import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Home } from "lucide-react";
import VaultButton from "@/components/vault/VaultButton";

export default function VaultPageNotFound() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Ambient */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-danger/10 blur-[140px]" />
      </div>

      <div className="relative z-10 text-center">
        {/* Vault door */}
        <div className="relative mx-auto mb-10" style={{ perspective: "1200px" }}>
          {/* Door frame */}
          <div className="relative h-56 w-56 mx-auto">
            <div className="absolute inset-0 rounded-full vault-metal" style={{ boxShadow: "0 0 60px rgba(255,94,108,0.2)" }} />

            {/* Hinges */}
            <div className="absolute -left-1 top-1/4 h-3 w-3 rounded-full bg-titanium/40" />
            <div className="absolute -left-1 bottom-1/4 h-3 w-3 rounded-full bg-titanium/40" />

            {/* Door (opens) */}
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{ rotateY: open ? -75 : 0 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 rounded-full vault-metal flex items-center justify-center origin-left"
              style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
            >
              {/* Bolts ring */}
              {[0,1,2,3,4,5,6,7].map(i => {
                const angle = (i / 8) * 360;
                return (
                  <span key={i} className="absolute h-3 w-3 rounded-full bg-gradient-to-br from-titanium/50 to-black/70 shadow-inner"
                    style={{ transform: `rotate(${angle}deg) translateY(-100px) rotate(-${angle}deg)` }} />
                );
              })}
              {/* Center wheel */}
              <motion.div
                animate={{ rotate: open ? 90 : 0 }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
                className="h-24 w-24 rounded-full border-2 border-gold/30 flex items-center justify-center"
              >
                <div className="h-16 w-16 rounded-full border border-gold/20 flex items-center justify-center">
                  <Lock className="h-6 w-6 text-gold/60" />
                </div>
              </motion.div>
            </motion.div>

            {/* Light behind door */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: open ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute inset-4 rounded-full bg-gradient-to-br from-danger/40 to-gold/20 blur-xl"
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <span className="font-heading text-[10px] tracking-[0.3em] text-danger animate-pulse-glow">SECURITY PROTOCOL</span>
          <h1 className="font-heading font-black text-5xl md:text-6xl text-foreground mt-2 tracking-wider">
            ACCESS <span className="text-gold-gradient">DENIED</span>
          </h1>
          <p className="text-titanium mt-3 max-w-md mx-auto">
            The requested sector does not exist in the vault registry. This access attempt has been logged.
          </p>
          <p className="font-num text-titanium/60 text-sm mt-2">Error 404 · Asset not found</p>

          <Link to="/" className="inline-block mt-6">
            <VaultButton variant="gold" size="lg"><Home className="h-5 w-5" /> RETURN TO TERMINAL</VaultButton>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}