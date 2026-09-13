import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import VaultButton from "@/components/vault/VaultButton";
import { useVault } from "@/lib/vaultStore";
import { cn } from "@/lib/utils";

export default function Cart() {
  const { cart, removeFromCart, setQty, cartTotal, cartCount } = useVault();

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-8 py-24 text-center">
        <div className="relative rounded-[28px] vault-metal p-16 overflow-hidden">
          <div className="absolute inset-0 vault-scanlines opacity-20" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="h-20 w-20 rounded-full border-2 border-dashed border-gold/30 flex items-center justify-center animate-spin-slow" style={{ animationDuration: "6s" }}>
              <ShoppingBag className="h-8 w-8 text-gold/60" />
            </div>
            <p className="font-heading text-sm tracking-[0.2em] text-gold mt-6 animate-pulse-glow">SCANNING VAULT...</p>
            <h2 className="font-heading font-bold text-2xl text-foreground mt-2">No Items Yet</h2>
            <p className="text-titanium mt-1 mb-6">Your acquisition cart is empty.</p>
            <Link to="/store"><VaultButton>Browse Arsenal <ArrowRight className="h-4 w-4" /></VaultButton></Link>
          </div>
        </div>
      </div>
    );
  }

  const tax = cartTotal * 0.08;
  const total = cartTotal + tax;

  return (
    <div className="max-w-7xl mx-auto px-8 lg:px-12 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <span className="font-heading text-[10px] tracking-[0.3em] text-gold">ACQUISITION CART</span>
        <h1 className="font-heading font-bold text-4xl text-foreground mt-1">Your Cart</h1>
        <p className="text-titanium mt-2">{cartCount} secured assets queued for acquisition.</p>
      </motion.div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8 mt-8">
        {/* Items */}
        <div className="space-y-3">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-[20px] vault-metal p-4 flex items-center gap-4 hover:glow-gold transition-all"
              >
                <Link to={`/product/${item.id}`} className="relative h-20 w-20 rounded-[14px] overflow-hidden shrink-0">
                  <img src={item.cover_image} alt={item.title} className="h-full w-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <p className="font-heading text-[9px] tracking-[0.2em] text-titanium">{item.platform?.toUpperCase()}</p>
                  <h3 className="font-heading font-semibold text-foreground truncate">{item.title}</h3>
                  <p className="font-num text-gold font-bold mt-1">${item.price?.toFixed(2)}</p>
                </div>
                <div className="flex items-center rounded-[14px] vault-glass overflow-hidden">
                  <button onClick={() => setQty(item.id, item.qty - 1)} className="h-10 w-10 flex items-center justify-center text-titanium hover:text-gold"><Minus className="h-3.5 w-3.5" /></button>
                  <span className="font-num font-bold w-8 text-center">{item.qty}</span>
                  <button onClick={() => setQty(item.id, item.qty + 1)} className="h-10 w-10 flex items-center justify-center text-titanium hover:text-gold"><Plus className="h-3.5 w-3.5" /></button>
                </div>
                <div className="text-right">
                  <p className="font-num font-bold text-foreground">${(item.price * item.qty).toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item.id)} className="text-titanium hover:text-danger transition-colors mt-1"><Trash2 className="h-4 w-4" /></button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-12 h-fit">
          <div className="rounded-[24px] vault-metal p-6">
            <span className="font-heading text-[10px] tracking-[0.25em] text-titanium">SUMMARY</span>
            <div className="mt-4 space-y-3">
              <Row label="Subtotal" value={`$${cartTotal.toFixed(2)}`} />
              <Row label="Vault Tax (8%)" value={`$${tax.toFixed(2)}`} />
              <Row label="Delivery" value={<span className="text-success font-heading text-xs">INSTANT</span>} />
              <div className="h-px bg-white/[0.06] my-3" />
              <div className="flex items-center justify-between">
                <span className="font-heading text-sm text-foreground">TOTAL</span>
                <span className="font-num font-black text-2xl text-gold">${total.toFixed(2)}</span>
              </div>
            </div>
            <Link to="/checkout">
              <VaultButton size="lg" className="w-full mt-5 group">
                Proceed to Checkout <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </VaultButton>
            </Link>
            <div className="flex items-center justify-center gap-2 mt-4 text-titanium/70">
              <ShieldCheck className="h-4 w-4 text-success" />
              <span className="font-heading text-[9px] tracking-wider">256-BIT ENCRYPTED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-titanium">{label}</span>
      <span className="font-num text-foreground">{value}</span>
    </div>
  );
}