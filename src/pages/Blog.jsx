import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogs';
import '../styles/Blog.css';

const Blog = () => {
  return (
    <div className="blog-page container section-padding">
      <div className="shop-header">
        <h1>Fashion Blog</h1>
        <p>Your source for ethnic fashion trends and craftsmanship stories.</p>
      </div>

      <div className="blog-grid">
        {blogPosts.map((post, index) => (
          <motion.div 
            key={post.id}
            className="blog-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="blog-image">
              <img src={post.image} alt={post.title} />
            </div>
            <div className="blog-content">
              <div className="blog-meta">
                <span><Calendar size={14} /> {post.date}</span>
                <span><User size={14} /> {post.author}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <Link to={`/blog/${post.id}`} className="read-more">Read More <ArrowRight size={16} /></Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
