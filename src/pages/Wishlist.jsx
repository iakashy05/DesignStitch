import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import '../styles/Wishlist.css';

const Wishlist = () => {
  useEffect(() => {
    document.title = "My Wishlist | DesignStitch";
  }, []);

  const { wishlistItems, clearWishlist } = useWishlist();


  if (wishlistItems.length === 0) {
    return (
      <div className="container section-padding empty-wishlist">
        <div className="empty-wishlist-content">
          <Heart size={80} className="empty-icon animate-pulse" color="var(--accent-maroon)" />
          <h1>Your Wishlist is Empty</h1>
          <p>Tap the heart icon on any product to save it here for later.</p>
          <Link to="/shop" className="btn btn-primary">
            Explore Collection <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page container section-padding">
      <div className="wishlist-header flex items-center justify-between">
        <div>
          <h1 className="wishlist-title">My Wishlist</h1>
          <p className="wishlist-subtitle">You have {wishlistItems.length} item{wishlistItems.length > 1 ? 's' : ''} saved</p>
        </div>
        <button className="btn btn-outline clear-all-btn" onClick={clearWishlist}>
          <Trash2 size={16} /> Clear Wishlist
        </button>
      </div>

      <motion.div 
        className="product-grid"
        layout
      >
        <AnimatePresence>
          {wishlistItems.map(product => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Wishlist;
