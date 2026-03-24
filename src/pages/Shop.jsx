import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, ChevronDown, ShoppingBag } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import '../styles/Shop.css';

const Shop = () => {
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');

  const filteredProducts = products.filter(p => 
    filter === 'All' ? true : p.category === filter
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    if (sortBy === 'Top Rated') return b.rating - a.rating;
    return 0; // Featured
  });

  return (
    <div className="shop-page container section-padding">
      <div className="shop-header">
        <h1>Our Collection</h1>
        <p>Explore our premium range of hand-crafted ethnic wear</p>
      </div>

      <div className="shop-controls">
        <div className="filter-group">
          <span className="control-label">Filter By:</span>
          <button 
            className={`filter-btn ${filter === 'All' ? 'active' : ''}`}
            onClick={() => setFilter('All')}
          >All</button>
          {categories.map(cat => (
            <button 
              key={cat.name}
              className={`filter-btn ${filter === cat.name ? 'active' : ''}`}
              onClick={() => setFilter(cat.name)}
            >{cat.name}</button>
          ))}
        </div>

        <div className="sort-group">
          <span className="control-label">Sort By:</span>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Top Rated</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <div className="no-products">
          <h3>No products found in this category.</h3>
          <button className="btn btn-primary" onClick={() => setFilter('All')}>Show All Products</button>
        </div>
      )}
    </div>
  );
};

export default Shop;
