import { Search, ShoppingCart, Palette, Package } from "lucide-react";
import { motion } from "motion/react";
import { FloatingLeaf, LogomarkWatermark } from "./BrandDecoration";

const steps = [
  {
    number: "1",
    icon: Search,
    title: "Browse our creations",
    description: "Explore our gallery of handmade bouquets, gifts, and decorations to find inspiration for your perfect creation.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    number: "2",
    icon: ShoppingCart,
    title: "Add to cart & customize",
    description: "Select your favorite items, customize colors, styles, and details to match your vision perfectly.",
    color: "text-sage",
    bg: "bg-sage/20",
  },
  {
    number: "3",
    icon: Palette,
    title: "Complete checkout",
    description: "Fill in your details, delivery preferences, and event date. We'll generate a personalized order for you.",
    color: "text-[#2A1B14]",
    bg: "bg-accent/40",
  },
  {
    number: "4",
    icon: Package,
    title: "Receive your handmade creation",
    description: "We'll carefully craft your order and deliver it with care, ready to make your moment special.",
    color: "text-[#2A1B14]",
    bg: "bg-olive/50",
  }
];

export function HowToOrder() {
  return (
    <section className="relative py-8 md:py-24 px-3 md:px-4 sm:px-6 lg:px-8 bg-background overflow-hidden z-10">
      <FloatingLeaf size={60} opacity={0.12} className="absolute left-[6%] top-[15%] pointer-events-none hidden lg:block text-olive" delay={0} duration={7} />
      <FloatingLeaf size={60} opacity={0.12} className="absolute right-[6%] bottom-[15%] pointer-events-none hidden lg:block text-sage" delay={2} duration={9} />
      <FloatingLeaf size={45} opacity={0.08} className="absolute left-[12%] bottom-[20%] pointer-events-none hidden lg:block text-secondary" delay={1.5} duration={8} />
      <FloatingLeaf size={50} opacity={0.10} className="absolute right-[15%] top-[55%] pointer-events-none hidden lg:block text-primary" delay={3} duration={6} />
      <LogomarkWatermark size={280} opacity={0.06} className="absolute top-[10%] right-[5%] pointer-events-none hidden md:block" />
      <div className="container mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-16"
        >
          <h2 className="section-title text-xl md:text-4xl sm:text-5xl mb-2 md:mb-4 text-foreground tracking-tight">How Ordering Works</h2>
          <p className="text-xs md:text-lg text-muted-foreground max-w-2xl mx-auto font-light">
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
                <div className="glass rounded-xl md:rounded-2xl p-3 md:p-8 shadow-luxury hover:shadow-luxury-lg transition-all duration-300 border border-border h-full">
                  {/* Step Number */}
                  <div className="absolute -top-2 -left-2 md:-top-4 md:-left-4 w-8 h-8 md:w-12 md:h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm md:text-xl font-bold shadow-luxury">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className={`${step.bg} w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-xl flex items-center justify-center mb-2 md:mb-6 mt-2 md:mt-4 shadow-sm`}>
                    <Icon className={`w-5 h-5 md:w-8 md:h-8 ${step.color}`} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xs md:text-xl font-semibold mb-1 md:mb-3 text-foreground line-clamp-2">{step.title}</h3>
                  <p className="text-[10px] md:text-base text-muted-foreground leading-relaxed font-light line-clamp-3 md:line-clamp-none">
                    {step.description}
                  </p>
                </div>
                
                {/* Connector Line (except for last item) - Desktop only */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
