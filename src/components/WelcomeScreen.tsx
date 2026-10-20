import React, { useState, useEffect } from 'react';
import { confetti } from '../utils/confetti';
import { RECIPIENT_NAME, BIRTHDAY_DATE } from '../data/birthdayData';
import { Sparkles, Heart } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: () => void;
  senderName: string;
  onStartMusic: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete, senderName, onStartMusic }) => {
  const [phase, setPhase] = useState<'welcome' | 'opening' | 'countdown' | 'reveal'>('welcome');
  const [countdownNum, setCountdownNum] = useState<number>(3);
  const [displayedLetters, setDisplayedLetters] = useState<string[]>([]);

  // Letter by letter animation for HEMALI
  useEffect(() => {
    const letters = RECIPIENT_NAME.split('');
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < letters.length) {
        setDisplayedLetters(letters.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 220);
    return () => clearInterval(interval);
  }, []);

  const handleOpenSurprise = () => {
    // Start the special YouTube birthday song immediately!
    onStartMusic();
    setPhase('opening');
    confetti.burst({
      count: 45,
      shapes: ['heart', 'star', 'rect'],
      colors: ['#F472B6', '#FB7185', '#FBBF24', '#FDA4AF', '#DDD6FE']
    });

    // Move to countdown after opening animation
    setTimeout(() => {
      setPhase('countdown');
      startCountdown();
    }, 900);
  };

  const startCountdown = () => {
    let current = 3;
    setCountdownNum(3);

    const timer = setInterval(() => {
      current -= 1;
      if (current > 0) {
        setCountdownNum(current);
        confetti.burstStars();
      } else {
        clearInterval(timer);
        setPhase('reveal');
        confetti.burst({
          count: 70,
          shapes: ['heart', 'star', 'rect', 'circle']
        });
        setTimeout(() => {
          onComplete();
        }, 2200);
      }
    }, 850);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 backdrop-blur-md overflow-hidden select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Secret Bestie Welcome"
    >
      {/* Ambient background floating shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-pink-300 text-3xl animate-float-slow">💗</div>
        <div className="absolute bottom-16 right-12 text-rose-300 text-3xl animate-float-reverse">✨</div>
        <div className="absolute top-1/4 right-16 text-purple-300 text-2xl animate-float-slow">🌸</div>
        <div className="absolute bottom-1/4 left-16 text-amber-300 text-2xl animate-float-reverse">⭐</div>
      </div>

      {phase === 'welcome' && (
        <div className="relative max-w-md w-full bg-white/90 backdrop-blur-xl border border-pink-200/90 rounded-3xl p-7 sm:p-9 shadow-2xl text-center flex flex-col items-center">
          {/* Cute animated CSS gift box */}
          <div className="relative w-20 h-20 mb-5 group cursor-pointer" onClick={handleOpenSurprise}>
            {/* Box Body */}
            <div className="absolute inset-x-2 bottom-0 h-14 bg-gradient-to-r from-pink-400 to-rose-400 rounded-xl shadow-md flex items-center justify-center">
              {/* Vertical ribbon */}
              <div className="w-4 h-full bg-amber-300" />
            </div>
            {/* Box Lid */}
            <div className="absolute inset-x-0 top-3 h-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg shadow-sm flex items-center justify-center">
              <div className="w-4 h-full bg-amber-300" />
            </div>
            {/* Ribbon Bow on Top */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex items-center justify-center text-amber-300 text-xl font-bold">
              🎀
            </div>
            {/* Subtle floating glow */}
            <div className="absolute -inset-1 rounded-2xl bg-pink-300/30 blur-md -z-10 animate-pulse" />
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-600 bg-pink-50 border border-pink-200/70 px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>CONFIDENTIAL BESTIE DISPATCH</span>
          </div>

          {/* Letter by letter name */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-rose-950 mb-2 font-display">
            PSSST…{' '}
            <span className="text-pink-600">
              {displayedLetters.map((letter, i) => (
                <span
                  key={i}
                  className="inline-block animate-in fade-in zoom-in-50 duration-300"
                >
                  {letter}
                </span>
              ))}
            </span>
            {' '}💌
          </h1>

          <p className="text-rose-900/80 text-sm sm:text-base font-medium mb-1">
            Someone has created a little universe just for you.
          </p>

          <p className="text-xs sm:text-sm text-pink-700/90 font-script text-lg mb-6">
            Warning: Extreme bestie emotions ahead! 🥹💗
          </p>

          {/* Action button */}
          <button
            onClick={handleOpenSurprise}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-pink-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>OPEN YOUR SURPRISE 🎁</span>
          </button>

          <p className="mt-4 text-[11px] text-rose-400">
            Crafted with all the love from {senderName}
          </p>
        </div>
      )}

      {phase === 'opening' && (
        <div className="text-center animate-out zoom-out-95 duration-500">
          <div className="w-24 h-24 mx-auto mb-4 relative animate-bounce">
            <div className="text-6xl">🎁</div>
          </div>
          <h2 className="text-2xl font-bold text-pink-600 font-display">
            Unwrapping your world... ✨
          </h2>
        </div>
      )}

      {phase === 'countdown' && (
        <div className="relative text-center flex flex-col items-center">
          {/* Concentric glowing rings */}
          <div className="relative w-44 h-44 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-pink-300/40 animate-ping" />
            <div className="absolute inset-4 rounded-full border-2 border-rose-300/60" />
            <div className="w-32 h-32 rounded-full bg-white/90 shadow-2xl flex items-center justify-center border border-pink-200">
              <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-600 to-rose-500 font-display transition-all scale-110">
                {countdownNum}
              </span>
            </div>
          </div>
          <div className="mt-6 text-sm font-semibold text-rose-900 tracking-widest uppercase">
            Get Ready, Hemali! 💗
          </div>
        </div>
      )}

      {phase === 'reveal' && (
        <div className="max-w-md w-full bg-white/95 backdrop-blur-xl border border-pink-200 rounded-3xl p-8 shadow-2xl text-center animate-in zoom-in-95 duration-500">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-100 flex items-center justify-center text-3xl">
            🎂
          </div>

          <div className="text-xs font-bold tracking-widest text-pink-500 uppercase mb-2">
            {BIRTHDAY_DATE}
          </div>

          <h2 className="text-3xl font-extrabold text-rose-950 font-display mb-3">
            IT'S YOUR DAY, HEMALI! 🎂
          </h2>

          <p className="text-rose-800 text-base font-medium mb-4">
            Today, my favourite bestie deserves all the happiness in the world.
          </p>

          <div className="inline-flex items-center gap-1.5 text-xs text-pink-600 bg-pink-50 px-3 py-1.5 rounded-full font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome to your dedicated birthday realm</span>
          </div>
        </div>
      )}
    </div>
  );
};
