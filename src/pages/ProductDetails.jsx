import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Star, ArrowLeft, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import '../styles/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
    if (foundProduct) {
      setSelectedSize(foundProduct.sizes[0]);
    }
    // Scroll to top on product change
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return <div className="container section-padding">Loading...</div>;
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="product-details-page container section-padding">
      <Link to="/shop" className="back-link">
        <ArrowLeft size={18} /> Back to Shop
      </Link>

      <div className="product-main-grid">
        <motion.div 
          className="product-gallery"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <img src={product.image} alt={product.name} className="main-image" />
        </motion.div>

        <motion.div 
          className="product-info-details"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="info-category">{product.category}</span>
          <h1 className="info-name">{product.name}</h1>
          <div className="info-rating">
            <div className="stars">
              <Star fill="var(--gold)" color="var(--gold)" size={16} />
              <Star fill="var(--gold)" color="var(--gold)" size={16} />
              <Star fill="var(--gold)" color="var(--gold)" size={16} />
              <Star fill="var(--gold)" color="var(--gold)" size={16} />
              <Star fill="var(--gold)" color="var(--gold)" size={16} />
            </div>
            <span>({product.rating} / 5.0)</span>
          </div>
          <p className="info-price">₹{product.price.toLocaleString()}</p>
          <p className="info-description">{product.description}</p>

          <div className="info-options">
            <div className="size-selector">
              <h3>Select Size</h3>
              <div className="size-btns">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="quantity-selector">
              <h3>Quantity</h3>
              <div className="qty-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>
          </div>

          <button 
            className="btn btn-primary add-to-cart-btn"
            onClick={() => addToCart(product, quantity)}
          >
            Add to Cart <ShoppingBag size={20} />
          </button>

          <div className="info-features">
            <div className="info-feature-item">
              <Truck size={20} />
              <div>
                <h4>Free Delivery</h4>
                <p>Standard delivery within 3-5 days</p>
              </div>
            </div>
            <div className="info-feature-item">
              <RotateCcw size={20} />
              <div>
                <h4>Returns Policy</h4>
                <p>7 days easy return and exchange</p>
              </div>
            </div>
            <div className="info-feature-item">
              <ShieldCheck size={20} />
              <div>
                <h4>Secure Payment</h4>
                <p>100% secure payment methods</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="related-products section-padding">
          <div className="section-header">
            <h2>You May Also Like</h2>
            <div className="header-line"></div>
          </div>
          <div className="product-grid">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
