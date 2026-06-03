import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { FeaturedGallery } from "./components/FeaturedGallery";
import { Services } from "./components/Services";
import { HowToOrder } from "./components/HowToOrder";
import { About } from "./components/About";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { OrderingProvider } from "./components/OrderingSystem";
import { ProductDetailsModal } from "./components/ProductDetailsModal";
import { CartModal } from "./components/CartModal";
import { CheckoutModal } from "./components/CheckoutModal";
import { MobileBottomNav } from "./components/mobile/MobileBottomNav";
import { MobileFloatingCart } from "./components/mobile/MobileFloatingCart";
import { MobileHomePage } from "./components/mobile/pages/MobileHomePage";
import { MobileCollectionsPage } from "./components/mobile/pages/MobileCollectionsPage";
import { MobileOrdersPage } from "./components/mobile/pages/MobileOrdersPage";
import { MobileSettingsPage } from "./components/mobile/pages/MobileSettingsPage";
import { ThemeProvider } from "../contexts/ThemeContext";
import { AuthProvider } from "../contexts/AuthContext";
import "./components/mobile/mobile-styles.css";

export default function App() {
  const [mobileActiveTab, setMobileActiveTab] = useState("home");

  // Listen for navigate to orders event
  useEffect(() => {
    const handleNavigateToOrders = () => {
      setMobileActiveTab("orders");
    };

    window.addEventListener('navigateToOrders', handleNavigateToOrders);
    return () => window.removeEventListener('navigateToOrders', handleNavigateToOrders);
  }, []);

  const renderMobileContent = () => {
    switch (mobileActiveTab) {
      case "home":
        return <MobileHomePage />;
      case "collections":
        return <MobileCollectionsPage />;
      case "orders":
        return <MobileOrdersPage />;
      case "settings":
        return <MobileSettingsPage />;
      case "cart":
        return <MobileHomePage />; // Cart is handled by modal
      default:
        return <MobileHomePage />;
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <OrderingProvider>
        <div className="min-h-screen">
          <Header />
          
          {/* Desktop View - Unchanged */}
          <main className="hidden md:block pt-[72px]">
            <div id="home">
              <Hero />
            </div>
            
            <div id="gallery">
              <FeaturedGallery />
            </div>
            
            <div id="services">
              <Services />
            </div>
            
            <HowToOrder />
            
            <div id="about">
              <About />
            </div>
            
            <div id="testimonials">
              <Testimonials />
            </div>
            
            <div id="contact">
              <Contact />
            </div>
          </main>

          {/* Mobile View - Tab-based Navigation */}
          <main className="md:hidden pt-[60px] pb-[80px]">
            {renderMobileContent()}
          </main>

          {/* Desktop Footer */}
          <div className="hidden md:block">
            <Footer />
          </div>

          <ScrollToTop />

          {/* Ordering Modals */}
          <ProductDetailsModal />
          <CartModal />
          <CheckoutModal />

          {/* Mobile-only components */}
          <MobileFloatingCart />
          <MobileBottomNav 
            activeTab={mobileActiveTab}
            onTabChange={setMobileActiveTab}
          />
        </div>
      </OrderingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
