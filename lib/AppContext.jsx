"use client";
import { createContext, useContext, useState, useMemo, useEffect } from "react";

const AppContext = createContext();
const PRODUCTS_KEY = "ecloudmerce_products";
const CART_KEY = "ecloudmerce_cart";

export function AppProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProducts = localStorage.getItem(PRODUCTS_KEY);
      const storedCart = localStorage.getItem(CART_KEY);
      
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
      setIsHydrated(true);
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (isHydrated && typeof window !== "undefined") {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    }
  }, [products, isHydrated]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated && typeof window !== "undefined") {
      localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems, isHydrated]);

  const nextProductId = useMemo(
    () => products.reduce((m, p) => Math.max(m, p.id), 0) + 1,
    [products]
  );

  // Product functions
  const addProduct = (data) => {
    setProducts((prev) => [...prev, { id: nextProductId, ...data }]);
  };

  const updateProduct = (id, data) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Cart functions
  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...product, qty }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateCartQty = (id, qty) => {
    setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}