import React from "react";
import { motion } from "motion/react";

interface DecorationProps {
  className?: string;
  size?: number | string;
  colorClass?: string;
  opacity?: number;
}

/**
 * Clean SVG representation of the official Schema Buds logomark.
 * Placed within a square viewBox centered around the paths (from original 595.28 x 419.53).
 */
export function LogomarkIcon({ className = "", size = 24, colorClass = "text-accent" }: DecorationProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="100 100 395 240"
      width={size}
      height={size}
      className={`${className} ${colorClass}`}
      fill="currentColor"
    >
      <g>
        {/* Path 1: Curving branch with stems */}
        <path d="M315.36,160.99c-2.71,1.23-5.42,2.46-8.13,3.69-1.5-3.24-3.27-6.4-5.49-9.44-11.57-15.9-31.28-23.75-50.13-20.46-18.37,3.21-31.88,18.67-32.53,37.52-.22,6.3,1.33,12.17,3.66,17.99,2.72,6.78,6.53,12.7,10.1,19.06l9.38,16.7c2.98,5.3,4.84,10.73,5.97,16.79,2.74,14.63-2.82,29.8-14.46,39-16.74,13.23-41.97,8.15-50.15-10.43-.99-2.25-1.63-4.59-1.92-6.95h9.39c.48,2.45,1.56,4.78,3.27,6.83,7.89,9.43,21.52,11.26,31.84,4.43,4.33-2.87,7.69-6.86,9.97-11.46-.04-.05.16-.39.47-.97.74-1.63,1.36-3.33,1.84-5.07.15-.8.25-1.66.26-2.58.04-3.37-1.08-5.82-2.39-8.69-6.84-14.97-6.46-14.25-6.75-14.8-5.87-11.41-9.25-14.81-15.39-26.29-5.22-9.76-7.82-14.64-8.75-19.66-2.64-14.35,3.23-26.33,5.44-30.7,4.79-9.47,11.5-15.88,13.86-17.33,6.9-6.6,15.84-11.28,26.07-13.03,23.98-4.09,48.26,8.05,59.68,25.92,2.55,3.99,4.04,7.6,4.89,9.93Z" />
        {/* Path 2: Middle leaf */}
        <path d="M290.56,256.95c-17.65-32.8-8.97-64.93,16.62-92.27,13.22,6.7,23.85,16.5,32.49,28.44,24.03,33.23,10.32,72.05-15.67,102.07-13.91-10.63-25.21-22.96-33.44-38.24Z" />
        {/* Path 3: Outer curved leaf */}
        <path d="M342.6,157.62c20.2.15,38.39,8.97,50.73,23.28,6.55,7.6,9.69,14.92,12.32,21.13,6.26,14.77,7.7,28.08,7.96,36.61-18.42,4.2-37.33,2.16-56.18-3.34,1.58-30.2-14.32-56.67-42.08-74.3,8.87-3.9,17.95-3.45,27.24-3.38Z" />
      </g>
    </svg>
  );
}

/**
 * Reusable background watermark motif. Low opacity.
 */
export function LogomarkWatermark({
  className = "absolute pointer-events-none",
  size = 300,
  opacity = 0.04,
  colorClass = "text-primary",
}: DecorationProps) {
  return (
    <div
      className={className}
      style={{
        opacity,
        zIndex: 0,
      }}
    >
      <LogomarkIcon size={size} colorClass={colorClass} />
    </div>
  );
}

/**
 * Decorative corner accent. Fits nicely in the corners of sections, cards, or glass panels.
 */
export function LogomarkCorner({
  className = "absolute pointer-events-none",
  size = 120,
  position = "top-right",
  colorClass = "text-primary/20",
  opacity = 0.08,
}: DecorationProps & { position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const rotationMap = {
    "top-left": "rotate-0",
    "top-right": "rotate-90",
    "bottom-right": "rotate-180",
    "bottom-left": "rotate-270",
  };

  const positionClasses = {
    "top-left": "-top-6 -left-6",
    "top-right": "-top-6 -right-6",
    "bottom-right": "-bottom-6 -right-6",
    "bottom-left": "-bottom-6 -left-6",
  };

  return (
    <div
      className={`${className} ${positionClasses[position]} ${rotationMap[position]} transition-all`}
      style={{ opacity }}
    >
      <LogomarkIcon size={size} colorClass={colorClass} />
    </div>
  );
}

/**
 * Elegant section divider with the official logomark centered.
 */
export function LogomarkDivider({ className = "my-8", colorClass = "text-primary/20" }: DecorationProps) {
  return (
    <div className={`flex items-center justify-center gap-4 w-full ${className}`}>
      <div className={`h-[1px] flex-1 bg-gradient-to-r from-transparent via-current to-transparent max-w-xs ${colorClass}`} />
      <div className="flex items-center gap-1.5">
        <div className={`w-1.5 h-1.5 rounded-full bg-current ${colorClass}`} />
        <LogomarkIcon size={28} colorClass={colorClass} className="opacity-80" />
        <div className={`w-1.5 h-1.5 rounded-full bg-current ${colorClass}`} />
      </div>
      <div className={`h-[1px] flex-1 bg-gradient-to-r from-transparent via-current to-transparent max-w-xs ${colorClass}`} />
    </div>
  );
}

/**
 * Reusable animated loading spinner using the official brand logomark.
 */
export function LogomarkSpinner({ size = 48, className = "" }: DecorationProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          duration: 2.2,
          ease: "linear",
        }}
      >
        <LogomarkIcon size={size} colorClass="text-primary" />
      </motion.div>
      <motion.span
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="text-xs font-semibold text-primary/70 tracking-widest font-serif"
      >
        SHEMA BUDS
      </motion.span>
    </div>
  );
}

/**
 * Individual floating leaves with organic micro-animations for empty margins.
 */
export function FloatingLeaf({
  className = "absolute pointer-events-none text-primary",
  size = 40,
  opacity = 0.05,
  delay = 0,
  duration = 6,
}: DecorationProps & { delay?: number; duration?: number }) {
  return (
    <motion.div
      className={className}
      style={{ opacity }}
      animate={{
        y: [0, -15, 0],
        rotate: [0, 8, -8, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="280 150 120 150"
        width={size}
        height={size}
        fill="currentColor"
      >
        <path d="M290.56,256.95c-17.65-32.8-8.97-64.93,16.62-92.27,13.22,6.7,23.85,16.5,32.49,28.44,24.03,33.23,10.32,72.05-15.67,102.07-13.91-10.63-25.21-22.96-33.44-38.24Z" />
      </svg>
    </motion.div>
  );
}

/**
 * Organic botanical transition zone.
 * Use above and below the Our Creations showroom to dissolve hard visual breaks.
 * Position "top" fades into the section, "bottom" fades out of it.
 */
export function BotanicalTransition({
  className = "",
  position = "top",
  opacity = 0.06,
}: DecorationProps & { position?: "top" | "bottom" }) {
  const isTop = position === "top";

  return (
    <div
      className={`relative w-full flex items-center justify-center pointer-events-none overflow-hidden ${className}`}
      style={{ height: "96px" }}
      aria-hidden="true"
    >
      {/* Soft gradient wash that blends into the page background */}
      <div
        className="absolute inset-0"
        style={{
          background: isTop
            ? "linear-gradient(to bottom, transparent 0%, rgba(var(--color-primary-rgb, 120,80,60), 0.04) 50%, transparent 100%)"
            : "linear-gradient(to top, transparent 0%, rgba(var(--color-primary-rgb, 120,80,60), 0.04) 50%, transparent 100%)",
        }}
      />

      {/* Faded botanical stems row */}
      <div className="relative flex items-center justify-center gap-8 w-full max-w-3xl px-8">
        {/* Left floating leaf cluster */}
        <motion.div
          style={{ opacity: opacity * 0.8 }}
          animate={{ y: [0, -8, 0], rotate: isTop ? [0, 6, 0] : [0, -6, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0 }}
          className={`${isTop ? "-translate-y-2" : "translate-y-2"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="280 150 120 150"
            width={38}
            height={38}
            className="text-primary"
            fill="currentColor"
          >
            <path d="M290.56,256.95c-17.65-32.8-8.97-64.93,16.62-92.27,13.22,6.7,23.85,16.5,32.49,28.44,24.03,33.23,10.32,72.05-15.67,102.07-13.91-10.63-25.21-22.96-33.44-38.24Z" />
          </svg>
        </motion.div>

        {/* Thin decorative stem line left */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 80 24"
          width={80}
          height={24}
          className="text-primary/30"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          style={{ opacity: opacity * 1.5 }}
        >
          <path d="M0,12 Q20,4 40,12 Q60,20 80,12" strokeLinecap="round" />
        </svg>

        {/* Center logomark watermark */}
        <div style={{ opacity: opacity * 0.9 }}>
          <LogomarkIcon
            size={isTop ? 52 : 44}
            colorClass="text-primary"
            className={isTop ? "" : "rotate-180"}
          />
        </div>

        {/* Thin decorative stem line right */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 80 24"
          width={80}
          height={24}
          className="text-primary/30"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          style={{ opacity: opacity * 1.5, transform: "scaleX(-1)" }}
        >
          <path d="M0,12 Q20,4 40,12 Q60,20 80,12" strokeLinecap="round" />
        </svg>

        {/* Right floating leaf cluster */}
        <motion.div
          style={{ opacity: opacity * 0.8 }}
          animate={{ y: [0, -8, 0], rotate: isTop ? [0, -6, 0] : [0, 6, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className={`scale-x-[-1] ${isTop ? "-translate-y-2" : "translate-y-2"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="280 150 120 150"
            width={38}
            height={38}
            className="text-primary"
            fill="currentColor"
          >
            <path d="M290.56,256.95c-17.65-32.8-8.97-64.93,16.62-92.27,13.22,6.7,23.85,16.5,32.49,28.44,24.03,33.23,10.32,72.05-15.67,102.07-13.91-10.63-25.21-22.96-33.44-38.24Z" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}