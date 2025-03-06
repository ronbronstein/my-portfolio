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
    // Increase spacing between columns
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

      // Set the main text color - Using explicit green color
      context.fillStyle = '#00FF00';
      context.font = `${fontSize}px monospace`;
      context.globalAlpha = currentOpacity;

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        
        // Randomize character brightness
        const brightness = Math.random() * 0.5 + 0.5; // Between 0.5 and 1
        context.globalAlpha = currentOpacity * brightness;
        
        // Draw the character
        context.fillText(char, i * columnSpacing, drops[i] * fontSize);

        // Reset drops
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
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