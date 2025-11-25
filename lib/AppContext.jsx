"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();
const CART_KEY = "ecloudmerce_cart";

export function AppProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart & fetch products
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem(CART_KEY);
      if (storedCart) setCartItems(JSON.parse(storedCart));
      setIsHydrated(true);
    }

    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // Save cart whenever it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems, isHydrated]);

  // CRUD Product (API)
  const addProduct = async (data) => {
    let imageUrl = null;

    if (data.file) {
      const form = new FormData();
      form.append("file", data.file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });

      const uploadJson = await uploadRes.json();
      imageUrl = uploadJson.url;
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        price: data.price,
        desc: data.desc || "",
        imageUrl: imageUrl,
      }),
    });

    const newProduct = await res.json();
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = async (id, data) => {
    const form = new FormData();
    form.append("name", data.name);
    form.append("price", data.price);
    form.append("desc", data.desc || "");
    form.append("oldImageUrl", data.oldImageUrl || "");

    if (data.file) {
      form.append("file", data.file);
    }

    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      body: form,
    });

    const updated = await res.json();

    setProducts(prev => prev.map(p => p.id === id ? updated : p));
  };



  const deleteProduct = async (id) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Cart functions
  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
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

  const clearCart = () => setCartItems([]);

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
