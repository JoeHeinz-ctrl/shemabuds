import { Search, ShoppingCart, Palette, Package } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    number: "1",
    icon: Search,
    title: "Browse our creations",
    description: "Explore our gallery of handmade bouquets, gifts, and decorations to find inspiration for your perfect creation."
  },
  {
    number: "2",
    icon: ShoppingCart,
    title: "Add to cart & customize",
    description: "Select your favorite items, customize colors, styles, and details to match your vision perfectly."
  },
  {
    number: "3",
    icon: Palette,
    title: "Complete checkout",
    description: "Fill in your details, delivery preferences, and event date. We'll generate a personalized order for you."
  },
  {
    number: "4",
    icon: Package,
    title: "Receive your handmade creation",
    description: "We'll carefully craft your order and deliver it with care, ready to make your moment special."
  }
];

export function HowToOrder() {
  return (
    <section className="py-8 md:py-24 px-3 md:px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-16"
        >
          <h2 className="text-xl md:text-4xl sm:text-5xl mb-2 md:mb-4 text-[#2A1B14] font-semibold tracking-tight">How Ordering Works</h2>
          <p className="text-xs md:text-lg text-[#4A3A32] max-w-2xl mx-auto font-light">
            Getting your perfect handmade creation is simple and personalized
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -6 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-white to-[#FAF7F2] rounded-xl md:rounded-2xl p-3 md:p-8 shadow-[0_4px_16px_rgba(166,124,82,0.12)] hover:shadow-[0_12px_32px_rgba(166,124,82,0.2)] transition-all duration-300 border border-[#A67C52]/10 h-full">
                  {/* Step Number */}
                  <div className="absolute -top-2 -left-2 md:-top-4 md:-left-4 w-8 h-8 md:w-12 md:h-12 bg-[#A67C52] text-white rounded-full flex items-center justify-center text-sm md:text-xl font-bold shadow-[0_4px_12px_rgba(166,124,82,0.3)]">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="bg-[#D8B4A0] w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-xl flex items-center justify-center mb-2 md:mb-6 mt-2 md:mt-4 shadow-sm">
                    <Icon className="w-5 h-5 md:w-8 md:h-8 text-[#8B6B3E]" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xs md:text-xl font-semibold mb-1 md:mb-3 text-[#2A1B14] line-clamp-2">{step.title}</h3>
                  <p className="text-[10px] md:text-base text-[#6B5D52] leading-relaxed font-light line-clamp-3 md:line-clamp-none">
                    {step.description}
                  </p>
                </div>
                
                {/* Connector Line (except for last item) - Desktop only */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#A67C52] to-transparent"></div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
