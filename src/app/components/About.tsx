import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heart, Sparkles, Users } from "lucide-react";
import { motion } from "motion/react";

export function About() {
  return (
    <section className="py-8 md:py-24 px-3 md:px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center">
          
          {/* Content Side - Shows First on Mobile */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-xl md:text-4xl sm:text-5xl mb-3 md:mb-6 text-[#2A1B14] font-semibold tracking-tight">About Shemabuds</h2>
            <p className="text-xs md:text-lg text-[#4A3A32] mb-3 md:mb-6 leading-relaxed font-light">
              At Shemabuds, we believe that the most meaningful gifts are those made by hand 
              and from the heart. Our journey began with a simple passion for creating beautiful, 
              personalized items that bring joy to special moments.
            </p>
            <p className="hidden md:block text-lg text-[#4A3A32] mb-8 leading-relaxed font-light">
              Every bouquet, gift, and decoration we create is infused with love, attention to detail, 
              and a commitment to quality craftsmanship. We work closely with our clients to bring 
              their visions to life, ensuring each creation is as unique as the story it tells.
            </p>

            <div className="space-y-2 md:space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-start gap-2 md:gap-4"
              >
                <div className="bg-[#D8B4A0] p-2 md:p-3 rounded-lg md:rounded-xl shadow-sm flex-shrink-0">
                  <Heart className="w-4 h-4 md:w-6 md:h-6 text-[#8B6B3E]" />
                </div>
                <div>
                  <h4 className="text-sm md:text-lg mb-0.5 md:mb-1 text-[#2A1B14] font-semibold">Made with Love</h4>
                  <p className="text-[10px] md:text-base text-[#6B5D52] font-light">Every piece is crafted with genuine care and attention</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-start gap-2 md:gap-4"
              >
                <div className="bg-[#E8C4B4] p-2 md:p-3 rounded-lg md:rounded-xl shadow-sm flex-shrink-0">
                  <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-[#8B6B3E]" />
                </div>
                <div>
                  <h4 className="text-sm md:text-lg mb-0.5 md:mb-1 text-[#2A1B14] font-semibold">Unique Designs</h4>
                  <p className="text-[10px] md:text-base text-[#6B5D52] font-light">No two creations are exactly alike</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-start gap-2 md:gap-4"
              >
                <div className="bg-[#A67C52]/20 p-2 md:p-3 rounded-lg md:rounded-xl shadow-sm flex-shrink-0">
                  <Users className="w-4 h-4 md:w-6 md:h-6 text-[#8B6B3E]" />
                </div>
                <div>
                  <h4 className="text-sm md:text-lg mb-0.5 md:mb-1 text-[#2A1B14] font-semibold">Customer First</h4>
                  <p className="text-[10px] md:text-base text-[#6B5D52] font-light">Your satisfaction is our highest priority</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Image Side - Shows Second on Mobile, Hidden on Small Screens */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hidden md:block relative order-2 lg:order-1"
          >
            <div className="hidden md:block absolute -top-6 -left-6 w-full h-full bg-[#E8C4B4]/25 rounded-3xl -z-10"></div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden rounded-2xl md:rounded-3xl shadow-[0_12px_40px_rgba(166,124,82,0.2)]"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1506806732259-39c2d0268443?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrc2hvcCUyMGNyYWZ0aW5nJTIwaGFuZG1hZGV8ZW58MXx8fHwxNzgwMjI2MjAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Shemabuds workshop"
                className="w-full object-cover aspect-[4/3]"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-3 -right-3 md:-bottom-6 md:-right-6 bg-[#A67C52] text-white p-3 md:p-6 rounded-xl md:rounded-2xl shadow-[0_8px_24px_rgba(166,124,82,0.35)]"
            >
              <p className="text-xl md:text-3xl mb-0.5 md:mb-1 font-bold">5+</p>
              <p className="text-[10px] md:text-sm font-medium">Years of Crafting</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
