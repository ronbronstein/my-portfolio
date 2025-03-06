// src/components/matrix/LoadingSequence.tsx

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ClientOnly from '../ClientOnly';

const LoadingSequence = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Set of messages to display - only the last word changes
  const messages = [
    { prefix: "Hello, ", word: "world..." },
    { prefix: "Hello, ", word: "people..." },
    { prefix: "Hello, ", word: "creatures..." },
    { prefix: "Welcome to my ", word: "reality." },
  ];

  // Effect to handle the animation
  useEffect(() => {
    // Calculate timings to ensure consistent duration
    const totalDuration = 5000; // 5 seconds in ms
    const phaseTime = totalDuration / messages.length;
    const typingSpeed = 50; // ms per character

    let animationTimer: NodeJS.Timeout;
    let masterTimer: NodeJS.Timeout;

    // Function to display each phase
    const animatePhase = (phaseIndex: number) => {
      if (phaseIndex >= messages.length) {
        setIsComplete(true);
        return;
      }

      const { prefix, word } = messages[phaseIndex];
      
      // When starting a new phase, immediately show the prefix
      setDisplayText(prefix);
      
      let charIndex = 0;
      const typeWord = () => {
        if (charIndex <= word.length) {
          setDisplayText(prefix + word.substring(0, charIndex));
          charIndex++;
          animationTimer = setTimeout(typeWord, typingSpeed);
        } else if (phaseIndex < messages.length - 1) {
          // Schedule next phase after a delay
          animationTimer = setTimeout(() => {
            animatePhase(phaseIndex + 1);
          }, 700); // Pause between messages
        }
      };
      
      typeWord();
    };

    // Start the animation
    const startTimer = setTimeout(() => {
      animatePhase(0);
    }, 300);
    
    // Master timer to ensure we complete in exactly 5 seconds
    masterTimer = setTimeout(() => {
      setIsComplete(true);
    }, totalDuration + 500);
    
    // Cleanup
    return () => {
      clearTimeout(animationTimer);
      clearTimeout(masterTimer);
      clearTimeout(startTimer);
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