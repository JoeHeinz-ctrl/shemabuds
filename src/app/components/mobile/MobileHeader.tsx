import { Heart, User, LogOut, Package } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { AuthModal } from "../AuthModal";

export function MobileHeader() {
  const { user, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUserClick = () => {
    if (user) {
      setShowUserMenu(!showUserMenu);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  return (
    <>
      <div 
        id="mobile-header"
        className="md:hidden fixed top-0 left-0 right-0 z-50 shadow-luxury"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,245,235,0.5) 50%, rgba(255,255,255,0.6) 100%)",
          backdropFilter: "blur(20px) saturate(120%)",
          WebkitBackdropFilter: "blur(20px) saturate(120%)",
          borderBottom: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        {/* Centered Logo Header */}
        <div className="flex items-center justify-between px-4 py-3 relative">
          {/* Contact Button on Left */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const event = new CustomEvent('openContactModal');
              window.dispatchEvent(event);
            }}
            className="text-xs font-semibold text-primary px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors z-10"
          >
            Contact
          </motion.button>

          {/* Centered Title - Elegant logo image */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 cursor-pointer flex items-center"
            onClick={scrollToTop}
          >
              <img
                src="/Brand/logo.svg"
                alt="Shema Buds"
                className="h-9 w-auto object-contain select-none scale-[3] origin-center"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(34, 197, 94, 0.4)) drop-shadow(0 2px 4px rgba(34, 197, 94, 0.3)) drop-shadow(0 0 0 2px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 0 4px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 0 6px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 0 8px rgba(0, 0, 0, 0.2))"
                }}
              />
          </div>

          {/* Explore Deals Button on Right */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Navigate to home and scroll to featured section
              window.dispatchEvent(new CustomEvent('navigateToHome'));
              setTimeout(() => {
                const featuredSection = document.getElementById('featured');
                if (featuredSection) {
                  featuredSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }, 100);
            }}
            className="text-xs font-semibold text-primary px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors z-10"
          >
            Explore Deals
          </motion.button>
        </div>

        {/* User Menu Dropdown */}
        <AnimatePresence>
          {showUserMenu && user && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-b border-border"
            >
              <div className="px-4 py-3 bg-muted/50">
                <p className="text-sm font-medium text-foreground">{user.displayName || "User"}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
                <button
                  onClick={handleSignOut}
                  className="mt-2 flex items-center gap-2 text-sm text-destructive hover:underline"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}
