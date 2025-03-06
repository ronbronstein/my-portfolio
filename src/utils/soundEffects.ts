// src/utils/soundEffects.ts

export class MatrixSoundEffects {
  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      document.addEventListener('click', () => {
        if (!this.audioContext) {
          this.ensureContext();
        }
      }, { once: true });
    }
  }

  private ensureContext() {
    if (typeof window === 'undefined') return null;
    
    if (!this.audioContext) {
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.gainNode = this.audioContext.createGain();
        this.gainNode.connect(this.audioContext.destination);
        this.setVolume(0.3);
      } catch (e) {
        console.error('Failed to create audio context:', e);
      }
    }
    return this.audioContext;
  }

  setVolume(value: number) {
    if (this.gainNode) {
      this.gainNode.gain.value = Math.max(0, Math.min(1, value));
    }
  }

  playNodeUnlock() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    
    try {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
  
      oscillator.connect(gainNode);
      gainNode.connect(this.gainNode!);
  
      oscillator.frequency.setValueAtTime(1000, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.2);
  
      gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
  
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.2);
    } catch (e) {
      console.error('Error playing sound:', e);
    }
  }

  playNodeSelect() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    
    try {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
  
      oscillator.connect(gainNode);
      gainNode.connect(this.gainNode!);
  
      oscillator.frequency.setValueAtTime(2000, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
  
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.1);
    } catch (e) {
      console.error('Error playing sound:', e);
    }
  }

  playModalOpen() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    
    try {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
  
      oscillator.connect(gainNode);
      gainNode.connect(this.gainNode!);
  
      oscillator.frequency.setValueAtTime(500, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.15);
  
      gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
  
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.15);
    } catch (e) {
      console.error('Error playing sound:', e);
    }
  }

  playModalClose() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    
    try {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
  
      oscillator.connect(gainNode);
      gainNode.connect(this.gainNode!);
  
      oscillator.frequency.setValueAtTime(1500, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.15);
  
      gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
  
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.15);
    } catch (e) {
      console.error('Error playing sound:', e);
    }
  }
}

export const matrixSounds = new MatrixSoundEffects();