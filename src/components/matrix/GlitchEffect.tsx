// src/components/matrix/GlitchEffect.tsx
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, ReactNode } from 'react';

interface GlitchEffectProps {
  children: ReactNode;
  intensity?: 'low' | 'medium' | 'high';
  isActive?: boolean;
  className?: string;
}

const GlitchEffect = ({ 
  children, 
  intensity = 'medium',
  isActive = true,
  className = '' 
}: GlitchEffectProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Skip rendering special effects during SSR
  if (!mounted) {
    return <div className={className}>{children}</div>;
  }
  
  // Configure intensity values
  const intensityConfig = {
    low: {
      glitchFrequency: 5,
      translateRange: 2,
      skewRange: 0.5,
      opacityRange: 0.05
    },
    medium: {
      glitchFrequency: 7,
      translateRange: 3,
      skewRange: 1,
      opacityRange: 0.1
    },
    high: {
      glitchFrequency: 9,
      translateRange: 5,
      skewRange: 2,
      opacityRange: 0.2
    }
  };
  
  const config = intensityConfig[intensity];

  // Don't apply effect if not active
  if (!isActive) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Main content */}
      <motion.div
        animate={{
          x: [0, -config.translateRange, config.translateRange, 0],
          skewX: [0, -config.skewRange, config.skewRange, 0]
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 5,
        }}
      >
        {children}
      </motion.div>
      
      {/* Red/blue glitch channels */}
      <motion.div
        className="absolute inset-0 text-blue-500 mix-blend-screen"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, config.opacityRange, 0],
          x: [0, config.translateRange, 0],
          y: [0, -config.translateRange/2, 0],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatType: "mirror",
          repeatDelay: 3,
        }}
      >
        {children}
      </motion.div>
      
      <motion.div
        className="absolute inset-0 text-red-500 mix-blend-screen"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, config.opacityRange, 0],
          x: [0, -config.translateRange, 0],
          y: [0, config.translateRange/2, 0],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatType: "mirror",
          repeatDelay: 4,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default GlitchEffect;
