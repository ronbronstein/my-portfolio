// src/components/nodes/ConnectionLine.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ClientOnly from '../ClientOnly';

interface ConnectionLineProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isActive: boolean;
  isLocked: boolean;
}

const ConnectionLine = ({
  startX,
  startY,
  endX,
  endY,
  isActive,
  isLocked
}: ConnectionLineProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if (!isClient) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Draw line
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    
    if (isLocked) {
      ctx.strokeStyle = 'rgba(0, 50, 0, 0.3)';
    } else {
      const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
      gradient.addColorStop(0, 'rgba(0, 255, 70, 0.5)');
      gradient.addColorStop(1, 'rgba(0, 255, 70, 0.2)');
      ctx.strokeStyle = gradient;
    }
    
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Clean up
    return () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [startX, startY, endX, endY, isLocked, isClient]);
  
  // Skip rendering on server or if not yet mounted on client
  if (!isClient) {
    return null;
  }
  
  // If locked, just render the canvas
  if (isLocked) {
    return (
      <canvas 
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
      />
    );
  }
  
  // If active, add data flow animation along the line
  return (
    <>
      <canvas 
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
      />
      
      {isActive && (
        <svg 
          className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none" 
          style={{ overflow: 'visible' }}
        >
          <motion.circle
            cx={startX}
            cy={startY}
            r="4"
            fill="#00ff00"
            filter="drop-shadow(0 0 3px #00ff00)"
            animate={{
              cx: [startX, endX],
              cy: [startY, endY],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
        </svg>
      )}
    </>
  );
};

// Wrap the entire component for client-only rendering
const SafeConnectionLine = (props: ConnectionLineProps) => {
  return (
    <ClientOnly>
      <ConnectionLine {...props} />
    </ClientOnly>
  );
};

export default SafeConnectionLine;