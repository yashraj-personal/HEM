// Safe, client-side Web Audio API music box synthesizer
// 100% self-contained, offline-ready, no external audio files required, strictly OFF by default.

class AmbientMusicBox {
  private audioCtx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private timerId: number | null = null;
  private step: number = 0;
  private listeners: Set<(state: { isPlaying: boolean; isMuted: boolean }) => void> = new Set();

  // Dreamy celestial lullaby notes (Frequencies in Hz: C5, D5, E5, G5, A5, C6...)
  private melody = [
    523.25, // C5
    659.25, // E5
    783.99, // G5
    1046.50, // C6
    880.00, // A5
    783.99, // G5
    659.25, // E5
    587.33, // D5
    523.25, // C5
    587.33, // D5
    659.25, // E5
    783.99, // G5
    659.25, // E5
    523.25, // C5
    587.33, // D5
    523.25  // C5
  ];

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  public subscribe(listener: (state: { isPlaying: boolean; isMuted: boolean }) => void) {
    this.listeners.add(listener);
    listener({ isPlaying: this.isPlaying, isMuted: this.isMuted });
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l({ isPlaying: this.isPlaying, isMuted: this.isMuted }));
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    this.notify();
  }

  public start() {
    const ctx = this.getContext();
    if (!ctx) return;
    this.isPlaying = true;
    this.notify();

    if (this.timerId) window.clearInterval(this.timerId);

    this.timerId = window.setInterval(() => {
      if (!this.isPlaying || this.isMuted) return;
      const freq = this.melody[this.step % this.melody.length];
      this.playChime(freq, 0.08);

      // Subtle harmony every 4 beats
      if (this.step % 4 === 0) {
        this.playChime(freq * 0.5, 0.05); // warm sub note
      }

      this.step++;
    }, 450);
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.notify();
  }

  // Play a soft, dreamy chime tone using additive synthesis & exponential decay
  public playChime(freq: number, volume: number = 0.1) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Soft sine-triangle hybrid
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Music box envelope
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch {
      // Audio failed gracefully
    }
  }

  // Sound effect for candle extinguishing
  public playCandlePuff() {
    if (this.isMuted || !this.isPlaying) return;
    this.playChime(880, 0.06);
    setTimeout(() => this.playChime(1046.5, 0.06), 80);
  }

  // Sound effect for contract seal
  public playSealChime() {
    if (this.isMuted || !this.isPlaying) return;
    this.playChime(523.25, 0.1);
    setTimeout(() => this.playChime(659.25, 0.1), 120);
    setTimeout(() => this.playChime(783.99, 0.1), 240);
    setTimeout(() => this.playChime(1046.5, 0.12), 360);
  }
}

export const musicBox = new AmbientMusicBox();
