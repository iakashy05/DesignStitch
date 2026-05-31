import React, { createContext, useContext, useState, useEffect } from 'react';
import { trackEvent } from '../utils/analytics';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('designstitch_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('designstitch_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    trackEvent('add_to_cart', {
      currency: 'INR',
      value: product.price * quantity,
      items: [{
        item_id: product.id.toString(),
        item_name: product.name,
        price: product.price,
        quantity
      }]
    });

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };


  const removeFromCart = (productId) => {
    const item = cartItems.find(i => i.id === productId);
    if (item) {
      trackEvent('remove_from_cart', {
        currency: 'INR',
        value: item.price * item.quantity,
        items: [{
          item_id: item.id.toString(),
          item_name: item.name,
          price: item.price,
          quantity: item.quantity
        }]
      });
    }
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };


  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
