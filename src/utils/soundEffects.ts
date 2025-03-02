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
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.gainNode = this.audioContext.createGain();
        this.gainNode.connect(this.audioContext.destination);
        this.setVolume(0.3);
      }
      return this.audioContext!;
    }
  
    setVolume(value: number) {
      if (this.gainNode) {
        this.gainNode.gain.value = Math.max(0, Math.min(1, value));
      }
    }
  
    playNodeUnlock() {
      const ctx = this.ensureContext();
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
    }
  
    playNodeSelect() {
      const ctx = this.ensureContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
  
      oscillator.connect(gainNode);
      gainNode.connect(this.gainNode!);
  
      oscillator.frequency.setValueAtTime(2000, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
  
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.1);
    }
  
    playModalOpen() {
      const ctx = this.ensureContext();
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
    }
  
    playModalClose() {
      const ctx = this.ensureContext();
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
    }
  }
  
  export const matrixSounds = new MatrixSoundEffects();