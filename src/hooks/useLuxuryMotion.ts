import { useState, useEffect, useRef } from "react";
import { useSpring } from "motion/react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function useLowEndDevice() {
  const [lowEnd, setLowEnd] = useState(false);

  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 8;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
    const narrow = window.innerWidth < 768;
    setLowEnd(narrow || (cores <= 4 && memory <= 4));
  }, []);

  return lowEnd;
}

export function useIsTouchDevice() {
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  return touch;
}

export function useCursorTilt(
  enabled: boolean,
  maxTilt = 5
) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 20 });
  const target = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (!enabled) {
      rotateX.set(0);
      rotateY.set(0);
      return;
    }

    const el = cardRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      target.current = { x: -y * maxTilt, y: x * maxTilt };
    };

    const onLeave = () => {
      target.current = { x: 0, y: 0 };
    };

    const tick = () => {
      rotateX.set(rotateX.get() + (target.current.x - rotateX.get()) * 0.12);
      rotateY.set(rotateY.get() + (target.current.y - rotateY.get()) * 0.12);
      rafId.current = requestAnimationFrame(tick);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, [enabled, maxTilt, rotateX, rotateY]);

  return { cardRef, rotateX, rotateY };
}

export function useLuxuryMotion() {
  const reducedMotion = usePrefersReducedMotion();
  const lowEnd = useLowEndDevice();
  const isTouch = useIsTouchDevice();

  const enableRichMotion = !reducedMotion && !lowEnd;
  const enableCursorTilt = enableRichMotion && !isTouch;
  const orbCount = reducedMotion ? 0 : lowEnd ? 4 : 10;

  return {
    reducedMotion,
    lowEnd,
    isTouch,
    enableRichMotion,
    enableCursorTilt,
    orbCount,
  };
}
