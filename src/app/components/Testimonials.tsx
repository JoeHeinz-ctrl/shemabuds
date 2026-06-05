import { Card } from "./ui/card";
import { Star, Quote, User } from "lucide-react";
import { motion } from "motion/react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Wedding Client",
    content: "Shema Buds transformed our wedding venue into a fairytale. The floral decorations were beyond our wildest dreams. Every detail was perfect!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Gift Recipient",
    content: "The personalized gift box I ordered for my mother's birthday was absolutely stunning. The craftsmanship and thoughtfulness were evident in every detail.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Corporate Client",
    content: "We've used Shema Buds for multiple corporate events. Their custom bouquets and decorations always impress our guests. Highly professional and creative!",
    rating: 5,
  }
];

export function Testimonials() {
  return (
    <section className="py-8 md:py-24 px-3 md:px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-16"
        >
          <h2 className="text-xl md:text-4xl sm:text-5xl mb-2 md:mb-4 text-foreground font-semibold tracking-tight">What Our Clients Say</h2>
          <p className="text-xs md:text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Don't just take our word for it - hear from our happy customers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <Card className="p-4 md:p-8 hover:shadow-luxury-lg transition-all duration-300 border border-border relative glass h-full">
                <Quote className="absolute top-3 right-3 md:top-6 md:right-6 w-8 h-8 md:w-12 md:h-12 text-primary/20" />
                
                <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-6">
                  {/* Placeholder Avatar */}
                  <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary/30 shadow-sm flex-shrink-0">
                    <User className="w-5 h-5 md:w-8 md:h-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base text-foreground font-semibold">{testimonial.name}</h4>
                    <p className="text-[10px] md:text-sm text-muted-foreground font-light">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex gap-0.5 md:gap-1 mb-2 md:mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-primary text-primary" />
                  ))}
                </div>

                <p className="text-[10px] md:text-base text-muted-foreground leading-relaxed relative z-10 font-light line-clamp-4 md:line-clamp-none">
                  "{testimonial.content}"
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
