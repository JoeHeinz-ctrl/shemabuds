import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useOrdering } from "./OrderingSystem";
import { useAuth } from "../../contexts/AuthContext";
import { AuthModal } from "./AuthModal";

export function CartModal() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    setIsCheckoutOpen,
  } = useOrdering();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (!isCartOpen) return null;

  const handleClose = () => {
    setIsCartOpen(false);
  };

  const handleCheckout = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate estimated total price
  const calculateEstimatedTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      if (item.product.price) {
        // Convert price to string if it's not already
        const priceString = String(item.product.price);
        // Extract numeric value from price string (e.g., "₹1,500+" -> 1500)
        const priceMatch = priceString.match(/[\d,]+/);
        if (priceMatch) {
          const numericPrice = parseInt(priceMatch[0].replace(/,/g, ''));
          total += numericPrice * item.quantity;
        }
      }
    });
    return total;
  };

  const estimatedTotal = calculateEstimatedTotal();
  const hasValidPrices = estimatedTotal > 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center md:p-4 bg-black/60 backdrop-blur-md"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, x: 300 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          exit={{ scale: 0.95, opacity: 0, x: 300 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-strong md:rounded-3xl shadow-luxury-lg max-w-2xl w-full h-full md:h-auto md:max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="relative">
                <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-semibold shadow-luxury"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-foreground">Your Cart</h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-5 h-5 md:w-6 md:h-6 text-secondary-foreground" />
            </motion.button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-3 md:p-6 pb-20 md:pb-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <ShoppingBag className="w-16 h-16 text-[#A67C52]/30 mb-4" />
                <h3 className="text-xl font-semibold text-[#2A1B14] mb-2">Your cart is empty</h3>
                <p className="text-[#6B5D52] font-light">
                  Start adding beautiful handcrafted items to your cart
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <motion.div
                    key={`${item.product.id}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex gap-3 md:gap-4 p-3 md:p-4 bg-[#FAF7F2] rounded-xl md:rounded-2xl"
                  >
                    {/* Image */}
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg md:rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-[#2A1B14] mb-1 truncate">
                        {item.product.title}
                      </h4>
                      
                      {/* Price */}
                      {item.product.price && (
                        <p className="text-sm font-semibold text-[#A67C52] mb-1">
                          {item.product.price}
                        </p>
                      )}
                      
                      {/* Customizations */}
                      {Object.keys(item.customizations).length > 0 && (
                        <div className="space-y-1 mb-2">
                          {Object.entries(item.customizations).map(([key, value]) => (
                            <p key={key} className="text-xs text-[#6B5D52]">
                              <span className="font-medium">{key}:</span> {value}
                            </p>
                          ))}
                        </div>
                      )}

                      {item.notes && (
                        <p className="text-xs text-[#6B5D52] italic mb-2">
                          Note: {item.notes}
                        </p>
                      )}

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          className="w-7 h-7 rounded-full bg-white hover:bg-[#E8C4B4] flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-3 h-3 text-[#2A1B14]" />
                        </button>
                        <span className="text-sm font-semibold text-[#2A1B14] w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-white hover:bg-[#E8C4B4] flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-3 h-3 text-[#2A1B14]" />
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 hover:bg-white rounded-lg transition-colors self-start"
                    >
                      <Trash2 className="w-5 h-5 text-[#A67C52]" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-3 md:p-6 border-t border-[#A67C52]/10 space-y-3 md:space-y-4 flex-shrink-0 mb-16 md:mb-0">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-base">
                  <span className="font-medium text-[#4A3A32]">Total Items:</span>
                  <span className="font-semibold text-[#2A1B14]">{totalItems}</span>
                </div>
                
                {hasValidPrices && (
                  <div className="flex items-center justify-between text-lg pt-2 border-t border-[#A67C52]/10">
                    <span className="font-semibold text-[#2A1B14]">Estimated Total:</span>
                    <span className="font-bold text-[#A67C52] text-xl">
                      ₹{estimatedTotal.toLocaleString('en-IN')}+
                    </span>
                  </div>
                )}
                
                {!hasValidPrices && (
                  <p className="text-sm text-[#6B5D52] italic">
                    Final pricing will be confirmed via WhatsApp
                  </p>
                )}
              </div>

              <div className="flex flex-col md:flex-row gap-2 md:gap-3">
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="flex-1 border-2 border-[#A67C52] text-[#A67C52] hover:bg-[#A67C52]/10 py-4 md:py-6 text-sm md:text-base"
                >
                  Continue Shopping
                </Button>
                <Button
                  onClick={handleCheckout}
                  className="flex-1 bg-[#A67C52] hover:bg-[#8B6B3E] text-white py-4 md:py-6 text-sm md:text-base shadow-[0_4px_16px_rgba(166,124,82,0.3)] hover:shadow-[0_6px_20px_rgba(166,124,82,0.4)] transition-all duration-300"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />
    </AnimatePresence>
  );
}
