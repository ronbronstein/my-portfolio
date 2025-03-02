// src/components/nodes/BaseNode.tsx
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MATRIX_THEME } from '@/lib/theme';

export interface NodeProps {
  id: string;
  title: string;
  isLocked?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

const BaseNode = ({ 
  id, 
  title, 
  isLocked = false, 
  isActive = false, 
  onClick 
}: NodeProps) => {
  const [wasLocked, setWasLocked] = useState(isLocked);

  // Track lock state changes
  useEffect(() => {
    setWasLocked(isLocked);
  }, [isLocked]);

  return (
    <motion.div
      className={`
        w-24 h-24 
        rounded-full 
        flex items-center justify-center 
        cursor-pointer
        bg-black
        border-2
        ${isLocked ? 'border-gray-800' : 'border-green-500'}
        ${isActive ? 'border-green-400 shadow-[0_0_20px_rgba(0,255,0,0.3)]' : ''}
      `}
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
    >
      <div className="text-center z-10">
        {isLocked ? (
          <span className="text-gray-600 text-2xl">🔒</span>
        ) : (
          <span className={`text-sm ${isActive ? 'text-green-400' : 'text-green-600'}`}>
            {title}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default BaseNode;