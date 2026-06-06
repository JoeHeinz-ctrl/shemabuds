import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Sparkles, Package, Heart, Award, Flower2 } from "lucide-react";
import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useLuxuryMotion, useCursorTilt } from "../../hooks/useLuxuryMotion";

const stats = [
  { icon: Package, value: "150+", label: "Creations Delivered" },
  { icon: Heart, value: "300+", label: "Happy Customers" },
  { icon: Award, value: "100%", label: "Handmade" },
];

const heroImages = [
  "https://res.cloudinary.com/diy2kkxyu/image/upload/v1780749291/header_image2_btfrmh.jpg",
  "https://res.cloudinary.com/diy2kkxyu/image/upload/v1780749291/header_image1_u1vs4k.jpg",
  "https://res.cloudinary.com/diy2kkxyu/image/upload/v1780749291/header_image3_fwkwqv.jpg",
  "https://res.cloudinary.com/diy2kkxyu/image/upload/v1780749601/header_image4_wnkkeb.jpg",
];

const ORB_COLORS = ["#D9B99B", "#F6E8DF", "#C8A27A"];

const decorativeAccents = [
  { Icon: Sparkles, top: "12%", left: "8%", size: 18, delay: 0 },
  { Icon: Flower2, top: "22%", right: "10%", size: 22, delay: 1.2 },
  { Icon: Sparkles, bottom: "28%", left: "14%", size: 14, delay: 2.4 },
  { Icon: Flower2, bottom: "18%", right: "12%", size: 20, delay: 0.8 },
  { Icon: Sparkles, top: "45%", right: "6%", size: 16, delay: 1.8 },
];

const entranceEase = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [bgReady, setBgReady] = useState(false);

  const { reducedMotion, enableRichMotion, enableCursorTilt, orbCount } = useLuxuryMotion();
  const { cardRef, rotateX: cursorRotateX, rotateY: cursorRotateY } = useCursorTilt(enableCursorTilt);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 120]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, reducedMotion ? 1 : 1.05]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const heroFade = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.92, 0.75]);
  const cardRotateX = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 8]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -60]);
  const cardScale = useTransform(scrollYProgress, [0, 1], [1, reducedMotion ? 1 : 1.03]);

  const orbs = useMemo(
    () =>
      Array.from({ length: orbCount }, (_, i) => ({
        id: i,
        color: ORB_COLORS[i % ORB_COLORS.length],
        size: 180 + (i % 5) * 70,
        left: `${(i * 13 + 4) % 88}%`,
        top: `${(i * 19 + 8) % 82}%`,
        opacity: 0.08 + (i % 4) * 0.02,
        blur: 60 + (i % 5) * 8,
        duration: 16 + (i % 4) * 3,
        delay: i * 0.7,
      })),
    [orbCount]
  );

  useEffect(() => {
    if (reducedMotion) {
      setBgReady(true);
      return;
    }
    const t = setTimeout(() => setBgReady(true), 80);
    return () => clearTimeout(t);
  }, [reducedMotion]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      style={{ perspective: enableRichMotion ? 1500 : undefined }}
    >
      <motion.div className="absolute inset-0 z-0 min-h-full" style={{ opacity: heroFade }}>
        <motion.div
          className="absolute inset-0 min-h-full will-change-transform"
          style={{ y: bgY }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div className="absolute inset-0 w-full h-full" style={{ scale: bgScale }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: bgReady ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 1.5, ease: "easeInOut" }}
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
          <motion.div
            className="absolute inset-0 bg-black/10 pointer-events-none"
            style={{ opacity: bgOpacity }}
          />
        </motion.div>

        {enableRichMotion &&
          orbs.map((orb) => (
            <motion.div
              key={orb.id}
              aria-hidden
              className="absolute rounded-full pointer-events-none will-change-transform"
              style={{
                left: orb.left,
                top: orb.top,
                width: orb.size,
                height: orb.size,
                background: orb.color,
                opacity: orb.opacity,
                filter: `blur(${orb.blur}px)`,
              }}
              animate={{
                x: [0, 24, -16, 12, 0],
                y: [0, -20, 14, -10, 0],
                scale: [1, 1.06, 0.96, 1.03, 1],
              }}
              transition={{
                duration: orb.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: orb.delay,
              }}
            />
          ))}
      </motion.div>

      {enableRichMotion &&
        decorativeAccents.map(({ Icon, delay, size, ...pos }, i) => (
          <motion.div
            key={i}
            aria-hidden
            className="absolute z-[5] pointer-events-none text-primary/20"
            style={pos}
            animate={{ y: [0, -12, 0], opacity: [0.15, 0.28, 0.15], rotate: [0, 8, -6, 0] }}
            transition={{ duration: 10 + i, repeat: Infinity, ease: "easeInOut", delay }}
          >
            <Icon style={{ width: size, height: size }} />
          </motion.div>
        ))}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            whileHover={reducedMotion ? undefined : { scale: 1.15 }}
            className={`transition-all duration-300 rounded-full ${
              index === currentImageIndex
                ? "w-8 h-2 bg-primary"
                : "w-2 h-2 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex justify-center w-full pt-24 pb-8 md:pt-28 md:pb-10">
        <div className="w-full max-w-3xl lg:max-w-4xl">
          <motion.div
            style={{
              y: cardY,
              scale: cardScale,
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            <motion.div
              style={{
                rotateX: cardRotateX,
                transformPerspective: 1500,
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                ref={cardRef}
                initial={reducedMotion ? false : { opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: entranceEase }}
                style={{
                  rotateX: cursorRotateX,
                  rotateY: cursorRotateY,
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                }}
              >
                <div className="rounded-2xl px-7 py-8 sm:px-9 sm:py-10 md:px-12 md:py-11 relative overflow-hidden hero-glass-card">
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none rounded-[inherit]"
                    style={{
                      background:
                        "radial-gradient(ellipse at 20% 0%, rgba(255,255,255,0.65) 0%, transparent 58%), radial-gradient(ellipse at 80% 100%, rgba(166,124,82,0.12) 0%, transparent 58%)",
                    }}
                  />
                  {!reducedMotion && <div aria-hidden className="hero-glass-reflection" />}

                  <motion.div
                    initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.35, ease: entranceEase }}
                    className="glass inline-flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2.5 rounded-full mb-4 md:mb-6 shadow-luxury"
                  >
                    <motion.div
                      animate={reducedMotion ? undefined : { rotate: [0, 15, -15, 15, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      whileHover={reducedMotion ? undefined : { scale: 1.1 }}
                    >
                      <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                    </motion.div>
                    <span className="text-xs md:text-sm text-secondary-foreground font-medium tracking-wide">
                      Crafted with Love & Care
                    </span>
                  </motion.div>

                  <motion.h1
                    initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.5, ease: entranceEase }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6 text-[#1a0f0a] leading-[1.1] font-bold tracking-tight relative"
                    style={{ textShadow: "0 1px 3px rgba(255,255,255,0.4)" }}
                  >
                    <span className="relative inline-block">
                      Handmade Meets{" "}
                      <motion.span className="italic font-serif relative inline-block shimmer">
                        Heartmade
                      </motion.span>
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.65, ease: entranceEase }}
                    className="text-sm sm:text-base md:text-lg text-[#3b2a1e] leading-relaxed font-medium"
                  >
                    Discover the art of personalized gifting with our exquisite handmade bouquets,
                    custom gifts, and elegant event decorations.
                  </motion.p>

                  <motion.div
                    initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.85, ease: entranceEase }}
                    className="mt-7 md:mt-9 pt-7 md:pt-9 pb-1 border-t border-white/50"
                  >
                    <div className="grid grid-cols-3 divide-x divide-white/40">
                      {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                          <motion.div
                            key={stat.label}
                            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1 + index * 0.12, ease: entranceEase }}
                            whileHover={
                              reducedMotion
                                ? undefined
                                : { y: -8, scale: 1.04, transition: { type: "spring", stiffness: 300 } }
                            }
                            className="flex flex-col items-center text-center px-3 sm:px-6 py-2 rounded-xl stat-card-glow cursor-default"
                          >
                            <motion.div
                              animate={reducedMotion ? undefined : { y: [0, -6, 0, 6, 0] }}
                              transition={{
                                duration: 5 + index * 0.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1.2 + index * 0.15,
                              }}
                              className="flex flex-col items-center"
                            >
                              <motion.div
                                className="bg-secondary/90 w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mb-2 sm:mb-3"
                                whileHover={reducedMotion ? undefined : { scale: 1.08 }}
                              >
                                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                              </motion.div>
                              <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground leading-none mb-1">
                                {stat.value}
                              </p>
                              <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground font-medium leading-snug">
                                {stat.label}
                              </p>
                            </motion.div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {enableRichMotion && (
        <>
          <motion.div
            aria-hidden
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 w-64 h-64 bg-[#D9B99B]/20 rounded-full blur-3xl pointer-events-none -z-10"
          />
          <motion.div
            aria-hidden
            animate={{ y: [0, 20, 0], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-20 right-0 w-96 h-96 bg-[#F6E8DF]/25 rounded-full blur-3xl pointer-events-none -z-10"
          />
        </>
      )}
    </section>
  );
}
