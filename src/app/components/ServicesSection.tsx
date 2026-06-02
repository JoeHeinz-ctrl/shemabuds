import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Flower2, Gift, Sparkles, PenTool } from "lucide-react";

const services = [
  {
    icon: Flower2,
    title: "Bouquets",
    description: "Fresh, hand-arranged bouquets for every occasion, crafted with love and premium blooms",
    color: "#f4b8c4"
  },
  {
    icon: Gift,
    title: "Handmade Gifts",
    description: "Unique, personalized gifts made by hand to show your loved ones how much you care",
    color: "#c89b7b"
  },
  {
    icon: Sparkles,
    title: "Event Decorations",
    description: "Elegant decorations for weddings, parties, and special events that create lasting memories",
    color: "#e7c4b8"
  },
  {
    icon: PenTool,
    title: "Custom Orders",
    description: "Bring your vision to life with bespoke creations tailored to your specific needs",
    color: "#d4a5a5"
  }
];

export function ServicesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 text-foreground">
            Our Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every creation is crafted with passion, precision, and a personal touch
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-border/50 bg-card group cursor-pointer">
                  <CardContent className="p-6 text-center flex flex-col items-center">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: service.color + '30' }}
                    >
                      <Icon className="w-8 h-8" style={{ color: service.color }} />
                    </div>
                    <h3 className="text-xl mb-3 text-foreground">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
