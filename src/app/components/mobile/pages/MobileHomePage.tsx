import { Hero } from "../../Hero";
import { FeaturedGallery } from "../../FeaturedGallery";
import { HowToOrder } from "../../HowToOrder";
import { About } from "../../About";
import { Testimonials } from "../../Testimonials";
import { Footer } from "../../Footer";

export function MobileHomePage() {
  return (
    <div className="md:hidden">
      {/* Hero Section */}
      <div id="home">
        <Hero />
      </div>
      
      {/* Featured Collection - Featured Section */}
      <div id="featured">
        <FeaturedGallery />
      </div>
      
      {/* How to Order Section */}
      <div id="how-to-order">
        <HowToOrder />
      </div>
      
      {/* About Section */}
      <div id="about">
        <About />
      </div>
      
      {/* Customer Reviews */}
      <div id="testimonials">
        <Testimonials />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
