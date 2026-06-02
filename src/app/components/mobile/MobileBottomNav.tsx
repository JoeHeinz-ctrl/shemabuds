import { Home, Grid3x3, ShoppingBag, Gift, Settings } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useOrdering } from "../OrderingSystem";

interface MobileBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function MobileBottomNav({ activeTab, onTabChange }: MobileBottomNavProps) {
  const { cart, setIsCartOpen } = useOrdering();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCartClick = () => {
    onTabChange("cart");
    setIsCartOpen(true);
  };

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "collections", label: "Collections", icon: Grid3x3 },
    { id: "cart", label: "Cart", icon: ShoppingBag, badge: totalItems },
    { id: "offers", label: "Offers", icon: Gift },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#A67C52]/15 shadow-[0_-2px_12px_rgba(166,124,82,0.08)]">
      <div className="grid grid-cols-5 gap-1 px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => item.id === "cart" ? handleCartClick() : onTabChange(item.id)}
              className="relative flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors"
            >
              <div className="relative">
                <Icon 
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-[#A67C52]' : 'text-[#6B5D52]'
                  }`}
                />
                {item.badge && item.badge > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-[#A67C52] text-white text-[10px] rounded-full flex items-center justify-center font-semibold"
                  >
                    {item.badge}
                  </motion.span>
                )}
              </div>
              <span 
                className={`text-[10px] mt-1 font-medium transition-colors ${
                  isActive ? 'text-[#A67C52]' : 'text-[#6B5D52]'
                }`}
              >
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
