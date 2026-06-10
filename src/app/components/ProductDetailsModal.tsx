import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useOrdering, Product } from "./OrderingSystem";

export function ProductDetailsModal() {
  const { selectedProduct, setSelectedProduct, addToCart } = useOrdering();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  if (!selectedProduct) return null;

  // Handle missing images gracefully
  const images = (selectedProduct.images && selectedProduct.images.length > 0) 
    ? selectedProduct.images 
    : selectedProduct.image 
      ? [selectedProduct.image]
      : ['data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23f0f0f0" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="16" fill="%23999" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E'];

  const handleClose = () => {
    setSelectedProduct(null);
    setNotes("");
    setQuantity(1);
    setCurrentImageIndex(0);
    setShowImageViewer(false);
    setIsAddedToCart(false);
  };

  const handleAddToCart = () => {
    addToCart({
      product: selectedProduct,
      quantity,
      customizations: {},
      notes: notes || undefined,
    });

    // Show "Added to Cart" feedback
    setIsAddedToCart(true);
    
    // Reset button after 2 seconds and close modal
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      {/* Fullscreen Image Viewer */}
      {showImageViewer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setShowImageViewer(false)}
        >
          <button
            onClick={() => setShowImageViewer(false)}
            className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors z-10"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="relative w-full h-full flex items-center justify-center p-4">
            {images[currentImageIndex] && (
              <img
                src={images[currentImageIndex]}
                alt={selectedProduct?.title || "Product"}
                className="w-full h-full object-contain"
              />
            )}

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}

      {/* Main Modal */}
      {selectedProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm md:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header - Mobile only */}
            <div className="md:hidden flex justify-between items-center p-3 border-b bg-white">
              <h2 className="text-lg font-bold">{selectedProduct.title}</h2>
              <button onClick={handleClose} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content - Mobile Optimized */}
            <div className="overflow-y-auto flex-1">
              {/* Mobile Layout */}
              <div className="md:hidden">
                <div className="flex gap-3 p-3">
                  {/* Left: Image */}
                  <div className="flex-shrink-0 w-32">
                    <div 
                      className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity relative"
                      onClick={() => setShowImageViewer(true)}
                    >
                      <img
                        src={images[currentImageIndex]}
                        alt={selectedProduct.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {images.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              prevImage();
                            }}
                            className="absolute left-0.5 top-1/2 -translate-y-1/2 w-5 h-5 bg-white/80 rounded-full flex items-center justify-center hover:bg-white"
                          >
                            <ChevronLeft className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              nextImage();
                            }}
                            className="absolute right-0.5 top-1/2 -translate-y-1/2 w-5 h-5 bg-white/80 rounded-full flex items-center justify-center hover:bg-white"
                          >
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Right: Content - Scrollable */}
                  <div className="flex-1 overflow-y-auto pr-2 space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">{selectedProduct.description}</p>
                    </div>

                    {/* Price */}
                    <div className="text-lg font-bold text-orange-600">
                      ₹{selectedProduct.price}
                    </div>

                    {/* Category */}
                    <div className="text-xs">
                      <span className="text-gray-500">Category:</span>
                      <span className="ml-1 font-medium">{selectedProduct.category}</span>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">Qty:</span>
                      <div className="flex items-center gap-1 border rounded-lg p-0.5">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 text-sm"
                        >
                          −
                        </button>
                        <span className="w-5 text-center text-sm">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-1">
                      <label className="block text-xs font-medium">Special Requests</label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Any special requests..."
                        className="w-full p-2 border rounded-lg text-xs"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:block p-6 space-y-4">
                {/* Image */}
                <div 
                  className="w-full bg-gray-100 rounded-lg overflow-hidden cursor-pointer h-80 relative group"
                  onClick={() => setShowImageViewer(true)}
                >
                  <img
                    src={images[currentImageIndex]}
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                  />
                  
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Title */}
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold">{selectedProduct.title}</h2>
                  <button onClick={handleClose} className="p-1 hover:bg-gray-100 rounded">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Description */}
                <p className="text-gray-600">{selectedProduct.description}</p>

                {/* Price */}
                <div className="text-3xl font-bold text-orange-600">
                  ₹{selectedProduct.price}
                </div>

                {/* Category */}
                <div className="flex gap-2">
                  <span className="text-sm text-gray-500">Category:</span>
                  <span className="text-sm font-medium">{selectedProduct.category}</span>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center gap-2 border rounded-lg p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium mb-2">Special Requests</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special requests..."
                    className="w-full p-2 border rounded-lg text-sm"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="p-3 md:p-4 border-t bg-white sticky bottom-0">
              <button
                onClick={handleAddToCart}
                disabled={isAddedToCart}
                className={`w-full font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 text-white ${
                  isAddedToCart
                    ? 'bg-green-500 hover:bg-green-500'
                    : 'bg-orange-500 hover:bg-orange-600'
                }`}
              >
                {isAddedToCart ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart
                  </>
                ) : (
                  'Add to Cart'
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
