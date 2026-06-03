import { Heart, ShoppingBag, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useOrdering } from "../OrderingSystem";
import { useAuth } from "../../../contexts/AuthContext";
import { AuthModal } from "../AuthModal";

export function MobileHeader() {
  const { cart, setIsCartOpen } = useOrdering();
  const { user, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

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
        {/* Row 1: Logo and Actions */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <motion.div 
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={scrollToTop}
          >
            <div className="bg-primary p-1.5 rounded-lg shadow-sm">
              <Heart className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
            </div>
            <span className="text-lg text-foreground font-semibold tracking-tight">Shemabuds</span>
          </motion.div>

          <div className="flex items-center gap-2">
            {/* User Button */}
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

            {/* Cart Icon */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleCartClick}
              className="relative p-2 text-secondary-foreground active:text-primary transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-semibold shadow-luxury"
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>
          </div>
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
