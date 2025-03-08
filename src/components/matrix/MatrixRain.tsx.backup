// src/components/matrix/MatrixRain.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';

const MATRIX_CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

export const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas size
    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize drops
    const fontSize = 14;
    const columnSpacing = fontSize * 1.5; // 1.5x spacing between columns
    const columns = Math.ceil(canvas.width / columnSpacing);
    const drops: number[] = new Array(columns).fill(1);
    
    // Track rain opacity
    let currentOpacity = 1;
    const startTime = Date.now();
    const fadeDuration = 8000; // 8 seconds fade
    const finalOpacity = 0.3; // Higher final opacity

    // Animation loop
    const draw = () => {
      if (!canvas || !context) return;
      
      // Calculate current opacity based on time
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < fadeDuration) {
        currentOpacity = 1 - ((1 - finalOpacity) * (elapsedTime / fadeDuration));
      } else {
        currentOpacity = finalOpacity;
      }

      // Softer fade trail
      context.fillStyle = 'rgba(0, 0, 0, 0.1)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        
        // Calculate position
        const x = i * columnSpacing;
        const y = Math.floor(drops[i]) * fontSize;
        
        // Basic opacity
        context.globalAlpha = currentOpacity;
        
        // Completely random glowing (not tied to specific drops)
        // Just a small percentage of ALL characters will glow randomly
        if (Math.random() > 0.99) { // 1% chance for any character to glow
          context.fillStyle = '#5FFF5F'; // Brighter green for highlights
          context.globalAlpha = 0.9; // Brighter
        } else {
          context.fillStyle = '#00FF00'; // Regular green
        }
        
        // Draw the character
        context.font = `${fontSize}px monospace`;
        context.fillText(char, x, y);
        
        // Reset drops
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Slow down the rain
        drops[i] += 0.4; // 40% of original speed
      }
    };

    // Run animation
    let animationId: number;
    const animate = () => {
      draw();
      animationId = requestAnimationFrame(animate);
    };
    
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isClient]); // Only run when client-side rendering is active

  // Don't render anything server-side to prevent hydration errors
  if (!isClient) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
};

export default MatrixRain;