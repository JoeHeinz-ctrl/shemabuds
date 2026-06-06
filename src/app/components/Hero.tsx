import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Sparkles, Package, Heart, Award } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";

const stats = [
  { icon: Package, value: "150+", label: "Creations Delivered" },
  { icon: Heart, value: "300+", label: "Happy Customers" },
  { icon: Award, value: "100%", label: "Handmade" },
];

// Slideshow images - Your actual product photos
const heroImages = [
  "https://res.cloudinary.com/diy2kkxyu/image/upload/v1780749291/header_image2_btfrmh.jpg",
  "https://res.cloudinary.com/diy2kkxyu/image/upload/v1780749291/header_image1_u1vs4k.jpg",
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
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section ref={heroRef} className="relative min-h-[70vh] md:min-h-[90vh] flex items-center overflow-hidden bg-background">
      {/* Background Image Slideshow with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: imageY }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          style={{ scale: imageScale }}
          className="w-full h-full relative"
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
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-white/20 rounded-lg pointer-events-none" />
        </div>
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex justify-center w-full py-8 md:py-10">
        <div className="w-full max-w-3xl lg:max-w-4xl">
          <div
            className="rounded-2xl px-7 py-8 sm:px-9 sm:py-10 md:px-12 md:py-11 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,245,235,0.35) 50%, rgba(255,255,255,0.40) 100%)",
              backdropFilter: "blur(28px) saturate(180%)",
              WebkitBackdropFilter: "blur(28px) saturate(180%)",
              border: "1.5px solid rgba(255,255,255,0.65)",
              boxShadow: "0 8px 32px rgba(166,124,82,0.18), 0 2px 8px rgba(255,255,255,0.5) inset, 0 -1px 0 rgba(166,124,82,0.12) inset",
            }}
          >
            {/* Liquid shimmer overlay */}
            <div
              aria-hidden
              style={{
                position: "absolute", inset: 0, borderRadius: "inherit", pointerEvents: "none",
                background: "radial-gradient(ellipse at 20% 0%, rgba(255,255,255,0.55) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(166,124,82,0.10) 0%, transparent 60%)",
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass inline-flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2.5 rounded-full mb-4 md:mb-6 shadow-luxury"
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary" />
              </motion.div>
              <span className="text-xs md:text-sm text-secondary-foreground font-medium tracking-wide">Crafted with Love & Care</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6 text-[#1a0f0a] leading-[1.1] font-bold tracking-tight relative"
              style={{ textShadow: "0 1px 3px rgba(255,255,255,0.4)" }}
            >
              <span className="relative inline-block">
                Handmade Meets{" "}
                <motion.span
                  className="italic font-serif relative inline-block shimmer"
                >
                  Heartmade
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-[#3b2a1e] leading-relaxed font-medium"
            >
              Discover the art of personalized gifting with our exquisite handmade bouquets,
              custom gifts, and elegant event decorations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-7 md:mt-9 pt-7 md:pt-9 pb-1 border-t border-white/50"
            >
              <div className="grid grid-cols-3 divide-x divide-white/40">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      className="flex flex-col items-center text-center px-3 sm:px-6 py-2"
                    >
                      <div className="bg-secondary/90 w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mb-2 sm:mb-3">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                      <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground leading-none mb-1">
                        {stat.value}
                      </p>
                      <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground font-medium leading-snug">
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
    </section>
  );
}
