import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ScrollDepthSectionProps {
  children: ReactNode;
  depth?: number;
  className?: string;
}

export function ScrollDepthSection({ 
  children, 
  depth = 0,
  className = "" 
}: ScrollDepthSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Different depth levels create parallax effect
  const depthMultiplier = depth * 20;
  
  // Transform values based on scroll position
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [100 + depthMultiplier, 0, -50 - depthMultiplier]
  );
  
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.95, 1, 1, 0.98]
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0.6]
  );
  
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [8, 0, 0, -4]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        scale,
        opacity,
        rotateX,
        transformStyle: "preserve-3d",
        transformPerspective: 1200,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollDepthCard({ children, index = 0 }: { children: ReactNode; index?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [50 + index * 10, 0]
  );
  
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.9, 1, 1]
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 1],
    [0, 1, 1]
  );
  
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [12, 0, 0]
  );

  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [index % 2 === 0 ? -8 : 8, 0, 0]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        scale,
        opacity,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
}
