import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah Mitchell",
    rating: 5,
    comment: "Absolutely stunning! The bouquet for my wedding was beyond my expectations. Every detail was perfect, and the flowers stayed fresh for days. Highly recommend!",
    event: "Wedding"
  },
  {
    name: "James Parker",
    rating: 5,
    comment: "Ordered a custom gift basket for my mom's birthday. The presentation was beautiful and she loved every item. The personal touch made it extra special.",
    event: "Birthday Gift"
  },
  {
    name: "Emily Chen",
    rating: 5,
    comment: "The event decorations transformed our venue into a magical space. Professional, creative, and absolutely beautiful work. Will definitely use again!",
    event: "Corporate Event"
  },
  {
    name: "Michael Brown",
    rating: 5,
    comment: "Amazing quality and attention to detail. The handmade gift was unique and thoughtful. Great communication throughout the process too!",
    event: "Anniversary Gift"
  }
];

export function ReviewsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 text-foreground">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't just take our word for it - hear from our happy customers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-border/50 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed italic">
                    "{review.comment}"
                  </p>
                  <div className="border-t border-border pt-4">
                    <p className="text-foreground">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.event}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
