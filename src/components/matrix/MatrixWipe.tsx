// src/components/matrix/MatrixWipe.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MATRIX_CHARS } from '@/lib/theme';

interface MatrixWipeProps {
  isActive: boolean;
  onComplete?: () => void;
  direction?: 'down' | 'up' | 'left' | 'right';
  duration?: number;
}

const MatrixWipe = ({ 
  isActive, 
  onComplete,
  direction = 'down',
  duration = 1200
}: MatrixWipeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    if (!isActive || isComplete) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Calculate parameters based on direction
    let progress = 0;
    let chars: { x: number, y: number, char: string, opacity: number }[] = [];
    
    // Generate chars array based on direction
    if (direction === 'down') {
      // Single falling line down the middle
      const centerX = Math.floor(canvas.width / 2);
      const totalChars = Math.ceil(canvas.height / 20) + 5; // +5 for overflow
      
      chars = Array(totalChars).fill(0).map((_, i) => ({
        x: centerX,
        y: -20 * (i + 1), // Start above screen
        char: MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
        opacity: 1
      }));
    }
    
    // Animation timing
    const startTime = Date.now();
    const endTime = startTime + duration;
    
    // Animation loop
    const animate = () => {
      const now = Date.now();
      progress = Math.min(1, (now - startTime) / duration);
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw characters
      ctx.font = '20px monospace';
      
      // Update positions based on direction
      if (direction === 'down') {
        // Move all characters down
        chars.forEach((char, i) => {
          const speed = 5;
          char.y += speed;
          
          // Add glow effect
          ctx.shadowColor = '#00ff00';
          ctx.shadowBlur = 15;
          ctx.fillStyle = `rgba(0, 255, 0, ${char.opacity})`;
          
          // Draw character
          ctx.fillText(char.char, char.x, char.y);
          
          // Replace character with new one when it goes off screen
          if (char.y > canvas.height) {
            char.y = -20;
            char.char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
          }
        });
      }
      
      // Check if animation is complete
      if (now < endTime) {
        requestAnimationFrame(animate);
      } else {
        setIsComplete(true);
        if (onComplete) onComplete();
      }
    };
    
    // Start animation
    animate();
    
  }, [isActive, direction, duration, onComplete, isComplete]);
  
  if (!isActive) return null;
  
  return (
    <AnimatePresence>
      {isActive && !isComplete && (
        <motion.canvas
          ref={canvasRef}
          className="fixed inset-0 z-40 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </AnimatePresence>
  );
};

export default MatrixWipe;