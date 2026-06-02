import { createContext, useContext, useState, ReactNode } from "react";

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  images?: string[];
  badge: string;
  category: string;
  price?: string;
  customizationOptions?: {
    label: string;
    options: string[];
  }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  customizations: Record<string, string>;
  notes?: string;
}

export interface CheckoutInfo {
  name: string;
  phone: string;
  whatsapp: string;
  deliveryMethod: "pickup" | "delivery";
  address?: string;
  eventDate: string;
  additionalNotes?: string;
}

interface OrderingContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  checkoutInfo: CheckoutInfo | null;
  setCheckoutInfo: (info: CheckoutInfo | null) => void;
}

const OrderingContext = createContext<OrderingContextType | undefined>(undefined);

export function OrderingProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutInfo, setCheckoutInfo] = useState<CheckoutInfo | null>(null);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.product.id === item.product.id &&
        JSON.stringify(i.customizations) === JSON.stringify(item.customizations)
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      }

      return [...prev, item];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <OrderingContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedProduct,
        setSelectedProduct,
        checkoutInfo,
        setCheckoutInfo,
      }}
    >
      {children}
    </OrderingContext.Provider>
  );
}

export function useOrdering() {
  const context = useContext(OrderingContext);
  if (!context) {
    throw new Error("useOrdering must be used within OrderingProvider");
  }
  return context;
}
