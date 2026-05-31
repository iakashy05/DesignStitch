/**
 * Safely sends tracking events to Google Analytics (gtag.js).
 * 
 * @param {string} eventName Name of the event (e.g., 'add_to_cart')
 * @param {object} params Event parameters (e.g., { item_id: 1, value: 4500 })
 */
export const trackEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && typeof window.dataLayer !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      ...params,
      send_to: 'G-SQ6BJDNEJY', // Explicitly target user's Measurement ID
      debug_mode: true         // Forces real-time reporting to display events instantly!
    });
    console.log(`[GA4 Tracking] Sent event "${eventName}" to Google Analytics:`, params);
  } else {
    console.log(`[GA4 Simulation Mode] Event "${eventName}":`, params);
  }
};

/**
 * Starts a simulated browsing session that automatically sends realistic actions
 * to Google Analytics. This keeps the Google Analytics Realtime Dashboard highly
 * active with simulated concurrent users, pageviews, and shopping conversions!
 */
export const startTrafficSimulation = () => {
  if (typeof window === 'undefined') return;
  
  console.log("%c[GA4 Simulator] Traffic simulation started! Keep this tab open to feed live data into Google Analytics.", "color: #2ec4b6; font-weight: bold; font-size: 14px;");

  const mockPages = [
    { title: "Home | DesignStitch", path: "/" },
    { title: "Shop Collection | DesignStitch", path: "/shop" },
    { title: "Our Story | DesignStitch", path: "/about" },
    { title: "Fashion Blog | DesignStitch", path: "/blog" },
    { title: "Contact Us | DesignStitch", path: "/contact" },
    { title: "My Wishlist | DesignStitch", path: "/wishlist" },
    { title: "Royal Maroon Embroidered Anarkali | DesignStitch", path: "/product/1" },
    { title: "Emerald Green Velvet Jora | DesignStitch", path: "/product/6" },
    { title: "Midnight Black Georgette Sharara | DesignStitch", path: "/product/7" }
  ];

  const mockProducts = [
    { id: 1, name: "Royal Maroon Embroidered Anarkali", price: 4500, category: "Suits" },
    { id: 3, name: "Pastel Mint Floral Embroidery Suit", price: 3800, category: "New Arrivals" },
    { id: 6, name: "Emerald Green Velvet Jora", price: 5500, category: "Festive Wear" },
    { id: 7, name: "Midnight Black Georgette Sharara", price: 4800, category: "Suits" },
    { id: 8, name: "Mustard Yellow Silk Lehenga-Suit", price: 6200, category: "Festive Wear" }
  ];

  // Routine to run simulated user events
  const runSimulatedAction = () => {
    const actionType = Math.random(); // Decide what the mock user does

    if (actionType < 0.4) {
      // 1. Simulate a page view
      const page = mockPages[Math.floor(Math.random() * mockPages.length)];
      trackEvent('page_view', {
        page_title: page.title,
        page_location: window.location.origin + page.path,
        page_path: page.path
      });
    } else if (actionType < 0.6) {
      // 2. Simulate viewing a product item
      const product = mockProducts[Math.floor(Math.random() * mockProducts.length)];
      trackEvent('view_item', {
        currency: 'INR',
        value: product.price,
        items: [{
          item_id: product.id.toString(),
          item_name: product.name,
          item_category: product.category,
          price: product.price
        }]
      });
    } else if (actionType < 0.75) {
      // 3. Simulate adding to wishlist
      const product = mockProducts[Math.floor(Math.random() * mockProducts.length)];
      trackEvent('add_to_wishlist', {
        currency: 'INR',
        value: product.price,
        items: [{
          item_id: product.id.toString(),
          item_name: product.name,
          price: product.price
        }]
      });
    } else if (actionType < 0.9) {
      // 4. Simulate adding to cart
      const product = mockProducts[Math.floor(Math.random() * mockProducts.length)];
      trackEvent('add_to_cart', {
        currency: 'INR',
        value: product.price,
        items: [{
          item_id: product.id.toString(),
          item_name: product.name,
          price: product.price,
          quantity: 1
        }]
      });
    } else {
      // 5. Simulate a full successful purchase transaction!
      const product = mockProducts[Math.floor(Math.random() * mockProducts.length)];
      const orderId = 'DS-SIM-' + Math.floor(100000 + Math.random() * 900000);
      trackEvent('purchase', {
        transaction_id: orderId,
        value: product.price,
        currency: 'INR',
        tax: 0,
        shipping: 0,
        items: [{
          item_id: product.id.toString(),
          item_name: product.name,
          price: product.price,
          quantity: 1
        }]
      });
    }

    // Schedule next random action in 4-10 seconds
    const nextInterval = Math.floor(Math.random() * 6000) + 4000;
    setTimeout(runSimulatedAction, nextInterval);
  };

  // Start the loop
  runSimulatedAction();
};
