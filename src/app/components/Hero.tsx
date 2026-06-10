import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Sparkles, Package, Heart, Award } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";

import { LogomarkWatermark, LogomarkCorner, FloatingLeaf } from "./BrandDecoration";

const stats = [
  { icon: Package, value: "150+", label: "Creations Delivered" },
  { icon: Heart, value: "300+", label: "Happy Customers" },
  { icon: Award, value: "100%", label: "Handmade" },
];

// Slideshow images - Your actual product photos
const heroImages = [
  "https://res.cloudinary.com/diy2kkxyu/image/upload/v1780749291/header_image2_btfrmh.jpg",
  "https://res.cloudinary.com/diy2kkxyu/image/upload/v1780749291/header_image3_fwkwqv.jpg",
  "https://res.cloudinary.com/diy2kkxyu/image/upload/v1780749601/header_image4_wnkkeb.jpg",
];

export function Hero() {
  const heroRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Parallax effect for background image
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Auto-advance slideshow
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 15000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section ref={heroRef} className="relative min-h-[100dvh] flex items-center overflow-hidden z-0">
      {/* Background Image Slideshow with Parallax */}
      <motion.div
        className="absolute inset-0 z-0 min-h-full"
        style={{ y: imageY }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          style={{ scale: imageScale }}
          className="absolute inset-0 w-full h-full"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <ImageWithFallback
                src={heroImages[currentImageIndex]}
                alt={`Shema Buds handmade flower arrangement ${currentImageIndex + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </motion.div>

      {/* Slideshow Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`transition-all duration-300 rounded-full ${index === currentImageIndex
              ? 'w-8 h-2 bg-primary'
              : 'w-2 h-2 bg-white/50 hover:bg-white/70'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex justify-center w-full min-h-[100dvh] pt-20 pb-8 md:pt-28 md:pb-10">
        {/* Floating background leaf motifs in empty margins */}
        <FloatingLeaf size={60} opacity={0.12} className="absolute left-[6%] top-[28%] pointer-events-none hidden lg:block text-sage" delay={0} duration={7} />
        <FloatingLeaf size={60} opacity={0.12} className="absolute right-[8%] top-[50%] pointer-events-none hidden lg:block text-olive" delay={2} duration={9} />
        <FloatingLeaf size={45} opacity={0.08} className="absolute left-[15%] bottom-[15%] pointer-events-none hidden lg:block text-accent" delay={1.5} duration={8} />
        <FloatingLeaf size={50} opacity={0.10} className="absolute right-[12%] top-[18%] pointer-events-none hidden lg:block text-primary" delay={3} duration={6} />
        
        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg self-center -translate-y-6">
          <div
            className="rounded-2xl px-6 py-6 sm:px-8 sm:py-8 md:px-9 md:py-7 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,245,235,0.20) 50%, rgba(255,255,255,0.22) 100%)",
              backdropFilter: "blur(40px) saturate(200%)",
              WebkitBackdropFilter: "blur(40px) saturate(200%)",
              border: "1.5px solid rgba(255,255,255,0.40)",
              boxShadow: "0 12px 48px rgba(212,116,74,0.15), 0 4px 12px rgba(255,255,255,0.35) inset, 0 -2px 0 rgba(212,116,74,0.08) inset",
            }}
          >
            {/* Subtle Brand Logomark Corner Accents */}
            <LogomarkCorner size={90} position="top-right" opacity={0.50} colorClass="text-primary" />
            <LogomarkCorner size={90} position="bottom-left" opacity={0.50} colorClass="text-primary" />

            {/* Liquid shimmer overlay */}
            <div
              aria-hidden
              style={{
                position: "absolute", inset: 0, borderRadius: "inherit", pointerEvents: "none",
                background: "radial-gradient(ellipse at 20% 0%, rgba(255,255,255,0.45) 0%, transparent 40%), radial-gradient(ellipse at 80% 100%, rgba(212,116,74,0.12) 0%, transparent 40%), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 40%)",
              }}
            />

            {/* Text contrast backdrop */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: "10%",
                borderRadius: "inherit",
                pointerEvents: "none",
                background: "radial-gradient(ellipse at center, rgba(255,255,255,0.35) 40%, transparent 40%)",
                filter: "blur(180px)",
              }}
            />

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 md:mb-4 leading-[1.1] font-bold tracking-tight relative text-center z-10"
            >
              <span 
                className="relative block"
                style={{
                  color: "#1c5d34ff",
                  textShadow: "0 2px 4px rgba(200, 158, 158, 0.25), 0 4px 8px rgba(225, 215, 215, 0.15), 1px 1px 1px rgba(0,0,0,0.2)",
                }}
              >
                Handmade Meets
              </span>
              <motion.span
                className="italic font-serif relative block"
                style={{
                  background: "linear-gradient(135deg, #d47448 0%, #efbf43 50%, #94b38a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4)) drop-shadow(0 4px 16px rgba(0,0,0,0.3)) drop-shadow(0 0 20px rgba(0,0,0,0.2))",
                }}
              >
                Heartmade
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs sm:text-sm md:text-base text-[#3b2a1e] leading-relaxed font-medium text-center relative z-10 mb-3 md:mb-4"
              style={{ textShadow: "0 1px 4px rgba(92, 90, 90, 0.6)" }}
            >
              Discover the art of personalized gifting with our exquisite handmade bouquets,
              custom gifts, and elegant event decorations.
            </motion.p>

            {/* Explore Collection Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-3 md:mt-4 flex justify-center relative z-10"
            >
              <button
                onClick={() => {
                  // Check if mobile view
                  const isMobile = window.innerWidth < 768;
                  
                  if (isMobile) {
                    // Mobile: Navigate to collections tab
                    window.dispatchEvent(new Event('navigateToCollections'));
                  } else {
                    // Desktop: Scroll to Our Collection (services) section
                    const servicesSection = document.getElementById("services");
                    if (servicesSection) {
                      servicesSection.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }
                }}
                className="group px-5 py-2.5 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-bold transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, rgba(198, 89, 42, 0.85) 0%, rgba(213, 130, 52, 0.75) 100%)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "2px solid rgba(182, 79, 35, 0.9)",
                  boxShadow: "0 6px 24px rgba(8, 106, 20, 0.35), 0 2px 8px rgba(255,255,255,0.3) inset",
                  color: "#ffffff",
                  textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                }}
              >
                <span className="flex items-center gap-2">
                  Explore Collection
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 md:mt-5 pt-4 md:pt-5 pb-1 border-t border-white/50"
            >
              <div className="grid grid-cols-3 divide-x divide-white/40">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      className="flex flex-col items-center text-center px-2 sm:px-4 py-1"
                    >
                      <div className="bg-secondary/90 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center mb-1 sm:mb-1.5">
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                      </div>
                      <p className="text-sm sm:text-base md:text-lg font-bold text-foreground leading-none mb-0.5">
                        {stat.value}
                      </p>
                      <p className="text-[9px] sm:text-[10px] md:text-xs text-[#4e3c32] font-semibold leading-snug">
                        {stat.label}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 dark:bg-primary/10 rounded-full blur-3xl -z-10"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 5, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute top-20 right-0 w-96 h-96 bg-accent/15 dark:bg-primary/10 rounded-full blur-3xl -z-10"
      />
      <LogomarkWatermark size={280} opacity={0.06} className="absolute bottom-[8%] right-[6%] pointer-events-none hidden md:block" />
    </section>
  );
}
