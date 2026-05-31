import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, ChevronDown, ShoppingBag, X } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import '../styles/Shop.css';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');

  useEffect(() => {
    document.title = searchQuery 
      ? `Search results for "${searchQuery}" | DesignStitch` 
      : "Shop Collection | DesignStitch";
  }, [searchQuery]);


  // Sync category filter if search happens
  const handleCategorySelect = (categoryName) => {
    setFilter(categoryName);
  };

  const handleClearSearch = () => {
    setSearchParams({});
  };

  const filteredProducts = products.filter(p => {
    const matchesCategory = filter === 'All' ? true : p.category === filter;
    const matchesSearch = searchQuery 
      ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

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

      {searchQuery && (
        <div className="search-results-heading flex items-center justify-between">
          <p>
            Showing results for "<strong>{searchQuery}</strong>" 
            <span className="results-count">({filteredProducts.length} items found)</span>
          </p>
          <button className="clear-search-tag flex items-center gap-1" onClick={handleClearSearch}>
            Clear Search <X size={14} />
          </button>
        </div>
      )}

      <div className="shop-controls">
        <div className="filter-group">
          <span className="control-label">Filter By:</span>
          <button 
            className={`filter-btn ${filter === 'All' ? 'active' : ''}`}
            onClick={() => handleCategorySelect('All')}
          >All</button>
          {categories.map(cat => (
            <button 
              key={cat.name}
              className={`filter-btn ${filter === cat.name ? 'active' : ''}`}
              onClick={() => handleCategorySelect(cat.name)}
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
          <h3>No products found matching your criteria.</h3>
          <p>Try clearing your search query or choosing another category filter.</p>
          <div className="no-products-actions flex gap-1 justify-center">
            {searchQuery && (
              <button className="btn btn-outline" onClick={handleClearSearch}>Clear Search</button>
            )}
            <button className="btn btn-primary" onClick={() => setFilter('All')}>Show All Products</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
