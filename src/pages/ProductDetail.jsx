import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star, Heart, Share2, ShoppingCart, ChevronLeft, Check, Cpu,
  HardDrive, Monitor, MemoryStick, Gamepad2, Minus, Plus
} from "lucide-react";
import { base44 } from "@/api/base44Client";
import PlatformBadge, { getPlatformConfig } from "@/components/vault/PlatformBadge";
import VaultButton from "@/components/vault/VaultButton";
import VaultBadge from "@/components/vault/VaultBadge";
import GearLoader from "@/components/vault/GearLoader";
import ProductCard from "@/components/vault/ProductCard";
import { useVault } from "@/lib/vaultStore";
import { cn } from "@/lib/utils";

const tabs = ["Description", "Features", "Requirements", "Reviews"];

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("Description");
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const { addToCart, toggleWishlist, isInWishlist, addRecent } = useVault();

  useEffect(() => {
    setLoading(true);
    base44.entities.Product.get(id)
      .then(p => {
        setProduct(p);
        if (p) addRecent(p);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center py-40"><GearLoader size={80} label="LOADING ASSET DOSSIER" /></div>
  );
  if (!product) return <div className="py-40 text-center text-titanium">Asset not found in vault.</div>;

  const cfg = getPlatformConfig(product.platform);
  const gallery = product.gallery?.length ? product.gallery : [product.cover_image];
  const wished = isInWishlist(product.id);

  return (
    <div className="max-w-7xl mx-auto px-8 lg:px-12 py-10">
      {/* Breadcrumb */}
      <Link to="/store" className="inline-flex items-center gap-2 text-titanium hover:text-gold transition-colors mb-6 font-heading text-xs tracking-wider">
        <ChevronLeft className="h-4 w-4" /> BACK TO ARSENAL
      </Link>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="relative rounded-[28px] vault-metal overflow-hidden group" style={{ perspective: "1000px" }}>
            {[0, 1, 2, 3].map(i => (
              <span key={i} className="absolute z-20 h-2 w-2 rounded-full bg-gradient-to-br from-titanium/50 to-black/70 shadow-inner"
                style={{ top: i < 2 ? "12px" : "auto", bottom: i >= 2 ? "12px" : "auto", left: i % 2 === 0 ? "12px" : "auto", right: i % 2 === 1 ? "12px" : "auto" }} />
            ))}
            <div className="relative aspect-square overflow-hidden">
              <motion.img
                key={activeImg}
                initial={{ opacity: 0.5, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                src={gallery[activeImg]}
                alt={product.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
              <div className="absolute top-4 left-4"><PlatformBadge platform={product.platform} /></div>
              {product.discount_percent > 0 && (
                <div className="absolute top-4 right-4"><VaultBadge tone="gold">-{product.discount_percent}%</VaultBadge></div>
              )}
            </div>
          </div>

          {/* Thumbnails */}
          {gallery.length > 1 && (
            <div className="flex gap-3 mt-4">
              {gallery.map((g, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={cn("relative h-20 w-20 rounded-[14px] overflow-hidden border-2 transition-all",
                    activeImg === i ? "border-gold glow-gold" : "border-white/10 opacity-60 hover:opacity-100")}>
                  <img src={g} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-heading text-[10px] tracking-[0.3em] text-gold mb-2">{product.category.toUpperCase()}</p>
          <h1 className="font-heading font-black text-4xl md:text-5xl text-foreground leading-tight">{product.title}</h1>
          {product.subtitle && <p className="text-titanium mt-2 text-lg">{product.subtitle}</p>}

          {/* Rating */}
          <div className="flex items-center gap-3 mt-4">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(s => (
                <Star key={s} className={cn("h-4 w-4", s <= Math.round(product.rating || 0) ? "fill-gold text-gold" : "text-titanium/30")} />
              ))}
            </div>
            <span className="font-num text-sm text-foreground">{product.rating?.toFixed(1)}</span>
            <span className="text-sm text-titanium">· {product.review_count} reviews</span>
          </div>

          {/* Spec grid */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <SpecItem label="Publisher" value={product.publisher || "—"} />
            <SpecItem label="Developer" value={product.developer || "—"} />
            <SpecItem label="Release Date" value={product.release_date || "—"} />
            <SpecItem label="Genre" value={product.genre || "—"} />
          </div>

          {/* Price */}
          <div className="mt-6 rounded-[20px] vault-metal p-5">
            <div className="flex items-end gap-3">
              <span className="font-num font-black text-4xl text-gold">${product.price?.toFixed(2)}</span>
              {product.original_price > product.price && (
                <span className="font-num text-lg text-titanium line-through mb-1">${product.original_price?.toFixed(2)}</span>
              )}
              {product.discount_percent > 0 && (
                <VaultBadge tone="gold" className="mb-2">SAVE {product.discount_percent}%</VaultBadge>
              )}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className={cn("h-2 w-2 rounded-full",
                product.availability === "In Stock" ? "bg-success" :
                product.availability === "Limited" ? "bg-gold" :
                product.availability === "Pre-Order" ? "bg-playstation" : "bg-danger")} />
              <span className="font-heading text-xs tracking-wider text-foreground">{product.availability}</span>
              <span className="text-titanium text-xs">· {product.stock} units in vault</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-5">
            <div className="flex items-center rounded-[18px] vault-metal overflow-hidden">
              <button onClick={() => setQty(q => Math.max(1, q-1))} className="h-14 w-12 flex items-center justify-center text-titanium hover:text-gold transition-colors"><Minus className="h-4 w-4" /></button>
              <span className="font-num font-bold text-lg w-10 text-center">{qty}</span>
              <button onClick={() => setQty(q => q+1)} className="h-14 w-12 flex items-center justify-center text-titanium hover:text-gold transition-colors"><Plus className="h-4 w-4" /></button>
            </div>
            <VaultButton size="lg" className="flex-1" onClick={() => { for (let i=0;i<qty;i++) addToCart(product); }}>
              <ShoppingCart className="h-5 w-5" /> ADD TO CART
            </VaultButton>
            <button onClick={() => toggleWishlist(product)}
              className={cn("h-14 w-14 shrink-0 rounded-[18px] vault-glass border flex items-center justify-center transition-all",
                wished ? "border-danger/40 text-danger" : "border-white/10 text-titanium hover:text-foreground")}>
              <Heart className={cn("h-5 w-5", wished && "fill-danger")} />
            </button>
            <button className="h-14 w-14 shrink-0 rounded-[18px] vault-glass border border-white/10 flex items-center justify-center text-titanium hover:text-foreground transition-all">
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 mt-5">
            {[
              { icon: Cpu, label: "INSTANT DELIVERY" },
              { icon: Check, label: "VERIFIED SECURE" },
              { icon: HardDrive, label: "CLOUD BACKUP" },
            ].map(b => {
              const Icon = b.icon;
              return (
                <div key={b.label} className="flex flex-col items-center gap-2 rounded-[14px] vault-glass py-3">
                  <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                  <span className="font-heading text-[8px] tracking-[0.15em] text-titanium text-center">{b.label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="flex gap-2 border-b border-white/[0.06] mb-6 overflow-x-auto">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={cn("relative px-5 h-12 font-heading text-xs tracking-wider transition-colors whitespace-nowrap",
                tab === t ? "text-gold" : "text-titanium hover:text-foreground")}>
              {t.toUpperCase()}
              {tab === t && <motion.span layoutId="prod-tab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold glow-gold" />}
            </button>
          ))}
        </div>

        <div className="rounded-[24px] vault-metal p-8 min-h-[200px]">
          {tab === "Description" && (
            <p className="text-titanium leading-relaxed text-[15px]">{product.description || "No description available for this asset."}</p>
          )}
          {tab === "Features" && (
            <ul className="space-y-3">
              {(product.features || ["Premium digital asset", "Instant vault delivery", "Lifetime cloud backup", "Multi-platform support", "24/7 secure support"]).map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="h-6 w-6 rounded-md bg-gold/15 flex items-center justify-center"><Check className="h-3.5 w-3.5 text-gold" /></span>
                  <span className="text-foreground/90">{f}</span>
                </li>
              ))}
            </ul>
          )}
          {tab === "Requirements" && (
            <div className="grid md:grid-cols-2 gap-6">
              <ReqBlock title="Minimum" icon={Monitor} req={product.min_requirements || "OS: Windows 10 · CPU: Quad-core · RAM: 8GB · GPU: 4GB VRAM · Storage: 50GB"} />
              <ReqBlock title="Recommended" icon={Cpu} req={product.rec_requirements || "OS: Windows 11 · CPU: Octa-core · RAM: 16GB · GPU: 8GB VRAM · Storage: 50GB SSD"} />
            </div>
          )}
          {tab === "Reviews" && (
            <div className="space-y-4">
              {[
                { name: "Operator_K7", rating: 5, text: "Flawless delivery. Vault unlocked in seconds. Premium experience top to bottom." },
                { name: "GhostByte", rating: 5, text: "The most secure acquisition platform I've used. Worth every credit." },
                { name: "NovaStrike", rating: 4, text: "Great asset, smooth transaction. Delivery was instant." },
              ].map((r, i) => (
                <div key={i} className="rounded-[16px] vault-glass p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-heading text-sm text-foreground">{r.name}</span>
                    <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} className={cn("h-3.5 w-3.5", s <= r.rating ? "fill-gold text-gold" : "text-titanium/30")} />)}</div>
                  </div>
                  <p className="text-titanium text-sm">{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      <RelatedProducts currentId={product.id} category={product.category} platform={product.platform} />
    </div>
  );
}

function SpecItem({ label, value }) {
  return (
    <div className="rounded-[14px] vault-glass px-4 py-3">
      <p className="font-heading text-[9px] tracking-[0.2em] text-titanium/70">{label.toUpperCase()}</p>
      <p className="text-sm text-foreground mt-0.5">{value}</p>
    </div>
  );
}

function ReqBlock({ title, icon: Icon, req }) {
  return (
    <div className="rounded-[16px] vault-glass p-5">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="h-4 w-4 text-gold" />
        <span className="font-heading text-xs tracking-wider text-foreground">{title.toUpperCase()}</span>
      </div>
      <pre className="text-titanium text-sm whitespace-pre-wrap font-body leading-relaxed">{req}</pre>
    </div>
  );
}

function RelatedProducts({ currentId, category, platform }) {
  const [items, setItems] = useState(null);
  useEffect(() => {
    base44.entities.Product.list("-created_date", 50).then(all => {
      setItems(all.filter(p => p.id !== currentId && (p.category === category || p.platform === platform)).slice(0, 5));
    });
  }, [currentId, category, platform]);

  if (!items?.length) return null;
  return (
    <div className="mt-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-6">Related Assets</h2>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </div>
  );
}