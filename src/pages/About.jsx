import React from 'react';
import { motion } from 'framer-motion';
import craftImage from '../assets/images/Arishta Art Silk Self Design Kurta & Churidar Material.jpeg';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >Our Story</motion.h1>
          <div className="header-line"></div>
        </div>
      </section>

      <section className="about-content section-padding">
        <div className="container grid-2">
          <motion.div 
            className="about-image"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img src={craftImage} alt="Craftsmanship" />
          </motion.div>
          <div className="about-text">
            <h2>The Art of Embroidery</h2>
            <p>
              DesignStitch was born out of a passion for traditional Indian craftsmanship 
              and a vision to bring it to the modern woman's wardrobe. 
              Founded in 2020, we have dedicated ourselves to preserving the intricate 
              art of hand-embroidery.
            </p>
            <p>
              Every piece in our collection is a labor of love, taking days, sometimes weeks, 
              to complete. We work directly with master artisans from across the country, 
              ensuring that every stitch tells a story of heritage and skill.
            </p>
            <div className="about-milestones">
              <div className="milestone">
                <h3>500+</h3>
                <p>Artisans Impacted</p>
              </div>
              <div className="milestone">
                <h3>50k+</h3>
                <p>Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mission-vision section-padding">
        <div className="container grid-2">
          <div className="mv-card">
            <h3>Our Mission</h3>
            <p>To empower artisans and celebrate the beauty of hand-crafted fashion by creating premium, timeless ethnic wear.</p>
          </div>
          <div className="mv-card">
            <h3>Our Vision</h3>
            <p>To be the leading global brand for contemporary ethnic fashion, recognized for our commitment to quality and craftsmanship.</p>
          </div>
        </div>
      </section>

      <section className="craft-process section-padding">
        <div className="container">
          <div className="section-header">
            <h2>Our Craft Process</h2>
            <div className="header-line"></div>
          </div>
          <div className="process-steps">
            <div className="step">
              <span className="step-num">01</span>
              <h4>Design & Curation</h4>
              <p>Conceptualizing unique motifs inspired by nature and heritage.</p>
            </div>
            <div className="step">
              <span className="step-num">02</span>
              <h4>Fabric Selection</h4>
              <p>Sourcing the finest silks, cottons, and velvets for comfort and grace.</p>
            </div>
            <div className="step">
              <span className="step-num">03</span>
              <h4>Hand Embroidery</h4>
              <p>Tracing and embroidering every detail with precision and care.</p>
            </div>
            <div className="step">
              <span className="step-num">04</span>
              <h4>Quality Check</h4>
              <p>Multi-step inspection to ensure perfection in every garment.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
