// CartContext.js
// Global cart state — wrap your App with <CartProvider>

import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Add item or increase quantity if already exists
  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.name === item.name && i.size === item.size
      );
      if (existing) {
        return prev.map((i) =>
          i.name === item.name && i.size === item.size
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, { ...item, cartId: Date.now().toString() }];
    });
  };

  const removeFromCart = (cartId) => {
    setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));
  };

  const updateQuantity = (cartId, qty) => {
    if (qty < 1) {
      removeFromCart(cartId);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.cartId === cartId ? { ...i, quantity: qty } : i))
    );
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}