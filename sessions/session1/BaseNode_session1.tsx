// src/components/nodes/BaseNode.tsx
'use client';

import { motion } from 'framer-motion';
import { MATRIX_THEME } from '@/lib/theme';

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
  return (
    <motion.div
      className={`absolute cursor-pointer`}
      style={{ left: x, top: y }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        borderColor: isActive ? MATRIX_THEME.colors.primary : MATRIX_THEME.colors.accent.dark 
      }}
      whileHover={{ scale: 1.1 }}
      onClick={!isLocked ? onClick : undefined}
    >
      <div 
        className={`
          w-24 h-24 rounded-full border-2 flex items-center justify-center
          ${isLocked ? 'bg-gray-900 border-gray-700' : 'bg-black border-green-500'}
          ${isActive ? 'border-green-400 shadow-lg shadow-green-500/50' : ''}
        `}
      >
        <div className="text-center">
          {isLocked ? (
            <span className="text-gray-500 text-2xl">🔒</span>
          ) : (
            <span className={`text-sm ${isActive ? 'text-green-400' : 'text-green-600'}`}>
              {title}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BaseNode;