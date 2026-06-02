import { 
  collection, 
  getDocs, 
  getDoc,
  doc,
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp
} from "firebase/firestore";
import { db } from "../firebase";
import { CartItem } from "../app/components/OrderingSystem";

export type OrderStatus = "new" | "confirmed" | "completed" | "cancelled";

export interface Order {
  id?: string;
  customerName: string;
  phone: string;
  whatsapp: string;
  deliveryMethod: "pickup" | "delivery";
  address?: string;
  eventDate: string;
  additionalNotes?: string;
  items: CartItem[];
  estimatedTotal: number;
  status: OrderStatus;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

const ORDERS_COLLECTION = "orders";

// Get all orders
export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Order));
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

// Get single order
export const getOrder = async (id: string): Promise<Order | null> => {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Order;
    }
    return null;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
};

// Add new order
export const addOrder = async (order: Omit<Order, 'id'>): Promise<string | null> => {
  try {
    // Serialize the order data to ensure it's Firestore-compatible
    // Remove any undefined values
    const orderData = {
      customerName: order.customerName || "",
      phone: order.phone || "",
      whatsapp: order.whatsapp || "",
      deliveryMethod: order.deliveryMethod || "pickup",
      address: order.address || "",
      eventDate: order.eventDate || "",
      additionalNotes: order.additionalNotes || "",
      // Serialize items to plain objects, removing undefined values
      items: (order.items || []).map(item => ({
        product: {
          id: item.product?.id || "",
          title: item.product?.title || "",
          description: item.product?.description || "",
          image: item.product?.image || "",
          badge: item.product?.badge || "",
          category: item.product?.category || "",
          price: item.product?.price || "",
        },
        quantity: item.quantity || 1,
        customizations: item.customizations || {},
        notes: item.notes || "",
      })),
      estimatedTotal: order.estimatedTotal || 0,
      status: order.status || "new",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    console.log("📦 Serialized order data:", JSON.stringify(orderData, null, 2));
    
    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), orderData);
    console.log("✅ Document created with ID:", docRef.id);
    return docRef.id;
  } catch (error: any) {
    console.error("❌ Error adding order:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    throw error;  // Re-throw to let caller handle it
  }
};

// Update order status
export const updateOrderStatus = async (id: string, status: OrderStatus): Promise<boolean> => {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, id);
    await updateDoc(docRef, {
      status,
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error("Error updating order status:", error);
    return false;
  }
};

// Update order
export const updateOrder = async (id: string, order: Partial<Order>): Promise<boolean> => {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, id);
    await updateDoc(docRef, {
      ...order,
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error("Error updating order:", error);
    return false;
  }
};

// Delete order
export const deleteOrder = async (id: string): Promise<boolean> => {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting order:", error);
    return false;
  }
};

// Get orders by status
export const getOrdersByStatus = async (status: OrderStatus): Promise<Order[]> => {
  try {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      where("status", "==", status),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Order));
  } catch (error) {
    console.error("Error fetching orders by status:", error);
    return [];
  }
};

// Get order statistics
export const getOrderStats = async () => {
  try {
    const orders = await getAllOrders();
    
    return {
      total: orders.length,
      new: orders.filter(o => o.status === "new").length,
      confirmed: orders.filter(o => o.status === "confirmed").length,
      completed: orders.filter(o => o.status === "completed").length,
      cancelled: orders.filter(o => o.status === "cancelled").length,
      pending: orders.filter(o => o.status === "new" || o.status === "confirmed").length
    };
  } catch (error) {
    console.error("Error fetching order stats:", error);
    return {
      total: 0,
      new: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
      pending: 0
    };
  }
};
