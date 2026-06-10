import { Button } from "./ui/button";
import { Heart, ShoppingBag, Moon, Sun, User, LogOut, Package, Settings, Car } from "lucide-react";
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
        className="hidden md:block fixed top-0 left-0 right-0 z-50 overflow-visible shadow-luxury"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,245,235,0.5) 50%, rgba(255,255,255,0.6) 100%)",
          backdropFilter: "blur(20px) saturate(120%)",
          WebkitBackdropFilter: "blur(20px) saturate(120%)",
          borderBottom: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        <nav className="container mx-auto px-6 py-2 flex items-center justify-between relative">
          {/* Contact Button - Left */}
          <button
            onClick={() => {
              const event = new CustomEvent('openContactModal');
              window.dispatchEvent(event);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-foreground/80 bg-muted/60 hover:bg-muted/80 backdrop-blur-sm transition-all duration-200 hover:scale-105"
          >
            Contact
          </button>

          {/* Logo - Center (no background pill, bigger with scale) */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="absolute left-1/2 -translate-x-1/2 cursor-pointer shrink-0 flex items-center justify-center"
            onClick={() => {
              const event = new CustomEvent('openAboutModal');
              window.dispatchEvent(event);
            }}
          >
            <img
              src="/Brand/logo.svg"
              alt="Shema Buds Logo"
              className="h-20 lg:h-24 w-auto object-contain select-none scale-150"
              style={{
                filter: "drop-shadow(0 0 0 2px rgba(34, 197, 94, 1)) drop-shadow(0 0 0 3px rgba(34, 197, 94, 0.8)) drop-shadow(0 1px 3px rgba(0, 0, 0, 0.5)) drop-shadow(0 3px 6px rgba(0, 0, 0, 0.4)) drop-shadow(0 6px 12px rgba(0, 0, 0, 0.3))"
              }}
            />
          </motion.div>

          {/* Right Side - Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Explore Collection button removed */}

            {/* Settings Menu - Button only */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-foreground/70 hover:text-primary transition-colors duration-200 rounded-full hover:bg-muted/40"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-semibold">{totalItems}</span>
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSettingsMenu(true)}
              className="relative p-2.5 text-foreground/70 hover:text-primary transition-colors duration-200 rounded-full hover:bg-muted/40"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5" />
            </motion.button>
          </div>
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
                {/* Cart */}
                <button
                  onClick={() => {
                    setIsCartOpen(true);
                    setShowSettingsMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors text-left"
                >
                  <div className="relative">
                    <ShoppingBag className="w-5 h-5 text-primary" />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-semibold"></span>
                    )}
                  </div>
                  <span className="font-medium text-foreground">Cart {totalItems > 0 && `(${totalItems})`}</span>
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

                <div className="border-t border-border my-1"></div>

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
