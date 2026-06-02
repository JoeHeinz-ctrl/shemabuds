import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useOrdering, Product } from "./OrderingSystem";
import confetti from "canvas-confetti";

export function ProductDetailsModal() {
  const { selectedProduct, setSelectedProduct, addToCart, setIsCartOpen } = useOrdering();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [customizations, setCustomizations] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const images = selectedProduct.images || [selectedProduct.image];

  const handleClose = () => {
    setSelectedProduct(null);
    setCustomizations({});
    setNotes("");
    setQuantity(1);
    setCurrentImageIndex(0);
  };

  const handleAddToCart = () => {
    addToCart({
      product: selectedProduct,
      quantity,
      customizations,
      notes: notes || undefined,
    });

    // Confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#A67C52', '#D8B4A0', '#E8C4B4'],
    });

    handleClose();
    
    // Show cart after a brief delay
    setTimeout(() => {
      setIsCartOpen(true);
    }, 500);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center md:p-4 bg-[#2A1B14]/60 backdrop-blur-md"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white md:rounded-3xl shadow-2xl max-w-4xl w-full h-full md:h-auto md:max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 md:p-6 border-b border-[#A67C52]/10 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-[#A67C52]" />
              <h2 className="text-lg md:text-2xl font-semibold text-[#2A1B14]">Product Details</h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-[#FAF7F2] rounded-full transition-colors"
            >
              <X className="w-5 h-5 md:w-6 md:h-6 text-[#4A3A32]" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto flex-1 pb-20 md:pb-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 p-3 md:p-6">
              {/* Left: Image Gallery */}
              <div className="space-y-2 md:space-y-4">
                <div className="relative aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-[#FAF7F2]">
                  <img
                    src={images[currentImageIndex]}
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-[#2A1B14]" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 text-[#2A1B14]" />
                      </button>
                    </>
                  )}

                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1.5 bg-white/95 backdrop-blur-sm text-[#A67C52] rounded-full text-sm font-semibold shadow-lg">
                      {selectedProduct.badge}
                    </span>
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === idx
                            ? 'border-[#A67C52]'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Product Info & Customization */}
              <div className="space-y-4 md:space-y-6 pb-16 md:pb-0">
                <div>
                  <h3 className="text-xl md:text-3xl font-semibold text-[#2A1B14] mb-2">
                    {selectedProduct.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#6B5D52] font-light leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#6B5D52]">Category:</span>
                  <span className="px-3 py-1 bg-[#FAF7F2] text-[#A67C52] rounded-full text-sm font-medium">
                    {selectedProduct.category}
                  </span>
                </div>

                {/* Customization Options */}
                {selectedProduct.customizationOptions && selectedProduct.customizationOptions.length > 0 && (
                  <div className="space-y-3 md:space-y-4 pt-3 md:pt-4 border-t border-[#A67C52]/10">
                    <h4 className="text-base md:text-lg font-semibold text-[#2A1B14]">Customize Your Order</h4>
                    
                    {selectedProduct.customizationOptions.map((option) => (
                      <div key={option.label} className="space-y-2">
                        <Label className="text-[#4A3A32] font-medium">{option.label}</Label>
                        <div className="flex flex-wrap gap-2">
                          {option.options.map((opt) => (
                            <button
                              key={opt}
                              onClick={() =>
                                setCustomizations((prev) => ({
                                  ...prev,
                                  [option.label]: opt,
                                }))
                              }
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                customizations[option.label] === opt
                                  ? 'bg-[#A67C52] text-white shadow-md'
                                  : 'bg-[#FAF7F2] text-[#4A3A32] hover:bg-[#E8C4B4]'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Optional Notes */}
                <div className="space-y-2">
                  <Label className="text-sm md:text-base text-[#4A3A32] font-medium">Special Requests (Optional)</Label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special requests or customizations..."
                    className="bg-[#FEFDFB] border-[#A67C52]/20 focus:border-[#A67C52] text-[#2A1B14] min-h-[80px] md:min-h-[100px] text-sm"
                  />
                </div>

                {/* Quantity */}
                <div className="space-y-2">
                  <Label className="text-sm md:text-base text-[#4A3A32] font-medium">Quantity</Label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-full bg-[#FAF7F2] hover:bg-[#E8C4B4] flex items-center justify-center font-semibold text-[#2A1B14] transition-colors"
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold text-[#2A1B14] w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-full bg-[#FAF7F2] hover:bg-[#E8C4B4] flex items-center justify-center font-semibold text-[#2A1B14] transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-[#A67C52] hover:bg-[#8B6B3E] text-white py-4 md:py-6 text-sm md:text-lg shadow-[0_4px_16px_rgba(166,124,82,0.3)] hover:shadow-[0_6px_20px_rgba(166,124,82,0.4)] transition-all duration-300 font-medium"
                >
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Customize & Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
