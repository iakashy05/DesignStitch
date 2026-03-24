import p1 from '../assets/images/32628191408eafd987cefddec6da8621.jpg';
import p2 from '../assets/images/Arishta Art Silk Self Design Kurta & Churidar Material.jpeg';
import p3 from '../assets/images/Embroidery Kurta with Dupatta.jpeg';
import p4 from '../assets/images/Festive, Reception Blue color Organza Silk fabric Salwar Kameez _ 1946143.jpeg';
import p5 from '../assets/images/Pink embroidered rayon kurta set - Kurta-sets.jpeg';
import p6 from '../assets/images/Pure Cotton Embroidered Kurta Set for Women ₹ 819.jpeg';
import cat1 from '../assets/images/Women\'s Cotton Yoke Design Straight Kurta Pant with Dupatta Set.jpeg';
import cat2 from '../assets/images/download.jpeg';

export const products = [
  {
    id: 1,
    name: "Royal Maroon Embroidered Anarkali",
    category: "Suits",
    price: 4500,
    image: p1,
    description: "A stunning maroon silk Anarkali suit with intricate gold dori embroidery and sequence work. Perfect for festive occasions.",
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    rating: 4.8
  },
  {
    id: 2,
    name: "Cream & Gold Silk Salwar Set",
    category: "Salwar",
    price: 3200,
    image: p2,
    description: "Classic cream salwar suit with traditional gold thread embroidery. Made from premium Chanderi silk.",
    sizes: ["M", "L", "XL"],
    inStock: true,
    rating: 4.5
  },
  {
    id: 3,
    name: "Pastel Mint Floral Embroidery Suit",
    category: "New Arrivals",
    price: 3800,
    image: p3,
    description: "Elegant mint green suit with delicate floral hand-embroidery. Light and comfortable for summer weddings.",
    sizes: ["S", "M", "L"],
    inStock: true,
    rating: 4.9
  },
  {
    id: 4,
    name: "Festive Red Zardosi Patiala",
    category: "Festive Wear",
    price: 4200,
    image: p4,
    description: "Authentic Patiala suit in vibrant red with heavy Zardosi work on the neck and sleeves.",
    sizes: ["M", "L", "XL", "XXL"],
    inStock: true,
    rating: 4.7
  },
  {
    id: 5,
    name: "Beige Minimalist Chikankari Suit",
    category: "Suits",
    price: 2800,
    image: p5,
    description: "Graceful beige cotton suit with white Chikankari hand-embroidery. A timeless addition to your wardrobe.",
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    rating: 4.6
  },
  {
    id: 6,
    name: "Emerald Green Velvet Jora",
    category: "Festive Wear",
    price: 5500,
    image: p6,
    description: "Premium emerald green velvet suit with heavy gold embroidery and stone work.",
    sizes: ["M", "L"],
    inStock: true,
    rating: 5.0
  }
];

export const categories = [
  { name: "Suits", count: 12, image: cat1 },
  { name: "Salwar", count: 8, image: cat2 },
  { name: "Festive Wear", count: 15, image: p4 },
  { name: "New Arrivals", count: 6, image: p3 }
];
