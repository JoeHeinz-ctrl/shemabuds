import { Button } from "./ui/button";
import { Heart, ShoppingBag, Moon, Sun, User, LogOut, Package, Settings } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { useOrdering } from "./OrderingSystem";
import { MobileHeader } from "./mobile/MobileHeader";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { AuthModal } from "./AuthModal";

export function Header() {
  const { cart, setIsCartOpen } = useOrdering();
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  return (
    <>
      {/* Mobile Header - Only visible on mobile */}
      <div className="md:hidden">
        <MobileHeader />
      </div>

      {/* Desktop Header - Hidden on mobile */}
      <header
        className="hidden md:block fixed top-4 left-0 right-0 z-50 overflow-visible px-6"
      >
        <nav className="w-full flex items-center justify-between gap-8 relative">
          {/* Left Section — Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer shrink-0 flex items-center justify-center -translate-y-10"
            onClick={() => {
              const event = new CustomEvent('openAboutModal');
              window.dispatchEvent(event);
            }}
          >
            <img
              src="/Brand/logo.svg"
              alt="Shema Buds Logo"
              className="h-32 lg:h-36 w-auto object-contain select-none"
            />
          </motion.div>

          {/* Right Section — Actions */}
          <motion.div
            className="flex items-center gap-3 lg:gap-4 px-5 py-2 ml-auto -translate-y-12"
            style={{
              background: "linear-gradient(135deg, rgba(205,232,139,0.15) 0%, rgba(205,232,139,0.08) 50%, rgba(205,232,139,0.15) 100%)",
              backdropFilter: "blur(15px)",
              WebkitBackdropFilter: "blur(15px)",
              border: "1px solid rgba(205,232,139,0.25)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
              borderRadius: "40px",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 60%)",
              }}
            />
            <div className="relative z-10 flex items-center gap-3 lg:gap-4">
              <button
                onClick={() => {
                  const event = new CustomEvent('openContactModal');
                  window.dispatchEvent(event);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-black bg-gradient-to-r from-[#efbf43] to-[#e5b42d] hover:from-[#e5b42d] hover:to-[#d9a820] shadow-luxury ring-1 ring-white/30 transition-all duration-200 hover:scale-105 backdrop-blur-sm"
                style={{
                  boxShadow: "inset 0 1px 2px rgba(255,255,255,0.3), 0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                Contact
              </button>

              {/* Explore Collection Button */}
              <button
                onClick={() => {
                  const element = document.getElementById("services");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-black bg-gradient-to-r from-[#d0744a] to-[#c8664f] hover:from-[#c8664f] hover:to-[#b85a45] shadow-luxury ring-1 ring-white/20 transition-all duration-200 hover:scale-105"
              >
                Explore Collection
              </button>

              {/* Settings Menu - Button only */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSettingsMenu(true)}
                className="relative p-2 text-[#2A1B14] hover:text-primary transition-colors duration-200"
                aria-label="Settings"
              >
                <Settings className="w-6 h-6" />
              </motion.button>
              
              {/* Cart Icon */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCartClick}
                className="relative p-2 text-[#2A1B14] hover:text-primary transition-colors duration-200"
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
          </motion.div>
        </nav>
      </header>
      
      {/* Settings Modal - Renders at body level */}
      <AnimatePresence>
        {showSettingsMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20"
              onClick={() => setShowSettingsMenu(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-20 right-8 w-64 glass-strong rounded-2xl shadow-luxury-lg border border-border overflow-hidden z-50"
            >
              <div className="p-3 space-y-1">
                {/* Theme Toggle */}
                <button
                  onClick={() => {
                    toggleTheme();
                    setShowSettingsMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors text-left"
                >
                  <motion.div
                    initial={false}
                    animate={{ rotate: theme === "dark" ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {theme === "dark" ? (
                      <Sun className="w-5 h-5 text-primary" />
                    ) : (
                      <Moon className="w-5 h-5 text-primary" />
                    )}
                  </motion.div>
                  <span className="font-medium text-foreground">
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </span>
                </button>

                {/* User Menu */}
                <button
                  onClick={() => {
                    setShowSettingsMenu(false);
                    if (user) {
                      setShowUserMenu(true);
                    } else {
                      setShowAuthModal(true);
                    }
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors text-left"
                >
                  <div className="relative">
                    <User className="w-5 h-5 text-primary" />
                    {user && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-card"></span>
                    )}
                  </div>
                  <span className="font-medium text-foreground">
                    {user ? "My Account" : "Sign In"}
                  </span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* User Menu Modal */}
      <AnimatePresence>
        {showUserMenu && user && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20"
              onClick={() => setShowUserMenu(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-20 right-8 w-64 glass-strong rounded-2xl shadow-luxury-lg border border-border overflow-hidden z-50"
            >
              <div className="p-4 border-b border-border">
                <p className="font-semibold text-foreground">{user.displayName || "User"}</p>
                <p className="text-sm text-muted-foreground truncate">{user.email}</p>
              </div>
              <div className="p-2">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    window.location.href = "#orders";
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors text-left"
                >
                  <Package className="w-5 h-5 text-primary" />
                  <span className="font-medium text-foreground">My Orders</span>
                </button>
                <button
                  onClick={async () => {
                    await signOut();
                    setShowUserMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-destructive/10 transition-colors text-left text-destructive"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}
