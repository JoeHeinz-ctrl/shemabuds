import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { MobileCategoryRow } from "../MobileCategoryRow";
import { useProducts } from "../../../../hooks/useProducts";
import { Product, useOrdering } from "../../OrderingSystem";
import { ArrowRight, Eye, ShoppingCart } from "lucide-react";
import { Button } from "../../ui/button";

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>("all");
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

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

  const handleCategoryClick = (categoryKey: string | null) => {
    setSelectedCategory(categoryKey);
    
    if (categoryKey && categoryKey !== "all") {
      // Scroll to the category section
      setTimeout(() => {
        const element = categoryRefs.current[categoryKey];
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  const allProducts = Object.values(categorizedProducts).flat();
  const showUnifiedView = selectedCategory === "all";

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
      {/* Premium Compact Header Section */}
      <div className="px-4 py-3">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-0.5"
        >
          <h1 
            className="text-center"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2.5rem",
              fontWeight: 700,
              color: "#2d2a26",
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
            }}
          >
            Collections
          </h1>
        </motion.div>

        {/* Subtitle - Reduced spacing */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-2"
        >
          <p 
            className="text-center"
            style={{
              fontSize: "0.9rem",
              fontWeight: 400,
              color: "#5a4638",
              letterSpacing: "0.005em",
              lineHeight: 1.4,
            }}
          >
            Browse our handcrafted products
          </p>
        </motion.div>

        {/* Enhanced Decorative Floral Divider - Reduced spacing */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex items-center justify-center gap-2 mb-2.5"
          style={{ originX: 0.5 }}
        >
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(212,116,74,0.4), transparent)" }} />
          {/* Enhanced Botanical SVG */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
            <path d="M14 3C14 3 13 7 13 10C13 12 13.5 13 14 13C14.5 13 15 12 15 10C15 7 14 3 14 3" stroke="#D4744A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="14" cy="14" r="2" fill="#D4744A"/>
            <path d="M11 13C9.5 14 8 16 8 18.5C8 20 9 21 10 22" stroke="#94B38A" strokeWidth="1" strokeLinecap="round" opacity="0.9"/>
            <path d="M17 13C18.5 14 20 16 20 18.5C20 20 19 21 18 22" stroke="#94B38A" strokeWidth="1" strokeLinecap="round" opacity="0.9"/>
            <circle cx="10" cy="11" r="0.8" fill="#EFBF43" opacity="0.8"/>
            <circle cx="9" cy="13" r="0.7" fill="#D0D488" opacity="0.7"/>
            <circle cx="18" cy="11" r="0.8" fill="#EFBF43" opacity="0.8"/>
            <circle cx="19" cy="13" r="0.7" fill="#D0D488" opacity="0.7"/>
            <path d="M13 16C12.5 17 12 18.5 12 20" stroke="#D0D488" strokeWidth="0.8" strokeLinecap="round" opacity="0.7"/>
            <path d="M15 16C15.5 17 16 18.5 16 20" stroke="#D0D488" strokeWidth="0.8" strokeLinecap="round" opacity="0.7"/>
          </svg>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(212,116,74,0.4), transparent)" }} />
        </motion.div>

        {/* Category Label - Reduced spacing */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-1.5 text-center"
        >
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "#2d2a26",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Category
          </h3>
        </motion.div>

        {/* Filter Chips Container - Compact */}
        {Object.keys(categorizedProducts).length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex overflow-x-auto gap-2 pb-1 justify-center"
            style={{
              scrollBehavior: "smooth",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <style>{`
              .chips-container::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            
            {/* ALL Products Chip */}
            <motion.button
              onClick={() => handleCategoryClick("all")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="group relative flex-shrink-0 h-9 px-5 rounded-full text-xs font-medium transition-all duration-250 whitespace-nowrap"
              style={{
                background: selectedCategory === "all" 
                  ? "linear-gradient(135deg, #D4744A 0%, #EFBF43 100%)"
                  : "#F2E7CB",
                border: selectedCategory === "all"
                  ? "1.5px solid #D4744A"
                  : "1.5px solid rgba(212,116,74,0.35)",
                color: selectedCategory === "all" ? "#ffffff" : "#5A4638",
                boxShadow: selectedCategory === "all"
                  ? "0 4px 12px rgba(212,116,74,0.3)"
                  : "0 2px 6px rgba(212,116,74,0.15), 0 1px 2px rgba(255,255,255,0.4) inset",
              }}
            >
              All
            </motion.button>

            {/* Individual Category Chips */}
            {Object.keys(categorizedProducts).map((categoryKey, index) => (
              <motion.button
                key={categoryKey}
                onClick={() => handleCategoryClick(categoryKey)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 + (index + 1) * 0.04 }}
                className="group relative flex-shrink-0 h-9 px-5 rounded-full text-xs font-medium transition-all duration-250 whitespace-nowrap"
                style={{
                  background: selectedCategory === categoryKey 
                    ? "linear-gradient(135deg, #D4744A 0%, #EFBF43 100%)"
                    : "#F2E7CB",
                  border: selectedCategory === categoryKey
                    ? "1.5px solid #D4744A"
                    : "1.5px solid rgba(212,116,74,0.35)",
                  color: selectedCategory === categoryKey ? "#ffffff" : "#5A4638",
                  boxShadow: selectedCategory === categoryKey
                    ? "0 4px 12px rgba(212,116,74,0.3)"
                    : "0 2px 6px rgba(212,116,74,0.15), 0 1px 2px rgba(255,255,255,0.4) inset",
                }}
              >
                {categoryLabels[categoryKey] || categoryKey}
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Product Section - Tighter spacing */}
      <div className="mt-4 space-y-6">
        {showUnifiedView ? (
          // Unified All Products View
          <div className="px-4">
            <div className="grid grid-cols-2 gap-3">
              {allProducts.map((product, index) => (
                <motion.div
                  key={`${product.id}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className="glass-strong rounded-xl overflow-hidden shadow-luxury active:shadow-luxury-lg transition-shadow flex flex-col"
                >
                  <div className="relative aspect-square bg-muted overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  <div className="p-3 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        {product.badge && (
                          <span className="inline-block px-2 py-0.5 bg-[#2d5f3f] text-white rounded-full text-[9px] font-bold tracking-wide">
                            {product.badge}
                          </span>
                        )}
                        {product.price && (
                          <span className="text-sm font-bold text-primary whitespace-nowrap">
                            {product.price}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-xs font-semibold text-foreground line-clamp-2 mb-1.5 min-h-[2.5rem]">
                        {product.title}
                      </h3>
                    </div>
                    
                    <div className="mt-2">
                      <Button
                        onClick={() => useOrdering().setSelectedProduct(product)}
                        size="sm"
                        className="w-full py-2 text-[11px] h-auto"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          // Category-based View
          Object.keys(categorizedProducts).map((categoryKey) => (
            <div 
              key={categoryKey}
              ref={(el) => {
                if (el) categoryRefs.current[categoryKey] = el;
              }}
              className="px-4"
            >
              {/* Category Title */}
              <h2 className="text-lg font-semibold text-foreground mb-3">
                {categoryLabels[categoryKey] || categoryKey}
              </h2>

              {/* Product Grid */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                {categorizedProducts[categoryKey].map((product, index) => (
                  <motion.div
                    key={`${product.id}-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                    className="glass-strong rounded-xl overflow-hidden shadow-luxury active:shadow-luxury-lg transition-shadow flex flex-col"
                  >
                    <div className="relative aspect-square bg-muted overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    <div className="p-3 flex flex-col flex-1 justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          {product.badge && (
                            <span className="inline-block px-2 py-0.5 bg-[#2d5f3f] text-white rounded-full text-[9px] font-bold tracking-wide">
                              {product.badge}
                            </span>
                          )}
                          {product.price && (
                            <span className="text-sm font-bold text-primary whitespace-nowrap">
                              {product.price}
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-xs font-semibold text-foreground line-clamp-2 mb-1.5 min-h-[2.5rem]">
                          {product.title}
                        </h3>
                      </div>
                      
                      <div className="mt-2">
                        <Button
                          onClick={() => useOrdering().setSelectedProduct(product)}
                          size="sm"
                          className="w-full py-2 text-[11px] h-auto"
                        >
                          <Eye className="w-3.5 h-3.5 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Show All Products Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="text-center mb-4"
              >
                <Button
                  className="bg-white/70 hover:bg-white border border-[#D4744A] text-[#D4744A] hover:text-white hover:bg-[#D4744A] transition-all duration-300 px-6 py-2 rounded-full text-sm font-medium"
                >
                  Show All Products
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </div>
          ))
        )}
      </div>

      {Object.keys(categorizedProducts).length === 0 && (
        <div className="text-center py-12 px-4">
          <p className="text-muted-foreground">No products available at the moment.</p>
        </div>
      )}
    </div>
  );
}
