import { Button } from "./ui/button";
import { Heart, ShoppingBag, Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useOrdering } from "./OrderingSystem";
import { MobileHeader } from "./mobile/MobileHeader";
import { useTheme } from "../../contexts/ThemeContext";

export function Header() {
  const { cart, setIsCartOpen } = useOrdering();
  const { theme, toggleTheme } = useTheme();

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
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => scrollToSection('home')}
            >
              <motion.div 
                className="bg-primary p-2 rounded-xl shadow-luxury"
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Heart className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
              </motion.div>
              <span className="text-xl text-foreground font-semibold tracking-tight">Shemabuds</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="flex items-center gap-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-secondary-foreground hover:text-primary transition-all duration-200 font-medium hover:scale-105"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-secondary-foreground hover:text-primary transition-all duration-200 font-medium hover:scale-105"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('gallery')}
                className="text-secondary-foreground hover:text-primary transition-all duration-200 font-medium hover:scale-105"
              >
                Gallery
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-secondary-foreground hover:text-primary transition-all duration-200 font-medium hover:scale-105"
              >
                About
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

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="font-medium"
                >
                  Contact Us
                </Button>
              </motion.div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
