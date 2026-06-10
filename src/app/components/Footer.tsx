import { Heart, Instagram, MessageCircle, Mail } from "lucide-react";
import { motion } from "motion/react";

export function Footer() {
  return (
    <footer className="hidden md:block bg-gradient-to-br from-[#2A1B14] to-[#4A3A32] text-white py-6 md:py-12 px-3 md:px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-4 md:mb-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img 
                src="/Brand/logo.svg" 
                alt="Shema Buds" 
                className="h-10 md:h-12 w-auto brightness-0 invert opacity-90" 
                style={{
                  filter: "brightness(0) invert(1) drop-shadow(0 0 6px rgba(34, 197, 94, 0.3)) drop-shadow(0 0 0 2px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 0 4px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 0 6px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 0 8px rgba(0, 0, 0, 0.25))"
                }}
              />
            </div>
            <p className="text-white/80 leading-relaxed mb-2 md:mb-4 font-light text-xs md:text-base">
              Creating beautiful, heartfelt gifts and decorations that make every moment special.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm md:text-lg mb-2 md:mb-4 font-semibold font-serif">Quick Links</h4>
            <ul className="space-y-1 md:space-y-2 text-white/80 font-light text-xs md:text-base">
              <li><a href="#services" className="hover:text-sage transition-colors duration-200">Our Services</a></li>
              <li><a href="#gallery" className="hover:text-olive transition-colors duration-200">Gallery</a></li>
              <li><a href="#about" className="hover:text-accent transition-colors duration-200">About Us</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors duration-200">Contact</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm md:text-lg mb-2 md:mb-4 font-semibold font-serif">Connect With Us</h4>
            <div className="flex gap-2 md:gap-4 mb-2 md:mb-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://instagram.com/shemabuds"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-primary transition-colors duration-200 p-2 md:p-3 rounded-lg md:rounded-xl"
              >
                <Instagram className="w-4 h-4 md:w-5 md:h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/919363962399"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-sage transition-colors duration-200 p-2 md:p-3 rounded-lg md:rounded-xl"
              >
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:hello@shemabuds.com"
                className="bg-white/10 hover:bg-accent transition-colors duration-200 p-2 md:p-3 rounded-lg md:rounded-xl"
              >
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
              </motion.a>
            </div>
            <p className="text-white/80 text-[10px] md:text-sm font-light">
              Follow us for inspiration and updates on our latest creations!
            </p>
          </div>
        </div>

        <div className="border-t border-white/20 pt-4 md:pt-8 text-center text-white/60 text-[10px] md:text-sm font-light">
          <p>© {new Date().getFullYear()} Shema Buds. Handmade with love and care.</p>
          {/* Hidden admin link - only visible to those who know */}
          <a 
            href="/admin" 
            className="opacity-10 hover:opacity-100 transition-opacity duration-500 text-xs ml-4"
            title="Admin Dashboard"
          >
            •
          </a>
        </div>
      </div>
    </footer>
  );
}
