import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Eye, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div 
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-overlay">
          <button 
            className="overlay-btn" 
            onClick={() => addToCart(product)}
            title="Add to Cart"
          >
            <ShoppingBag size={20} />
          </button>
          <Link to={`/product/${product.id}`} className="overlay-btn" title="View Details">
            <Eye size={20} />
          </Link>
        </div>
        {product.inStock && <span className="category-tag">{product.category}</span>}
      </div>

      <div className="product-info">
        <div className="product-rating">
          <Star size={14} fill="var(--gold)" color="var(--gold)" />
          <span>{product.rating}</span>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>
        <p className="product-price">₹{product.price.toLocaleString()}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
