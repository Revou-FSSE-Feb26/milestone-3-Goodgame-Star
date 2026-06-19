// Import hooks dari React
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

// Membuat context kosong untuk Keranjang Belanja (Cart)
const CartContext = createContext(null);

export function CartProvider({ children }) {
  // state 'cartItems' untuk menyimpan array produk yang dimasukkan ke keranjang
  const [cartItems, setCartItems] = useState([]);
  // state 'isLoaded' untuk menandai apakah data keranjang dari local storage sudah dimuat
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("revoshop_cart");
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Failed to load cart:", err);
    }
    setIsLoaded(true);
  }, []);

  // Sync to localStorage on every change (after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("revoshop_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const addToCart = useCallback((product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.images?.[0] || product.image || "https://placehold.co/400x300?text=No+Image",
          quantity: 1,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isLoaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
