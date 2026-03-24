import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container section-padding empty-cart">
        <div className="empty-cart-content">
          <ShoppingBag size={80} className="empty-icon" />
          <h1>Your Cart is Empty</h1>
          <p>Treat yourself today! Discover our latest embroidery designs.</p>
          <Link to="/shop" className="btn btn-primary">
            Start Shopping <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page container section-padding">
      <h1 className="cart-title">Shopping Cart</h1>

      <div className="cart-grid">
        <div className="cart-items">
          <AnimatePresence>
            {cartItems.map(item => (
              <motion.div 
                key={item.id}
                className="cart-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="item-image-box">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <div className="item-header">
                    <h3>{item.name}</h3>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p className="item-category">{item.category}</p>
                  <div className="item-footer">
                    <div className="qty-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <p className="item-price">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{cartTotal.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{cartTotal > 4999 ? 'FREE' : '₹150'}</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{(cartTotal > 4999 ? cartTotal : cartTotal + 150).toLocaleString()}</span>
          </div>
          <button className="btn btn-primary checkout-btn" onClick={() => alert('Checkout functionality is for demo purposes.')}>
            Proceed to Checkout
          </button>
          <div className="payment-icons">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
