'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface GlitchTextProps {
  text: string;
}

const GlitchText = ({ text }: GlitchTextProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className="text-green-500">{text}</span>;
  }

  return (
    <motion.div
      className="relative"
      animate={{
        textShadow: [
          "0 0 0px rgba(0,255,0,0.5)",
          "2px 2px 2px rgba(0,255,0,0.7)",
          "0 0 0px rgba(0,255,0,0.5)"
        ]
      }}
      transition={{
        duration: 0.2,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    >
      <span className="relative inline-block">
        <motion.span
          className="absolute top-0 left-0 text-green-500"
          animate={{
            x: [-2, 2, -2],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity
          }}
        >
          {text}
        </motion.span>
        <span className="text-green-400">{text}</span>
      </span>
    </motion.div>
  );
};

export default GlitchText;
