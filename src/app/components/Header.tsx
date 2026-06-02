import { Button } from "./ui/button";
import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useOrdering } from "./OrderingSystem";
import { MobileHeader } from "./mobile/MobileHeader";

export function Header() {
  const { cart, setIsCartOpen } = useOrdering();

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
      <header className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md border-b border-[#A67C52]/15 shadow-[0_2px_12px_rgba(166,124,82,0.08)]">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => scrollToSection('home')}
            >
              <div className="bg-[#A67C52] p-2 rounded-xl shadow-sm">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl text-[#2A1B14] font-semibold tracking-tight">Shemabuds</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="flex items-center gap-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-[#4A3A32] hover:text-[#A67C52] transition-colors duration-200 font-medium"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-[#4A3A32] hover:text-[#A67C52] transition-colors duration-200 font-medium"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('gallery')}
                className="text-[#4A3A32] hover:text-[#A67C52] transition-colors duration-200 font-medium"
              >
                Gallery
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-[#4A3A32] hover:text-[#A67C52] transition-colors duration-200 font-medium"
              >
                About
              </button>
              
              {/* Cart Icon */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCartClick}
                className="relative p-2 text-[#4A3A32] hover:text-[#A67C52] transition-colors duration-200"
              >
                <ShoppingBag className="w-6 h-6" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-[#A67C52] text-white text-xs rounded-full flex items-center justify-center font-semibold shadow-md"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.button>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-[#A67C52] hover:bg-[#8B6B3E] text-white shadow-[0_2px_8px_rgba(166,124,82,0.25)] hover:shadow-[0_4px_12px_rgba(166,124,82,0.35)] transition-all duration-300 font-medium"
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
