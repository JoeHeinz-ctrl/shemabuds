import { useState, useRef } from "react";
import { Upload, X, Check, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "../app/components/ui/button";
import { motion, AnimatePresence } from "motion/react";

interface CloudinaryImageUploadProps {
  currentImageUrl?: string;
  onImageUploaded: (url: string) => void;
  label?: string;
}

// Cloudinary configuration - update these with your values
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "diy2kkxyu";
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "shemabuds_products";

export function CloudinaryImageUpload({
  currentImageUrl,
  onImageUploaded,
  label = "Main Image"
}: CloudinaryImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload JPG, PNG, or WEBP image only");
      return;
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      setError("Image size must be less than 10MB");
      return;
    }

    // Upload to Cloudinary
    await uploadToCloudinary(file);
  };

  const uploadToCloudinary = async (file: File) => {
    setUploading(true);
    setError("");
    setUploadSuccess(false);

    // Debug logging
    console.log("Cloudinary Config:", {
      cloudName: CLOUDINARY_CLOUD_NAME,
      uploadPreset: CLOUDINARY_UPLOAD_PRESET,
      uploadUrl: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
    });

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("cloud_name", CLOUDINARY_CLOUD_NAME);
      formData.append("folder", "shemabuds/products"); // Organize uploads in folders

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Cloudinary error response:", errorData);
        throw new Error(errorData.error?.message || `Upload failed (${response.status})`);
      }

      const data = await response.json();
      
      // Get the secure URL from Cloudinary
      const imageUrl = data.secure_url;
      
      setPreviewUrl(imageUrl);
      setUploadSuccess(true);
      onImageUploaded(imageUrl);

      // Clear success message after 3 seconds
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (err: any) {
      console.error("Cloudinary upload error:", err);
      setError(err.message || "Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setPreviewUrl("");
    setUploadSuccess(false);
    onImageUploaded("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      {/* Label */}
      <div className="flex items-center justify-between">
        <label className="text-[#4A3A32] font-medium">
          {label} *
        </label>
        {previewUrl && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Remove
          </button>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Upload Area */}
      <div className="space-y-3">
        {!previewUrl ? (
          // Upload Button (no image)
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleUploadClick}
            className="relative cursor-pointer"
          >
            <div className="border-2 border-dashed border-[#A67C52]/30 rounded-xl p-8 bg-[#FAF7F2] hover:bg-[#F5EFE7] hover:border-[#A67C52]/50 transition-all text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[#A67C52]/10 flex items-center justify-center">
                  {uploading ? (
                    <Loader2 className="w-8 h-8 text-[#A67C52] animate-spin" />
                  ) : (
                    <Upload className="w-8 h-8 text-[#A67C52]" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-[#2A1B14] mb-1">
                    {uploading ? "Uploading..." : "Upload Main Image"}
                  </p>
                  <p className="text-xs text-[#6B5D52]">
                    JPG, PNG or WEBP • Max 10MB
                  </p>
                  <p className="text-xs text-[#6B5D52] mt-1">
                    Click to select from {window.navigator.userAgent.includes('Mobile') ? 'gallery' : 'files'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          // Image Preview (with image)
          <div className="space-y-3">
            <div className="relative w-full max-w-sm mx-auto aspect-square rounded-xl overflow-hidden bg-[#FAF7F2] border-2 border-[#A67C52]/20">
              <img
                src={previewUrl}
                alt="Product preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x400?text=Failed+to+Load";
                }}
              />
              {uploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Loader2 className="w-12 h-12 text-white animate-spin" />
                </div>
              )}
            </div>
            
            {/* Change Image Button */}
            <Button
              type="button"
              onClick={handleUploadClick}
              variant="outline"
              disabled={uploading}
              className="w-full border-[#A67C52] text-[#A67C52] hover:bg-[#A67C52]/10"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Change Image
            </Button>
          </div>
        )}
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {uploadSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg"
          >
            <Check className="w-5 h-5 text-green-600" />
            <p className="text-sm text-green-700 font-medium">Image uploaded successfully!</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg"
        >
          <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </motion.div>
      )}

      {/* Upload Progress Bar */}
      {uploading && (
        <div className="space-y-2">
          <div className="h-1.5 bg-[#FAF7F2] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-full bg-[#A67C52]"
            />
          </div>
          <p className="text-xs text-center text-[#6B5D52]">Uploading to cloud storage...</p>
        </div>
      )}

      {/* Info Text */}
      <p className="text-xs text-[#6B5D52]">
        📸 Tip: Use high-quality images with good lighting for best results
      </p>
    </div>
  );
}
