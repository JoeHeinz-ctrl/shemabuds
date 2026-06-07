import { useState, useEffect, useRef } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { CloudinaryImageUpload } from "../../../components/CloudinaryImageUpload";
import { addProduct, updateProduct, FirebaseProduct, getCategories } from "../../../services/productService";
import { motion, AnimatePresence } from "motion/react";

// Cloudinary config for additional images upload
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "diy2kkxyu";
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "shemabuds_products";

interface ProductModalProps {
  product: FirebaseProduct | null;
  onClose: (refresh: boolean) => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [dbCategories, setDbCategories] = useState<string[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
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
    // Load categories from database
    const loadCategories = async () => {
      try {
        const cats = await getCategories();
        setDbCategories(cats);
      } catch (err) {
        console.error("Error loading categories:", err);
      } finally {
        setCategoriesLoading(false);
      }
    };
    loadCategories();
  }, []);

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

  // Upload additional image(s) via Cloudinary
  const hiddenFileInputRef = useRef<HTMLInputElement>(null);

  const uploadAdditionalImage = async (file: File) => {
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      formDataUpload.append('cloud_name', CLOUDINARY_CLOUD_NAME);
      formDataUpload.append('folder', 'shemabuds/products');
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formDataUpload,
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error?.message || `Upload failed (${response.status})`);
      }
      const data = await response.json();
      const imageUrl = data.secure_url;
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), imageUrl],
      }));
    } catch (e: any) {
      console.error('Additional image upload error:', e);
      setError(e.message || 'Failed to upload additional image');
    }
  };

  const handleAddImageClick = () => {
    hiddenFileInputRef.current?.click();
  };

  const handleAdditionalFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      await uploadAdditionalImage(files[i]);
    }
    // Reset input
    e.target.value = '';
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
                  disabled={categoriesLoading}
                >
                  <option value="">{categoriesLoading ? "Loading categories..." : "Select category"}</option>
                  {dbCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
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

            {/* Main Image - Cloudinary Upload */}
            <CloudinaryImageUpload
              currentImageUrl={formData.image}
              onImageUploaded={(url) => setFormData({ ...formData, image: url })}
              label="Main Image"
            />

            {/* Additional Images */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-[#4A3A32] font-medium">Additional Images</Label>
                <Button
                  type="button"
                  onClick={handleAddImageClick}
                  size="sm"
                  variant="outline"
                  className="border-[#A67C52] text-[#A67C52]"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Image
                </Button>
              </div>
              {/* Hidden file input for additional images */}
              <input
                ref={hiddenFileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="hidden"
                onChange={handleAdditionalFileSelect}
              />
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
