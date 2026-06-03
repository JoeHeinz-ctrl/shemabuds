import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Package, Clock, CheckCircle, XCircle, Truck, LogIn } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { AuthModal } from "./AuthModal";
import { Button } from "./ui/button";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

interface Order {
  id: string;
  orderNumber: string;
  createdAt: any;
  status: string;
  items: any[];
  estimatedTotal: number;
  customerName: string;
  deliveryMethod: string;
}

export function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    console.log("🔥 [MyOrders] useEffect triggered");
    console.log("🔥 [MyOrders] User object:", user);
    console.log("🔥 [MyOrders] User UID:", user?.uid);
    console.log("🔥 [MyOrders] User email:", user?.email);
    console.log("🔥 [MyOrders] User displayName:", user?.displayName);
    
    if (!user) {
      console.log("⚠️ [MyOrders] No user logged in, clearing orders");
      setLoading(false);
      setOrders([]);
      return;
    }

    console.log("📱 [MyOrders] Setting up orders listener for user:", user.uid);
    console.log("📱 [MyOrders] Firestore query: orders where userId ==", user.uid);

    const ordersQuery = query(
      collection(db, "orders"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    console.log("📱 [MyOrders] Query created, subscribing to snapshot...");

    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      console.log("📱 [MyOrders] ✅ Snapshot received!");
      console.log("📱 [MyOrders] Snapshot size:", snapshot.size);
      console.log("📱 [MyOrders] Snapshot empty:", snapshot.empty);
      console.log("📱 [MyOrders] Snapshot docs:", snapshot.docs.length);
      
      const ordersData = snapshot.docs.map((doc) => {
        const data = doc.data();
        console.log("📱 [MyOrders] Order document:", {
          id: doc.id,
          userId: data.userId,
          orderNumber: data.orderNumber,
          customerName: data.customerName,
          status: data.status,
          createdAt: data.createdAt
        });
        return {
          id: doc.id,
          ...data,
        };
      }) as Order[];
      
      console.log("📱 [MyOrders] Final ordersData array:", ordersData);
      setOrders(ordersData);
      setLoading(false);
    }, (error) => {
      console.error("❌ [MyOrders] Error fetching orders:", error);
      console.error("❌ [MyOrders] Error code:", error.code);
      console.error("❌ [MyOrders] Error message:", error.message);
      console.error("❌ [MyOrders] Error stack:", error.stack);
      setLoading(false);
    });

    console.log("📱 [MyOrders] Snapshot listener attached");
    return () => {
      console.log("📱 [MyOrders] Cleaning up snapshot listener");
      unsubscribe();
    };
  }, [user]);

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { icon: any; color: string; bg: string; label: string }> = {
      new: { icon: Clock, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-500/10", label: "Pending" },
      pending: { icon: Clock, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-500/10", label: "Pending" },
      confirmed: { icon: CheckCircle, color: "text-green-600 dark:text-green-400", bg: "bg-green-500/10", label: "Confirmed" },
      in_progress: { icon: Truck, color: "text-primary", bg: "bg-primary/10", label: "In Progress" },
      ready: { icon: Package, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-500/10", label: "Ready" },
      delivered: { icon: CheckCircle, color: "text-green-600 dark:text-green-400", bg: "bg-green-500/10", label: "Delivered" },
      completed: { icon: CheckCircle, color: "text-green-600 dark:text-green-400", bg: "bg-green-500/10", label: "Completed" },
      cancelled: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10", label: "Cancelled" },
    };
    return configs[status.toLowerCase()] || configs.pending;
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    if (filter === "pending") return ["new", "pending", "confirmed", "in_progress", "ready"].includes(order.status.toLowerCase());
    if (filter === "completed") return ["delivered", "completed"].includes(order.status.toLowerCase());
    return true;
  });

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "short", 
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (!user) {
    return (
      <>
        <section id="orders" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="glass-strong rounded-3xl p-12 shadow-luxury-lg">
                <div className="bg-muted w-24 h-24 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <LogIn className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">My Orders</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                  Please sign in to view your orders and track your purchases.
                </p>
                <Button
                  onClick={() => setShowAuthModal(true)}
                  size="lg"
                  className="text-lg px-8"
                >
                  Sign In / Sign Up
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
        
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </>
    );
  }

  if (loading) {
    return (
      <section id="orders" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-foreground mb-8 text-center">My Orders</h2>
          <div className="flex items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="orders" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">My Orders</h2>
          <p className="text-lg text-muted-foreground">Track and manage your orders</p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {(["all", "pending", "completed"] as const).map((filterOption) => (
            <motion.button
              key={filterOption}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFilter(filterOption)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                filter === filterOption
                  ? "bg-primary text-primary-foreground shadow-luxury"
                  : "glass text-muted-foreground hover:bg-muted"
              }`}
            >
              {filterOption === "all" ? "All Orders" : filterOption === "pending" ? "Active" : "Completed"}
            </motion.button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong rounded-3xl p-12 text-center shadow-luxury-lg"
          >
            <div className="bg-muted w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Package className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">No Orders Yet</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              {filter === "all" 
                ? "You haven't placed any orders yet. Start shopping!"
                : filter === "pending"
                ? "You don't have any active orders at the moment."
                : "You don't have any completed orders yet."}
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-6">
            {filteredOrders.map((order, index) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="glass-strong rounded-3xl p-6 shadow-luxury hover:shadow-luxury-lg transition-all"
                >
                  {/* Order Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-foreground">
                          Order #{order.orderNumber || order.id.slice(-6).toUpperCase()}
                        </h3>
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusConfig.bg}`}>
                          <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                          <span className={`text-sm font-medium ${statusConfig.color}`}>
                            {statusConfig.label}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    {order.estimatedTotal > 0 && (
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Estimated Total</p>
                        <p className="text-2xl font-bold text-primary">
                          ₹{order.estimatedTotal.toLocaleString("en-IN")}+
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Order Items */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex gap-3 p-3 bg-muted/50 rounded-xl">
                        {item.product?.image && (
                          <img
                            src={item.product.image}
                            alt={item.product.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {item.product?.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {order.deliveryMethod === "pickup" ? "📦 Pickup" : "🚚 Delivery"}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {order.items.length} item(s)
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
