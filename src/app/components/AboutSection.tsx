import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heart, Star, Users } from "lucide-react";

export function AboutSection() {
  const stats = [
    { icon: Heart, label: "Happy Customers", value: "500+" },
    { icon: Star, label: "Years Experience", value: "5+" },
    { icon: Users, label: "Events Decorated", value: "200+" }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 text-foreground">
              About Shemabuds
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                At Shemabuds, we believe that every gift tells a story and every celebration 
                deserves to be extraordinary. Founded with a passion for creativity and 
                craftsmanship, we specialize in handmade gifts, stunning floral arrangements, 
                and elegant event decorations.
              </p>
              <p>
                Our journey began with a simple mission: to bring joy and beauty into people's 
                lives through thoughtfully crafted creations. Each bouquet, gift, and decoration 
                is made with love, attention to detail, and a commitment to quality that sets us apart.
              </p>
              <p>
                Whether you're celebrating a milestone, expressing love, or creating the perfect 
                ambiance for your special event, we're here to transform your vision into reality. 
                Let us help you create memories that last a lifetime.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-10">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl text-foreground mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 md:order-2"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl transform rotate-3" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1710587384835-0f3de33d8042?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJ0eSUyMGRlY29yYXRpb24lMjBmbG93ZXJzJTIwY2VudGVycGllY2V8ZW58MXx8fHwxNzgwMjI2MjAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Shemabuds event decoration"
                className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
