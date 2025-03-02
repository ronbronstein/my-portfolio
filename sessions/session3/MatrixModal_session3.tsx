// src/components/shared/MatrixModal.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface MatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.3
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.3
    }
  }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

const MatrixModal = ({ isOpen, onClose, title, children }: MatrixModalProps) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="absolute inset-0 bg-black/85"
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-[90%] h-[85vh] max-w-7xl 
                     bg-black border border-green-500/50 rounded-lg
                     flex flex-col overflow-hidden"
            style={{ 
              boxShadow: '0 0 50px rgba(0, 255, 0, 0.15)',
            }}
          >
            {/* Header */}
            <div className="p-8 border-b border-green-500/30">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-4xl font-bold text-green-400 text-center"
              >
                {title}
              </motion.h2>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-green-500 hover:text-green-400
                         w-10 h-10 flex items-center justify-center rounded-full
                         border border-green-500 hover:border-green-400
                         transition-colors duration-200 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 p-8 overflow-y-auto"
            >
              <div className="max-w-4xl mx-auto text-green-300 text-xl leading-relaxed">
                {children}
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MatrixModal;