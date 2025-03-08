// src/app/not-found.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import GlitchText from '@/components/matrix/GlitchText';
import TextDecoder from '@/components/matrix/TextDecoder';
import MatrixRain from '@/components/matrix/MatrixRain';

export default function NotFound() {
  const [showHomeLink, setShowHomeLink] = useState(false);
  
  useEffect(() => {
    // Show the home link after a brief delay
    const timer = setTimeout(() => {
      setShowHomeLink(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-black text-green-500">
      <MatrixRain />
      
      <div className="text-center z-10 space-y-6">
        <div className="text-6xl font-bold mb-4">
          <GlitchText text="404" />
        </div>
        
        <div className="text-xl">
          <TextDecoder 
            text="ERROR: The system cannot find the path specified." 
            duration={2000}
          />
        </div>
        
        {showHomeLink && (
          <div className="mt-12 animate-pulse">
            <Link 
              href="/"
              className="inline-block px-8 py-3 border border-green-500 text-green-400 hover:bg-green-900/30 
                       hover:text-green-300 transition-colors duration-300"
            >
              {"> Return to the Matrix"}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
