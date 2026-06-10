import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useProducts } from "../../../../hooks/useProducts";
import { Product, useOrdering } from "../../OrderingSystem";
import { Eye, ShoppingCart, Heart } from "lucide-react";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";

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
    <div className="md:hidden min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Fixed Top - Navbar Container */}
      <div className="fixed top-0 left-0 right-0 z-40 pt-[76px]" />

      {/* Main Scrollable Container */}
      <div className="pt-[76px]">
        {/* Ultra-Compact Hero Section - Minimal Padding */}
        <div className="px-4 py-1 bg-gradient-to-b from-background to-muted">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-0"
          >
            <h1 
              className="text-center"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2.5rem",
                fontWeight: 700,
                color: "#2d2a26",
                letterSpacing: "-0.01em",
                lineHeight: 1.05,
                marginBottom: "2px",
              }}
            >
              Collections
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-2.5"
          >
            <p 
              className="text-center"
              style={{
                fontSize: "0.9rem",
                fontWeight: 400,
                color: "#5a4638",
                letterSpacing: "0.002em",
                lineHeight: 1.3,
                marginBottom: 0,
              }}
            >
              Browse our handcrafted products
            </p>
          </motion.div>
        </div>

        {/* Sticky Category Filter Bar - Now in the scrolling container */}
        {Object.keys(categorizedProducts).length > 0 && (
          <div
            className="sticky z-40"
            style={{
              top: "76px",
              background: "linear-gradient(180deg, rgba(242,231,203,0.98) 0%, rgba(242,231,203,0.96) 100%)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderBottom: "1px solid rgba(212,116,74,0.08)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
            }}
          >
            <div className="px-4 py-2">
              <div
                className="flex overflow-x-auto overflow-y-hidden gap-2.5"
                style={{
                  WebkitOverflowScrolling: "touch",
                  touchAction: "pan-x",
                  scrollBehavior: "smooth",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                } as React.CSSProperties}
              >
                <style>{`
                  .chips-scroll::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                
                {/* ALL Products Chip */}
                <motion.button
                  onClick={() => handleCategoryClick("all")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="group relative flex-shrink-0 px-5 rounded-full text-sm font-medium transition-all duration-250 whitespace-nowrap"
                  style={{
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    background: selectedCategory === "all" 
                      ? "linear-gradient(135deg, #D4744A 0%, #EFBF43 100%)"
                      : "#F2E7CB",
                    border: selectedCategory === "all"
                      ? "none"
                      : "1px solid rgba(212,116,74,0.15)",
                    color: selectedCategory === "all" ? "#ffffff" : "#5A4638",
                    boxShadow: selectedCategory === "all"
                      ? "0 4px 12px rgba(212,116,74,0.25)"
                      : "none",
                  }}
                >
                  All
                </motion.button>

                {/* Individual Category Chips */}
                {Object.keys(categorizedProducts).map((categoryKey, index) => (
                  <motion.button
                    key={categoryKey}
                    onClick={() => handleCategoryClick(categoryKey)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 + (index + 1) * 0.03 }}
                    className="group relative flex-shrink-0 px-5 rounded-full text-sm font-medium transition-all duration-250 whitespace-nowrap"
                    style={{
                      height: "36px",
                      display: "flex",
                      alignItems: "center",
                      background: selectedCategory === categoryKey 
                        ? "linear-gradient(135deg, #D4744A 0%, #EFBF43 100%)"
                        : "#F2E7CB",
                      border: selectedCategory === categoryKey
                        ? "none"
                        : "1px solid rgba(212,116,74,0.15)",
                      color: selectedCategory === categoryKey ? "#ffffff" : "#5A4638",
                      boxShadow: selectedCategory === categoryKey
                        ? "0 4px 12px rgba(212,116,74,0.25)"
                        : "none",
                    }}
                  >
                    {categoryLabels[categoryKey] || categoryKey}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Product Grid Section */}
        <div className="px-4 pt-2 pb-4">
          {showUnifiedView ? (
            // Unified All Products View
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-3"
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
            // Filtered Single Category View - Display ALL products for category
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-3"
            >
              {selectedCategoryProducts.map((product, index) => (
                <FeaturedStyleProductCard
                  key={`${product.id}-${index}`}
                  product={product}
                  index={index}
                />
              ))}
            </motion.div>
          ) : null}
        </div>

        {Object.keys(categorizedProducts).length === 0 && (
          <div className="text-center py-12 px-4">
            <p className="text-muted-foreground">No products available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
