import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, User, Phone, MapPin, Calendar, MessageCircle, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useOrdering, CheckoutInfo } from "./OrderingSystem";
import { addOrder } from "../../services/orderService";
import { getUserProfile, saveUserProfile } from "../../services/userProfileService";
import { useAuth } from "../../contexts/AuthContext";

export function CheckoutModal() {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    setIsCartOpen,
    clearCart,
    triggerOrderSuccess,
  } = useOrdering();
  const { user } = useAuth();

  const [step, setStep] = useState<"form" | "review">("form");
  const [formData, setFormData] = useState<CheckoutInfo>({
    name: "",
    phone: "",
    whatsapp: "",
    deliveryMethod: "pickup",
    address: "",
    eventDate: "",
    additionalNotes: "",
  });
  const [profileLoaded, setProfileLoaded] = useState(false);

  // Load user profile when modal opens
  useEffect(() => {
    const loadUserProfile = async () => {
      if (isCheckoutOpen && user && !profileLoaded) {
        const profile = await getUserProfile(user.uid);
        if (profile) {
          setFormData(prev => ({
            ...prev,
            name: profile.name || user.displayName || "",
            phone: profile.phone || "",
            whatsapp: profile.whatsapp || "",
            address: profile.address || "",
          }));
        } else {
          // If no profile, at least set name from auth
          setFormData(prev => ({
            ...prev,
            name: user.displayName || "",
          }));
        }
        setProfileLoaded(true);
      }
      
      // Reset when modal closes
      if (!isCheckoutOpen) {
        setProfileLoaded(false);
      }
    };

    loadUserProfile();
  }, [isCheckoutOpen, user, profileLoaded]);

  if (!isCheckoutOpen) return null;

  // Calculate estimated total
  const calculateEstimatedTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      if (item.product.price) {
        // Convert price to string if it's not already
        const priceString = String(item.product.price);
        const priceMatch = priceString.match(/[\d,]+/);
        if (priceMatch) {
          const numericPrice = parseInt(priceMatch[0].replace(/,/g, ''));
          total += numericPrice * item.quantity;
        }
      }
    });
    return total;
  };

  const estimatedTotal = calculateEstimatedTotal();
  const hasValidPrices = estimatedTotal > 0;

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep("form");
  };

  const handleBack = () => {
    if (step === "review") {
      setStep("form");
    } else {
      setIsCheckoutOpen(false);
      setIsCartOpen(true);
    }
  };

  const handleContinueToReview = () => {
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.whatsapp || !formData.eventDate) {
      alert("Please fill in all required fields");
      return;
    }

    if (formData.deliveryMethod === "delivery" && !formData.address) {
      alert("Please provide delivery address");
      return;
    }

    setStep("review");
  };

  const generateWhatsAppMessage = () => {
    let message = `Hello Shemabuds 😊\n\nI would like to place an order.\n\n`;
    message += `*CUSTOMER DETAILS*\n`;
    message += `Name: ${formData.name}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `WhatsApp: ${formData.whatsapp}\n`;
    message += `Delivery Method: ${formData.deliveryMethod === "pickup" ? "Pickup" : "Home Delivery"}\n`;
    
    if (formData.deliveryMethod === "delivery" && formData.address) {
      message += `Address: ${formData.address}\n`;
    }
    
    message += `Event Date: ${formData.eventDate}\n\n`;
    
    message += `*PRODUCTS*\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.product.title}\n`;
      
      if (Object.keys(item.customizations).length > 0) {
        message += `   Customization:\n`;
        Object.entries(item.customizations).forEach(([key, value]) => {
          message += `   - ${key}: ${value}\n`;
        });
      }
      
      if (item.notes) {
        message += `   Notes: ${item.notes}\n`;
      }
      
      message += `   Quantity: ${item.quantity}\n\n`;
    });

    if (formData.additionalNotes) {
      message += `*Additional Notes:*\n${formData.additionalNotes}\n\n`;
    }

    message += `Please contact me regarding pricing and customization.\n\nThank you! 🌸`;

    return encodeURIComponent(message);
  };

  const handlePlaceOrder = async () => {
    // Save order to Firebase without opening WhatsApp
    try {
      console.log("🔥 Attempting to save order to Firebase...");
      
      // Save user profile for future auto-fill
      if (user) {
        await saveUserProfile({
          userId: user.uid,
          name: formData.name,
          phone: formData.phone,
          whatsapp: formData.whatsapp,
          address: formData.address,
        });
      }
      
      const orderId = await addOrder({
        userId: user?.uid || "",
        customerName: formData.name,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        deliveryMethod: formData.deliveryMethod,
        address: formData.address,
        eventDate: formData.eventDate,
        additionalNotes: formData.additionalNotes,
        items: cart,
        estimatedTotal: estimatedTotal,
        status: "new",
      });
      
      console.log("✅ Order saved successfully with ID:", orderId);
      
      // Clear cart and close modal
      clearCart();
      handleClose();
      
      // Show success modal with confetti and redirect to orders after
      triggerOrderSuccess();
    } catch (error: any) {
      console.error("❌ Error saving order:", error);
      
      if (error.code === "permission-denied") {
        alert(`❌ Permission Denied!\n\nFirebase security rules are blocking order creation.\n\nPlease update Firestore rules or use "Order through WhatsApp" option.`);
      } else {
        alert(`❌ Failed to place order\n\nError: ${error.message || 'Unknown error'}\n\nPlease try the "Order through WhatsApp" option instead.`);
      }
    }
  };

  const handleSendWhatsApp = async () => {
    const message = generateWhatsAppMessage();
    const whatsappNumber = "919363962399";
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    // Save order to Firebase before opening WhatsApp
    try {
      // Save user profile for future auto-fill
      if (user) {
        await saveUserProfile({
          userId: user.uid,
          name: formData.name,
          phone: formData.phone,
          whatsapp: formData.whatsapp,
          address: formData.address,
        });
      }
      
      const orderId = await addOrder({
        userId: user?.uid || "",
        customerName: formData.name,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        deliveryMethod: formData.deliveryMethod,
        address: formData.address,
        eventDate: formData.eventDate,
        additionalNotes: formData.additionalNotes,
        items: cart,
        estimatedTotal: estimatedTotal,
        status: "new",
      });
      
      // Open WhatsApp
      window.open(url, "_blank");
      
      // Clear cart and close modal
      clearCart();
      handleClose();
      
      // Show success modal with confetti
      triggerOrderSuccess();
    } catch (error) {
      console.error("Error saving order:", error);
      // Continue with WhatsApp even if Firebase save fails
      window.open(url, "_blank");
      clearCart();
      handleClose();
      
      // Show success modal anyway
      triggerOrderSuccess();
    }
  };

  return (
    <>
      <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A1B14]/60 backdrop-blur-md"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.4 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 md:p-6 border-b border-[#A67C52]/10 flex-shrink-0">
            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={handleBack}
                className="p-2 hover:bg-[#FAF7F2] rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-[#4A3A32]" />
              </button>
              <h2 className="text-lg md:text-2xl font-semibold text-[#2A1B14]">
                {step === "form" ? "Checkout" : "Review Your Order"}
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-[#FAF7F2] rounded-full transition-colors"
              >
              <X className="w-5 h-5 md:w-6 md:h-6 text-[#4A3A32]" />
            </button>
          </div>

          {/* Content */}
          <div className="p-3 md:p-6 flex-1 overflow-y-auto">
            {step === "form" ? (
              <div className="space-y-4 md:space-y-6">
                {/* Customer Information */}
                <div className="space-y-3 md:space-y-4">
                  <h3 className="text-base md:text-lg font-semibold text-[#2A1B14] flex items-center gap-2">
                    <User className="w-4 h-4 md:w-5 md:h-5 text-[#A67C52]" />
                    Customer Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div className="space-y-2">
                      <Label className="text-[#4A3A32] font-medium">Full Name *</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name"
                        className="bg-[#FEFDFB] border-[#A67C52]/20 focus:border-[#A67C52]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[#4A3A32] font-medium">Phone Number *</Label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 XXXXX XXXXX"
                        className="bg-[#FEFDFB] border-[#A67C52]/20 focus:border-[#A67C52]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[#4A3A32] font-medium">WhatsApp Number *</Label>
                      <Input
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        placeholder="+91 XXXXX XXXXX"
                        className="bg-[#FEFDFB] border-[#A67C52]/20 focus:border-[#A67C52]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[#4A3A32] font-medium">Event Date *</Label>
                      <Input
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="bg-[#FEFDFB] border-[#A67C52]/20 focus:border-[#A67C52]"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Method */}
                <div className="space-y-3 md:space-y-4">
                  <h3 className="text-base md:text-lg font-semibold text-[#2A1B14] flex items-center gap-2">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#A67C52]" />
                    Delivery Method
                  </h3>

                  <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                    <button
                      onClick={() => setFormData({ ...formData, deliveryMethod: "pickup" })}
                      className={`flex-1 p-3 md:p-4 rounded-xl md:rounded-2xl border-2 transition-all ${
                        formData.deliveryMethod === "pickup"
                          ? "border-[#A67C52] bg-[#A67C52]/5"
                          : "border-[#A67C52]/20 hover:border-[#A67C52]/40"
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-base md:text-lg font-semibold text-[#2A1B14]">Pickup</div>
                        <div className="text-xs md:text-sm text-[#6B5D52]">Collect from store</div>
                      </div>
                    </button>

                    <button
                      onClick={() => setFormData({ ...formData, deliveryMethod: "delivery" })}
                      className={`flex-1 p-4 rounded-2xl border-2 transition-all ${
                        formData.deliveryMethod === "delivery"
                          ? "border-[#A67C52] bg-[#A67C52]/5"
                          : "border-[#A67C52]/20 hover:border-[#A67C52]/40"
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-base md:text-lg font-semibold text-[#2A1B14]">Home Delivery</div>
                        <div className="text-xs md:text-sm text-[#6B5D52]">Deliver to address</div>
                      </div>
                    </button>
                  </div>

                  <AnimatePresence>
                    {formData.deliveryMethod === "delivery" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2 overflow-hidden"
                      >
                        <Label className="text-[#4A3A32] font-medium">Delivery Address *</Label>
                        <Textarea
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="Enter your complete address with landmarks"
                          className="bg-[#FEFDFB] border-[#A67C52]/20 focus:border-[#A67C52] min-h-[100px]"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Additional Notes */}
                <div className="space-y-2">
                  <Label className="text-[#4A3A32] font-medium">Additional Notes (Optional)</Label>
                  <Textarea
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    placeholder="Any special instructions or requests..."
                    className="bg-[#FEFDFB] border-[#A67C52]/20 focus:border-[#A67C52] min-h-[100px]"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4 md:space-y-6">
                {/* Customer Details Review */}
                <div className="p-4 md:p-6 bg-[#FAF7F2] rounded-xl md:rounded-2xl space-y-3">
                  <h3 className="text-base md:text-lg font-semibold text-[#2A1B14] mb-4">Customer Details</h3>
                  <div className="grid grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
                    <div>
                      <span className="text-[#6B5D52]">Name:</span>
                      <p className="font-semibold text-[#2A1B14]">{formData.name}</p>
                    </div>
                    <div>
                      <span className="text-[#6B5D52]">Phone:</span>
                      <p className="font-semibold text-[#2A1B14]">{formData.phone}</p>
                    </div>
                    <div>
                      <span className="text-[#6B5D52]">WhatsApp:</span>
                      <p className="font-semibold text-[#2A1B14]">{formData.whatsapp}</p>
                    </div>
                    <div>
                      <span className="text-[#6B5D52]">Event Date:</span>
                      <p className="font-semibold text-[#2A1B14]">{formData.eventDate}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[#6B5D52]">Delivery:</span>
                      <p className="font-semibold text-[#2A1B14]">
                        {formData.deliveryMethod === "pickup" ? "Pickup" : "Home Delivery"}
                      </p>
                      {formData.deliveryMethod === "delivery" && formData.address && (
                        <p className="text-[#4A3A32] mt-1">{formData.address}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Products Review */}
                <div className="space-y-3 md:space-y-4">
                  <h3 className="text-base md:text-lg font-semibold text-[#2A1B14]">Your Products</h3>
                  {cart.map((item, index) => (
                    <div key={index} className="flex gap-3 md:gap-4 p-3 md:p-4 bg-[#FAF7F2] rounded-xl md:rounded-2xl">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-lg md:rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm md:text-base font-semibold text-[#2A1B14]">{item.product.title}</h4>
                        {item.product.price && (
                          <p className="text-xs md:text-sm font-semibold text-[#A67C52]">{item.product.price}</p>
                        )}
                        {Object.entries(item.customizations).map(([key, value]) => (
                          <p key={key} className="text-xs text-[#6B5D52]">
                            {key}: {value}
                          </p>
                        ))}
                        {item.notes && (
                          <p className="text-xs text-[#6B5D52] italic">Note: {item.notes}</p>
                        )}
                        <p className="text-xs md:text-sm font-semibold text-[#4A3A32] mt-1">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Estimated Total */}
                  {hasValidPrices && (
                    <div className="p-3 md:p-4 bg-[#A67C52]/10 rounded-xl md:rounded-2xl border-2 border-[#A67C52]/20">
                      <div className="flex items-center justify-between">
                        <span className="text-base md:text-lg font-semibold text-[#2A1B14]">Estimated Total:</span>
                        <span className="text-xl md:text-2xl font-bold text-[#A67C52]">
                          ₹{estimatedTotal.toLocaleString('en-IN')}+
                        </span>
                      </div>
                      <p className="text-[10px] md:text-xs text-[#6B5D52] mt-2">
                        *Final pricing will be confirmed via WhatsApp based on customizations
                      </p>
                    </div>
                  )}
                </div>

                {formData.additionalNotes && (
                  <div className="p-3 md:p-4 bg-[#FAF7F2] rounded-xl md:rounded-2xl">
                    <h4 className="text-sm md:text-base font-semibold text-[#2A1B14] mb-2">Additional Notes</h4>
                    <p className="text-xs md:text-sm text-[#4A3A32]">{formData.additionalNotes}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 md:p-6 border-t border-[#A67C52]/10 flex-shrink-0">
            {step === "form" ? (
              <Button
                onClick={handleContinueToReview}
                className="w-full bg-[#A67C52] hover:bg-[#8B6B3E] text-white py-4 md:py-6 text-sm md:text-lg shadow-[0_4px_16px_rgba(166,124,82,0.3)] hover:shadow-[0_6px_20px_rgba(166,124,82,0.4)] transition-all duration-300"
              >
                Continue to Review
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Button>
            ) : (
              <div className="flex flex-col md:flex-row gap-3">
                <Button
                  onClick={handlePlaceOrder}
                  className="w-full bg-[#A67C52] hover:bg-[#8B6B3E] text-white py-4 md:py-6 text-sm md:text-lg shadow-[0_4px_16px_rgba(166,124,82,0.3)] hover:shadow-[0_6px_20px_rgba(166,124,82,0.4)] transition-all duration-300"
                >
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Place Order
                </Button>
                <Button
                  onClick={handleSendWhatsApp}
                  variant="outline"
                  className="w-full border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 py-4 md:py-6 text-sm md:text-lg transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  <span className="md:hidden">WhatsApp Order</span>
                  <span className="hidden md:inline">Order through WhatsApp</span>
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
    </>
  );
}