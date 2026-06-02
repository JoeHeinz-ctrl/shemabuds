import { useEffect, useState } from "react";
import { AdminLayout } from "../components/AdminLayout";
import { getAllProducts, deleteProduct, FirebaseProduct } from "../../../services/productService";
import { Plus, Edit, Trash2, Star, Package } from "lucide-react";
import { Button } from "../../components/ui/button";
import { ProductModal } from "../components/ProductModal";
import { motion } from "motion/react";

// Product Card Component
interface ProductCardProps {
  product: FirebaseProduct;
  index: number;
  onEdit: (product: FirebaseProduct) => void;
  onDelete: (id: string) => void;
  deleteConfirm: string | null;
}

function ProductCard({ product, index, onEdit, onDelete, deleteConfirm }: ProductCardProps) {
  return (
    <motion.div
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
        <div className="absolute top-3 left-3 flex gap-2">
          {product.demo && (
            <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full font-semibold">
              Demo
            </span>
          )}
          {product.featured && (
            <span className="px-2 py-1 bg-yellow-500 text-white text-xs rounded-full font-semibold flex items-center gap-1">
              <Star className="w-3 h-3" />
              Featured
            </span>
          )}
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
          <span className="text-sm font-bold text-[#A67C52] whitespace-nowrap">
            {product.price}
          </span>
        </div>
        <p className="text-sm text-[#6B5D52] mb-2">{product.category}</p>
        <p className="text-sm text-[#4A3A32] line-clamp-2 mb-4">
          {product.description}
        </p>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            onClick={() => onEdit(product)}
            variant="outline"
            size="sm"
            className="flex-1 border-[#A67C52] text-[#A67C52] hover:bg-[#A67C52]/10"
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button
            onClick={() => onDelete(product.id!)}
            variant="outline"
            size="sm"
            className={`border-red-500 text-red-500 hover:bg-red-50 ${
              deleteConfirm === product.id ? "bg-red-50" : ""
            }`}
          >
            <Trash2 className="w-4 h-4 mr-1" />
            {deleteConfirm === product.id ? "Confirm?" : "Delete"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function Products() {
  const [products, setProducts] = useState<FirebaseProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<FirebaseProduct | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [hideDemoProducts, setHideDemoProducts] = useState(false);

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

  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    const category = product.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, FirebaseProduct[]>);

  const categories = Object.keys(productsByCategory).sort();
  const allCategories = ["all", ...categories];

  // Filter products based on category and demo status
  let filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category === selectedCategory);
  
  if (hideDemoProducts) {
    filteredProducts = filteredProducts.filter(p => !p.demo);
  }

  // Filter productsByCategory for demo products
  const filteredProductsByCategory = Object.keys(productsByCategory).reduce((acc, category) => {
    const categoryProducts = hideDemoProducts 
      ? productsByCategory[category].filter(p => !p.demo)
      : productsByCategory[category];
    
    if (categoryProducts.length > 0) {
      acc[category] = categoryProducts;
    }
    return acc;
  }, {} as Record<string, FirebaseProduct[]>);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: FirebaseProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (deleteConfirm === id) {
      try {
        await deleteProduct(id);
        await loadProducts();
        setDeleteConfirm(null);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const handleModalClose = async (refresh: boolean) => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    if (refresh) {
      await loadProducts();
    }
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
            <h1 className="text-3xl font-semibold text-[#2A1B14] mb-2">Products</h1>
            <p className="text-[#6B5D52]">Manage your product catalog</p>
          </div>
          <Button
            onClick={handleAddProduct}
            className="bg-[#A67C52] hover:bg-[#8B6B3E] text-white shadow-[0_4px_14px_rgba(166,124,82,0.25)]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#A67C52]/10">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#6B5D52]">Total Products</p>
                <p className="text-2xl font-bold text-[#2A1B14]">{products.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#A67C52]/10">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Package className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#6B5D52]">Categories</p>
                <p className="text-2xl font-bold text-[#2A1B14]">{categories.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#A67C52]/10">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Star className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#6B5D52]">Featured</p>
                <p className="text-2xl font-bold text-[#2A1B14]">
                  {products.filter((p) => p.featured).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#A67C52]/10">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Package className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#6B5D52]">Demo Products</p>
                <p className="text-2xl font-bold text-[#2A1B14]">
                  {products.filter((p) => p.demo).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? "bg-[#A67C52] text-white shadow-[0_4px_14px_rgba(166,124,82,0.25)]"
                  : "bg-white text-[#4A3A32] border border-[#A67C52]/20 hover:bg-[#A67C52]/10"
              }`}
            >
              {category === "all" ? "All Products" : category}
              {category !== "all" && (
                <span className="ml-2 text-xs opacity-75">
                  ({productsByCategory[category]?.length || 0})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Demo Products Toggle */}
        <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-[#A67C52]/10">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-lg">
              <Package className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="font-semibold text-[#2A1B14]">Demo Products</p>
              <p className="text-sm text-[#6B5D52]">
                {hideDemoProducts ? "Hidden" : "Visible"} ({products.filter(p => p.demo).length} demo products)
              </p>
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm text-[#4A3A32]">Hide Demo</span>
            <input
              type="checkbox"
              checked={hideDemoProducts}
              onChange={(e) => setHideDemoProducts(e.target.checked)}
              className="w-5 h-5 text-[#A67C52] border-[#A67C52]/20 rounded focus:ring-[#A67C52]"
            />
          </label>
        </div>

        {/* Products by Category */}
        {selectedCategory === "all" ? (
          // Show all products grouped by category
          <div className="space-y-8">
            {Object.keys(filteredProductsByCategory).sort().map((category) => (
              <div key={category} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-[#2A1B14]">
                    {category}
                    <span className="ml-3 text-sm font-normal text-[#6B5D52]">
                      ({filteredProductsByCategory[category].length} products)
                    </span>
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProductsByCategory[category].map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                      onEdit={handleEditProduct}
                      onDelete={handleDeleteProduct}
                      deleteConfirm={deleteConfirm}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Show filtered products
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
                deleteConfirm={deleteConfirm}
              />
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-[#A67C52]/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#2A1B14] mb-2">
              {hideDemoProducts ? "No products found" : "No products yet"}
            </h3>
            <p className="text-[#6B5D52] mb-4">
              {hideDemoProducts 
                ? "All products are demo products. Uncheck 'Hide Demo' to see them."
                : "Get started by adding your first product"}
            </p>
            {!hideDemoProducts && (
              <Button
                onClick={handleAddProduct}
                className="bg-[#A67C52] hover:bg-[#8B6B3E] text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <ProductModal
          product={selectedProduct}
          onClose={handleModalClose}
        />
      )}
    </AdminLayout>
  );
}
