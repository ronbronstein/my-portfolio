// src/components/matrix/LoadingSequence.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextDecoder from './TextDecoder';
import ClientOnly from '../ClientOnly';

const LoadingSequence = () => {
  const [phase, setPhase] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const phases = [
    { text: "Accessing the Matrix...", delay: 300, duration: 2000 },
    { text: "Hello, World", delay: 300, duration: 1500 },
    { text: "Hello, People", delay: 300, duration: 1500 },
    { text: "Hello, Creatures", delay: 300, duration: 1500 },
    { text: "Reality Loading...", delay: 300, duration: 1500 }
  ];

  // Progress through phases
  useEffect(() => {
    if (phase >= phases.length) {
      // All phases complete
      const timer = setTimeout(() => {
        setIsComplete(true);
      }, 800);
      return () => clearTimeout(timer);
    }
    
    // Setup timeout for next phase
    const timer = setTimeout(() => {
      setPhase(prev => prev + 1);
    }, phases[phase].delay + phases[phase].duration + 1000); // Add 1 second pause between phases
    
    return () => clearTimeout(timer);
  }, [phase, phases.length]);
  
  // Add a safety timeout to ensure loading eventually completes
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      setIsComplete(true);
    }, 12000); // 12 second max loading time
    
    return () => clearTimeout(safetyTimer);
  }, []);

  return (
    <ClientOnly>
      <AnimatePresence>
        {!isComplete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-2xl md:text-4xl font-mono relative"
            >
              {/* Glitchy background elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                    x: [-5, 5, -5],
                    scale: [0.98, 1.02, 0.98]
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="absolute w-full h-full -z-10"
                >
                  <div className="absolute -inset-10 bg-green-500/5 blur-2xl rounded-full" />
                  <div className="absolute -inset-1 bg-green-500/10 blur-md" />
                </motion.div>
              </div>
              
              {/* Text with decoder effect */}
              <div className="flex flex-col items-center">
                <div className="text-green-500 mb-6 relative">
                  {phase < phases.length && (
                    <TextDecoder
                      text={phases[phase].text}
                      duration={phases[phase].duration}
                      className="inline-block"
                    />
                  )}
                  
                  {/* Blinking cursor */}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="ml-1 inline-block text-green-500"
                  >
                    █
                  </motion.span>
                </div>
                
                {/* "Status" lines that appear as loading progresses */}
                <motion.div 
                  className="text-sm text-green-500/70 mt-4 font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: phase > 1 ? 1 : 0 }}
                >
                  <div className="flex flex-col items-start space-y-1">
                    {phase > 1 && <div>{'> '}Bypassing security protocols...</div>}
                    {phase > 2 && <div>{'> '}Neural network connected</div>}
                    {phase > 3 && <div>{'> '}Signal established</div>}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ClientOnly>
  );
};

export default LoadingSequence;