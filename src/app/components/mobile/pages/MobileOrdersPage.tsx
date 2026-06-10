import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Package, Clock, CheckCircle, XCircle, Truck, ChevronRight, LogIn } from "lucide-react";
import { useAuth } from "../../../../contexts/AuthContext";
import { AuthModal } from "../../AuthModal";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase";
import { Button } from "../../ui/button";

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

export function MobileOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setOrders([]);
      return;
    }

    console.log("📱 [MobileOrdersPage] Setting up orders listener for user:", user.uid);

    // Listen to orders for this user
    const ordersQuery = query(
      collection(db, "orders"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      console.log("📱 [MobileOrdersPage] Received snapshot with", snapshot.docs.length, "orders");
      const ordersData = snapshot.docs.map((doc) => {
        console.log("📱 [MobileOrdersPage] Order data:", doc.id, doc.data());
        return {
          id: doc.id,
          ...doc.data(),
        };
      }) as Order[];
      setOrders(ordersData);
      setLoading(false);
    }, (error) => {
      console.error("❌ [MobileOrdersPage] Error fetching orders:", error);
      console.error("❌ [MobileOrdersPage] Error code:", error.code);
      console.error("❌ [MobileOrdersPage] Error message:", error.message);
      setLoading(false);
    });

    return () => unsubscribe();
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

  if (loading) {
    return (
      <div className="md:hidden min-h-screen bg-gradient-to-b from-background to-muted pt-[76px] px-4 pb-24">
        <div className="mb-6 text-center">
          <h1 className="section-title text-2xl text-foreground">My Orders</h1>
          <p className="text-sm text-muted-foreground mt-1">Track your orders</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  // Show auth requirement if not logged in
  if (!user) {
    return (
      <>
        <div className="md:hidden min-h-screen bg-gradient-to-b from-background to-muted pt-[76px] px-4 pb-24 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-sm"
          >
            <div className="bg-muted w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <LogIn className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Sign In Required</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Please sign in to view your orders and track your purchases.
            </p>
            <Button
              onClick={() => setShowAuthModal(true)}
              className="w-full"
            >
              Sign In / Sign Up
            </Button>
          </motion.div>
        </div>
        
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </>
    );
  }

  return (
    <div className="md:hidden min-h-screen bg-gradient-to-b from-background to-muted pt-[76px] px-4 pb-24">
      {/* Page Title */}
      <div className="mb-6 text-center">
        <h1 className="section-title text-2xl text-foreground">My Orders</h1>
        <p className="text-sm text-muted-foreground mt-1">Track your orders</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {(["all", "pending", "completed"] as const).map((filterOption) => (
          <motion.button
            key={filterOption}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFilter(filterOption)}
            className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
              filter === filterOption
                ? "bg-primary text-primary-foreground shadow-luxury"
                : "bg-card text-muted-foreground hover:bg-muted"
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
          className="flex flex-col items-center justify-center py-16"
        >
          <div className="bg-muted w-20 h-20 rounded-full flex items-center justify-center mb-4">
            <Package className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No Orders Yet</h3>
          <p className="text-sm text-muted-foreground text-center max-w-sm">
            {filter === "all" 
              ? "You haven't placed any orders yet. Start shopping!"
              : filter === "pending"
              ? "You don't have any active orders at the moment."
              : "You don't have any completed orders yet."}
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order, index) => {
            const statusConfig = getStatusConfig(order.status);
            const StatusIcon = statusConfig.icon;

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.98 }}
                className="glass-strong rounded-2xl p-4 shadow-luxury cursor-pointer"
              >
                {/* Order Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-foreground">
                        Order #{order.orderNumber || order.id.slice(-6).toUpperCase()}
                      </span>
                      <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${statusConfig.bg}`}>
                        <StatusIcon className={`w-3 h-3 ${statusConfig.color}`} />
                        <span className={`text-xs font-medium ${statusConfig.color}`}>
                          {statusConfig.label}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>

                {/* Order Items Preview */}
                <div className="space-y-2 mb-3">
                  {order.items.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex gap-2">
                      {item.product?.image && (
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {item.product?.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <p className="text-xs text-muted-foreground">
                      +{order.items.length - 2} more item(s)
                    </p>
                  )}
                </div>

                {/* Order Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    {order.deliveryMethod === "pickup" ? "Pickup" : "Delivery"}
                  </span>
                  {order.estimatedTotal > 0 && (
                    <span className="text-sm font-bold text-primary">
                      ₹{order.estimatedTotal.toLocaleString("en-IN")}+
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
