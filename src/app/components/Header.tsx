import { Button } from "./ui/button";
import { Heart, ShoppingBag, Moon, Sun, User, LogOut, Package, Settings } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
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
        className="hidden md:block fixed top-0 left-0 right-0 z-50 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,245,235,0.42) 50%, rgba(255,255,255,0.48) 100%)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          borderBottom: "1.5px solid rgba(255,255,255,0.65)",
          boxShadow: "0 8px 32px rgba(166,124,82,0.14), 0 2px 8px rgba(255,255,255,0.5) inset, 0 -1px 0 rgba(166,124,82,0.08) inset",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 15% 0%, rgba(255,255,255,0.6) 0%, transparent 55%), radial-gradient(ellipse at 85% 100%, rgba(166,124,82,0.12) 0%, transparent 55%)",
          }}
        />
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3.5 relative">
          <div className="flex items-center justify-between gap-6">
            {/* Title on Left */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer shrink-0"
              onClick={() => {
                const event = new CustomEvent('openAboutModal');
                window.dispatchEvent(event);
              }}
            >
              <h1
                className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#A67C52] via-[#D4A574] to-[#A67C52]"
                style={{
                  fontFamily: "'Playfair Display', 'Georgia', serif",
                  letterSpacing: "0.05em",
                  textShadow: "0 2px 15px rgba(166, 124, 82, 0.35)",
                }}
              >
                Shema Buds
              </h1>
            </motion.div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3 lg:gap-4">
              <button
                onClick={() => {
                  const event = new CustomEvent('openContactModal');
                  window.dispatchEvent(event);
                }}
                className="glass inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-secondary-foreground hover:text-primary shadow-luxury transition-all duration-200 hover:scale-105"
              >
                <Heart className="w-4 h-4 text-primary fill-primary/20" />
                Contact
              </button>
              {/* Settings Menu */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                  className="relative p-2 text-secondary-foreground hover:text-primary transition-colors duration-200"
                  aria-label="Settings"
                >
                  <Settings className="w-6 h-6" />
                </motion.button>
                
                {/* Settings Dropdown */}
                <AnimatePresence>
                  {showSettingsMenu && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40"
                        onClick={() => setShowSettingsMenu(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-56 glass-strong rounded-2xl shadow-luxury-lg border border-border overflow-hidden z-50"
                      >
                        <div className="p-2">
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
              </div>
              
              {/* User Menu Dropdown (when opened from Settings) */}
              <AnimatePresence>
                {showUserMenu && user && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-40"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
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
              
              {/* Cart Icon */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCartClick}
                className="relative p-2 text-secondary-foreground hover:text-primary transition-colors duration-200"
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
        </nav>
      </header>
      
      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}
