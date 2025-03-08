// src/hooks/use-keyboard-commander.ts
import { useEffect, useState } from 'react';
import { EasterEgg } from '@/types';

// Define special keyboard sequences
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
const MATRIX_CODE = ['t', 'h', 'e', 'r', 'e', 'i', 's', 'n', 'o', 's', 'p', 'o', 'o', 'n'];
const FOLLOW_RABBIT = ['f', 'o', 'l', 'l', 'o', 'w', 't', 'h', 'e', 'w', 'h', 'i', 't', 'e', 'r', 'a', 'b', 'b', 'i', 't'];

;

interface UseKeyboardCommanderOptions {
  onTrigger?: (easterEgg: EasterEgg) => void;
  enabled?: boolean;
}

export function useKeyboardCommander(options: UseKeyboardCommanderOptions = {}) {
  const { onTrigger, enabled = true } = options;
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [activeEasterEgg, setActiveEasterEgg] = useState<EasterEgg>(null);

  // Check if a sequence matches one of our Easter egg patterns
  const checkSequence = (sequence: string[]): EasterEgg => {
    // Convert sequences to strings for easier comparison
    const sequenceStr = sequence.join('');
    const konamiStr = KONAMI_CODE.join('');
    const matrixStr = MATRIX_CODE.join('');
    const rabbitStr = FOLLOW_RABBIT.join('');

    // Check for matches, allowing for partial matches at the end
    if (konamiStr.includes(sequenceStr) && sequenceStr.length === KONAMI_CODE.length) {
      return 'konami';
    }
    if (matrixStr.includes(sequenceStr) && sequenceStr.length === MATRIX_CODE.length) {
      return 'matrix';
    }
    if (rabbitStr.includes(sequenceStr) && sequenceStr.length === FOLLOW_RABBIT.length) {
      return 'rabbit';
    }

    return null;
  };

  useEffect(() => {
    if (!enabled) return;

    // Handle keydown events
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Add the key to our sequence
      const newSequence = [...keySequence, event.key.toLowerCase()];
      
      // Keep only the last 20 keys (longest sequence)
      if (newSequence.length > 20) {
        newSequence.shift();
      }
      
      setKeySequence(newSequence);
      
      // Check if we've triggered an Easter egg
      const egg = checkSequence(newSequence);
      if (egg && egg !== activeEasterEgg) {
        setActiveEasterEgg(egg);
        
        // Call the callback if provided
        if (onTrigger) {
          onTrigger(egg);
        }
        
        // Reset after a delay
        setTimeout(() => {
          setActiveEasterEgg(null);
          setKeySequence([]);
        }, 5000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [keySequence, activeEasterEgg, onTrigger, enabled]);

  return {
    activeEasterEgg,
    keySequence,
  };
}
