import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import { blogPosts } from '../data/blogs';
import '../styles/Blog.css';

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="container section-padding text-center">
        <h2>Post not found</h2>
        <Link to="/blog" className="read-more" style={{ justifyContent: 'center', marginTop: '2rem' }}>
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <motion.div 
      className="blog-post-page container section-padding"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/blog" className="back-link">
        <ArrowLeft size={16} /> Back to Blog
      </Link>

      <div className="blog-post-header">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {post.title}
        </motion.h1>
        
        <div className="blog-meta">
          <span><Calendar size={16} /> {post.date}</span>
          <span><User size={16} /> {post.author}</span>
        </div>
      </div>

      <motion.div 
        className="blog-post-image"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <img src={post.image} alt={post.title} />
      </motion.div>

      <div className="blog-post-content-wrapper">
        <div 
          className="blog-post-body"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <div className="blog-post-footer">
          <div className="blog-tags">
            {post.keywords.map((tag, index) => (
              <span key={index} className="tag">
                <Tag size={12} /> {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPost;
