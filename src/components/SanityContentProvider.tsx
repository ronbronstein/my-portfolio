'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useSanityContent } from '@/hooks/useSanityContent';
import { Project, Music, Essay, Sticker } from '@/lib/sanity.client';

interface SanityContentContextType {
  projects: Project[];
  music: Music[];
  essays: Essay[];
  stickers: Sticker[];
  loading: boolean;
  error: Error | null;
  usingMockData?: boolean;
}

// Create context with default values
const SanityContentContext = createContext<SanityContentContextType>({
  projects: [],
  music: [],
  essays: [],
  stickers: [],
  loading: true,
  error: null,
  usingMockData: false
});

export function SanityContentProvider({ children }: { children: ReactNode }) {
  const { projects, music, essays, stickers, loading, error, usingMockData } = useSanityContent();
  
  // Log status to help with debugging
  if (usingMockData) {
    console.log('⚠️ Using mock Sanity data due to connection error');
    console.log('Please check your Sanity project configuration in .env.local file');
    console.log('If this is intentional (development without Sanity), you can ignore this message');
  }
  
  return (
    <SanityContentContext.Provider value={{ 
      projects, 
      music, 
      essays, 
      stickers, 
      loading, 
      error,
      usingMockData 
    }}>
      {usingMockData && process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-2 left-2 bg-yellow-900/80 text-yellow-300 px-3 py-2 text-xs rounded z-50 max-w-xs border border-yellow-500/50">
          Using mock data (Sanity connection error). Check console for details.
        </div>
      )}
      {children}
    </SanityContentContext.Provider>
  );
}

// Custom hook to use the context
export function useSanityContentContext() {
  return useContext(SanityContentContext);
}