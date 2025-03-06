// src/components/shared/MatrixModal.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import ClientOnly from '../ClientOnly';

interface MatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  isMobile?: boolean;
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

const MatrixModal = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  isMobile = false 
}: MatrixModalProps) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <ClientOnly>
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
              className={`
                relative 
                ${isMobile ? 'w-[95%] h-[85vh]' : 'w-[90%] max-h-[85vh]'} 
                max-w-6xl 
                bg-black border border-green-500/50 rounded-lg
                flex flex-col
              `}
              style={{ 
                boxShadow: '0 0 50px rgba(0, 255, 0, 0.15)',
              }}
            >
              {/* Header */}
              <div className={`${isMobile ? 'p-4' : 'p-6'} border-b border-green-500/30`}>
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-green-400 text-center`}
                >
                  {title}
                </motion.h2>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className={`
                    absolute ${isMobile ? 'top-3 right-3' : 'top-5 right-5'}
                    text-green-500 hover:text-green-400
                    ${isMobile ? 'w-8 h-8' : 'w-10 h-10'}
                    flex items-center justify-center rounded-full
                    border border-green-500 hover:border-green-400
                    transition-colors duration-200
                    ${isMobile ? 'text-lg' : 'text-xl'}
                  `}
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className={`flex-1 ${isMobile ? 'p-3' : 'p-6'} flex flex-col h-[calc(85vh-130px)]`}>
                <div className={`
                  max-w-5xl mx-auto w-full h-full
                  text-green-300 
                  ${isMobile ? 'text-sm' : 'text-base'}
                  leading-relaxed
                `}>
                  {children}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ClientOnly>
  );
};

export default MatrixModal;