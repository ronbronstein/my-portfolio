import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MATRIX_THEME } from '@/lib/theme';

interface DistortionEffectProps {
  active: boolean;
  x: number;
  y: number;
}

export const DistortionEffect = ({ active, x, y }: DistortionEffectProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 200;
    canvas.height = 200;

    let frame = 0;
    const maxFrames = 30;

    const animate = () => {
      if (frame >= maxFrames) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw distortion effect
      for (let i = 0; i < 20; i++) {
        const offset = Math.sin(frame * 0.2 + i * 0.5) * 10;
        ctx.fillStyle = `rgba(0, 255, 0, ${0.1 + Math.random() * 0.2})`;
        ctx.fillRect(
          50 + offset + Math.random() * 20,
          50 + Math.random() * 100,
          2 + Math.random() * 4,
          2 + Math.random() * 4
        );
      }

      frame++;
      requestAnimationFrame(animate);
    };

    animate();
  }, [active]);

  if (!active) return null;

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute pointer-events-none"
      style={{
        left: x - 100,
        top: y - 100,
        width: 200,
        height: 200,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  );
};

export default DistortionEffect;