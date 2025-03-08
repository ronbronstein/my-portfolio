// src/components/matrix/TextDecoder.tsx
'use client';

import { useState, useEffect } from 'react';
import { MATRIX_CHARS } from '@/lib/theme';

interface TextDecoderProps {
  text: string;
  className?: string;
  delay?: number; // Delay before starting in ms
  duration?: number; // Duration of effect in ms
  onComplete?: () => void;
}

const TextDecoder = ({ 
  text, 
  className = '', 
  delay = 0,
  duration = 1500,
  onComplete 
}: TextDecoderProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isDecoding, setIsDecoding] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;
    
    // Wait for delay before starting
    timeout = setTimeout(() => {
      setIsDecoding(true);
      
      const charCount = text.length;
      const stepTime = duration / (charCount * 3); // Each char gets multiple steps
      let currentStep = 0;
      const maxSteps = charCount * 3;
      
      interval = setInterval(() => {
        currentStep++;
        
        // Build the current text state
        let result = '';
        
        for (let i = 0; i < text.length; i++) {
          // Calculate the "decoding progress" for this character
          const charProgress = currentStep - (i * 2);
          
          if (charProgress <= 0) {
            // Not started decoding this character yet
            result += getRandomMatrixChar();
          } else if (charProgress < 3) {
            // In process of decoding (show random chars)
            result += getRandomMatrixChar();
          } else {
            // Fully decoded, show actual character
            result += text[i];
          }
        }
        
        setDisplayText(result);
        
        // Check if finished
        if (currentStep >= maxSteps) {
          clearInterval(interval);
          setDisplayText(text);
          setIsDecoding(false);
          if (onComplete) onComplete();
        }
      }, stepTime);
    }, delay);
    
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay, duration, onComplete]);
  
  // Helper function to get random Matrix character
  const getRandomMatrixChar = () => {
    return MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
  };
  
  return (
    <span className={`font-mono ${className}`}>
      {displayText || getRandomMatrixChar()}
    </span>
  );
};

export default TextDecoder;
