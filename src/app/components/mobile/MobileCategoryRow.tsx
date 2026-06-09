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

      {/* Products Grid */}
      <div className="px-4">
        <motion.div layout className="grid grid-cols-2 gap-3">
          <AnimatePresence>
            {displayProducts.map((product, index) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: (index % 2) * 0.05 }}
                onClick={() => handleViewDetails(product)}
                className="glass-strong rounded-xl overflow-hidden shadow-luxury active:shadow-luxury-lg transition-shadow flex flex-col"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-muted overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Product Info */}
                <div className="p-3 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Badge and Price Row */}
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
                    {/* Add to Cart Button */}
                    <Button
                      onClick={(e) => handleQuickAddToCart(product, e)}
                      size="sm"
                      className="w-full py-2 text-[11px] h-auto"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
