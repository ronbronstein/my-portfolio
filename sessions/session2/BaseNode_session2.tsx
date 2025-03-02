// src/components/nodes/BaseNode.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MATRIX_THEME } from '@/lib/theme';
import { DistortionEffect } from './DistortionEffect';

export interface NodeProps {
  id: string;
  title: string;
  x: number;
  y: number;
  isLocked?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

const BaseNode = ({ 
  id, 
  title, 
  x, 
  y, 
  isLocked = false, 
  isActive = false, 
  onClick 
}: NodeProps) => {
  const [showDistortion, setShowDistortion] = useState(false);
  const [wasLocked, setWasLocked] = useState(isLocked);

  // Trigger distortion effect when node unlocks
  useEffect(() => {
    if (wasLocked && !isLocked) {
      setShowDistortion(true);
      const timer = setTimeout(() => setShowDistortion(false), 1000);
      return () => clearTimeout(timer);
    }
    setWasLocked(isLocked);
  }, [isLocked, wasLocked]);

  return (
    <>
      <AnimatePresence>
        {showDistortion && (
          <DistortionEffect active={true} x={x + 12} y={y + 12} />
        )}
      </AnimatePresence>
      
      <motion.div
        className="absolute cursor-pointer"
        style={{ left: x, top: y }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          borderColor: isActive ? MATRIX_THEME.colors.primary : MATRIX_THEME.colors.accent.dark 
        }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: `0 0 20px ${isLocked ? '#333' : MATRIX_THEME.colors.primary}` 
        }}
        onClick={!isLocked ? onClick : undefined}
      >
        <div 
          className={`
            w-24 h-24 rounded-full border-2 flex items-center justify-center
            transition-all duration-300
            ${isLocked ? 'bg-gray-900 border-gray-700' : 'bg-black border-green-500'}
            ${isActive ? 'border-green-400 shadow-lg shadow-green-500/50' : ''}
          `}
        >
          <motion.div 
            className="text-center"
            animate={{ 
              scale: isActive ? [1, 1.1, 1] : 1,
              transition: { duration: 2, repeat: Infinity } 
            }}
          >
            {isLocked ? (
              <span className="text-gray-500 text-2xl">🔒</span>
            ) : (
              <span className={`text-sm ${isActive ? 'text-green-400' : 'text-green-600'}`}>
                {title}
              </span>
            )}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default BaseNode;