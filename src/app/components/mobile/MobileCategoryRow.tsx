import { ChevronRight, ShoppingCart, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product, useOrdering } from "../OrderingSystem";
import { Button } from "../ui/button";
import { useState } from "react";

interface MobileCategoryRowProps {
  categoryName: string;
  products: Product[];
  maxPreview?: number;
}

export function MobileCategoryRow({ 
  categoryName, 
  products,
  maxPreview = 6 
}: MobileCategoryRowProps) {
  const { setSelectedProduct, addToCart } = useOrdering();
  const [isExpanded, setIsExpanded] = useState(false);

  const displayProducts = isExpanded ? products : products.slice(0, maxPreview);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleQuickAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      product,
      quantity: 1,
      customizations: {},
      notes: "",
    });
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="md:hidden mb-6">
      {/* Category Header */}
      <div className="flex items-center justify-between px-4 mb-3">
        <h2 className="text-lg font-bold text-foreground">{categoryName}</h2>
        {products.length > maxPreview && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleExpand}
            className="flex items-center gap-1 text-sm font-medium text-primary active:text-primary/80 transition-colors"
          >
            {isExpanded ? "Show Less" : "Show All"}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </motion.div>
          </motion.button>
        )}
      </div>

      {/* Products Grid - Horizontal scroll or Grid */}
      {!isExpanded ? (
        // Horizontal Scrolling (Preview)
        <div className="overflow-x-auto scrollbar-hide snap-x">
          <div className="flex gap-3 px-4 pb-2">
            {displayProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => handleViewDetails(product)}
                className="flex-shrink-0 w-[140px] glass-strong rounded-xl overflow-hidden shadow-luxury active:shadow-luxury-lg transition-shadow snap-start"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-muted">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  {product.badge && (
                    <div className="absolute top-1.5 left-1.5">
                      <span className="px-1.5 py-0.5 bg-primary text-primary-foreground text-[9px] rounded-full font-semibold">
                        {product.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-2">
                  <h3 className="text-xs font-semibold text-foreground line-clamp-2 mb-1 min-h-[2rem]">
                    {product.title}
                  </h3>
                  
                  {product.price && (
                    <p className="text-xs font-bold text-primary mb-1.5">
                      {product.price}
                    </p>
                  )}

                  {/* Add to Cart Button */}
                  <Button
                    onClick={(e) => handleQuickAddToCart(product, e)}
                    size="sm"
                    className="w-full py-1.5 text-[10px] h-auto"
                  >
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        // Expanded Grid (3 columns)
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="px-4"
          >
            <div className="grid grid-cols-3 gap-2">
              {displayProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  onClick={() => handleViewDetails(product)}
                  className="glass-strong rounded-xl overflow-hidden shadow-luxury active:shadow-luxury-lg transition-shadow"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square bg-muted">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    {product.badge && (
                      <div className="absolute top-1 left-1">
                        <span className="px-1 py-0.5 bg-primary text-primary-foreground text-[8px] rounded-full font-semibold">
                          {product.badge}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-2">
                    <h3 className="text-[10px] font-semibold text-foreground line-clamp-2 mb-1 min-h-[2rem]">
                      {product.title}
                    </h3>
                    
                    {product.price && (
                      <p className="text-[10px] font-bold text-primary mb-1">
                        {product.price}
                      </p>
                    )}

                    {/* Add to Cart Button */}
                    <Button
                      onClick={(e) => handleQuickAddToCart(product, e)}
                      size="sm"
                      className="w-full py-1 text-[9px] h-auto"
                    >
                      <ShoppingCart className="w-2.5 h-2.5 mr-0.5" />
                      Add
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
