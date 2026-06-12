import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Flower2, Gift, Sparkles, Heart, PenTool, ShoppingBag, Eye } from "lucide-react";
import { Button } from "./ui/button";
import { useOrdering, Product } from "./OrderingSystem";
import { useProducts } from "../../hooks/useProducts";
import { LogomarkSpinner, LogomarkWatermark, FloatingLeaf } from "./BrandDecoration";

const categoryMeta: Record<string, { label: string; icon: typeof Flower2 }> = {
  bouquets: { label: "Bouquets", icon: Flower2 },
  "ring-plater": { label: "Ring Plater", icon: Heart },
  gifts: { label: "Handmade Gifts", icon: Gift },
  events: { label: "Event Decorations", icon: Sparkles },
  wedding: { label: "Wedding Accessories", icon: Heart },
  custom: { label: "Custom Orders", icon: PenTool },
  boutique: { label: "Boutique Collection", icon: ShoppingBag },
};

const categoryLabels: Record<string, string> = Object.fromEntries(
  Object.entries(categoryMeta).map(([id, meta]) => [id, meta.label])
);

export function Services() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { setSelectedProduct, addToCart } = useOrdering();
  
  const { products: allProducts, loading } = useProducts({});

  // Define category order with "ring-plater" as second
  const categoryOrder = ["bouquets", "ring-plater", "gifts", "events", "wedding", "custom", "boutique"];

  const availableCategories = Object.entries(allProducts)
    .filter(([, products]) => products.length > 0)
    .map(([id]) => ({
      id,
      label: categoryLabels[id] || id,
      icon: categoryMeta[id]?.icon ?? ShoppingBag,
    }))
    .sort((a, b) => {
      // Sort by the defined order, putting ring-plater second if it exists
      const orderA = categoryOrder.indexOf(a.id);
      const orderB = categoryOrder.indexOf(b.id);
      return (orderA === -1 ? 999 : orderA) - (orderB === -1 ? 999 : orderB);
    });

  // Add "All" category at the beginning
  const categoriesWithAll = [
    { id: "all", label: "All", icon: ShoppingBag },
    ...availableCategories
  ];

  useEffect(() => {
    if (availableCategories.length === 0) return;
    if (!categoriesWithAll.some((c) => c.id === activeCategory)) {
      setActiveCategory("all");
    }
  }, [allProducts, loading, availableCategories, activeCategory]);

  // Show all products when "all" is selected, or products from the specific category
  const currentShowcase = activeCategory === "all" 
    ? Object.values(allProducts).flat() 
    : (allProducts[activeCategory] || []);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
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
      `Hello Shema Buds 😊\n\nI'm interested in:\n${product.title}\n\nCould you please provide more details?\n\nThank you! 🌸`
    );
    const whatsappNumber = "919363962399";
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  // Show loading state while fetching Firebase products
  if (loading) {
    return (
      <section className="relative px-4 sm:px-6 lg:px-8 z-0 overflow-hidden">

        <div className="container mx-auto max-w-7xl">
          <div className="relative overflow-hidden py-10 px-6 sm:px-10">
            <LogomarkWatermark size={400} className="absolute -bottom-20 -right-20 text-primary pointer-events-none" opacity={0.03} />
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl md:text-6xl mb-4 text-foreground font-semibold tracking-tight font-serif">
                Our Creations
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
                Handcrafted gifts, floral arrangements, and decorations made for life's most memorable moments.
              </p>
            </div>
            <div className="flex items-center justify-center py-12">
              <LogomarkSpinner size={64} />
            </div>
          </div>
        </div>

      </section>
    );
  }

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 z-0">
      {/* Ambient background blobs */}
      <div className="absolute -top-16 -left-16 w-72 md:w-96 h-72 md:h-96 bg-primary/15 rounded-full blur-3xl opacity-50 -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute -bottom-20 -right-20 w-80 md:w-96 h-80 md:h-96 bg-accent/15 rounded-full blur-3xl opacity-50 -z-10 animate-pulse" style={{ animationDuration: '10s' }} />

      <FloatingLeaf size={60} opacity={0.12} className="absolute left-[6%] top-[15%] pointer-events-none hidden lg:block text-sage" delay={0} duration={7} />
      <FloatingLeaf size={60} opacity={0.12} className="absolute right-[6%] bottom-[15%] pointer-events-none hidden lg:block text-olive" delay={2} duration={9} />
      <FloatingLeaf size={45} opacity={0.08} className="absolute left-[15%] top-[55%] pointer-events-none hidden lg:block text-accent" delay={1.5} duration={8} />
      <FloatingLeaf size={50} opacity={0.10} className="absolute right-[10%] top-[25%] pointer-events-none hidden lg:block text-secondary" delay={3} duration={6} />
      <LogomarkWatermark size={280} opacity={0.06} className="absolute bottom-[10%] left-[5%] pointer-events-none hidden md:block" />



      <div className="container mx-auto max-w-7xl">
        {/* Showroom — no hard border, no card-shadow; blends into page */}
        <div className="relative pt-1 pb-6 sm:pb-8 px-2 sm:px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-2"
          >
            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl mb-2 text-foreground tracking-tight">
              Our Creations
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              Handcrafted gifts, floral arrangements, and decorations made for life's most memorable moments.
            </p>
          </motion.div>

          {/* Controls Row: Category Navigation - Sticky */}
          <div 
            className="sticky z-40 -mx-2 sm:-mx-4 px-2 sm:px-4 py-2 mb-6 flex flex-wrap justify-center items-center gap-3 sm:gap-4"
            style={{
              top: "3.25rem", // 52px - minimal gap below navbar
              background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,245,235,0.90) 50%, rgba(255,255,255,0.95) 100%)",
              backdropFilter: "blur(20px) saturate(120%)",
              WebkitBackdropFilter: "blur(20px) saturate(120%)",
              borderBottom: "1px solid rgba(166,124,82,0.15)",
              boxShadow: "0 4px 12px rgba(166,124,82,0.08)"
            }}
          >
            {categoriesWithAll.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-wrap justify-center gap-2 sm:gap-3"
              >
                {categoriesWithAll.map((category) => {
                  const Icon = category.icon;
                  return (
                    <motion.button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300
                        ${activeCategory === category.id
                          ? 'bg-primary/20 text-primary shadow-sm border border-primary/20'
                          : 'bg-white/60 text-muted-foreground hover:bg-white/80 border border-transparent'
                        }
                      `}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{category.label}</span>
                    </motion.button>
                  );
                })}
              </motion.div>
            )}
          </div>

          {categoriesWithAll.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No products available at the moment.</p>
            </div>
          )}

          {/* Grid Showcase - Show all products */}
          {categoriesWithAll.length > 0 && <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {currentShowcase.map((item, index) => (
                <div
                  key={item.id || index}
                  className="group relative rounded-2xl sm:rounded-3xl overflow-hidden glass-strong bg-white/40 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-white/40 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-48 sm:h-56 overflow-hidden rounded-t-2xl sm:rounded-t-3xl flex-shrink-0">
                    <img
                      loading="lazy"
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col flex-grow">
                    <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3 flex-shrink-0">
                      <span className="inline-block px-2.5 py-1 md:px-3.5 md:py-1.5 bg-[#C8D5A0] text-[#3b2a1e] rounded-full text-[10px] md:text-xs font-bold tracking-wide">
                        {item.badge}
                      </span>
                      {item.price && (
                        <span className="text-base sm:text-xl font-bold text-primary whitespace-nowrap">
                          {item.price}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-1 sm:mb-2 line-clamp-2 min-h-[2.5rem] sm:min-h-[3.5rem]">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground font-light leading-relaxed text-xs sm:text-sm mb-4 line-clamp-2 flex-grow">
                      {item.description}
                    </p>
                    <div className="flex gap-1.5 sm:gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleViewDetails(item)}
                        variant="outline"
                        className="flex-1 min-w-0 bg-white/50 border border-primary/20 text-primary hover:bg-primary/10 transition-all duration-300 font-medium rounded-lg px-2 py-1.5 sm:py-2"
                      >
                        <div className="flex items-center justify-center gap-0.5 sm:gap-1 text-[9px] sm:text-[10px] md:text-xs">
                          <Eye className="w-3 h-3 flex-shrink-0" />
                          <span className="hidden lg:inline">View Details</span>
                          <span className="lg:hidden truncate">View</span>
                        </div>
                      </Button>
                      <Button
                        size="sm"
                        onClick={(e) => handleQuickAddToCart(item, e)}
                        className="flex-1 min-w-0 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 font-medium rounded-lg px-2 py-1.5 sm:py-2"
                      >
                        <div className="flex items-center justify-center gap-0.5 sm:gap-1 text-[9px] sm:text-[10px] md:text-xs">
                          <span className="text-xs sm:text-sm flex-shrink-0">+</span>
                          <span className="hidden lg:inline">Add to Cart</span>
                          <span className="lg:hidden truncate">Add</span>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>}
        </div>
      </div>


    </section>
  );
}
