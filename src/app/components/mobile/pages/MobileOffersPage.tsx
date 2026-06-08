import { Gift, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export function MobileOffersPage() {
  // TODO: Replace with actual offers from Firebase
  const hasOffers = false;

  return (
    <div className="md:hidden min-h-screen bg-gradient-to-b from-background to-muted pt-[76px] px-4">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Special Offers</h1>
        <p className="text-sm text-muted-foreground mt-1">Exclusive deals and promotions</p>
      </div>

      {hasOffers ? (
        // TODO: Display actual offers here
        <div className="space-y-4">
          {/* Offer cards will go here */}
        </div>
      ) : (
        // Empty State
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-16 px-4"
        >
          <div className="bg-muted w-24 h-24 rounded-full flex items-center justify-center mb-6">
            <Gift className="w-12 h-12 text-primary" />
          </div>
          
          <h2 className="text-xl font-semibold text-foreground mb-2 text-center">
            No Active Offers
          </h2>
          
          <p className="text-sm text-muted-foreground text-center max-w-sm mb-6">
            We don't have any special offers at the moment. Check back soon for exciting deals!
          </p>

          <div className="bg-card rounded-2xl p-6 border border-border shadow-sm w-full max-w-sm">
            <div className="flex items-start gap-3">
              <div className="bg-secondary p-2 rounded-lg flex-shrink-0">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Stay Updated</h3>
                <p className="text-xs text-muted-foreground">
                  Follow us on social media or contact us to learn about upcoming promotions and seasonal offers.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
