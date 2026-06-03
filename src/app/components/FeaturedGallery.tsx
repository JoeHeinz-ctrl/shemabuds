import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { getFeaturedProducts, FirebaseProduct } from "../../services/productService";
import { useOrdering, Product } from "./OrderingSystem";

export function FeaturedGallery() {
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { setSelectedProduct, addToCart, showToast } = useOrdering();

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const products = await getFeaturedProducts();
      // Convert Firebase products to Product format
      const converted: Product[] = products.map((fp: FirebaseProduct) => ({
        id: fp.id || "",
        title: fp.title,
        description: fp.description,
        image: fp.image,
        images: fp.images,
        badge: fp.badge,
        category: fp.category,
        price: fp.price,
        customizationOptions: fp.customizationOptions,
      }));
      setFeaturedProducts(converted);
    } catch (error) {
      console.error("Error loading featured products:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = (id: string) => {
    setLiked(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleQuickAddToCart = (product: Product) => {
    addToCart({
      product,
      quantity: 1,
      customizations: {},
      notes: "",
    });
    showToast("✓ Added to Cart");
    // DO NOT auto-open cart
  };

  if (loading) {
    return (
      <section className="py-12 md:py-24 px-3 md:px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#FAF7F2]">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl sm:text-5xl mb-2 md:mb-4 text-[#2A1B14] font-semibold tracking-tight">Featured Creations</h2>
            <p className="text-sm md:text-lg text-[#4A3A32] max-w-2xl mx-auto font-light">
              Explore our handpicked selection of recent works
            </p>
          </div>
          <div className="flex items-center justify-center py-12">
            <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-[#A67C52] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  if (featuredProducts.length === 0) {
    return (
      <section className="py-12 md:py-24 px-3 md:px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#FAF7F2]">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl sm:text-5xl mb-2 md:mb-4 text-[#2A1B14] font-semibold tracking-tight">Featured Creations</h2>
            <p className="text-sm md:text-lg text-[#4A3A32] max-w-2xl mx-auto font-light">
              Explore our handpicked selection of recent works
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-[#6B5D52] text-base md:text-lg">No featured products yet. Check back soon!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-24 px-3 md:px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-2xl md:text-4xl sm:text-5xl mb-2 md:mb-4 text-foreground font-semibold tracking-tight">Featured Creations</h2>
          <p className="text-sm md:text-lg text-secondary-foreground max-w-2xl mx-auto font-light">
            Explore our handpicked selection of recent works
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card className="group overflow-hidden border border-border hover:shadow-luxury-lg transition-all duration-300 bg-card">
                <div className="relative overflow-hidden aspect-square md:aspect-[4/3]">
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full h-full"
                  >
                    <ImageWithFallback
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleLike(product.id)}
                    className="absolute top-2 right-2 md:top-4 md:right-4 glass p-1.5 md:p-2.5 rounded-full shadow-luxury"
                  >
                    <Heart 
                      className={`w-4 h-4 md:w-5 md:h-5 transition-colors duration-200 ${
                        liked.has(product.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
                      }`} 
                    />
                  </motion.button>

                  {/* Action Buttons on Hover - Desktop Only */}
                  <div className="hidden md:block absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleViewDetails(product)}
                        className="flex-1 bg-white/95 backdrop-blur-sm text-[#2A1B14] hover:bg-white shadow-lg"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button
                        onClick={() => handleQuickAddToCart(product)}
                        className="flex-1 bg-[#A67C52] hover:bg-[#8B6B3E] text-white shadow-lg"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 md:p-6">
                  <div className="flex items-start justify-between gap-1 md:gap-2 mb-2 md:mb-3">
                    <span className="inline-block px-2 py-1 md:px-3 md:py-1.5 bg-[#D8B4A0] text-[#8B6B3E] rounded-full text-[10px] md:text-sm font-medium">
                      {product.badge}
                    </span>
                    {product.price && (
                      <span className="text-sm md:text-lg font-bold text-[#A67C52] whitespace-nowrap">
                        {product.price}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm md:text-xl text-[#2A1B14] font-semibold mb-1 md:mb-2 line-clamp-2">{product.title}</h3>
                  <p className="hidden md:block text-sm text-[#6B5D52] line-clamp-2">{product.description}</p>
                  
                  {/* Mobile Action Buttons */}
                  <div className="md:hidden flex gap-1.5 mt-2">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(product);
                      }}
                      size="sm"
                      variant="outline"
                      className="flex-1 border-[#A67C52] text-[#A67C52] hover:bg-[#A67C52]/10 text-[10px] h-7"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickAddToCart(product);
                      }}
                      size="sm"
                      className="flex-1 bg-[#A67C52] hover:bg-[#8B6B3E] text-white text-[10px] h-7"
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
