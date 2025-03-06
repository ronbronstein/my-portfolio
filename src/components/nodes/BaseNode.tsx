// src/components/nodes/BaseNode.tsx
'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MATRIX_THEME } from '@/lib/theme';

export interface NodeProps {
  id: string;
  title: string;
  isLocked?: boolean;
  isActive?: boolean;
  isMobile?: boolean;
  onClick?: () => void;
}

const BaseNode = ({ 
  id, 
  title, 
  isLocked = false, 
  isActive = false,
  isMobile = false,
  onClick 
}: NodeProps) => {
  const [wasLocked, setWasLocked] = useState(isLocked);
  const [showUnlockHint, setShowUnlockHint] = useState(false);

  // Track lock state changes
  useEffect(() => {
    if (wasLocked && !isLocked) {
      // Node was just unlocked
      console.log("Node unlocked:", id);
    }
    setWasLocked(isLocked);
  }, [isLocked, wasLocked, id]);

  // Adjust size based on mobile state
  const nodeSize = isMobile ? 'w-20 h-20' : 'w-24 h-24';
  const fontSize = isMobile ? 'text-xs' : 'text-sm';
  const lockSize = isMobile ? 'text-xl' : 'text-2xl';

  // Create a single variants object with all animations
  const nodeVariants: Variants = {
    initial: {}, // Default state
    pulse: {
      scale: [1, 1.05, 1],
      borderColor: ["rgb(75, 85, 75)", "rgb(0, 100, 0)", "rgb(75, 85, 75)"],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" // This is now a specific literal type
      }
    },
    glow: {
      boxShadow: [
        "0 0 5px rgba(0, 255, 0, 0.3)",
        "0 0 15px rgba(0, 255, 0, 0.5)",
        "0 0 5px rgba(0, 255, 0, 0.3)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" // This is now a specific literal type
      }
    }
  };

  return (
    <motion.div
      className={`
        ${nodeSize}
        rounded-full 
        flex items-center justify-center 
        cursor-pointer
        bg-black
        border-2
        ${isLocked ? 'border-gray-800' : 'border-green-500'}
        ${isActive ? 'border-green-400 shadow-[0_0_10px_rgba(0,255,0,0.3)]' : ''}
        relative
      `}
      whileHover={isLocked ? { scale: 1.02 } : { scale: isMobile ? 1.05 : 1.1 }}
      onClick={() => {
        if (isLocked) {
          // Show unlock hint briefly when clicked
          setShowUnlockHint(true);
          setTimeout(() => setShowUnlockHint(false), 2000);
        }
        if (onClick) onClick();
      }}
      // Use a single variants object and specify which animation state to use
      variants={nodeVariants}
      animate={isLocked ? "pulse" : isActive ? "glow" : "initial"}
      transition={{ 
        type: 'spring',
        stiffness: isMobile ? 400 : 300,
        damping: isMobile ? 25 : 20
      }}
    >
      <div className="text-center z-10">
        {isLocked ? (
          <span className={`text-gray-600 ${lockSize}`}>🔒</span>
        ) : (
          <span className={`${fontSize} ${isActive ? 'text-green-400' : 'text-green-600'}`}>
            {isMobile && title.length > 8 ? title.substring(0, 8) + '...' : title}
          </span>
        )}
      </div>
      
      {/* Unlock hint */}
      <AnimatePresence>
        {showUnlockHint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute whitespace-nowrap top-full mt-2 left-1/2 transform -translate-x-1/2 
                     bg-black/80 border border-green-500/40 px-3 py-1 rounded-md text-xs
                     text-green-400 z-50"
          >
            Unlock first
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BaseNode;