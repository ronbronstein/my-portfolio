// src/hooks/useMediaQuery.ts

'use client';

import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  // Initialize to false for SSR to avoid hydration mismatch
  const [matches, setMatches] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Create media query list
    const mediaQuery = window.matchMedia(query);
    
    // Set initial value
    setMatches(mediaQuery.matches);

    // Create event listener
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener
    mediaQuery.addEventListener('change', handler);

    // Cleanup
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]); // Only re-run if query changes

  // Always return false during SSR to avoid hydration mismatch
  return mounted ? matches : false;
}
