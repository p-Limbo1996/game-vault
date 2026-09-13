import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Zap, TrendingUp, Flame, Star, ChevronRight,
  Gamepad2, HardDrive, Headphones, Keyboard, Mouse, Gift,
  CreditCard, Server, ShieldCheck, Cpu
} from "lucide-react";
import { base44 } from "@/api/base44Client";
import ProductCard from "@/components/vault/ProductCard";
import VaultButton from "@/components/vault/VaultButton";
import GearLoader from "@/components/vault/GearLoader";

const categories = [
  { name: "PC Games", icon: Gamepad2, count: "2,480" },
  { name: "PlayStation Games", icon: Gamepad2, count: "1,920" },
  { name: "Xbox Games", icon: Gamepad2, count: "1,640" },
  { name: "Nintendo Games", icon: Gamepad2, count: "980" },
  { name: "Steam Wallet", icon: CreditCard, count: "12" },
  { name: "Gift Cards", icon: Gift, count: "48" },
  { name: "Gaming Accounts", icon: ShieldCheck, count: "320" },
  { name: "Gaming Consoles", icon: HardDrive, count: "24" },
  { name: "Controllers", icon: Gamepad2, count: "86" },
  { name: "Gaming Headsets", icon: Headphones, count: "112" },
  { name: "Mechanical Keyboards", icon: Keyboard, count: "74" },
  { name: "Gaming Mouse", icon: Mouse, count: "98" },
  { name: "Gaming Accessories", icon: Cpu, count: "210" },
  { name: "Digital Products", icon: HardDrive, count: "540" },
  { name: "DNS Services", icon: Server, count: "18" },
];

export default function Home() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    base44.entities.Product.list("-created_date", 50)
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  const featured = products?.filter(p => p.is_featured) || [];
  const trending = products?.filter(p => p.is_trending) || [];
  const flash = products?.filter(p => p.is_flash_sale) || [];
  const recommended = products?.slice(0, 8) || [];

  return (
    <div className="pb-20">
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://media.base44.com/images/public/6a66186ca15773e0916f168d/6428da4d2_generated_0af383b5.png"
            alt="VaultOS sanctum"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-void via-void/70 to-void/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full vault-glass px-4 py-2 mb-6">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse-glow" />
              <span className="font-heading text-[10px] tracking-[0.3em] text-titanium">SECURE TERMINAL ONLINE</span>
            </div>

            <h1 className="font-heading font-black leading-[0.95] text-5xl md:text-7xl lg:text-8xl">
              <span className="block text-metal-gradient">BUILD YOUR</span>
              <span className="block text-gold-gradient">ULTIMATE SETUP</span>
            </h1>

            <p className="mt-6 text-lg text-titanium max-w-lg leading-relaxed">
              Access a sovereign digital stronghold of premium games, consoles, and gear.
              Every acquisition is a secured transaction, verified and delivered to your vault.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/store">
                <VaultButton size="lg" className="group">
                  Enter Store
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </VaultButton>
              </Link>
              <Link to="/categories">
                <VaultButton size="lg" variant="ghost">
                  Browse Arsenal
                </VaultButton>
              </Link>
            </div>

            <div className="mt-12 flex gap-8">
              {[
                { val: "15K+", label: "ASSETS" },
                { val: "98.7%", label: "UPTIME" },
                { val: "0.4s", label: "DELIVERY" },
              ].map(s => (
                <div key={s.label}>
                  <p className="font-num font-bold text-3xl text-gold">{s.val}</p>
                  <p className="font-heading text-[9px] tracking-[0.25em] text-titanium mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <Section>
        <SectionHeader icon={Cpu} eyebrow="ARSENAL INDEX" title="Categories" subtitle="Every asset class, secured in the vault." />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.03 }}
              >
                <Link to={`/store?category=${encodeURIComponent(cat.name)}`}>
                  <div className="group relative h-full rounded-[20px] vault-metal p-5 hover:glow-gold hover:-translate-y-1 transition-all duration-500">
                    <div className="flex items-start justify-between mb-3">
                      <div className="h-10 w-10 rounded-xl vault-glass flex items-center justify-center group-hover:bg-gold/15 transition-colors">
                        <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                      </div>
                      <ChevronRight className="h-4 w-4 text-titanium/40 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="font-heading text-xs font-semibold text-foreground leading-tight">{cat.name}</h3>
                    <p className="font-num text-xs text-titanium mt-1">{cat.count} items</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* FLASH SALE */}
      {flash.length > 0 && (
        <Section>
          <div className="relative rounded-[28px] vault-metal overflow-hidden p-8 lg:p-10">
            <div className="absolute inset-0 bg-gradient-to-r from-danger/10 to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Flame className="h-6 w-6 text-danger animate-pulse-glow" />
                <h2 className="font-heading font-bold text-2xl text-foreground">FLASH SALE</h2>
                <VaultTimer />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {flash.slice(0, 5).map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* FEATURED */}
      <Section>
        <SectionHeader icon={Star} eyebrow="CURATED" title="Featured Assets" subtitle="Hand-selected premium acquisitions." to="/store" />
        <ProductGrid products={featured} loading={!products} count={5} />
      </Section>

      {/* TRENDING */}
      <Section>
        <SectionHeader icon={TrendingUp} eyebrow="LIVE DATA" title="Trending Now" subtitle="Most acquired assets this cycle." to="/store" />
        <ProductGrid products={trending} loading={!products} count={5} />
      </Section>

      {/* RECOMMENDED */}
      <Section>
        <SectionHeader icon={Zap} eyebrow="AI MATCH" title="Recommended" subtitle="Calibrated to your acquisition profile." to="/store" />
        <ProductGrid products={recommended} loading={!products} count={4} />
      </Section>
    </div>
  );
}

function Section({ children }) {
  return (
    <section className="max-w-7xl mx-auto px-8 lg:px-12 py-14">
      {children}
    </section>
  );
}

function SectionHeader({ icon: Icon, eyebrow, title, subtitle, to }) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <div className="flex items-center gap-2 mb-2">
          {Icon && <Icon className="h-4 w-4 text-gold" strokeWidth={1.5} />}
          <span className="font-heading text-[10px] tracking-[0.3em] text-gold">{eyebrow}</span>
        </div>
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">{title}</h2>
        {subtitle && <p className="text-titanium mt-1">{subtitle}</p>}
      </div>
      {to && (
        <Link to={to}>
          <VaultButton variant="ghost" size="sm" className="group">
            View All <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </VaultButton>
        </Link>
      )}
    </div>
  );
}

function ProductGrid({ products, loading, count }) {
  const cols = count === 4 ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-2 lg:grid-cols-5";
  if (loading) {
    return (
      <div className={`grid ${cols} gap-4`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="aspect-[3/4] rounded-[28px] vault-metal animate-pulse-glow" />
        ))}
      </div>
    );
  }
  return (
    <div className={`grid ${cols} gap-4`}>
      {products.slice(0, count).map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} />
      ))}
    </div>
  );
}

function VaultTimer() {
  const [t, setT] = useState({ h: 5, m: 42, s: 18 });
  useEffect(() => {
    const id = setInterval(() => {
      setT(prev => {
        let { h, m, s } = prev;
        s--; if (s < 0) { s = 59; m--; } if (m < 0) { m = 59; h--; } if (h < 0) { h = 5; m = 42; s = 18; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex items-center gap-1.5">
      {[t.h, t.m, t.s].map((v, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="font-num font-bold text-lg text-danger bg-danger/10 rounded-md px-2 py-1 tabular-nums">
            {String(v).padStart(2, "0")}
          </span>
          {i < 2 && <span className="text-danger/50">:</span>}
        </span>
      ))}
    </div>
  );
}