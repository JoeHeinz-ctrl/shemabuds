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
      <div className="relative overflow-hidden rounded-xl md:rounded-2xl p-4 md:p-6 glass shadow-luxury transition-all duration-300 group-hover:shadow-luxury-lg">
        
        {/* Icon Container */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl bg-primary/10 border border-primary/20 mb-3 md:mb-4"
        >
          <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
        </motion.div>

        {/* Content */}
        <h3 className="text-sm md:text-base lg:text-lg font-semibold text-foreground mb-1 md:mb-2">
          {title}
        </h3>
        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-light">
          {description}
        </p>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-1 bg-gradient-to-r from-primary to-transparent transition-all duration-300"></div>
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
    <section className="py-12 md:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Always 2-Column Layout: Left paragraph, Right cards */}
        <div className="grid grid-cols-2 gap-4 md:gap-8 lg:gap-12 items-start">
          
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
              className="mb-6 md:mb-8"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4 tracking-tight leading-tight">
                About Shema Buds
              </h2>
              <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
            </motion.div>

            {/* Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed mb-4 md:mb-6 font-light"
            >
              We create beautiful handmade bouquets and personalized gifts for special moments.
            </motion.p>

            {/* Story & Mission */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xs md:text-sm lg:text-base text-muted-foreground leading-relaxed mb-6 md:mb-8 font-light"
            >
              Every creation is crafted with love and attention to detail.
            </motion.p>

            {/* Years badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-3 md:gap-4"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-2xl glass border border-primary/20 flex items-center justify-center shadow-luxury">
                <span className="text-lg md:text-xl lg:text-2xl font-bold text-primary">5+</span>
              </div>
              <div>
                <p className="text-xs md:text-sm lg:text-base font-semibold text-foreground">Years of Excellence</p>
                <p className="text-[10px] md:text-xs lg:text-sm text-muted-foreground font-light">In handcrafted luxury</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Value Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 space-y-4 md:space-y-6"
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
