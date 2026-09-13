import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, ShoppingBag, ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import VaultButton from "@/components/vault/VaultButton";
import GearLoader from "@/components/vault/GearLoader";
import ProductCard from "@/components/vault/ProductCard";
import { useVault } from "@/lib/vaultStore";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useVault();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    if (wishlist.length === 0) { setProducts([]); return; }
    base44.entities.Product.list("-created_date", 100).then(all => {
      setProducts(all.filter(p => wishlist.some(w => w.id === p.id)));
    });
  }, [wishlist]);

  return (
    <div className="max-w-7xl mx-auto px-8 lg:px-12 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <span className="font-heading text-[10px] tracking-[0.3em] text-gold">SAVED ASSETS</span>
        <h1 className="font-heading font-bold text-4xl text-foreground mt-1">Wishlist</h1>
        <p className="text-titanium mt-2">{wishlist.length} assets secured for future acquisition.</p>
      </motion.div>

      {!products ? (
        <div className="flex justify-center py-32"><GearLoader label="ACCESSING WISHLIST" /></div>
      ) : products.length === 0 ? (
        <div className="relative rounded-[28px] vault-metal p-16 text-center overflow-hidden mt-8">
          <div className="absolute inset-0 vault-scanlines opacity-20" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="h-20 w-20 rounded-full border-2 border-dashed border-gold/30 flex items-center justify-center animate-spin-slow" style={{ animationDuration: "6s" }}>
              <Heart className="h-8 w-8 text-gold/60" />
            </div>
            <p className="font-heading text-sm tracking-[0.2em] text-gold mt-6 animate-pulse-glow">SCANNING VAULT...</p>
            <h2 className="font-heading font-bold text-2xl text-foreground mt-2">No Saved Assets</h2>
            <p className="text-titanium mt-1 mb-6">Mark assets to track them here.</p>
            <Link to="/store"><VaultButton>Find Assets <ArrowRight className="h-4 w-4" /></VaultButton></Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          <AnimatePresence>
            {products.map((p, i) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}>
                <div className="relative">
                  <ProductCard product={p} index={i} />
                  <button onClick={() => toggleWishlist(p)} className="absolute -top-2 -right-2 z-30 h-9 w-9 rounded-full bg-danger/90 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}