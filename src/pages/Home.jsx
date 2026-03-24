import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Truck, ShieldCheck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import heroImage from '../assets/images/32628191408eafd987cefddec6da8621.jpg';
import '../styles/Home.css';

const Home = () => {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="hero-subtitle">Premium Ethnic Wear</span>
            <h1 className="hero-title">Timeless Elegance <br /><span>In Every Stitch</span></h1>
            <p className="hero-description">
              Discover our exclusive collection of hand-embroidered ladies suits, 
              salwar suits, and traditional festive wear designed for the modern woman.
            </p>
            <div className="hero-btns">
              <Link to="/shop" className="btn btn-primary">
                Shop Collection <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="btn btn-outline">
                Our Story
              </Link>
            </div>
          </motion.div>
          <motion.div 
            className="hero-image-wrapper"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <img 
              src={heroImage} 
              alt="DesignStitch Hero" 
              className="hero-image"
            />
            <div className="hero-accent-box"></div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features section-padding">
        <div className="container features-grid">
          <div className="feature-item">
            <Truck className="feature-icon" />
            <h3>Free Shipping</h3>
            <p>On all orders above ₹4,999</p>
          </div>
          <div className="feature-item">
            <ShieldCheck className="feature-icon" />
            <h3>Quality Assured</h3>
            <p>Premium fabrics & craftsmanship</p>
          </div>
          <div className="feature-item">
            <Clock className="feature-icon" />
            <h3>Custom Stitching</h3>
            <p>Perfect fit for your special day</p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories section-padding">
        <div className="container">
          <div className="section-header">
            <h2>Shop By Category</h2>
            <div className="header-line"></div>
          </div>
          <div className="categories-grid">
            {categories.map((cat, index) => (
              <motion.div 
                key={cat.name}
                className="category-card"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <img src={cat.image} alt={cat.name} />
                <div className="category-overlay">
                  <h3>{cat.name}</h3>
                  <p>{cat.count} Items</p>
                  <Link to="/shop" className="category-link">Explore <ArrowRight size={16} /></Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured section-padding">
        <div className="container">
          <div className="section-header">
            <h2>Featured Collection</h2>
            <p>Hand-picked embroidery designs for you</p>
            <div className="header-line"></div>
          </div>
          <div className="product-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="view-all-container">
            <Link to="/shop" className="btn btn-outline">View All Products</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials section-padding">
        <div className="container">
          <div className="section-header">
            <h2>What Our Clients Say</h2>
            <div className="header-line"></div>
          </div>
          <div className="testimonials-grid">
            {[1, 2, 3].map(i => (
              <div key={i} className="testimonial-card">
                <div className="rating">
                  <Star fill="var(--gold)" color="var(--gold)" size={16} />
                  <Star fill="var(--gold)" color="var(--gold)" size={16} />
                  <Star fill="var(--gold)" color="var(--gold)" size={16} />
                  <Star fill="var(--gold)" color="var(--gold)" size={16} />
                  <Star fill="var(--gold)" color="var(--gold)" size={16} />
                </div>
                <p className="testimonial-text">
                  "The embroidery on the Anarkali suit I ordered was breathtaking. 
                  The fit was perfect and the fabric felt so premium. DesignStitch is my new favorite!"
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">{String.fromCharCode(64 + i)}</div>
                  <div className="author-info">
                    <h4>Priya Sharma</h4>
                    <span>Verified Buyer</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter section-padding">
        <div className="container">
          <div className="newsletter-box">
            <h2>Join Our Fashion Club</h2>
            <p>Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email address" required />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
