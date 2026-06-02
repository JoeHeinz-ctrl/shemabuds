import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useOrdering } from "../OrderingSystem";

export function MobileHeader() {
  const { cart, setIsCartOpen } = useOrdering();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      {/* Row 1: Logo and Cart */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#A67C52]/10">
        <motion.div 
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={scrollToTop}
        >
          <div className="bg-[#A67C52] p-1.5 rounded-lg shadow-sm">
            <Heart className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="text-lg text-[#2A1B14] font-semibold tracking-tight">Shemabuds</span>
        </motion.div>

        {/* Cart Icon */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleCartClick}
          className="relative p-2 text-[#4A3A32] active:text-[#A67C52] transition-colors"
        >
          <ShoppingBag className="w-6 h-6" />
          {totalItems > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-[#A67C52] text-white text-xs rounded-full flex items-center justify-center font-semibold shadow-md"
            >
              {totalItems}
            </motion.span>
          )}
        </motion.button>
      </div>

      {/* Search bar removed - will be implemented later */}
    </div>
  );
}
