// src/components/shared/MatrixModal.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { MATRIX_THEME, matrixTextVariants } from '@/lib/theme';

interface MatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

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
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     w-full max-w-2xl max-h-[80vh] overflow-y-auto z-50
                     bg-black border-2 border-green-500 p-6"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-green-500 hover:text-green-400"
            >
              ✕
            </button>

            {/* Title */}
            <motion.h2
              variants={matrixTextVariants}
              initial="hidden"
              animate="visible"
              className="text-2xl font-bold text-green-500 mb-4"
            >
              {title}
            </motion.h2>

            {/* Content */}
            <motion.div
              variants={matrixTextVariants}
              initial="hidden"
              animate="visible"
              className="text-green-400"
            >
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MatrixModal;