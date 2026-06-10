import { X, ArrowLeft, ShoppingCart, Eye } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product, useOrdering } from "./OrderingSystem";
import { Button } from "./ui/button";

interface DesktopCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;
  products: Product[];
}

export function DesktopCategoryModal({
  isOpen,
  onClose,
  categoryName,
  products,
}: DesktopCategoryModalProps) {
  const { setSelectedProduct, addToCart } = useOrdering();

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
    
    // Show success feedback
    const button = e.currentTarget as HTMLElement;
    const originalText = button.innerHTML;
    button.innerHTML = '✓ Added';
    button.classList.add('!bg-green-600');
    
    setTimeout(() => {
      button.innerHTML = originalText;
      button.classList.remove('!bg-green-600');
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-[#2A1B14]/60 backdrop-blur-md flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card text-card-foreground rounded-3xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-border">
              <div className="flex items-center gap-4">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <ArrowLeft className="w-6 h-6 text-muted-foreground" />
                </button>
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">{categoryName}</h2>
                  <p className="text-sm text-muted-foreground">{products.length} Products</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-muted-foreground" />
              </button>
            </div>

            {/* Products Grid - responsive columns */}
            <div className="p-8 overflow-y-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group relative rounded-2xl overflow-hidden glass-strong shadow-[0_4px_16px_rgba(166,124,82,0.12)] hover:shadow-[0_8px_24px_rgba(166,124,82,0.2)] transition-all duration-300 flex flex-col"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-square bg-muted overflow-hidden flex-shrink-0">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {product.badge && (
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 bg-[#C8D5A0] text-[#3b2a1e] text-xs rounded-full font-semibold shadow-lg">
                            {product.badge}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-base font-semibold text-foreground line-clamp-2 mb-2 min-h-[3rem] group-hover:text-primary transition-colors">
                        {product.title}
                      </h3>
                      
                      {product.price && (
                        <p className="text-base font-bold text-primary mb-3">
                          {product.price}
                        </p>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-auto">
                        <Button
                          onClick={() => handleViewDetails(product)}
                          variant="outline"
                          size="sm"
                          className="flex-1 min-w-0 border-primary text-primary hover:bg-primary/10 px-2 py-1.5"
                        >
                          <div className="flex items-center justify-center gap-0.5 text-[9px] sm:text-[10px]">
                            <Eye className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="truncate">View</span>
                          </div>
                        </Button>
                        <Button
                          onClick={(e) => handleQuickAddToCart(product, e)}
                          size="sm"
                          className="flex-1 min-w-0 bg-primary hover:bg-primary/95 text-primary-foreground px-2 py-1.5"
                        >
                          <div className="flex items-center justify-center gap-0.5 text-[9px] sm:text-[10px]">
                            <ShoppingCart className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="truncate">Add</span>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
