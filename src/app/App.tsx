import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { FeaturedGallery } from "./components/FeaturedGallery";
import { Services } from "./components/Services";
import { HowToOrder } from "./components/HowToOrder";
import { Testimonials } from "./components/Testimonials";
import { MyOrders } from "./components/MyOrders";
import { ScrollToTop } from "./components/ScrollToTop";
import { AboutModal } from "./components/AboutModal";
import { ContactModal } from "./components/ContactModal";
import { OrderingProvider, useOrdering } from "./components/OrderingSystem";
import { ProductDetailsModal } from "./components/ProductDetailsModal";
import { CartModal } from "./components/CartModal";
import { CheckoutModal } from "./components/CheckoutModal";
import { OrderSuccessCelebration } from "./components/OrderSuccessCelebration";
import { MobileBottomNav } from "./components/mobile/MobileBottomNav";
import { MobileFloatingCart } from "./components/mobile/MobileFloatingCart";
import { MobileHomePage } from "./components/mobile/pages/MobileHomePage";
import { MobileCollectionsPage } from "./components/mobile/pages/MobileCollectionsPage";
import { MobileOrdersPage } from "./components/mobile/pages/MobileOrdersPage";
import { MobileSettingsPage } from "./components/mobile/pages/MobileSettingsPage";
import { ThemeProvider } from "../contexts/ThemeContext";
import { AuthProvider } from "../contexts/AuthContext";
import "./components/mobile/mobile-styles.css";

function AppContent() {
  const [mobileActiveTab, setMobileActiveTab] = useState("home");
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const { showOrderSuccess, setShowOrderSuccess } = useOrdering();

  // Listen for modal events from Header
  useEffect(() => {
    const handleOpenAbout = () => setShowAboutModal(true);
    const handleOpenContact = () => setShowContactModal(true);

    window.addEventListener('openAboutModal', handleOpenAbout);
    window.addEventListener('openContactModal', handleOpenContact);

    return () => {
      window.removeEventListener('openAboutModal', handleOpenAbout);
      window.removeEventListener('openContactModal', handleOpenContact);
    };
  }, []);

  const handleOrderSuccessClose = () => {
    setShowOrderSuccess(false);
    
    // Detect if mobile or desktop
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // Mobile: Switch to orders tab
      setMobileActiveTab("orders");
    } else {
      // Desktop: Scroll to orders section
      const ordersSection = document.getElementById("orders");
      if (ordersSection) {
        ordersSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

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
    <div className="min-h-screen">
      <Header />
      
      {/* Desktop View - Reorganized */}
      <main className="hidden md:block">
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
        
        <MyOrders />
        
        <div id="testimonials">
          <Testimonials />
        </div>
      </main>

      {/* Mobile View - Tab-based Navigation - Unchanged */}
      <main className="md:hidden pb-[80px]">
        {renderMobileContent()}
      </main>

      <ScrollToTop />

      {/* Modals */}
      <ProductDetailsModal />
      <CartModal />
      <CheckoutModal />
      <AboutModal isOpen={showAboutModal} onClose={() => setShowAboutModal(false)} />
      <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} />

      {/* Global Order Success Celebration */}
      <OrderSuccessCelebration
        isOpen={showOrderSuccess}
        onClose={handleOrderSuccessClose}
      />

      {/* Mobile-only components */}
      <MobileFloatingCart />
      <MobileBottomNav 
        activeTab={mobileActiveTab}
        onTabChange={setMobileActiveTab}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <OrderingProvider>
          <AppContent />
        </OrderingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
