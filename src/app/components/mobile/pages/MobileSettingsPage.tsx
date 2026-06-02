import { MapPin, Truck, Phone, Mail, Shield, FileText, Heart, Moon, Sun, Palette } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../../../../contexts/ThemeContext";

export function MobileSettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const settingsSections = [
    {
      title: "Business Information",
      icon: Heart,
      items: [
        { label: "About Shemabuds", value: "Handmade bouquets & gifts with love" },
        { label: "Specialization", value: "Custom orders, Events, Weddings" },
      ]
    },
    {
      title: "Delivery Information",
      icon: Truck,
      items: [
        { label: "Delivery Options", value: "Home Delivery & Pickup" },
        { label: "Service Area", value: "Local delivery available" },
      ]
    },
    {
      title: "Contact Information",
      icon: Phone,
      items: [
        { label: "WhatsApp", value: "+91 93639 62399" },
        { label: "Business Hours", value: "Contact us for details" },
      ]
    },
  ];

  const legalLinks = [
    { label: "Privacy Policy", icon: Shield },
    { label: "Terms & Conditions", icon: FileText },
  ];

  return (
    <div className="md:hidden min-h-screen bg-gradient-to-b from-background to-muted pt-4 px-4 pb-24 transition-colors duration-400">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Information & preferences</p>
      </div>

      {/* Theme Toggle - Premium Feature */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong rounded-2xl p-5 shadow-luxury mb-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2.5 rounded-lg">
              <Palette className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Theme</h2>
              <p className="text-xs text-muted-foreground">Choose your preferred appearance</p>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className={`relative w-14 h-8 rounded-full transition-colors duration-400 ${
              theme === "dark" ? "bg-primary" : "bg-primary/30"
            }`}
          >
            <motion.div
              animate={{
                x: theme === "dark" ? 24 : 2,
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30
              }}
              className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center"
            >
              {theme === "dark" ? (
                <Moon className="w-3.5 h-3.5 text-primary" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-primary" />
              )}
            </motion.div>
          </motion.button>
        </div>
        
        {/* Theme Preview */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => theme === "dark" && toggleTheme()}
            className={`p-3 rounded-xl border-2 transition-all ${
              theme === "light"
                ? "border-primary bg-primary/10"
                : "border-border bg-card"
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <Sun className="w-5 h-5 text-primary" />
              <span className="text-xs font-medium text-foreground">Light</span>
            </div>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => theme === "light" && toggleTheme()}
            className={`p-3 rounded-xl border-2 transition-all ${
              theme === "dark"
                ? "border-primary bg-primary/10"
                : "border-border bg-card"
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <Moon className="w-5 h-5 text-primary" />
              <span className="text-xs font-medium text-foreground">Dark</span>
            </div>
          </motion.button>
        </div>
      </motion.div>

      {/* Settings Sections */}
      <div className="space-y-4 mb-6">
        {settingsSections.map((section, index) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 1) * 0.1 }}
              className="glass-strong rounded-2xl p-4 shadow-luxury"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-secondary p-2 rounded-lg">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-semibold text-foreground">{section.title}</h2>
              </div>
              
              <div className="space-y-3 pl-11">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                    <p className="text-sm text-foreground font-medium">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legal Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-strong rounded-2xl p-4 shadow-luxury mb-6"
      >
        <h2 className="font-semibold text-foreground mb-3">Legal</h2>
        <div className="space-y-2">
          {legalLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.button
                key={index}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">{link.label}</span>
                </div>
                <span className="text-muted-foreground">→</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* App Version */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <p className="text-xs text-muted-foreground">Shemabuds Mobile</p>
        <p className="text-xs text-primary font-medium">Version 1.0.0</p>
      </motion.div>
    </div>
  );
}
