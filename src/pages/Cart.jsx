import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight, X, CreditCard, Truck, CheckCircle2, ChevronRight, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '../utils/analytics';
import '../styles/Cart.css';


const Cart = () => {
  useEffect(() => {
    document.title = "Shopping Cart | DesignStitch";
  }, []);

  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  
  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [shippingForm, setShippingForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });
  const [paymentForm, setPaymentForm] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [orderId, setOrderId] = useState('');

  const shippingCost = cartTotal > 4999 ? 0 : 150;
  const grandTotal = cartTotal + shippingCost;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    
    trackEvent('add_shipping_info', {
      currency: 'INR',
      value: cartTotal,
      shipping_tier: cartTotal > 4999 ? 'Free' : 'Standard',
      items: cartItems.map(item => ({
        item_id: item.id.toString(),
        item_name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    });

    setCheckoutStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Generate mock Order ID
    const randomId = 'DS-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);

    trackEvent('purchase', {
      transaction_id: randomId,
      value: grandTotal,
      currency: 'INR',
      tax: 0,
      shipping: shippingCost,
      items: cartItems.map(item => ({
        item_id: item.id.toString(),
        item_name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    });

    setCheckoutStep(3);
    // Clear cart on successful purchase
    clearCart();
  };

  const handleOpenCheckout = () => {
    trackEvent('begin_checkout', {
      currency: 'INR',
      value: cartTotal,
      items: cartItems.map(item => ({
        item_id: item.id.toString(),
        item_name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    });
    setIsCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
    setCheckoutStep(1);
    setShippingForm({ name: '', email: '', phone: '', address: '', city: '', pincode: '' });
    setPaymentForm({ cardName: '', cardNumber: '', expiry: '', cvv: '' });
  };


  // Helper to format card number with spaces
  const handleCardNumberChange = (e) => {
    let val = e.target.value.replace(/\s?/g, '').replace(/\D/g, '');
    let formatted = '';
    for (let i = 0; i < val.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += ' ';
      formatted += val[i];
    }
    setPaymentForm({ ...paymentForm, cardNumber: formatted.slice(0, 19) });
  };

  // Helper to format Expiry Date
  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length >= 2) {
      val = val.slice(0, 2) + '/' + val.slice(2, 4);
    }
    setPaymentForm({ ...paymentForm, expiry: val.slice(0, 5) });
  };

  if (cartItems.length === 0 && !orderId) {
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
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)} title="Remove Item">
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
            <span>{cartTotal > 4999 ? 'FREE' : `₹${shippingCost}`}</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{grandTotal.toLocaleString()}</span>
          </div>
          <button className="btn btn-primary checkout-btn" onClick={handleOpenCheckout}>
            Proceed to Checkout
          </button>

          <div className="payment-icons">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" />
          </div>
        </div>
      </div>

      {/* Checkout Dialog Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <motion.div 
            className="checkout-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="checkout-modal-card"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {checkoutStep !== 3 && (
                <button className="close-checkout-btn" onClick={handleCloseCheckout} title="Close Checkout">
                  <X size={20} />
                </button>
              )}

              {/* Checkout Progress Steps */}
              {checkoutStep !== 3 && (
                <div className="checkout-steps-bar flex items-center justify-center gap-2">
                  <span className={`step-indicator ${checkoutStep >= 1 ? 'active' : ''}`}>
                    <Truck size={14} /> Shipping
                  </span>
                  <ChevronRight size={14} className="step-arrow" />
                  <span className={`step-indicator ${checkoutStep >= 2 ? 'active' : ''}`}>
                    <CreditCard size={14} /> Payment
                  </span>
                </div>
              )}

              {/* Step 1: Shipping Details Form */}
              {checkoutStep === 1 && (
                <div className="checkout-step-content">
                  <h2>Shipping Information</h2>
                  <form onSubmit={handleShippingSubmit} className="checkout-form">
                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Full Name</label>
                        <input 
                          type="text" 
                          required 
                          value={shippingForm.name} 
                          onChange={(e) => setShippingForm({ ...shippingForm, name: e.target.value })}
                          placeholder="Priya Sharma"
                        />
                      </div>
                      <div className="form-group">
                        <label>Email Address</label>
                        <input 
                          type="email" 
                          required 
                          value={shippingForm.email} 
                          onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                          placeholder="priya@example.com"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input 
                        type="tel" 
                        required 
                        value={shippingForm.phone} 
                        onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="form-group">
                      <label>Street Address</label>
                      <input 
                        type="text" 
                        required 
                        value={shippingForm.address} 
                        onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                        placeholder="Flat 101, Elegant Residency, Sector 45"
                      />
                    </div>
                    <div className="form-row-2">
                      <div className="form-group">
                        <label>City</label>
                        <input 
                          type="text" 
                          required 
                          value={shippingForm.city} 
                          onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                          placeholder="New Delhi"
                        />
                      </div>
                      <div className="form-group">
                        <label>Pincode / Postal Code</label>
                        <input 
                          type="text" 
                          required 
                          value={shippingForm.pincode} 
                          onChange={(e) => setShippingForm({ ...shippingForm, pincode: e.target.value })}
                          placeholder="110001"
                        />
                      </div>
                    </div>
                    
                    <div className="checkout-summary-bar flex items-center justify-between">
                      <div>
                        <span className="summary-label">Payable Amount:</span>
                        <span className="summary-amount">₹{grandTotal.toLocaleString()}</span>
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Continue to Payment <ArrowRight size={16} />
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 2: Payment Details Form */}
              {checkoutStep === 2 && (
                <div className="checkout-step-content">
                  <h2>Payment Details</h2>
                  <div className="mock-billing-box flex items-center gap-1">
                    <MapPin size={16} color="var(--accent-maroon)" />
                    <p>Shipping to: <strong>{shippingForm.name}</strong>, {shippingForm.city} - {shippingForm.pincode}</p>
                  </div>
                  <form onSubmit={handlePaymentSubmit} className="checkout-form">
                    <div className="form-group">
                      <label>Cardholder Name</label>
                      <input 
                        type="text" 
                        required 
                        value={paymentForm.cardName} 
                        onChange={(e) => setPaymentForm({ ...paymentForm, cardName: e.target.value })}
                        placeholder="Priya Sharma"
                      />
                    </div>
                    <div className="form-group">
                      <label>Card Number</label>
                      <div className="input-with-icon">
                        <input 
                          type="text" 
                          required 
                          value={paymentForm.cardNumber} 
                          onChange={handleCardNumberChange}
                          placeholder="4111 2222 3333 4444"
                        />
                        <CreditCard size={18} className="input-icon" />
                      </div>
                    </div>
                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Expiry Date</label>
                        <input 
                          type="text" 
                          required 
                          value={paymentForm.expiry} 
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                        />
                      </div>
                      <div className="form-group">
                        <label>CVV / CVC</label>
                        <input 
                          type="password" 
                          maxLength="3" 
                          required 
                          value={paymentForm.cvv} 
                          onChange={(e) => setPaymentForm({ ...paymentForm, cvv: e.target.value.replace(/\D/g, '') })}
                          placeholder="123"
                        />
                      </div>
                    </div>
                    
                    <div className="checkout-summary-bar flex items-center justify-between">
                      <div>
                        <span className="summary-label">Amount:</span>
                        <span className="summary-amount">₹{grandTotal.toLocaleString()}</span>
                      </div>
                      <div className="flex gap-1">
                        <button type="button" className="btn btn-outline" onClick={() => setCheckoutStep(1)}>
                          Back
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Pay ₹{grandTotal.toLocaleString()}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 3: Success Screen */}
              {checkoutStep === 3 && (
                <motion.div 
                  className="checkout-success-screen"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <CheckCircle2 size={72} color="hsl(150, 70%, 30%)" className="success-icon animate-pulse" />
                  <h1>Order Placed Successfully!</h1>
                  <p className="success-tagline">Thank you for stitching elegance with DesignStitch.</p>
                  
                  <div className="order-details-card">
                    <div className="detail-row">
                      <span>Order ID</span>
                      <strong>{orderId}</strong>
                    </div>
                    <div className="detail-row">
                      <span>Delivery Address</span>
                      <span>{shippingForm.address}, {shippingForm.city} - {shippingForm.pincode}</span>
                    </div>
                    <div className="detail-row border-none">
                      <span>Estimated Delivery</span>
                      <strong>3 to 5 business days</strong>
                    </div>
                  </div>

                  <p className="email-conf-msg">A confirmation email has been sent to <strong>{shippingForm.email}</strong>.</p>
                  
                  <div className="success-actions flex gap-1 justify-center">
                    <Link to="/shop" className="btn btn-primary" onClick={handleCloseCheckout}>
                      Continue Shopping <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cart;
