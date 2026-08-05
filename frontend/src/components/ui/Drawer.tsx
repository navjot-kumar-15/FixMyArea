import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: string;
  position?: 'right' | 'left';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  description,
  position = 'right',
  size = 'md',
  children,
  footer,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-xl',
    xl: 'max-w-3xl',
  }[size];

  const slideVariants = {
    hidden: {
      x: position === 'right' ? '100%' : '-100%',
      opacity: 0.5,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring' as const, damping: 25, stiffness: 220 },
    },
    exit: {
      x: position === 'right' ? '100%' : '-100%',
      opacity: 0,
      transition: { ease: 'easeInOut' as const, duration: 0.25 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity"
          />

          {/* Drawer Container */}
          <div
            className={`fixed inset-y-0 ${
              position === 'right' ? 'right-0' : 'left-0'
            } flex max-w-full pl-10 z-50`}
          >
            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`w-screen ${sizeClasses} bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200/80 dark:border-slate-800/80 flex flex-col`}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40">
                <div>
                  {typeof title === 'string' ? (
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {title}
                    </h3>
                  ) : (
                    title
                  )}
                  {description && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {description}
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {children}
              </div>

              {/* Footer */}
              {footer && (
                <div className="px-6 py-4 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 flex items-center justify-end gap-3">
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
