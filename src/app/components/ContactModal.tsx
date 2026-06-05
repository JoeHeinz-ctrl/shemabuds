import { motion, AnimatePresence } from "motion/react";
import { X, Phone, Mail, MapPin, MessageCircle, Clock, Instagram } from "lucide-react";
import { Button } from "./ui/button";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  if (!isOpen) return null;

  const handleWhatsApp = () => {
    window.open("https://wa.me/919363962399?text=Hello%20Shema%20Buds!%20I'd%20like%20to%20know%20more%20about%20your%20services.", "_blank");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-strong rounded-3xl shadow-luxury-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Get In Touch</h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-secondary-foreground" />
            </motion.button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto flex-1">
            <div className="space-y-6">
              {/* Intro */}
              <p className="text-muted-foreground leading-relaxed">
                We'd love to hear from you! Whether you have questions, want to place a custom order, 
                or just want to say hello, we're here to help.
              </p>

              {/* Contact Methods */}
              <div className="grid gap-4">
                {/* WhatsApp */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-[#25D366]/10 border-2 border-[#25D366]/20 rounded-2xl cursor-pointer"
                  onClick={handleWhatsApp}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">WhatsApp (Preferred)</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Chat with us instantly for quick responses
                      </p>
                      <p className="text-[#25D366] font-semibold">+91 93639 62399</p>
                    </div>
                  </div>
                </motion.div>

                {/* Phone */}
                <div className="p-4 bg-muted/50 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Call us during business hours
                      </p>
                      <a href="tel:+919363962399" className="text-primary font-semibold hover:underline">
                        +91 93639 62399
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="p-4 bg-muted/50 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">Email</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Send us a detailed inquiry
                      </p>
                      <a href="mailto:hello@shemabuds.com" className="text-primary font-semibold hover:underline">
                        hello@shemabuds.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Instagram */}
                <div className="p-4 bg-muted/50 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Instagram className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">Instagram</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Follow us for inspiration and updates
                      </p>
                      <a 
                        href="https://instagram.com/shemabuds" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary font-semibold hover:underline"
                      >
                        @shemabuds
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Business Hours</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Monday - Saturday: 9:00 AM - 8:00 PM</p>
                      <p>Sunday: 10:00 AM - 6:00 PM</p>
                      <p className="text-xs mt-2 italic">We respond to messages within 1-2 hours during business hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Note */}
              <div className="p-4 bg-muted/50 rounded-2xl">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Location</h3>
                    <p className="text-sm text-muted-foreground">
                      We offer both pickup and delivery services. Contact us to discuss your specific 
                      location and delivery options.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border">
            <Button
              onClick={handleWhatsApp}
              className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white py-6 text-lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat on WhatsApp
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
