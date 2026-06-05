import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, Heart, Award } from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-strong rounded-3xl shadow-luxury-lg max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">About Shema Buds</h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-secondary-foreground" />
            </motion.button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto flex-1">
            <div className="space-y-6">
              {/* Story */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Our Story
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Shema Buds is where artistry meets celebration. We craft handmade floral arrangements 
                  and custom bouquets that transform moments into memories. Each piece is thoughtfully 
                  designed to capture emotions and celebrate life's special occasions.
                </p>
              </div>

              {/* Mission */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Our Mission
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We believe in the power of flowers to convey what words cannot. Our mission is to 
                  deliver not just flowers, but feelings—joy, love, gratitude, and celebration. Every 
                  arrangement is a unique work of art, crafted with care and passion.
                </p>
              </div>

              {/* What We Do */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">What We Create</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-xl">
                    <h4 className="font-semibold text-foreground mb-2">Custom Bouquets</h4>
                    <p className="text-sm text-muted-foreground">
                      Handcrafted arrangements tailored to your vision and occasion.
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-xl">
                    <h4 className="font-semibold text-foreground mb-2">Event Decor</h4>
                    <p className="text-sm text-muted-foreground">
                      Beautiful floral decorations for weddings, parties, and special events.
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-xl">
                    <h4 className="font-semibold text-foreground mb-2">Gift Hampers</h4>
                    <p className="text-sm text-muted-foreground">
                      Curated gift collections with flowers and thoughtful additions.
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-xl">
                    <h4 className="font-semibold text-foreground mb-2">Seasonal Specials</h4>
                    <p className="text-sm text-muted-foreground">
                      Unique arrangements celebrating festivals and seasons.
                    </p>
                  </div>
                </div>
              </div>

              {/* Values */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Our Values</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div>
                      <p className="font-medium text-foreground">Quality Craftsmanship</p>
                      <p className="text-sm text-muted-foreground">Every piece is handmade with attention to detail</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div>
                      <p className="font-medium text-foreground">Fresh & Premium</p>
                      <p className="text-sm text-muted-foreground">We use only the finest, freshest flowers</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div>
                      <p className="font-medium text-foreground">Customer Delight</p>
                      <p className="text-sm text-muted-foreground">Your satisfaction is our priority</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div>
                      <p className="font-medium text-foreground">Timely Delivery</p>
                      <p className="text-sm text-muted-foreground">We ensure your moments are celebrated on time</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
