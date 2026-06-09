import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ShoppingBag, Trash2, Plus, Minus, Package } from "lucide-react";
import { useOrdering } from "../../OrderingSystem";
import { useAuth } from "../../../../contexts/AuthContext";
import { AuthModal } from "../../AuthModal";
import { addOrder } from "../../../../services/orderService";
import { rateLimiter, RATE_LIMITS } from "../../../../utils/rateLimiter";

type CartView = "cart" | "checkout" | "success";

export function MobileCartPage() {
  const [currentView, setCurrentView] = useState<CartView>("cart");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { cart, updateQuantity, removeFromCart } = useOrdering();
  const { user } = useAuth();

  // Checkout form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  // Calculate total price from cart
  const totalPrice = cart.reduce((sum, item) => {
    const price = parseFloat(item.product.price || "0");
    return sum + (price * item.quantity);
  }, 0);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setCurrentView("checkout");
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    // Rate limiting check
    const rateLimitKey = `order:${user.uid}`;
    const rateCheck = rateLimiter.check(rateLimitKey, RATE_LIMITS.ORDER_PLACEMENT);
    
    if (!rateCheck.allowed) {
      alert(`Too many order attempts. Please wait ${rateCheck.resetIn} seconds before trying again.`);
      return;
    }

    try {
      // Calculate total
      const total = cart.reduce((sum, item) => {
        const price = parseFloat(item.product.price || "0");
        return sum + (price * item.quantity);
      }, 0);

      // Create order
      await addOrder({
        userId: user.uid,
        customerName: formData.name,
        phone: formData.phone,
        whatsapp: formData.phone,
        deliveryMethod: "delivery",
        address: formData.address,
        eventDate: new Date().toISOString().split('T')[0],
        additionalNotes: formData.notes,
        items: cart,
        estimatedTotal: total,
        status: "new"
      });

      // Clear cart and show success
      cart.forEach(item => removeFromCart(item.product.id));
      setCurrentView("success");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const handleBackToHome = () => {
    setCurrentView("cart");
    // Trigger navigation to home
    window.dispatchEvent(new CustomEvent('navigateToHome'));
  };

  return (
    <div className="md:hidden min-h-screen bg-gradient-to-b from-background to-muted pt-[76px] pb-24">
      <AnimatePresence mode="wait">
        {currentView === "cart" && (
          <motion.div
            key="cart"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="px-4"
          >
            {/* Header */}
            <div className="mb-6">
              <h1 className="section-title text-2xl text-foreground">Shopping Cart</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
              </p>
            </div>

            {/* Cart Items */}
            {cart.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-16"
              >
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Your cart is empty</h3>
                <p className="text-sm text-muted-foreground text-center mb-6">
                  Add some beautiful items to get started
                </p>
              </motion.div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map((item, index) => (
                    <motion.div
                      key={`${item.product.id}-${index}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="glass-strong rounded-xl p-4 shadow-luxury"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground truncate">{item.product.title}</h3>
                          <p className="text-sm text-primary font-semibold mt-1">₹{item.product.price}</p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3 mt-3">
                            <div className="flex items-center gap-2 bg-muted rounded-full p-1">
                              <button
                                onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                className="w-7 h-7 rounded-full bg-background flex items-center justify-center hover:bg-muted transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-7 h-7 rounded-full bg-background flex items-center justify-center hover:bg-muted transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="ml-auto p-2 text-destructive hover:bg-destructive/10 rounded-full transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Cart Summary */}
                <div className="glass-strong rounded-xl p-5 shadow-luxury mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold text-foreground">₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4 pb-4 border-b border-border">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="font-semibold text-foreground">Free</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-foreground">Total</span>
                    <span className="text-lg font-bold text-primary">₹{totalPrice}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl font-semibold shadow-luxury hover:shadow-luxury-lg transition-all"
                >
                  Proceed to Checkout
                </button>
              </>
            )}
          </motion.div>
        )}

        {currentView === "checkout" && (
          <motion.div
            key="checkout"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="px-4"
          >
            {/* Header with Back Button */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setCurrentView("cart")}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Checkout</h1>
                <p className="text-sm text-muted-foreground">Complete your order</p>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="space-y-4 mb-6">
              <div className="glass-strong rounded-xl p-5 shadow-luxury">
                <h3 className="font-semibold text-foreground mb-4">Delivery Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-input-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-input-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Delivery Address</label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg bg-input-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Enter delivery address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Order Notes (Optional)</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-3 rounded-lg bg-input-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Any special instructions?"
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="glass-strong rounded-xl p-5 shadow-luxury">
                <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
                <div className="space-y-2 mb-4">
                  {cart.map((item, index) => (
                    <div key={`${item.product.id}-${index}`} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.product.title} x{item.quantity}
                      </span>
                      <span className="text-foreground font-medium">₹{parseFloat(item.product.price || "0") * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="font-bold text-primary text-lg">₹{totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={!formData.name || !formData.phone || !formData.address}
              className="w-full py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl font-semibold shadow-luxury hover:shadow-luxury-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Place Order
            </button>
          </motion.div>
        )}

        {currentView === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="px-4 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6"
            >
              <Package className="w-12 h-12 text-green-500" />
            </motion.div>

            <h2 className="text-2xl font-bold text-foreground mb-3 text-center">Order Placed Successfully!</h2>
            <p className="text-muted-foreground text-center mb-8 max-w-sm">
              Thank you for your order. We'll contact you shortly to confirm the details.
            </p>

            <div className="w-full space-y-3">
              <button
                onClick={() => {
                  // Navigate to orders page
                  window.dispatchEvent(new CustomEvent('navigateToOrders'));
                  setCurrentView("cart");
                }}
                className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-semibold shadow-luxury hover:shadow-luxury-lg transition-all"
              >
                View My Orders
              </button>
              <button
                onClick={handleBackToHome}
                className="w-full py-4 bg-muted text-foreground rounded-xl font-semibold hover:bg-muted/80 transition-all"
              >
                Back to Home
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}
