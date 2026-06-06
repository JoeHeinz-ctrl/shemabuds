import { useRef, useState, ReactNode } from "react";
import { motion } from "motion/react";
import { useLuxuryMotion } from "../../../hooks/useLuxuryMotion";

interface MagneticCardProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticCard({ children, className = "", strength = 12 }: MagneticCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { enableRichMotion, isTouch } = useLuxuryMotion();

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableRichMotion || isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * strength;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * strength;
    setPosition({ x, y });
  };

  const handleLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}
