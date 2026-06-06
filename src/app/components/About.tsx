import { Heart, Sparkles, Users } from "lucide-react";
import { motion } from "motion/react";

interface ValueCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  delay: number;
}

function ValueCard({ icon: Icon, title, description, delay }: ValueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="group relative"
    >
      {/* Glassmorphism Card */}
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl p-6 md:p-8 backdrop-blur-md bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(166,124,82,0.12)] transition-all duration-300 group-hover:shadow-[0_12px_48px_rgba(166,124,82,0.2)] group-hover:border-white/30">
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#A67C52]/10 rounded-full blur-3xl -z-10"></div>
        </div>

        {/* Icon Container */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center justify-center w-16 md:w-20 h-16 md:h-20 rounded-full bg-gradient-to-br from-[#A67C52]/30 to-[#A67C52]/10 border border-[#A67C52]/20 mb-5 md:mb-6"
        >
          <Icon className="w-8 md:w-10 h-8 md:h-10 text-primary" />
        </motion.div>

        {/* Content */}
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 md:mb-3">
          {title}
        </h3>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-light">
          {description}
        </p>

        {/* Subtle bottom accent */}
        <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-1 bg-gradient-to-r from-[#A67C52] to-transparent transition-all duration-300"></div>
      </div>
    </motion.div>
  );
}

export function About() {
  const valueCards = [
    {
      icon: Heart,
      title: "Made with Love",
      description: "Every piece is crafted with genuine care and attention to detail.",
    },
    {
      icon: Sparkles,
      title: "Unique Designs",
      description: "No two creations are exactly alike. Each one tells its own story.",
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Your satisfaction is our highest priority and our greatest reward.",
    },
  ];

  return (
    <section className="py-12 md:py-32 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Desktop & Tablet: 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-12 lg:gap-16 xl:gap-20 items-center">
          
          {/* Left Column - Story & Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1"
          >
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8 md:mb-12"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 tracking-tight leading-tight">
                About Shema Buds
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#A67C52] to-transparent rounded-full"></div>
            </motion.div>

            {/* Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 md:mb-8 font-light max-w-xl"
            >
              At Shema Buds, we believe that the most meaningful gifts are those made by hand 
              and from the heart. Our journey began with a simple passion for creating beautiful, 
              personalized items that bring joy to special moments.
            </motion.p>

            {/* Story & Mission */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 md:mb-10 font-light max-w-xl"
            >
              Every bouquet, gift, and decoration we create is infused with love, attention to detail, 
              and a commitment to quality craftsmanship. We work closely with our clients to bring 
              their visions to life, ensuring each creation is as unique as the story it tells.
            </motion.p>

            {/* Additional context */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-3 md:gap-4"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#A67C52]/30 to-[#A67C52]/10 border border-[#A67C52]/20 flex items-center justify-center">
                <span className="text-2xl md:text-3xl font-bold text-primary">5+</span>
              </div>
              <div>
                <p className="text-sm md:text-base font-semibold text-foreground">Years of Excellence</p>
                <p className="text-xs md:text-sm text-muted-foreground font-light">In handcrafted luxury</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Value Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 space-y-6 md:space-y-8"
          >
            {valueCards.map((card, index) => (
              <ValueCard
                key={index}
                icon={card.icon}
                title={card.title}
                description={card.description}
                delay={0.2 + index * 0.1}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
