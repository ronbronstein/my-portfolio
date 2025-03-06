// src/components/matrix/EnhancedMatrixRain.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';

// Define raindrop type
interface Raindrop {
  x: number;
  y: number;
  speed: number;
  length: number;
  char: string;
  brightness: number;
  hue: number; // For subtle color variation
}

const MATRIX_CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

export const EnhancedMatrixRain = () => {
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

    // Initialize raindrops
    const fontSize = 14;
    const columnSpacing = fontSize * 1.2;
    const columns = Math.ceil(canvas.width / columnSpacing);
    
    // Create raindrops with varying properties
    const raindrops: Raindrop[] = [];
    
    for (let i = 0; i < columns; i++) {
      // Randomize starting positions
      const drop: Raindrop = {
        x: i * columnSpacing,
        y: Math.random() * canvas.height * 2 - canvas.height, // Some start above viewport
        speed: 1 + Math.random() * 2, // Random speeds
        length: 5 + Math.floor(Math.random() * 15), // Random trail lengths
        char: MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
        brightness: 0.5 + Math.random() * 0.5, // Random brightness
        hue: Math.random() > 0.97 ? Math.random() * 60 - 30 : 0 // Occasionally add subtle hue variation
      };
      raindrops.push(drop);
    }
    
    // Fade effect value
    let currentOpacity = 1;
    const startTime = Date.now();
    const fadeDuration = 8000; // 8 seconds fade
    const finalOpacity = 0.3; // Final transparency level
    
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
      context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Set font
      context.font = `${fontSize}px monospace`;
      
      // Update and draw each raindrop
      raindrops.forEach((drop, i) => {
        // Determine character to draw (randomly change)
        if (Math.random() > 0.95) {
          drop.char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        }
        
        // Draw the character with its custom properties
        // Set the color based on brightness and hue
        const colorBrightness = Math.floor(drop.brightness * 255);
        let color;
        
        if (drop.hue === 0) {
          // Regular green
          color = `rgb(0, ${colorBrightness}, 0)`;
        } else {
          // Slight color variation
          color = `hsl(${120 + drop.hue}, 100%, ${colorBrightness/255 * 50}%)`;
        }
        
        context.fillStyle = color;
        context.globalAlpha = currentOpacity;
        
        // Draw the character
        context.fillText(drop.char, drop.x, drop.y);
        
        // Move the raindrop
        drop.y += drop.speed;
        
        // Reset if it goes off screen
        if (drop.y > canvas.height) {
          drop.y = 0;
          drop.x = i * columnSpacing;
          drop.speed = 1 + Math.random() * 2;
          drop.length = 5 + Math.floor(Math.random() * 15);
          drop.brightness = 0.5 + Math.random() * 0.5;
          drop.hue = Math.random() > 0.97 ? Math.random() * 60 - 30 : 0;
        }
      });
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

export default EnhancedMatrixRain;