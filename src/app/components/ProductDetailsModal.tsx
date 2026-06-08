import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useOrdering, Product } from "./OrderingSystem";

export function ProductDetailsModal() {
  const { selectedProduct, setSelectedProduct, addToCart, setIsCartOpen } = useOrdering();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [customizations, setCustomizations] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const images = selectedProduct.images && selectedProduct.images.length > 0 
    ? selectedProduct.images 
    : [selectedProduct.image];

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
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#2A1B14]/60 backdrop-blur-md"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-card text-card-foreground rounded-3xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 md:p-6 border-b border-border flex-shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              <h2 className="text-lg md:text-2xl font-semibold text-foreground font-serif">Product Details</h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 p-3 md:p-6">
              {/* Left: Image Gallery */}
              <div className="space-y-2 md:space-y-4">
                <div className="relative aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-muted">
                  <ImageWithFallback
                    src={images[currentImageIndex]}
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-black" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 text-black" />
                      </button>
                    </>
                  )}

                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1.5 bg-white/95 backdrop-blur-sm text-primary rounded-full text-sm font-semibold shadow-lg">
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
                            ? 'border-primary'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <ImageWithFallback src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Product Info & Customization */}
              <div className="space-y-4 md:space-y-6">
                <div>
                  <h3 className="text-xl md:text-3xl font-semibold text-foreground mb-2">
                    {selectedProduct.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Category:</span>
                  <span className="px-3 py-1 bg-muted text-primary rounded-full text-sm font-medium">
                    {selectedProduct.category}
                  </span>
                </div>

                {/* Customization Options */}
                {selectedProduct.customizationOptions && selectedProduct.customizationOptions.length > 0 && (
                  <div className="space-y-3 md:space-y-4 pt-3 md:pt-4 border-t border-border">
                    <h4 className="text-base md:text-lg font-semibold text-foreground">Customize Your Order</h4>
                    
                    {selectedProduct.customizationOptions.map((option) => (
                      <div key={option.label} className="space-y-2">
                        <Label className="text-foreground font-medium">{option.label}</Label>
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
                                  ? 'bg-primary text-primary-foreground shadow-md'
                                  : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
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
                  <Label className="text-sm md:text-base text-foreground font-medium">Special Requests (Optional)</Label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special requests or customizations..."
                    className="bg-input-background border-border focus:border-primary text-foreground min-h-[80px] md:min-h-[100px] text-sm"
                  />
                </div>

                {/* Quantity */}
                <div className="space-y-2">
                  <Label className="text-sm md:text-base text-foreground font-medium">Quantity</Label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-full bg-muted hover:bg-accent flex items-center justify-center font-semibold text-foreground transition-colors"
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold text-foreground w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-full bg-muted hover:bg-accent flex items-center justify-center font-semibold text-foreground transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-primary hover:bg-primary/95 text-primary-foreground py-4 md:py-6 text-sm md:text-lg shadow-[0_4px_16px_rgba(166,124,82,0.3)] transition-all duration-300 font-medium"
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
