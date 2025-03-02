// src/components/matrix/LoadingSequence.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchText from './GlitchText';

const messages = [
  { text: "Wake up, world...", delay: 100 },
  { text: "Wake up, people...", delay: 100 },
  { text: "Wake up, creatures...", delay: 100 },
  { text: "Welcome to my reality.", delay: 150 }
];

const LoadingSequence = () => {
  console.log('LoadingSequence rendered'); // Debug log
  const [mounted, setMounted] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  // Debug mount state
  useEffect(() => {
    console.log('LoadingSequence mounted');
    setMounted(true);
  }, []);

  // Handle text animation after mounting
  useEffect(() => {
    if (!mounted) {
      console.log('Not mounted yet');
      return;
    }

    console.log('Starting typewriter effect');
    let timeoutId: NodeJS.Timeout;
    
    const typeWriter = (text: string, index: number) => {
      if (index < text.length) {
        setDisplayedText(prev => prev + text.charAt(index));
        timeoutId = setTimeout(() => {
          typeWriter(text, index + 1);
        }, messages[currentMessageIndex].delay);
      } else {
        timeoutId = setTimeout(() => {
          if (currentMessageIndex < messages.length - 1) {
            setCurrentMessageIndex(prev => prev + 1);
            setDisplayedText('');
          } else {
            setIsComplete(true);
          }
        }, 1000);
      }
    };

    typeWriter(messages[currentMessageIndex].text, 0);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [currentMessageIndex, mounted]);

  // Return a simple loading state during SSR
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
        <div className="text-green-500">{displayedText}</div>
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