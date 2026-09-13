import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home, Store, LayoutGrid, Heart, Package, Download,
  MessageSquare, Bell, User, Settings, LogOut, ChevronRight, ShoppingCart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useVault } from "@/lib/vaultStore";

const navSections = [
  { group: "NAVIGATION", items: [
    { label: "Home", icon: Home, path: "/" },
    { label: "Store", icon: Store, path: "/store" },
    { label: "Categories", icon: LayoutGrid, path: "/categories" },
  ]},
  { group: "OPERATIONS", items: [
    { label: "Cart", icon: ShoppingCart, path: "/cart", badge: true },
    { label: "Wishlist", icon: Heart, path: "/wishlist" },
    { label: "Orders", icon: Package, path: "/orders" },
    { label: "Downloads", icon: Download, path: "/downloads" },
    { label: "Messages", icon: MessageSquare, path: "/messages" },
    { label: "Notifications", icon: Bell, path: "/notifications" },
  ]},
  { group: "ACCOUNT", items: [
    { label: "Profile", icon: User, path: "/profile" },
    { label: "Settings", icon: Settings, path: "/settings" },
  ]},
];

export default function Sidebar({ expanded, setExpanded }) {
  const location = useLocation();
  const { cartCount } = useVault();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen flex flex-col vault-glass border-r border-white/[0.06] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        expanded ? "w-60" : "w-[76px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="relative h-9 w-9 shrink-0 rounded-lg vault-metal flex items-center justify-center glow-gold">
            <span className="font-heading font-black text-gold text-sm">V</span>
          </div>
          {expanded && (
            <div className="flex flex-col leading-none animate-boot-in">
              <span className="font-heading font-bold text-foreground tracking-[0.2em] text-sm">VAULTOS</span>
              <span className="font-heading text-[8px] tracking-[0.35em] text-titanium mt-0.5">TERMINAL v2.6</span>
            </div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 space-y-6">
        {navSections.map((section) => (
          <div key={section.group} className="space-y-1">
            {expanded && (
              <p className="px-3 mb-1 font-heading text-[9px] tracking-[0.3em] text-titanium/60">
                {section.group}
              </p>
            )}
            {section.items.map((item) => {
              const active = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-xl px-3 h-11 transition-all duration-300",
                    active
                      ? "vault-metal text-gold"
                      : "text-titanium hover:text-foreground hover:bg-white/[0.04]"
                  )}
                  title={!expanded ? item.label : undefined}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-r-full bg-gold glow-gold" />
                  )}
                  <Icon className="h-5 w-5 shrink-0" strokeWidth={1.5} />
                  {expanded && (
                    <span className="font-heading text-xs font-medium tracking-wide whitespace-nowrap animate-boot-in">
                      {item.label}
                    </span>
                  )}
                  {expanded && active && (
                    <ChevronRight className="h-4 w-4 ml-auto" strokeWidth={1.5} />
                  )}
                  {item.badge && cartCount > 0 && (
                    <span className={cn("absolute rounded-full bg-gold text-void font-heading font-bold text-[10px] flex items-center justify-center glow-gold",
                      expanded ? "right-3 top-1/2 -translate-y-1/2 h-5 min-w-5 px-1" : "left-1/2 -translate-x-1/2 -top-1 h-4 min-w-4 px-1")}>
                      {cartCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/[0.06] p-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-2 h-10 rounded-xl text-titanium hover:text-gold hover:bg-white/[0.04] transition-colors"
        >
          <ChevronRight className={cn("h-4 w-4 transition-transform duration-500", expanded && "rotate-180")} />
          {expanded && <span className="font-heading text-[10px] tracking-widest">COLLAPSE</span>}
        </button>
        <button className="w-full mt-1 flex items-center gap-3 rounded-xl px-3 h-11 text-titanium hover:text-danger hover:bg-danger/5 transition-all" title={!expanded ? "Logout" : undefined}>
          <LogOut className="h-5 w-5 shrink-0" strokeWidth={1.5} />
          {expanded && <span className="font-heading text-xs tracking-wide">Logout</span>}
        </button>
      </div>
    </aside>
  );
}