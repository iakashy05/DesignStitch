import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useSimulatedCounter } from '../hooks/useSimulatedCounter';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Navbar.css';

const Navbar = () => {
  const activeShoppers = useSimulatedCounter('designstitch_sim_active_users', 148, -2, 2, 4000);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const handleMobileSearchSubmit = (e) => {
    e.preventDefault();
    if (mobileSearchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(mobileSearchQuery.trim())}`);
      setMobileSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-content">
          <div className="nav-left">
            <button className="menu-btn" onClick={() => setIsMobileMenuOpen(true)} title="Open Menu">
              <Menu size={24} />
            </button>
            <div className="nav-links desktop-only">
              <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
              <Link to="/shop" className={location.pathname === '/shop' ? 'active' : ''}>Shop</Link>
              <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>Our Story</Link>
              <Link to="/blog" className={location.pathname === '/blog' ? 'active' : ''}>Blog</Link>
              <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
            </div>
          </div>

          <Link to="/" className="nav-logo">
            <img src="/DesignStich_logo.png" alt="DesignStitch Logo" className="logo-img" />
            <span>DesignStitch</span>
          </Link>

          <div className="live-shoppers-badge desktop-only flex items-center gap-1">
            <span className="live-dot animate-pulse"></span>
            <span>{activeShoppers} browsing live</span>
          </div>


          <div className="nav-right">
            {/* Desktop Search Form */}
            <form onSubmit={handleSearchSubmit} className={`search-container ${isSearchOpen ? 'open' : ''}`}>
              <input 
                type="text" 
                placeholder="Search products..." 
                className="search-input" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="button" className="nav-icon-btn" onClick={() => setIsSearchOpen(!isSearchOpen)} title="Toggle Search">
                <Search size={22} />
              </button>
            </form>
            
            {/* Wishlist Link with Badge */}
            <Link to="/wishlist" className="nav-icon-btn wishlist-nav-link" title="My Wishlist">
              <Heart size={22} />
              {wishlistCount > 0 && <span className="wishlist-badge">{wishlistCount}</span>}
            </Link>
            
            {/* Cart Link with Badge */}
            <Link to="/cart" className="nav-icon-btn cart-btn" title="Shopping Cart">
              <ShoppingBag size={22} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div 
              className="mobile-menu"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mobile-menu-header">
                <div>
                  <h2 style={{ lineHeight: 1 }}>DesignStitch</h2>
                  <div className="live-shoppers-badge flex items-center gap-1" style={{ marginTop: '0.35rem' }}>
                    <span className="live-dot animate-pulse"></span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                      {activeShoppers} browsing live
                    </span>
                  </div>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} title="Close Menu">
                  <X size={24} />
                </button>
              </div>


              {/* Mobile Search Form */}
              <form onSubmit={handleMobileSearchSubmit} className="mobile-search-form">
                <input 
                  type="text" 
                  placeholder="Search collections..." 
                  value={mobileSearchQuery}
                  onChange={(e) => setMobileSearchQuery(e.target.value)}
                />
                <button type="submit"><Search size={20} /></button>
              </form>

              <div className="mobile-nav-links">
                <Link to="/">Home</Link>
                <Link to="/shop">Shop</Link>
                <Link to="/about">Our Story</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/wishlist" className="flex items-center gap-1">
                  Wishlist ({wishlistCount})
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
