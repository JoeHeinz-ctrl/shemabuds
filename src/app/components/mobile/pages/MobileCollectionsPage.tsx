import { useState, useEffect } from "react";
import { MobileCategoryRow } from "../MobileCategoryRow";
import { useProducts } from "../../../../hooks/useProducts";
import { Product } from "../../OrderingSystem";

// Empty demo products - all products will come from Firebase
const demoProducts: Record<string, Product[]> = {
  bouquets: [],
  gifts: [],
  events: [],
  wedding: [],
  custom: [],
  boutique: [],
};

const categoryLabels: Record<string, string> = {
  bouquets: "Bouquets",
  gifts: "Handmade Gifts",
  events: "Event Decorations",
  wedding: "Wedding Accessories",
  custom: "Custom Orders",
  boutique: "Boutique Collection",
};

export function MobileCollectionsPage() {
  const { products, loading } = useProducts(demoProducts);
  const [categorizedProducts, setCategorizedProducts] = useState<Record<string, Product[]>>({});

  useEffect(() => {
    // Organize products by category
    const organized: Record<string, Product[]> = {};
    
    Object.keys(products).forEach((categoryKey) => {
      if (products[categoryKey] && products[categoryKey].length > 0) {
        organized[categoryKey] = products[categoryKey];
      }
    });

    setCategorizedProducts(organized);
  }, [products]);

  if (loading) {
    return (
      <div className="md:hidden min-h-screen bg-gradient-to-b from-background to-muted pt-[76px]">
        <div className="px-4 mb-4">
          <h1 className="text-2xl font-bold text-foreground">Collections</h1>
          <p className="text-sm text-muted-foreground mt-1">Browse our handcrafted products</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="md:hidden min-h-screen bg-gradient-to-b from-background to-muted pt-[76px] pb-4">
      {/* Page Title */}
      <div className="px-4 mb-4">
        <h1 className="text-2xl font-bold text-foreground">Collections</h1>
        <p className="text-sm text-muted-foreground mt-1">Browse our handcrafted products</p>
      </div>

      {/* Category Rows */}
      <div className="space-y-4">
        {Object.keys(categorizedProducts).map((categoryKey) => (
          <MobileCategoryRow
            key={categoryKey}
            categoryName={categoryLabels[categoryKey] || categoryKey}
            products={categorizedProducts[categoryKey]}
            maxPreview={4}
          />
        ))}
      </div>

      {Object.keys(categorizedProducts).length === 0 && (
        <div className="text-center py-12 px-4">
          <p className="text-muted-foreground">No products available at the moment.</p>
        </div>
      )}
    </div>
  );
}
