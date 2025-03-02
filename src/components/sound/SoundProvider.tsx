'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { matrixSounds } from '@/utils/soundEffects';

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playNodeUnlock: () => void;
  playNodeSelect: () => void;
  playModalOpen: () => void;
  playModalClose: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
    
    // Audio context will be initialized on first user interaction
    // through the click event listener in MatrixSoundEffects
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const playSound = useCallback((soundFunction: () => void) => {
    if (!isMuted) {
      try {
        soundFunction();
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    }
  }, [isMuted]);

  const value = {
    isMuted,
    toggleMute,
    playNodeUnlock: () => playSound(() => matrixSounds.playNodeUnlock()),
    playNodeSelect: () => playSound(() => matrixSounds.playNodeSelect()),
    playModalOpen: () => playSound(() => matrixSounds.playModalOpen()),
    playModalClose: () => playSound(() => matrixSounds.playModalClose())
  };

  return (
    <SoundContext.Provider value={value}>
      {children}
      {isInitialized && (
        <button
          onClick={toggleMute}
          className="fixed bottom-4 right-4 z-50 p-2 rounded-full bg-black/50 border border-green-500/30 hover:border-green-500/60 transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <span className="text-green-500 text-xl">🔇</span>
          ) : (
            <span className="text-green-500 text-xl">🔊</span>
          )}
        </button>
      )}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
}