import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import blog1 from '../assets/images/Embroidery Kurta with Dupatta.jpeg';
import blog2 from '../assets/images/Pure Cotton Embroidered Kurta Set for Women ₹ 819.jpeg';
import blog3 from '../assets/images/Pink embroidered rayon kurta set - Kurta-sets.jpeg';
import '../styles/Blog.css';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "The Evolution of Embroidery in Modern Fashion",
      excerpt: "Explore how traditional embroidery techniques have been reimagined for the contemporary woman.",
      image: blog1,
      author: "Sneha Kapoor",
      date: "March 15, 2024"
    },
    {
      id: 2,
      title: "Choosing the Perfect Fabric for Wedding Season",
      excerpt: "A guide on selecting silks, velvets, and chiffons for your special occasions.",
      image: blog2,
      author: "Anjali Verma",
      date: "March 10, 2024"
    },
    {
      id: 3,
      title: "Sustainable Fashion: Preserving Heritage Crafts",
      excerpt: "How supporting hand-stitched garments contributes to a more sustainable fashion industry.",
      image: blog3,
      author: "Meera Das",
      date: "March 05, 2024"
    }
  ];

  return (
    <div className="blog-page container section-padding">
      <div className="shop-header">
        <h1>Fashion Blog</h1>
        <p>Your source for ethnic fashion trends and craftsmanship stories.</p>
      </div>

      <div className="blog-grid">
        {posts.map((post, index) => (
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
              <Link to="#" className="read-more">Read More <ArrowRight size={16} /></Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
