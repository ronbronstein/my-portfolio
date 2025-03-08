// src/components/matrix/optimized-matrix-rain.tsx
'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

// Define interface for component props
interface OptimizedMatrixRainProps {
  className?: string;
  density?: number; // 0-1, controls column spacing
  speed?: number; // 0.1-2, controls drop speed
  fontSize?: number; // font size in pixels
  fadeAlpha?: number; // 0-1, controls trail length (lower = longer trails)
}

export const OptimizedMatrixRain = ({
  className = '',
  density = 0.8,
  speed = 0.4,       // Reduced from 1.0 to slow it down
  fontSize = 14,
  fadeAlpha = 0.05,  // Original value
}: OptimizedMatrixRainProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isClient, setIsClient] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isLowPowerMode = useMediaQuery('(prefers-reduced-motion: reduce)');

  // Optimize for mobile and low power mode
  const optimizedDensity = useMemo(() => {
    if (isLowPowerMode) return Math.max(0.4, density * 0.5);
    if (isMobile) return Math.max(0.5, density * 0.7);
    return density;
  }, [density, isMobile, isLowPowerMode]);

  const optimizedSpeed = useMemo(() => {
    if (isLowPowerMode) return Math.max(0.3, speed * 0.5);
    return speed;
  }, [speed, isLowPowerMode]);

  // The Matrix character set - same as original
  const MATRIX_CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

  // Set client-side rendering flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Main rain animation effect
  useEffect(() => {
    // Skip if not client-side or no canvas
    if (!isClient) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set up canvas context
    const context = canvas.getContext('2d');
    if (!context) return;

    // Resize canvas to match window size
    const resizeCanvas = () => {
      if (!canvas) return;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Initial resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Calculate column spacing based on font size and density
    const columnSpacing = fontSize * (2 - optimizedDensity); // Similar to original
    const columns = Math.ceil(window.innerWidth / columnSpacing);
    
    // Initialize drops with staggered starting positions - just like original
    const drops: number[] = new Array(columns).fill(0).map(() => -Math.floor(Math.random() * 100));

    // Draw frame
    const draw = () => {
      if (!canvas || !context) return;
      
      // Clear with semi-transparent black for trailing effect
      context.fillStyle = `rgba(0, 0, 0, ${fadeAlpha})`;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set font once
      context.font = `${fontSize}px monospace`;
      
      // Set to the original green color
      context.fillStyle = '#00FF41'; // Original Matrix green
      
      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Get random character
        const char = MATRIX_CHARS.charAt(Math.floor(Math.random() * MATRIX_CHARS.length));
        
        // Calculate position
        const x = i * columnSpacing;
        const y = drops[i] * fontSize;
        
        // Just like the original - basic brightness variation
        if (Math.random() > 0.975) {
          context.fillStyle = '#AAFFAA'; // Slightly brighter green for 2.5% of characters
        } else {
          context.fillStyle = '#00FF41'; // Standard Matrix green
        }
        
        // Draw the character
        context.fillText(char, x, y);
        
        // Reset drop or continue falling
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        } else {
          drops[i] += optimizedSpeed; // Use our optimized speed
        }
      }
    };

    // Animation loop with throttling like original
    let animationId: number;
    let lastFrameTime = 0;
    const targetFPS = isLowPowerMode ? 30 : 60;
    const frameInterval = 1000 / targetFPS;
    
    const animate = (timestamp: number) => {
      // Throttle frame rate
      if (timestamp - lastFrameTime >= frameInterval) {
        lastFrameTime = timestamp;
        draw();
      }
      animationId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [isClient, fontSize, optimizedDensity, optimizedSpeed, fadeAlpha, isLowPowerMode]);

  // Don't render during SSR
  if (!isClient) {
    return null;
  }

  // Render the canvas - identical to original
  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: -1 }}
      aria-hidden="true"
    />
  );
};

export default OptimizedMatrixRain;