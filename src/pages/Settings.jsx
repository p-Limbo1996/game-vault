import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield, Bell, Eye, Lock, Mail, Smartphone, Globe, Key,
  ChevronRight, Moon, Fingerprint, Server
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto px-8 lg:px-12 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <span className="font-heading text-[10px] tracking-[0.3em] text-gold">SYSTEM CONFIG</span>
        <h1 className="font-heading font-bold text-4xl text-foreground mt-1">Settings</h1>
        <p className="text-titanium mt-2">Configure your vault security and preferences.</p>
      </motion.div>

      <div className="space-y-6 mt-8">
        <SettingsGroup icon={Shield} title="Security" subtitle="Vault access and authentication">
          <ToggleRow icon={Lock} label="Two-Factor Authentication" desc="Require OTP on every login" defaultOn />
          <ToggleRow icon={Fingerprint} label="Biometric Unlock" desc="Fingerprint / face ID access" defaultOn />
          <ToggleRow icon={Key} label="Session Auto-Lock" desc="Lock vault after 15 min idle" />
          <ActionRow icon={Shield} label="Change Master Password" desc="Last changed 32 days ago" />
        </SettingsGroup>

        <SettingsGroup icon={Bell} title="Notifications" subtitle="Alerts and communications">
          <ToggleRow icon={Bell} label="Order Updates" desc="Acquisition status changes" defaultOn />
          <ToggleRow icon={Mail} label="Email Alerts" desc="Promotions and flash sales" defaultOn />
          <ToggleRow icon={Smartphone} label="Push Notifications" desc="Mobile vault alerts" />
        </SettingsGroup>

        <SettingsGroup icon={Eye} title="Privacy" subtitle="Data and visibility">
          <ToggleRow icon={Eye} label="Private Profile" desc="Hide activity from other operators" defaultOn />
          <ToggleRow icon={Globe} label="Show Online Status" desc="Display active indicator" />
          <ToggleRow icon={Server} label="Activity Logging" desc="Record vault transaction history" defaultOn />
        </SettingsGroup>

        <SettingsGroup icon={Globe} title="Preferences" subtitle="Interface and display">
          <ActionRow icon={Moon} label="Theme" desc="Cinematic Dark · Default" />
          <ActionRow icon={Globe} label="Language" desc="English" />
          <ToggleRow icon={Eye} label="Reduce Motion" desc="Minimize animations" />
        </SettingsGroup>

        <div className="rounded-[24px] vault-metal p-6 border border-danger/20">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-danger" />
            <span className="font-heading text-xs tracking-[0.2em] text-danger">DANGER ZONE</span>
          </div>
          <p className="text-titanium text-sm mb-4">Irreversible actions affecting your vault account.</p>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-[14px] vault-glass border border-white/10 px-4 py-2.5 font-heading text-xs tracking-wider text-foreground hover:border-white/25 transition-all">EXPORT VAULT DATA</button>
            <button className="rounded-[14px] border border-danger/30 bg-danger/10 px-4 py-2.5 font-heading text-xs tracking-wider text-danger hover:bg-danger/20 transition-all">PURGE ALL DATA</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsGroup({ icon: Icon, title, subtitle, children }) {
  return (
    <div className="rounded-[24px] vault-metal p-6">
      <div className="flex items-start gap-3 mb-5">
        <div className="h-10 w-10 rounded-[12px] vault-glass flex items-center justify-center shrink-0">
          <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
        </div>
        <div>
          <h2 className="font-heading font-semibold text-foreground">{title}</h2>
          <p className="text-titanium text-xs">{subtitle}</p>
        </div>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function ToggleRow({ icon: Icon, label, desc, defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center gap-4 rounded-[16px] vault-glass p-4 hover:border-gold/20 border border-transparent transition-colors">
      <Icon className="h-5 w-5 text-titanium shrink-0" strokeWidth={1.5} />
      <div className="flex-1 min-w-0">
        <p className="font-heading text-sm text-foreground">{label}</p>
        <p className="text-titanium text-xs">{desc}</p>
      </div>
      <button onClick={() => setOn(!on)} className={cn("relative h-7 w-12 rounded-full transition-all duration-300 shrink-0",
        on ? "bg-gradient-to-r from-gold to-gold-hover glow-gold" : "bg-white/10")}>
        <motion.span layout transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={cn("absolute top-1 h-5 w-5 rounded-full shadow-md", on ? "left-6 bg-void" : "left-1 bg-foreground")} />
      </button>
    </div>
  );
}

function ActionRow({ icon: Icon, label, desc }) {
  return (
    <button className="w-full flex items-center gap-4 rounded-[16px] vault-glass p-4 hover:border-gold/20 border border-transparent transition-colors text-left">
      <Icon className="h-5 w-5 text-titanium shrink-0" strokeWidth={1.5} />
      <div className="flex-1 min-w-0">
        <p className="font-heading text-sm text-foreground">{label}</p>
        <p className="text-titanium text-xs">{desc}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-titanium shrink-0" />
    </button>
  );
}