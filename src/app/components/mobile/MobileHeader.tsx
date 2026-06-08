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
        className="md:hidden fixed top-0 left-0 right-0 z-50 shadow-luxury"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,245,235,0.5) 50%, rgba(255,255,255,0.6) 100%)",
          backdropFilter: "blur(20px) saturate(120%)",
          WebkitBackdropFilter: "blur(20px) saturate(120%)",
          borderBottom: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        {/* Centered Logo Header */}
        <div className="flex items-center justify-between px-4 py-3">
          {/* Contact Button on Left */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const event = new CustomEvent('openContactModal');
              window.dispatchEvent(event);
            }}
            className="text-xs font-semibold text-primary px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
          >
            Contact
          </motion.button>

          {/* Centered Title - Elegant logo image */}
          <motion.div 
            whileTap={{ scale: 0.95 }}
            className="absolute left-1/2 -translate-x-1/2 cursor-pointer flex items-center"
            onClick={scrollToTop}
            style={{ marginLeft: '20px' }}
          >
              <img
                src="/Brand/logo.svg"
                alt="Shema Buds"
                className="h-9 md:h-11 w-auto object-contain select-none scale-[2.5] md:scale-[2.8] origin-center"
              />
          </motion.div>

          {/* User Button on Right */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleUserClick}
            className="relative p-2 text-secondary-foreground active:text-primary transition-colors"
          >
            <User className="w-6 h-6" />
            {user && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></span>
            )}
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
