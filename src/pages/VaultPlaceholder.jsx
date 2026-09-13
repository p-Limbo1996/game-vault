import React from "react";
import { motion } from "framer-motion";
import { Lock, Construction } from "lucide-react";
import GearLoader from "@/components/vault/GearLoader";

export default function VaultPlaceholder({ title, eyebrow }) {
  return (
    <div className="max-w-7xl mx-auto px-8 lg:px-12 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative rounded-[28px] vault-metal overflow-hidden p-16 text-center"
      >
        <div className="absolute inset-0 vault-scanlines opacity-20" />
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-gold/10 blur-[100px]" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative">
            <GearLoader size={80} label="" />
          </div>
          <span className="font-heading text-[10px] tracking-[0.3em] text-gold mt-6">{eyebrow}</span>
          <h1 className="font-heading font-bold text-4xl text-foreground mt-2">{title}</h1>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full vault-glass px-4 py-2">
            <Construction className="h-4 w-4 text-gold" />
            <span className="font-heading text-[10px] tracking-[0.25em] text-titanium">MODULE IN DEVELOPMENT</span>
          </div>
          <p className="text-titanium mt-4 max-w-md">
            This terminal module is being calibrated. Access will be granted once the vault protocols are initialized.
          </p>
        </div>
      </motion.div>
    </div>
  );
}