import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Sparkles, Package, Instagram, Award } from "lucide-react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const stats = [
  {
    icon: Package,
    value: "150+",
    label: "Creations",
  },
  {
    icon: Instagram,
    value: "300+",
    label: "Followers",
  },
  {
    icon: Award,
    value: "100%",
    label: "Custom",
  }
];

export function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax effect for background image
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  
  return (
    <section ref={heroRef} className="relative min-h-[70vh] md:min-h-[90vh] flex items-center overflow-hidden bg-background">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: imageY }}
      >
        <motion.div
          style={{ scale: imageScale }}
          className="w-full h-full"
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1584461730592-5bfab6460bae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGZsb3dlciUyMGJvdXF1ZXQlMjBhcnJhbmdlbWVudHxlbnwxfHx8fDE3ODAyMjYxOTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Beautiful handmade flower bouquet"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/70 to-transparent md:from-background/70 md:via-background/50"></div>
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
          {/* Left Side: Text Content */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass inline-flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2.5 rounded-full mb-3 md:mb-6 shadow-luxury"
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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl mb-3 md:mb-6 text-foreground leading-[1.1] font-bold tracking-tight relative"
            >
              <span className="relative inline-block">
                Handmade Meets{" "}
                <motion.span
                  className="text-primary italic font-serif relative inline-block shimmer"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(166,124,82,0)",
                      "0 0 20px rgba(166,124,82,0.3)",
                      "0 0 20px rgba(166,124,82,0)"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Heartmade
                </motion.span>
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-secondary-foreground mb-4 md:mb-8 leading-relaxed font-light"
            >
              Discover the art of personalized gifting with our exquisite handmade bouquets, 
              custom gifts, and elegant event decorations.
            </motion.p>
            
            {/* Mobile: Horizontal Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="md:hidden grid grid-cols-3 gap-2 max-w-md"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="glass rounded-xl p-3 shadow-luxury"
                  >
                    <div className="flex flex-col items-center text-center">
                      <motion.div 
                        className="bg-secondary w-8 h-8 rounded-lg flex items-center justify-center mb-2"
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="w-4 h-4 text-primary" />
                      </motion.div>
                      <p className="text-lg font-bold text-foreground">{stat.value}</p>
                      <p className="text-[10px] text-muted-foreground font-medium">{stat.label}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Desktop: Vertical Stats Cards on Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden md:flex flex-col gap-4 items-end"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, x: -8 }}
                  className="glass rounded-xl p-4 shadow-luxury min-w-[180px]"
                >
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="bg-secondary w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    <div className="text-left">
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
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
