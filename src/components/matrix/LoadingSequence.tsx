// src/components/matrix/LoadingSequence.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingSequence = () => {
  const [mounted, setMounted] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  // Set of messages to display - only the last word changes
  const messages = [
    { prefix: "Hello, ", word: "world..." },
    { prefix: "Hello, ", word: "people..." },
    { prefix: "Hello, ", word: "creatures..." },
  ];

  // Effect to handle the animation after mount
  useEffect(() => {
    setMounted(true);
    if (!mounted) return;
    
    // Calculate timings to ensure 5 second total duration
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
      if (phaseIndex === 0) {
        // For first phase, type out the entire message
        let charIndex = 0;
        const typeChar = () => {
          if (charIndex <= prefix.length + word.length) {
            setDisplayText((prefix + word).substring(0, charIndex));
            charIndex++;
            animationTimer = setTimeout(typeChar, typingSpeed);
          }
        };
        typeChar();
      } else {
        // For subsequent phases, keep prefix and type only the word
        setDisplayText(prefix);
        let charIndex = 0;
        const typeWord = () => {
          if (charIndex <= word.length) {
            setDisplayText(prefix + word.substring(0, charIndex));
            charIndex++;
            animationTimer = setTimeout(typeWord, typingSpeed);
          }
        };
        typeWord();
      }

      // Schedule next phase
      if (phaseIndex < messages.length - 1) {
        setTimeout(() => {
          animatePhase(phaseIndex + 1);
        }, phaseTime);
      }
    };

    // Start the animation
    animatePhase(0);
    
    // Master timer to ensure we complete in exactly 5 seconds
    masterTimer = setTimeout(() => {
      setIsComplete(true);
    }, totalDuration);
    
    // Cleanup
    return () => {
      clearTimeout(animationTimer);
      clearTimeout(masterTimer);
    };
  }, [mounted]);

  // Use another effect to handle completion/dismissal
  useEffect(() => {
    if (isComplete) {
      // This would be where you'd handle what happens after the animation completes
      // For example, redirect or show the main content
      console.log("Animation complete!");
    }
  }, [isComplete]);

  // Return a loading state during SSR
  if (!mounted) {
    return <div className="fixed inset-0 bg-black" />;
  }

  return (
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
  );
};

export default LoadingSequence;