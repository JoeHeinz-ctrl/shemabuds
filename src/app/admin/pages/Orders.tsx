import { useEffect, useState } from "react";
import { AdminLayout } from "../components/AdminLayout";
import { getAllOrders, updateOrderStatus, Order, OrderStatus } from "../../../services/orderService";
import { ShoppingCart, Clock, CheckCircle, XCircle, Package } from "lucide-react";
import { Button } from "../../components/ui/button";
import { motion } from "motion/react";

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      console.log("🔍 Fetching orders from Firestore...");
      const data = await getAllOrders();
      console.log("📦 Orders received:", data.length);
      console.log("📋 Orders data:", data);
      setOrders(data);
    } catch (error) {
      console.error("❌ Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: string, status: OrderStatus) => {
    try {
      await updateOrderStatus(orderId, status);
      await loadOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const filteredOrders = filter === "all" 
    ? orders 
    : orders.filter(order => order.status === filter);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-700";
      case "confirmed": return "bg-green-100 text-green-700";
      case "completed": return "bg-gray-100 text-gray-700";
      case "cancelled": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "new": return Clock;
      case "confirmed": return Package;
      case "completed": return CheckCircle;
      case "cancelled": return XCircle;
      default: return Clock;
    }
  };

  const stats = {
    total: orders.length,
    new: orders.filter(o => o.status === "new").length,
    confirmed: orders.filter(o => o.status === "confirmed").length,
    completed: orders.filter(o => o.status === "completed").length,
    cancelled: orders.filter(o => o.status === "cancelled").length,
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <div className="w-16 h-16 border-4 border-[#A67C52] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[#2A1B14] mb-2">Orders</h1>
            <p className="text-[#6B5D52]">Manage customer orders</p>
          </div>
          <Button
            onClick={loadOrders}
            className="bg-[#A67C52] hover:bg-[#8B6B3E] text-white"
          >
            Refresh Orders
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#A67C52]/10">
            <p className="text-sm text-[#6B5D52] mb-1">Total</p>
            <p className="text-2xl font-bold text-[#2A1B14]">{stats.total}</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 shadow-sm border border-blue-200">
            <p className="text-sm text-blue-700 mb-1">New</p>
            <p className="text-2xl font-bold text-blue-900">{stats.new}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 shadow-sm border border-green-200">
            <p className="text-sm text-green-700 mb-1">Confirmed</p>
            <p className="text-2xl font-bold text-green-900">{stats.confirmed}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-700 mb-1">Completed</p>
            <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
          </div>
          <div className="bg-red-50 rounded-xl p-4 shadow-sm border border-red-200">
            <p className="text-sm text-red-700 mb-1">Cancelled</p>
            <p className="text-2xl font-bold text-red-900">{stats.cancelled}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["all", "new", "confirmed", "completed", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as OrderStatus | "all")}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                filter === status
                  ? "bg-[#A67C52] text-white"
                  : "bg-white text-[#4A3A32] border border-[#A67C52]/20 hover:bg-[#A67C52]/10"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order, index) => {
            const StatusIcon = getStatusIcon(order.status);
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-[0_4px_16px_rgba(166,124,82,0.12)] border border-[#A67C52]/10"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(order.status)}`}>
                        <StatusIcon className="w-3 h-3" />
                        {order.status.toUpperCase()}
                      </span>
                      <span className="text-sm text-[#6B5D52]">
                        {order.createdAt && new Date(order.createdAt.toDate()).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-[#2A1B14] mb-2">
                      {order.customerName}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-[#6B5D52]">
                      <div>
                        <span className="font-medium">Phone:</span> {order.phone}
                      </div>
                      <div>
                        <span className="font-medium">WhatsApp:</span> {order.whatsapp}
                      </div>
                      <div>
                        <span className="font-medium">Event Date:</span> {order.eventDate}
                      </div>
                      <div>
                        <span className="font-medium">Delivery:</span> {order.deliveryMethod === "pickup" ? "Pickup" : "Home Delivery"}
                      </div>
                    </div>

                    {order.address && (
                      <div className="mt-2 text-sm text-[#6B5D52]">
                        <span className="font-medium">Address:</span> {order.address}
                      </div>
                    )}

                    {/* Items */}
                    <div className="mt-3 space-y-2">
                      <p className="text-sm font-medium text-[#2A1B14]">Items:</p>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="text-sm text-[#6B5D52] pl-4">
                          • {item.product.title} (x{item.quantity})
                          {Object.keys(item.customizations).length > 0 && (
                            <span className="text-xs ml-2">
                              - {Object.entries(item.customizations).map(([k, v]) => `${k}: ${v}`).join(", ")}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    {order.estimatedTotal > 0 && (
                      <div className="mt-3 text-lg font-bold text-[#A67C52]">
                        Estimated Total: ₹{order.estimatedTotal.toLocaleString('en-IN')}+
                      </div>
                    )}

                    {order.additionalNotes && (
                      <div className="mt-3 p-3 bg-[#FAF7F2] rounded-lg text-sm text-[#4A3A32]">
                        <span className="font-medium">Notes:</span> {order.additionalNotes}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex lg:flex-col gap-2">
                    {order.status === "new" && (
                      <Button
                        onClick={() => handleStatusUpdate(order.id!, "confirmed")}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Confirm
                      </Button>
                    )}
                    {order.status === "confirmed" && (
                      <Button
                        onClick={() => handleStatusUpdate(order.id!, "completed")}
                        size="sm"
                        className="bg-gray-600 hover:bg-gray-700 text-white"
                      >
                        Complete
                      </Button>
                    )}
                    {(order.status === "new" || order.status === "confirmed") && (
                      <Button
                        onClick={() => handleStatusUpdate(order.id!, "cancelled")}
                        size="sm"
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-50"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-[#A67C52]/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#2A1B14] mb-2">No orders found</h3>
            <p className="text-[#6B5D52]">
              {filter === "all" ? "No orders yet" : `No ${filter} orders`}
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
