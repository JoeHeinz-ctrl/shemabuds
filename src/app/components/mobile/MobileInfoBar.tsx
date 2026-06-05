import { MapPin, Truck } from "lucide-react";

export function MobileInfoBar() {
  return (
    <div className="md:hidden bg-gradient-to-r from-background to-muted px-4 py-2 border-b border-border">
      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-primary" />
          <span className="font-medium">Handmade Bouquets & Gifts</span>
        </div>
        <div className="w-px h-3 bg-border"></div>
        <div className="flex items-center gap-1">
          <Truck className="w-3.5 h-3.5 text-primary" />
          <span className="font-medium">Delivery Available</span>
        </div>
      </div>
    </div>
  );
}
