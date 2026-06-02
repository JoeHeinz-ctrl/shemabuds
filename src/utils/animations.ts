// Premium animation variants for Framer Motion

export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const scaleIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.9 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1]
    }
  }
};

export const slideInLeft = {
  hidden: { 
    opacity: 0, 
    x: -30 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const slideInRight = {
  hidden: { 
    opacity: 0, 
    x: 30 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const staggerItem = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

// Hover animations
export const hoverScale = {
  scale: 1.05,
  transition: {
    duration: 0.3,
    ease: "easeOut"
  }
};

export const hoverLift = {
  y: -8,
  transition: {
    duration: 0.3,
    ease: [0.34, 1.56, 0.64, 1]
  }
};

export const tapPress = {
  scale: 0.97,
  transition: {
    duration: 0.1
  }
};

// Modal animations
export const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

export const modalContent = {
  hidden: { 
    opacity: 0, 
    scale: 0.9,
    y: 20
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: {
      duration: 0.3
    }
  }
};

// Success celebration
export const successPulse = {
  scale: [1, 1.1, 1],
  transition: {
    duration: 0.6,
    ease: "easeInOut"
  }
};

export const confettiParticle = {
  hidden: { 
    opacity: 0, 
    y: -20,
    rotate: 0 
  },
  visible: (i: number) => ({
    opacity: [0, 1, 1, 0],
    y: [0, -50, 200],
    x: [0, (i % 2 === 0 ? 1 : -1) * (50 + Math.random() * 100)],
    rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)],
    transition: {
      duration: 2 + Math.random(),
      ease: "easeOut",
      times: [0, 0.2, 0.8, 1]
    }
  })
};

// Floating animation
export const float = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const floatDelayed = (delay: number) => ({
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
    delay
  }
});

// Shimmer sweep animation
export const shimmerSweep = {
  backgroundPosition: ["200% 0", "-200% 0"],
  transition: {
    duration: 2,
    ease: "linear",
    repeat: Infinity
  }
};
