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
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 glass-strong shadow-luxury">
        {/* Centered Logo Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          {/* Logo on Left */}
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
            onClick={scrollToTop}
          >
            <div className="bg-primary p-1.5 rounded-lg shadow-sm">
              <Heart className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
            </div>
          </motion.div>

          {/* Centered Title - Elegant & Eye-catching */}
          <motion.div 
            whileTap={{ scale: 0.95 }}
            className="absolute left-1/2 -translate-x-1/2 cursor-pointer"
            onClick={scrollToTop}
          >
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#A67C52] via-[#D4A574] to-[#A67C52]" 
                style={{ 
                  fontFamily: "'Relona', serif",
                  letterSpacing: '0.05em',
                  textShadow: '0 2px 15px rgba(166, 124, 82, 0.4)'
                }}>
              Shema Buds
            </h1>
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
