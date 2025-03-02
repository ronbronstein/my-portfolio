'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useSound } from '@/components/sound/SoundProvider';

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
  const { playModalOpen, playModalClose } = useSound();

  // Play sound effects on open/close
  useEffect(() => {
    if (isOpen) {
      playModalOpen();
    }
  }, [isOpen, playModalOpen]);

  // Handle close with sound
  const handleClose = () => {
    playModalClose();
    onClose();
  };

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
            onClick={handleClose}
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
              ${isMobile ? 'w-[95%] h-[80vh]' : 'w-[90%] h-[85vh]'} 
              max-w-7xl 
              bg-black border border-green-500/50 rounded-lg
              flex flex-col overflow-hidden
            `}
            style={{ 
              boxShadow: '0 0 50px rgba(0, 255, 0, 0.15)',
            }}
          >
            {/* Header */}
            <div className={`${isMobile ? 'p-4' : 'p-8'} border-b border-green-500/30`}>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold text-green-400 text-center`}
              >
                {title}
              </motion.h2>

              {/* Close button */}
              <button
                onClick={handleClose}
                className={`
                  absolute ${isMobile ? 'top-3 right-3' : 'top-6 right-6'}
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`flex-1 ${isMobile ? 'p-4' : 'p-8'} overflow-y-auto`}
            >
              <div className={`
                max-w-4xl mx-auto 
                text-green-300 
                ${isMobile ? 'text-base' : 'text-xl'}
                leading-relaxed
              `}>
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