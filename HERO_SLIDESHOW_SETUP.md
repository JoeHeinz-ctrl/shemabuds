# Hero Slideshow Setup Guide

## 🎬 Slideshow Features

✅ **Auto-playing slideshow** - Changes every 5 seconds
✅ **Smooth fade transitions** - Elegant crossfade between images
✅ **Pause on hover** - Users can pause to view details
✅ **Navigation dots** - Click to jump to any slide
✅ **Same background opacity** - Consistent with original design
✅ **Parallax scrolling** - Background moves slower than content
✅ **Mobile optimized** - Works perfectly on all devices

---

## 📸 Upload Your Images to Cloudinary

### Step 1: Go to Cloudinary Media Library

1. Visit: https://console.cloudinary.com/
2. Click **Media Library** in the left sidebar
3. Click **Upload** button (blue button top right)

### Step 2: Create Folder Structure

Before uploading, create a folder:
1. Click the **"+"** icon or **"New Folder"**
2. Name it: `shemabuds/hero`

### Step 3: Upload Your 4 Images

Upload the 4 images you showed me in this order:

**Image 1:** Table setup with white & pink flowers, teal vase, red roses
**Image 2:** White flowers with red roses in black gift box
**Image 3:** Table setup with candles and decorations
**Image 4:** White flowers in wooden tray with traditional setting

**Upload steps:**
1. Drag and drop all 4 images into the `shemabuds/hero` folder
2. Rename them to:
   - `image1.jpg` (or keep original names)
   - `image2.jpg`
   - `image3.jpg`
   - `image4.jpg`

### Step 4: Get Image URLs

After uploading, click on each image and copy the **URL**. 

The URLs should look like:
```
https://res.cloudinary.com/diy2kkxyu/image/upload/v1234567890/shemabuds/hero/image1.jpg
```

---

## 🔧 Update the Code (If URLs are Different)

If your Cloudinary URLs are different, open `src/app/components/Hero.tsx` and update line 24-29:

```typescript
const heroImages = [
  "YOUR_IMAGE_1_URL_HERE",
  "YOUR_IMAGE_2_URL_HERE",
  "YOUR_IMAGE_3_URL_HERE",
  "YOUR_IMAGE_4_URL_HERE",
];
```

Replace with your actual Cloudinary URLs.

---

## ⚡ Current Configuration

The slideshow is already set up with:

- **Auto-advance**: Every 5 seconds
- **Smooth transitions**: 1.5 second fade
- **Pause on hover**: Stops when user hovers over image
- **Click dots**: Jump to any slide instantly
- **4 slides total**: Your product images
- **Same overlay**: Gradient from `background/85` to `transparent`

---

## 🎨 Customization Options

Want to adjust settings? Edit `src/app/components/Hero.tsx`:

### Change slide duration:
```typescript
}, 5000); // Change this number (milliseconds)
```

### Change transition speed:
```typescript
transition={{ duration: 1.5, ease: "easeInOut" }}
          ^^^^^^^^^^^ Change this number (seconds)
```

### Add more images:
Just add more URLs to the `heroImages` array!

---

## ✅ Testing

After uploading images to Cloudinary:

1. **Refresh your website**
2. **Watch the slideshow** - Should auto-play
3. **Hover over image** - Should pause
4. **Click dots** - Should jump to that slide
5. **Wait 5 seconds** - Should auto-advance

---

## 🐛 Troubleshooting

**Images not loading?**
- Check Cloudinary URLs are correct
- Verify images are in `shemabuds/hero` folder
- Make sure Cloud Name is `diy2kkxyu`

**Slideshow not auto-playing?**
- Check browser console for errors (F12)
- Refresh the page

**Transitions not smooth?**
- This is normal on first load
- Images cache after first view

---

## 📋 Alternative: Use Attached Images Directly

If you prefer, I can also set up the slideshow to use the images you attached directly in chat. However, uploading to Cloudinary is better for:
- Faster loading times
- Automatic optimization
- CDN delivery
- Image transformations

---

Need help? Let me know! 🚀
