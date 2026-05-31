import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ShoppingBag, Eye, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isSaved = isInWishlist(product.id);
  const isOutOfStock = product.inStock === false;

  return (
    <motion.div 
      className={`product-card ${isOutOfStock ? 'out-of-stock-card' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        
        {/* Wishlist Toggle Button */}
        <button 
          className={`wishlist-toggle-btn ${isSaved ? 'saved' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          title={isSaved ? "Remove from Wishlist" : "Save to Wishlist"}
        >
          <Heart size={18} fill={isSaved ? "var(--accent-maroon)" : "none"} color={isSaved ? "var(--accent-maroon)" : "var(--text-primary)"} />
        </button>

        {/* Action Overlay */}
        <div className="product-overlay">
          {!isOutOfStock && (
            <button 
              className="overlay-btn" 
              onClick={() => addToCart(product)}
              title="Add to Cart"
            >
              <ShoppingBag size={20} />
            </button>
          )}
          <Link to={`/product/${product.id}`} className="overlay-btn" title="View Details">
            <Eye size={20} />
          </Link>
        </div>

        {/* Dynamic Badges */}
        {product.badge && (
          <span className={`product-badge-tag ${product.badge.toLowerCase().replace(" ", "-")}`}>
            {product.badge}
          </span>
        )}
        
        {/* Sold Out Visual Overlay */}
        {isOutOfStock && (
          <div className="sold-out-overlay">
            <span>Sold Out</span>
          </div>
        )}
      </div>

      <div className="product-info">
        <div className="product-card-meta flex justify-between items-center">
          <span className="category-tag-sub">{product.category}</span>
          <div className="product-rating">
            <Star size={12} fill="var(--gold)" color="var(--gold)" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="product-name" title={product.name}>{product.name}</h3>
        </Link>
        <div className="product-price-container flex items-center justify-between">
          <p className="product-price">₹{product.price.toLocaleString()}</p>
          {isOutOfStock ? (
            <span className="out-of-stock-label">Out of Stock</span>
          ) : (
            <button 
              className="quick-buy-btn" 
              onClick={() => addToCart(product)}
              title="Quick Add"
            >
              + Add
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
