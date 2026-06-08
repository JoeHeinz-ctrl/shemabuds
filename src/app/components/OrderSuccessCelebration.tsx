import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

interface OrderSuccessCelebrationProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderSuccessCelebration({ isOpen, onClose }: OrderSuccessCelebrationProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowContent(true);
      
      // Launch confetti
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      
      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const colors = ['#A67C52', '#C4956F', '#D8B4A0', '#E8C4B4', '#F3D7CA'];

      const confettiInterval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(confettiInterval);
          return;
        }

        const particleCount = 3;
        
        // Gold confetti from left
        confetti({
          particleCount,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: colors,
          ticks: 200,
          gravity: 1,
          decay: 0.94,
          startVelocity: 30,
          scalar: randomInRange(0.8, 1.2),
        });
        
        // Gold confetti from right
        confetti({
          particleCount,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: colors,
          ticks: 200,
          gravity: 1,
          decay: 0.94,
          startVelocity: 30,
          scalar: randomInRange(0.8, 1.2),
        });
      }, 250);

      // Flower petals effect
      const petalInterval = setInterval(() => {
        confetti({
          particleCount: 2,
          angle: 90,
          spread: 45,
          origin: { x: Math.random(), y: 0 },
          colors: ['#F3D7CA', '#E8C4B4', '#D8B4A0'],
          shapes: ['circle'],
          gravity: 0.4,
          scalar: 1.2,
          drift: 0.5,
          ticks: 300,
        });
      }, 300);

      // Auto close after celebration
      const timer = setTimeout(() => {
        clearInterval(confettiInterval);
        clearInterval(petalInterval);
        onClose();
      }, 4000);

      return () => {
        clearInterval(confettiInterval);
        clearInterval(petalInterval);
        clearTimeout(timer);
      };
    } else {
      setShowContent(false);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Success Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ 
              duration: 0.5,
              ease: [0.34, 1.56, 0.64, 1]
            }}
            className="relative glass-strong rounded-3xl p-8 md:p-12 max-w-md w-full text-center shadow-luxury-lg"
          >
            {/* Animated Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                delay: 0.2,
                duration: 0.6,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              className="flex justify-center mb-6"
            >
              <motion.div
                animate={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.1, 1.1, 1.1, 1]
                }}
                transition={{ 
                  duration: 0.6,
                  delay: 0.5
                }}
                className="relative"
              >
                <div className="absolute inset-0 bg-[#A67C52]/20 dark:bg-[#C4956F]/20 rounded-full blur-2xl animate-pulse" />
                <CheckCircle2 className="w-24 h-24 text-[#A67C52] dark:text-[#C4956F] relative" strokeWidth={1.5} />
              </motion.div>
            </motion.div>

            {/* Success Message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-serif">
                Order Received!
              </h2>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex items-center justify-center gap-2 mb-4"
              >
                <Sparkles className="w-5 h-5 text-[#A67C52] dark:text-[#C4956F]" />
                <p className="text-lg text-muted-foreground font-medium">
                  We'll craft something beautiful for you
                </p>
                <Sparkles className="w-5 h-5 text-[#A67C52] dark:text-[#C4956F]" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-muted-foreground"
              >
                Thank you for choosing Shema Buds. We'll contact you soon to confirm your order details.
              </motion.p>
            </motion.div>

            {/* Decorative floating elements */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -left-4 text-[#D8B4A0] dark:text-[#8B6F47] opacity-50"
            >
              <Sparkles className="w-8 h-8" />
            </motion.div>

            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, -5, 5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute -bottom-4 -right-4 text-[#D8B4A0] dark:text-[#8B6F47] opacity-50"
            >
              <Sparkles className="w-8 h-8" />
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
