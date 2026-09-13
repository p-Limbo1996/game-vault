import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown, Star } from "lucide-react";
import { base44 } from "@/api/base44Client";
import ProductCard from "@/components/vault/ProductCard";
import GearLoader from "@/components/vault/GearLoader";
import { cn } from "@/lib/utils";

const platforms = ["PC", "PlayStation", "Xbox", "Nintendo", "Steam", "Multi"];
const genres = ["Action", "RPG", "Shooter", "Adventure", "Strategy", "Sports", "Simulation", "Horror"];
const brands = ["VaultOS", "TitanForge", "NexusCore", "ApexTech", "Obsidian", "HyperDrive"];
const sortOptions = [
  { label: "Newest", value: "-created_date" },
  { label: "Price: Low → High", value: "price" },
  { label: "Price: High → Low", value: "-price" },
  { label: "Top Rated", value: "-rating" },
];

export default function Store() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("-created_date");
  const [filtersOpen, setFiltersOpen] = useState(true);

  const [filters, setFilters] = useState({
    platforms: [],
    genres: [],
    brands: [],
    priceMax: 200,
    inStockOnly: false,
    minRating: 0,
  });

  useEffect(() => {
    base44.entities.Product.list("-created_date", 100)
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  const toggleArray = (key, val) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(val) ? prev[key].filter(v => v !== val) : [...prev[key], val],
    }));
  };

  const filtered = useMemo(() => {
    if (!products) return [];
    let result = products.filter(p => {
      if (filters.platforms.length && !filters.platforms.includes(p.platform)) return false;
      if (filters.genres.length && p.genre && !filters.genres.includes(p.genre)) return false;
      if (filters.brands.length && p.brand && !filters.brands.includes(p.brand)) return false;
      if (p.price > filters.priceMax) return false;
      if (filters.inStockOnly && p.stock <= 0) return false;
      if (filters.minRating > 0 && (p.rating || 0) < filters.minRating) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "-price") return b.price - a.price;
      if (sortBy === "-rating") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });
    return result;
  }, [products, filters, search, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-8 lg:px-12 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <span className="font-heading text-[10px] tracking-[0.3em] text-gold">ARSENAL GRID</span>
        <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mt-1">Store</h1>
        <p className="text-titanium mt-2">Browse {products?.length || "…"} secured assets across all categories.</p>
      </motion.div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[260px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-titanium" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search assets..."
            className="w-full h-12 pl-11 pr-4 rounded-[18px] vault-glass border border-white/[0.08] bg-transparent text-sm text-foreground placeholder:text-titanium/60 focus:border-gold/40 focus:outline-none transition-colors"
          />
        </div>

        <div className="relative">
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="h-12 pl-4 pr-10 rounded-[18px] vault-glass border border-white/[0.08] bg-transparent text-sm text-foreground appearance-none cursor-pointer focus:border-gold/40 focus:outline-none"
          >
            {sortOptions.map(o => <option key={o.value} value={o.value} className="bg-void">{o.label}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-titanium pointer-events-none" />
        </div>

        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="h-12 px-5 rounded-[18px] vault-glass border border-white/[0.08] flex items-center gap-2 text-sm text-foreground hover:border-gold/40 transition-colors lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </button>
      </div>

      <div className="flex gap-6">
        {/* Filters */}
        <aside className={cn(
          "w-64 shrink-0 space-y-4",
          !filtersOpen && "hidden lg:block"
        )}>
          <div className="rounded-[24px] vault-metal p-5 space-y-5 sticky top-12">
            <div className="flex items-center justify-between">
              <span className="font-heading text-xs tracking-[0.2em] text-foreground">FILTERS</span>
              <button onClick={() => setFilters({ platforms: [], genres: [], brands: [], priceMax: 200, inStockOnly: false, minRating: 0 })} className="text-[10px] text-titanium hover:text-gold font-heading tracking-wider">RESET</button>
            </div>

            <FilterGroup title="Platform">
              {platforms.map(p => (
                <CheckPill key={p} label={p} active={filters.platforms.includes(p)} onClick={() => toggleArray("platforms", p)} />
              ))}
            </FilterGroup>

            <FilterGroup title="Genre">
              {genres.map(g => (
                <CheckPill key={g} label={g} active={filters.genres.includes(g)} onClick={() => toggleArray("genres", g)} />
              ))}
            </FilterGroup>

            <FilterGroup title="Brand">
              {brands.map(b => (
                <CheckPill key={b} label={b} active={filters.brands.includes(b)} onClick={() => toggleArray("brands", b)} />
              ))}
            </FilterGroup>

            <FilterGroup title="Max Price">
              <input
                type="range" min="10" max="200" step="10"
                value={filters.priceMax}
                onChange={e => setFilters(prev => ({ ...prev, priceMax: +e.target.value }))}
                className="w-full accent-gold"
              />
              <div className="flex justify-between font-num text-xs text-titanium">
                <span>$0</span><span className="text-gold font-semibold">${filters.priceMax}</span>
              </div>
            </FilterGroup>

            <FilterGroup title="Min Rating">
              <div className="flex gap-1">
                {[0, 3, 4, 4.5].map(r => (
                  <button
                    key={r}
                    onClick={() => setFilters(prev => ({ ...prev, minRating: r }))}
                    className={cn("flex-1 h-8 rounded-lg border text-xs font-num transition-all",
                      filters.minRating === r ? "border-gold bg-gold/15 text-gold" : "border-white/10 text-titanium hover:text-foreground")}
                  >
                    {r === 0 ? "Any" : `${r}★+`}
                  </button>
                ))}
              </div>
            </FilterGroup>

            <FilterGroup title="Availability">
              <button
                onClick={() => setFilters(prev => ({ ...prev, inStockOnly: !prev.inStockOnly }))}
                className={cn("w-full h-10 rounded-[14px] border flex items-center justify-between px-4 transition-all",
                  filters.inStockOnly ? "border-success/40 bg-success/10" : "border-white/10 hover:border-white/25")}
              >
                <span className="font-heading text-xs tracking-wider text-foreground">In Stock Only</span>
                <span className={cn("h-5 w-9 rounded-full transition-all relative",
                  filters.inStockOnly ? "bg-success" : "bg-white/10")}>
                  <span className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-foreground transition-all",
                    filters.inStockOnly ? "left-4" : "left-0.5")} />
                </span>
              </button>
            </FilterGroup>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1 min-w-0">
          {!products ? (
            <div className="flex items-center justify-center py-32">
              <GearLoader label="SCANNING ASSETS" />
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <p className="font-heading text-[10px] tracking-[0.2em] text-titanium mb-4">
                {filtered.length} ASSETS DETECTED
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }) {
  return (
    <div>
      <p className="font-heading text-[10px] tracking-[0.25em] text-titanium mb-2.5">{title.toUpperCase()}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function CheckPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn("w-full h-9 rounded-[14px] border px-3 text-left text-xs font-medium transition-all flex items-center justify-between",
        active ? "border-gold/40 bg-gold/10 text-gold" : "border-white/[0.06] text-titanium hover:text-foreground hover:border-white/20")}
    >
      {label}
      {active && <X className="h-3 w-3" />}
    </button>
  );
}

function EmptyState() {
  return (
    <div className="relative rounded-[28px] vault-metal p-16 text-center overflow-hidden">
      <div className="absolute inset-0 vault-scanlines opacity-20" />
      <div className="relative z-10">
        <div className="mx-auto w-20 h-20 rounded-full border-2 border-dashed border-gold/30 flex items-center justify-center animate-spin-slow" style={{ animationDuration: "6s" }}>
          <Search className="h-8 w-8 text-gold/60" />
        </div>
        <p className="font-heading text-sm tracking-[0.2em] text-gold mt-6 animate-pulse-glow">SEARCHING DATABASE...</p>
        <p className="font-heading text-lg text-foreground mt-2">No Assets Found</p>
        <p className="text-titanium text-sm mt-1">Adjust your filter parameters and re-scan.</p>
      </div>
    </div>
  );
}