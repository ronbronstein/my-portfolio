// src/components/matrix/LoadingSequence.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ClientOnly from '../ClientOnly';

const LoadingSequence = () => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  // Simplified loading message
  const message = "Accessing The Matrix...";

  // Effect to handle the animation
  useEffect(() => {
    let charIndex = 0;
    let typingInterval: NodeJS.Timeout;
    
    const typeWriter = () => {
      if (charIndex <= message.length) {
        setDisplayText(message.substring(0, charIndex));
        charIndex++;
        typingInterval = setTimeout(typeWriter, 100);
      } else {
        // Complete after full message is displayed
        setTimeout(() => {
          setIsComplete(true);
        }, 800);
      }
    };
    
    // Start typing after a short delay
    const startDelay = setTimeout(() => {
      typeWriter();
    }, 500);
    
    // Safety timeout to ensure loading completes
    const safetyTimeout = setTimeout(() => {
      setIsComplete(true);
    }, 5000);
    
    return () => {
      clearTimeout(typingInterval);
      clearTimeout(startDelay);
      clearTimeout(safetyTimeout);
    };
  }, []);

  return (
    <ClientOnly>
      <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl md:text-4xl font-mono"
        >
          <div className="text-green-500">{displayText}</div>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="text-green-500"
          >
            _
          </motion.span>
        </motion.div>
      </div>
    </ClientOnly>
  );
};

export default LoadingSequence;