# Shemabuds - Premium Handcrafted Gifts & Decorations

A luxurious e-commerce website for Shemabuds, specializing in handmade bouquets, gifts, and decorations with premium boutique experience.

## ✨ Premium Features Upgrade

### 🎨 Theme System
- **Light & Dark Mode**: Sophisticated dual-theme support with smooth 400ms transitions
- **Theme Toggle**: Available in header (desktop) and settings (mobile)
- **System Preference**: Respects device dark mode preference
- **Persistent Storage**: Theme preference saved in localStorage

### 💎 Glassmorphism Design
Premium glass-like effects throughout:
- Navigation bars with backdrop blur
- Product cards with translucent backgrounds
- Modal dialogs with soft blur
- Buttons with subtle glass reflections.Joe
- Cart and checkout interfaces
- Settings panels

### 🎭 Premium Animations

#### Global Animations
- **Page Load**: Smooth fade-in with upward movement
- **Section Reveal**: Elements animate when entering viewport (once only)
- **Staggered Reveals**: Child elements cascade in with 0.1s delays
- **Duration**: 500-800ms for elegant pacing

#### Hero Section
- **Parallax Scrolling**: Background image moves slower than foreground
- **Floating Particles**: Animated decorative elements with soft glow
- **Image Zoom**: Gentle zoom effect on hero background
- **Shimmer Effect**: Luxury shimmer on "Heartmade" text
- **Sparkle Animation**: Rotating sparkle icon in badge

#### Product Cards
- **Hover Effects**:
  - Image zoom to 1.08x scale
  - Card lifts 8px with shadow increase
  - Smooth 400ms transitions
- **Tap Animation**: Subtle press effect (scale 0.98)
- **Image Loading**: Elegant fade-in when images load
- **Badge Glow**: Premium category badge styling

#### Buttons
- **Hover**: Scale 1.02x with enhanced shadow and glow
- **Active**: Press animation (scale 0.98)
- **Shimmer Sweep**: Animated luxury shine effect on primary buttons
- **Smooth Transitions**: 300ms duration with ease curves

#### Navigation
- **Bottom Nav**: Animated active tab indicator that slides smoothly
- **Icon Bounce**: Active tab icon bounces on selection
- **Glass Background**: Frosted glass effect with blur
- **Tab Glow**: Active items have golden glow effect

#### Modals
- **Opening**: Spring animation with scale and slide
- **Cart Modal**: Slides in from right (x: 300)
- **Product Details**: Scale up from 0.9 to 1.0
- **Backdrop**: Smooth blur with 300ms fade
- **Closing**: Reverse animation with fade out

### 🎉 Order Success Celebration
Premium memorable experience when order is placed:
- **Backdrop Blur**: Full-screen frosted glass overlay
- **Success Card**: Spring animation with scale and elevation
- **Icon Animation**: Rotating checkmark with pulse effect
- **Gold Confetti**: Dual-source confetti explosion (left & right)
- **Flower Petals**: Floating petal effects falling gently
- **Duration**: 4-second celebration sequence
- **Auto-dismiss**: Smooth exit after celebration
- **Messages**: 
  - "Order Received!"
  - "We'll craft something beautiful for you"

### 🔄 Loading States
Elegant skeleton loaders with shimmer effects:
- **Product Cards**: Animated placeholder with gradient shimmer
- **Review Cards**: Skeleton with loading pulses
- **Offer Cards**: Content placeholders with shine effect
- **Collection Cards**: Grid-ready loading states

### 📜 Scroll Experience
- **Smooth Scrolling**: Native smooth scroll behavior
- **Section Transitions**: Elegant fade animations between sections
- **Back to Top Button**:
  - Glassmorphism with floating style
  - Animated arrow with continuous up-down motion
  - Hover lift and scale effects
  - Hidden on mobile for clean experience

### 🎨 Visual Enhancements

#### Colors & Shadows
**Light Mode**:
- Warm ivory backgrounds (#FAF7F2)
- Soft luxury gold accents (#A67C52)
- Elegant shadows with gold tint

**Dark Mode**:
- Rich charcoal backgrounds (#1A1612)
- Deep gold highlights (#C4956F)
- Enhanced contrast for readability
- Glassmorphism with elevated opacity

#### Premium Shadows
- `shadow-luxury`: Soft multi-layer shadows with gold tint
- `shadow-luxury-lg`: Enhanced depth for modals and cards
- GPU-accelerated for smooth performance

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🛠️ Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS 4
- Firebase (Firestore + Auth)
- Framer Motion (motion package)
- Canvas Confetti
- React Router DOM
- Radix UI Components

## 📱 Features

### Customer Features
- **Mobile-First Design**: Tab-based navigation (Home, Collections, Offers, Cart, Settings)
- **Theme Support**: Light/Dark mode with smooth transitions
- **Product Browsing**: Categories with smooth animations
- **Product Customization**: Dynamic options with validation
- **Shopping Cart**: Premium animations and interactions
- **Dual Ordering**: Direct order placement or WhatsApp
- **Success Celebration**: Confetti and petals animation
- **Skeleton Loaders**: Professional loading states
- **Glassmorphism**: Premium frosted glass effects
- **Smooth Animations**: 60fps Framer Motion animations

### Admin Features
- Secure admin dashboard at `/admin`
- Product management (add/edit/delete)
- Order management with status tracking
- Featured products toggle
- Real-time Firebase sync
- Responsive admin interface

## 🎨 Design Philosophy

### Premium Luxury Boutique
- **Elegance Over Excess**: Subtle, refined animations
- **Quality Materials**: Glass effects, soft shadows, premium gold tones
- **Smooth Interactions**: Every tap, hover, and transition feels delightful
- **Attention to Detail**: Micro-interactions throughout
- **Performance First**: GPU-accelerated animations, optimized for mobile

### Animation Principles
- **Once Only**: Section reveals trigger once for performance
- **Appropriate Duration**: 300-800ms for elegant pacing
- **Easing Curves**: Custom bezier curves for natural motion
- **Stagger Delays**: 0.1s between items for cascade effect
- **Spring Physics**: Natural bounce on interactive elements

## 🎯 Performance

- **GPU Acceleration**: Transform and opacity animations
- **Optimized Renders**: React.memo and useMemo where beneficial
- **Lazy Loading**: Images load progressively
- **Code Splitting**: Route-based chunks
- **Smooth 60fps**: Animations optimized for mobile devices

## 🔥 Firebase Setup

1. Create Firebase project at https://console.firebase.google.com/
2. Enable Firestore and Authentication
3. Update `src/firebase.ts` with your config
4. Set Firestore rules to allow read/write

## 📂 Project Structure

```
src/
├── app/
│   ├── components/          # React components
│   │   ├── ui/             # Radix UI components
│   │   ├── mobile/         # Mobile-specific components
│   │   └── admin/          # Admin dashboard components
│   └── App.tsx             # Main app with theme provider
├── contexts/
│   └── ThemeContext.tsx    # Theme management
├── components/
│   ├── AnimatedSection.tsx # Scroll-triggered animations
│   └── SkeletonLoader.tsx  # Loading states
├── utils/
│   └── animations.ts       # Framer Motion variants
├── styles/
│   └── theme.css          # Theme colors & glassmorphism
└── services/              # Firebase services
```

## 🎨 Theme Variables

CSS custom properties for easy customization:
- `--primary`: Main brand color (gold)
- `--background`: Page background
- `--foreground`: Text color
- `--card`: Card background with glass effect
- `--muted`: Subtle backgrounds
- `--border`: Border colors with opacity

## 📞 Contact

- WhatsApp: +91 93639 62399
- Instagram: @shemabuds
- Email: hello@shemabuds.com

---

Made with ❤️ and premium animations for Shemabuds
