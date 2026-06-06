import { motion, useScroll, useSpring } from "motion/react";
import { useLuxuryMotion } from "../../hooks/useLuxuryMotion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const { reducedMotion } = useLuxuryMotion();

  if (reducedMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left pointer-events-none"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #A67C52, #D4A574, #C8A27A)",
      }}
    />
  );
}
