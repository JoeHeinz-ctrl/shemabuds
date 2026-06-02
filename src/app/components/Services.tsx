import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flower2, Gift, Sparkles, Heart, PenTool, ShoppingBag, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { Button } from "./ui/button";
import { useOrdering, Product } from "./OrderingSystem";
import { useProducts } from "../../hooks/useProducts";
import { DesktopCategoryModal } from "./DesktopCategoryModal";

const categories = [
  { id: "bouquets", label: "Bouquets", icon: Flower2 },
  { id: "gifts", label: "Handmade Gifts", icon: Gift },
  { id: "events", label: "Event Decorations", icon: Sparkles },
  { id: "wedding", label: "Wedding Accessories", icon: Heart },
  { id: "custom", label: "Custom Orders", icon: PenTool },
  { id: "boutique", label: "Boutique Collection", icon: ShoppingBag },
];

// Empty demo products - all products will come from Firebase
const showcaseData: Record<string, Product[]> = {
  bouquets: [],
  gifts: [],
  events: [],
  wedding: [],
  custom: [],
  boutique: [],
};

export function Services() {
  const [activeCategory, setActiveCategory] = useState("bouquets");
  const [currentPage, setCurrentPage] = useState(0);
  const [showAllModal, setShowAllModal] = useState(false);
  const { setSelectedProduct, addToCart } = useOrdering();
  
  // Load products from Firebase and merge with demo products
  const { products: allProducts, loading } = useProducts(showcaseData);

  const currentShowcase = allProducts[activeCategory as keyof typeof allProducts] || [];
  const itemsPerPage = 4;
  const totalPages = Math.ceil(currentShowcase.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const visibleItems = currentShowcase.slice(startIndex, startIndex + itemsPerPage);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentPage(0);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleQuickAddToCart = (product: Product, event: React.MouseEvent) => {
    event.stopPropagation();
    
    // Add to cart with default options
    addToCart({
      product,
      quantity: 1,
      customizations: {},
    });

    // Show success feedback
    const button = event.currentTarget as HTMLElement;
    const originalText = button.innerHTML;
    button.innerHTML = '✓ Added to Cart';
    button.classList.add('!bg-green-600');
    
    setTimeout(() => {
      button.innerHTML = originalText;
      button.classList.remove('!bg-green-600');
    }, 2000);
  };

  const handleWhatsAppInquiry = (product: Product) => {
    const message = encodeURIComponent(
      `Hello Shemabuds 😊\n\nI'm interested in:\n${product.title}\n\nCould you please provide more details?\n\nThank you! 🌸`
    );
    const whatsappNumber = "919363962399";
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  // Show loading state while fetching Firebase products
  if (loading) {
    return (
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7F2] to-white overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-5xl sm:text-6xl mb-4 text-[#2A1B14] font-semibold tracking-tight">
              Our Creations
            </h2>
            <p className="text-lg text-[#4A3A32] max-w-3xl mx-auto font-light leading-relaxed">
              Handcrafted gifts, floral arrangements, and decorations made for life's most memorable moments.
            </p>
          </div>
          <div className="flex items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-[#A67C52] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7F2] to-white overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl sm:text-6xl mb-4 text-[#2A1B14] font-semibold tracking-tight">
            Our Creations
          </h2>
          <p className="text-lg text-[#4A3A32] max-w-3xl mx-auto font-light leading-relaxed">
            Handcrafted gifts, floral arrangements, and decorations made for life's most memorable moments.
          </p>
        </motion.div>

        {/* Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300
                    ${activeCategory === category.id
                      ? 'bg-[#A67C52] text-white shadow-[0_4px_16px_rgba(166,124,82,0.3)]'
                      : 'bg-white/80 backdrop-blur-sm text-[#4A3A32] border border-[#A67C52]/20 hover:border-[#A67C52]/40 shadow-[0_2px_8px_rgba(166,124,82,0.1)]'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{category.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Show All Button */}
        {currentShowcase.length > itemsPerPage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mb-8"
          >
            <Button
              onClick={() => setShowAllModal(true)}
              className="bg-white border-2 border-[#A67C52] text-[#A67C52] hover:bg-[#A67C52] hover:text-white px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-[0_2px_12px_rgba(166,124,82,0.15)]"
            >
              Show All {categories.find(c => c.id === activeCategory)?.label} ({currentShowcase.length})
            </Button>
          </motion.div>
        )}

        {/* Grid Showcase with Navigation */}
        <div className="relative">
          {/* Navigation Arrows */}
          {totalPages > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrev}
                disabled={currentPage === 0}
                className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-[0_4px_16px_rgba(166,124,82,0.2)] flex items-center justify-center transition-all duration-300 ${
                  currentPage === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#A67C52] hover:text-white'
                }`}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
                className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-[0_4px_16px_rgba(166,124,82,0.2)] flex items-center justify-center transition-all duration-300 ${
                  currentPage === totalPages - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#A67C52] hover:text-white'
                }`}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </>
          )}

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${currentPage}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {visibleItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative rounded-3xl overflow-hidden bg-white shadow-[0_8px_32px_rgba(166,124,82,0.15)] hover:shadow-[0_16px_48px_rgba(166,124,82,0.25)] transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6 }}
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2A1B14]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1.5 bg-white/95 backdrop-blur-sm text-[#A67C52] rounded-full text-xs font-semibold shadow-lg">
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Title and Price Row */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-[#2A1B14] group-hover:text-[#A67C52] transition-colors duration-300 flex-1">
                        {item.title}
                      </h3>
                      {item.price && (
                        <span className="text-lg font-bold text-[#A67C52] whitespace-nowrap">
                          {item.price}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-[#6B5D52] font-light leading-relaxed text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleViewDetails(item)}
                        variant="outline"
                        className="flex-1 border-2 border-[#A67C52] text-[#A67C52] hover:bg-[#A67C52]/10 transition-all duration-300 text-xs font-medium"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        <span>View Details</span>
                      </Button>
                      <Button
                        size="sm"
                        onClick={(e) => handleQuickAddToCart(item, e)}
                        className="flex-1 bg-[#A67C52] hover:bg-[#8B6B3E] text-white shadow-[0_4px_12px_rgba(166,124,82,0.25)] hover:shadow-[0_6px_16px_rgba(166,124,82,0.35)] transition-all duration-300 text-xs font-medium"
                      >
                        <span className="text-lg mr-1">+</span>
                        <span>Add to Cart</span>
                      </Button>
                    </div>
                  </div>

                  {/* Floating Gold Accent */}
                  <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-[#A67C52]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Page Indicator */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentPage === index
                      ? 'w-8 bg-[#A67C52]'
                      : 'w-2 bg-[#A67C52]/30 hover:bg-[#A67C52]/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-[#D8B4A0]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Desktop Category Modal */}
      <DesktopCategoryModal
        isOpen={showAllModal}
        onClose={() => setShowAllModal(false)}
        categoryName={categories.find(c => c.id === activeCategory)?.label || ""}
        products={currentShowcase}
      />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-[#E8C4B4]/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
