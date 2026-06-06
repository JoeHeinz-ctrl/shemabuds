import { useRef, useState } from "react";
import { motion } from "motion/react";
import { ReactNode } from "react";

interface Card3DTiltProps {
  children: ReactNode;
  className?: string;
}

export function Card3DTilt({ children, className = "" }: Card3DTiltProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation angles (max 20deg)
    const rotateXAngle = ((y - centerY) / centerY) * 20;
    const rotateYAngle = ((centerX - x) / centerX) * 20;

    setRotateX(rotateXAngle);
    setRotateY(rotateYAngle);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovering(false);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        perspective: "800px",
      }}
      className={`relative ${className}`}
    >
      {/* Interactive tracker grid overlay */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gridTemplateRows: "repeat(5, 1fr)",
          gap: 0,
        }}
      >
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            style={{
              pointerEvents: "auto",
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      {/* Tilting card */}
      <motion.div
        animate={{
          rotateX: `${rotateX}deg`,
          rotateY: `${rotateY}deg`,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        style={{
          transformStyle: "preserve-3d",
          transformPerspective: 800,
        }}
      >
        {children}
      </motion.div>

      {/* Glow effect on hover */}
      <motion.div
        animate={{
          opacity: isHovering ? 1 : 0,
          scale: isHovering ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: "linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%)",
          filter: "blur(2rem)",
          opacity: 0.3,
          zIndex: -1,
        }}
      />
    </motion.div>
  );
}
