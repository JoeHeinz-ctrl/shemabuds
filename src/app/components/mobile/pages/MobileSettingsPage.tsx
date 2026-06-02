import { MapPin, Truck, Phone, Mail, Shield, FileText, Heart } from "lucide-react";
import { motion } from "motion/react";

export function MobileSettingsPage() {
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
    <div className="md:hidden min-h-screen bg-gradient-to-b from-white to-[#FAF7F2] pt-4 px-4 pb-24">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#2A1B14]">Settings</h1>
        <p className="text-sm text-[#6B5D52] mt-1">Information & preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-4 mb-6">
        {settingsSections.map((section, index) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-4 shadow-sm border border-[#A67C52]/10"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#D8B4A0] p-2 rounded-lg">
                  <Icon className="w-5 h-5 text-[#8B6B3E]" />
                </div>
                <h2 className="font-semibold text-[#2A1B14]">{section.title}</h2>
              </div>
              
              <div className="space-y-3 pl-11">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <p className="text-xs text-[#6B5D52] mb-0.5">{item.label}</p>
                    <p className="text-sm text-[#2A1B14] font-medium">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legal Links */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#A67C52]/10 mb-6">
        <h2 className="font-semibold text-[#2A1B14] mb-3">Legal</h2>
        <div className="space-y-2">
          {legalLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <button
                key={index}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#FAF7F2] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-[#A67C52]" />
                  <span className="text-sm text-[#2A1B14]">{link.label}</span>
                </div>
                <span className="text-[#6B5D52]">→</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* App Version */}
      <div className="text-center">
        <p className="text-xs text-[#6B5D52]">Shemabuds Mobile</p>
        <p className="text-xs text-[#A67C52] font-medium">Version 1.0.0</p>
      </div>
    </div>
  );
}
