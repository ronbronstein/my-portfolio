'use client';

import { motion } from 'framer-motion';
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

  // Track lock state changes
  useEffect(() => {
    setWasLocked(isLocked);
  }, [isLocked]);

  // Adjust size based on mobile state
  const nodeSize = isMobile ? 'w-20 h-20' : 'w-24 h-24';
  const fontSize = isMobile ? 'text-xs' : 'text-sm';
  const lockSize = isMobile ? 'text-xl' : 'text-2xl';

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
        ${isActive ? 'border-green-400 shadow-[0_0_20px_rgba(0,255,0,0.3)]' : ''}
      `}
      whileHover={{ scale: isMobile ? 1.05 : 1.1 }}
      onClick={onClick}
      // Reduced motion on mobile
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
    </motion.div>
  );
};

export default BaseNode;