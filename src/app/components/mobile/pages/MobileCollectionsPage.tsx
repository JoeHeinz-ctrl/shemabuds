import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useProducts } from "../../../../hooks/useProducts";
import { Product, useOrdering } from "../../OrderingSystem";
import { Eye, ShoppingCart, Heart } from "lucide-react";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import { AuthModal } from "../../AuthModal";

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
  "ring-plater": "Ring Plater",
  "gift-hampers": "Gift Hampers",
  "bouquet": "Bouquets",
};

// Featured-style Product Card Component
function FeaturedStyleProductCard({ product, index }: { product: Product; index: number }) {
  const { setSelectedProduct, addToCart } = useOrdering();
  const [liked, setLiked] = useState(false);

  const handleViewDetails = () => {
    setSelectedProduct(product);
  };

  const handleQuickAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      product,
      quantity: 1,
      customizations: {},
      notes: "",
    });
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="group overflow-hidden border border-border hover:shadow-luxury-lg transition-all duration-300 bg-card rounded-3xl">
        {/* Image Section */}
        <div className="relative overflow-hidden aspect-square">
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full h-full"
          >
            <img
              src={product.image}
              alt={product.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Wishlist Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLike}
            className="absolute top-2 right-2 glass p-2 rounded-full shadow-luxury"
          >
            <Heart 
              className={`w-4 h-4 transition-colors duration-200 ${
                liked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
              }`} 
            />
          </motion.button>
        </div>

        {/* Content Section */}
        <div className="p-3">
          {/* Badge and Price Row */}
          <div className="flex items-center justify-between gap-2 mb-2">
            {product.badge && (
              <span className="inline-block px-2.5 py-1 bg-[#2d5f3f] text-white rounded-full text-[10px] font-bold tracking-wide">
                {product.badge}
              </span>
            )}
            {product.price && (
              <span className="text-sm font-bold text-primary whitespace-nowrap">
                {product.price}
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3 className="text-sm text-foreground font-semibold mb-2 line-clamp-2">{product.title}</h3>

          {/* Action Buttons */}
          <div className="flex gap-1.5">
            <Button
              onClick={handleViewDetails}
              size="sm"
              variant="outline"
              className="flex-1 border-primary text-primary hover:bg-primary/10 text-[10px] h-7"
            >
              <Eye className="w-3 h-3 mr-1" />
              View
            </Button>
            <Button
              onClick={handleQuickAddToCart}
              size="sm"
              className="flex-1 bg-primary hover:bg-primary/95 text-primary-foreground text-[10px] h-7"
            >
              <ShoppingCart className="w-3 h-3 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export function MobileCollectionsPage() {
  const { products, loading } = useProducts(demoProducts);
  const [categorizedProducts, setCategorizedProducts] = useState<Record<string, Product[]>>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>("all");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(60);

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

  // Dynamically measure the header height to prevent any gaps
  useEffect(() => {
    const updateHeight = () => {
      const header = document.getElementById("mobile-header");
      if (header) {
        setHeaderHeight(header.getBoundingClientRect().height || header.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    window.addEventListener("load", updateHeight);

    // Also observe size changes in case of dynamic resizing/render delays
    const header = document.getElementById("mobile-header");
    let observer: ResizeObserver | null = null;
    if (header) {
      observer = new ResizeObserver(() => updateHeight());
      observer.observe(header);
    }

    return () => {
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("load", updateHeight);
      if (observer) observer.disconnect();
    };
  }, []);

  const handleCategoryClick = (categoryKey: string | null) => {
    setSelectedCategory(categoryKey);
  };

  const allProducts = Object.values(categorizedProducts).flat();
  const showUnifiedView = selectedCategory === "all";
  const selectedCategoryProducts = selectedCategory && selectedCategory !== "all" 
    ? categorizedProducts[selectedCategory] 
    : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted" style={{ paddingTop: `${headerHeight}px` }}>
        <div className="px-4 mb-4 text-center">
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
    <div style={{ width: "100%", display: "flex", flexDirection: "column", margin: 0, paddingTop: `${headerHeight}px` }}>
      {/* COLLECTIONS HEADING - Normal flow, scrolls away naturally */}
      <div style={{ padding: "12px 16px 2px 16px", background: "linear-gradient(to bottom, var(--background), var(--muted))", margin: 0, textAlign: "center" }}>
        <h1 style={{ 
          fontSize: "2.4rem",
          fontWeight: "bold",
          margin: "0 0 2px 0",
          padding: 0,
          background: "linear-gradient(135deg, #d47448 0%, #efbf43 55%, #94b38a 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
          fontFamily: "var(--font-serif, serif)",
        }}>Collections</h1>
        <p style={{ 
          fontSize: "0.85rem", 
          color: "#b8572d", // Premium terracotta dark
          fontWeight: 600, 
          margin: 0, 
          padding: 0,
          letterSpacing: "0.05em",
          textTransform: "uppercase" as const,
        }}>Browse our handcrafted products</p>
      </div>

      {/* CATEGORY FILTER BAR - Sticky, positioned below navbar */}
      {Object.keys(categorizedProducts).length > 0 && (
        <div
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          style={{
            position: "sticky",
            top: `${headerHeight + 2}px`, // Slight gap below navbar
            zIndex: 40,
            background: "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.15) 100%)",
            backdropFilter: "blur(20px) saturate(140%)",
            WebkitBackdropFilter: "blur(20px) saturate(140%)",
            border: "1px solid rgba(255,255,255,0.4)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            padding: "8px 12px",
            margin: "6px auto 8px auto",
            width: "85%",
            maxWidth: "480px",
            borderRadius: "9999px",
            boxSizing: "border-box" as const,
          }}
        >
          <div
            className="flex overflow-x-auto overflow-y-hidden gap-1.5 w-full scrollbar-hide"
            style={{
              WebkitOverflowScrolling: "touch",
              touchAction: "pan-x",
              scrollBehavior: "smooth",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              paddingBottom: 0,
              margin: 0,
            } as React.CSSProperties}
          >
            {/* ALL Products Chip */}
            <motion.button
              onClick={() => handleCategoryClick("all")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="group relative flex-shrink-0 px-4 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap"
              style={{
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: selectedCategory === "all" 
                  ? "linear-gradient(135deg, #D4744A 0%, #EFBF43 100%)"
                  : "rgba(255, 255, 255, 0.45)",
                border: selectedCategory === "all"
                  ? "none"
                  : "1px solid rgba(212, 116, 74, 0.15)",
                color: selectedCategory === "all" ? "#ffffff" : "#5A4638",
                boxShadow: selectedCategory === "all"
                  ? "0 4px 12px rgba(212, 116, 74, 0.25)"
                  : "none",
                margin: 0,
                backdropFilter: "blur(4px)",
              }}
            >
              All
            </motion.button>

            {/* Individual Category Chips */}
            {Object.keys(categorizedProducts)
              .sort((a, b) => {
                if (a === "ring-plater") return -1;
                if (b === "ring-plater") return 1;
                return a.localeCompare(b);
              })
              .map((categoryKey, index) => (
              <motion.button
                key={categoryKey}
                onClick={() => handleCategoryClick(categoryKey)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 + (index + 1) * 0.02 }}
                className="group relative flex-shrink-0 px-4 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap"
                style={{
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: selectedCategory === categoryKey 
                    ? "linear-gradient(135deg, #D4744A 0%, #EFBF43 100%)"
                    : "rgba(255, 255, 255, 0.45)",
                  border: selectedCategory === categoryKey
                    ? "none"
                    : "1px solid rgba(212, 116, 74, 0.15)",
                  color: selectedCategory === categoryKey ? "#ffffff" : "#5A4638",
                  boxShadow: selectedCategory === categoryKey
                    ? "0 4px 12px rgba(212, 116, 74, 0.25)"
                    : "none",
                  margin: 0,
                  backdropFilter: "blur(4px)",
                }}
              >
                {categoryLabels[categoryKey] || categoryKey}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* PRODUCT GRID - Normal flow, scrolls underneath sticky bar */}
      {showUnifiedView && allProducts.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-2 gap-4"
          style={{ 
            padding: "16px",
            paddingBottom: "120px",
            background: "linear-gradient(to bottom, var(--background), var(--muted))",
            margin: 0,
            width: "100%",
          }}
        >
          {allProducts.map((product, index) => (
            <FeaturedStyleProductCard
              key={`${product.id}-${index}`}
              product={product}
              index={index}
            />
          ))}
        </motion.div>
      ) : selectedCategory && selectedCategoryProducts.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-2 gap-4"
          style={{ 
            padding: "16px",
            paddingBottom: "120px",
            background: "linear-gradient(to bottom, var(--background), var(--muted))",
            margin: 0,
            width: "100%",
          }}
        >
          {selectedCategoryProducts.map((product, index) => (
            <FeaturedStyleProductCard
              key={`${product.id}-${index}`}
              product={product}
              index={index}
            />
          ))}
        </motion.div>
      ) : Object.keys(categorizedProducts).length > 0 ? (
        <div style={{ textAlign: "center", paddingTop: "40px", padding: "16px", background: "linear-gradient(to bottom, var(--background), var(--muted))", width: "100%", margin: 0 }}>
          <p style={{ color: "var(--color-muted-foreground)" }}>No products in this category.</p>
        </div>
      ) : (
        <div style={{ textAlign: "center", paddingTop: "40px", padding: "16px", background: "linear-gradient(to bottom, var(--background), var(--muted))", width: "100%", margin: 0 }}>
          <p style={{ color: "var(--color-muted-foreground)" }}>No products available at the moment.</p>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}
