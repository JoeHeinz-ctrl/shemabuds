import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, X, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect } from "react";
import confetti from "canvas-confetti";

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  orderType: "placed" | "whatsapp";
}

export function OrderSuccessModal({ isOpen, onClose, orderId, orderType }: OrderSuccessModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Trigger confetti animation
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Confetti from left
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#A67C52', '#D8B4A0', '#E8C4B4', '#FAF7F2', '#FEFDFB']
        });
        
        // Confetti from right
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#A67C52', '#D8B4A0', '#E8C4B4', '#FAF7F2', '#FEFDFB']
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#2A1B14]/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 50 }}
          transition={{ type: "spring", duration: 0.6, bounce: 0.4 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-card text-card-foreground rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
        >
          {/* Header with animated checkmark */}
          <div className="relative bg-gradient-to-br from-primary to-accent p-8 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", duration: 0.8 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-background rounded-full mb-4"
            >
              <CheckCircle className="w-12 h-12 text-primary" />
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2 font-serif"
            >
              {orderType === "whatsapp" ? "Order Sent!" : "Order Placed!"}
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2 text-white/90"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">Thank you for your order</span>
              <Sparkles className="w-4 h-4" />
            </motion.div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-6 space-y-4"
          >
            {/* Order ID */}
            <div className="bg-muted rounded-2xl p-4 border border-border">
              <p className="text-xs text-muted-foreground mb-1">Order ID</p>
              <p className="text-sm font-mono font-semibold text-foreground break-all">
                {orderId}
              </p>
            </div>

            {/* Message */}
            <div className="text-center space-y-2">
              {orderType === "whatsapp" ? (
                <>
                  <p className="text-foreground font-medium">
                    Your order details have been sent to WhatsApp
                  </p>
                  <p className="text-sm text-muted-foreground">
                    We'll contact you shortly to confirm details and pricing.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-foreground font-medium">
                    Your order has been successfully placed!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    We'll contact you shortly to confirm details and pricing.
                  </p>
                </>
              )}
            </div>

            {/* Action Button */}
            <Button
              onClick={onClose}
              className="w-full bg-primary hover:bg-primary/95 text-primary-foreground py-6 text-lg shadow-[0_4px_16px_rgba(166,124,82,0.3)] transition-all duration-300"
            >
              Continue Shopping
            </Button>

            {/* Additional info */}
            <p className="text-xs text-center text-muted-foreground">
              You can view this order in the admin dashboard
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
