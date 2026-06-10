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
  };

  const allProducts = Object.values(categorizedProducts).flat();
  const showUnifiedView = selectedCategory === "all";
  const selectedCategoryProducts = selectedCategory && selectedCategory !== "all" 
    ? categorizedProducts[selectedCategory] 
    : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted">
        <div style={{ height: "140px" }} />
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
    <div style={{ width: "100%", display: "flex", flexDirection: "column", margin: 0, padding: 0 }}>
      {/* COLLECTIONS HEADING - Normal flow, scrolls away naturally */}
      <div style={{ padding: "16px", background: "linear-gradient(to bottom, var(--background), var(--muted))", margin: 0 }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--foreground)", margin: "0 0 8px 0", padding: 0 }}>Collections</h1>
        <p style={{ fontSize: "0.9rem", color: "var(--muted-foreground)", margin: 0, padding: 0 }}>Browse our handcrafted products</p>
      </div>

      {/* CATEGORY FILTER BAR - Sticky, positioned below navbar */}
      {Object.keys(categorizedProducts).length > 0 && (
        <div
          style={{
            position: "sticky",
            top: "76px",
            zIndex: 900,
            background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,245,235,0.9) 50%, rgba(255,255,255,0.95) 100%)",
            backdropFilter: "blur(24px) saturate(130%)",
            WebkitBackdropFilter: "blur(24px) saturate(130%)",
            borderBottom: "1px solid rgba(255,255,255,0.4)",
            padding: "12px 16px",
            margin: 0,
            left: 0,
            right: 0,
            width: "100%",
            boxSizing: "border-box" as const,
          }}
        >
          <div
            className="flex overflow-x-auto overflow-y-hidden gap-2.5 w-full"
            style={{
              WebkitOverflowScrolling: "touch",
              touchAction: "pan-x",
              scrollBehavior: "smooth",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              paddingBottom: "2px",
              margin: 0,
            } as React.CSSProperties}
          >
            {/* ALL Products Chip */}
            <motion.button
              onClick={() => handleCategoryClick("all")}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="group relative flex-shrink-0 px-6 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap"
              style={{
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: selectedCategory === "all" 
                  ? "linear-gradient(135deg, #D4744A 0%, #EFBF43 100%)"
                  : "#F6EFE7",
                border: selectedCategory === "all"
                  ? "none"
                  : "1.5px solid #E7D8C8",
                color: selectedCategory === "all" ? "#ffffff" : "#5A4638",
                boxShadow: selectedCategory === "all"
                  ? "0 6px 16px rgba(212, 116, 74, 0.3)"
                  : "none",
                margin: 0,
              }}
            >
              All
            </motion.button>

            {/* Individual Category Chips */}
            {Object.keys(categorizedProducts).map((categoryKey, index) => (
              <motion.button
                key={categoryKey}
                onClick={() => handleCategoryClick(categoryKey)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 + (index + 1) * 0.02 }}
                className="group relative flex-shrink-0 px-6 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap"
                style={{
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: selectedCategory === categoryKey 
                    ? "linear-gradient(135deg, #D4744A 0%, #EFBF43 100%)"
                    : "#F6EFE7",
                  border: selectedCategory === categoryKey
                    ? "none"
                    : "1.5px solid #E7D8C8",
                  color: selectedCategory === categoryKey ? "#ffffff" : "#5A4638",
                  boxShadow: selectedCategory === categoryKey
                    ? "0 6px 16px rgba(212, 116, 74, 0.3)"
                    : "none",
                  margin: 0,
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
