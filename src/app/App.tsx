import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
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
import { MobileCartPage } from "./components/mobile/pages/MobileCartPage";
import { MobileOrdersPage } from "./components/mobile/pages/MobileOrdersPage";
import { MobileSettingsPage } from "./components/mobile/pages/MobileSettingsPage";
import { ThemeProvider } from "../contexts/ThemeContext";
import { AuthProvider } from "../contexts/AuthContext";
import "./components/mobile/mobile-styles.css";

function AppContent() {
  const [mobileActiveTab, setMobileActiveTab] = useState("home");
  const [prevTabIndex, setPrevTabIndex] = useState(0);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const { showOrderSuccess, setShowOrderSuccess } = useOrdering();

  // Swipe navigation state
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;
  const maxVerticalSwipe = 100; // Prevent swipe if vertical movement is too large

  // Tab order for swipe navigation
  const tabOrder = ["home", "collections", "cart", "orders", "settings"];

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({ 
      x: e.targetTouches[0].clientX, 
      y: e.targetTouches[0].clientY 
    });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({ 
      x: e.targetTouches[0].clientX, 
      y: e.targetTouches[0].clientY 
    });
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = Math.abs(touchStart.y - touchEnd.y);
    
    // Don't trigger swipe if vertical scroll is detected
    if (distanceY > maxVerticalSwipe) return;
    
    const isLeftSwipe = distanceX > minSwipeDistance;
    const isRightSwipe = distanceX < -minSwipeDistance;

    if (isLeftSwipe || isRightSwipe) {
      const currentIndex = tabOrder.indexOf(mobileActiveTab);
      
      if (isLeftSwipe && currentIndex < tabOrder.length - 1) {
        // Swipe left: go to next tab
        setPrevTabIndex(currentIndex);
        setMobileActiveTab(tabOrder[currentIndex + 1]);
      } else if (isRightSwipe && currentIndex > 0) {
        // Swipe right: go to previous tab
        setPrevTabIndex(currentIndex);
        setMobileActiveTab(tabOrder[currentIndex - 1]);
      }
    }
  };

  // Listen for modal events from Header
  useEffect(() => {
    const handleOpenAbout = () => setShowAboutModal(true);
    const handleOpenContact = () => setShowContactModal(true);
    const handleNavigateToCollections = () => {
      setPrevTabIndex(tabOrder.indexOf(mobileActiveTab));
      setMobileActiveTab("collections");
    };
    const handleNavigateToOrders = () => {
      setPrevTabIndex(tabOrder.indexOf(mobileActiveTab));
      setMobileActiveTab("orders");
    };
    const handleNavigateToHome = () => {
      setPrevTabIndex(tabOrder.indexOf(mobileActiveTab));
      setMobileActiveTab("home");
    };
    const handleNavigateToCart = () => {
      setPrevTabIndex(tabOrder.indexOf(mobileActiveTab));
      setMobileActiveTab("cart");
    };

    window.addEventListener('openAboutModal', handleOpenAbout);
    window.addEventListener('openContactModal', handleOpenContact);
    window.addEventListener('navigateToCollections', handleNavigateToCollections);
    window.addEventListener('navigateToOrders', handleNavigateToOrders);
    window.addEventListener('navigateToHome', handleNavigateToHome);
    window.addEventListener('navigateToCart', handleNavigateToCart);

    return () => {
      window.removeEventListener('openAboutModal', handleOpenAbout);
      window.removeEventListener('openContactModal', handleOpenContact);
      window.removeEventListener('navigateToCollections', handleNavigateToCollections);
      window.removeEventListener('navigateToOrders', handleNavigateToOrders);
      window.removeEventListener('navigateToHome', handleNavigateToHome);
      window.removeEventListener('navigateToCart', handleNavigateToCart);
    };
  }, [mobileActiveTab]);

  const handleOrderSuccessClose = () => {
    setShowOrderSuccess(false);
    
    // Detect if mobile or desktop
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // Mobile: Switch to orders tab
      setPrevTabIndex(tabOrder.indexOf(mobileActiveTab));
      setMobileActiveTab("orders");
    } else {
      // Desktop: Scroll to orders section
      const ordersSection = document.getElementById("orders");
      if (ordersSection) {
        ordersSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleTabChange = (newTab: string) => {
    setPrevTabIndex(tabOrder.indexOf(mobileActiveTab));
    setMobileActiveTab(newTab);
  };

  const renderMobileContent = () => {
    const pages = {
      "home": <MobileHomePage key="home" />,
      "collections": <MobileCollectionsPage key="collections" />,
      "cart": <MobileCartPage key="cart" />,
      "orders": <MobileOrdersPage key="orders" />,
      "settings": <MobileSettingsPage key="settings" />,
    };

    return pages[mobileActiveTab as keyof typeof pages] || pages.home;
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
        
        <div id="how-to-order">
          <HowToOrder />
        </div>
        
        <div id="orders">
          <MyOrders />
        </div>
        
        <div id="testimonials">
          <Testimonials />
        </div>
      </main>

      {/* Mobile View - Tab-based Navigation with Swipe Support */}
      <main 
        className="md:hidden pb-[80px] relative"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ overflow: "visible" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={mobileActiveTab}
            initial={{ 
              x: tabOrder.indexOf(mobileActiveTab) > prevTabIndex ? '100%' : '-100%',
              opacity: 0.8
            }}
            animate={{ 
              x: 0,
              opacity: 1
            }}
            exit={{ 
              x: tabOrder.indexOf(mobileActiveTab) > prevTabIndex ? '-100%' : '100%',
              opacity: 0.8
            }}
            transition={{ 
              type: "tween",
              ease: "easeInOut",
              duration: 0.25
            }}
            style={{ 
              width: "100%", 
              minHeight: "100vh",
              overflow: "visible",
            }}
          >
            {renderMobileContent()}
          </motion.div>
        </AnimatePresence>

        {/* Swipe Indicator Dots */}
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1.5 rounded-full glass-strong z-40">
          {tabOrder.map((tab) => (
            <div
              key={tab}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                mobileActiveTab === tab 
                  ? 'bg-primary w-4' 
                  : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
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
        onTabChange={handleTabChange}
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
