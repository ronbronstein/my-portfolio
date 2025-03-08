// src/components/easter-eggs/matrix-effects.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKeyboardCommander } from '@/hooks/use-keyboard-commander';

export default function MatrixEasterEggs() {
  const [showEasterEgg, setShowEasterEgg] = useState<string | null>(null);
  
  // Use our keyboard hook
  const { activeEasterEgg } = useKeyboardCommander({
    onTrigger: (egg) => {
      if (egg) {
        setShowEasterEgg(egg);
        setTimeout(() => setShowEasterEgg(null), 10000); // Hide after 10 seconds
      }
    },
  });
  
  // For screen readers
  useEffect(() => {
    if (activeEasterEgg) {
      // Create an accessible announcement
      const announcement = document.createElement('div');
      announcement.setAttribute('role', 'status');
      announcement.setAttribute('aria-live', 'polite');
      announcement.className = 'sr-only';
      
      // Set announcement text based on easter egg
      switch (activeEasterEgg) {
        case 'konami':
          announcement.textContent = 'Easter egg activated: Konami code';
          break;
        case 'matrix':
          announcement.textContent = 'Easter egg activated: There is no spoon';
          break;
        case 'rabbit':
          announcement.textContent = 'Easter egg activated: Follow the white rabbit';
          break;
      }
      
      // Add to document, then remove after announcement
      document.body.appendChild(announcement);
      setTimeout(() => {
        if (announcement.parentNode) {
          document.body.removeChild(announcement);
        }
      }, 1000);
    }
  }, [activeEasterEgg]);

  return (
    <AnimatePresence>
      {showEasterEgg === 'konami' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              rotate: [0, 10, 0],
            }}
            transition={{ duration: 1 }}
            className="text-green-500 text-6xl font-bold"
          >
            CODE UNLOCKED
          </motion.div>
        </motion.div>
      )}
      
      {showEasterEgg === 'matrix' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <motion.div 
            className="w-full h-full flex items-center justify-center"
            initial={{ perspective: 1000 }}
          >
            <motion.div
              initial={{ rotateX: 0 }}
              animate={{ 
                rotateX: 360,
                transition: { duration: 3, ease: "easeInOut" } 
              }}
              className="text-green-400 text-3xl font-mono p-4 border border-green-500"
            >
              There is no spoon
            </motion.div>
          </motion.div>
        </motion.div>
      )}
      
      {showEasterEgg === 'rabbit' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 pointer-events-none"
        >
          <motion.div 
            className="absolute bottom-0 right-0 text-white text-4xl"
            initial={{ x: 100, y: 100 }}
            animate={{ 
              x: [-100, window.innerWidth],
              y: [window.innerHeight, window.innerHeight, window.innerHeight/2, 0, -100],
              transition: { duration: 8, ease: "easeInOut" } 
            }}
          >
            🐇
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
