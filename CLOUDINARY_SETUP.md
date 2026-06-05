# Cloudinary Image Upload Setup Guide

## 🎯 Overview

The admin product form now uses **Cloudinary** for direct image uploads instead of manual URL entry.

## ✨ Features

- ✅ Direct image upload from mobile gallery or desktop files
- ✅ Real-time upload progress indicator
- ✅ Image preview before and after upload
- ✅ Support for JPG, PNG, WEBP formats
- ✅ Maximum file size: 10MB
- ✅ Automatic cloud storage and CDN delivery
- ✅ Mobile-first responsive design
- ✅ Success/error feedback messages
- ✅ Edit existing product images

---

## 📋 Setup Instructions

### Step 1: Create Cloudinary Account

1. Go to [Cloudinary.com](https://cloudinary.com/)
2. Click **"Sign Up for Free"**
3. Create an account (free tier includes 25GB storage)
4. Verify your email

### Step 2: Get Your Credentials

After signing in:

1. Go to **Dashboard** → You'll see:
   - **Cloud Name**: (e.g., `dxyz123abc`)
   - **API Key**: (e.g., `123456789012345`)
   - **API Secret**: (keep this secret!)

2. Note down your **Cloud Name** - you'll need it!

### Step 3: Create Upload Preset

1. In Cloudinary Dashboard, go to **Settings** (gear icon)
2. Click **Upload** tab
3. Scroll to **Upload presets** section
4. Click **"Add upload preset"**

5. Configure the preset:
   ```
   Preset name: shemabuds_products
   Signing Mode: Unsigned
   Folder: shemabuds/products
   
   Allowed formats: jpg, png, webp
   Max file size: 10485760 (10MB in bytes)
   
   Transformations (optional):
   - Quality: auto
   - Format: auto
   ```

6. Click **Save**

7. Note down the **Preset name**: `shemabuds_products`

### Step 4: Add to Environment Variables

1. Open your `.env` file (create if doesn't exist)

2. Add these lines:
   ```env
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
   VITE_CLOUDINARY_UPLOAD_PRESET=shemabuds_products
   ```

3. Replace `your_cloud_name_here` with your actual Cloud Name from Step 2

4. Example `.env` file:
   ```env
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=shemabuds...
   VITE_FIREBASE_PROJECT_ID=shemabuds...
   VITE_FIREBASE_STORAGE_BUCKET=shemabuds...
   VITE_FIREBASE_MESSAGING_SENDER_ID=395827...
   VITE_FIREBASE_APP_ID=1:395827...
   
   # Cloudinary Configuration
   VITE_CLOUDINARY_CLOUD_NAME=dxyz123abc
   VITE_CLOUDINARY_UPLOAD_PRESET=shemabuds_products
   ```

### Step 5: Restart Development Server

```bash
npm run dev
```

The server needs to restart to load the new environment variables.

---

## 🎨 How to Use

### Adding New Product:

1. Go to Admin Dashboard → Products
2. Click "Add Product"
3. Click the **"Upload Main Image"** button (or dashed upload area)
4. Select image from:
   - **Mobile**: Gallery/Camera
   - **Desktop**: File explorer
5. Wait for upload (shows progress bar)
6. See preview and success message
7. Fill other product details
8. Click "Add Product"

### Editing Existing Product:

1. Click "Edit" on any product
2. Current image shows as preview
3. Click **"Change Image"** to upload new one
4. Or keep existing image
5. Click "Update Product"

---

## 📱 Mobile Support

The upload component automatically detects mobile devices and:
- Opens camera/gallery picker
- Shows mobile-optimized interface
- Handles touch interactions
- Displays compressed previews

---

## 🔒 Security Notes

### Why "Unsigned" Upload Preset?

We use **unsigned uploads** because:
- ✅ No need to expose API secret in frontend code
- ✅ Secure with upload preset restrictions
- ✅ Can limit file types, sizes, and folders
- ✅ Perfect for public uploads from authenticated users

### Additional Security (Optional):

1. **Restrict by folder:**
   - All images go to `shemabuds/products/` folder
   - Organized and easy to manage

2. **Restrict formats:**
   - Only JPG, PNG, WEBP allowed
   - Prevents upload of documents or other files

3. **Limit file size:**
   - Max 10MB per file
   - Prevents abuse

4. **Add authentication check:**
   - Only authenticated admin users can access product form
   - Already implemented in your admin routes

---

## 🎯 Image Optimization

Cloudinary automatically:
- ✅ Compresses images
- ✅ Converts to optimal format (WebP when supported)
- ✅ Serves via global CDN
- ✅ Responsive image delivery
- ✅ Lazy loading support

You can also manually optimize by adding transformations to the upload preset:
```
Transformation: c_limit,w_1200,q_auto,f_auto
```

This will:
- Limit width to 1200px
- Auto quality
- Auto format selection

---

## 📊 Cloudinary Free Tier Limits

- **Storage**: 25 GB
- **Bandwidth**: 25 GB/month
- **Transformations**: 25,000/month
- **Images**: Unlimited

This is typically enough for small to medium-sized e-commerce sites.

---

## 🆘 Troubleshooting

### Error: "Upload failed"

**Check:**
1. Cloud name is correct in `.env`
2. Upload preset name matches
3. Upload preset is set to "Unsigned"
4. Internet connection is stable

### Error: "Invalid image type"

**Solution:**
- Only JPG, PNG, WEBP are allowed
- Check file extension

### Error: "File too large"

**Solution:**
- Max file size is 10MB
- Compress image before uploading
- Use tools like TinyPNG or ImageOptim

### Image not showing after upload

**Check:**
1. Browser console for errors
2. Cloudinary dashboard → Media Library → Verify image uploaded
3. Try hard refresh (Ctrl+Shift+R)

### Environment variables not working

**Solution:**
1. Restart development server after adding `.env` variables
2. Ensure `.env` file is in project root
3. Variable names must start with `VITE_`

---

## 🎉 Testing

### Quick Test:

1. Go to admin → Products
2. Click "Add Product"
3. Upload a test image
4. Check if:
   - ✅ Upload progress shows
   - ✅ Success message appears
   - ✅ Preview displays correctly
   - ✅ Image URL is saved to Firestore
5. Go to your storefront
6. Verify product image displays correctly

---

## 📈 Monitoring Usage

Check your Cloudinary usage:
1. Go to Cloudinary Dashboard
2. See storage, bandwidth, and transformations used
3. Monitor approaching limits
4. Upgrade plan if needed

---

## 🔧 Advanced Configuration

### Custom Transformations:

You can add transformation parameters to uploaded URLs:

```javascript
// Original
https://res.cloudinary.com/cloud/image/upload/v123/product.jpg

// With transformation
https://res.cloudinary.com/cloud/image/upload/w_400,h_400,c_fill/v123/product.jpg
```

### Folder Structure:

Organize uploads:
```
shemabuds/
  ├── products/      (product images)
  ├── featured/      (featured section)
  ├── offers/        (special offers)
  └── temp/          (temporary uploads)
```

---

## ✅ Summary

- ✅ Created Cloudinary account
- ✅ Got Cloud Name
- ✅ Created upload preset
- ✅ Added to `.env` file
- ✅ Restarted dev server
- ✅ Tested image upload
- ✅ Ready to use!

---

**Need Help?** Check [Cloudinary Documentation](https://cloudinary.com/documentation) or the troubleshooting section above.
