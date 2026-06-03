import { motion, AnimatePresence } from "motion/react";
import { Check, X, AlertCircle, Info } from "lucide-react";
import { useEffect } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
  message: string;
  type?: ToastType;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type = "success", isVisible, onClose, duration = 2000 }: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const icons = {
    success: Check,
    error: X,
    info: Info,
    warning: AlertCircle,
  };

  const colors = {
    success: "bg-primary/10 border-primary/20 text-primary",
    error: "bg-destructive/10 border-destructive/20 text-destructive",
    info: "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400",
    warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-400",
  };

  const Icon = icons[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[200] max-w-md w-full px-4"
        >
          <div className={`glass-strong rounded-2xl shadow-luxury-lg border ${colors[type]} p-4 flex items-center gap-3`}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 500, damping: 25 }}
              className="flex-shrink-0"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                type === "success" ? "bg-primary" :
                type === "error" ? "bg-destructive" :
                type === "info" ? "bg-blue-500" :
                "bg-yellow-500"
              }`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
            </motion.div>
            <p className="flex-1 font-medium">{message}</p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="flex-shrink-0 p-1 hover:bg-background/50 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
