import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

const VaultContext = createContext(null);

const load = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch { return fallback; }
};

export function VaultStoreProvider({ children }) {
  const [cart, setCart] = useState(() => load("vault_cart", []));
  const [wishlist, setWishlist] = useState(() => load("vault_wishlist", []));
  const [recent, setRecent] = useState(() => load("vault_recent", []));

  useEffect(() => { localStorage.setItem("vault_cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("vault_wishlist", JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem("vault_recent", JSON.stringify(recent)); }, [recent]);

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: product.id, title: product.title, price: product.price, cover_image: product.cover_image, platform: product.platform, qty: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id) => setCart(prev => prev.filter(i => i.id !== id)), []);
  const setQty = useCallback((id, qty) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, qty) } : i)), []);
  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((product) => {
    setWishlist(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.filter(i => i.id !== product.id);
      return [...prev, { id: product.id, title: product.title, price: product.price, cover_image: product.cover_image, platform: product.platform, category: product.category, rating: product.rating }];
    });
  }, []);

  const addRecent = useCallback((product) => {
    setRecent(prev => {
      const filtered = prev.filter(i => i.id !== product.id);
      return [{ id: product.id, title: product.title, cover_image: product.cover_image, platform: product.platform, price: product.price }, ...filtered].slice(0, 8);
    });
  }, []);

  const value = {
    cart, addToCart, removeFromCart, setQty, clearCart,
    cartCount: cart.reduce((s, i) => s + i.qty, 0),
    cartTotal: cart.reduce((s, i) => s + i.qty * i.price, 0),
    wishlist, toggleWishlist, isInWishlist: (id) => wishlist.some(i => i.id === id),
    recent, addRecent,
  };

  return <VaultContext.Provider value={value}>{children}</VaultContext.Provider>;
}

export function useVault() {
  const ctx = useContext(VaultContext);
  if (!ctx) throw new Error("useVault must be used within VaultStoreProvider");
  return ctx;
}