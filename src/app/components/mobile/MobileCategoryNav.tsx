import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

interface Category {
  id: string;
  label: string;
  emoji: string;
}

const categories: Category[] = [
  { id: "all", label: "All", emoji: "✨" },
  { id: "bouquets", label: "Bouquets", emoji: "🌹" },
  { id: "gifts", label: "Gifts", emoji: "🎁" },
  { id: "wedding", label: "Wedding", emoji: "💍" },
  { id: "events", label: "Decorations", emoji: "🎉" },
  { id: "offers", label: "Offers", emoji: "⭐" },
];

interface MobileCategoryNavProps {
  onCategoryChange?: (categoryId: string) => void;
}

export function MobileCategoryNav({ onCategoryChange }: MobileCategoryNavProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 120); // Sticky after header
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
    
    // Scroll to services section
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      const offset = 180; // Account for sticky headers
      const elementPosition = servicesSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      ref={navRef}
      className={`md:hidden bg-background border-b border-border transition-all duration-300 ${
        isSticky ? 'fixed top-[120px] left-0 right-0 z-40 shadow-md' : ''
      }`}
    >
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 px-4 py-3 min-w-max">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryClick(category.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-muted text-muted-foreground active:bg-accent'
              }`}
            >
              <span>{category.emoji}</span>
              <span>{category.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
