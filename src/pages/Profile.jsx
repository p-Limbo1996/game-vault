import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy, Star, Zap, ShoppingBag, Gamepad2, Cpu, Award,
  TrendingUp, Shield, ChevronRight, Edit
} from "lucide-react";
import { base44 } from "@/api/base44Client";
import VaultBadge from "@/components/vault/VaultBadge";
import { cn } from "@/lib/utils";

const platforms = [
  { name: "Steam", id: "76561198v4ult0s", level: 42, color: "text-steam", icon: "🎮" },
  { name: "PlayStation", id: "VAULT-PSN-XX7", level: 38, color: "text-playstation", icon: "🔵" },
  { name: "Xbox", id: "VaultosGTX", level: 31, color: "text-xbox", icon: "🟢" },
  { name: "Epic", id: "vaultos.epic", level: 27, color: "text-titanium", icon: "◆" },
];

const achievements = [
  { name: "First Acquisition", icon: "🏆", rarity: "Common", desc: "Complete your first order" },
  { name: "Vault Keeper", icon: "🔒", rarity: "Rare", desc: "10 successful orders" },
  { name: "Cyber Collector", icon: "💎", rarity: "Epic", desc: "Own 25 digital assets" },
  { name: "Speed Operator", icon: "⚡", rarity: "Legendary", desc: "Checkout under 30s" },
  { name: "Gear Master", icon: "🎛️", rarity: "Epic", desc: "Own 5 hardware items" },
  { name: "Loyal Vault", icon: "🛡️", rarity: "Rare", desc: "1 year membership" },
];

const rarityTone = {
  Common: "text-titanium border-titanium/30",
  Rare: "text-playstation border-playstation/30",
  Epic: "text-steam border-steam/30",
  Legendary: "text-gold border-gold/30",
};

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser({ full_name: "Vault Operator", email: "operator@vaultos.io" }));
  }, []);

  const xp = 7840;
  const xpMax = 10000;
  const level = 47;

  return (
    <div className="max-w-6xl mx-auto px-8 lg:px-12 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <span className="font-heading text-[10px] tracking-[0.3em] text-gold">OPERATOR IDENTITY</span>
        <h1 className="font-heading font-bold text-4xl text-foreground mt-1">Profile</h1>
      </motion.div>

      {/* Identity Card */}
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative rounded-[28px] vault-metal overflow-hidden mt-8">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold-hover to-gold" />
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gold/10 blur-[100px]" />

        <div className="relative z-10 p-8 grid md:grid-cols-[auto_1fr] gap-8 items-center">
          {/* Avatar with level ring */}
          <div className="relative h-32 w-32 shrink-0 mx-auto md:mx-0">
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
              <motion.circle
                cx="50" cy="50" r="46" fill="none" stroke="#D89C42" strokeWidth="3" strokeLinecap="round"
                strokeDasharray={`${(xp/xpMax)*289} 289`}
                initial={{ strokeDashoffset: 289 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{ filter: "drop-shadow(0 0 6px rgba(216,156,66,0.6))" }}
              />
            </svg>
            <div className="absolute inset-3 rounded-full bg-gradient-to-br from-void to-surface border border-gold/20 flex items-center justify-center">
              <span className="font-heading font-black text-4xl text-gold-gradient">{user?.full_name?.[0] || "V"}</span>
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gold text-void font-heading font-bold text-xs tracking-wider glow-gold">
              LVL {level}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="font-heading font-black text-3xl text-foreground">{user?.full_name || "Vault Operator"}</h2>
              <VaultBadge tone="gold"><Shield className="h-3 w-3" /> VERIFIED</VaultBadge>
              <VaultBadge tone="success">VIP MEMBER</VaultBadge>
            </div>
            <p className="text-titanium mt-1">{user?.email || "operator@vaultos.io"}</p>

            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-heading tracking-wider text-titanium">EXPERIENCE</span>
                <span className="font-num text-gold">{xp.toLocaleString()} / {xpMax.toLocaleString()} XP</span>
              </div>
              <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${(xp/xpMax)*100}%` }} transition={{ duration: 1.4, ease: "easeOut" }} className="h-full bg-gradient-to-r from-gold to-gold-hover rounded-full glow-gold" />
              </div>
              <p className="text-titanium text-xs mt-1.5">{(xpMax - xp).toLocaleString()} XP until Level {level + 1}</p>
            </div>

            <button className="mt-4 inline-flex items-center gap-2 rounded-[14px] vault-glass border border-white/10 px-4 py-2 text-titanium hover:text-foreground hover:border-gold/30 transition-all">
              <Edit className="h-4 w-4" /> <span className="font-heading text-xs tracking-wider">EDIT IDENTITY</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        {[
          { icon: ShoppingBag, label: "ORDERS", value: "28", tone: "text-gold" },
          { icon: Gamepad2, label: "ASSETS", value: "156", tone: "text-foreground" },
          { icon: Trophy, label: "ACHIEVEMENTS", value: "12", tone: "text-success" },
          { icon: Zap, label: "VAULT RANK", value: "#1,284", tone: "text-playstation" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i*0.05 }} className="rounded-[20px] vault-metal p-5">
              <Icon className={cn("h-5 w-5", s.tone)} strokeWidth={1.5} />
              <p className="font-num font-bold text-2xl text-foreground mt-3">{s.value}</p>
              <p className="font-heading text-[9px] tracking-[0.2em] text-titanium mt-0.5">{s.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        {/* Gaming Accounts */}
        <SectionCard icon={Cpu} title="Gaming Accounts">
          <div className="space-y-2">
            {platforms.map(p => (
              <div key={p.name} className="flex items-center gap-3 rounded-[14px] vault-glass p-4 hover:border-gold/20 border border-transparent transition-colors">
                <div className="h-10 w-10 rounded-lg vault-metal flex items-center justify-center text-lg">{p.icon}</div>
                <div className="flex-1">
                  <p className={cn("font-heading font-semibold text-sm", p.color)}>{p.name}</p>
                  <p className="text-titanium text-xs font-num">{p.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-num font-bold text-foreground">LVL {p.level}</p>
                  <ChevronRight className="h-4 w-4 text-titanium ml-auto mt-1" />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Achievements */}
        <SectionCard icon={Award} title="Achievements">
          <div className="grid grid-cols-2 gap-3">
            {achievements.map(a => (
              <div key={a.name} className="rounded-[14px] vault-glass p-4 hover:glow-gold transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{a.icon}</span>
                  <span className={cn("font-heading text-[8px] tracking-wider border px-1.5 py-0.5 rounded", rarityTone[a.rarity])}>{a.rarity.toUpperCase()}</span>
                </div>
                <p className="font-heading font-semibold text-xs text-foreground leading-tight">{a.name}</p>
                <p className="text-titanium text-[10px] mt-1">{a.desc}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Personal Info */}
      <SectionCard icon={Star} title="Personal Information" className="mt-6">
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { label: "Full Name", value: user?.full_name || "Vault Operator" },
            { label: "Email", value: user?.email || "operator@vaultos.io" },
            { label: "Member Since", value: "Jan 2024" },
            { label: "Membership Tier", value: "Vault Platinum" },
          ].map(info => (
            <div key={info.label} className="rounded-[14px] vault-glass p-4">
              <p className="font-heading text-[9px] tracking-[0.2em] text-titanium/70">{info.label.toUpperCase()}</p>
              <p className="text-foreground mt-1">{info.value}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function SectionCard({ icon: Icon, title, children, className }) {
  return (
    <div className={cn("rounded-[24px] vault-metal p-6", className)}>
      <div className="flex items-center gap-2 mb-4">
        <Icon className="h-4 w-4 text-gold" strokeWidth={1.5} />
        <span className="font-heading text-xs tracking-[0.2em] text-foreground">{title.toUpperCase()}</span>
      </div>
      {children}
    </div>
  );
}