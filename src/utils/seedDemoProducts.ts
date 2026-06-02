import { addProduct, FirebaseProduct } from "../services/productService";

// Demo products data from Services.tsx converted to Firebase format
const demoProducts: Omit<FirebaseProduct, 'id'>[] = [
  // Bouquets
  {
    title: "Bridal Bouquet",
    description: "Elegant handcrafted bouquets designed to complement your special day with timeless beauty.",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=1000&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=1000&fit=crop"
    ],
    badge: "Wedding",
    category: "Bouquets",
    price: "₹2,500+",
    demo: true,
    featured: true,
    customizationOptions: [
      { label: "Color Theme", options: ["White & Cream", "Pink & White", "Blush & Gold", "Pastel Mix"] },
      { label: "Size", options: ["Small", "Medium", "Large", "Extra Large"] },
      { label: "Flower Type", options: ["Roses", "Peonies", "Mixed Blooms", "Seasonal Flowers"] }
    ]
  },
  {
    title: "Rose Bouquet",
    description: "Classic rose arrangements in premium colors, perfect for expressing love and appreciation.",
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=800&h=1000&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=1000&fit=crop"
    ],
    badge: "Romance",
    category: "Bouquets",
    price: "₹1,500+",
    demo: true,
    customizationOptions: [
      { label: "Rose Color", options: ["Red", "Pink", "White", "Yellow", "Mixed Colors"] },
      { label: "Number of Roses", options: ["12 Roses", "24 Roses", "36 Roses", "50 Roses"] },
      { label: "Wrapping Style", options: ["Classic Paper", "Luxury Fabric", "Transparent Cellophane", "Rustic Burlap"] }
    ]
  },
  {
    title: "Surprise Bouquet",
    description: "Curated seasonal blooms arranged to create unforgettable moments of joy.",
    image: "https://images.unsplash.com/photo-1533793241176-a270e75ef2ad?w=800&h=1000&fit=crop",
    badge: "Special",
    category: "Bouquets",
    price: "₹1,200+",
    demo: true,
    customizationOptions: [
      { label: "Color Preference", options: ["Bright & Vibrant", "Soft Pastels", "Warm Tones", "Cool Tones", "Designer's Choice"] },
      { label: "Occasion", options: ["Birthday", "Anniversary", "Congratulations", "Just Because"] },
      { label: "Size", options: ["Standard", "Deluxe", "Premium"] }
    ]
  },
  
  // Handmade Gifts
  {
    title: "Luxury Gift Box",
    description: "Beautifully curated gift boxes filled with handmade treasures and personalized touches.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&h=1000&fit=crop",
    badge: "Premium",
    category: "Handmade Gifts",
    price: "₹1,800+",
    demo: true,
    featured: true,
    customizationOptions: [
      { label: "Theme", options: ["Birthday", "Anniversary", "Thank You", "Congratulations"] },
      { label: "Box Size", options: ["Small", "Medium", "Large"] },
      { label: "Color Scheme", options: ["Gold & Cream", "Pink & Rose", "Blue & Silver", "Custom"] }
    ]
  },
  {
    title: "Memory Frame",
    description: "Custom-designed frames that preserve your cherished memories with artistic elegance.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800&h=1000&fit=crop",
    badge: "Keepsake",
    category: "Handmade Gifts",
    price: "₹900+",
    demo: true,
    customizationOptions: [
      { label: "Frame Size", options: ["4x6", "5x7", "8x10", "11x14"] },
      { label: "Frame Style", options: ["Classic Wood", "Modern Metal", "Vintage", "Rustic"] },
      { label: "Personalization", options: ["Name Engraving", "Date Engraving", "Quote", "None"] }
    ]
  },

  // Event Decorations
  {
    title: "Birthday Setup",
    description: "Complete birthday decoration packages that transform spaces into magical celebrations.",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=1000&fit=crop",
    badge: "Party",
    category: "Event Decorations",
    price: "Starting ₹3,000",
    demo: true,
    customizationOptions: [
      { label: "Theme", options: ["Princess", "Superhero", "Unicorn", "Tropical", "Elegant Adult", "Custom"] },
      { label: "Color Scheme", options: ["Pink & Gold", "Blue & Silver", "Rainbow", "Black & Gold", "Custom"] },
      { label: "Package Size", options: ["Basic", "Standard", "Premium", "Luxury"] }
    ]
  },

  // Wedding Accessories
  {
    title: "Wedding Decor",
    description: "Complete wedding decoration services to bring your dream celebration to life.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop",
    badge: "Complete",
    category: "Wedding Accessories",
    price: "Starting ₹15,000",
    demo: true,
    featured: true,
    customizationOptions: [
      { label: "Package", options: ["Basic", "Standard", "Premium", "Luxury"] },
      { label: "Theme", options: ["Traditional", "Modern", "Rustic", "Garden", "Beach", "Custom"] },
      { label: "Color Palette", options: ["Blush & Gold", "White & Green", "Purple & Silver", "Custom"] }
    ]
  },

  // Custom Orders
  {
    title: "Personalized Gifts",
    description: "Bespoke creations crafted specifically for your unique vision and requirements.",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&h=1000&fit=crop",
    badge: "Unique",
    category: "Custom Orders",
    price: "Starting ₹1,000",
    demo: true,
    customizationOptions: [
      { label: "Type", options: ["Name Art", "Photo Gift", "Message Board", "Special Request"] },
      { label: "Size", options: ["Small", "Medium", "Large", "Custom"] }
    ]
  },

  // Boutique Collection
  {
    title: "Hair Accessories",
    description: "Handcrafted hair accessories that add elegance and charm to any hairstyle.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop",
    badge: "Fashion",
    category: "Boutique Collection",
    price: "₹200+",
    demo: true,
    customizationOptions: [
      { label: "Type", options: ["Hair Clips", "Headbands", "Hair Pins", "Scrunchies"] },
      { label: "Style", options: ["Floral", "Pearl", "Minimalist", "Statement"] },
      { label: "Color", options: ["Gold", "Silver", "Rose Gold", "Colorful", "Custom"] }
    ]
  }
];

export async function seedDemoProducts(): Promise<void> {
  console.log("Starting to seed demo products...");
  
  try {
    for (const product of demoProducts) {
      const id = await addProduct(product);
      if (id) {
        console.log(`✅ Added demo product: ${product.title}`);
      } else {
        console.log(`❌ Failed to add: ${product.title}`);
      }
    }
    console.log("🎉 Demo products seeding completed!");
  } catch (error) {
    console.error("Error seeding demo products:", error);
  }
}

// Function to call from browser console
(window as any).seedDemoProducts = seedDemoProducts;