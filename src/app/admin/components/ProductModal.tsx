import { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { addProduct, updateProduct, FirebaseProduct } from "../../../services/productService";
import { motion, AnimatePresence } from "motion/react";

interface ProductModalProps {
  product: FirebaseProduct | null;
  onClose: (refresh: boolean) => void;
}

const SUGGESTED_CATEGORIES = [
  "Bouquets",
  "Handmade Gifts",
  "Event Decorations",
  "Wedding Accessories",
  "Custom Orders",
  "Boutique Collection",
];

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [formData, setFormData] = useState<Partial<FirebaseProduct>>({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    images: [],
    badge: "",
    demo: false,
    featured: false,
    customizationOptions: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newOption, setNewOption] = useState({ label: "", options: "" });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (product?.id) {
        await updateProduct(product.id, formData);
      } else {
        await addProduct(formData as Omit<FirebaseProduct, 'id'>);
      }
      onClose(true);
    } catch (err: any) {
      setError(err.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  const addCustomizationOption = () => {
    if (newOption.label && newOption.options) {
      const options = newOption.options.split(",").map((o) => o.trim());
      setFormData({
        ...formData,
        customizationOptions: [
          ...(formData.customizationOptions || []),
          { label: newOption.label, options },
        ],
      });
      setNewOption({ label: "", options: "" });
    }
  };

  const removeCustomizationOption = (index: number) => {
    setFormData({
      ...formData,
      customizationOptions: formData.customizationOptions?.filter((_, i) => i !== index),
    });
  };

  const addImage = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      setFormData({
        ...formData,
        images: [...(formData.images || []), url],
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images?.filter((_, i) => i !== index),
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A1B14]/60 backdrop-blur-md overflow-y-auto"
        onClick={() => onClose(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full my-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#A67C52]/10">
            <h2 className="text-2xl font-semibold text-[#2A1B14]">
              {product ? "Edit Product" : "Add New Product"}
            </h2>
            <button
              onClick={() => onClose(false)}
              className="p-2 hover:bg-[#FAF7F2] rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-[#4A3A32]" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(90vh-200px)] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div>
                <Label className="text-[#4A3A32] font-medium">Product Name *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Bridal Bouquet"
                  className="mt-2 bg-[#FEFDFB] border-[#A67C52]/20 focus:border-[#A67C52]"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <Label className="text-[#4A3A32] font-medium">Price *</Label>
                <Input
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="e.g., ₹2,500+"
                  className="mt-2 bg-[#FEFDFB] border-[#A67C52]/20 focus:border-[#A67C52]"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <Label className="text-[#4A3A32] font-medium">Category *</Label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-2 w-full px-3 py-2 bg-[#FEFDFB] border border-[#A67C52]/20 rounded-md focus:border-[#A67C52] focus:outline-none"
                  required
                >
                  <option value="">Select category</option>
                  {SUGGESTED_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                  <option value="custom">Custom (type below)</option>
                </select>
                {formData.category === "custom" && (
                  <Input
                    value={formData.category === "custom" ? "" : formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Enter custom category"
                    className="mt-2 bg-[#FEFDFB] border-[#A67C52]/20 focus:border-[#A67C52]"
                  />
                )}
              </div>

              {/* Badge */}
              <div>
                <Label className="text-[#4A3A32] font-medium">Badge *</Label>
                <Input
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="e.g., Wedding, Romance"
                  className="mt-2 bg-[#FEFDFB] border-[#A67C52]/20 focus:border-[#A67C52]"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <Label className="text-[#4A3A32] font-medium">Description *</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your product..."
                className="mt-2 bg-[#FEFDFB] border-[#A67C52]/20 focus:border-[#A67C52] min-h-[100px]"
                required
              />
            </div>

            {/* Main Image */}
            <div>
              <Label className="text-[#4A3A32] font-medium">Main Image URL *</Label>
              <Input
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="mt-2 bg-[#FEFDFB] border-[#A67C52]/20 focus:border-[#A67C52]"
                required
              />
              {formData.image && (
                <div className="mt-3">
                  <p className="text-xs text-[#6B5D52] mb-2">Preview:</p>
                  <div className="relative w-full max-w-sm mx-auto aspect-square rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#A67C52]/20">
                    <img
                      src={formData.image}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x400?text=Invalid+Image+URL";
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Additional Images */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-[#4A3A32] font-medium">Additional Images</Label>
                <Button
                  type="button"
                  onClick={addImage}
                  size="sm"
                  variant="outline"
                  className="border-[#A67C52] text-[#A67C52]"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Image
                </Button>
              </div>
              {formData.images && formData.images.length > 0 && (
                <div className="space-y-2">
                  {formData.images.map((img, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input value={img} readOnly className="flex-1 bg-[#FAF7F2]" />
                      <Button
                        type="button"
                        onClick={() => removeImage(index)}
                        size="sm"
                        variant="outline"
                        className="border-red-500 text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Customization Options */}
            <div>
              <Label className="text-[#4A3A32] font-medium mb-2 block">Customization Options</Label>
              <div className="space-y-3 mb-3">
                {formData.customizationOptions?.map((option, index) => (
                  <div key={index} className="p-3 bg-[#FAF7F2] rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-[#2A1B14] text-sm">{option.label}</p>
                        <p className="text-xs text-[#6B5D52]">{option.options.join(", ")}</p>
                      </div>
                      <Button
                        type="button"
                        onClick={() => removeCustomizationOption(index)}
                        size="sm"
                        variant="ghost"
                        className="text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  value={newOption.label}
                  onChange={(e) => setNewOption({ ...newOption, label: e.target.value })}
                  placeholder="Option label (e.g., Color Theme)"
                  className="bg-[#FEFDFB] border-[#A67C52]/20"
                />
                <div className="flex gap-2">
                  <Input
                    value={newOption.options}
                    onChange={(e) => setNewOption({ ...newOption, options: e.target.value })}
                    placeholder="Options (comma separated)"
                    className="flex-1 bg-[#FEFDFB] border-[#A67C52]/20"
                  />
                  <Button
                    type="button"
                    onClick={addCustomizationOption}
                    size="sm"
                    className="bg-[#A67C52] hover:bg-[#8B6B3E]"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Toggles */}
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.demo}
                  onChange={(e) => setFormData({ ...formData, demo: e.target.checked })}
                  className="w-4 h-4 text-[#A67C52] border-[#A67C52]/20 rounded focus:ring-[#A67C52]"
                />
                <span className="text-sm text-[#4A3A32]">Demo Product</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-[#A67C52] border-[#A67C52]/20 rounded focus:ring-[#A67C52]"
                />
                <span className="text-sm text-[#4A3A32]">Featured Product</span>
              </label>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
          </form>

          {/* Footer */}
          <div className="p-6 border-t border-[#A67C52]/10 flex gap-3">
            <Button
              type="button"
              onClick={() => onClose(false)}
              variant="outline"
              className="flex-1 border-[#A67C52] text-[#A67C52]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-[#A67C52] hover:bg-[#8B6B3E] text-white"
            >
              {loading ? "Saving..." : product ? "Update Product" : "Add Product"}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
