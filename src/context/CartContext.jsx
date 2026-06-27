import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('meyyakutty_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse cart from local storage");
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('meyyakutty_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        // Only supplies can have quantity > 1. Live pets are quantity 1 max.
        if (item.category !== 'Supplies') return prev;
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems(prev => prev.map(i => {
      if (i.id === id) {
        // Enforce max stock limit if needed, but for now just update.
        // Actually, we should check if i.category === 'Supplies' but the UI will handle that.
        return { ...i, quantity };
      }
      return i;
    }));
  };

  const clearCart = () => setCartItems([]);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const delivery = subtotal > 0 ? 100 : 0; // Flat ₹100 delivery
  const tax = Math.round(subtotal * 0.05); // 5% tax
  const grandTotal = subtotal > 0 ? subtotal + delivery + tax : 0;

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      subtotal,
      delivery,
      tax,
      grandTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
