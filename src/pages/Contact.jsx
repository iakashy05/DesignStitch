import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/Contact.css';

const Contact = () => {
  useEffect(() => {
    document.title = "Contact Us | DesignStitch";
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      alert('Thank you for your message! We will get back to you soon.');
    }, 2000);
  };

  return (
    <div className="contact-page container section-padding">
      <div className="shop-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Get in touch with our team.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <div className="info-block">
            <div className="icon-box"><MapPin /></div>
            <div>
              <h3>Visit Our Atelier</h3>
              <p>123 Fashion Street, Cyber Hub, New Delhi, India 110001</p>
            </div>
          </div>
          <div className="info-block">
            <div className="icon-box"><Phone /></div>
            <div>
              <h3>Give Us a Call</h3>
              <p>+91 98765 43210</p>
              <p>Mon - Sat: 10:00 AM - 7:00 PM</p>
            </div>
          </div>
          <div className="info-block">
            <div className="icon-box"><Mail /></div>
            <div>
              <h3>Email Support</h3>
              <p>hello@designstitch.com</p>
              <p>support@designstitch.com</p>
            </div>
          </div>

          <div className="contact-map">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14022.428581635384!2d77.08534015632128!3d28.491295984666355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1937ff6538f9%3A0x608e5e77ccabaf14!2sCyber%20City%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1716301292023!5m2!1sen!2sin" 
              width="100%" 
              height="280" 
              style={{ border: 0, borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="DesignStitch Atelier Location Map"
            ></iframe>
          </div>

        </div>

        <motion.div 
          className="contact-form-container"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input 
                type="text" 
                required 
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                placeholder="How can we help?"
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea 
                rows="5" 
                required 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Type your message here..."
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary submit-btn" disabled={submitted}>
              {submitted ? 'Sending...' : 'Send Message'} <Send size={18} />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
