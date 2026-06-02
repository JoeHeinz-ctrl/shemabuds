import { MapPin, Truck } from "lucide-react";

export function MobileInfoBar() {
  return (
    <div className="md:hidden bg-gradient-to-r from-[#FAF7F2] to-[#FEFDFB] px-4 py-2 border-b border-[#A67C52]/10">
      <div className="flex items-center justify-center gap-4 text-xs text-[#4A3A32]">
        <div className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-[#A67C52]" />
          <span className="font-medium">Handmade Bouquets & Gifts</span>
        </div>
        <div className="w-px h-3 bg-[#A67C52]/30"></div>
        <div className="flex items-center gap-1">
          <Truck className="w-3.5 h-3.5 text-[#A67C52]" />
          <span className="font-medium">Delivery Available</span>
        </div>
      </div>
    </div>
  );
}
