import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Eye, ShoppingCart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import PlatformBadge, {
  getPlatformConfig,
} from "@/components/vault/PlatformBadge";
import VaultBadge from "@/components/vault/VaultBadge";

export default function ProductCard({ product, index = 0 }) {
  const [wished, setWished] = useState(false);
  const cfg = getPlatformConfig(product.platform);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-[28px] vault-metal transition-all duration-500 group-hover:glow-gold group-hover:-translate-y-1.5">
          {/* Screws */}
          <span className="absolute top-2.5 left-2.5 z-20 h-1.5 w-1.5 rounded-full bg-gradient-to-br from-titanium/40 to-black/60 shadow-inner" />
          <span className="absolute top-2.5 right-2.5 z-20 h-1.5 w-1.5 rounded-full bg-gradient-to-br from-titanium/40 to-black/60 shadow-inner" />

          {/* Cover */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={product.cover_image}
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />

            {/* Top badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
              {product.is_flash_sale && (
                <VaultBadge tone="danger">⚡ FLASH</VaultBadge>
              )}
              {product.discount_percent > 0 && (
                <VaultBadge tone="gold">
                  -{product.discount_percent}%
                </VaultBadge>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setWished(!wished);
              }}
              className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full vault-glass flex items-center justify-center transition-all hover:scale-110"
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-colors",
                  wished ? "fill-danger text-danger" : "text-foreground/70",
                )}
              />
            </button>

            {/* Platform badge */}
            <div className="absolute bottom-3 left-3 z-10">
              <PlatformBadge platform={product.platform} />
            </div>

            {/* Quick actions overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3 z-10 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <button className="flex-1 h-10 rounded-[14px] vault-glass border-gold/30 flex items-center justify-center gap-1.5 text-gold hover:bg-gold/15 transition-colors">
                <Eye className="h-4 w-4" />{" "}
                <span className="font-heading text-[10px] tracking-wider">
                  QUICK VIEW
                </span>
              </button>
              <button className="h-10 w-10 rounded-[14px] bg-gradient-to-b from-gold-light to-gold text-void flex items-center justify-center hover:brightness-110 transition">
                <ShoppingCart className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="p-4 pt-3">
            <p className="font-heading text-[9px] tracking-[0.25em] text-titanium/70 mb-1">
              {product.genre || product.category}
            </p>
            <h3 className="font-heading font-semibold text-sm text-foreground leading-tight line-clamp-1 group-hover:text-gold transition-colors">
              {product.title}
            </h3>

            <div className="flex items-center gap-1.5 mt-2">
              <Star className="h-3.5 w-3.5 fill-gold text-gold" />
              <span className="font-num text-xs text-foreground/80">
                {product.rating?.toFixed(1) || "—"}
              </span>
              <span className="text-[10px] text-titanium">
                ({product.review_count || 0})
              </span>
              <span
                className={cn(
                  "ml-auto text-[10px] font-heading tracking-wide",
                  product.availability === "In Stock"
                    ? "text-success"
                    : product.availability === "Limited"
                      ? "text-gold"
                      : product.availability === "Pre-Order"
                        ? "text-playstation"
                        : "text-danger",
                )}
              >
                {product.availability}
              </span>
            </div>

            <div className="flex items-end justify-between mt-3 pt-3 border-t border-white/[0.06]">
              <div className="flex items-baseline gap-2">
                <span className="font-num font-bold text-lg text-foreground">
                  ${product.price?.toFixed(2)}
                </span>
                {product.original_price > product.price && (
                  <span className="font-num text-xs text-titanium line-through">
                    ${product.original_price?.toFixed(2)}
                  </span>
                )}
              </div>
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  product.stock > 5
                    ? "bg-success"
                    : product.stock > 0
                      ? "bg-gold"
                      : "bg-danger",
                )}
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
