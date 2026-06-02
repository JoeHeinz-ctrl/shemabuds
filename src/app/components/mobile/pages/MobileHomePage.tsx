import { Hero } from "../../Hero";
import { FeaturedGallery } from "../../FeaturedGallery";
import { HowToOrder } from "../../HowToOrder";
import { About } from "../../About";
import { Testimonials } from "../../Testimonials";
import { Contact } from "../../Contact";
import { Footer } from "../../Footer";

export function MobileHomePage() {
  return (
    <div className="md:hidden">
      {/* Hero Section */}
      <div id="home">
        <Hero />
      </div>
      
      {/* Featured Collection */}
      <div id="gallery">
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
      
      {/* Contact Information */}
      <div id="contact">
        <Contact />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
