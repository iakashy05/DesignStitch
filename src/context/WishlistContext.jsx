import React, { createContext, useContext, useState, useEffect } from 'react';
import { trackEvent } from '../utils/analytics';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem('designstitch_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem('designstitch_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    trackEvent('add_to_wishlist', {
      currency: 'INR',
      value: product.price,
      items: [{
        item_id: product.id.toString(),
        item_name: product.name,
        price: product.price
      }]
    });

    setWishlistItems(prevItems => {
      const exists = prevItems.some(item => item.id === product.id);
      if (exists) return prevItems;
      return [...prevItems, product];
    });
  };


  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const toggleWishlist = (product) => {
    const exists = wishlistItems.some(item => item.id === product.id);
    if (exists) {
      trackEvent('remove_from_wishlist', {
        currency: 'INR',
        value: product.price,
        items: [{
          item_id: product.id.toString(),
          item_name: product.name,
          price: product.price
        }]
      });
    } else {
      trackEvent('add_to_wishlist', {
        currency: 'INR',
        value: product.price,
        items: [{
          item_id: product.id.toString(),
          item_name: product.name,
          price: product.price
        }]
      });
    }

    setWishlistItems(prevItems => {
      if (exists) {
        return prevItems.filter(item => item.id !== product.id);
      } else {
        return [...prevItems, product];
      }
    });
  };


  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isInWishlist,
      clearWishlist,
      wishlistCount
    }}>
      {children}
    </WishlistContext.Provider>
  );
};
