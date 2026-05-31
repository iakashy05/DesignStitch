import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page container section-padding">
      <motion.div 
        className="not-found-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="not-found-code">404</span>
        <h1 className="not-found-title">Page Not Found</h1>
        <div className="not-found-line"></div>
        <p className="not-found-text">
          The elegant stitch you are looking for has unraveled. The page might have been moved, deleted, or never existed in the collection.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            <Home size={18} /> Back to Home
          </Link>
          <Link to="/shop" className="btn btn-outline">
            <ArrowLeft size={18} /> Browse Collection
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
