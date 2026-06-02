import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminLayout } from "../components/AdminLayout";
import { getAllProducts, getFeaturedProducts } from "../../../services/productService";
import { getOrderStats } from "../../../services/orderService";
import { Package, ShoppingCart, Clock, Star } from "lucide-react";
import { motion } from "motion/react";

export function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    featuredProducts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [products, orderStats, featured] = await Promise.all([
        getAllProducts(),
        getOrderStats(),
        getFeaturedProducts(),
      ]);

      setStats({
        totalProducts: products.length,
        totalOrders: orderStats.total,
        pendingOrders: orderStats.pending,
        featuredProducts: featured.length,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      color: "bg-blue-500",
      link: "/admin/products",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "bg-green-500",
      link: "/admin/orders",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: Clock,
      color: "bg-orange-500",
      link: "/admin/orders",
    },
    {
      title: "Featured Products",
      value: stats.featuredProducts,
      icon: Star,
      color: "bg-purple-500",
      link: "/admin/products",
    },
  ];

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
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-[#2A1B14] mb-2">Dashboard</h1>
          <p className="text-[#6B5D52]">Welcome to Shemabuds Admin Dashboard</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link to={card.link}>
                  <div className="bg-white rounded-2xl p-6 shadow-[0_4px_16px_rgba(166,124,82,0.12)] hover:shadow-[0_8px_24px_rgba(166,124,82,0.2)] transition-all duration-300 border border-[#A67C52]/10">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${card.color} p-3 rounded-xl`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-[#2A1B14] mb-1">{card.value}</h3>
                    <p className="text-sm text-[#6B5D52]">{card.title}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_16px_rgba(166,124,82,0.12)] border border-[#A67C52]/10">
          <h2 className="text-xl font-semibold text-[#2A1B14] mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link
              to="/admin/products"
              className="p-4 bg-[#FAF7F2] rounded-xl hover:bg-[#E8C4B4] transition-colors"
            >
              <Package className="w-6 h-6 text-[#A67C52] mb-2" />
              <h3 className="font-semibold text-[#2A1B14]">Manage Products</h3>
              <p className="text-sm text-[#6B5D52]">Add, edit, or delete products</p>
            </Link>
            <Link
              to="/admin/orders"
              className="p-4 bg-[#FAF7F2] rounded-xl hover:bg-[#E8C4B4] transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-[#A67C52] mb-2" />
              <h3 className="font-semibold text-[#2A1B14]">View Orders</h3>
              <p className="text-sm text-[#6B5D52]">Manage customer orders</p>
            </Link>
            <Link
              to="/admin/featured"
              className="p-4 bg-[#FAF7F2] rounded-xl hover:bg-[#E8C4B4] transition-colors"
            >
              <Star className="w-6 h-6 text-[#A67C52] mb-2" />
              <h3 className="font-semibold text-[#2A1B14]">Featured Products</h3>
              <p className="text-sm text-[#6B5D52]">Manage featured section</p>
            </Link>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-[#FAF7F2] rounded-xl hover:bg-[#E8C4B4] transition-colors"
            >
              <Star className="w-6 h-6 text-[#A67C52] mb-2" />
              <h3 className="font-semibold text-[#2A1B14]">View Website</h3>
              <p className="text-sm text-[#6B5D52]">See your live website</p>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
