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
      <header className="hidden md:block fixed top-0 left-0 right-0 z-50 glass-strong shadow-luxury">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo on Left */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer"
              onClick={() => {
                const event = new CustomEvent('openAboutModal');
                window.dispatchEvent(event);
              }}
            >
              <motion.div 
                className="bg-primary p-2 rounded-xl shadow-luxury"
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Heart className="w-6 h-6 text-primary-foreground fill-primary-foreground" />
              </motion.div>
            </motion.div>

            {/* Centered Title - Elegant & Eye-catching */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="absolute left-1/2 -translate-x-1/2 cursor-pointer"
              onClick={() => {
                const event = new CustomEvent('openAboutModal');
                window.dispatchEvent(event);
              }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="w-1 h-8 bg-primary rounded-full"
                />
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#A67C52] via-[#D4A574] to-[#A67C52]" 
                    style={{ 
                      fontFamily: "'Playfair Display', 'Georgia', serif",
                      letterSpacing: '0.05em',
                      textShadow: '0 2px 15px rgba(166, 124, 82, 0.4)'
                    }}>
                  Shema Buds
                </h1>
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1
                  }}
                  className="w-1 h-8 bg-primary rounded-full"
                />
              </div>
            </motion.div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
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
                        className="absolute right-0 top-full mt-2 w-48 glass-strong rounded-2xl shadow-luxury-lg border border-border overflow-hidden z-50"
                      >
                        <div className="p-2">
                          <button
                            onClick={() => {
                              setShowSettingsMenu(false);
                              scrollToSection('home');
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors text-left"
                          >
                            <span className="font-medium text-foreground">Home</span>
                          </button>
                          <button
                            onClick={() => {
                              setShowSettingsMenu(false);
                              scrollToSection('services');
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors text-left"
                          >
                            <span className="font-medium text-foreground">Services</span>
                          </button>
                          <button
                            onClick={() => {
                              setShowSettingsMenu(false);
                              scrollToSection('gallery');
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors text-left"
                          >
                            <span className="font-medium text-foreground">Gallery</span>
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <button 
                onClick={() => {
                  const event = new CustomEvent('openContactModal');
                  window.dispatchEvent(event);
                }}
                className="text-secondary-foreground hover:text-primary transition-all duration-200 font-medium hover:scale-105"
              >
                Contact
              </button>
              
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="relative p-2 text-secondary-foreground hover:text-primary transition-colors duration-200"
                aria-label="Toggle theme"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: theme === "dark" ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </motion.div>
              </motion.button>
              
              {/* User Menu */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => user ? setShowUserMenu(!showUserMenu) : setShowAuthModal(true)}
                  className="relative p-2 text-secondary-foreground hover:text-primary transition-colors duration-200"
                >
                  <User className="w-6 h-6" />
                  {user && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></span>
                  )}
                </motion.button>
                
                {/* User Dropdown */}
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
                        className="absolute right-0 top-full mt-2 w-64 glass-strong rounded-2xl shadow-luxury-lg border border-border overflow-hidden z-50"
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
              </div>
              
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
