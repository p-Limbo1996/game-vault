import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, ChevronDown, Truck, Check, Clock, Download, ChevronRight } from "lucide-react";
import GearLoader from "@/components/vault/GearLoader";
import { cn } from "@/lib/utils";

const mockOrders = [
  { id: "VLT-7821", date: "2026-07-24", items: ["Cyber Reign 2099", "Obsidian Keyboard MK7"], total: 179.98, status: "Delivered", count: 2 },
  { id: "VLT-7815", date: "2026-07-22", items: ["Titan Controller X", "Apex Headset Elite"], total: 239.98, status: "Shipped", count: 2 },
  { id: "VLT-7801", date: "2026-07-19", items: ["VaultStation Pro"], total: 499.99, status: "Processing", count: 1 },
  { id: "VLT-7790", date: "2026-07-15", items: ["Orbital Strike", "Neon Dynasty", "Steam Wallet $50"], total: 143.97, status: "Delivered", count: 3 },
  { id: "VLT-7785", date: "2026-07-12", items: ["Pro Gamer Account LVL 100"], total: 299.99, status: "Processing", count: 1 },
];

const statusConfig = {
  Delivered: { tone: "text-success border-success/30 bg-success/10", icon: Check },
  Shipped: { tone: "text-playstation border-playstation/30 bg-playstation/10", icon: Truck },
  Processing: { tone: "text-gold border-gold/30 bg-gold/10", icon: Clock },
};

export default function Orders() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="max-w-5xl mx-auto px-8 lg:px-12 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <span className="font-heading text-[10px] tracking-[0.3em] text-gold">TRANSACTION LOG</span>
        <h1 className="font-heading font-bold text-4xl text-foreground mt-1">Orders</h1>
        <p className="text-titanium mt-2">{mockOrders.length} acquisitions recorded in your vault.</p>
      </motion.div>

      <div className="space-y-3 mt-8">
        {mockOrders.map((order, i) => {
          const cfg = statusConfig[order.status];
          const StatusIcon = cfg.icon;
          const isOpen = expanded === order.id;
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div className={cn("relative rounded-[20px] vault-metal overflow-hidden transition-all",
                isOpen && "glow-gold")}>
                {/* Drawer handle */}
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                  {[0,1,2].map(s => <span key={s} className="h-1 w-6 rounded-full bg-white/10" />)}
                </div>

                <button onClick={() => setExpanded(isOpen ? null : order.id)} className="w-full text-left flex items-center gap-5 p-5 pl-12">
                  <div className="h-12 w-12 rounded-[14px] vault-glass flex items-center justify-center shrink-0">
                    <Package className="h-5 w-5 text-gold" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="font-heading font-bold text-sm text-foreground">{order.id}</span>
                      <span className={cn("inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-heading text-[9px] tracking-wider", cfg.tone)}>
                        <StatusIcon className="h-3 w-3" /> {order.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-titanium text-xs mt-1">{order.count} items · {new Date(order.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-num font-bold text-lg text-gold">${order.total.toFixed(2)}</p>
                  </div>
                  <ChevronDown className={cn("h-5 w-5 text-titanium transition-transform shrink-0", isOpen && "rotate-180")} />
                </button>

                {/* Expanded drawer content */}
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/[0.06] p-5 pl-12 space-y-2"
                  >
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between rounded-[12px] vault-glass px-4 py-3">
                        <span className="text-sm text-foreground">{item}</span>
                        <button className="inline-flex items-center gap-1.5 font-heading text-[10px] tracking-wider text-gold hover:text-gold-hover">
                          <Download className="h-3.5 w-3.5" /> DOWNLOAD
                        </button>
                      </div>
                    ))}
                    <div className="flex items-center justify-between pt-2">
                      <button className="inline-flex items-center gap-1.5 font-heading text-[10px] tracking-wider text-titanium hover:text-foreground">
                        <ChevronRight className="h-3.5 w-3.5" /> VIEW FULL RECEIPT
                      </button>
                      <span className="font-heading text-[9px] tracking-wider text-titanium">END-TO-END VERIFIED</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}