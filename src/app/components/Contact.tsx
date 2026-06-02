import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { MessageCircle, Instagram, Mail } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <section className="py-8 md:py-24 px-3 md:px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-16"
        >
          <h2 className="text-xl md:text-4xl sm:text-5xl mb-2 md:mb-4 text-[#2A1B14] font-semibold tracking-tight">Get In Touch</h2>
          <p className="text-xs md:text-lg text-[#4A3A32] max-w-2xl mx-auto font-light">
            Ready to create something beautiful together? Let's chat!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
          {/* Contact Form - Desktop Only */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block"
          >
            <Card className="p-8 border border-[#A67C52]/15 shadow-[0_4px_16px_rgba(166,124,82,0.12)] bg-white">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-[#2A1B14] font-medium">Your Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2 bg-[#FEFDFB] border-[#A67C52]/20 focus:border-[#A67C52] text-[#2A1B14] placeholder:text-[#8B7D72]"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-[#2A1B14] font-medium">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2 bg-[#FEFDFB] border-[#A67C52]/20 focus:border-[#A67C52] text-[#2A1B14] placeholder:text-[#8B7D72]"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-[#2A1B14] font-medium">Your Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project or idea..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-2 bg-[#FEFDFB] border-[#A67C52]/20 focus:border-[#A67C52] min-h-[150px] text-[#2A1B14] placeholder:text-[#8B7D72]"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#A67C52] hover:bg-[#8B6B3E] text-white py-6 shadow-[0_4px_14px_rgba(166,124,82,0.25)] hover:shadow-[0_6px_20px_rgba(166,124,82,0.35)] transition-all duration-300 font-medium"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3 md:space-y-6 lg:col-span-1 col-span-1"
          >
            <div className="hidden md:block">
              <h3 className="text-2xl mb-6 text-[#2A1B14] font-semibold">Connect With Us</h3>
              <p className="text-[#4A3A32] mb-8 leading-relaxed font-light">
                We'd love to hear from you! Whether you have a question about our services, 
                pricing, or anything else, our team is ready to answer all your questions.
              </p>
            </div>

            <div className="space-y-2 md:space-y-4">
              <motion.a
                whileHover={{ scale: 1.02, x: 4 }}
                transition={{ duration: 0.2 }}
                href="https://wa.me/919363962399"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 rounded-xl transition-colors duration-200 group shadow-sm border border-[#25D366]/20"
              >
                <div className="bg-[#25D366] p-2 md:p-3 rounded-lg md:rounded-xl group-hover:scale-110 transition-transform duration-200 shadow-sm flex-shrink-0">
                  <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm md:text-base text-[#2A1B14] font-semibold">WhatsApp</p>
                  <p className="text-[10px] md:text-sm text-[#6B5D52] font-light">Chat with us instantly</p>
                </div>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02, x: 4 }}
                transition={{ duration: 0.2 }}
                href="https://instagram.com/shemabuds"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 rounded-xl transition-all duration-200 group shadow-sm border border-purple-500/20"
              >
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 md:p-3 rounded-lg md:rounded-xl group-hover:scale-110 transition-transform duration-200 shadow-sm flex-shrink-0">
                  <Instagram className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm md:text-base text-[#2A1B14] font-semibold">Instagram</p>
                  <p className="text-[10px] md:text-sm text-[#6B5D52] font-light">@shemabuds</p>
                </div>
              </motion.a>

              <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-[#FAF7F2] rounded-xl shadow-sm border border-[#A67C52]/10">
                <div className="bg-[#A67C52] p-2 md:p-3 rounded-lg md:rounded-xl shadow-sm flex-shrink-0">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm md:text-base text-[#2A1B14] font-semibold">Email</p>
                  <p className="text-[10px] md:text-sm text-[#6B5D52] font-light">hello@shemabuds.com</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
