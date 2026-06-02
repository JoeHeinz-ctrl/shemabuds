import { ChevronRight, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { Product, useOrdering } from "../OrderingSystem";
import { Button } from "../ui/button";
import { useState } from "react";
import { MobileCategoryViewModal } from "./MobileCategoryViewModal";

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
  const { setSelectedProduct, addToCart, setIsCartOpen } = useOrdering();
  const [showAllModal, setShowAllModal] = useState(false);

  const previewProducts = products.slice(0, maxPreview);

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
    setIsCartOpen(true);
  };

  const handleShowAll = () => {
    setShowAllModal(true);
  };

  return (
    <>
      <div className="md:hidden mb-6">
        {/* Category Header */}
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="text-lg font-bold text-[#2A1B14]">{categoryName}</h2>
          <button
            onClick={handleShowAll}
            className="flex items-center gap-1 text-sm font-medium text-[#A67C52] active:text-[#8B6B3E] transition-colors"
          >
            Show All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Horizontal Scrolling Products */}
        <div className="overflow-x-auto scrollbar-hide snap-x">
          <div className="flex gap-3 px-4 pb-2">
            {previewProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => handleViewDetails(product)}
                className="flex-shrink-0 w-[140px] bg-white rounded-xl overflow-hidden border border-[#A67C52]/10 shadow-sm active:shadow-md transition-shadow snap-start"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-[#FAF7F2]">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  {product.badge && (
                    <div className="absolute top-1.5 left-1.5">
                      <span className="px-1.5 py-0.5 bg-[#A67C52] text-white text-[9px] rounded-full font-semibold">
                        {product.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-2">
                  <h3 className="text-xs font-semibold text-[#2A1B14] line-clamp-2 mb-1 min-h-[2rem]">
                    {product.title}
                  </h3>
                  
                  {product.price && (
                    <p className="text-xs font-bold text-[#A67C52] mb-1.5">
                      {product.price}
                    </p>
                  )}

                  {/* Add to Cart Button */}
                  <Button
                    onClick={(e) => handleQuickAddToCart(product, e)}
                    size="sm"
                    className="w-full bg-[#A67C52] hover:bg-[#8B6B3E] text-white py-1.5 text-[10px] h-auto"
                  >
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Show All Modal */}
      <MobileCategoryViewModal
        isOpen={showAllModal}
        onClose={() => setShowAllModal(false)}
        categoryName={categoryName}
        products={products}
      />
    </>
  );
}
