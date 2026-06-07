import { useState, useEffect } from "react";
import { getAllProducts, FirebaseProduct } from "../services/productService";
import { Product } from "../app/components/OrderingSystem";

// This hook merges demo products with Firebase products
export function useProducts(demoProducts: Record<string, Product[]>) {
  const [products, setProducts] = useState<Record<string, Product[]>>(demoProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();

    // Listen for product updates from other tabs/admin panel
    const handleProductsUpdated = () => {
      console.log("productsUpdated event received, reloading products...");
      loadProducts();
    };

    window.addEventListener('productsUpdated', handleProductsUpdated);
    return () => window.removeEventListener('productsUpdated', handleProductsUpdated);
  }, []);

  const loadProducts = async () => {
    try {
      console.log("Loading products from Firestore...");
      const firebaseProducts = await getAllProducts();
      console.log("Loaded products from Firestore:", firebaseProducts);
      
      // Convert Firebase products to Product format
      const convertedProducts: Product[] = firebaseProducts.map((fp: FirebaseProduct) => ({
        id: fp.id || "",
        title: fp.title,
        description: fp.description,
        image: fp.image,
        images: fp.images,
        badge: fp.badge,
        category: fp.category,
        price: fp.price,
        customizationOptions: fp.customizationOptions,
      }));

      // Group Firebase products by category
      const groupedFirebaseProducts: Record<string, Product[]> = {};
      convertedProducts.forEach((product) => {
        const categoryKey = getCategoryKey(product.category);
        if (!groupedFirebaseProducts[categoryKey]) {
          groupedFirebaseProducts[categoryKey] = [];
        }
        groupedFirebaseProducts[categoryKey].push(product);
      });

      console.log("Grouped products by category:", groupedFirebaseProducts);

      // Merge demo products with Firebase products
      const mergedProducts: Record<string, Product[]> = { ...demoProducts };
      
      Object.keys(groupedFirebaseProducts).forEach((categoryKey) => {
        if (mergedProducts[categoryKey]) {
          // Add Firebase products to existing category
          mergedProducts[categoryKey] = [
            ...mergedProducts[categoryKey],
            ...groupedFirebaseProducts[categoryKey],
          ];
        } else {
          // Create new category with Firebase products
          mergedProducts[categoryKey] = groupedFirebaseProducts[categoryKey];
        }
      });

      console.log("Final merged products:", mergedProducts);
      setProducts(mergedProducts);
    } catch (error) {
      console.error("Error loading products:", error);
      // Keep demo products on error
      setProducts(demoProducts);
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, refresh: loadProducts };
}

// Helper function to map category names to category keys
function getCategoryKey(category: string): string {
  const mapping: Record<string, string> = {
    "Bouquets": "bouquets",
    "Handmade Gifts": "gifts",
    "Event Decorations": "events",
    "Wedding Accessories": "wedding",
    "Custom Orders": "custom",
    "Boutique Collection": "boutique",
  };

  return mapping[category] || category.toLowerCase().replace(/\s+/g, "-");
}
