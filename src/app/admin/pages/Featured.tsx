import { useEffect, useState } from "react";
import { AdminLayout } from "../components/AdminLayout";
import { getAllProducts, updateProduct, FirebaseProduct } from "../../../services/productService";
import { Star, Eye, Package } from "lucide-react";
import { Button } from "../../components/ui/button";
import { motion } from "motion/react";

export function Featured() {
  const [products, setProducts] = useState<FirebaseProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFeatured = async (product: FirebaseProduct) => {
    if (!product.id) return;
    
    setUpdating(product.id);
    try {
      await updateProduct(product.id, {
        ...product,
        featured: !product.featured,
      });
      await loadProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setUpdating(null);
    }
  };

  const featuredProducts = products.filter((p) => p.featured);
  const nonFeaturedProducts = products.filter((p) => !p.featured);

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
          <h1 className="text-3xl font-semibold text-[#2A1B14] mb-2">Featured Products</h1>
          <p className="text-[#6B5D52]">Manage products displayed in the Featured Creations section</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#A67C52]/10">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#6B5D52]">Featured Products</p>
                <p className="text-2xl font-bold text-[#2A1B14]">{featuredProducts.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#A67C52]/10">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#6B5D52]">Available Products</p>
                <p className="text-2xl font-bold text-[#2A1B14]">{nonFeaturedProducts.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#A67C52]/10">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Eye className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#6B5D52]">Visible on Website</p>
                <p className="text-2xl font-bold text-[#2A1B14]">{featuredProducts.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-[#2A1B14] flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" />
              Currently Featured
            </h2>
          </div>

          {featuredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-[#A67C52]/10">
              <Star className="w-16 h-16 text-[#A67C52]/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#2A1B14] mb-2">No Featured Products</h3>
              <p className="text-[#6B5D52]">Select products below to feature them on your website</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(166,124,82,0.12)] hover:shadow-[0_8px_24px_rgba(166,124,82,0.2)] transition-all duration-300 border border-[#A67C52]/10"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-[#FAF7F2]">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-yellow-500 text-white text-xs rounded-full font-semibold flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Featured
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-white/95 backdrop-blur-sm text-[#A67C52] text-xs rounded-full font-semibold">
                        {product.badge}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-[#2A1B14] line-clamp-1">
                        {product.title}
                      </h3>
                      {product.price && (
                        <span className="text-sm font-bold text-[#A67C52] whitespace-nowrap">
                          {product.price}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#6B5D52] mb-2">{product.category}</p>
                    <p className="text-sm text-[#4A3A32] line-clamp-2 mb-4">
                      {product.description}
                    </p>

                    {/* Action */}
                    <Button
                      onClick={() => toggleFeatured(product)}
                      disabled={updating === product.id}
                      variant="outline"
                      size="sm"
                      className="w-full border-red-500 text-red-500 hover:bg-red-50"
                    >
                      {updating === product.id ? (
                        <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                      ) : (
                        <Star className="w-4 h-4 mr-2 fill-red-500" />
                      )}
                      Remove from Featured
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Available Products Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-[#2A1B14] flex items-center gap-2">
              <Package className="w-6 h-6 text-[#A67C52]" />
              Available Products
            </h2>
          </div>

          {nonFeaturedProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-[#A67C52]/10">
              <Package className="w-16 h-16 text-[#A67C52]/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#2A1B14] mb-2">All Products Featured</h3>
              <p className="text-[#6B5D52]">All your products are currently featured</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nonFeaturedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(166,124,82,0.12)] hover:shadow-[0_8px_24px_rgba(166,124,82,0.2)] transition-all duration-300 border border-[#A67C52]/10"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-[#FAF7F2]">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    {product.demo && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full font-semibold">
                          Demo
                        </span>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-white/95 backdrop-blur-sm text-[#A67C52] text-xs rounded-full font-semibold">
                        {product.badge}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-[#2A1B14] line-clamp-1">
                        {product.title}
                      </h3>
                      {product.price && (
                        <span className="text-sm font-bold text-[#A67C52] whitespace-nowrap">
                          {product.price}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#6B5D52] mb-2">{product.category}</p>
                    <p className="text-sm text-[#4A3A32] line-clamp-2 mb-4">
                      {product.description}
                    </p>

                    {/* Action */}
                    <Button
                      onClick={() => toggleFeatured(product)}
                      disabled={updating === product.id}
                      size="sm"
                      className="w-full bg-[#A67C52] hover:bg-[#8B6B3E] text-white"
                    >
                      {updating === product.id ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      ) : (
                        <Star className="w-4 h-4 mr-2" />
                      )}
                      Add to Featured
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
