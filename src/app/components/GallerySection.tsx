import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";

const categoryLabels: Record<string, string> = {
  bouquets: "Bouquets",
  gifts: "Handmade Gifts",
  events: "Event Decorations",
  wedding: "Wedding Accessories",
  custom: "Custom Orders",
  boutique: "Boutique Collection",
  "ring-plater": "Ring Plater",
  "gift-hampers": "Gift Hampers",
};

const creations = [
  {
    image: "https://images.unsplash.com/photo-1523693916903-027d144a2b7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcGluayUyMHJvc2UlMjBib3VxdWV0fGVufDF8fHx8MTc4MDIyNjIwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Elegant Rose Bouquet",
    category: "bouquets"
  },
  {
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGdpZnQlMjB3cmFwcGVkJTIwcHJlc2VudHxlbnwxfHx8fDE3ODAyMjYyMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Wrapped Gift Box",
    category: "gifts"
  },
  {
    image: "https://images.unsplash.com/photo-1529636798458-92182e662485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZXZlbnQlMjBkZWNvcmF0aW9uJTIwZmxvd2Vyc3xlbnwxfHx8fDE3ODAyMjYyMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Wedding Decoration",
    category: "events"
  },
  {
    image: "https://images.unsplash.com/photo-1622153060419-468f83a0f8f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kY3JhZnRlZCUyMGdpZnQlMjBiYXNrZXR8ZW58MXx8fHwxNzgwMjI2MjAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Gift Basket",
    category: "custom"
  },
  {
    image: "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjBmbG93ZXIlMjBhcnJhbmdlbWVudHxlbnwxfHx8fDE3ODAyMjYyMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Custom Arrangement",
    category: "bouquets"
  },
  {
    image: "https://images.unsplash.com/photo-1608755727748-dfa2e44f255b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwY3JhZnRlZCUyMGdpZnRzfGVufDF8fHx8MTc4MDIyNjIwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Artisan Crafted",
    category: "gifts"
  }
];

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>("all");

  // Get unique categories and organize
  const categories = Array.from(new Set(creations.map(c => c.category)))
    .sort((a, b) => {
      if (a === "ring-plater") return -1;
      if (b === "ring-plater") return 1;
      return a.localeCompare(b);
    });

  // Filter creations based on selected category
  const filteredCreations = selectedCategory === "all" 
    ? creations 
    : creations.filter(c => c.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 text-foreground">
            Our Creations
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our handpicked collection of beautiful creations made with love
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12"
        >
          {/* ALL Products Chip */}
          <motion.button
            onClick={() => setSelectedCategory("all")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 whitespace-nowrap"
            style={{
              background: selectedCategory === "all" 
                ? "linear-gradient(135deg, #D4744A 0%, #EFBF43 100%)"
                : "rgba(255, 255, 255, 0.45)",
              border: selectedCategory === "all"
                ? "none"
                : "1px solid rgba(212, 116, 74, 0.15)",
              color: selectedCategory === "all" ? "#ffffff" : "#5A4638",
              boxShadow: selectedCategory === "all"
                ? "0 4px 12px rgba(212, 116, 74, 0.25)"
                : "none",
              backdropFilter: "blur(4px)",
            }}
          >
            All
          </motion.button>

          {/* Category Chips */}
          {categories.map((categoryKey, index) => (
            <motion.button
              key={categoryKey}
              onClick={() => setSelectedCategory(categoryKey)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.05 + (index + 1) * 0.02 }}
              className="px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 whitespace-nowrap"
              style={{
                background: selectedCategory === categoryKey 
                  ? "linear-gradient(135deg, #D4744A 0%, #EFBF43 100%)"
                  : "rgba(255, 255, 255, 0.45)",
                border: selectedCategory === categoryKey
                  ? "none"
                  : "1px solid rgba(212, 116, 74, 0.15)",
                color: selectedCategory === categoryKey ? "#ffffff" : "#5A4638",
                boxShadow: selectedCategory === categoryKey
                  ? "0 4px 12px rgba(212, 116, 74, 0.25)"
                  : "none",
                backdropFilter: "blur(4px)",
              }}
            >
              {categoryLabels[categoryKey] || categoryKey}
            </motion.button>
          ))}
        </motion.div>

        {/* Product Grid */}
        {filteredCreations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCreations.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300 border-border/50">
                  <div className="relative overflow-hidden aspect-square">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-sm opacity-90">{categoryLabels[item.category] || item.category}</p>
                      <h3 className="text-lg">{item.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-4 bg-card">
                    <p className="text-sm text-muted-foreground">{categoryLabels[item.category] || item.category}</p>
                    <h3 className="text-lg text-foreground">{item.title}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
