import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "./ui/button";
import { getFeaturedProducts, FirebaseProduct } from "../../services/productService";
import { useOrdering, Product } from "./OrderingSystem";
import { MagneticCard } from "./luxury/MagneticCard";
import { useLuxuryMotion } from "../../hooks/useLuxuryMotion";

const revealEase = [0.22, 1, 0.36, 1] as const;

export function FeaturedGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { setSelectedProduct, addToCart } = useOrdering();
  const { reducedMotion } = useLuxuryMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.35"],
  });

  const sectionY = useTransform(scrollYProgress, [0, 1], [reducedMotion ? 0 : 48, 0]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [reducedMotion ? 1 : 0.55, 0.85, 1]);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const products = await getFeaturedProducts();
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
    setLiked((prev) => {
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
  };

  const headerBlock = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: revealEase }}
      className="text-center mb-8 md:mb-16"
    >
      <h2 className="text-2xl md:text-4xl sm:text-5xl mb-2 md:mb-4 text-foreground font-semibold tracking-tight">
        Featured Creations
      </h2>
      <p className="text-sm md:text-lg text-secondary-foreground max-w-2xl mx-auto font-light">
        Explore our handpicked selection of recent works
      </p>
    </motion.div>
  );

  if (loading) {
    return (
      <section className="py-12 md:py-24 px-3 md:px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto">
          {headerBlock}
          <div className="flex items-center justify-center py-12">
            <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  if (featuredProducts.length === 0) {
    return (
      <section className="py-12 md:py-24 px-3 md:px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto">
          {headerBlock}
          <div className="text-center py-12">
            <p className="text-muted-foreground text-base md:text-lg">No featured products yet. Check back soon!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      ref={sectionRef}
      style={{ y: sectionY, opacity: sectionOpacity }}
      className="py-12 md:py-24 px-3 md:px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted will-change-transform"
    >
      <div className="container mx-auto">
        {headerBlock}

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: revealEase }}
            >
              <MagneticCard strength={10}>
                <motion.div whileHover={reducedMotion ? undefined : { y: -10 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
                  <Card className="group overflow-hidden border border-border bg-card transition-shadow duration-500 hover:shadow-[0_20px_60px_rgba(166,124,82,0.18)]">
                    <div className="relative overflow-hidden aspect-square md:aspect-[4/3]">
                      <motion.div
                        whileHover={reducedMotion ? undefined : { scale: 1.1 }}
                        transition={{ duration: 0.65, ease: revealEase }}
                        className="w-full h-full will-change-transform"
                      >
                        <ImageWithFallback
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>

                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      <motion.button
                        whileHover={reducedMotion ? undefined : { scale: 1.12 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleLike(product.id)}
                        className="absolute top-2 right-2 md:top-4 md:right-4 glass p-1.5 md:p-2.5 rounded-full shadow-luxury transition-shadow duration-300 hover:shadow-luxury-lg"
                      >
                        <Heart
                          className={`w-4 h-4 md:w-5 md:h-5 transition-colors duration-200 ${
                            liked.has(product.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                          }`}
                        />
                      </motion.button>

                      <div className="hidden md:block absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <div className="flex gap-2">
                          <motion.div className="flex-1" whileHover={reducedMotion ? undefined : { y: -2 }}>
                            <Button
                              onClick={() => handleViewDetails(product)}
                              className="w-full bg-white/95 backdrop-blur-md text-[#2A1B14] hover:bg-white shadow-lg transition-all duration-300"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                          </motion.div>
                          <motion.div className="flex-1" whileHover={reducedMotion ? undefined : { y: -2 }}>
                            <Button
                              onClick={() => handleQuickAddToCart(product)}
                              className="w-full bg-primary hover:bg-primary/95 text-primary-foreground shadow-lg transition-all duration-300"
                            >
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Add to Cart
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 md:p-6">
                      <div className="flex items-start justify-between gap-1 md:gap-2 mb-2 md:mb-3">
                        <span className="inline-block px-2 py-1 md:px-3 md:py-1.5 bg-secondary text-secondary-foreground rounded-full text-[10px] md:text-sm font-medium">
                          {product.badge}
                        </span>
                        {product.price && (
                          <span className="text-sm md:text-lg font-bold text-primary whitespace-nowrap">
                            {product.price}
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm md:text-xl text-foreground font-semibold mb-1 md:mb-2 line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="hidden md:block text-sm text-muted-foreground line-clamp-2">{product.description}</p>

                      <div className="md:hidden flex gap-1.5 mt-2">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(product);
                          }}
                          size="sm"
                          variant="outline"
                          className="flex-1 border-primary text-primary hover:bg-primary/10 text-[10px] h-7 transition-all duration-300 active:scale-95"
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
                          className="flex-1 bg-primary hover:bg-primary/95 text-primary-foreground text-[10px] h-7 transition-all duration-300 active:scale-95"
                        >
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </MagneticCard>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
