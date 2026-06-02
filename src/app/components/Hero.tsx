import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Sparkles, Package, Instagram, Award } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  {
    icon: Package,
    value: "150+",
    label: "Creations",
  },
  {
    icon: Instagram,
    value: "300+",
    label: "Followers",
  },
  {
    icon: Award,
    value: "100%",
    label: "Custom",
  }
];

export function Hero() {
  return (
    <section className="relative min-h-[70vh] md:min-h-[90vh] flex items-center overflow-hidden bg-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1584461730592-5bfab6460bae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGZsb3dlciUyMGJvdXF1ZXQlMjBhcnJhbmdlbWVudHxlbnwxfHx8fDE3ODAyMjYxOTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Beautiful handmade flower bouquet"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2]/85 via-[#FAF7F2]/70 to-transparent md:from-[#FAF7F2]/70 md:via-[#FAF7F2]/50"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
          {/* Left Side: Text Content */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 md:px-5 md:py-2.5 rounded-full mb-3 md:mb-6 border border-[#A67C52]/30 shadow-[0_2px_8px_rgba(166,124,82,0.12)]"
            >
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-[#A67C52]" />
              <span className="text-xs md:text-sm text-[#4A3A32] font-medium tracking-wide">Crafted with Love & Care</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl mb-3 md:mb-6 text-[#2A1B14] leading-[1.1] font-bold tracking-tight"
            >
              Handmade Meets{" "}
              <span className="text-[#A67C52] italic font-serif">Heartmade</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-[#4A3A32] mb-4 md:mb-8 leading-relaxed font-light"
            >
              Discover the art of personalized gifting with our exquisite handmade bouquets, 
              custom gifts, and elegant event decorations.
            </motion.p>
            
            {/* Mobile: Horizontal Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="md:hidden grid grid-cols-3 gap-2 max-w-md"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-[0_2px_12px_rgba(166,124,82,0.12)] border border-[#A67C52]/10"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-[#D8B4A0] w-8 h-8 rounded-lg flex items-center justify-center mb-2">
                        <Icon className="w-4 h-4 text-[#8B6B3E]" />
                      </div>
                      <p className="text-lg font-bold text-[#2A1B14]">{stat.value}</p>
                      <p className="text-[10px] text-[#6B5D52] font-medium">{stat.label}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Desktop: Vertical Stats Cards on Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden md:flex flex-col gap-4 items-end"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-[0_2px_12px_rgba(166,124,82,0.12)] border border-[#A67C52]/10 min-w-[180px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-[#D8B4A0] w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-[#8B6B3E]" />
                    </div>
                    <div className="text-left">
                      <p className="text-2xl font-bold text-[#2A1B14]">{stat.value}</p>
                      <p className="text-sm text-[#6B5D52] font-medium">{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D8B4A0]/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#E8C4B4]/15 rounded-full blur-3xl -z-10"></div>
    </section>
  );
}
