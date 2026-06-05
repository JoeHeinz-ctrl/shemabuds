import { X, ArrowLeft, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product, useOrdering } from "../OrderingSystem";
import { Button } from "../ui/button";

interface MobileCategoryViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;
  products: Product[];
}

export function MobileCategoryViewModal({
  isOpen,
  onClose,
  categoryName,
  products,
}: MobileCategoryViewModalProps) {
  const { setSelectedProduct, addToCart, setIsCartOpen } = useOrdering();

  if (!isOpen) return null;

  const handleViewDetails = (product: Product) => {
    onClose(); // Close the category modal first
    setTimeout(() => {
      setSelectedProduct(product);
    }, 100); // Small delay to ensure smooth transition
  };

  const handleQuickAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      product,
      quantity: 1,
      customizations: {},
      notes: "",
    });
    onClose(); // Close the category modal first
    setTimeout(() => {
      setIsCartOpen(true);
    }, 100); // Small delay to ensure smooth transition
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="md:hidden fixed inset-0 z-[60] bg-background flex flex-col"
      >
        {/* Header */}
        <div className="flex-shrink-0 bg-card border-b border-border shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={onClose}
              className="p-2 -ml-2 text-muted-foreground active:text-primary transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1 text-center">
              <h2 className="text-lg font-semibold text-foreground">{categoryName}</h2>
              <p className="text-xs text-muted-foreground">{products.length} Products</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-muted-foreground active:text-primary transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1 overflow-y-auto p-3 pb-20">
          <div className="grid grid-cols-2 gap-3">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => handleViewDetails(product)}
                className="glass-strong rounded-xl overflow-hidden border border-border shadow-sm active:shadow-md transition-shadow"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-muted">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  {product.badge && (
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-0.5 bg-primary text-primary-foreground text-[10px] rounded-full font-semibold">
                        {product.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-2.5">
                  <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-1 min-h-[2.5rem]">
                    {product.title}
                  </h3>
                  
                  {product.price && (
                    <p className="text-sm font-bold text-primary mb-2">
                      {product.price}
                    </p>
                  )}

                  {/* Add to Cart Button */}
                  <Button
                    onClick={(e) => handleQuickAddToCart(product, e)}
                    size="sm"
                    className="w-full bg-primary hover:bg-primary/95 text-primary-foreground py-2 text-xs"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
